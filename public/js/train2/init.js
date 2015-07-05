/**
 * Created by rmolodyko on 03.07.15.
 */

/**
 * Start training
 */
$(document).ready(function(){
	l('hello world',1);
	var mode = 'bs';
	var setId = 1;
	(new Train.multiIterateClass(mode,setId));
	(new Train.loadClass(mode,setId)).load();
});
