/**
 * Created by rmolodyko on 07.07.15.
 */

//If module Engine is not exists then create it
if(window.Engine == undefined)
	window.Engine = {};

/**
 * Responsible for including and initialization another class in modules
 * @constructor
 */
window.Engine.LoaderClass = function(){

	//First part path to js script
	this.mainPath = null;

	//Set the url
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
		return this.mainPath + '/';
	}

	/**
	 * Include scripts
	 * @param array classNames is the array of object which consists of such fields:
	 *              name - is the name of script with module name, sample "engine/include.js"
	 *              callback - is the function call back which will be called when the script will be loaded
	 */
	this.includeClass = function(classNames){
		if(classNames != undefined){

			//Iterate all classes
			for(var klass in classNames){

				//Get class objects
				klass = classNames[klass];

				//Get class name
				var name = (klass['name'] == undefined) ? klass.toString() : klass.name;

				//Get callback function
				var callback = (klass['callback'] == undefined) ? null : klass.callback;

				//Get the script
				$.getScript(this.getMainPath() + name, callback);
			}
		}
	};
}

//Test results
$(document).ready(function(){
	var init = new Engine.LoaderClass();
	init.setMainPath('/public/js');
	init.includeClass([{name:'engine/logger.js',callback:function(){
		l('i was loaded');
		alert('the class logger was loaded');
	}}]);
});
