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
window.Train.iterateClass = function(mode,setId){

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

	//Iterates the data and calls the form
	this.iterate = function(){

		//Gets single item from data object
		try{
			var data = this.data.getMainDataByCounter(this.data.getCounter());
		}catch(e){
			l('end of train');
			return;
		}
		this.data.increaseCounter();

		//Launching page with transmitted data
		this.trainObj.run(data);
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

	//Calls when the application will be started
	this.setup = function(e,response){
		this.data = new Train.dataClass(response);
		Train.data = this.data;

		//Gets instance of appropriate class
		this.trainObj = this.getTrainObject();

		//Sets up handler on the ending training
		this.trainObj.setHandler(this.edge);

		//Sets up handler on the beginning training
		$.subscribe('iterate',this.proxy(this.iterate));

		//Calls first time to start process
		this.iterate();
	};

	//Sets up handler on the beginning work and configuring
	$.subscribe('run',this.proxy(this.setup));
}/**
 * Created by rmolodyko on 05.07.15.
 */
