/**
 * Created by rmolodyko on 11.07.15.
 */

//If module Engine is not exists then create it
if(window.Pyramid == undefined)
	window.Pyramid = {};

window.Pyramid.Class = {};

//TODO set the parent class here, to don't pass first argument on the create method
Pyramid.Class.inherit = function(parentClass){
}

/**
 * Create new class
 * @param parentClass
 * @param properties the prop of the new class
 * @returns {constructor}
 */
Pyramid.Class.create = function(parentClass,properties){

	//Create constructor
	function constructor(){

		//Extend prop
		this.extend(constructor.properties);

		//If the constructor isset then call it
		if((this.__construct != undefined)&&(typeof this.__construct == 'function')){
			this.__construct();
		}
	};

	//Prop save the passed properties
	constructor.properties = properties;

	//Default extend method
	constructor.prototype.extend = function(obj) {
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				this[i] = obj[i];
			}
		}
	};

	//If the parent class is exists
	if(parentClass != undefined){

		//Get object with prop of parentClass without the constructor
		var protertiesOfParentClass = parentClass;

		//Delete constructor for correct work the prototype
		if((protertiesOfParentClass.properties != undefined)&&(protertiesOfParentClass.properties['__cunstruct'] != undefined)){
			delete protertiesOfParentClass.properties['__construct'];
		}

		//Save properties of current object from the parent class
		constructor.prototype = new protertiesOfParentClass;
		console.log(constructor.prototype);

		//If the constructor of parent class is exists then set up it on the parent method of the getting class
		if((parentClass.__construct != undefined)&&(typeof parentClass.__construct == 'function')){
			constructor.prototype.parent = function(){
				console.log('arg',arguments);
				return new parentClass.__construct.call(parentClass.arguments);
			}
		}else{//Set the empty method
			constructor.prototype.parent = function(){};
		}
	}

	//Return constructor to further calls it
	return constructor;
};
