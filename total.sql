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


-- board 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `board` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `board`;

-- 테이블 board.gallery 구조 내보내기
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

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 board.gbook 구조 내보내기
CREATE TABLE IF NOT EXISTS `gbook` (
  `id` int NOT NULL AUTO_INCREMENT,
  `writer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=179 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 board.loginlog 구조 내보내기
CREATE TABLE IF NOT EXISTS `loginlog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `loginAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_loginlog_member` (`uid`),
  CONSTRAINT `FK_loginlog_member` FOREIGN KEY (`uid`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 board.member 구조 내보내기
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

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 board.sessions 구조 내보내기
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.


-- crud 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `crud` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `crud`;

-- 테이블 crud.review 구조 내보내기
CREATE TABLE IF NOT EXISTS `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` tinyint unsigned DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='21.node-review CRUD 연습';

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
