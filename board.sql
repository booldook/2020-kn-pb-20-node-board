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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 board.gbook 구조 내보내기
CREATE TABLE IF NOT EXISTS `gbook` (
  `id` int NOT NULL AUTO_INCREMENT,
  `writer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
