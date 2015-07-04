/**
 * Created by rmolodyko on 04.07.15.
 */

/**
 * Get or if not exists create module Train
 */
if(window.Train == undefined) window.Train = {};
/**
 * Class for load data from server and save to there
 * @param mode type training
 * @param setId Id set
 */
window.Train.loadClass = function(mode,setId){

	this.set = setId;
	this.mode = mode;

	//Load data from server
	this.load = function(){

		//Send request to server for obtain data
		$.get('/?r=train/createWT',{'mode':this.mode,'set':this.set}).done(function(response){

			//l(response);
			//if exists good response
			if(response){
				try{

					//Trigger event after getting response all subscribers have to set up before
					$.publish('run',[JSON.parse(response)]);

				//If parsing the data executed with error
				}catch(e){
					console.error(e);
				}
			}

		});
	}
}
