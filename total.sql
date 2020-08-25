-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.20 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.0.0.6061
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 테이블 board.gallery 구조 내보내기
DROP TABLE IF EXISTS `gallery`;
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '고유값',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '제목',
  `content` text COLLATE utf8mb4_unicode_ci COMMENT '내용',
  `writer` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '작성자',
  `realfile` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '원래 파일명',
  `savefile` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '저장된 파일명',
  `realfile2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '원래 파일명',
  `savefile2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '저장된 파일명',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
  `readCount` int unsigned NOT NULL DEFAULT '0' COMMENT '조회수',
  `uid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_gallery_member` (`uid`),
  CONSTRAINT `FK_gallery_member` FOREIGN KEY (`uid`) REFERENCES `member` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테이블 데이터 board.gallery:~3 rows (대략적) 내보내기
DELETE FROM `gallery`;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` (`id`, `title`, `content`, `writer`, `realfile`, `savefile`, `realfile2`, `savefile2`, `createdAt`, `readCount`, `uid`) VALUES
	(42, '제목', '글 테스트', '임덕규', 'sun (1).png', '200812-e999ec87-723b-45db-bc47-c11f409d89aa.png', 'p22-3-768x768 (1).jpg', '200812-434d5727-9b7f-4c62-927c-313520c8535a.jpg', '2020-08-12 12:05:34', 0, 11),
	(43, '홍길동전', '', 'a', 'p22-3-768x768 (1).jpg', '200812-2e4289ee-2c21-44d0-880c-a4aa97217051.jpg', NULL, NULL, '2020-08-12 13:00:20', 0, 9),
	(44, '홍길동전', '2222', '임덕규', 'p22-3-768x768 (1).jpg', '200812-2bd2de4e-8f56-41d5-a634-c62965828eb5.jpg', 'hero-5-705x338 (1).jpg', '200812-e0ef403f-6d8a-44dd-8acb-ebcb2d18b4f9.jpg', '2020-08-12 13:12:11', 0, 9);
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;

-- 테이블 board.gbook 구조 내보내기
DROP TABLE IF EXISTS `gbook`;
CREATE TABLE IF NOT EXISTS `gbook` (
  `id` int NOT NULL AUTO_INCREMENT,
  `writer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=179 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테이블 데이터 board.gbook:~1 rows (대략적) 내보내기
DELETE FROM `gbook`;
/*!40000 ALTER TABLE `gbook` DISABLE KEYS */;
INSERT INTO `gbook` (`id`, `writer`, `comment`, `createdAt`) VALUES
	(178, '임덕규', '테스트', '2020-08-17 10:14:04');
/*!40000 ALTER TABLE `gbook` ENABLE KEYS */;

-- 테이블 board.loginlog 구조 내보내기
DROP TABLE IF EXISTS `loginlog`;
CREATE TABLE IF NOT EXISTS `loginlog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `loginAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_loginlog_member` (`uid`),
  CONSTRAINT `FK_loginlog_member` FOREIGN KEY (`uid`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테이블 데이터 board.loginlog:~11 rows (대략적) 내보내기
DELETE FROM `loginlog`;
/*!40000 ALTER TABLE `loginlog` DISABLE KEYS */;
INSERT INTO `loginlog` (`id`, `uid`, `loginAt`, `ip`) VALUES
	(1, 9, '2020-08-12 10:02:33', '::ffff:127.0.0.1'),
	(2, 9, '2020-08-12 10:21:04', '::ffff:127.0.0.1'),
	(3, 9, '2020-08-12 10:42:25', '::ffff:127.0.0.1'),
	(4, 9, '2020-08-12 10:46:51', '::ffff:127.0.0.1'),
	(5, 9, '2020-08-12 11:13:18', '::ffff:127.0.0.1'),
	(6, 9, '2020-08-12 11:59:50', '::ffff:127.0.0.1'),
	(7, 9, '2020-08-12 12:11:40', '::ffff:127.0.0.1'),
	(8, 9, '2020-08-12 12:14:31', '::ffff:127.0.0.1'),
	(9, 9, '2020-08-12 12:57:11', '::ffff:127.0.0.1'),
	(10, 9, '2020-08-12 12:59:54', '::ffff:127.0.0.1'),
	(11, 9, '2020-08-13 09:28:08', '::ffff:127.0.0.1');
/*!40000 ALTER TABLE `loginlog` ENABLE KEYS */;

-- 테이블 board.member 구조 내보내기
DROP TABLE IF EXISTS `member`;
CREATE TABLE IF NOT EXISTS `member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `api` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userpw` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sleepAt` datetime DEFAULT NULL,
  `grade` tinyint unsigned NOT NULL DEFAULT '2',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userid` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테이블 데이터 board.member:~5 rows (대략적) 내보내기
DELETE FROM `member`;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` (`id`, `userid`, `api`, `userpw`, `username`, `email`, `createdAt`, `sleepAt`, `grade`) VALUES
	(9, 'booldook', NULL, '$2b$07$KOT3naDadizyk9AK70KoDeIGFCehBn80FqgnrszHLqFt2chG45BZm', '임덕규', 'booldook@gmail.com', '2020-08-12 09:43:33', NULL, 9),
	(10, 'wayin', NULL, '$2b$07$gm7L8b7PkwL/E6A2G98C1eKCGlzUA0r3tMLO09sg8M2epJLrf.vuC', '원아영', '', '2020-08-12 09:57:28', NULL, 2),
	(11, 'booldook2', NULL, '$2b$07$sTfolWOn7f5c2Y8O.17vAO5nnOOljEsZhXP0HC4hHM08O14rqHNuq', '불뚝', 'booldook@gmail.com', '2020-08-12 09:57:31', NULL, 2),
	(12, 'Gotae', NULL, '$2b$07$WhmzrSFGDWHysBk.8w8Jc.gs2loK6QhmGzoRX5qgyicrcfWv6lRCi', '고태윤', '', '2020-08-12 09:57:31', NULL, 2),
	(13, 'lbke', NULL, '$2b$07$f04Ox5Ka2orZX1z00GjDyue1ATnsMNGLAAWUCEXd.Tpcv2ln7koBS', '이보경', 'lbke@naver.com', '2020-08-12 09:57:39', NULL, 2),
	(14, '1449042905', 'kakao', NULL, '임덕규', 'booldook@kakao.com', '2020-08-13 13:19:02', NULL, 2);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
