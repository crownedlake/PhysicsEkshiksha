var springB;
function springbalance_creator()
{
	var material = new THREE.MeshLambertMaterial({color: "blue"});
    var geometry = new THREE.BoxGeometry( 4,12, 4 );
    springB = new THREE.Mesh( geometry, material );
    springB.receiveShadow = true;
    

    material = new THREE.MeshLambertMaterial({color: "red"});
    geometry = new THREE.BoxGeometry( 1,10, 1 );
    box = new THREE.Mesh( geometry, material );
    box.position.set(0, 0, 2);
    box.receiveShadow = true;
    

    material = new THREE.MeshLambertMaterial({color: "grey"});
    geometry = new THREE.BoxGeometry( 1,0.5, 1 );
    springB.pointer = new THREE.Mesh( geometry, material );
    springB.pointer.position.set(0, 5, 2);
    springB.pointer.receiveShadow = true;
  
	material=new THREE.MeshLambertMaterial({color: "grey"});
    geometry = new THREE.BoxGeometry( 0.5,3, 1 );
	handle = new THREE.Mesh(geometry,material);
	handle.position.set(0,-7,0);
	

	springB.add(box);
	springB.add(handle);
	springB.add(springB.pointer);
	
	
	

	scene.add(springB);	
        
        springB.setReading=function(value)
        {
            springB.side1.position.set(0,springBalanceY+7.5-value,6);
        }
        
    springB.index = count;
    springB.obj="springB";
    springB.name = "objects["+count+"]";
    springB.attr = "name,scale,reading";
    springB.status=-1;
    springB.obj="springbalance";
    objects.push(springB);
    count+=1;
    dragElements.push(springB);
    collidableMeshList.push(springB);
    springB.parameters = 
    {
        name : springB.name,
        scale:1,
        visible: true,
        reading:0,
        delete:function(){ springB.status=0;scene.remove(springB) ;gui.destroy();gui=new dat.GUI();}
        //reset: function() { resetObject(springB) }

    };
    springB.gui=function (springB)
    {

        var springBName = gui.add( springB.parameters, 'name' ).name('Variable Name').listen();

        var springBscale=gui.add(springB.parameters, 'scale' ).min(0.1).max(5).step(0.1).name('Scale').listen();
        springBscale.onChange(function(value){
           springB.scale.set(value,value,value); 
        });
        
        var springBreading=gui.add(springB.parameters, 'reading' ).min(0).max(10).step(0.1).name('Reading').listen();
       springBreading.onChange(function(value){
           springB.pointer.position.set(0,5-value,2);
       });
        
        var springBVisible = gui.add( springB.parameters, 'visible' ).name('Visible?').listen();
        springBVisible.onChange(function(value) 
        {   
            springB.visible = value;      
        });
        gui.add(springB.parameters,'delete').name("Delete");
        gui.open();

    };
        
	return springB;
    
}