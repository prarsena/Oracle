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

/*
Mac+Linux:
curl -X POST http://localhost:7000/tables/test -d '{"testid":"3", "first_name": "Jerry", "last_name": "Foo"}' -H "Content-Type: application/json"
*/
/*
Windows?:
curl -H "Content-Type: application/json" -X POST http://localhost:7000/tables/test -d "{\"id\":\"994\",\"firstname\":\"Jimmy\",\"lastname\":\"chu\"}"
*/
async function handleTableFormPost(req, res) {
    const urlparts = req.url.split("/");
    const tablename = urlparts[2];
    let connection;
    try {
        connection = await oracledb.getConnection();
        const getIDColumnName = await connection.execute(
            `SELECT *
           FROM ${tablename}`
        );

        let tableLength = getIDColumnName.rows.length
        console.log(tableLength)

        const { id, firstname, lastname } = req.body
        console.log(id, firstname, lastname)
        console.log({
            message: "Success",
            myid: tableLength + 1,
            myfn: firstname,
            myln: lastname
        })

        for (let i = 0; i < getIDColumnName.metaData.length; i++) {
            // get table column names
            console.log(getIDColumnName.metaData[i].name)
        }

        const insertRecord = await connection.execute(
            ` INSERT INTO TEST (TESTID, FIRST_NAME, LAST_NAME)   
                VALUES (${tableLength + 1}, '${firstname}', '${lastname}')`
        )
        if (insertRecord.rowsAffected != 1) {
            res.status(400).json({ error: "Record Not Inserted" })
        } else {
            connection.commit()
            console.log("Row inserted: " + insertRecord.rowsAffected)
            res.status(200).json({ message: `Row inserted: ${insertRecord.lastRowid}` })
        }

    } catch (err) {
        handleError(res, "handleRequest() error", err);
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

async function postToTable(req, res) {
    console.log(req.body)
    let tablename = req.url.split("/")[2]
    console.log()
    let objectKeys = Object.keys(req.body)
    let objectValues = Object.values(req.body)
    console.log(objectKeys)
    console.log(objectValues)
    for (let i = 0; i < objectKeys.length; i++) {
        if (objectValues[i].length > 1) {
            objectValues[i] = `'${objectValues[i]}'`
        }
    }
    let connection
    try {
        connection = await oracledb.getConnection();

        const insertRecord = await connection.execute(
            ` INSERT INTO ${tablename} (${objectKeys})   
            VALUES (${objectValues})`)

        if (insertRecord.rowsAffected != 1) {
            res.status(400).json({ error: "Record Not Inserted" })
        } else {
            connection.commit()
            console.log("Row inserted: " + insertRecord.rowsAffected)
            //res.status(200).json({ message: `Row inserted: ${insertRecord.lastRowid}` })
            res.redirect(`/tables/${tablename}`)
        }
    } catch (err) {
        handleError(res, "handleRequest() error", err);
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

async function handleRecordDelete(req, res) {
    const urlparts = req.url.split("/");
    const tablename = urlparts[2];
    let connection;
    try {
        connection = await oracledb.getConnection();
        const { id } = req.body

        const deleteRecord = await connection.execute(
            ` DELETE FROM TEST   
                WHERE TESTID = ${id} `
        )
        if (deleteRecord.rowsAffected < 1) {
            res.status(400).json({ error: "Record Not Deleted" })
        } else {
            connection.commit()
            console.log("Row Deleted: " + deleteRecord.rowsAffected)
            res.status(200).json({ message: `Row Deleted: ${id}` })
        }

    } catch (err) {
        handleError(res, "handleRequest() error", err);
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

module.exports = { handleError, handleRequest, handleIndividualRequest, getDBTables, getTableData, handleForm, handleTableForm, handleTableFormPost, handleAbout, handleRecordDelete, postToTable };