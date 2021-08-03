# Working with Oracle DB

There are two Oracle DB Client projects in this repository: one Java/Gradle based, and the other is a Node JS site.
Two files are missing from each of the projects: creds.js, and ConnectionInfo.java.

# nodejs_sql

1.  To build this project, clone this repo.
2.  Navigate to root dir of project and run: `npm i`
3.  Create a file called `creds.js` in the root of the nodejs_sql directory.
4.  Add the following contents to `creds.js`:
    const username = "YOUR_ORACLE_DB_USERNAME"
    const pw = "YOUR_ORACLE_DB_PASSWORD"
    const connectionstring = "YOUR_ORACLE_DB_CONNECTIONSTRING"
    const INSTANT_CLIENT_LOCATION = "location/of/instantclient_xx_xx"
    module.exports = { username, pw, connectionstring, INSTANT_CLIENT_LOCATION }

> note: The connectionString can take many formats but I use something like this:

    (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=myhostname)(PORT=1521))
    (CONNECT_DATA=(SID=mydbname)(GLOBAL_NAME=dbname.hostname)(SERVER=DEDICATED)))

5. `npm oracledb` also requires access to Oracle Instant Client on the machine running the node server. See these links for more info.

- [http://oracle.github.io/node-oracledb/](http://oracle.github.io/node-oracledb/)
- [https://www.oracle.com/database/technologies/instant-client.html](https://www.oracle.com/database/technologies/instant-client.html)

Set the `INSTANT_CLIENT_LOCATION` variable to the path of that install, for example:

- `D:\\Downloads\\instantclient-basic-windows.x64-19.11.0.0.0dbru\\instantclient_19_11`
- `/home/me/Downloads/instantclient_21_11`

If you are running the code on Linux, you have to do an extra step to add Instant Client to the run-time link path:
For example, if the Basic package unzipped to /opt/oracle/instantclient_19_11, then run the following using sudo or as the root user:

      sudo sh -c "echo /opt/oracle/instantclient_19_11 > /etc/ld.so.conf.d/oracle-instantclient.conf"
      sudo ldconfig

# java_sql

The Java project requires a file called `ConnectionInfo.java` to be placed in the `/java_sql/src/main/java` directory.

The file should contain this information:

    public class ConnectionInfo {
      private String connectionString = "write_oracle_connection_string_here";
      private String username = "write_username_here";
      private String password = "write_password_here";

      public String getConnectionString(){
          return connectionString;
      }

      public String getUsername(){
          return username;
      }

      public String getPassword(){
          return password;
      }
    }
