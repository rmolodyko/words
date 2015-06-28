var TrainSW = Spine.Controller.create(TrainSound);
TrainSW.include({

	statusOut: true,

	isSoundOn: function(){
		this.speech();
	},
});
