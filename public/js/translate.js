

$(document).ready(function(){

	var translateArray = [];
	var selectArray = [];

	globalset.focusTitle();
	$('#translate').focus();
	drawAllWords(window.global.DATA);
	function drawAllWords(data){
		for(var k in data){
			addNewItem(k,data[k]['tr'],data[k]['status'],data[k]['id']);
		}
	}

	function addNewItem(word,data,status,id){
		$('.list-word').prepend(viewAllWords(word,data,status,id));
		translateArray = translateArray.concat(data);
	}

	global.liveSound = function(e){
		var word = $(e).parent().parent().find('.title').text();
		if(word != '')
		SOUND.play(word);
	};

	$('#cancel').click(function(){
		$('#translate').val('');
		$('#translate').focus();
		resetForm();
	});

	$('#sound-btn').click(function(){
		var text = $('#translate').val();
		if(text != '')
		SOUND.play(text);
	});

	$('#commit').click(function(){
		var text = $('#translate').val();
		if(text != '')
		$.ajax({
		  url: "/?r=word/getTranslate",
		  data: {'text':text},
		  cache: false
		})
		.done(function( html ) {
			var resp = JSON.parse(html);
			console.log(JSON.parse(html));
			if(resp[1] == 'phrase'){
				drawPhrase(resp[0],resp[2]);
			}else if(resp[1] == 'single'){
				drawSingle(resp[0],resp[2]);
			}
		});
		$('#translate').focus();
	});

	function addCount(){
		var count = parseInt($('#count').text());
		count += 1;
		$('#count').text(count);
	}

	function resetForm(){
		$('.phrase-table').empty();
		$('.single-table').empty();
	}
	
	function drawSingle(data,countWords){
		console.log(data);
		resetForm();
		$('.panel-translate').removeClass('phrase');
		$('.panel-translate').addClass('single');
		var i = 0;
		if(!$.isArray(data)){
			$('.single-table').append(viewErrorSingle());
			return;
		}
		for(var v in data){
			i = 0;
			$('.single-table').append(viewSepSingle(data[v][0]))
			for(var v1 in data[v][2]){
				if(i == parseInt(countWords)) break;
				$('.single-table').append(viewSingle(data[v][2][v1]));
				i++;
			}
		}	
	}

	function drawPhrase(data,countWords){
		resetForm();
		$('.panel-translate').addClass('phrase');
		$('.panel-translate').removeClass('single');
		var i = 0;
		viewSepSingle('phrase',true);
		$('.phrase-table').append(viewSepSingle('phrase',true));
		for(var v in data){
			if(i == parseInt(countWords)) break;
			$('.phrase-table').append(viewPhrase(data[v]));
			i++;
		}
	}

	global.replaceWord = function(data){
		var text = $(data).text();
		$('#translate').val(text);
		$('#commit').click();
	}

	global.addWord = function(data){
		var word = $('#translate').val().trim();
		var tr = $(data).text().trim();
		var set1 = parseInt(window.global.SET);
		$.ajax({
		  url: "/?r=word/setTranslate",
		  data: {'set':set1,'word':word,'translate':tr},
		  cache: false
		})
		.done(function(html){
			var resp = JSON.parse(html);
			if(resp[0] == 'ok'){
				if(window.global.DATA[word] != undefined){
					window.global.DATA[word]['tr'].push(tr);
				}else{
					window.global.DATA[word]['tr'] = [tr];
					addCount();
				}
				updateAllWord();
			}
		});	
	}

	function updateAllWord(){
		selectArray = [];
		$('#selectedInput').text(0);
		$('#checkAll').attr('checked', false);
		$('#commit').click();
		$('.list-word').empty();
		drawAllWords(window.global.DATA);
		$('#translate').focus();
	}

	global.setStatus = function(is_clear){
		$.ajax({
		  url: "/?r=word/setStatus",
		  data: {'is_clear':is_clear,'data':JSON.stringify(selectArray)},
		  cache: false
		})
		.done(function(html){
			var resp = JSON.parse(html);
			if(resp[0] == 'ok'){
				for(var i in window.global.DATA){
					var obj = window.global.DATA[i];
					var num = parseInt(obj['id']);
					if(-1 != $.inArray(num,selectArray)){
						obj['status'] = ""+is_clear;
					}
				}
				updateAllWord();
			}
		});	
	}

	global.del_tr = function(set,word,tr){
		$.ajax({
		  url: "/?r=word/delTranslate",
		  data: {'set':set,'word':word,'translate':tr},
		  cache: false
		})
		.done(function(html){
			var resp = JSON.parse(html);
			if(resp[0] == 'ok'){
				if(window.global.DATA[word]['tr'] != undefined){
					var index = window.global.DATA[word]['tr'].indexOf(tr);
					window.global.DATA[word]['tr'].splice(index, 1);
				}
				$('#cancel').click();
				$('.list-word').empty();
				drawAllWords(window.global.DATA);
				$('#translate').focus();
			}
		});	
	}

	global.del_word= function(set,word){
		$.ajax({
		  url: "/?r=word/delWord",
		  data: {'set':set,'word':word},
		  cache: false
		})
		.done(function(html){
			var resp = JSON.parse(html);
			if(resp[0] == 'ok'){
				if(window.global.DATA[word] != undefined){
					delete window.global.DATA[word];
				}
				$('#cancel').click();
				$('.list-word').empty();
				drawAllWords(window.global.DATA);
				$('#translate').focus();
			}
		});	
	}

	global.selectWord = function(el){
		var el = $(el);
		var id = parseInt(el.attr('data-wordid'));
		if(el.is(":checked")){
			selectArray.push(id);
		}else{
			var index = selectArray.indexOf(id);
			selectArray.splice(index, 1);
		}
		var count = selectArray.length;
		$('#selectedInput').text(count);
		if(count > 0){
			$('.btns-top').css('display','inline-block');
		}else{
			$('.btns-top').css('display','none');
		}
	}

	global.checkAll = function(){
		$('.list-word .c-word-item .check-field input').click();
	}


	//Переписать представление с помощью библиотеки JQuery.tmpl
	function viewAllWords(word,trans,status,id){
		var tr = '';
		function hoverTr(set,word,tr){
			return '<a href="javascript:void(0)" onclick="global.del_tr(\''+global.SET+'\',\''+word+'\',\''+tr+'\')">(-)</a>';
		}
		for(var k in trans){
			tr += '<span>'+trans[k]+hoverTr(global.SET,word,trans[k])+'</span>, ';
		}
		tr = tr.substring(0,tr.length-2);
		var str = '<div class="c-word-item" data-wordid="'+id+'">';
			str += '<div class="check-field"><input type="checkbox" onclick="global.selectWord(this)" data-wordid="'+id+'"></div>';
			str += '<div class="voice-field">&nbsp;<span onclick="global.liveSound(this)"></span></div>';
			str += '<div class="title">'+word+'</div>';
			str += '<div class="separator">—</div>';
			str += '<div class="translate">'+tr+'</div>';
			str += '<div class="remove"><a href="javascript:void(0)" onclick="global.del_word(\''+global.SET+'\',\''+word+'\')">(-)</a></div>';
			str += '<div class="status '+(status == 'true'?'show-status':'')+'">&nbsp;</div>';
			str += '</div>';
		return str;
	}

	function viewPhrase(data){
		var freq = '';
		if(-1 !== $.inArray(data,translateArray)){
			freq = '+';
		}
		var str = '<tr>';
		str += "<td class='freq'>"+freq+"</td><td class='word' onclick='global.addWord(this)'>"+data+"</td>";
		str += '</tr>';
		return str;
	}

	function viewSingle(data){
		var help_words = '';
		var i = 0;
		for(var k in data[1]){
			if(i == 5) break;
			help_words += "<a href='javascript:void(0)' onclick='global.replaceWord(this)'>"+data[1][k]+"</a>&nbsp;";
			i++;
		}
		var freq = '';
		console.log(data[0]);
		var word1 = data[0].trim();
		if(-1 !== $.inArray(word1,translateArray)){
			freq = '+';
		}
		var str = '<tr>';
		str += "<td class='freq'>"+freq+"</td><td class='word' onclick='global.addWord(this)'>"+word1+"</td><td class='help'>"+help_words+"</td>";
		str += '</tr>';
		return str;
	}

	function viewSepSingle(data,mode){
		var c = mode ? 2 : 3;
		return "<tr class='separator'><td colspan='"+c+"'>"+data+"</td></tr>";
	}

	function viewErrorSingle(){
		return "<tr class='separator'><td colspan='3'>no data</td></tr>";
	}
});
