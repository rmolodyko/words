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

	function constructor(){};
	constructor.prototype = new Train.iterateAbstract(mode,setId);
	var klass = new constructor();

	Train.multiIterateClass.prototype = new Train.iterateAbstract(mode,setId);

	//Iterates the data and calls the form
	klass.iterate = function(){

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

	//Calls when the application will be started
	klass.setup = function(e,response){
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
	$.subscribe('run',klass.proxy(klass.setup));

	return klass;
}
