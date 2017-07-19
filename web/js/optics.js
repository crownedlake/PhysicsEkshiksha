try{var image,rays,heightArrows;
			var objects=[];
			var dragElements = [];
			var start,end,line;
			var visibleCount;
			var visibleLimit;
			
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
			
			var controls = new THREE.OrbitControls(camera,renderer.domElement);
			camera.position.z = 60;
			
			
			var ruler = wire_creator();

		
			var source = new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32),new THREE.MeshPhongMaterial({color:"blue"}));
			scene.add(source);
			dragElements.push(source);
			source.position.x = -25;
			source.position.y = 5;


			var from = new THREE.Vector3( source.position.x, 0, 0 );
			var to = new THREE.Vector3( source.position.x, source.position.y, 0 );
			var direction = to.clone().sub(from);
			var length = direction.length();
			var SourcearrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, 0xff0000 );
			scene.add( SourcearrowHelper );			


			var ambientLight;
			var spotLight;
	        ambientLight = new THREE.AmbientLight(16777215, 0.5);
            ambientLight.position.set(-100,0,0);
        	scene.add(ambientLight);
            spotLight = new THREE.PointLight(16777215);
            spotLight.position.set(60,10,40);
        	spotLight.castShadow = true;
        	scene.add(spotLight);
       	    ambientLight = new THREE.AmbientLight(16777215, 0.5);
            ambientLight.position.set(-100,100,100);
        	scene.add(ambientLight);
            function wire_creator(){
			
			var y_pos = 19;
			start = new THREE.Mesh(new THREE.SphereGeometry(0.5,10,10),new THREE.MeshBasicMaterial({color:"black"}));
			scene.add(start);

			start.position.set(-30,y_pos,0);
			
			end = new THREE.Mesh(new THREE.SphereGeometry(0.5,10,10),new THREE.MeshBasicMaterial({color:"black"}));
			scene.add(end);
			end.position.set(-10,y_pos,0);

			var lineGeometry = new THREE.Geometry();
			lineGeometry.vertices.push(new THREE.Vertex(start.position.x,y_pos,0));
			lineGeometry.vertices.push(new THREE.Vertex(end.position.x,y_pos,0));
			line = new THREE.Line(lineGeometry,new THREE.LineBasicMaterial({color:"white",linewidth:1000}));
			scene.add(line);
		
		    dragElements.push(start);
			dragElements.push(end);

			start.line = line;
			end.line = line;
			line.start =start;
			line.end = end;
		
			start.visible = false;
			end.visible =false;
			line.visible = false;


			return line;
		}
            document.addEventListener("mousedown",onDocumentMouseDown);
			var raycaster,gui;
			function onDocumentMouseDown(event) {
				mouse = new THREE.Vector2(); 
  
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
				raycaster = new THREE.Raycaster();
				raycaster.setFromCamera(mouse, camera);
				var intersects = raycaster.intersectObjects(objects, true);
				if (intersects.length > 0) {
				    if(gui){
						gui.destroy();
			       		gui = new dat.GUI();
			    	}else{
			    		gui = new dat.GUI();
			        }
					intersects[0].object.gui(intersects[0].object);
				}
			}

		var allImagesButton = document.createElement("BUTTON");
			allImagesButtonText = document.createTextNode("SHOW ALL IMAGES");
			allImagesButton.setAttribute("name","HN");
			allImagesButton.appendChild(allImagesButtonText);
			allImagesButton.style.position = "absolute";
			allImagesButton.style.left = "42%"; 
			allImagesButton.type = "button";
			document.body.appendChild(allImagesButton);  
			allImagesButton.onclick = function(){
				visibleCount = objects.length;
			};


			var prevButton = document.createElement("BUTTON");
			prevButtonText = document.createTextNode("PREVIOUS IMAGE");
			prevButton.setAttribute("name","HN");
			prevButton.appendChild(prevButtonText);
			prevButton.style.position = "absolute";
			prevButton.style.left = "60%"; 
		//	prevButton.style.top = "250px"; 
			
			prevButton.type = "button";
			document.body.appendChild(prevButton);  
			prevButton.onclick = function(){
				if(visibleCount > 0)
					makeVisible(-1);
			};
			var nextButton = document.createElement("BUTTON");
			nextButtonText = document.createTextNode("NEXT IMAGE ");
			nextButton.setAttribute("name","HN");
			nextButton.appendChild(nextButtonText);
			nextButton.style.position = "absolute";
			nextButton.style.left = "77%"; 
			nextButton.type = "button";
			document.body.appendChild(nextButton);  
			nextButton.onclick = function(){
				if(visibleCount < visibleLimit )
					makeVisible(1);
			};
			var distance = document.createElement("div");
            distance.setAttribute("id","timedrpact");
            distance.setAttribute("class","inner");
            distance.innerHTML="";
            distance.style.position = "absolute";
            distance.style.left = "27.5%";
            distance.style.top = "0%";

            document.body.appendChild(distance);


			var rulerStatus =false;
			var rulerButton = document.createElement("BUTTON");
			rulerButtonText = document.createTextNode("SHOW RULER");
			rulerButton.setAttribute("name","HN");
			rulerButton.appendChild(rulerButtonText);
			rulerButton.style.position = "absolute";
			rulerButton.style.left = "15%"; 
			rulerButton.type = "button";
			document.body.appendChild(rulerButton);  
			rulerButton.onclick = function(){

					if(rulerStatus){
						start.visible = false;
						end.visible = false;
						line.visible = false;
						rulerStatus = false;
						rulerButton.innerHTML = "SHOW RULER";
						distance.innerHTML = "";	
					}
					else{

						start.visible = true;
						end.visible = true;
						line.visible = true;
						rulerStatus = true;
						rulerButton.innerHTML = "HIDE RULER";
					}
			};


		

		 //   toBeUpdated();
var dragControls = new THREE.DragControls( dragElements, camera, renderer.domElement );
    dragControls.addEventListener( 'dragstart', function ( event ) { controls.enabled = false; IsDragRunning = true;} );
    dragControls.addEventListener( 'dragend', function ( event ) { controls.enabled = true; IsDragRunning = false;} );
   
			function toBeUpdated(){

				image = new Array(objects.length);
				rays = new Array(objects.length);
				heightArrows = new Array(objects.length);
				visibleCount = 0;
				visibleLimit = objects.length;
                                dragElements.push(source);


				for(var i=0;i<objects.length;i++){
					rays[i] = new Array(4);
				}
			
				for(var i=0;i<objects.length;i++){
					console.log(i);
					if(objects[i].type === "concavelens"){ 
								var material = new THREE.LineBasicMaterial({
									color: "black"
								});
								var LineMaterial = new THREE.LineDashedMaterial( {
									color: "black",
									dashSize: 0.7,
									gapSize: 0.5,							
								} );

								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);

								rays[i][0] = new THREE.Line( geometry, material );
								scene.add( rays[i][0] );

								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);
								rays[i][1] = new THREE.Line( geometry, LineMaterial );
								scene.add( rays[i][1] );


								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);
								rays[i][2] = new THREE.Line( geometry, material );
								scene.add( rays[i][2] );

								
								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);
								geometry.computeLineDistances();
								rays[i][3] = new THREE.Line( geometry, LineMaterial );
								scene.add( rays[i][3] );

								rays[i][0].visible = false;

								rays[i][1].visible = false;

								rays[i][2].visible = false;

								rays[i][3].visible = false;

								console.log("rays selected - concave lens");
						}
						else if(objects[i].type === "convexlens"){
								var material = new THREE.LineBasicMaterial({
									color: "black"
								});
								var LineMaterial = new THREE.LineDashedMaterial( {
									color: "black",
									dashSize: 0.7,
									gapSize: 0.5,							
								} );

								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);

								rays[i][0] = new THREE.Line( geometry, material );
								scene.add( rays[i][0] );

								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);
		//						geometry.computeLineDistances();
								rays[i][1] = new THREE.Line( geometry, material );
		//						geometry.computeLineDistances();
								scene.add( rays[i][1] );


								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);
								rays[i][2] = new THREE.Line( geometry, material );
								scene.add( rays[i][2] );

								
								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);
								geometry.computeLineDistances();
								rays[i][3] = new THREE.Line( geometry, LineMaterial );
								scene.add( rays[i][3] );

								rays[i][0].visible = false;

								rays[i][1].visible = false;

								rays[i][2].visible = false;

								rays[i][3].visible = false;


								console.log("rays selected - convex lens");

						}
						else if(objects[i].type === "concavemirror"){
								var material = new THREE.LineBasicMaterial({
									color: "black"
								});
								var LineMaterial = new THREE.LineDashedMaterial( {
									color: "black",
									dashSize: 0.7,
									gapSize: 0.5,							
								} );

								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);

								rays[i][0] = new THREE.Line( geometry, material );
								scene.add( rays[i][0] );

								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);
		//						geometry.computeLineDistances();
								rays[i][1] = new THREE.Line( geometry, material );
		//						geometry.computeLineDistances();
								scene.add( rays[i][1] );


								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);
								rays[i][2] = new THREE.Line( geometry, material );
								scene.add( rays[i][2] );

								
								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);
								geometry.computeLineDistances();
								rays[i][3] = new THREE.Line( geometry, LineMaterial );
								scene.add( rays[i][3] );

								console.log("rays selected - concavemirror_creator");
								rays[i][0].visible = false;

								rays[i][1].visible = false;

								rays[i][2].visible = false;

								rays[i][3].visible = false;

						}

						else if(objects[i].type === "convexmirror"){
								var material = new THREE.LineBasicMaterial({
									color: "black"
								});
								var LineMaterial = new THREE.LineDashedMaterial( {
									color: "black",
									dashSize: 0.7,
									gapSize: 0.5,							
								} );

								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);

								rays[i][0] = new THREE.Line( geometry, material );
								scene.add( rays[i][0] );

								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);
		//						geometry.computeLineDistances();
								rays[i][1] = new THREE.Line( geometry, LineMaterial );
		//						geometry.computeLineDistances();
								scene.add( rays[i][1] );


								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);
								rays[i][2] = new THREE.Line( geometry, material );
								scene.add( rays[i][2] );

								
								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);
								geometry.computeLineDistances();
								rays[i][3] = new THREE.Line( geometry, LineMaterial );
								scene.add( rays[i][3] );

								console.log("rays selected - convexmirror_creator");
								rays[i][0].visible = false;

								rays[i][1].visible = false;

								rays[i][2].visible = false;

								rays[i][3].visible = false;

						}
						else if(objects[i].type === "slab"){
									var material = new THREE.LineBasicMaterial({
									color: "black"
								});
								var LineMaterial = new THREE.LineDashedMaterial( {
									color: "black",
									dashSize: 0.7,
									gapSize: 0.5,							
								} );

								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);

								rays[i][0] = new THREE.Line( geometry, material );
								scene.add( rays[i][0] );

								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);
		//						geometry.computeLineDistances();
								rays[i][1] = new THREE.Line( geometry, material );
		//						geometry.computeLineDistances();
								scene.add( rays[i][1] );


								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);
								rays[i][2] = new THREE.Line( geometry, LineMaterial );
								scene.add( rays[i][2] );

								
								var geometry = new THREE.Geometry();
								geometry.vertices.push(
									new THREE.Vector3( 0,0,0 ),
									new THREE.Vector3( 0,0,0 ),
								);
								geometry.computeLineDistances();
								rays[i][3] = new THREE.Line( geometry, material );
								scene.add( rays[i][3] );

								console.log("rays selected - slab");
								rays[i][0].visible = false;

								rays[i][1].visible = false;

								rays[i][2].visible = false;

								rays[i][3].visible = false;

						}

				}
			

			}
				



        //    concavelens_creator(10);
          //  convexlens_creator(10);
           // concavelens_creator(15);
    //        slab_creator(40,5);
 			//concavemirror_creator(5);
          	//convexlens_creator(8);
     //		convexmirror_creator(8);
            
	
	
			function makeVisible ( step ){
				if(step>0)
					visibleCount++;
				else
					visibleCount--;
			}

			var plineGeometry = new THREE.Geometry();
			plineGeometry.vertices.push(new THREE.Vertex(-1000,0,0));
			plineGeometry.vertices.push(new THREE.Vertex(1000,0,0));
			pline = new THREE.Line(plineGeometry,new THREE.LineBasicMaterial({color:"white",linewidth:1}));
			scene.add(pline);

			var ReadyToBeUpdated = true;

			function go(){

				ReadyToBeUpdated = true;
                                console.log("gogo");
			}

			go();
                        try{
			var render = function () {
                            
				requestAnimationFrame(render);
			
				
							if(ReadyToBeUpdated){

					toBeUpdated();
					ReadyToBeUpdated = false;

				}

			/*	for(var i=0;i<objects.length;i++){
					if(!objects[i]){
						console.log("removedz");
						objects.splice(i, 1);
						go();
						heightArrows.splice(i, 1);
						rays.splice(i, 1);
						image.splice(i, 1);
						dragElements.splice(i,1);
						
						console.log("removedz2");
			//			heightArrows[i] = null;
			//			rays[i][0] = null;
			//			rays[i][1] = null;
			//			rays[i][2] = null;
			//			rays[i][3] = null;
			//			image[i] = null;
					}
				}
*/


				if(start.position.z !=0 ){
					start.position.z = 0;

				}
				if(end.position.z !=0 ){
					end.position.z = 0;
					
				}
				if(rulerStatus){
					var  dx = start.position.x - end.position.x;
					var  dy = start.position.y - end.position.y;
					var d = Math.sqrt(dx*dx + dy*dy);
				
					distance.innerHTML = "distance : "+d.toFixed(2);
				}	
					line.geometry.vertices[0].x=start.position.x;
					line.geometry.vertices[0].y=start.position.y;
					line.geometry.vertices[0].z=start.position.z;

		     		line.geometry.vertices[1].x=end.position.x;
			     	line.geometry.vertices[1].y=end.position.y;
					line.geometry.vertices[1].z=end.position.z;
					
					line.geometry.verticesNeedUpdate=true;
							
				if(SourcearrowHelper){
					scene.remove(SourcearrowHelper);
					var from = new THREE.Vector3( source.position.x, 0, 0 );
					var to = new THREE.Vector3( source.position.x, source.position.y, 0 );
					var direction = to.clone().sub(from);
					var length = direction.length();
				    SourcearrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, "blue" );
					scene.add( SourcearrowHelper );			
				}
				if( source.position.z!=0 ){
					source.position.z = 0;
				}
				for(var i =0;i<objects.length;i++){
					if(objects[i].position.y != 0 || objects[i].position.z !=0 ){
					
						objects[i].position.y = 0;
						objects[i].position.z = 0;
					}
				}
				for(var i =0;i<objects.length;i++){
					if(objects[i].position.x < source.position.x + 5 ){
						objects[i].position.x = source.position.x + 5;
					}
				}
				
				for(var i = 0;i<objects.length;i++)
				{
					
					for(var j=0;j<objects.length;j++)
					{
						if(objects[i].position.x < objects[j].position.x )
						{
							var temp = objects[i];
							objects[i] = objects[j];
							objects[j] = temp;

							var ray1 = rays[i][0];
							var ray2 = rays[i][1];
							var ray3 = rays[i][2];
							var ray4 = rays[i][3];

							rays[i][0] = rays[j][0];
							rays[i][1] = rays[j][1];
							rays[i][2] = rays[j][2];
							rays[i][3] = rays[j][3];

							rays[j][0] = ray1;
							rays[j][1] = ray2;
							rays[j][2] = ray3;
							rays[j][3] = ray4;
	
						}
					}
				}
				var u,v,ho;
				if(objects[0])
					 u = source.position.x - objects[0].position.x ; 
				ho = source.position.y;
			//	console.log("length - "+objects.length);
				for (var i = 0;i<objects.length;i++){
					scene.remove(image[i]);
					if(heightArrows[i])
						scene.remove(heightArrows[i]);
			
				}
				
				for(var i = 0;i<objects.length;i++){
					var f = parseInt(objects[i].focallength);
					if(objects[i].type == "concavelens" || objects[i].type == "concavemirror"){
					 	f = -f;
					}
					else{
					 
					}
					var hi;
					if(objects[i].type == "convexmirror" || objects[i].type == "concavemirror"){
						v = u*f/(u-f)
						hi = -ho*v/u;
					}
					else {
  						v = u*f/(u+f);
					  	hi = ho*v/u;
					}
					image[i] = new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32),new THREE.MeshBasicMaterial({color:"red"}));
					scene.add(image[i]);
					image[i].visible = false;
					image[i].position.x = objects[i].position.x + v;
					image[i].position.y = hi;
				
					if(objects[i].type == "slab"){

						if( u <=0  ){

								var ri = 1.5;
								var shift = objects[i].breadth*(1-(1/ri));
				//				console.log("shift" +shift);
								image[i].position.x = shift + objects[i].position.x + u;
								image[i].position.y = ho; 


								var sx = objects[i].position.x  + u;
				//				console.log("V"+v);
								var sy;
								if(i == 0)	
									sy = source.position.y;
								else
									sy = ho;
								var ix = image[i].position.x;
								var iy = image[i].position.y;

								var ox = objects[i].position.x;
								var oy = objects[i].position.y;

								var intersectX = ox + objects[i].breadth/2 ;
								var intersectY = iy + (ox-ix+ (objects[i].breadth/2) )*(sy-oy)/(sx-ox + objects[i].breadth/2 );
								rays[i][0].geometry.vertices[0].x = sx;
								rays[i][0].geometry.vertices[0].y = sy;

								rays[i][0].geometry.vertices[1].x = ox - objects[i].breadth/2;
								rays[i][0].geometry.vertices[1].y = oy;
								
								rays[i][0].geometry.computeLineDistances();
								
								rays[i][0].geometry.verticesNeedUpdate = true;
							
								rays[i][1].geometry.vertices[0].x = ox - objects[i].breadth/2
								rays[i][1].geometry.vertices[0].y = oy ;
								rays[i][1].geometry.vertices[1].x = intersectX;
								rays[i][1].geometry.vertices[1].y = intersectY;
								
								rays[i][1].geometry.computeLineDistances();
								rays[i][1].geometry.verticesNeedUpdate = true;
								


								rays[i][2].geometry.vertices[0].x = intersectX;
								rays[i][2].geometry.vertices[0].y = intersectY;
								rays[i][2].geometry.vertices[1].x = ix
								rays[i][2].geometry.vertices[1].y = iy;
								
								rays[i][2].geometry.computeLineDistances();
								
								rays[i][2].geometry.verticesNeedUpdate = true;
								
								
							
								rays[i][3].geometry.vertices[0].x = 0;
								rays[i][3].geometry.vertices[0].y = 0;
								rays[i][3].geometry.vertices[1].x = 0;
								rays[i][3].geometry.vertices[1].y = 0;
								
								rays[i][3].geometry.computeLineDistances();
								
								rays[i][3].geometry.verticesNeedUpdate = true;
								
				//				console.log(ox+" "+oy+" "+iy+" "+ix+" "+sx+" "+sy);
							//	v = image[i].position.x ;
								hi = image[i].position.y;
							
						}else{

								var ri = 1.5;
								var shift = objects[i].breadth*(1-(1/ri));
				//				console.log("shift" +shift);
								image[i].position.x = -shift + objects[i].position.x + u;
								image[i].position.y = ho; 


								var sx = objects[i].position.x  + u;
				//				console.log("V"+v);
								var sy;
								if(i == 0)	
									sy = source.position.y;
								else
									sy = ho;
								var ix = image[i].position.x;
								var iy = image[i].position.y;

								var ox = objects[i].position.x;
								var oy = objects[i].position.y;

								var intersectX = ox - objects[i].breadth/2 ;
								var intersectY = iy + (ox-ix- (objects[i].breadth/2) )*(sy-oy)/(sx-ox - objects[i].breadth/2 );
								rays[i][0].geometry.vertices[0].x = sx;
								rays[i][0].geometry.vertices[0].y = sy;

								rays[i][0].geometry.vertices[1].x = ox + objects[i].breadth/2;
								rays[i][0].geometry.vertices[1].y = oy;
								
								rays[i][0].geometry.computeLineDistances();
								
								rays[i][0].geometry.verticesNeedUpdate = true;
							
								rays[i][1].geometry.vertices[0].x = ox + objects[i].breadth/2
								rays[i][1].geometry.vertices[0].y = oy ;
								rays[i][1].geometry.vertices[1].x = intersectX;
								rays[i][1].geometry.vertices[1].y = intersectY;
								
								rays[i][1].geometry.computeLineDistances();
								rays[i][1].geometry.verticesNeedUpdate = true;
								


								rays[i][2].geometry.vertices[0].x = intersectX;
								rays[i][2].geometry.vertices[0].y = intersectY;
								rays[i][2].geometry.vertices[1].x = ix
								rays[i][2].geometry.vertices[1].y = iy;
								
								rays[i][2].geometry.computeLineDistances();
								
								rays[i][2].geometry.verticesNeedUpdate = true;
								
								
							
								rays[i][3].geometry.vertices[0].x = 0;
								rays[i][3].geometry.vertices[0].y = 0;
								rays[i][3].geometry.vertices[1].x = 0;
								rays[i][3].geometry.vertices[1].y = 0;
								
								rays[i][3].geometry.computeLineDistances();
								
								rays[i][3].geometry.verticesNeedUpdate = true;
								
				//				console.log(ox+" "+oy+" "+iy+" "+ix+" "+sx+" "+sy);
							//	v = image[i].position.x ;
								hi = image[i].position.y;
							
						}
					}

					if(heightArrows[i]){
						scene.remove(heightArrows[i]);
						var from = new THREE.Vector3( image[i].position.x, 0, 0 );
						var to = new THREE.Vector3( image[i].position.x, image[i].position.y, 0 );
						var direction = to.clone().sub(from);
						var length = direction.length();
					    heightArrows[i] = new THREE.ArrowHelper(direction.normalize(), from, length, 0xff0000 );
						scene.add( heightArrows[i] );	
						heightArrows[i].visible = false;		
					}
					else{
						var from = new THREE.Vector3( image[i].position.x, 0, 0 );
						var to = new THREE.Vector3( image[i].position.x, image[i].position.y, 0 );
						var direction = to.clone().sub(from);
						var length = direction.length();
					    heightArrows[i] = new THREE.ArrowHelper(direction.normalize(), from, length, 0xff0000 );
						scene.add( heightArrows[i] );			
						heightArrows[i].visible = false;	
					}

					if(objects[i].type == "concavelens" || objects[i].type == "convexlens"){ 
						
						rays[i][0].geometry.vertices[0].x = objects[i].position.x+u;
						rays[i][0].geometry.vertices[0].y = ho;
						rays[i][0].geometry.vertices[1].x = objects[i].position.x;
						rays[i][0].geometry.vertices[1].y = objects[i].focallength/2;
						
						rays[i][2].geometry.computeLineDistances();
						
						rays[i][0].geometry.verticesNeedUpdate = true;
					
						rays[i][1].geometry.vertices[0].x = image[i].position.x;
						rays[i][1].geometry.vertices[0].y = hi;
						rays[i][1].geometry.vertices[1].x = objects[i].position.x;
						rays[i][1].geometry.vertices[1].y = objects[i].focallength/2;
						
						rays[i][1].geometry.computeLineDistances();
						rays[i][1].geometry.verticesNeedUpdate = true;
						


						rays[i][2].geometry.vertices[0].x = u+objects[i].position.x;
						rays[i][2].geometry.vertices[0].y = ho;
						rays[i][2].geometry.vertices[1].x = image[i].position.x;
						rays[i][2].geometry.vertices[1].y = hi;
						
						rays[i][2].geometry.computeLineDistances();
						
						rays[i][2].geometry.verticesNeedUpdate = true;
						
						
						rays[i][3].geometry.vertices[0].x = image[i].position.x;
						rays[i][3].geometry.vertices[0].y = hi;
						rays[i][3].geometry.vertices[1].x = objects[i].position.x;
						rays[i][3].geometry.vertices[1].y = 0;
						rays[i][3].geometry.computeLineDistances();
						
						rays[i][3].geometry.verticesNeedUpdate = true;
						
					}
                                        if(objects[i].type == "concavemirror" || objects[i].type == "convexmirror"  ){ 
						
						rays[i][0].geometry.vertices[0].x = objects[i].position.x+u;
						rays[i][0].geometry.vertices[0].y = ho;
						rays[i][0].geometry.vertices[1].x = objects[i].position.x;
						rays[i][0].geometry.vertices[1].y = objects[i].focallength/2;
						
						rays[i][2].geometry.computeLineDistances();
						
						rays[i][0].geometry.verticesNeedUpdate = true;
					
						rays[i][1].geometry.vertices[0].x = image[i].position.x;
						rays[i][1].geometry.vertices[0].y = hi;
						rays[i][1].geometry.vertices[1].x = objects[i].position.x;
						rays[i][1].geometry.vertices[1].y = objects[i].focallength/2;
						
						rays[i][1].geometry.computeLineDistances();
						rays[i][1].geometry.verticesNeedUpdate = true;
						


						rays[i][2].geometry.vertices[0].x = u+objects[i].position.x;
						rays[i][2].geometry.vertices[0].y = ho;
						rays[i][2].geometry.vertices[1].x = objects[i].position.x;
						rays[i][2].geometry.vertices[1].y = 0;
						
						rays[i][2].geometry.computeLineDistances();
						
						rays[i][2].geometry.verticesNeedUpdate = true;
						
						
						rays[i][3].geometry.vertices[0].x = image[i].position.x;
						rays[i][3].geometry.vertices[0].y = hi;
						rays[i][3].geometry.vertices[1].x = objects[i].position.x;
						rays[i][3].geometry.vertices[1].y = 0;
						rays[i][3].geometry.computeLineDistances();
						
						rays[i][3].geometry.verticesNeedUpdate = true;
						
					}

					 if(i < objects.length -1 ){
					 	u = image[i].position.x - objects[i+1].position.x;
					 	ho = hi;
					 }
					
					 if(objects[i].type == "concavemirror" || objects[i].type == "convexmirror"){

					 	visibleLimit = i+1;
						if(visibleCount > visibleLimit ){
							visibleCount = visibleLimit;
						}

					 	for(var k = i+1;k<objects.length;k++){
							
							rays[k][0].geometry.vertices[0].x = 0;
							rays[k][0].geometry.vertices[0].y = 0;
							rays[k][0].geometry.vertices[1].x = 0;
							rays[k][0].geometry.vertices[1].y = 0;
							
							
							rays[k][0].geometry.verticesNeedUpdate = true;
							rays[k][1].geometry.vertices[0].x = 0;
							rays[k][1].geometry.vertices[0].y = 0;
							rays[k][1].geometry.vertices[1].x = 0;
							rays[k][1].geometry.vertices[1].y = 0;
							
							
							rays[k][1].geometry.verticesNeedUpdate = true;
							rays[k][2].geometry.vertices[0].x = 0;
							rays[k][2].geometry.vertices[0].y = 0;
							rays[k][2].geometry.vertices[1].x = 0;
							rays[k][2].geometry.vertices[1].y = 0;
							
							
							rays[k][2].geometry.verticesNeedUpdate = true;
					
							
							rays[k][3].geometry.vertices[0].x = 0;
							rays[k][3].geometry.vertices[0].y = 0;
							rays[k][3].geometry.vertices[1].x = 0;
							rays[k][3].geometry.vertices[1].y = 0;
							
							
							rays[k][3].geometry.verticesNeedUpdate = true;
					

					 	}


					 	break;
					 }
				}
				for(var i=0;i<objects.length;i++)
				{
				
							rays[i][0].visible = false;
							rays[i][1].visible = false;
							rays[i][2].visible = false;
							rays[i][3].visible = false;
							if(heightArrows[i])
								heightArrows[i].visible = false;
							if(image[i])
								image[i].visible = false;
			
				}			
				for(var i=0;i<visibleCount;i++)
				{
			
							rays[i][0].visible = true;
							rays[i][1].visible = true;
							rays[i][2].visible = true;
							rays[i][3].visible = true;
							if(heightArrows[i])
								heightArrows[i].visible = true;
							if(image[i])
								image[i].visible = true;
				}
                            renderer.render(scene,camera);
			};
                    }catch(err){go();console.log("go");}
$('.main').append( renderer.domElement );
//renderScene();
			render();}catch(err){console.log(err+"err");}
		