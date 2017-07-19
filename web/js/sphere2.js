var sphere2;
var material;
function sphere2_creator(){
    var loader = new THREE.JSONLoader();
    var path="models/sphere2.json";
    sphere2= new THREE.Mesh(new THREE.SphereGeometry(1,32,32),new THREE.MeshBasicMaterial({transparent:true,opacity:0}));
    sphere2.parameters={};    
    sphere2.gui=function(){};
    sphere2.update=function(){};
    loader.load( path,  addModelToScene);
        
        // After loading JSON from our file, we add it to the scene
        
        function addModelToScene( geometry, materials ) {
            
                material = new THREE.MeshFaceMaterial(materials);
                sphere2.sphere2json = new THREE.Mesh( geometry, material );
                sphere2.add(sphere2.sphere2json );
                console.log("model added");
                scene.add(sphere2);
                sphere2.index = count;
                
    sphere2.name = "objects["+count+"]";
    sphere2.attr = "name,radius";
    sphere2.status=-1;
    sphere2.obj="sphere2";
    objects.push(sphere2);
    count+=1;
    dragElements.push(sphere2);
    console.log(sphere2);
    collidableMeshList.push(sphere2);
    sphere2.parameters = 
    {
        name : sphere2.name,
        radius: 2,
        delete:function(){ sphere2.status=0;scene.remove(sphere2) ;gui.destroy();gui=new dat.GUI();}
        

    };
    sphere2.gui=function (sphere2)
    {

        var sphere2Name = gui.add( sphere2.parameters, 'name' ).name('Variable Name').listen();

        
        var sphere2Length = gui.add( sphere2.parameters, 'radius' ).min(0.1).max(5).step(0.1).name('Radius').listen();
        sphere2Length.onChange(function(value)
        {   sphere2.scale.set(value,value,value);
         });

        
            
        
        gui.add( sphere2.parameters, 'delete' ).name("delete");
        gui.open();
    };
        sphere2.update=function()
        {
           sphere2.name=sphere2.parameters.name;
           sphere2.scale.set(sphere2.parameters.radius,sphere2.parameters.radius,sphere2.parameters.radius);
        };
              }
      console.log(sphere2);
      return sphere2;

}