<script type="text/javascript">
	window.goTrain = function(e){
		var klass = $(e).attr('class');
		var set = parseInt($('#select-sets').val());
		switch(klass){
			case 'c-left-full':
				window.location.replace("/?r=train/full&set="+set);
			break;
			case 'c-wt':
				window.location.replace("/?r=train/wt&set="+set);
			break;
			case 'c-tw':
				window.location.replace("/?r=train/tw&set="+set);
			break;
			case 'c-speech':
				window.location.replace("/?r=train/speech&set="+set);
			break;
			case 'c-spell':
				window.location.replace("/?r=train/spell&set="+set);
			break;
		}
	}
	window.resetWord = function(){
		var set = parseInt($('#select-sets').val());
		window.location.replace("/?r=train/resetTrain&set="+set);
	}
</script>
<div class="train grid">
	<div class="c-top-panel">
		<select id="select-sets">
			<?php
				foreach ($sets as $k=>$v){
			?>
				<option value="<?=$v->id?>"><?=$v->title?></option>
			<?php
				}
			?>
		</select>
		<div class="hblue btn" onclick="resetWord()">reset words in set</div>
	</div>
	<a href="javascript:void(0)" class="c-left-full" onclick="goTrain(this)"></a>
	<a href="javascript:void(0)" class="c-wt" onclick="goTrain(this)">Word -> Translate</a>
	<a href="javascript:void(0)" class="c-tw" onclick="goTrain(this)"></a>
	<a href="javascript:void(0)" class="c-speech" onclick="goTrain(this)"></a>
	<a href="javascript:void(0)" class="c-spell" onclick="goTrain(this)"></a>
</div>
