var cone;
function cone_creator(radiusBottom=5,height=5){
    var conegeometry = new THREE.CylinderGeometry(0,radiusBottom,height, 0, false);
    var conematerial = new THREE.MeshBasicMaterial({wireframe: false, color: 0xff0000,transparent:true,opacity:1});
    cone = new THREE.Mesh(conegeometry, conematerial);
    scene.add(cone);
    cone.index = count;
    cone.obj="cone";
    cone.name = "objects["+count+"]";
    cone.attr = "name,radius,height,color,opacity,material";
    cone.status=-1;
    objects.push(cone);
    count+=1;
    dragElements.push(cone);
    collidableMeshList.push(cone);
    cone.parameters = 
    {
        name : cone.name,
        radius: 5,
        height:5,
        color: "#ff0000", // color (change "#" to "0x")
        opacity: 1, 
        visible: true,
        material: "Basic",
         delete:function(){ cone.status=0;scene.remove(cone) ;gui.destroy();gui=new dat.GUI();},
        reset: function() { resetObject(cone) }

    };
    cone.gui=function (cone)
    {

        var coneName = gui.add( cone.parameters, 'name' ).name('Variable Name').listen();

        var coneColor = gui.addColor( cone.parameters, 'color' ).name('Color').listen();
        coneColor.onChange(function(value) // onFinishChange
        {   cone.material.color.setHex( value.replace("#", "0x") );   
        });

        var coneRadius = gui.add( cone.parameters, 'radius' ).min(0).max(50).step(1).name('Radius').listen();
        coneRadius.onChange(function(value)
        {   cone.geometry = new THREE.CylinderGeometry(0,value,cone.parameters.height,0, false);
            cone.geometry.needVerticesUpdate = true;
         });
         
          var coneHeight = gui.add( cone.parameters, 'height' ).min(0).max(50).step(1).name('Height').listen();
        coneHeight.onChange(function(value)
        {   cone.geometry = new THREE.CylinderGeometry(0,cone.parameters.radius,value, 0, false);
            cone.geometry.needVerticesUpdate = true;
         });

        var coneOpacity = gui.add( cone.parameters, 'opacity' ).min(0).max(1).step(0.01).name('Opacity').listen();
        coneOpacity.onChange(function(value)
        {   console.log("opacity changing");
            cone.material.opacity = value;   
        //    render();
        });
        console.log("before");
        var coneMaterial = gui.add( cone.parameters, 'material', [ "Basic", "Lambert", "Phong", "Wireframe" ] ).name('material').listen();
        coneMaterial.onChange(function(value) 
        {   updateMaterial(cone,value); 
          });
        console.log("after");
            var coneVisible = gui.add( cone.parameters, 'visible' ).name('Visible?').listen();
        coneVisible.onChange(function(value) 
        {   
            cone.visible = value;      
        });
        gui.add( cone.parameters, 'delete' ).name("Delete");
        gui.open();

    };
    cone.update=function()
    {
        cone.name=cone.parameters.name;
        cone.material.color.setHex( cone.parameters.color.replace("#", "0x") );   
        cone.geometry = new THREE.CylinderGeometry(0,cone.parameters.radius,cone.parameters.height,0, false);
        cone.geometry.needVerticesUpdate = true;
        cone.material.opacity = cone.parameters.opacity; 
        updateMaterial(cone,cone.parameters.material); 
    };
    return cone;
}