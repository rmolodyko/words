-- phpMyAdmin SQL Dump
-- version 4.3.7
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Час створення: Чрв 16 2015 р., 18:05
-- Версія сервера: 10.0.15-MariaDB
-- Версія PHP: 5.6.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База даних: `twords`
--

-- --------------------------------------------------------

--
-- Структура таблиці `tbl_set`
--

CREATE TABLE IF NOT EXISTS `tbl_set` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `title` varchar(80) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `tbl_set`
--

INSERT INTO `tbl_set` (`id`, `id_user`, `title`) VALUES
(1, 1, 'interstellar'),
(2, 1, 'garfield');

-- --------------------------------------------------------

--
-- Структура таблиці `tbl_translate`
--

CREATE TABLE IF NOT EXISTS `tbl_translate` (
  `id` int(11) NOT NULL,
  `id_word` int(11) NOT NULL,
  `translate` varchar(100) NOT NULL,
  `id_set` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `tbl_translate`
--

INSERT INTO `tbl_translate` (`id`, `id_word`, `translate`, `id_set`) VALUES
(69, 30, 'покупать', 1),
(73, 32, 'кот', 2),
(74, 32, 'сварливая женщина', 2),
(75, 33, 'делать', 1),
(76, 33, 'натворить', 1),
(77, 33, 'годиться', 1),
(84, 37, 'звать', 1),
(85, 38, 'лучше бы', 1),
(88, 40, 'заклинание', 1),
(89, 41, 'устанавливать', 1),
(90, 42, 'движение', 1),
(91, 42, 'сделка', 1),
(92, 43, 'отъезд', 1),
(93, 43, 'скорость передвижения', 1),
(94, 44, 'приятель', 1),
(95, 45, 'друг', 1),
(96, 46, 'оговорка', 1);

-- --------------------------------------------------------

--
-- Структура таблиці `tbl_user`
--

CREATE TABLE IF NOT EXISTS `tbl_user` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `email`, `password`) VALUES
(1, 'mol@ukr.net', 'qwerty');

-- --------------------------------------------------------

--
-- Структура таблиці `tbl_word`
--

CREATE TABLE IF NOT EXISTS `tbl_word` (
  `id` int(11) NOT NULL,
  `word` varchar(80) NOT NULL,
  `ts` bigint(20) NOT NULL,
  `id_set` int(11) NOT NULL,
  `status_wt` int(11) NOT NULL,
  `status_tw` int(11) NOT NULL,
  `status_speech` int(11) NOT NULL,
  `status_spell` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `tbl_word`
--

INSERT INTO `tbl_word` (`id`, `word`, `ts`, `id_set`, `status_wt`, `status_tw`, `status_speech`, `status_spell`) VALUES
(30, 'buy', 1433968999, 1, 1, 0, 0, 0),
(32, 'cat', 1433971305, 2, 1, 0, 0, 0),
(33, 'do', 1434028160, 1, 1, 0, 0, 0),
(37, 'hello', 1434032782, 1, 0, 0, 0, 0),
(38, 'had better', 1434036041, 1, 1, 0, 0, 0),
(40, 'spell', 1434369723, 1, 0, 0, 0, 0),
(41, 'establish', 1434370557, 1, 1, 0, 0, 0),
(42, 'go', 1434445349, 1, 0, 0, 0, 0),
(43, 'going', 1434445528, 1, 0, 0, 0, 0),
(44, 'buddy', 1434445537, 1, 0, 0, 0, 0),
(45, 'friend', 1434445547, 1, 1, 0, 0, 0),
(46, 'clause', 1434445559, 1, 1, 0, 0, 0);

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `tbl_set`
--
ALTER TABLE `tbl_set`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`);

--
-- Індекси таблиці `tbl_translate`
--
ALTER TABLE `tbl_translate`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `tbl_word`
--
ALTER TABLE `tbl_word`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `tbl_set`
--
ALTER TABLE `tbl_set`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблиці `tbl_translate`
--
ALTER TABLE `tbl_translate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=97;
--
-- AUTO_INCREMENT для таблиці `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблиці `tbl_word`
--
ALTER TABLE `tbl_word`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=47;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
