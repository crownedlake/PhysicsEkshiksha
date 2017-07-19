package Physics;

/*
 * here the animation and static code given by the user is stored in database
 * also if background changes are done then the same is updated 
 * 
 */

import java.io.IOException;
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
@WebServlet(urlPatterns = {"/UploadCode"})
public class UploadCode extends HttpServlet {

    


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
                     
                try {
                Connection conn = null;
                try {
                conn = ConnectionPool.getInstance().getConnection();
                } catch (ClassNotFoundException | InstantiationException | IllegalAccessException ex) {
                Logger.getLogger(UploadObject.class.getName()).log(Level.SEVERE, null, ex);
                }
                String animation="function animation(){"+request.getParameter("animation")+"}";
                String staticcode=request.getParameter("static");
                Statement stmt=conn.createStatement();
                System.out.println(request.getParameter("name")+" "+id);
                String sql;
                sql="SELECT * FROM `code` WHERE `exp_id`='"+id+"'";
                ResultSet rs = stmt.executeQuery(sql);
                if(rs.next())//if entry present then update code
                {
                    sql = "UPDATE `code` SET  `code`='"+animation+"' WHERE `exp_id`='"+id+"' AND `name`='animation'";

                    int executeUpdate = stmt.executeUpdate(sql);

                    sql = "UPDATE `code` SET  `code`='"+staticcode+"' WHERE `exp_id`='"+id+"' AND `name`='static'";

                    executeUpdate = stmt.executeUpdate(sql);
                }
                else//else insert a entry
                {
                    sql = "INSERT INTO `code` (`exp_id`,`name`, `code`) VALUES ('"+id+"', 'animation','"+animation+"');";

                    int executeUpdate = stmt.executeUpdate(sql);

                    sql = "INSERT INTO `code` (`exp_id`,`name`, `code`) VALUES ('"+id+"', 'static','"+staticcode+"');";

                    executeUpdate = stmt.executeUpdate(sql);
                }
                
                sql="UPDATE `exp-details` SET `background`='"+request.getParameter("background")+"' WHERE `exp_id`='"+id+"'";
                int r=stmt.executeUpdate(sql);//update background changes 
                
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
/*if(!rs.next())
                {
                    sql = "INSERT INTO `code` (`exp_id`,`name`, `code`) VALUES ('"+id+"', 'animation','"+animation+"');";

                    int executeUpdate = stmt.executeUpdate(sql);

                    sql = "INSERT INTO `code` (`exp_id`,`name`, `code`) VALUES ('"+id+"', 'static','"+staticcode+"');";

                    executeUpdate = stmt.executeUpdate(sql);
                }
                else
                {
                    sql = "UPDATE `code` SET  `code`='"+animation+"' WHERE `exp_id`='"+id+"' AND `name`='animation'";

                    int executeUpdate = stmt.executeUpdate(sql);

                    sql = "UPDATE `code` SET  `code`='"+static+"' WHERE `exp_id`='"+id+"' AND `name`='static'";

                    executeUpdate = stmt.executeUpdate(sql);
                }*/
