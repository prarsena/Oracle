const style = require('./style');

function displayResultLinks(response, title, caption, result, id) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(style.navbar);
    response.write("<body>");
    response.write(style.navlist);
    response.write("<h1>" + title + "</h1>");

    response.write("<h2>" + "Available database tables </h2>");

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
            response.write(`<td><a href="/tables/${object[col]}">    ${object[col]}    </a></td>`);
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

    response.write("<h2>" + "Details for " + id + "</h2>");

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

// Display query results
function dispR(response, title, caption, result, id) {
    let tablename = title.split(" ")[0];
    response.writeHead(200, { "Content-Type": "text/html" });

    response.write(style.navbar);
    response.write("<body>");
    response.write(style.navlist);
    response.write(`<h1> ${title} </h1>`);
    response.write(`<h2> Details for ${id} </h2>`);
    response.write(`<table>`);

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
            if (col == 0) {
                response.write(`<td><a href="/tables/${tablename}/${object[col]}">${object[col]}</a></td>`);
            } else {
                response.write("<td>" + object[col] + "</td>");
            }
        }
        response.write("</tr>");
    }
    response.write("</table>");

    response.write("</body>\n</html>");
    response.end();
}

function displayForm(response, result) {
    response.writeHead(200, { "Content-Type": "text/html" });

    response.write(style.navbar);
    response.write("<body>");
    response.write(style.navlist);
    response.write(`<h1>Select table to add entry: </h1>`)

    response.write(`<label for="tables">Select a ${result.metaData[0].name}: </label>`)
    response.write(`<select name="tables" id="tables">`);
    for (let row = 0; row < result.rows.length; row++) {
        response.write(`<option value="${result.rows[row]['TABLE_NAME']}">${result.rows[row]['TABLE_NAME']}</option>`);
    }
    response.write("</select>");

    response.write(`<h3><span class="note">Note</span>: The (above) dropdown select doesn't work yet.</h3> 
    <h2> Select a table from the links below: </h2>`)
    response.write(`<div id="content">`)

    for (let row = 0; row < result.rows.length; row++) {
        response.write(`<p><a href="/form/${result.rows[row]['TABLE_NAME']}">${result.rows[row]['TABLE_NAME']}</a></p>`);
    }
    response.write('</div>')
    response.write("</body>\n</html>");
    response.end();
}

function displayTableForm(response, tablename, result, highestUniqueID) {
    response.writeHead(200, { "Content-Type": "text/html" });

    response.write(style.navbar);
    response.write("<body>");
    response.write(style.navlist);
    response.write(`<h1>Add ${tablename} entry</h1>`);

    response.write(`<div><form method="POST" action="/form/${tablename}/somepage"`)
    let tablelength = result.rows.length + 1;
    // If the table uses something other than 1,2,3 for its unique IDs,
    // set the ID to the highest existant value + 1;
    if (highestUniqueID > tablelength) {
        tablelength = highestUniqueID + 1;
    }
    for (col = 0; col < result.metaData.length; col++) {
        if (col == 0) {
            response.write(`<label for="${result.metaData[col].name}">${result.metaData[col].name}: </label><br>`)
            response.write(`<input type="text" id="${result.metaData[col].name}" name="${result.metaData[col].name}" value="${tablelength}"><br>`)
        }
        else {
            response.write(`<label for="${result.metaData[col].name}">${result.metaData[col].name}: </label><br>`)
            response.write(`<input type="text" id="${result.metaData[col].name}" name="${result.metaData[col].name}"><br>`)
        }
    }
    response.write(`<input type="submit" value="Submit"></form>`)
    response.write(`</div>`)
    response.write(`<h2>Examples of ${tablename} entries include:</h2>`)
    // Give examples below with a few existing rows. 
    response.write("<table>");
    response.write("<tr>");
    for (let col = 0; col < result.metaData.length; col++) {
        response.write("<th>" + result.metaData[col].name + "</th>");
    }
    response.write("</tr>");
    console.log(result.rows.length)
    if (result.rows.length < 10) {
        for (let row = 0; row < result.rows.length; row++) {
            response.write("<tr>");
            for (let col = 0; col < result.metaData.length; col++) {
                let object = Object.values(result.rows[row])
                response.write(`<td>${object[col]}</td>`);
            }
            response.write("</tr>");
        }
    }
    else {
        for (let row = 0; row < 10; row++) {
            let randomRow = Math.floor(Math.random() * result.rows.length);
            //console.log(randomRow);
            response.write("<tr>");
            for (let col = 0; col < result.metaData.length; col++) {
                let object = Object.values(result.rows[randomRow])
                response.write(`<td>${object[col]}</td>`);
            }
            response.write("</tr>");
        }
    }

    response.write("</table>");
    response.write("</body>\n</html>");
    response.end();
}

function displayAbout(response) {
    response.writeHead(200, { "Content-Type": "text/html" });

    response.write(style.navbar);
    response.write("<body>");
    response.write(style.navlist);

    response.write('<div id="content"> electric word life <br> <a href="https://github.com/prarsena/Oracle" target="_blank">Project Github</a> </div>')
    response.write("</body>\n</html>");
    response.end();
}

module.exports = { displayResultLinks, displayResults, dispR, displayForm, displayTableForm, displayAbout }