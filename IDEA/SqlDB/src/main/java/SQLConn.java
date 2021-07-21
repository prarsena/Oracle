import java.sql.*;

public class SQLConn {



    public static void createTable(Connection conn) throws SQLException {
        Statement statement = conn.createStatement();
        // Create table
        statement.executeUpdate("create table TEST(TESTID NUMBER,"
                + "FIRST_NAME VARCHAR2 (20),"
                + "LAST_NAME VARCHAR2 (20))");
        System.out.println("New table TEST is created!");
        // Create records
        statement.executeUpdate("insert into TEST values(1, 'Jennifer', 'Jones')");
        statement.executeUpdate("insert into TEST values(2, 'Alex', 'Debouir')");
        System.out.println("Two records are inserted.");
        // Update record
        statement.executeUpdate("update TEST set LAST_NAME='Jamboree'"
                + " where TESTID=2");
        // Verify the table
        ResultSet resultSet = statement.executeQuery("select * from TEST");
        System.out.println("\nNew table TEST contains:");
        System.out.println("EMPLOYEEID" + " " + "FIRSTNAME" + " " + "LASTNAME");
        System.out.println("--------------------------");
        while (resultSet.next()) {
            System.out.println(resultSet.getInt(1) + " " +
                    resultSet.getString(2) + " " +
                    resultSet.getString(3));
        }
        System.out.println("\nSuccessfully tested a connection");
    }

    public static void deleteTable(Connection conn) throws SQLException {
        Statement statement = conn.createStatement();
        statement.execute("drop table TEST");
    }

    public static void viewTableRecords(Connection conn) throws SQLException {
        try (Statement statement = conn.createStatement()) {
            try (ResultSet resultSet = statement
                    .executeQuery("select FIRST_NAME, LAST_NAME from EMPLOYEE")) {
                System.out.println("FIRST_NAME" + "  " + "LAST_NAME");
                System.out.println("---------------------");
                while (resultSet.next())
                    System.out.println(resultSet.getString(1) + " "
                            + resultSet.getString(2) + " ");
            }
        }
    }

    public static void dbQuery(Connection conn, String q) throws SQLException {
        try (Statement statement = conn.createStatement()) {
            try (ResultSet resultSet = statement.executeQuery(q)) {
                ResultSetMetaData rsmd = resultSet.getMetaData();
                int numberOfColumns = rsmd.getColumnCount();
                for (int i=1; i<=numberOfColumns; i++){
                    System.out.println(rsmd.getColumnName(i) + " " + rsmd.getColumnTypeName(i));

                }

                while (resultSet.next()) {
                    //System.out.println(resultSet.getObject(2) );
                    System.out.println(resultSet.getString(1));
                }
                    /*
                    System.out.println(resultSet.getString(1) + " "
                            + resultSet.getString(2) + " ");


                }
                */
                //System.out.println(resultSet.getString(1));
            }
        }
    }

}
