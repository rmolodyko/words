/**
 * Created by rmolodyko on 04.07.15.
 */

/**
 * Get or if not exists create module Train
 */
if(window.Train == undefined) window.Train = {};

/**
 * Class for iterating data and switching pages
 * @param mode
 * @param setId
 */
window.Train.iterateAbstract = function(mode,setId){

	this.mode = mode;
	this.set = setId;
	this.counter = 0;

	//Transmits current context into calls function instead context of default
	this.proxy = function(fn){
		var self = this;
		return function(){
			fn.apply(self,arguments);
		}
	};

	//Method is called when single page will be ended
	this.edge = function(results){
		l('end of train for mode = '+this.mode,results);
		$.publish('iterate');
	};

	//Method returns instance of appropriate class
	//All new instances have to call without any params
	this.getTrainObject = function(){
		switch(this.mode){
			case 'wt':{
				return (new Train.trainWtClass());
			}
		}
		return null;
	};
}