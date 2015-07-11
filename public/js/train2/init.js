/**
 * Created by rmolodyko on 03.07.15.
 */

/**
 * Start training
 */

window.startTrain = function(){

	console.log('iiiiiiiii');

	var mode = 'wt';
	var setId = 1;
	if(mode == 'bs'){
		(new Train.multiIterateClass(mode,setId));
	}else{
		(new Train.defaultIterateClass(mode,setId));
	}
	(new Train.loadClass(mode,setId)).load();
}
