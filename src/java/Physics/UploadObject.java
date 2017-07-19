/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Physics;

import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
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
 * @author Balgond
 */
public class UploadObject extends HttpServlet {

    
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        
        
    }
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
        
            int id;
            HttpSession session = request.getSession(false);
            String idi=session.getAttribute("id").toString();
            id=Integer.parseInt(idi);
            int s=Integer.parseInt(request.getParameter("status"));
           
                try {
                Connection conn = null;
                try {
                conn = ConnectionPool.getInstance().getConnection();
                } catch (ClassNotFoundException | InstantiationException | IllegalAccessException ex) {
                Logger.getLogger(UploadObject.class.getName()).log(Level.SEVERE, null, ex);
                }

                Statement stmt=conn.createStatement();
                System.out.println(request.getParameter("name")+" "+id);
                String sql="";
                
                switch (s) {
                    case -1:
                        sql = "INSERT INTO `bom` (`exp_id`,`object`, `name`, `attributes`, `data`,`type`,`positions`) VALUES ('"+id+"', '"+request.getParameter("object")+"','"+request.getParameter("name")+"', '"+request.getParameter("attributes")+"', '"+request.getParameter("data")+"','"+request.getParameter("type")+"','"+request.getParameter("positions")+"');";
                        break;
                    case 1:
                        sql = "UPDATE `bom` SET `object`='"+request.getParameter("object")+"',`attributes`='"+request.getParameter("attributes")+"',`data`='"+request.getParameter("data")+"',`type`='"+request.getParameter("type")+"',`positions`='"+request.getParameter("positions")+"' WHERE `exp_id`='"+id+"' AND `name`='"+request.getParameter("name")+"'";
                        break;
                    case 0:
                        sql = "DELETE FROM `bom` WHERE `exp_id`='"+id+"' AND `name`='"+request.getParameter("name")+"'";
                        break;
                    default:
                        break;
                }
                int executeUpdate = stmt.executeUpdate(sql);
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
