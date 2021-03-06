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
window.Train.multiIterateClass = function(mode,setId){

	//Create opportunities for implementation of inheritance
	function constructor(){};
	constructor.prototype = new Train.iterateAbstract(mode,setId);
	var klass = new constructor();
	Train.multiIterateClass.prototype = new Train.iterateAbstract(mode,setId);

	//Stores instance of dataBsClass
	klass.dataBs = null;

	//Iterates the data and calls the form
	klass.iterate = function(){

		//Gets single item from data object
		try{
			var data = this.data.getMainDataByCounter(this.data.getCounter());

		//This block will be called when all items in the data object will be studied
		}catch(e){

			//If the count of modes not equal 0 then items in data object is exists
			if(this.objBs.countModes() > 0){

				//Change mode training
				this.objBs.increaseMode();

				//Transmit new single item into data class
				this.data = new Train.dataClass(this.objBs.getDataByMode(this.objBs.getCurrentMode()));

				//In this mode 'bs' algorithm have to call different instances of training hence it have to setting up new instances else again
				this.setUpParticle();

			//This block will be called when all of the modes and all the data will be studied
			}else{
				l("stop");
				return;
			}

			//Reset performing the method
			return;
		}

		//Increase single data counter
		this.data.increaseCounter();

		//Launching page with transmitted data
		this.trainObj.run(data);
	};

	//Method is called when single page will be ended
	klass.edge = function(results){
		//l('result data = ',results);
		//If result is true then remove this item from data
		if(results.result == true)
			this.objBs.deleteById(this.objBs.getCurrentMode(),results.id);

		//Calls new event subscribers
		$.publish('iterate');
	};

	//Calls when the application will be started
	klass.setup = function(e,response){

		//Init data bs class
		this.objBs = new Train.dataBsClass(response);

		//Get current mode from data
		this.mode = this.objBs.getCurrentMode();

		//Get single data from the particular mode
		this.data = new Train.dataClass(this.objBs.getDataByMode(this.mode));

		this.setUpParticle();
	};

	//Separate part of setup
	klass.setUpParticle = function(){

		//Remove previous event subscribers
		$.unsubscribe('iterate');

		//Gets instance of appropriate class
		this.trainObj = this.getTrainObject();

		//Sets up handler on the ending training
		this.trainObj.setHandler(this.proxy(this.edge));

		//Sets up handler on the beginning training
		$.subscribe('iterate',this.proxy(this.iterate));

		//Calls first time to start process
		this.iterate();
	}

	//Sets up handler on the beginning work and configuring
	$.subscribe('run',klass.proxy(klass.setup));

	return klass;
}
