<script type="text/javascript">
	window.goTrain = function(e){
		var klass = $(e).attr('class');
		var set = parseInt($('#select-sets').val());
		switch(klass){
			case 'c-left-full':
				window.location.assign("/?r=train/full&set="+set);
			break;
			case 'c-wt':
				window.location.assign("/?r=train/wt&set="+set);
			break;
			case 'c-tw':
				window.location.assign("/?r=train/tw&set="+set);
			break;
			case 'c-speech':
				window.location.assign("/?r=train/speech&set="+set);
			break;
			case 'c-spell':
				window.location.assign("/?r=train/spell&set="+set);
			break;
		}
	}
	window.openSet = function(){
		var set = parseInt($('#select-sets').val());
		window.location.assign("/?r=word/show&set="+set);
	}
</script>
<div class="train grid">
	<div class="c-top-panel">
		<select id="select-sets" class="sel">
			<?php
				foreach ($sets as $k=>$v){
			?>
				<option value="<?=$v->id?>" <?=(isset($_GET['set'])&&$v->id==(int)$_GET['set'])?"selected":""?>><?=$v->title?></option>
			<?php
				}
			?>
		</select>
		<div class="hblue btn" onclick="openSet()" style="margin-left: 34%;padding: 6px;">open set</div>
	</div>
	<div href="javascript:void(0)" class="c-left-full" onclick="goTrain(this)"><span class="fill"></span><span class="title">brainstorm</span></div>
	<div href="javascript:void(0)" class="c-wt" onclick="goTrain(this)"><span class="fill"></span><span class="title">word - translate</span></div>
	<div href="javascript:void(0)" class="c-tw" onclick="goTrain(this)"><span class="fill"></span><span class="title">translate - word</span></div>
	<div href="javascript:void(0)" class="c-speech" onclick="goTrain(this)"><span class="fill"></span><span class="title">speech</span></div>
	<div href="javascript:void(0)" class="c-spell" onclick="goTrain(this)"><span class="fill"></span><span class="title">spell</span></div>
</div>
