/**
 * Created by rmolodyko on 04.07.15.
 */

/**
 * Get or if not exists create module Train
 */
if(window.Train == undefined) window.Train = {};

/**
 * Class for iterating data and switching train pages
 * @param mode
 * @param setId
 */
window.Train.trainWtClass = function(){
	this.handler = null;
	this.setHandler = function(handler){
		if (typeof handler !== 'function') throw new Error('The function is not callable');
		this.handler = handler;
	}
	this.run = function(data){
		l(data);
		this.someMethod(data);
	}
	this.someMethod = function(data){
		this.handler(data);
	}
}