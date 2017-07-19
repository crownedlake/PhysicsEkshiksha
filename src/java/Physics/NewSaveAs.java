/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Physics;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Pragati
 */
public class NewSaveAs extends HttpServlet {

    
    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        int oid=0;
        try {
            Connection conn = null;
             try {
                 conn = ConnectionPool.getInstance().getConnection();
             } catch (ClassNotFoundException | InstantiationException | IllegalAccessException ex) {
                 Logger.getLogger(UploadObject.class.getName()).log(Level.SEVERE, null, ex);
             }
            
            int id=-1;
            HttpSession session = request.getSession(false);
            if(session!=null)
            {
                String idi=(session.getAttribute("id").toString());
                oid=Integer.parseInt( idi);
                Statement stmt=conn.createStatement();
                String sql="SELECT * FROM `exp-details` WHERE `exp_id`='"+oid+"'";
                ResultSet rs=stmt.executeQuery(sql);
                if(rs.next())
                {
                   stmt=conn.createStatement();
                    sql="SELECT * FROM `exp-details` WHERE exp_id= ( SELECT max(exp_id) FROM `exp-details`)";
                    rs=  stmt.executeQuery(sql);
                    id=0;
                    String back="";
                    if(rs.next())
                    { id=Integer.parseInt(rs.getString("exp_id"))+1;}
                    
                    stmt=conn.createStatement();
                    sql="SELECT * FROM `exp-details` WHERE exp_id='"+oid+"'";
                    rs=stmt.executeQuery(sql);
                    if(rs.next())
                    {
                        back=rs.getString("background");
                    }
                    
                    
                     stmt=conn.createStatement();
                    sql = "INSERT INTO `exp-details` (`exp_id`,`category`,`background`,`exp_name`,`author_name`) VALUES ('"+id+"','"+request.getParameter("category")+"','"+back+"','"+request.getParameter("expname")+"','"+request.getParameter("authorname")+"');";
                    int executeUpdate = stmt.executeUpdate(sql);
                    
                    stmt=conn.createStatement();
                    sql="SELECT * FROM `bom` WHERE `exp_id`='"+oid+"'";
                    rs = stmt.executeQuery(sql);
                    

                    while(rs.next()){
                        stmt=conn.createStatement();
                        sql="INSERT INTO `bom` (`exp_id`,`object`, `name`, `attributes`, `data`,`type`,`positions`) VALUES ('"+id+"', '"+rs.getString("object")+"','"+rs.getString("name")+"', '"+rs.getString("attributes")+"', '"+rs.getString("data")+"','"+rs.getString("type")+"','"+rs.getString("positions")+"');";
                        executeUpdate=stmt.executeUpdate(sql);
                    }
                    
                    
                    stmt=conn.createStatement();
                    sql="SELECT * FROM `code` WHERE `exp_id`='"+oid+"'";
                    rs = stmt.executeQuery(sql);
                    

                    while(rs.next()){
                        stmt=conn.createStatement();
                        sql="INSERT INTO `code` ( `exp_id`,`name`,`code`) VALUES ('"+id+"','"+rs.getString("name")+"','"+rs.getString("code")+"');";
                        executeUpdate=stmt.executeUpdate(sql);
                    }
                    
                    stmt=conn.createStatement();
                    sql="SELECT * FROM `light` WHERE `exp_id`='"+oid+"'";
                    rs = stmt.executeQuery(sql);
                    

                    while(rs.next()){
                        stmt=conn.createStatement();
                        sql="INSERT INTO `light` (`exp_id`,`lighttype`,`name`,`attributes`,`data`,`type`) VALUES ('"+id+"','"+rs.getString("lighttype")+"','"+rs.getString("name")+"','"+rs.getString("attributes")+"','"+rs.getString("data")+"','"+rs.getString("type")+"');";
                        executeUpdate=stmt.executeUpdate(sql);
                    }
                    stmt=conn.createStatement();
                    sql="SELECT * FROM `usercontrol` WHERE `exp_id`='"+oid+"'";
                    rs = stmt.executeQuery(sql);
                    

                    while(rs.next()){
                        stmt=conn.createStatement();
                        sql="INSERT INTO `usercontrol` (`exp_id`,`varname`,`disname`,`attr`,`code`) VALUES ('"+id+"', '"+rs.getString("varname")+"','"+rs.getString("disname")+"', '"+rs.getString("attr")+"', '"+rs.getString("code")+"');";
                        executeUpdate=stmt.executeUpdate(sql);
                    }
                }
                else
                {
                    /*stmt=conn.createStatement();
                    sql = "INSERT INTO `exp-details` (`exp_id`,`file`,`exp_name`,`author_name`) VALUES ('"+oid+"','"+request.getParameter("expname")+"_"+oid+"','"+request.getParameter("expname")+"','"+request.getParameter("authorname")+"');";
                    int executeUpdate = stmt.executeUpdate(sql);*/
                }
            }
            
             else
            {
                System.out.println("Session not created");
            }
            
              
             PrintWriter out = response.getWriter();
             out.println(oid);
              
              
        } catch (SQLException ex) {
            Logger.getLogger(DataServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        
    }
    

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
