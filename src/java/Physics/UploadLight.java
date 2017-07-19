/*
 * Here all information about lights is stored in database
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
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Pragati
 */
@WebServlet(name = "UploadLight", urlPatterns = {"/UploadLight"})
public class UploadLight extends HttpServlet {

    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        int id=0;
            HttpSession session = request.getSession(false);
            String idi=session.getAttribute("id").toString();
            id=Integer.parseInt(idi);
                     
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
                sql="SELECT * FROM `light` WHERE `exp_id`='"+id+"' AND `name`='"+request.getParameter("name")+"'";
                ResultSet rs=stmt.executeQuery(sql);
                if(!rs.next())//check whether entry alreay exists
                {
                    sql = "INSERT INTO `light` (`exp_id`,`lighttype`, `name`, `attributes`, `data`,`type`) VALUES ('"+id+"', '"+request.getParameter("object")+"','"+request.getParameter("name")+"', '"+request.getParameter("attributes")+"', '"+request.getParameter("data")+"','"+request.getParameter("type")+"');";
                        
                    int executeUpdate = stmt.executeUpdate(sql);
                }
                
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
