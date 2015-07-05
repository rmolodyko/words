/**
 * Created by rmolodyko on 03.07.15.
 */

/**
 * Start training
 */
$(document).ready(function(){
	l('hello world',1);
	var mode = 'wt';
	var sett = 1;
	(new Train.iterateClass(mode,sett));
	(new Train.loadClass(mode,sett)).load();
});
