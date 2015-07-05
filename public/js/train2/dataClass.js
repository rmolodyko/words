/**
 * Created by rmolodyko on 05.07.15.
 */

/**
 * Get or if not exists create module Train
 */
if(window.Train == undefined) window.Train = {};

/**
 * Class for working with data from server
 * @param dataFromServer
 */
window.Train.dataClass = function(dataFromServer){

	this.keys = null;

	//Set up data
	this.dataFromServer = dataFromServer;

	//Counter of data items
	this.counter = 0;

	//Reindex array keys
	this.reIndex = function(array){
		var temp = [];
		for(var i in array){
			temp.push(array[i]);
		}
		return temp;
	};

	//Delete the element from the data store by id item
	this.deleteItemById = function(i){
		i += '';
		if(this.dataFromServer[i] != undefined)
		if(-1 != this.keys.indexOf(i)){
			var count = this.keys.indexOf(i);
			l('keys',count);
			delete this.keys[count];
			delete this.dataFromServer[i];
			this.keys = this.reIndex(this.keys);
			if(this.counter !== 0 && this.counter == count)
				this.counter--;
		}
	}

	//If exists data from server then return it
	this.getMainDataByCounter = function(i){
		if(this.keys[i] == undefined){
			throw new Error('Such item in the collection don\'t exists');
		}
		var key = this.keys[i];
		if(-1 != this.keys.indexOf(key)){
			if(this.dataFromServer[key])
				return this.dataFromServer[key];
		}
	};

	//Reset counter number
	this.resetCounter = function(){
		this.counter = 0;
		this.keys = Object.keys(this.dataFromServer);
	}

	//Gets amount of elements in data
	this.getNumberOfMainData = function(){
		return this.keys.length;
	}

	//Returns current count of page
	this.getCounter = function(){
		return this.counter;
	};

	//Increases counter
	this.increaseCounter = function(){
		this.counter++;
	};

	this.resetCounter();
}