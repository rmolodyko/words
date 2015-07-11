/**
 * Created by rmolodyko on 11.07.15.
 */

//Test results
$(document).ready(function(){
	var init = new Engine.LoaderClass();

	function afterLoadClasses(){
		console.log('load1 was completed');
		window.startTrain();
	}

	init.loadModule('/engine',['init.js','LoaderClass.js'],null);
	init.loadModule('/train2',null,afterLoadClasses);
});
