function sphere_creator(radius=4){
    var geometry = new THREE.SphereGeometry( radius,32,32 );
    var material = new THREE.MeshBasicMaterial( { color: "red",transparent:true,opacity:1} );
    var sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
    sphere.index = count;
    sphere.name = "objects["+count+"]";
    sphere.attr = "name,radius,color,opacity,material";
    sphere.status=-1;
    sphere.obj="sphere";
    objects.push(sphere);
    count+=1;
    dragElements.push(sphere);
    collidableMeshList.push(sphere);
    sphere.parameters = 
    {
        name : sphere.name,
        radius:4,
        color: "#ff0000", // color (change "#" to "0x")
        opacity: 1, 
        visible: true,
        material: "Phong",
         delete:function(){ sphere.status=0;scene.remove(sphere) ;gui.destroy();gui=new dat.GUI();},
        reset: function() { resetObject(sphere) }

    };
    sphere.gui=function (sphere)
    {

        var sphereName = gui.add( sphere.parameters, 'name' ).name('Variable Name').listen();

        var sphereColor = gui.addColor( sphere.parameters, 'color' ).name('Color').listen();
        sphereColor.onChange(function(value) // onFinishChange
        {   sphere.material.color.setHex( value.replace("#", "0x") );   
        });

        var sphereRadius = gui.add( sphere.parameters, 'radius' ).min(0).max(50).step(1).name('Radius').listen();
        sphereRadius.onChange(function(value)
        {   sphere.geometry = new THREE.SphereGeometry( value,32,32 );
            sphere.geometry.needVerticesUpdate = true;
         });

        var sphereOpacity = gui.add( sphere.parameters, 'opacity' ).min(0).max(1).step(0.01).name('Opacity').listen();
        sphereOpacity.onChange(function(value)
        {   console.log("opacity changing");
            sphere.material.opacity = value;   
        //    render();
        });
        console.log("before");
        var sphereMaterial = gui.add( sphere.parameters, 'material', [ "Basic", "Lambert", "Phong", "Wireframe" ] ).name('material').listen();
        sphereMaterial.onChange(function(value) 
        {   updateMaterial(sphere,value); 
          });
        console.log("after");
            var sphereVisible = gui.add( sphere.parameters, 'visible' ).name('Visible?').listen();
        sphereVisible.onChange(function(value) 
        {   
            sphere.visible = value;      
        });
        gui.add( sphere.parameters, 'delete' ).name("Delete");
        gui.open();

    };
    sphere.update=function(){
        sphere.name=sphere.material.name;
        sphere.material.color.setHex( sphere.parameters.color.replace("#", "0x") );  
         sphere.geometry = new THREE.SphereGeometry( sphere.parameters.radius,32,32 );
         sphere.geometry.needVerticesUpdate = true;
         sphere.material.opacity = sphere.parameters.opacity;
         updateMaterial(sphere,sphere.parameters.material);
    };
    return sphere;
}