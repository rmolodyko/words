/**
 * Created by rmolodyko on 04.07.15.
 */

/**
 * Get or if not exists create module Train
 */
if(window.Train == undefined) window.Train = {};

/**
 * Class for showing views and handling results of training
 * @param mode
 * @param setId
 */
window.Train.trainBsClass = function(){
	this.handler = null;
	this.setHandler = function(handler){
		if (typeof handler !== 'function') throw new Error('The function is not callable');
		this.handler = handler;
	}
	this.run = function(data){
		l('start train for mode = bs',data);
		this.someMethod(data);
	}
	this.someMethod = function(data){
		var randNumber = Math.floor((Math.random() * 10) + 1);
		randNumber = (randNumber >= 5) ? true : false;
		this.handler({'id':data.id,'result':randNumber});
	}
}