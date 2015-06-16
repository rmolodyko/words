<script src="public/js/sound.js"></script>
<script src="public/js/train.js"></script>
<script src="public/js/jquery.tmpl.min.js"></script>
<script type="text/javascript">
	window.globalTrain = JSON.parse('<?=$data?>');
	window.globalNameSet = '<?=$set_name?>';
</script>
<script type="text/x-jquery-tmpl" id="tmpl-wt">
	<div class="c-left-train">
		<div data-wordid="${id}"><span class="st" onclick="global.liveSound(this)"></span><span class="title">${word}</span></div>
	</div>
	<div class="c-right-train">
		<ul>
			{{each translate}}
				<li><a href="javascript:void(0)" class="li-train" onclick="checkoutWT(this)" data-translateid="${$value.id}" data-istrue="${$value.is_true}">${$value.tr}</a></li>
			{{/each}}
			<li><a href="javascript:void(0)" class="next-train hblue" data-isbtn="true" onclick="checkoutWT(this)"><span class="no-idea">I have no idea</span><span class="next-tr">next</span> →</a></li>
		</ul>
	</div>
</script>
<script type="text/x-jquery-tmpl" id="tmpl-show-res">
	<div class="c-res-tr">
		{{each data}}
			<div class="c-word-item list-word"><div class="check-field">${$index+1}.</div><div class="voice-field">&nbsp;<span onclick="global.liveSound(this)"></span></div><div class="title">${$value.word}</div><div class="separator">—</div><div class="translate"><span>${$value.tr}</span></div><div class="remove">${((!!$value.is_true)?"+":"-")}</div></div>
		{{/each}}
	</div>
	<div class="c-go-further">
		<a href="javascript:void(0)" class="next-train hblue" data-isbtn="true" onclick="checkoutWT(this)"><span onclick="reloadPage()">Learn new words</span> →</a>
	</div>
</script>
<div class="train-count"><span class="set-name-train"><?=$set_name?></span><span class="count-word-training"><span id="current-num">0</span> / <span id="all-num">10</span></span></div>
<div class="train-container grid">
</div>