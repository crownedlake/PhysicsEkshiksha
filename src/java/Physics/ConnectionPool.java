package Physics;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author akshitsoni
 */
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import javax.sql.DataSource;



public class ConnectionPool {
 
    public static ConnectionPool connect=null;
    public static DataSource dataSource=null;
    
    private ConnectionPool()
    {
        try{
        //InitialContext ctx = new InitialContext();
        //dataSource = (DataSource)ctx.lookup("java:comp/env/jdbc/database");
        //System.out.println("Successful");
        }
        catch(Exception e){
        }
    }
    
    public static ConnectionPool getInstance()
    {
        if(connect==null)
        {
            connect=new ConnectionPool();
        }
        return connect;
    }
    
    public Connection getConnection() throws ClassNotFoundException, InstantiationException, IllegalAccessException
    {
        Class.forName("com.mysql.jdbc.Driver").newInstance();
        try{
        return DriverManager.getConnection("jdbc:mysql://localhost:3306/physics","root","");
        }catch(SQLException e){return null;}
        
    }
}