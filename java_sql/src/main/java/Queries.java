import java.sql.*;
import java.util.ArrayList;

public class Queries {
    ArrayList<String> queries;

    public ArrayList<String> getTableNames(Connection conn) throws SQLException {
        ArrayList<String> tables = new ArrayList<>();
        String tableQuery = "SELECT table_name FROM user_tables";
        Statement statement = conn.createStatement();
        ResultSet resultSet = statement.executeQuery(tableQuery);
        while (resultSet.next()) {
            tables.add(resultSet.getString(1));
        }
        return tables;
    }

    public ArrayList<String> getTableColumns(Connection conn, String tableName) throws SQLException {
        ArrayList<String> columns = new ArrayList<>();
        String tableQuery = "SELECT * FROM " + tableName;
        Statement statement = conn.createStatement();

        ResultSet resultSet = statement.executeQuery(tableQuery);
        ResultSetMetaData rsmd = resultSet.getMetaData();
        int numberOfColumns = rsmd.getColumnCount();
        for (int i = 1; i <= numberOfColumns; i++) {
            columns.add(rsmd.getColumnName(i) + " " + rsmd.getColumnTypeName(i));
        }
        return columns;
    }

    public ArrayList<String> listSampleQueries(String tableName) {
        queries = new ArrayList<String>();

        queries.add("SELECT count(*) FROM " + tableName);
        queries.add("SELECT * FROM " + tableName);

        return queries;
    }

    public void makeQuery(Connection conn, String table, int queryChoice) throws SQLException {
        String q = listSampleQueries(table).get(queryChoice);
        Statement statement = conn.createStatement();
        ResultSet resultSet = statement.executeQuery(q);
        ResultSetMetaData rsmd = resultSet.getMetaData();
        int numberOfColumns = rsmd.getColumnCount();
        for (int i = 1; i <= numberOfColumns; i++) {
            System.out.printf("%-16s %s", rsmd.getColumnName(i), " ");
        }
        System.out.println("\n");

        while (resultSet.next()) {
            for (int i = 1; i <= numberOfColumns; i++) {
                if (rsmd.getColumnTypeName(i).equals("NUMBER")) {
                    System.out.printf("%-16d %s", resultSet.getInt(i), " ");
                } else {

                    if ((resultSet.getString(i) != null) && resultSet.getString(i).length() > 16){
                        System.out.printf("%-16s %s", resultSet.getString(i).substring(0,15), " ");
                    } else{
                        System.out.printf("%-16s %s", resultSet.getString(i), " ");
                    }

                }
            }
            System.out.println();
        }

    }

}
