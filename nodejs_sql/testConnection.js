async function testConnection() {
    let connection;

    try {
        connection = await oracledb.getConnection({
            user: creds.username,
            password: creds.pw,
            connectString: creds.connectionstring
        });

        const result = await connection.execute(
            `SELECT *
       FROM employee`
        );
        console.log(result.rows);

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

module.exports = testConnection()