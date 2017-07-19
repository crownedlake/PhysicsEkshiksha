var lightArray=[];
function guiLightAdd(){
			MainGui = new dat.GUI();
			var parameters={
				SelectLight: "AmbientLight",
				save: function(){
				addLight(parameters);
				}
			}

			var type=MainGui.add(parameters,'SelectLight',["AmbientLight","SpotLight","PointLight","DirectionalLight"]).name("light type").listen();
			var a=MainGui.add( parameters, 'save' ).name("Add Light Source");
		}

		function AmbientLight(){
			var Light;
			Light = new THREE.AmbientLight(0xffffff, 0.5);
			scene.add(Light);
                        Light.type="AmbientLight";
                        Light.attr="intensity,color";
			Light.parameters =
			{

				gui: null,
				intensity:0.5,
				color: "#ffffff",
				remove: function(){
					scene.remove(parameters.light);
					parameters.gui.destroy();
				}
			};
                        lightArray.push(Light);

			Light.update=function(){
				Light.color.setHex( Light.parameters.color.replace("#", "0x") );
				Light.intensity=Light.parameters.intensity;
			}

			Light.gui=function(){
			var gui = new dat.GUI();
			Light.parameters.gui=gui;
			var color = gui.addColor(Light.parameters,'color').name("color").listen();
			color.onChange(function(value){
				Light.color.setHex( value.replace("#", "0x") );
			});
			var intensity = gui.add(Light.parameters,'intensity').name("Intensity").min(0).max(10).step(0.1).listen();
			intensity.onChange(
				function(value){
					Light.intensity=value;
				}
			);
			gui.add( Light.parameters, 'remove' ).name("Remove Light");
		}
			return Light;
		}

		function SpotLight(){
			var Light;
			Light = new THREE.SpotLight(16777215, 0.5,100,Math.PI/3);
			Light.position.set(0,0,100);
                        Light.type="SpotLight";
			//Light.angle
			scene.add(Light);
			scene.add(Light.target);
                        lightArray.push(Light);
                        Light.attr="lightX,lightY,lightZ,targetX,targetY,targetZ,distance,color,intensity,angle";
			Light.parameters =
			{
				gui: null,
				lightX: 0,
				lightY: 0,
				lightZ: 100,
				targetX: 0,
				targetY: 0,
				targetZ: 0,
				distance: 1,
				color: "#ffffff",
				intensity:0.5,
				angle: Math.PI/3,
				remove: function(){
				scene.remove(Light);
				Light.gui.destroy();
			}
			};
			Light.update=function(){
				Light.color.setHex( Light.parameters.color.replace("#", "0x") );
				Light.intensity=Light.parameters.intensity;
				Light.position.x=Light.parameters.lightX;
				Light.position.y=Light.parameters.lightY;
				Light.position.z=Light.parameters.lightZ;
				Light.target.position.x=Light.parameters.targetX;
				Light.target.position.y=Light.parameters.targetY;
				Light.target.position.z=Light.parameters.targetZ;
				Light.angle=Light.parameters.angle;
			};






			Light.gui=function(){
			var gui = new dat.GUI();
			Light.parameters.gui=gui;
			gui.addColor(Light.parameters,'color').name("color").listen().onChange(function(value){
				Light.color.setHex( value.replace("#", "0x") );
			});
			gui.add(Light.parameters,'intensity').name("Intensity").min(0).max(10).step(0.1).listen().onChange(
				function(value){
					Light.intensity=value;
				}
			);
			var range=100;
			var step=0.01;
			gui.add(Light.parameters,'lightX').name("lightX").listen().min(-range).max(range).step(step).onChange(function(value){
				Light.position.x=value;
			});
			gui.add(Light.parameters,'lightY').name("lightY").listen().min(-range).max(range).step(step).onChange(function(value){
				Light.position.y=value;
			});
			gui.add(Light.parameters,'lightZ').name("lightZ").listen().min(-range).max(range).step(step).onChange(function(value){
				Light.position.z=value;
			});

			gui.add(Light.parameters,'targetX').name("targetX").listen().min(-range).max(range).step(step).onChange(function(value){
				Light.target.position.x=value;
			});
			gui.add(Light.parameters,'targetY').name("targetY").listen().min(-range).max(range).step(step).onChange(function(value){
				Light.target.position.y=value;
			});
			gui.add(Light.parameters,'targetZ').name("targetZ").listen().min(-range).max(range).step(step).onChange(function(value){
				Light.target.position.z=value;
			});

			gui.add(Light.parameters,'angle').name("angle").listen().min(0).max(Math.PI/2).step(0.1).onChange(function(value){
				Light.angle=value;
			});
			gui.add(Light.parameters, 'remove' ).name("Remove Light");
		}
		return Light;

		}



		function PointLight(){
			var Light;
			Light = new THREE.PointLight(0xffffff, 0.5,100);
			Light.position.set(0,0,0);
			scene.add(Light);
                        lightArray.push(Light);
                        Light.type="PointLight";
			Light.parameters =
			{
				gui: null,
				lightX: 0,
				lightY:0,
				lightZ: 0,
				intensity:0.5,
				distance: 100,
				color: "#ffffff",
				remove: function(){
				scene.remove(parameters.light);
				parameters.gui.destroy();
			}
			};
                        Light.attr="lightX,lightY,lightZ,intensity,distance,color";
			//parameters.light=Light;
			Light.gui=function(){
			var gui = new dat.GUI();
			Light.parameters.gui=gui;
			var range=100;
			var step=0.01;
			gui.add(Light.parameters,'lightX').name("lightX").listen().min(-range).max(range).step(step).onChange(function(value){
				Light.position.x=value;
			});
			gui.add(Light.parameters,'lightY').name("lightY").listen().min(-range).max(range).step(step).onChange(function(value){
				Light.position.y=value;
			});
			gui.add(Light.parameters,'lightZ').name("lightZ").listen().min(-range).max(range).step(step).onChange(function(value){
				Light.position.z=value;
			});
			gui.add(Light.parameters,'distance').name("distance").listen().min(0).max(range).step(step).onChange(function(value){
				Light.distance=value;
			});
			gui.addColor(Light.parameters,'color').name("color").listen().onChange(function(value){
				Light.color.setHex( value.replace("#", "0x") );
			});
			gui.add(Light.parameters,'intensity').name("Intensity").min(0).max(10).step(0.1).listen().onChange(
				function(value){
					Light.intensity=value;
				}
			);
			gui.add(Light.parameters, 'remove' ).name("Remove Light");
		};
                Light.update=function(){
                                Light.position.x=Light.parameters.lightX;
				Light.position.y=Light.parameters.lightY;
				Light.position.z=Light.parameters.lightZ;
                                Light.distance=Light.parameters.distance;
				Light.color.setHex( Light.parameters.color.replace("#", "0x") );
				Light.intensity=Light.parameters.intensity;
                };
		return Light;

		}

		function DirectionalLight(){
			var ambientLight;
			Light = new THREE.DirectionalLight(0xffffff, 0.5);
			//ambientLight.position.set(-100,0,50);
			scene.add(Light);
                        lightArray.push(Light);
                        Light.type="DirectionalLight";
			Light.parameters =
			{	//light:null,
				
				lightX: 20,
				lightY:35,
				lightZ: 40,
				intensity: 0.5,
				color: "#ffffff",
				remove: function(){
				scene.remove(Light);
				Light.parameters.gui.destroy();
			}
			};
                        Light.attr="lightX,lightY,lightZ,intensity,color";
			//parameters.light=Light;
			Light.update=function(){
				Light.position.x=Light.parameters.lightX;
				Light.position.y=Light.parameters.lightY;
				Light.position.z=Light.parameters.lightZ;
				Light.color.setHex( Light.parameters.color.replace("#", "0x") );
				Light.intensity=Light.parameters.intensity;
			};
			Light.gui=function(){
			var gui = new dat.GUI();
			var range=100;
			var step=0.01;
			console.log("asdas");
			gui.add(Light.parameters,'lightX').name("lightX").listen().min(-range).max(range).step(step).onChange(function(value){
				Light.position.x=value;
			});
			gui.add(Light.parameters,'lightY').name("lightY").listen().min(-range).max(range).step(step).onChange(function(value){
				Light.position.y=value;
			});
			gui.add(Light.parameters,'lightZ').name("lightZ").listen().min(-range).max(range).step(step).onChange(function(value){
				Light.position.z=value;
			});
			gui.addColor(Light.parameters,'color').name("color").listen().onChange(function(value){
				Light.color.setHex( value.replace("#", "0x") );
			});
			gui.add(Light.parameters,'intensity').name("Intensity").min(0).max(10).step(0.1).listen().onChange(
				function(value){
					Light.intensity=value;
				}
			);
			gui.add(Light.parameters, 'remove' ).name("Remove Light");
			Light.parameters.gui=gui;
		}
			return Light;

		}








		function addLight(para){
			if(para.SelectLight==="AmbientLight"){
				var l=AmbientLight();
				l.gui();

}


if(para.SelectLight==="SpotLight"){
		var l=SpotLight();
		l.gui();

}



if(para.SelectLight==="PointLight"){
		var l=PointLight();
		l.gui();
}


if(para.SelectLight==="DirectionalLight"){
	var l=DirectionalLight();
	l.gui();
}



}