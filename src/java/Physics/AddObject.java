/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Physics;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletContext;
import javax.servlet.http.Part;

/**
 *
 * @author Pragati
 */
public class AddObject extends HttpServlet {

    

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
        PrintWriter out1 = response.getWriter();
        ServletContext servletContext = request.getSession().getServletContext();
        
        String relativeWebPath = "/images";
        String savePath = servletContext.getRealPath(relativeWebPath);
        out1.println(savePath);
        // creates the save directory if it does not exists
        File fileSaveDir = new File(savePath);
        if (!fileSaveDir.exists()) {
            fileSaveDir.mkdir();
        }
        String iconName;
        Part part = request.getPart("file");
        iconName = extractFileName(part);
        // refines the fileName in case it is an absolute path
        iconName = new File(iconName).getName();
        part.write(savePath + File.separator + iconName);
        String funname;
        String jsfile;
        String cat;
        String declaration;
        if(!request.getParameter("code").equals("")){
            declaration =request.getParameter("code");
            funname=request.getParameter("func");
            jsfile=request.getParameter("name");
            cat=request.getParameter("category");
        }
        else
        {
            String blendName;
            part = request.getPart("blender_object");
            blendName = extractFileName(part);
            blendName = new File(blendName).getName();
            String name=request.getParameter("name");
            declaration="var "+name+";\n" +
            "var material;\n" +
            "function "+name+"_creator(){\n" +
            "    var loader = new THREE.JSONLoader();\n" +
            "    var path=\"models/"+blendName+"\";\n" +
            "    "+name+"= new THREE.Mesh(new THREE.SphereGeometry(1,32,32),new THREE.MeshBasicMaterial({transparent:true,opacity:0}));\n" +
            "    "+name+".parameters={};    \n" +
            "    "+name+".gui=function(){};\n" +
            "    "+name+".update=function(){};\n" +
            "    loader.load( path,  addModelToScene);\n" +
            "        \n" +
            "        // After loading JSON from our file, we add it to the scene\n" +
            "        \n" +
            "        function addModelToScene( geometry, materials ) {\n" +
            "            \n" +
            "                material = new THREE.MeshFaceMaterial(materials);\n" +
            "                "+name+"."+name+"json = new THREE.Mesh( geometry, material );\n" +
            "                "+name+".add("+name+"."+name+"json );\n" +
            "                console.log(\"model added\");\n" +
            "                scene.add("+name+");\n" +
            "                "+name+".index = count;\n" +
            "                \n" +
            "    "+name+".name = \"objects[\"+count+\"]\";\n" +
            "    "+name+".attr = \"name,radius\";\n" +
            "    "+name+".status=-1;\n" +
            "    "+name+".obj=\""+name+"\";\n" +
            "    objects.push("+name+");\n" +
            "    count+=1;\n" +
            "    dragElements.push("+name+");\n" +
            "    console.log("+name+");\n" +
            "    collidableMeshList.push("+name+");\n" +
            "    "+name+".parameters = \n" +
            "    {\n" +
            "        name : "+name+".name,\n" +
            "        radius: 2,\n" +
            "        delete:function(){ "+name+".status=0;scene.remove("+name+") ;gui.destroy();gui=new dat.GUI();}\n" +
            "        \n" +
            "\n" +
            "    };\n" +
            "    "+name+".gui=function ("+name+")\n" +
            "    {\n" +
            "\n" +
            "        var "+name+"Name = gui.add( "+name+".parameters, 'name' ).name('Variable Name').listen();\n" +
            "\n" +
            "        \n" +
            "        var "+name+"Length = gui.add( "+name+".parameters, 'radius' ).min(0.1).max(5).step(0.1).name('Radius').listen();\n" +
            "        "+name+"Length.onChange(function(value)\n" +
            "        {   "+name+".scale.set(value,value,value);\n" +
            "         });\n" +
            "\n" +
            "        \n" +
            "            \n" +
            "        \n" +
            "        gui.add( "+name+".parameters, 'delete' ).name(\"delete\");\n" +
            "        gui.open();\n" +
            "    };\n" +
            "        "+name+".update=function()\n" +
            "        {\n" +
            "           "+name+".name="+name+".parameters.name;\n" +
            "           "+name+".scale.set("+name+".parameters.radius,"+name+".parameters.radius,"+name+".parameters.radius);\n" +
            "        };\n" +
            "              }\n" +
            "      console.log("+name+");\n" +
            "      return "+name+";\n" +
            "\n" +
            "}";
            funname=name+"_creator";
            relativeWebPath = "/models";
            savePath = servletContext.getRealPath(relativeWebPath);
            out1.println(savePath);

            fileSaveDir = new File(savePath);
            if (!fileSaveDir.exists()) {
                fileSaveDir.mkdir();
            }

            
            part.write(savePath + File.separator + blendName);
            jsfile=request.getParameter("name");
            cat="Mechanics";
            
        }
        try (BufferedWriter out = new BufferedWriter(new OutputStreamWriter(
                    new FileOutputStream(servletContext.getRealPath("/js/"+request.getParameter("name")+".js")), "UTF-8"))) {
                out.write(declaration);
            }
	try {
            Connection conn = null;
             try {
                 conn = ConnectionPool.getInstance().getConnection();
             } catch (ClassNotFoundException | InstantiationException | IllegalAccessException ex) {
                 Logger.getLogger(UploadObject.class.getName()).log(Level.SEVERE, null, ex);
             }
            
            Statement stmt=conn.createStatement();
            String sql = "INSERT INTO `object-list2`(`object`, `Filename`, `Funcname`, `Iconname`) VALUES ('"+request.getParameter("name")+"','"+jsfile+"','"+funname+"','"+iconName+"')";
             int executeUpdate = stmt.executeUpdate(sql);
            stmt=conn.createStatement();
            sql = "INSERT INTO `category-object`(`Category`, `Object`) VALUES ('"+cat+"','"+request.getParameter("name")+"')";
            executeUpdate = stmt.executeUpdate(sql);
        } catch (SQLException ex) {
            Logger.getLogger(DataServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        response.sendRedirect(request.getContextPath());
        
    }

    private String extractFileName(Part part) {
        String contentDisp = part.getHeader("content-disposition");
        String[] items = contentDisp.split(";");
        for (String s : items) {
            if (s.trim().startsWith("filename")) {
                return s.substring(s.indexOf("=") + 2, s.length()-1);
            }
        }
        return "";
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
