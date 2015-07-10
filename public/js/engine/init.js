/**
 * Created by rmolodyko on 11.07.15.
 */

//Test results
$(document).ready(function(){
	var init = new Engine.LoaderClass('/public/js',[
		{name:'engine/logger.js'},
		{name:'engine/Engine.js'}
	], afterLoadClasses);

	function afterLoadClasses(){
		console.log('load1 was completed');
	}
});
