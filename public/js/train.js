window.global = {};

$(document).ready(function(){
	checkoutWT.answer = [];
	go.id = 0;
	go();
	initTopNumPanel();
});

function showResult(obj){
	var newObj = [];
	var c = 0;
	for(var i in globalTrain){
		console.log(globalTrain[i]);
		var tr = '';
		for(var j in globalTrain[i].data.translate){
			if(globalTrain[i].data.translate[j].is_true == 'right'){
				tr = globalTrain[i].data.translate[j].tr;
				break;
			}
		}
		newObj[c] = {word:globalTrain[i].data.word,is_true:obj[c].answ,tr:tr};
		c++;
	}
	console.log(newObj);

	$('.train-container').empty();
	var tmpl = $('#tmpl-show-res').tmpl({'data':newObj});
	tmpl.appendTo($('.train-container'));
}

function initTopNumPanel(){
	var countWord = globalTrain.length;
	console.log(countWord);
	$('#all-num').text(countWord);
}

function getTrueAnsw(data){
	$.ajax({
	  url: "/?r=train/save",
	  data: {'data':JSON.stringify(data)},
	  cache: false
	})
	.done(function(html){
		var resp = JSON.parse(html);
		if(resp[0] == 'ok'){
			showResult(data);
		}
	});
}

function go(){
	checkoutWT.is_click = false;
	$('.train-container').empty();
	if(globalTrain.length == 0){
		alert("You have already studied all words");
		window.location.replace("/?r=train");
		return;
	}
	if(globalTrain.length <= go.id){
		getTrueAnsw(checkoutWT.answer);
		return;
	}
	var tmpl = $('#tmpl-wt').tmpl(globalTrain[go.id]['data']);
	console.log(globalTrain[go.id]['data']);
	tmpl.appendTo($('.train-container'));
	$('.c-left-train .st').click();
	go.id++;
	$('#current-num').text(go.id);
}

function falseAnsw(idword,el){
	checkoutWT.answer.push({'word_id':idword,'answ':false,'type':'wt'});
	if(el == null){
		highlightGreen();
	}else{
		highlightGreen();
		$(el).addClass('hred');
	}
}

function highlightGreen(){
	$.each($('.c-right-train>ul>li'),function(i,e){
		var a = $(e).find('a');
		if(a.attr('data-istrue')=='right'){
			a.addClass('hgreen')
		}
	});
}

function trueAnsw(idword){
	checkoutWT.answer.push({'word_id':idword,'answ':true,'type':'wt'});
	highlightGreen();
}

checkoutWT = function(e){
	var el = $(e);
	var idword = $('.c-left-train>div').attr('data-wordid');
	
	if(el.attr('data-isbtn') == 'true'&&!checkoutWT.is_click){
		falseAnsw(idword);
		console.log('next-train');
		checkoutWT.is_click = true;
		$('.next-train').addClass('too');
	}else{
		if(!checkoutWT.is_click){
			var is_true = el.attr('data-istrue');
			checkoutWT.is_click = true;
			if(is_true == "right"){
				console.log('true');
				trueAnsw(idword);
			}else{
				falseAnsw(idword,e);
			}
			$('.next-train').addClass('too');
		}else{
			console.log("next");
			$('.next-train').removeClass('too');
			go();
		}
	}
}

global.liveSound = function(e){
	var word = $(e).parent().parent().find('.title').text();
	if(word != '')
	SOUND.play(word);
};

function reloadPage(){
	window.location.reload();
}