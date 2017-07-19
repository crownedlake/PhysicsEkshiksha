var heart;
var material;
function heart_creator(radius=2){

	
        
        var loader = new THREE.JSONLoader();
        var path1="models/heart1.json";
        var path2="models/heart2.json";
        var path3="models/heart3.json";
        var path4="models/heart4.json";
        var path5="models/heart5.json";
      //  var path6="models/heart6.json";
        var c = 0;
        loader.load( path1,  addModelToScene);
        loader.load( path2,  addModelToScene);
        loader.load( path3,  addModelToScene);
        loader.load( path4,  addModelToScene);
        loader.load( path5,  addModelToScene);
      //  loader.load( path6,  addModelToScene);

        // After loading JSON from our file, we add it to the scene
        heartArray = [];
        function addModelToScene( geometry, materials ) {
                material = new THREE.MeshFaceMaterial(materials);
                heart = new THREE.Mesh( geometry, material );
                scene.add(heart );
                console.log("model added");
                heart.index = count;
                heart.name = "objects["+count+"]";
                heart.attr = "name,size";
                heart.status=-1;
                heart.obj="heart";
                objects.push(heart);
                count+=1;
                dragElements.push(heart);
                console.log(heart);
                collidableMeshList.push(heart);
                c++;
                heart.parameters = 
                {
                    name : heart.name,
                    size: 2,
                    delete:function(){ heart.status=0;scene.remove(heart) ;gui.destroy();gui=new dat.GUI();}


                };
                heart.gui=function (heart)
                {

                    var heartName = gui.add( heart.parameters, 'name' ).name('Variable Name').listen();


                    var heartLength = gui.add( heart.parameters, 'size' ).min(0.1).max(5).step(0.1).name('Radius').listen();
                    heartLength.onChange(function(value)
                    {   heart.scale.set(value,value,value);
                     });




                    gui.add( heart.parameters, 'delete' ).name("delete");
                    gui.open();
                };
                heart.update=function()
                {
                   heart.name=heart.parameters.name;
                   heart.scale.set(heart.parameters.radius,heart.parameters.radius,heart.parameters.radius);
                };
        
                heartArray.push(heart);      
                
        }
      
    //return heartArray[0];
	//return heart;

}
