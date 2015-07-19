/**
 * Created by rmolodyko on 11.07.15.
 */

//Test results
$(document).ready(function(){
	var init = new Engine.LoaderClass();

	function afterLoadClasses(){
		console.log('load1 was completed');

		l(Pyramid.Class);

		var Class1 = Pyramid.Class.create(null,{val9:'val9'});
		var Class2 = Pyramid.Class.create(Class1,{val1:'val1',__construct:function(){
			this.parent();
		}});

		var obj1 = new Class2;

		console.log(obj1,obj1.val9);

	}

	init.loadModule('/engine',['init.js','LoaderClass.js'],afterLoadClasses);
	//init.loadModule('/train2',null,afterLoadClasses);
});
