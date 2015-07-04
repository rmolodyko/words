/**
 * Created by rmolodyko on 04.07.15.
 */

/**
 * Function override console.log javascript default function
 * @type {log}
 */
window.l = function(){
	//Call console.log with float arguments
	console.log.apply(console,arguments);
}
