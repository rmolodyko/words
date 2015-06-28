"use strict";

/**
 * Абстрактный класс, содержит обязательные методы для наследников
 * mode - это параметр который определяет какой тип тренировки
 * 		wt - word-translate - отображается английское слово и тренируется его перевод
 * 		tw - translate-word - отображается русское слово и тренируется его перевод
 * 		sw - speech-word - озвучивается английское слово и нужно его написать в поле для ввода
 * 		pw - spell-word - показывается перевод английского слова и его нажно вписать в поле ввода
 * 		bs - brain-storm - это комбинации разных тренировок
 *
 * 		Дальше эти тренировки разделены на группы:
 * 			input-mode - это тренировки wt и tw
 * 			sound-mode - это тренировки sw и pw
 * 			train-mode - это тренировки bs
 * 		соответственно этим тренировкам названы общие классы для разных видов тренировок
 */
var TrainAbstract = {

	/**
	 * Метод инициализирует данные и состояние при первом запуске
	 */
	init: function(){ console.error('Method is not overridden'); },

	/**
	 * Метод рисует в главном блоке результат
	 */
	template: function(){ console.error('Method is not overridden'); },

	/**
	 * Следующее представление(этап тренировки)
	 */
	next: function(){ console.error('Method is not overridden'); },
	
	/**
	 * Проверка результата пользователя
	 */
	check: function(){ console.error('Method is not overridden'); },

	/**
	 * Метод заканчивает тренировку отображает и сохраняет результат
	 */
	endTrain: function(){ console.error('Method is not overridden'); },
};