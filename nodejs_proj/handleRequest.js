const oracledb = require('oracledb');
const httpPort = 7000;

async function handleIndividualRequest(request, response) {
    const urlparts = request.url.split("/");
    const id = urlparts[2];

    if (id == 'favicon.ico') {  // ignore requests for the icon
        return;
    }

    if (id != parseInt(id)) {
        handleError(
            response,
            'URL path "' + id + '" is not an integer.  Try http://localhost:' + httpPort + '/3',
            null
        );

        return;
    }

    let connection;
    try {
        // Checkout a connection from the default pool
        connection = await oracledb.getConnection();

        const result = await connection.execute(
            `SELECT *
           FROM employee
           WHERE employee_id = :idbv`,
            [id] // bind variable value
        );

        displayResults(
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

        displayResults(
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

        displayResultLinks(
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


async function getTableData(request, response) {
    const urlparts = request.url.split("/");
    const tablename = urlparts[2];
    let connection;
    try {
        // Checkout a connection from the default pool
        connection = await oracledb.getConnection();

        const result = await connection.execute(
            `SELECT * FROM ${tablename}`
        );

        displayResults(
            response,
            "Employee Demonstration",
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

function displayResultLinks(response, title, caption, result, id) {

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<!DOCTYPE html>");
    response.write("<html>");
    response.write("<head>");
    response.write("<style>" +
        "body {background:#FFFFFF;color:#000000;font-family:Arial,sans-serif;margin:40px;padding:10px;font-size:12px;text-align:center;}" +
        "h1 {margin:0px;margin-bottom:12px;background:#FF0000;text-align:center;color:#FFFFFF;font-size:28px;}" +
        "table {border-collapse: collapse;   margin-left:auto; margin-right:auto;}" +
        "td, th {padding:8px;border-style:solid}" +
        "</style>\n");
    response.write("<title>" + caption + "</title>");
    response.write("</head>");
    response.write("<body>");
    response.write("<h1>" + title + "</h1>");

    response.write("<h2>" + "Details for employee " + id + "</h2>");

    response.write("<table>");
    //console.log(result)
    // Column Titles
    response.write("<tr>");
    for (let col = 0; col < result.metaData.length; col++) {
        response.write("<th>" + result.metaData[col].name + "</th>");
    }
    response.write("</tr>");
    console.log(result.rows.length)
    // Rows
    for (let row = 0; row < result.rows.length; row++) {
        response.write("<tr>");

        for (let col = 0; col < result.metaData.length; col++) {
            //console.log(result.rows[row])
            let object = Object.values(result.rows[row])
            //console.log(object[col])
            response.write(`<td><a href="./tables/${object[col]}"> + ${object[col]} + </a></td>`);
        }
        response.write("</tr>");
    }
    response.write("</table>");

    response.write("</body>\n</html>");
    response.end();

}


// Display query results
function displayResults(response, title, caption, result, id) {

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<!DOCTYPE html>");
    response.write("<html>");
    response.write("<head>");
    response.write("<style>" +
        "body {background:#FFFFFF;color:#000000;font-family:Arial,sans-serif;margin:40px;padding:10px;font-size:12px;text-align:center;}" +
        "h1 {margin:0px;margin-bottom:12px;background:#FF0000;text-align:center;color:#FFFFFF;font-size:28px;}" +
        "table {border-collapse: collapse;   margin-left:auto; margin-right:auto;}" +
        "td, th {padding:8px;border-style:solid}" +
        "</style>\n");
    response.write("<title>" + caption + "</title>");
    response.write("</head>");
    response.write("<body>");
    response.write("<h1>" + title + "</h1>");

    response.write("<h2>" + "Details for employee " + id + "</h2>");

    response.write("<table>");
    //console.log(result)
    // Column Titles
    response.write("<tr>");
    for (let col = 0; col < result.metaData.length; col++) {
        response.write("<th>" + result.metaData[col].name + "</th>");
    }
    response.write("</tr>");
    console.log(result.rows.length)
    // Rows
    for (let row = 0; row < result.rows.length; row++) {
        response.write("<tr>");

        for (let col = 0; col < result.metaData.length; col++) {
            //console.log(result.rows[row])
            let object = Object.values(result.rows[row])
            //console.log(object[col])
            response.write("<td>" + object[col] + "</td>");
        }
        response.write("</tr>");
    }
    response.write("</table>");

    response.write("</body>\n</html>");
    response.end();

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

module.exports = { handleError, handleRequest, handleIndividualRequest, displayResults, getDBTables, getTableData };