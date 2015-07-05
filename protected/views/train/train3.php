<script src="public/js/jquery.tmpl.min.js"></script>
<script src="public/js/helper.js"></script>
<script src="public/js/spine.js"></script>
<script src="public/js/spine.controller.manager.js"></script>
<script src="public/js/spine.model.ajax.js"></script>
<script src="public/js/spine.model.local.js"></script>
<script src="public/js/spine.list.js"></script>
<script src="public/js/sound.js"></script>

<script src="public/js/engine/logger.js"></script>
<script src="public/js/train2/trainAbstract.js"></script>
<script src="public/js/train2/pubsub.js"></script>
<script src="public/js/train2/loadClass.js"></script>
<script src="public/js/train2/dataClass.js"></script>
<script src="public/js/train2/iterateClass.js"></script>
<script src="public/js/train2/trainWtClass.js"></script>
<script src="public/js/train2/init.js"></script>


<div class="control">

	<script type="text/x-jquery-tmpl" id="tmpl-result">
		<!-- wrong have to write when the word is wrong -->
		<div class="c-block1-train">
			<div class="title">
				{{each second}}${($index == 0 ? '':', ')+$value}{{/each}}</div>
		</div>
		<div class="c-block2-train">
			<div class="true-word  ${status?'':'wrong'}">
				<div class="true"><span class="sound1">&nbsp;<span class="st"></span></span>
									<span class="title">${word}</span></div>
				<div class="false">${wrong}</div>
			</div>
		</div>
		<div class="c-block3-train">
			<a href="javascript:void(0);" class="hblue btn" id="ok">ok</a>
		</div>
	</script>

	<script type="text/x-jquery-tmpl" id="tmpl-vr">
		<!-- status-logo have to write when use speech mode -->
		<div class="c-block1-train ${(status ? 'status-logo' : '')}">
			<div class="title">
				{{each second}}${($index == 0 ? '':', ')+$value}{{/each}}
			</div>
			<div class="logo"><a href="javascript:void(0);" id="speech">&nbsp;<span>${first}</span></a></div>
		</div>
		<div class="c-block2-train">
			<div class="input1"><input type="text" name="input" id="input"></div>
		</div>
		<div class="c-block3-train">
			<a href="javascript:void(0);" class="hred btn" id="noidea">i have no idea</a>
			<a href="javascript:void(0);" class="hblue btn" id="check">check</a>
		</div>
	</script>

	<script type="text/x-jquery-tmpl" id="tmpl-show-res">
		<div class="c-res-tr">
			{{each data}}
				<div class="c-word-item list-word"><div class="check-field">${$index+1}.</div><div class="voice-field">&nbsp;<span class="st"></span></div><div class="title">${$value.first}</div><div class="separator">—</div><div class="translate"><span>${$value.second}</span></div><div class="remove">${((!!$value.is_true)?"+":"-")}</div></div>
			{{/each}}
		</div>
		<div class="c-go-further">
			<a href="javascript:void(0)" class="reload-btn next-train hblue" data-isbtn="true"><span>Learn new words</span> →</a>
		</div>
	</script>


	<div class="train-count"><span class="set-name-train"><?=$set_name?></span><span class="count-word-training"><span id="current-num">0</span> / <span id="all-num">0</span></span></div>
	<div class="train-container grid"></div>
</div>