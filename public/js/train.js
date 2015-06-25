var Data = Spine.Model.setup("Data",["id","first","second"]);
Data.extend(Spine.Model.Ajax);

window.Control = Spine.Controller.create({
	elements: {
		".c-right-train>ul>li": "items",
		".train-container": "block",
		"#current-num": "num",
		".c-left-train>div": "idword",
		".next-train": "btnNext",
		".st": "soundBtn",
		"#all-num": "numAll",

		"#tmpl-wt": "tmplMethod",
		"#tmpl-show-res": "tmplResult"
	},

	events: {
		"click .st": "sound",
		"click .c-right-train ul li a": "checkout",
		"click .reload-btn": "reload"
	},

  	proxied: ["render","template","next","init","newPage","checkout","endTrain","showResult"],

 	count: 0,
 	idWord: 0,
 	is_click: 0,
 	answer: [],
 	tmplMethod: null,
 	is_sound: false,
 	mode: null,//Тип тренеровки

  	model: [],

	init: function(){
    	this.model.bind("refresh", this.next);
  	},

  	reload: function(){
  		window.location.reload();
  	},

  	template: function(i){
	    this.block.append(this.tmplMethod.tmpl(i));
	    this.refreshElements();
  	},

  	next: function(){
  		var items = this.model.all();

  		//Если нет что учить редиректим на страницу тренировок
  		if(items.length == 0){
	  		alert("You have already studied all words");
			window.location.replace("/?r=train");
		}

  		//Ставим количество слов
  		if(this.count == 0){
  			this.numAll.text(items.length);
  		}

  		//Заканчиваем тренировка и переходим к результатам
  		if(items.length == this.count){
  			this.endTrain();
  			this.refreshElements();
  			return;
  		}

  		this.is_click = false;
    	var obj = items[this.count];
    	this.idWord = parseInt(obj.id);
  		this.newPage();
  		this.template(obj);

  		if(this.mode == 'wt'){//Включить воспроизвидение слова при новой тренировке
			this.soundBtn.click();
		}
 	},

 	newPage: function(){
  		this.block.empty();
		this.count++;
		this.num.text(this.count);
 	},

 	endTrain: function(){
			var newObj = [];
			var obj = this.model.all();
			var length = obj.length;
			for(var i=0; i<length; i++){
				for(var j in obj[i].second){
					if(obj[i].second[j].is_true == 'right'){
						newObj[i] = {
								"first":obj[i].first,
								"is_true":this.answer[i].answ,
								"second":obj[i].second[j].item
							};
						break;
					}
				}
			}
			this.saveAnswers(newObj);
 	},

 	saveAnswers: function(showObj){
 		var showResult = this.showResult;
 		$.ajax({
			url: "/?r=train/save",
			data: {'data':JSON.stringify(this.answer),'mode':this.mode},
			cache: false
		})
		.done(function(html){
			var resp = JSON.parse(html);
			if(resp[0] == 'ok'){
				showResult(showObj);
			}
		});
 	},

 	showResult: function(obj){
 		this.block.empty();
		var tmpl = this.tmplResult.tmpl({'data':obj});
		tmpl.appendTo(this.block);
 	},

 	sound: function(e,word){
 		//TODO Что то сделать с этим
		var word = word || $(e.target).parent().parent().find('.title').text();
		if(word != '')
		SOUND.play(word);
	},

	checkout: function(e){
		var el = $(e.target);
		var idword = this.idWord;
		var answ = this.answer;
		var btnNext = this.btnNext;
		var items = this.items;
		var modeForSound = this.mode;
		var soundMethod = this.sound;

		//Если первый раз кликнули
		if(el.attr('data-isbtn') == 'true'&&!this.is_click){
			falseAnsw();
			this.is_click = true;
			btnBotToggle(true);
		}else{//Второй раз кликнули
			if(!this.is_click){
				var is_true = el.attr('data-istrue');
				this.is_click = true;
				if(is_true == "right"){
					trueAnsw();
				}else{
					falseAnsw();
				}
				btnBotToggle(true);
			}else{
				
				btnBotToggle(false);
				this.next();
			}
		}
		function falseAnsw(){
			answ.push({'word_id':idword,'answ':false});
			if(el == null){
				highlightGreen();
			}else{
				highlightGreen();
				$(el).addClass('hred');
			}
		}

		function trueAnsw(){
			answ.push({'word_id':idword,'answ':true});
			highlightGreen();
		}
		
		function highlightGreen(){
			$.each(items,function(i,e){
				var a = $(e).find('a');
				if(a.attr('data-istrue')=='right'){
					a.addClass('hgreen');
					console.log("sound");
					if(modeForSound == 'tw'){//Включить воспроизвидение слова
						soundMethod(null,a.text());
					}
				}
			});
		}

		function btnBotToggle(mode){
			if(mode){
				btnNext.addClass('too');
			}else{
				btnNext.removeClass('too');
			}
		}
	}
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
				url: "/?r=train/createWT&mode="+mode+"&set="+set
			});
			this.control = Control.init({el:this.controlEl,model:Data});
			this.control.mode = mode;
			if(mode == 'wt'){//Включить воспроизвидение слова при новой тренировке
		    	this.control.is_sound = true;
			}
			Data.fetch();
		}
	}).init(set,mode);
});