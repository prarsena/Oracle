const oracledb = require('oracledb');
const display = require('./displayFunctions');

async function handleIndividualRequest(request, response) {
    const urlparts = request.url.split("/");
    const tablename = urlparts[2];
    const id = urlparts[3];
    let connection;

    try {
        connection = await oracledb.getConnection();
        const getIDColumnName = await connection.execute(
            `SELECT *
           FROM ${tablename}`
        );

        console.log(getIDColumnName.metaData[0].name)
        tableSpecificID = getIDColumnName.metaData[0].name;

        const result = await connection.execute(
            `SELECT * 
            FROM ${tablename}
            WHERE ${tableSpecificID} = :idbv`, [id]
        );

        display.dispR(
            response,
            `${tablename} Demonstration`,
            "Example using node-oracledb driver",
            result,
            id);

    } catch (err) {
        handleError(response, "handleRequest() error", err);
    } finally {
        if (connection) {
            try {
                // Release the connection back to the connection pool
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

async function handleRequest(request, response) {
    const urlparts = request.url.split("/");
    const id = urlparts[1];
    let connection;
    try {
        // Checkout a connection from the default pool
        connection = await oracledb.getConnection();

        const result = await connection.execute(
            `SELECT *
           FROM employee`
        );

        display.displayResults(
            response,
            "Employee Demonstration",
            "Example using node-oracledb driver",
            result,
            id);

    } catch (err) {
        handleError(response, "handleRequest() error", err);
    } finally {
        if (connection) {
            try {
                // Release the connection back to the connection pool
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

async function getDBTables(request, response) {
    const urlparts = request.url.split("/");
    const id = 1;
    let connection;
    try {
        // Checkout a connection from the default pool
        connection = await oracledb.getConnection();

        const result = await connection.execute(
            `SELECT table_name FROM user_tables`
        );

        display.displayResultLinks(
            response,
            "Database Demonstration",
            "Example using node-oracledb driver",
            result,
            id);

    } catch (err) {
        handleError(response, "handleRequest() error", err);
    } finally {
        if (connection) {
            try {
                // Release the connection back to the connection pool
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

async function getTableData(request, response) {
    const urlparts = request.url.split("/");
    const tablename = urlparts[2];
    let connection;
    try {
        // Checkout a connection from the default pool
        connection = await oracledb.getConnection();
        const getIDColumnName = await connection.execute(
            `SELECT *
           FROM ${tablename}`
        );

        console.log(getIDColumnName.metaData[0].name)
        tableSpecificID = getIDColumnName.metaData[0].name;

        const result = await connection.execute(
            `SELECT * FROM ${tablename}
            ORDER BY ${tableSpecificID}`
        );

        display.dispR(
            response,
            `${tablename} Demonstration`,
            "Example using node-oracledb driver",
            result,
            tablename);

    } catch (err) {
        handleError(response, "handleRequest() error", err);
    } finally {
        if (connection) {
            try {
                // Release the connection back to the connection pool
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

async function handleForm(request, response) {
    let connection;
    try {
        // Checkout a connection from the default pool
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `SELECT table_name FROM user_tables`
        );

        display.displayForm(
            response,
            result);

    } catch (err) {
        handleError(response, "handleRequest() error", err);
    } finally {
        if (connection) {
            try {
                // Release the connection back to the connection pool
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

async function handleTableForm(request, response) {
    const urlparts = request.url.split("/");
    const tablename = urlparts[2];
    let connection;
    try {
        // Checkout a connection from the default pool
        connection = await oracledb.getConnection();
        const getIDColumnName = await connection.execute(
            `SELECT *
           FROM ${tablename}`
        );

        console.log(getIDColumnName.metaData[0].name)
        tableSpecificID = getIDColumnName.metaData[0].name;

        const result = await connection.execute(
            `SELECT * FROM ${tablename}
            ORDER BY ${tableSpecificID}`
        );

        let lastId = result.rows[result.rows.length - 1];
        let highestUniqueID = lastId[tableSpecificID];

        display.displayTableForm(
            response,
            tablename,
            result,
            highestUniqueID);

    } catch (err) {
        handleError(response, "handleRequest() error", err);
    } finally {
        if (connection) {
            try {
                // Release the connection back to the connection pool
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

async function handleAbout(request, response) {
    try {

        display.displayAbout(response);

    } catch (err) {
        handleError(response, "handleRequest() error", err);
    }
}

// Report an error
function handleError(response, text, err) {
    if (err) {
        text += ": " + err.message;
    }
    console.error(text);
    response.writeHead(500, { "Content-Type": "text/html" });
    response.write(text);
    response.end();
}

module.exports = { handleError, handleRequest, handleIndividualRequest, getDBTables, getTableData, handleForm, handleTableForm, handleAbout };