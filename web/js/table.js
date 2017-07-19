var table;
var material;
function table_creator(){
    var loader = new THREE.JSONLoader();
    var path="models/table.json";
    table= new THREE.Mesh(new THREE.SphereGeometry(1,32,32),new THREE.MeshBasicMaterial({transparent:true,opacity:0}));
    table.parameters={};    
    table.gui=function(){};
    table.update=function(){};
    loader.load( path,  addModelToScene);
        
        // After loading JSON from our file, we add it to the scene
        
        function addModelToScene( geometry, materials ) {
            
                material = new THREE.MeshFaceMaterial(materials);
                table.tablejson = new THREE.Mesh( geometry, material );
                table.add(table.tablejson );
                console.log("model added");
                scene.add(table);
                table.index = count;
                
    table.name = "objects["+count+"]";
    table.attr = "name,radius";
    table.status=-1;
    table.obj="table";
    objects.push(table);
    count+=1;
    dragElements.push(table);
    console.log(table);
    collidableMeshList.push(table);
    table.parameters = 
    {
        name : table.name,
        radius: 2,
        delete:function(){ table.status=0;scene.remove(table) ;gui.destroy();gui=new dat.GUI();}
        

    };
    table.gui=function (table)
    {

        var tableName = gui.add( table.parameters, 'name' ).name('Variable Name').listen();

        
        var tableLength = gui.add( table.parameters, 'radius' ).min(0.1).max(5).step(0.1).name('Radius').listen();
        tableLength.onChange(function(value)
        {   table.scale.set(value,value,value);
         });

        
            
        
        gui.add( table.parameters, 'delete' ).name("delete");
        gui.open();
    };
        table.update=function()
        {
           table.name=table.parameters.name;
           table.scale.set(table.parameters.radius,table.parameters.radius,table.parameters.radius);
        };
              }
      console.log(table);
      return table;

}

