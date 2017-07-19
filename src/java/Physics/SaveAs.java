/*
 * this servlet stores a entry for the created experiment in the database
 * and stores author info and background info in the database 
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
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Pragati
 */
@WebServlet(name = "SaveAs", urlPatterns = {"/SaveAs"})
public class SaveAs extends HttpServlet {

    

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
            if(session!=null)//check if id is generated for the given session
            {
                String idi=(session.getAttribute("id").toString());
                oid=Integer.parseInt( idi);
                Statement stmt=conn.createStatement();
                String sql="SELECT * FROM `exp-details` WHERE `exp_id`='"+oid+"'";
                ResultSet rs=stmt.executeQuery(sql);
                if(!rs.next())//check if a entry already exists
                {
                    stmt=conn.createStatement();
                    sql = "INSERT INTO `exp-details` (`exp_id`,`category`,`background`,`exp_name`,`author_name`) VALUES ('"+oid+"','"+request.getParameter("category")+"','"+request.getParameter("background")+"','"+request.getParameter("expname")+"','"+request.getParameter("authorname")+"');";
                    int executeUpdate = stmt.executeUpdate(sql);
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
