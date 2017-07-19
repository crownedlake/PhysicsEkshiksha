/*
 * This servlet gets data from database and generates code for the session experiment-id
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
@WebServlet(name = "NewWrite", urlPatterns = {"/NewWrite"})
public class NewWrite extends HttpServlet {

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
        HttpSession session;String idi;
        if(!request.getParameter("id").equals("-1"))
        {
            idi=request.getParameter("id");
        }
        else
        {
            session = request.getSession();
            idi=session.getAttribute("id").toString();
        }
         
        String declaration =""; 
        try {
            Connection conn = null;
            try {
                conn = ConnectionPool.getInstance().getConnection();
            } catch (ClassNotFoundException | InstantiationException | IllegalAccessException ex) {
                Logger.getLogger(DataServlet.class.getName()).log(Level.SEVERE, null, ex);
            }
            Statement stmt=conn.createStatement();
           
            String sql="SELECT * FROM `exp-details` WHERE `exp_id`='"+idi+"'";
            ResultSet rs = stmt.executeQuery(sql);
            
            while(rs.next())
            {
                declaration+=rs.getString("background")+"();\n"; //set background
            }
            
            //instantiate objects and their parameters stored in table `bom`
            declaration+="var objects=[];\nvar count=0;\n";
            stmt=conn.createStatement();
            sql="SELECT * FROM `bom` WHERE `exp_id`='"+idi+"'";
            rs = stmt.executeQuery(sql);
            while(rs.next())
            {
                String object=rs.getString("object");
                String name=rs.getString("name");
                String attr[]=rs.getString("attributes").split(",");
                String data[]=rs.getString("data").split(",");
                String type[]=rs.getString("type").split(",");
                String pos[]=rs.getString("positions").split(",");

                declaration+=name+"="+object+"_creator();\n";
                for(int i=0;i<attr.length;i++)
                {
                    if(type[i].equalsIgnoreCase("string"))
                        declaration+=name+".parameters."+attr[i]+"=\""+data[i]+"\";\n";
                    else
                        declaration+=name+".parameters."+attr[i]+"="+data[i]+";\n";
                }
                declaration+=name+".status=1;\n";
                declaration+=name+".position.set("+pos[0]+","+pos[1]+","+pos[2]+");\n";
                declaration+=name+".update();\n";
                
            }
            
                //animation and static code
               declaration+="\n/*;*/"; 
               stmt=conn.createStatement();
                sql="SELECT * FROM `code` WHERE `exp_id`='"+idi+"'";
                rs = stmt.executeQuery(sql);
                while(rs.next())
                    declaration+=rs.getString("code")+"/*;*/\n";
                /******/
               
               //instantiate lights defined and set thier parameters
                stmt=conn.createStatement();
                sql="SELECT * FROM `light` WHERE `exp_id`='"+idi+"'";
                rs = stmt.executeQuery(sql);
                while(rs.next())
                {
                    String object=rs.getString("lighttype");
                    String name=rs.getString("name");
                    String attr[]=rs.getString("attributes").split(",");
                    String data[]=rs.getString("data").split(",");
                    String type[]=rs.getString("type").split(",");

                    declaration+=name+"="+object+"();\n";
                    for(int i=0;i<attr.length;i++)
                    {
                        if(type[i].equalsIgnoreCase("string"))
                            declaration+=name+".parameters."+attr[i]+"=\""+data[i]+"\";\n";
                        else
                            declaration+=name+".parameters."+attr[i]+"="+data[i]+";\n";
                    }
                    declaration+=name+".update();\n";

                } 
                /******/
                
                
                //instantiate usercontrolpanel and userdisplaypanel
               stmt=conn.createStatement();
                sql="SELECT * FROM `usercontrol` WHERE `exp_id`='"+idi+"'";
                rs = stmt.executeQuery(sql);
                while(rs.next())
                {
                    String attr=rs.getString("attr");
                    String panel=rs.getString("panel");
                    
                    /*UserControlPanel(mina,maxa,stepa,vara,namea,functiona)*/
                    if(panel.equals("UserControlPanel"))
                    {  
                        String fname=attr.split(",")[5];
                        declaration+="var "+fname+"=function(value){"+rs.getString("code")+"};";
                        declaration+=panel+"("+attr+");";
                    }
                    else
                    {
                        declaration+=panel+"('"+attr+"');";
                    }
                    
                }
                
            }
        catch (SQLException ex) {
            Logger.getLogger(DataServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        PrintWriter out1=response.getWriter();
        out1.println(declaration);
        
    }

    

}
