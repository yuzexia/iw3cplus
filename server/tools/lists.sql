/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3306
 Source Schema         : cAuth

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 22/01/2019 15:59:16
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for lists
-- ----------------------------
DROP TABLE IF EXISTS `lists`;
CREATE TABLE `lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `titleurl` varchar(255) DEFAULT NULL,
  `summary` varchar(1000) NOT NULL,
  `basic` varchar(100) DEFAULT NULL,
  `tags` varchar(100) DEFAULT NULL,
  `time` date DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `release_date` datetime DEFAULT NULL,
  `views` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1695 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;