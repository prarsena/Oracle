# Working with Oracle DB

There are two Oracle DB Client projects in this repository: one Java/Gradle based, and the other is a Node JS site.
Two files are missing from each of the projects: creds.js, and ConnectionInfo.java.

## What are these projects?

These projects interact with an Oracle database. Generally, they display the information contained within a database table using `SELECT` statements.

You can create your own Oracle database using the [Oracle Sample Database](https://www.oracletutorial.com/getting-started/oracle-sample-database/) tutorial on your local machine if you have installed the Oracle Database Server (the [Install Oracle](https://www.oracletutorial.com/getting-started/install-oracle/) page provides information about setting up an Oracle Database Server on your local machine and connecting to it). You will need the username, password, and connection information (hostname, port, SID or Service Name) for connecting to this database. That information will be put into a file that you create in the projects. For the Node JS project, you will also need Oracle Instant Client installed on your local machine (instructions below).

# nodejs_sql

To build these projects, first clone this repo.

1.  Navigate to root dir of the nodejs_sql project and run: `npm i`
2.  Create a file called `creds.js` in the nodejs_sql directory.
3.  Add the following contents to `creds.js`:

        const username = "YOUR_ORACLE_DB_USERNAME"
        const pw = "YOUR_ORACLE_DB_PASSWORD"
        const connectionstring = "YOUR_ORACLE_DB_CONNECTIONSTRING"
        const INSTANT_CLIENT_LOCATION = "location/of/instantclient_xx_xx"
        module.exports = { username, pw, connectionstring, INSTANT_CLIENT_LOCATION }

> note: The connectionString can take many formats but I use something like this:

    (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=myhostname)(PORT=1521))
    (CONNECT_DATA=(SID=mydbname)(GLOBAL_NAME=dbname.hostname)(SERVER=DEDICATED)))

4. The `oracledb` node js library requires access to Oracle Instant Client on the machine running the node server. See these links for more info.

- [http://oracle.github.io/node-oracledb/](http://oracle.github.io/node-oracledb/)
- [https://www.oracle.com/database/technologies/instant-client.html](https://www.oracle.com/database/technologies/instant-client.html)

Download the Oracle Instant Client on the machine running the node server.

5. Set the `INSTANT_CLIENT_LOCATION` variable to the path of that install, for example:

- `D:\\Downloads\\instantclient-basic-windows.x64-19.11.0.0.0dbru\\instantclient_19_11`
- `/opt/oracle/instantclient_19_11`
- `/home/me/Downloads/instantclient_21_11`

If you are running the code on Linux, you have to do an extra step to add Instant Client to the run-time link path:
For example, if the Basic package unzipped to `/opt/oracle/instantclient_19_11`, then run the following using sudo or as the root user:

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

Once that file is in place, build the gradle project using your IDE, or on the command line:

1. Navigate to the root directory of the project.
2. type `gradle run`

# To do

As mentioned previously, these projects display the information contained within a database using `SELECT` statements. I would like to expand the functionality, especially of the Node JS web server in the following ways:

1. Create an endpoint for adding records into a database table using a `POST` request.
2. Add support for `PATCH` and `DELETE` as well.
3. Add support for authentication/authorization. In the Oracle Sample Database, there is a table called `OWNER` with `OWNERID` and `FIRSTNAME` values. To start, maybe I could create a login that's based on the combincation of `FIRSTNAME` for username and `OWNERID` for password. Once logged in, they can add and delete records in all other tables. There is another table called `EMPLOYEE`, which could have some rights based on login.
4. Improve web page: add navigation, fix bugs, work on css.
5. Improve web page: Add support for dynamic queries using drop-down lists. The web page might say `Select * from <drop-down list of table names> where <dynamically-loaded field names after table is chosen> = <text-input for user-entered value>` and then loads the results.
