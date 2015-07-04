/**
 * Created by rmolodyko on 04.07.15.
 */

/**
 * Function uses when need include and load some class to user script
 * @param data is the object which contains such values:
 * string path is name path to module as default "/public/js"
 * array is the names of class where prefix is path param
 * handler is the function which will be running when script will load
 */
function include(data){
    try{
        if(data)
        for(var i in data){
            $.getScript('http://example.com/script.js', function(){
                alert('script loaded');
            });
        }
    }catch(ReferenceError){

    }
}