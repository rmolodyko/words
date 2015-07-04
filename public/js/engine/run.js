/**
 * Created by rmolodyko on 04.07.15.
 */

/**
* Function uses when need include and load some class to user script
* @param data is the names of class where prefix is path param
* handler is the function object which contains such values:
* string path is name path toi module as default "/public/js"
* array class is the non which will be running when script will load
*/
function include(data){
var pathPrefix = '/public/js/';
    try{
		if(data){

			var path =                                pathPrefix;
		            var klass = null;
		            if(data[i]['path'])
		                path = path+data[i]['path'];
		            for(var i in data){
		                if(data[i]['class'])
		        $.getScript('/script.js', function(){
		            alert('script loaded');
		        });
		    }
        }
		}catch(ReferenceError){

		}
}