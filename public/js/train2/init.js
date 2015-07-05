/**
 * Created by rmolodyko on 03.07.15.
 */

/**
 * Start training
 */
$(document).ready(function(){
	l('hello world',1);
	var mode = 'wt';
	var setId = 1;
	if(mode == 'bs'){
		(new Train.multiIterateClass(mode,setId));
	}else{
		(new Train.defaultIterateClass(mode,setId));
	}
	(new Train.loadClass(mode,setId)).load();
});
