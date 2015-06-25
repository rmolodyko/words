<script src="public/js/helper.js"></script>
<script src="public/js/spine.js"></script>
<script src="public/js/spine.controller.manager.js"></script>
<script src="public/js/spine.model.ajax.js"></script>
<script src="public/js/spine.model.local.js"></script>
<script src="public/js/spine.list.js"></script>
<script src="public/js/sound.js"></script>
<script src="public/js/train.js"></script>
<script src="public/js/jquery.tmpl.min.js"></script>


<div class="control">

	<script type="text/x-jquery-tmpl" id="tmpl-wt">
		<div class="c-left-train">
			<div data-wordid="${wordid}"><span class="st"></span><span class="title">${first}</span></div>
		</div>
		<div class="c-right-train">
			<ul>
				{{each second}}
					<li><a href="javascript:void(0)" class="li-train"  data-translateid="${$value.id}" data-istrue="${$value.is_true}">${$value.item}</a></li>
				{{/each}}
				<li><a href="javascript:void(0)" class="next-train hblue" data-isbtn="true"><span class="no-idea">I have no idea</span><span class="next-tr">next</span> →</a></li>
			</ul>
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