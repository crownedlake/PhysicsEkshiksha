
function cube_creator(side=5){
    var cube = new THREE.Mesh(new THREE.BoxGeometry(side,side,side),new THREE.MeshBasicMaterial({color:"red",transparent:true,opacity:1}));
    scene.add(cube);
    cube.index = objects.length;
    cube.obj="cube";
    cube.name = "objects["+cube.index+"]";
    cube.attr = "name,length,color,opacity,material";
    cube.status=-1;
    objects.push(cube);
    count+=1;
    dragElements.push(cube);
    collidableMeshList.push(cube);
    cube.parameters = 
    {
        name : cube.name,
        length: 5,
        color: "#ff0000", // color (change "#" to "0x")
        opacity: 1, 
        visible: true,
        material: "Basic",
        delete:function(){ cube.status=0;scene.remove(cube) ;gui.destroy();gui=new dat.GUI();},
        reset: function() { resetObject(cube) }

    };
    cube.changelength=function(value)
    {   
        cube.geometry = new THREE.BoxGeometry(value,value,value);
        cube.geometry.needVerticesUpdate = true;
     };
      cube.changecolor=function(value) // onFinishChange
        {   cube.material.color.setHex( value.replace("#", "0x") );  
            
        };
     
     cube.changeopacity=function(value)
        {   console.log("opacity changing");
            cube.material.opacity = value;
           
        //    render();
        };
     cube.changematerial=function(value) 
        {   updateMaterial(cube,value); 
           
          };
    cube.gui=function (cube)
    {
         
        var cubeName = gui.add( cube.parameters, 'name' ).name('Variable Name').listen();
        
        var cubeColor = gui.addColor( cube.parameters, 'color' ).name('Color').listen();
        
       
        cubeColor.onChange(cube.changecolor);
        
        var cubeLength = gui.add( cube.parameters, 'length' ).min(0).max(50).step(1).name('Length').listen();
        
        cubeLength.onChange(cube.changelength);

        var cubeOpacity = gui.add( cube.parameters, 'opacity' ).min(0).max(1).step(0.01).name('Opacity').listen();
        
        cubeOpacity.onChange(cube.changeopacity);
        console.log("before");
        var cubeMaterial = gui.add( cube.parameters, 'material', [ "Basic", "Lambert", "Phong", "Wireframe" ] ).name('material').listen();
        
        cubeMaterial.onChange(cube.changematerial);
        console.log("after");
            var cubeVisible = gui.add( cube.parameters, 'visible' ).name('Visible?').listen();
        cubeVisible.onChange(function(value) 
        {   
            cube.visible = value;  
           
        });
        gui.add( cube.parameters, 'reset' ).name("Reset Cube Parameters");
        gui.add(cube.parameters,'delete').name( "Delete");
       
        gui.open();

    };
    cube.update=function(){
        cube.name=cube.parameters.name;
        cube.changecolor(cube.parameters.color);
        cube.changelength(cube.parameters.length);
        cube.changematerial(cube.parameters.material);
        cube.changeopacity(cube.parameters.opacity);
     };
      return cube;
            
}

  
