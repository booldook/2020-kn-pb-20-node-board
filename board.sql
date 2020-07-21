-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.20 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- board 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `board` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `board`;

-- 테이블 board.gbook 구조 내보내기
CREATE TABLE IF NOT EXISTS `gbook` (
  `id` int NOT NULL AUTO_INCREMENT,
  `writer` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테이블 데이터 board.gbook:~40 rows (대략적) 내보내기
/*!40000 ALTER TABLE `gbook` DISABLE KEYS */;
REPLACE INTO `gbook` (`id`, `writer`, `comment`, `createdAt`) VALUES
	(1, 'booldook', '첫 등록', '2020-07-20 10:45:00'),
	(2, 'booldook', '두번째 등록', '2020-07-20 10:46:28'),
	(3, '불뚝', '세번째 등록', '2020-07-20 11:13:37'),
	(4, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(5, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(6, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(7, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(8, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(9, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(10, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(11, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(12, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(13, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(14, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(15, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(16, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(17, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(114, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(115, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(116, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(117, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(118, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(119, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(120, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(121, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(122, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(123, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(124, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(125, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(126, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(127, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(128, 'sadfasdf', 'sadfasdfasdf', '2020-07-20 16:14:03'),
	(129, '12342134', '123412341234', '2020-07-20 16:14:11'),
	(130, 'xzfsadf', '231421341', '2020-07-20 16:14:16'),
	(131, '12341234', '1234123412341234', '2020-07-20 16:14:23'),
	(132, 'sdfsdaf', 'asdfsadfasdf', '2020-07-20 16:14:29'),
	(133, '또 불뚝', '네번째 등록', '2020-07-20 11:13:49'),
	(134, 'sdfsdf', 'sdfsdfsdf', '2020-07-21 10:56:40'),
	(135, 'sdf', 'sdf', '2020-07-21 10:58:54'),
	(136, 'sdf', 'sdf', '2020-07-21 10:59:10');
/*!40000 ALTER TABLE `gbook` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
