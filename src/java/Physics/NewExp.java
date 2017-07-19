/*
 * This servlet generates an id for the new experiment and sets the session variable
 * 
 * 
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
public class NewExp extends HttpServlet {

   //private static int eid =0;
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
       int id;
        HttpSession session = request.getSession(true);
        if(!request.getParameter("id").equals("-1"))
         session.setAttribute("id",(String)request.getParameter("id"));
        else
        {
            try {
            Connection conn = null;
             try {
                 conn = ConnectionPool.getInstance().getConnection();
             } catch (ClassNotFoundException | InstantiationException | IllegalAccessException ex) {
                 Logger.getLogger(UploadObject.class.getName()).log(Level.SEVERE, null, ex);
             }
            Statement stmt=conn.createStatement();
            
            String sql="SELECT * FROM `exp-details` WHERE exp_id= ( SELECT max(exp_id) FROM `exp-details`)";
            ResultSet rs=  stmt.executeQuery(sql);
            id=0;
            if(rs.next())
                id=Integer.parseInt(rs.getString("exp_id"))+1;
            session=request.getSession();
            session.setAttribute("id",id);
            }
             catch (SQLException ex) {
            Logger.getLogger(DataServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        }
       
        
        
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
