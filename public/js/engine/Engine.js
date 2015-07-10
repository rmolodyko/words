/**
 * Created by rmolodyko on 11.07.15.
 */

//If module Engine is not exists then create it
if(window.Engine == undefined)
	window.Engine = {};

/**
 * Responsible for including and initialization another class in modules
 * @constructor
 */
window.Engine.Class = function(){
	//Create opportunities for implementation of inheritance
	function constructor(){};
	constructor.prototype = new Train.iterateAbstract(mode,setId);
	var klass = new constructor();
	Train.multiIterateClass.prototype = new Train.iterateAbstract(mode,setId);

	//Stores instance of dataBsClass
	klass.dataBs = null;
}

