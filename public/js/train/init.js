var Data = Spine.Model.setup("Data",["id","first","second"]);
Data.extend(Spine.Model.Ajax);


jQuery(function($){
	var set = getQueryVariable('set');
	var mode = getQueryVariable('mode');
	window.App = Spine.Controller.create({
		el: $("body"),

		elements: {
		  ".control": "controlEl",
		},

		/*init: function(set,mode){
			TrainSingle.init();
		}*/

		init: function(set,mode){
			TrainMulti.init(this.controlEl,mode,set);
		}
	}).init(set,mode);
});