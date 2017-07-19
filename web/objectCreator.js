function object_creator(name)
{
  var model;
  var loader = new THREE.JSONLoader();
  var path="models/"+name+".json";
  loader.load( path,  addModelToScene);

  // After loading JSON from our file, we add it to the scene
  function addModelToScene( geometry, materials ) {
	  var material = new THREE.MeshFaceMaterial(materials);
	  model = new THREE.Mesh( geometry, material );
	  scene.add( model );
          console.log("model added");
	}
return model;
}
