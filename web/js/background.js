var layer=[];
var background;
function setBackground1(){
    scene.background = new THREE.Color("#67DEF7");

    background="setBackground1";
    var groundMaterial = new THREE.MeshBasicMaterial(  );

    var mesh233 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 6000, 6000 ), groundMaterial );
    mesh233.position.y =  -29;
    mesh233.material.color.set("lightgreen" );
    mesh233.rotation.x = - Math.PI / 2;
    scene.add(mesh233);
    layer.push(mesh233);

    var groundMaterial = new THREE.MeshBasicMaterial(  );
    mesh233 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 550, 5550 ), groundMaterial );
    mesh233.position.y = - 17-10;
    mesh233.material.color.set("#47FC57" );
    mesh233.rotation.x = - Math.PI / 2;
    scene.add(mesh233);
    var groundMaterial = new THREE.MeshBasicMaterial(  );
    layer.push(mesh233);

    mesh233 = new THREE.Mesh( new THREE.PlaneBufferGeometry(300, 300 ), groundMaterial );
    mesh233.position.y = - 15-10;
    mesh233.material.color.set("#33C720" );
    mesh233.rotation.x = - Math.PI / 2;
    scene.add(mesh233);
    layer.push(mesh233);
    console.log("1");
    console.log(layer);
}    
function setBackground2(){
    scene.background = new THREE.Color("#c6cad1");
    var groundMaterial = new THREE.MeshBasicMaterial(  );
    background="setBackground2";
    var mesh233 = new THREE.Mesh( new THREE.SphereBufferGeometry( 6000, 6000 ), groundMaterial );
    mesh233.position.y =  -29;
    mesh233.material.color.set("#c6cad1");
    mesh233.rotation.x = - Math.PI / 2;
    scene.add(mesh233);
    layer.push(mesh233);

    var groundMaterial = new THREE.MeshBasicMaterial(  );
    mesh233 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 550, 5500 ), groundMaterial );
    mesh233.position.y = - 17-10;
    mesh233.material.color.set("black" );
    mesh233.rotation.x = - Math.PI / 2;
    scene.add(mesh233);
    layer.push(mesh233);
    var groundMaterial = new THREE.MeshBasicMaterial(  );

}    

function setBackground3(){
    scene.background = new THREE.Color("#f79d42");
    background="setBackground3";
    var groundMaterial = new THREE.MeshBasicMaterial(  );
    var count = -500;
    var h = -40;
    for (var i=0;i<50;i++){
                var mesh233 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 10, 6000 ), groundMaterial );
            mesh233.position.y =  h ;
            mesh233.material.color.set("red");
            mesh233.position.x = count;
            mesh233.rotation.x = - Math.PI / 2;
            scene.add(mesh233);
            layer.push(mesh233);
            count += 20;
        }	
    var groundMaterial = new THREE.MeshBasicMaterial(  );

}    

function setBackground4(){
        scene.background = new THREE.Color("#67DEF7");
        background="setBackground4";
    var groundMaterial = new THREE.MeshBasicMaterial(  );
        var mesh233 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 6000, 6000 ), groundMaterial );
    mesh233.position.y =  -32;
    mesh233.material.color.set("green" );
    mesh233.rotation.x = - Math.PI / 2;
    scene.add(mesh233);
    layer.push(mesh233);

    var groundMaterial = new THREE.MeshBasicMaterial(  );
        var mesh2333 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 50, 6000 ), groundMaterial );
    mesh2333.position.y =  -29;
    mesh2333.material.color.set("black" );
    mesh2333.rotation.x = - Math.PI / 2;
    mesh2333.rotation.z = -Math.PI/6.5;
    scene.add(mesh2333);
    layer.push(mesh2333);

    for(var j= 0;j<50;j++){

            var groundMaterial = new THREE.MeshBasicMaterial(  );
                var mesh233 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 4, 20 ), groundMaterial );
            mesh233.position.y = 5;
            mesh233.material.color.set("white" );
            mesh233.position.y = 750-40*j
            mesh2333.add(mesh233);

    }

}    
function setBackground5(){
    
    
    background="setBackground5";
        var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(80, 32, 32),
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('https://farm4.staticflickr.com/3188/2668268323_158c25a245_o.jpg')
        }));
        sphere.scale.x = -1;		
        scene.add(sphere);
        layer.push(sphere);
        controls.noPan = true;
        controls.noZoom = true; 
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

}