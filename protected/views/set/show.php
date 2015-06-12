<script src="public/js/set.js"></script>
<div class="header-of-part">My sets <div class="edit-set"><a href="javascript:void(0)" onclick='globalset.addSet()'>add</a></div></div>
<div class="list-set grid">
<div class="add-set-panel">
    <div class='header-new-set'>Create new set</div>
    <input type="text" placeholder="name" id="name-set">
    <button id="create-set" onclick="globalset.create()">create</button>
    <button id="cancel-set" onclick="globalset.cancel()">cancel</button>
</div>
<?php

$this->widget('zii.widgets.CListView', array(
    'dataProvider'=>$dataProvider,
    'itemView'=>'_set', // представление для одной записи
    'ajaxUpdate'=>false, // отключаем ajax поведение
    'emptyText'=>'',
    'summaryText'=>"",
    'pager' => array(
        'header' => '',
        'nextPageLabel' => 'Next >',
        'prevPageLabel' => '< Last',
        //'lastPageCssClass' => 'pLast',
        'nextPageCssClass' => 'pNext',
        'previousPageCssClass' => 'pPrevious',
        'selectedPageCssClass' => 'pSelected',
        'internalPageCssClass' => 'pPage',
    ),
));
?>
</div>