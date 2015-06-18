<script src="public/js/sound.js"></script>
<script src="public/js/translate.js"></script>
<script src="public/js/set.js"></script>

<?php
    $tr = new GTranslate();
    $trw = $tr->trWord("taste");
?>
<div class="word grid">
    <script type="text/javascript">
        var global = {};
            global.DATA = JSON.parse('<?=$data?>');
            global.SET = <?=$_GET['set']?>;
    </script>
    <div class="c-left grid">
        <div class="c-set-item">
            <div class="del" onclick="globalset.deleteSet()">X</div>
            <div class="title" contentEditable="true" data-idset="<?=$set->id?>"><?=$set->title?></div>
        </div>
    </div>
    <div class="c-right">
        <div class="panel-translate">
            <div class="field-input">
                <input type="text" id="translate" placeholder="search" class="inpt">
                <div id="commit">&nbsp;</div>
                <div id="cancel">&nbsp;</div>
                <div id="sound-btn">&nbsp;</div>
            </div>
            <div class="panel-tr">
                <div class="trans">
                    <table class="phrase-table">
                    </table>
                </div>
                <div class="cue">
                    <table class="single-table">
                    </table>
                </div>
            </div>
        </div>
        <div class="top-check">
            <div class="check-all-word"><input type="checkbox" id="checkAll" onclick="global.checkAll()"></div>
                <div class="checked-words"><span id="selectedInput">0</span></div>
                <div class="count-words">/ <span id="count"><?=$countRecords?></span></div>
                <div class="btns-top">
                    <div class="hblue btn" onclick="global.setStatus(false)">train</div>
                    <div class="hblue btn" onclick="global.setStatus(true)" style="width: 160px;">move in the study</div>
                </div>
                <div class="hblue btn learn-word" onclick="window.location.assign('/?r=train/show&set=<?=$_GET['set']?>')">train set</div>
            </div>
        <div class="list-word grid">
        </div>
    </div>
</div>