"use strict";


var TrainSound = getSub(TrainSuper,{

	elements: {
		".train-container": "block",
		"#current-num": "num",
		".st": "soundBtn",
		"#all-num": "numAll",
		"#speech span": "speechSpan",

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
		"click #speech": "speech",
	},

  	proxied: ["render","template","next","init","showResult"],

 	count: 0,
 	answer: [],
 	is_sound: false,
 	mode: null,//Тип тренеровки

 	wrongText: 'no answer',

  	model: [],

  	isSoundOn: function(){},

  	reload: function(){
  		window.location.reload();
  	},

  	next: function(){
  		console.log('refresh');
  		var item = this.model.all()[this.count];
  		item['status'] = this.statusOut;
  		this.template(item,this.tmplMethod);
  		this.num.text(this.count+1);

		this.isSoundOn();

  		if(this.count == 0){
  			this.numAll.text(this.model.all().length);
  		}
  		this.input.focus();
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

 	speech: function(){
		this.sound(null,this.speechSpan.text());
		this.input.focus();
 	},

});