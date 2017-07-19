function slab_creator(length=40,breadth=5,ri=1.5){
			  	var slab = new THREE.Mesh( new THREE.CubeGeometry( breadth,length, 2 ), new THREE.MeshPhongMaterial({color:'#ffffff',transparent:true,opacity:0.7}) );
				  slab.position.set(0,0,0);
				  scene.add( slab );
			      objects.push(slab);
			      dragElements.push(slab);
			      slab.type = "slab";
				  slab.length = length;
				  slab.breadth = breadth;
				  slab.ri=ri;
                                  slab.attr="l,b,r";
				  slab.parameters ={
				  	l: 40,
				  	b: 5,
				  	r: 1.5
				  };
                                  slab.obj="slab";
                                  slab.name="objects["+count+"]";
                                  count+=1;
                                  
					slab.update=function(){
						slab.geometry = new THREE.CubeGeometry(slab.parameters.b,slab.parameters.l,2);
						slab.breadth=slab.parameters.b;
						slab.geometry.needVerticesUpdate = true;
						slab.ri=slab.parameters.r;
                                                slab.length=slab.parameters.l;
						slab.material.opacity=(0.7/1.5)*slab.parameters.r;

					};

				  slab.gui=function(slab){


				  	var slabLength = gui.add( slab.parameters, 'l' ).min(0).max(100).step(1).name('Length').listen();
       				slabLength.onChange(function(value)
        			{
                		slab.geometry = new THREE.CubeGeometry(slab.parameters.b,value,2);
                		slab.length=value;
                		slab.geometry.needVerticesUpdate = true;

         			});
         			var slabBreadth = gui.add( slab.parameters, 'b' ).min(0).max(100).step(1).name('Breadth').listen();
       				slabBreadth.onChange(function(value)
        			{
                		slab.geometry = new THREE.CubeGeometry(value,slab.parameters.l,2);
                		slab.breadth=value;
                		slab.geometry.needVerticesUpdate = true;

         			});
         			var ri=gui.add(slab.parameters,'r').min(0.5).max(2).step(0.1).name('Refractive Index').listen().onChange(function(value){
         				slab.ri=value;
         				slab.material.opacity=(0.7/1.5)*value;
         			});

				  };
                                  slab.status=-1;
				  return slab;
			}




		function convexlens_creator(focal=1.5){
                    
						var focii=10;
						var leftRemoval = new THREE.Mesh(new THREE.SphereGeometry(focii,32,32),new THREE.MeshPhongMaterial({color:"white",transparent:true,opacity:0.8}));
						leftRemoval.position.set(-1.5*focii/2,0,0);

						var rightRemoval = new THREE.Mesh(new THREE.SphereGeometry(focii,32,32),new THREE.MeshPhongMaterial({color:"white",transparent:true,opacity:0.8}));
						rightRemoval.position.set(1.5*focii/2,0,0);

						var slab = new THREE.Mesh(new THREE.BoxGeometry(2*focii,2*focii,2*focii),new THREE.MeshPhongMaterial({color:"white",transparent:true,opacity:0.8}));
						slab.position.set(0,0,0);

						var leftRemovalBSP = new ThreeBSP(leftRemoval);
						var rightRemovalBSP = new ThreeBSP(rightRemoval);
						var slabBSP = new ThreeBSP(slab);
						var resultBSP = slabBSP.intersect(rightRemovalBSP.intersect(leftRemovalBSP));

						var result = resultBSP.toMesh(new THREE.MeshPhongMaterial({color:"white",transparent:true,opacity:0.8}));
						result.geometry.computeFaceNormals();
						result.geometry.computeVertexNormals();
                                                result.scale.x=(focii/(8*focal));
						scene.add(result);



			    		var lineGeometry = new THREE.Geometry();
			    		lineGeometry.vertices.push(new THREE.Vertex(-1000,0,0));
			    		lineGeometry.vertices.push(new THREE.Vertex(1000,0,0));

			   			var line = new THREE.Line(lineGeometry,new THREE.LineBasicMaterial({color:"white"}));
			  			result.add(line);

			    		var f = focii;

					    result.focallength = focal;
					    result.type = "convexlens";
						objects.push(result);
			   			dragElements.push(result);
                                                result.obj="convexlens";
                                                result.name="objects["+count+"]";
                                                count+=1;
			   			result.parameters={
							f: focal
							};
							result.attr="f";
							result.update=function(){
								result.scale.x=(focii/(8*result.parameters.f));
							};

							result.gui=function(result){
							//var gui =new  dat.GUI();
							var lensFocal = gui.add( result.parameters, 'f' ).min(0.5).max(20).step(0.5).name('Focal Length').listen();
							lensFocal.onChange(function(value)
							{
							result.focallength=value;
							result.scale.x=(focii/(8*value));
							});

							};
                                                        result.status=-1;
                                                       
							return result;
                                                        

			}

			function concavemirror_creator(focal=10){
				  var radius=5;
				  var geometry = new THREE.SphereGeometry( radius, 32, 32,Math.PI/2,Math.PI,0,Math.PI);
				  var material = new THREE.MeshPhongMaterial({color:'#C0C0C0',transparent:true,opacity:0.8});
				  material.side = THREE.DoubleSide;
				  var mirror = new THREE.Mesh( geometry, material );
				  scene.add( mirror );


				  mirror.position.set(0,0,0);
				  var material_back = new THREE.MeshPhongMaterial({color:'#0A0A0A',transparent:true,opacity:0.8});
				  var mirror_back = new THREE.Mesh( geometry, material_back );
				  mirror.add(mirror_back);
				  mirror_back.position.set(0.5,0,0);
				  mirror.scale.x=0.25;
				  mirror.type = "concavemirror";
				  mirror.focallength = focal;
				  objects.push(mirror);
				  dragElements.push(mirror);
                                  mirror.obj="concavemirror";
                                  mirror.name="objects["+count+"]";
                                  count+=1;
				  mirror.parameters={
				  	f: focal
				  };
					mirror.attr="f";
					mirror.update=function(){
						mirror.scale.x=(radius/(2*(mirror.parameters.f)))*0.25;
						mirror.focallength=mirror.parameters.f;
					};

				  mirror.gui=function(mirror){

				  	var mirrorFocal = gui.add( mirror.parameters, 'f' ).min(0.5).max(20).step(0.5).name('Focal Length').listen();
       				mirrorFocal.onChange(function(value)
        			{
                		mirror.focallength=value;
                		mirror.scale.x=(radius/(2*(value)))*0.25;

         			});

				  };
				  mirror_back.gui=function(){mirror.gui(mirror);};
                                  mirror.status=-1;
					return mirror;

			}


			function convexmirror_creator(focal=10){
				var radius=5;
			  var geometry = new THREE.SphereGeometry( radius, 32, 32,-Math.PI/2,Math.PI,0,Math.PI);
			  var material = new THREE.MeshPhongMaterial({color:'#0A0A0A',transparent:true,opacity:0.8});
			  material.side = THREE.DoubleSide;
			  var mirror = new THREE.Mesh( geometry, material );
			  scene.add( mirror );
			  mirror.position.set(3,0,0);
			  var material_front = new THREE.MeshPhongMaterial({color:'#C0C0C0',transparent:true,opacity:0.8});
			  var mirror_front = new THREE.Mesh( geometry, material_front );
			  mirror.add(mirror_front);
			  mirror_front.position.set(-0.5,0,0);
			  mirror.scale.x=0.25;
			  mirror.focallength = focal;
			  mirror.type = "convexmirror";
			  objects.push(mirror);
			  dragElements.push(mirror);
                          
                          mirror.obj="convexmirror";
                          
                          mirror.name="objects["+count+"]";
                          count+=1;
			  mirror.parameters={
				  	f: focal
				  };
				 console.log("aaaaa");
				 mirror.update=function(){
					 mirror.scale.x=(focal/(8*mirror.parameters.f));
						mirror.focallength=mirror.parameters.f;

				 };
				 mirror.attr="f";
				  mirror.gui=function(mirror){

				  	console.log("asdasd");
				  	var mirrorFocal = gui.add( mirror.parameters, 'f' ).min(0.5).max(20).step(0.5).name('Focal Length').listen();
       				mirrorFocal.onChange(function(value)
        			{
                		mirror.focallength=value;
                		mirror.scale.x=(radius/(2*value))*0.25;

         			});

				  };
				  mirror_front.gui=function(){mirror.gui(mirror);};
                                  mirror.status=-1;
				 return mirror;


			}


				function concavelens_creator(focal=5){
        var focii=10;
        var slab = new THREE.Mesh(new THREE.BoxGeometry(focii/2,focii,focii),new THREE.MeshPhongMaterial({color:"white",transparent:true,opacity:0.8}));


        var leftRemoval = new THREE.Mesh(new THREE.SphereGeometry(focii,32,32),new THREE.MeshPhongMaterial({color:"white",transparent:true,opacity:0.8}));

        leftRemoval.position.set(-focii,0,0);

        var rightRemoval = new THREE.Mesh(new THREE.SphereGeometry(focii,32,32),new THREE.MeshPhongMaterial({color:"white",transparent:true,opacity:0.8}));

        rightRemoval.position.set(focii,0,0);

        var slabBSP = new ThreeBSP(slab);
        var leftRemovalBSP = new ThreeBSP(leftRemoval);
        var rightRemovalBSP = new ThreeBSP(rightRemoval);

        var resultBSP = slabBSP.subtract(leftRemovalBSP.union(rightRemovalBSP));

        var result = resultBSP.toMesh(new THREE.MeshPhongMaterial({color:"white",transparent:true,opacity:0.7}));
        result.geometry.computeFaceNormals();
        result.geometry.computeVertexNormals();
        result.scale.x=(focii/(8*focal));
        scene.add(result);


var lineGeometry = new THREE.Geometry();
lineGeometry.vertices.push(new THREE.Vertex(-1000,0,0));
lineGeometry.vertices.push(new THREE.Vertex(1000,0,0));

        var line = new THREE.Line(lineGeometry,new THREE.LineBasicMaterial({color:"white"}));
        result.add(line);


    result.obj = "concavelens";
    result.type="concavelens";
    result.focallength = focal;
    objects.push(result);
    dragElements.push(result);
    result.name="objects["+count+"]";
    count+=1;
        result.parameters={
        f: focal
        };
        result.attr="f";
        result.update=function(){
                result.scale.x=(focii/(8*result.parameters.f));
                result.focallength=result.parameters.f;
        };

        result.gui=function(result){

        var lensFocal = gui.add( result.parameters, 'f' ).min(0.5).max(20).step(0.5).name('Focal Length').listen();
        lensFocal.onChange(function(value)
        {
        result.focallength=value;
        result.scale.x=(focii/(8*value));
        });

        };
        
        result.status=-1;
        
        return result;
}