var pulley;
var material;
function pulley_creator(){
    var loader = new THREE.JSONLoader();
    var path="models/pulley.json";
    pulley= new THREE.Mesh(new THREE.SphereGeometry(1,32,32),new THREE.MeshBasicMaterial({transparent:true,opacity:0}));
    pulley.parameters={};    
    pulley.gui=function(){};
    pulley.update=function(){};
    loader.load( path,  addModelToScene);
        
        // After loading JSON from our file, we add it to the scene
        
        function addModelToScene( geometry, materials ) {
            
                material = new THREE.MeshFaceMaterial(materials);
                pulley.pulleyjson = new THREE.Mesh( geometry, material );
                pulley.add(pulley.pulleyjson );
                console.log("model added");
                scene.add(pulley);
                pulley.index = count;
                
    pulley.name = "objects["+count+"]";
    pulley.attr = "name,radius";
    pulley.status=-1;
    pulley.obj="pulley";
    objects.push(pulley);
    count+=1;
    dragElements.push(pulley);
    console.log(pulley);
    collidableMeshList.push(pulley);
    pulley.parameters = 
    {
        name : pulley.name,
        radius: 2,
        delete:function(){ pulley.status=0;scene.remove(pulley) ;gui.destroy();gui=new dat.GUI();}
        

    };
    pulley.gui=function (pulley)
    {

        var pulleyName = gui.add( pulley.parameters, 'name' ).name('Variable Name').listen();

        
        var pulleyLength = gui.add( pulley.parameters, 'radius' ).min(0.1).max(5).step(0.1).name('Radius').listen();
        pulleyLength.onChange(function(value)
        {   pulley.scale.set(value,value,value);
         });

        
            
        
        gui.add( pulley.parameters, 'delete' ).name("delete");
        gui.open();
    };
        pulley.update=function()
        {
           pulley.name=pulley.parameters.name;
           pulley.scale.set(pulley.parameters.radius,pulley.parameters.radius,pulley.parameters.radius);
        };
              }
      console.log(pulley);
      return pulley;

}
