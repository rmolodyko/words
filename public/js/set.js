window.globalset = {}

globalset.addSet = function(){
	$('.add-set-panel').css('display','block');
	$('#name-set').focus();
}

globalset.create = function(){
	var name = $('#name-set').val();
	if(name != '')
	window.location.replace("/?r=set/createSet&name="+name);
}

globalset.cancel = function(){
	$('.add-set-panel').css('display','none');
}

globalset.editName = function(){
	var new_name = $('.c-set-item .title').text();
	var id_set = parseInt($('.c-set-item .title').attr('data-idset'));
	if(new_name != '')
	$.ajax({
	  url: "/?r=set/editName",
	  data: {'id_set':id_set,'new_name':new_name},
	  cache: false
	})
	.done(function(html){
		var resp = JSON.parse(html);
		if(resp[0] == 'ok'){
		}
	});
}

globalset.focusTitle = function(){
	globalset.focusTitle.value = $('.c-set-item .title').text();
	$('.c-set-item .title').focusout(function(){
		var new_name = $('.c-set-item .title').text();
		if(new_name == ''){
			$('.c-set-item .title').text(globalset.focusTitle.value);
		}
		if(new_name != globalset.focusTitle.value){
			globalset.editName();
			globalset.focusTitle.value = $('.c-set-item .title').text();
		}
	});
}

globalset.deleteSet = function(){
	if(confirm("Are you sure?!")){
		var id_set = parseInt($('.c-set-item .title').attr('data-idset'));
		if(id_set > 0)
		window.location.replace("/?r=set/deleteSet&set="+id_set);
	}
}