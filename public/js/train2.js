var Data = Spine.Model.setup("Data",["id","first","second"]);
Data.extend(Spine.Model.Ajax);

window.ControlWrite = Spine.Controller.create({
	elements: {
		".train-container": "block",
		"#current-num": "num",
		".st": "soundBtn",
		"#all-num": "numAll",
		

		"#input": 'input',

		"#tmpl-vr": "tmplMethod",
		"#tmpl-result": "tmplResMethod",
		"#tmpl-show-res": "tmplResult"
	},

	events: {
		"click #check": "check",
		"click #noidea": "noidea",
		"click #ok": "ok",
		"click .next-train": "reload",
		"click .st": "sound",
	},

  	proxied: ["render","template","next","init","showResult"],

 	count: 0,
 	answer: [],
 	is_sound: false,
 	mode: null,//Тип тренеровки

 	wrongText: 'no answer',

  	model: [],

	init: function(){
    	this.model.bind("refresh", this.next);

  	},

  	reload: function(){
  		window.location.reload();
  	},

  	template: function(i,fn){
  		this.block.empty();
    	this.block.append(fn.tmpl(i));
	    this.refreshElements();
  	},

  	next: function(){
  		var item = this.model.all()[this.count];
  		this.template(item,this.tmplMethod);
  		this.input.focus();
  		this.num.text(this.count+1);

  		if(this.count == 0){
  			this.numAll.text(this.model.all().length);
  		}
  	},

  	check: function(){
  		console.log('check');
  		this.setAnsw();
  	},

  	noidea: function(){
		this.setAnsw(true);
  	},

  	setAnsw: function(makeWrong){
  		var val = $.trim(this.input.val()) || this.wrongText;
  		var item = this.model.all()[this.count];
  		var answ = makeWrong ? false : ((item.first == val) ? true : false);
		var obj = {'word':item.first,'wrong':val,'second':item.second,'status':answ}
  		this.template(obj,this.tmplResMethod);
  		this.answer.push({'word_id':item.id,'answ':answ});
  		this.soundBtn.click();
  	},

  	ok: function(){
  		console.log('ok',this.count,this.model.all().length);
  		if(this.count+1 == this.model.all().length){
  			console.log('---');
  			this.endTrain();
  			return;
  		}
  		this.count++;
  		this.next();
  	},

  	endTrain: function(){
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
		this.saveAnswers(newObj);
 	},

 	saveAnswers: function(showObj){
 		var showResult = this.showResult;
 		var template = this.template;
 		var fnTmpl = this.tmplResult;
 		var self = this;

 		$.ajax({
			url: "/?r=train/save",
			data: {'data':JSON.stringify(this.answer),'mode':this.mode},
			cache: false
		})
		.done(function(html){
			var resp = JSON.parse(html);
			if(resp[0] == 'ok'){
				template({'data':showObj},fnTmpl);
				self.refreshElements();
			}
		});
 	},

 	sound: function(e,word){
 		//TODO Что то сделать с этим
		var word = word || $(e.target).parent().parent().find('.title').text();
		if(word != '')
		SOUND.play(word);
	},

});

jQuery(function($){
	var set = getQueryVariable('set');
	var mode = getQueryVariable('mode');
	window.App = Spine.Controller.create({
		el: $("body"),

		elements: {
		  ".control": "controlEl",
		},

		init: function(set,mode){
			Data.extend({
				url: "/?r=train/createWrite&mode="+mode+"&set="+set
			});
			this.control = ControlWrite.init({el:this.controlEl,model:Data});
			this.control.mode = mode;
			Data.fetch();
		}
	}).init(set,mode);
});