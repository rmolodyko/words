/**
 * Created by rmolodyko on 05.07.15.
 */

/**
 * Get or if not exists create module Train
 */
if(window.Train == undefined) window.Train = {};

/**
 * Class for working with data from server for mode "bs"
 * @param dataFromServer
 */
window.Train.dataBsClass = function(dataFromServer){

	//Array consists with keys of data from server
	this.keys = null;

	//Set up data
	this.dataFromServer = dataFromServer;

	//Counter of data items
	this.counter = 0;

	//Get single data by mode for transmitting into the data class
	this.getDataByMode = function(mode){
		if(this.dataFromServer[mode])
			return this.dataFromServer[mode];
		return null;
	};

	//Get current mode on this instance
	this.getCurrentMode = function(){
		if(this.keys[this.counter] == undefined){
			if(this.counter == 0){
				throw new Error('The counter equals 0');
			}
			this.counter--;
			this.getCurrentMode();
		}
		return this.keys[this.counter];
	};

	//Increase the mode counter
	this.increaseMode = function(){
		if(this.counter == Object.keys(this.dataFromServer).length - 1){
			this.resetMode();
			//alert('stop');
		}
		this.counter++;
	};

	//Reset pointer on the mode value
	this.resetMode = function(){
		this.counter = 0;
		this.keys = Object.keys(this.dataFromServer);
	};

	//Delete one single item from the mode item
	this.deleteById = function(mode,id){
		if(this.dataFromServer[mode])
		if(this.dataFromServer[mode][id]){
			delete this.dataFromServer[mode][id];

			//If the all items of current mode were trained, then delete this mode
			if(Object.keys(this.dataFromServer[mode]).length == 0){
				this.deleteByMode(mode);
			}
		}
	};

	//Delete the mode item
	this.deleteByMode = function(mode){
		if(this.dataFromServer[mode]){
			delete this.dataFromServer[mode];
			this.keys = Object.keys(this.dataFromServer);
		}
		return this.countModes();
	}

	//Get count of items in the data object
	this.countModes = function(){
		return this.keys.length;
	}

	this.resetMode();
}