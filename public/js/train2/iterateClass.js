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
window.Train.iterateClass = function(mode,setId){

	this.mode = mode;
	this.set = setId;
	this.count = 0;

	//Method pass current context into calls function instead default context
	this.proxy = function(fn){
		var self = this;
		return function(){
			fn.apply(self,arguments);
		}
	};

	//If isset data from server then return them
	this.getMainDataByCount = function(i){
		if(this.dataFromServer[i])
		return this.dataFromServer[i];
	};

	//Get count items in data
	this.getNumberOfMainData = function(){
		return this.dataFromServer.length;
	}

	//Return current count of training page
	this.getCount = function(){
		return this.count;
	};

	//Increase count
	this.increaseCount = function(){
		this.count++;
	};

	//Iterate data and call train from
	this.iterate = function(){
		if(this.count == 4){
			return;
		}

		//Get single item from data object
		var data = this.getMainDataByCount(this.getCount());
		this.increaseCount();

		//Run training page with passed data
		this.trainObj.run(data);
	};

	//Method calls when training single page is ended
	this.edge = function(results){
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

	//Subscribe method below on start application ie load data
	this.setup = function(e,response){
		this.dataFromServer = response;

		//Get instance of training
		this.trainObj = this.getTrainObject();

		//Set handler on ending training
		this.trainObj.setHandler(this.edge);

		//Set even handler on starting new training page
		$.subscribe('iterate',this.proxy(this.iterate));

		//Call first time to start process
		this.iterate();
	};

	//Set event subscriber
	$.subscribe('run',this.proxy(this.setup));
}