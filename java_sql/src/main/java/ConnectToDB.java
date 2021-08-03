import java.sql.*;
import java.util.Scanner;

public class ConnectToDB {
    public static void main(String[] args) {
        ConnectionInfo credentials = new ConnectionInfo();
        Queries q = new Queries();
        Scanner kbd = new Scanner(System.in);

        try (Connection conn = DriverManager.getConnection(
                credentials.getConnectionString(),
                credentials.getUsername(),
                credentials.getPassword())) {

            if (conn != null) {
                System.out.println("Welcome to the database!");
                System.out.println("DB Table names: ");
                int c = 1;
                for (String i : q.getTableNames(conn)) {
                    System.out.print(c + ": " + i + "  \t");
                    if(c % 5 == 0){
                        System.out.println();
                    }
                    c++;
                }

                c = 0;
                System.out.print("\n Choose table (enter number): ");
                int tableSelection = kbd.nextInt();
                String table = q.getTableNames(conn).get(tableSelection - 1);
                System.out.println("The table " + table + " has these columns:");

                c = 1;
                for (String i : q.getTableColumns(conn, table)){
                    System.out.println(c + ": " + i);
                    c++;
                }

                c = 0;
                System.out.println("Available sample queries: ");
                for (String i : q.listSampleQueries(table)){
                    System.out.println(c + ": " + i);
                    c++;
                }
                System.out.print("Select a predefined query: ");
                int queryChoice = kbd.nextInt();
                q.makeQuery(conn, table, queryChoice);

            } else {
                System.out.println("Failed to make connection!");
            }
        }
        catch (SQLException e) {
            System.err.format("SQL State: %s\n%s", e.getSQLState(), e.getMessage());
        }
        catch (Exception e) {
            e.printStackTrace();
        }

    }


}
