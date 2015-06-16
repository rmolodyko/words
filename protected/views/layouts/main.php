<!doctype html>
<html ng-app="todoApp">
  <head>
    <script src="public/js/jquery.js"></script>
    <link rel="stylesheet" href="public/css/main.css">
  </head>
  <body>
	<div id="container">
	<div class="wrap_header grid">
		<div class="c-title"><a href="/">Words</a></div>
		<div class="c-user"><a heref="#"><?=Yii::app()->user->getName()?></a></div>
		<div class="c-list-links">
			<ul>
				<li><a href="/?r=set/show">set</a></li>
				<li><a href="?r=train">training</a></li>
				<li>
					<?php 
						if(!Yii::app()->user->isGuest){
					?>
					<a href="?r=site/logout">log out</a>
					<?php
						}else{
					?>
						<a href="?r=site/login">log in</a>
					<?php
						}	
					?>
				</li>
			</ul>
		</div>
	</div>
		<div class="content">
			<?php echo $content; ?>
		</div>
	</div>
  </body>
</html>