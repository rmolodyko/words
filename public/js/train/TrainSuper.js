"use strict";

/**
 * Суперклас класс, содержит общие методы для наследников
 */
var TrainSuper = getSub(TrainAbstract,{

	/** 
	 * Метод инициализирует данные и состояние при первом запуске
	 */
	init: function(){
		console.log('refresh');
		//При загрузке модели вызываем this.next
		this.model.bind("refresh", this.next);
	},

	/**
	 * Метод рисует в главном блоке результат
	 * i - данные для представления
	 * fn - представление сохраненное в свойство контроллера
	**/
	template: function(i,fn){
		
		//Чистим блок вывода
		this.block.empty();

		//Рисуем результат
		this.block.append(fn.tmpl(i));

		//Обновляем ссылки на html элементы
		this.refreshElements();
	},

	sound: function(e,word){
		//TODO Что то сделать с этим
		var word = word || $(e.target).parent().parent().find('.title').text();
		if(word != '')
		SOUND.play(word);
	},
});