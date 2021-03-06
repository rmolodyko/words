/**
 * Created by rmolodyko on 07.07.15.
 */

//If module Engine is not exists then create it
if(window.Engine == undefined)
	window.Engine = {};

/**
 * Responsible for including and initialization another class in modules
 * @constructor
 * @param path Path to scripts without final slash
 * @param array classNames is the array of object which consists of such fields:
 *        string name - is the name of script with module name, sample "engine/include.js"
 *        function callback - is the function call back which will be called when the script will be loaded
 * @param function mainCallback is the function which will called when all of classes will iterated
 */
window.Engine.LoaderClass = function(path,classNames,mainCallback){

	//First part path to js script
	this.mainPath = null;

	/**
	 * Set path to location of scripts
	 * @param path Path to scripts without final slash
	 */
	this.setMainPath = function(path){
		if(path != '')
			this.mainPath = path;
	}

	/**
	 * Get main path
	 * @returns {string}
	 */
	this.getMainPath = function(){
		return this.mainPath;
	}

	/**
	 * Include scripts
	 * @param array classNames is the array of object which consists of such fields:
	 *        string name - is the name of script with module name, sample "engine/include.js"
	 *        function callback - is the function call back which will be called when the script will be loaded
	 * @param function mainCallback is the function which will called when all of classes will iterated
	 */
	this.includeClass = function(classNames,mainCallback){
		if(classNames != undefined){

			//Count of iterates
			var countOfClasses = classNames.length;
			var currentIterate = 1;

			//Iterate all classes
			for(var klass in classNames){

				//The value save true if it is last of iteration
				var isLastIterate = currentIterate === countOfClasses;

				//Call anonymous function for creating closure and save right local values
				(function(self,isLastIterate){
					//Get class objects
					klass = classNames[klass];

					//Get class name
					var name = (klass['name'] == undefined) ? klass.toString() : klass.name;

					//Get callback function
					var callback = (klass['callback'] == undefined) ? null : klass.callback;

					//Get the script
					$.getScript(self.getMainPath() + name, function(){

						//Call local callback for particular class if the callback is exists
						if(typeof callback === 'function')
							callback();

						//If the main callback is the function and it is the last of class was iterated then call main callback
						if(typeof mainCallback === 'function')
							if(isLastIterate){
								mainCallback();
							}
					});

				})(this,isLastIterate);

				//Increase count
				currentIterate++;
			}
		}
	};

	/**
	 * Class includes scripts which located in particular directory
	 * @param path local path to directory for example: /engine
	 * @param excludedClass array which excluded specified classes with loading
	 * @param callback function which will called after loaded the classes
	 */
	this.loadModule = function(path,excludedClass,callback){
		//Save context
		var self = this;

		//Get request
		$.get('/?r=pyramid/loader/getClassesOfPath&recursion=true',{path:path}).done(function(response){
			var response = JSON.parse(response);
			if(response.status == 1){
				var localPath = response.localPath;
				var classes = response.classes;
				for(var i in classes){
					//Delete from results classes excluded classes
					if($.inArray(classes[i].replace(/^(.*\/)|(.*\\)/g,""),excludedClass) != -1){
						delete classes[i];
					}
				}

				//Parse object classes into array for correct count of last element
				classes = $.map(classes,function(v,i){return v});

				//Call loading on the client
				self.setMainPath(localPath);
				self.includeClass(classes,callback);
			}
		});
	}

	//Set up main path
	if(path != undefined)
		this.setMainPath(path);

	//Include classes if the data passed into constructor of class
	if(classNames != undefined)
		this.includeClass(classNames,mainCallback);
}

