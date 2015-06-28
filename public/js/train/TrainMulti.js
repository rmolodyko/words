var TrainMulti = Spine.Class.create({
	this.modes = ['sw','pw'],
	this.currentMode = null;
	this.count = 0,
	this.answer = [],
	init: function(controlEl,mode,set){
			this.changeInheritance();

	},

	increaseCount: function(){
		if(this.count == this.modes.length) this.count = 0;
		this.currnetMode = this.modes[this.count++];
	}

	nextStage: function(){
			var self = this;
			var DataSW = Spine.Model.setup("DataSW",["id","first","second"]);
			var DataPW = Spine.Model.setup("DataPW",["id","first","second"]);

			Data.extend({
				url: "/?r=train/createWrite&mode="+mode+"&set="+set
			});

			Data.bind("refresh", function(){
				console.log('hellow');

				var obj = [{'mode':'sw'},{'mode':'pw'}];
				for(var item in obj){
					var controller = null;
					item = obj[item];
						console.log('hhhk',obj[item]);
					switch(item.mode){
						case 'sw':
							controller = TrainSW;
							control = controller.init({el:controlEl,model:DataSW});
							control.mode = item.mode;
							DataSW.records = Data.all();
							DataSW.trigger('refresh');
							//DataSW.fetch();
							break; 
						case 'pw':
						
							controller = TrainPW;
							control = controller.init({el:controlEl,model:DataPW});
							control.mode = item.mode;
							DataPW.records = Data.all();
							DataPW.trigger('refresh');
							console.log('hhhk',DataPW);
							break; 
					}
					break;
				}
			});
			Data.fetch();
	},

	changeInheritance: function(){
		var self = this;
		TrainSW.include({
			endTrain: function(){
				console.log('endeeee');
				var newObj = [];
				var obj = this.model.all();
				var length = obj.length;
				for(var j in obj){
					newObj.push({
						"first":obj[j].first,
						"is_true":this.answer[j].answ,
						"second":obj[j].second[0]
					});
				}
		 	},
		});
	}
});