var TrainSingle = Spine.Class.create({
	init: function(controlEl,mode,set){
		Data.extend({
			url: "/?r=train/createWrite&mode="+mode+"&set="+set
		});
		var controller = null;
		switch(mode){
			case 'sw':
				controller = TrainSW;
				break; 
			case 'pw':
				controller = TrainPW;
				break; 
		}
		control = controller.init({el:controlEl,model:Data});
		control.mode = mode;
		Data.fetch();
	}
});