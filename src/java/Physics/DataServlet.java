/*
 * This servlet file will give data about categories and objects.
 * If category and object are send as null,it will return all categories in a CSV format.
 * Given category ,it will return all objects and data related to it 
 * under the given category as a JSON response.
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
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 *
 * @author Balgond
 */
public class DataServlet extends HttpServlet {

    

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
        PrintWriter out = response.getWriter();
        String re="";
        String category=request.getParameter("category");
        String object=request.getParameter("object");
        
        try {
            Connection conn = null;
            try {
                conn = ConnectionPool.getInstance().getConnection();
            } catch (ClassNotFoundException | InstantiationException | IllegalAccessException ex) {
                Logger.getLogger(DataServlet.class.getName()).log(Level.SEVERE, null, ex);
            }
            Statement stmt=conn.createStatement();
            if(category.equals("")&&object.equals(""))
            {
                String sql = "SELECT DISTINCT Category FROM `category-object`";
                ResultSet rs = stmt.executeQuery(sql);
                if(rs.next())
                {
                  String first = rs.getString("Category");
                  re+= first;
                }
                while(rs.next())
                {
                   String first = rs.getString("Category");
                   re+=","+first;
                }
                rs.close();
            }
            else if(object.equals(""))
            {
                String sql = "SELECT `Object` FROM `category-object` WHERE `Category`='"+category+"'";
                ResultSet rs1 = stmt.executeQuery(sql);
                String objects[]=new String[20];
                JSONArray a = new JSONArray();
                int len=0;
                while(rs1.next()) {
                    objects[len++]=rs1.getString("Object");
                }
                rs1.close();
                int i=0;
                while(len>=0)
                {
                    String sql1="SELECT * FROM `object-list2` WHERE `object`='"+objects[len--]+"'";
                    ResultSet rs = stmt.executeQuery(sql1);
                    while(rs.next())
                    {
                        JSONObject obj= new JSONObject();
                        obj.put("name", rs.getString("object"));
                        obj.put("icon",rs.getString("Iconname"));
                        obj.put("file",rs.getString("Filename"));
                        obj.put("func", rs.getString("Funcname"));
                        a.add(i,obj);
                    }   
                }
                out.println(a);
                /******/
               
            }
        } catch (SQLException ex) {
            Logger.getLogger(DataServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        out.println(re);
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
