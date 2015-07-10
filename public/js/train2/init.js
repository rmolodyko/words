/**
 * Created by rmolodyko on 03.07.15.
 */

/**
 * Start training
 */
$(document).ready(function(){
	//Load right classes and start main execution
	new Engine.LoaderClass('/public/js/train2',[
		'trainAbstract.js',
		'pubsub.js',
		'loadClass.js',
		'dataClass.js',
		'dataBsClass.js',
		'iterateAbstract.js',
		'defaultIterateClass.js',
		'multiIterateClass.js',
		'trainWtClass.js',
		'trainBsClass.js'
	], afterLoadClasses);

	function afterLoadClasses(){
		var mode = 'wt';
		var setId = 1;
		if(mode == 'bs'){
			(new Train.multiIterateClass(mode,setId));
		}else{
			(new Train.defaultIterateClass(mode,setId));
		}
		(new Train.loadClass(mode,setId)).load();
	}
});
