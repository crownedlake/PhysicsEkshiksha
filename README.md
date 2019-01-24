# PhysicsEkshiksha
PIAC
PHYSICS INTERACTIVE ANIMATION CREATOR

Documentation Version 0.1

Content
 
 
    1. How to set background
    
    2. How to add object using drag drop to scene
    
    3. Change property of object 
    
    4. Using static code editor 
    
    5. Using animation code editor
    
    6. Setting lights 
    
    7. Add object
    
    a. Blender Object
    
    b. Three.js Object
    
    8. Adding GUI to user created object
    
    9. Adding drag to user created object 
    
    10. Already defined variable in optics 
    
    11. View saved experiments
    
    a. Run
    
    b. Modify
    
    12. Drag Controller
    
    13. User control
    
    14. Display panel
    
    15. Save and Save as

Setting the background

To set the background Select the Change Theme option from the side menu and select the any given background option


Adding objects using drag and drop

To add any object select Choose Objects .option from the side menu, a choose object pop up panel will open.

Drag and drop any object you want to add to the scene.


Change property of object

Click on any added object to change its properties like colour, size, opacity etc.

You can also select delete to delete the object.
 

Using static code editor

Using static code editor you can edit the static part of the code (Code outside the render function)

Select Static Code Editor from the left side menu and enter your code in the opened code editor window.

(Note: If you use scene.add() function to add any object, make sure to remove the same object by using scene.remove() 
function, removing scene.add() from the code editor will not remove the object)
 
 
Using animation code editor

Using animation code editor you can set and edit animations of the scene (render() function)

Select Animation Code Editor from the left side menu and enter your code in the opened code editor window.


 

Setting lights

To add any number of light source, select Light from the left menu and choose the type of light required (Ambient, Spot, 
Point and Directional) from the opened panel and click on Add Light Source.

A new panel will open from where you can change Colour, Intensity etc. of light and also can remove that light source.
 

(Note: There is a bug - once added, don’t remove light source as removing it will not allow you to save the scene.
Keep on clicking the open controls to see all added light and its controls)


 
 
Adding new object

Blender Object

Select the object in blender Object Mode by right clicking on it and exporting it using Three.js (.json) exporter.

(Note: make sure you have selected face materials and texture before exporting the object.
You cannot export more than one object at a time, however you can combine many objects into one and then export it)
 
 
 
 
	Three.js Object
		
 
 
 
 
Adding drag to objects

This feature lets you add constraint drag and drop to any object.

Select Drag/Drop Control Editor option from the left menu and add the constraint drag/drop as equation ax+by+c=0.

(Note: due to a bug you cannot save the constraint drag and drop in your animation for future reference, Animation will be saved without the applied drag and drop)
 
View saved experiments

You can see saved experiments by clicking on Saved Experiments on the Physics home page. This will open the Dashboard with all previous experiments with their name and author name.

You can run or modify any saved experiment
 

Run 

This will run the saved experiment. You cannot edit anything while running the experiment.
 

Modify

This will open the saved experiment and gives you access to edit anything as you like, Save will overwrite the previous experiment and Save As will save the modified version as a separate file.
		

Drag controller

You can enable any user created object drag by pushing it into dragElements

dragElements.push(object);


User controls

User controls enable the viewer of your experiment to control some variable of your experiment dynamically.

You can add any custom user controls by selecting the User Control option from the left menu bar and entering the 

• Variable name: Variable you want to be changed dynamically

• Display name: Name to be shown to the user while running the experiment

• Min: Minimum allowed value

• Max: Maximum allowed value

• Step: By how much the value should be changed

• Change Code: the value of the control changed by the user will be returned as variable name value, You want to use this variable value to change your experiment dynamically, for example you can write something like this in change code:

g=value;

Where g is a variable you want to change with user control.
 

User Display

You can display any variable by displaying it with user display

Select User Display from left menu and write name (variable name) that you want to    
show while running.
 
Save and Save as



Save will save the experiment and overwrite if you are modifying any previous Experiment

Save as will make a copy of the experiment if you are overwriting or will save a new file.
	
 
 
 

