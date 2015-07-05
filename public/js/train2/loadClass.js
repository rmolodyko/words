/**
 * Created by rmolodyko on 04.07.15.
 */

/**
 * Get or if not exists create module Train
 */
if(window.Train == undefined) window.Train = {};

/**
 * Class for load data from server and saving to there
 * @param mode type training
 * @param setId Id set
 */
//TODO Maybe need add handler on the first load of data from server
window.Train.loadClass = function(mode,setId){

	this.url = '/?r=train/getData';
	this.set = setId;
	this.mode = mode;

	//Load data from server
	this.load = function(){

		//Send request to server for obtain data
		$.get(this.url,{'mode':this.mode,'set':this.set}).done(function(response){

			//if exists good response
			if(response){
				try{

					//Run event after getting response, all subscribers have to set up callbacks before this
					$.publish('run',[JSON.parse(response)]);

				//If parsing the data executed with error
				}catch(e){
					console.error(e);
				}
			}

		});
	}
}
