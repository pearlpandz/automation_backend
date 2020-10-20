-- MariaDB dump 10.17  Distrib 10.4.11-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: iot
-- ------------------------------------------------------
-- Server version	10.4.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `devices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `activeurl` varchar(100) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `isDeleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (1,'Air Conditioner','http://192.168.0.103:8000/uploads/devices/air-conditioner.png','http://192.168.0.103:8000/uploads/devices/air-conditioner-active.png','ac','2020-09-17 19:55:29',1,0),(2,'Fluorescent Lamp','http://192.168.0.103:8000/uploads/devices/fluorescent.png','http://192.168.0.103:8000/uploads/devices/fluorescent-active.png','lamp','2020-09-17 19:56:16',1,0),(3,'IR Hub','http://192.168.0.103:8000/uploads/devices/hub.png','http://192.168.0.103:8000/uploads/devices/hub-active.png','hub','2020-09-17 19:56:33',1,0),(4,'Fan','http://192.168.0.103:8000/uploads/devices/fan.png','http://192.168.0.103:8000/uploads/devices/fan-active.png','fan','2020-09-17 19:56:46',1,0),(5,'Light Bulb','http://192.168.0.103:8000/uploads/devices/bulb.png','http://192.168.0.103:8000/uploads/devices/bulb-active.png','bulb','2020-09-17 19:57:08',1,0),(6,'Plug','http://192.168.0.103:8000/uploads/devices/plug.png','http://192.168.0.103:8000/uploads/devices/plug-active.png','plug','2020-09-17 19:57:23',1,0),(7,'USB Cable','http://192.168.0.103:8000/uploads/devices/usb.png','http://192.168.0.103:8000/uploads/devices/usb-active.png','usb','2020-09-17 19:57:43',1,0);
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `boxId` varchar(45) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'Bed Room 1','BED01',1,'2020-09-18 08:21:54',1,0),(2,'Bed Room 2','BED02',1,'2020-09-18 08:22:08',1,0),(3,'2nd Floor','floor02',5,'2020-09-18 10:02:32',1,0),(4,'2nd Floor','floor02',1,'2020-09-18 13:50:23',0,1),(5,'2nd Floor','floor02',1,'2020-09-18 13:52:45',0,1),(6,'2nd Floor','floor02',1,'2020-09-18 13:54:12',0,1),(7,'2nd Floor','floor02',1,'2020-09-21 14:19:46',0,1),(8,'2nd Floor','floor02',1,'2020-09-21 14:21:38',0,1),(9,'2nd Floor','floor02',1,'2020-09-21 14:23:20',0,1),(10,'2nd Floor','floor02',1,'2020-09-21 14:25:04',0,1),(11,'2nd Floor','floor02',1,'2020-09-21 14:28:15',0,1),(12,'2nd Floor','floor02',1,'2020-09-21 14:29:30',0,1),(13,'Last Floor','LaFl001',1,'2020-09-21 14:30:39',0,1),(14,'Kitchen Box','KIT01',1,'2020-09-21 16:35:02',1,0),(15,'Bath Room','BATH01',1,'2020-09-22 09:38:29',1,0),(16,'Kitchen Room','TEST001',1,'2020-09-23 14:39:51',0,1),(17,'Bed Room','BED01',8,'2020-09-23 14:49:55',1,0),(18,'Kitchen Dups','KIT01',1,'2020-09-23 16:38:37',0,1);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms_devices`
--

DROP TABLE IF EXISTS `rooms_devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rooms_devices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `surname` varchar(45) DEFAULT NULL,
  `speed` double NOT NULL DEFAULT 0,
  `baseDeviceId` int(11) DEFAULT NULL,
  `roomId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `isDeleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `baseDeviceId` (`baseDeviceId`),
  KEY `roomId` (`roomId`),
  CONSTRAINT `rooms_devices_ibfk_1` FOREIGN KEY (`baseDeviceId`) REFERENCES `devices` (`id`),
  CONSTRAINT `rooms_devices_ibfk_2` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms_devices`
--

LOCK TABLES `rooms_devices` WRITE;
/*!40000 ALTER TABLE `rooms_devices` DISABLE KEYS */;
INSERT INTO `rooms_devices` VALUES (1,'My Fan',3,4,1,'2020-09-18 09:23:56',1,1),(2,'Gundu Bulb',0,5,1,'2020-09-18 09:23:56',1,1),(3,'right side bulb',0,5,1,'2020-09-18 09:34:11',0,0),(4,'usha fan',5,4,3,'2020-09-18 10:07:32',1,0),(5,'fan',0,4,3,'2020-09-18 14:18:57',0,0),(9,'AC',0,1,2,'2020-09-18 14:29:43',0,0),(14,'hub',1,7,2,'0000-00-00 00:00:00',1,1),(15,'tube light',1,2,2,'0000-00-00 00:00:00',1,1),(16,'hub',1,7,2,'0000-00-00 00:00:00',1,1),(17,'tube light',0,2,2,'0000-00-00 00:00:00',0,1),(18,'hub',1,7,2,'0000-00-00 00:00:00',1,1),(19,'tube light',1,2,2,'0000-00-00 00:00:00',0,0),(20,'hub',1,7,2,'0000-00-00 00:00:00',1,1),(21,'tube light',1,2,2,'0000-00-00 00:00:00',1,1),(22,'Charger',0,7,2,'2020-09-22 12:25:36',0,0),(23,'Charger USB Port',0,7,15,'2020-09-22 14:48:24',0,0),(24,'Patti Light',0,2,15,'2020-09-22 14:50:54',0,0),(25,'2nd AC',0,1,2,'2020-09-22 14:51:33',1,1),(26,'Optional Fan 1',2,4,2,'2020-09-22 14:51:49',0,0),(27,'Optional Fan 2',0,4,2,'2020-09-22 14:52:12',1,1),(28,'Tube Light',0,2,14,'2020-09-22 15:00:21',0,0),(29,'New 40W Bulb',0,5,2,'2020-09-23 14:40:33',1,0),(30,'AC ',0,1,17,'2020-09-23 14:52:07',1,0),(31,'hub',0,7,2,'2020-09-23 16:54:08',1,0),(32,'tube light',0,2,2,'2020-09-23 16:54:08',1,0),(36,'hub',0,7,2,'2020-09-23 16:57:18',1,0);
/*!40000 ALTER TABLE `rooms_devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scheduler`
--

DROP TABLE IF EXISTS `scheduler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scheduler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `userId` int(11) NOT NULL,
  `deviceIds` varchar(45) NOT NULL,
  `starttime` time NOT NULL,
  `endtime` time NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `isDeleted` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scheduler`
--

LOCK TABLES `scheduler` WRITE;
/*!40000 ALTER TABLE `scheduler` DISABLE KEYS */;
INSERT INTO `scheduler` VALUES (1,'Work From Home',1,'23,24','10:00:00','20:00:00',1,'2020-09-29 12:34:02',0),(2,'Bed Room',1,'25,26','22:00:00','07:00:00',1,'2020-09-29 12:36:24',0),(3,'Kitchen',1,'21','10:00:00','11:30:00',1,'2020-10-19 15:43:38',0),(4,'motta madi',1,'14,15','18:30:00','19:45:00',1,'2020-10-19 16:07:38',0);
/*!40000 ALTER TABLE `scheduler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `mobile` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `lastLogin` datetime DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile` (`mobile`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Muthupandi V','7502022870','12345678','pearlpandzz@gmail.com','user','2020-09-17 19:53:32','2020-09-18 13:00:45',1,0),(4,'Muthupandi V','7502022871','12345678','pearlpandz@gmail.com','user','2020-09-17 19:53:57','2020-09-17 19:53:57',0,1),(5,'guna','8220176290','12345678','gunabharathi9782@gmail.com','user','2020-09-18 08:34:09','2020-09-18 08:34:09',1,0),(6,'Viji','9876543210','12345678','vijima@gmail.com','superadmin','2020-09-18 08:57:04','2020-09-18 08:57:04',0,1),(7,'Lemurian','9514786320','12345678','lemurian@gmail.com','user','2020-09-18 13:34:06','2020-09-18 13:34:06',1,0),(8,'Guna Bharathi','96325874100','12345678','guna@gmail.com','user','2020-09-23 14:48:26','2020-09-23 14:48:26',1,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'iot'
--

--
-- Dumping routines for database 'iot'
--
/*!50003 DROP PROCEDURE IF EXISTS `devices_activelist` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `devices_activelist`()
BEGIN
	SELECT * FROM iot.devices where status=1 and isDeleted=0 order by name ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `device_createupdate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root@localhost`@`%` PROCEDURE `device_createupdate`(
	name VARCHAR(45), 
    url VARCHAR(45), 
	type VARCHAR(45) 
)
BEGIN
	insert into iot.devices values(0, name, url, type, (select now()),1,0);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `device_delete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `device_delete`(deviceid INT(11))
BEGIN
	update iot.devices set status=0, isDeleted=1 where id=deviceid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `rooms_activelist` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `rooms_activelist`(dUserId int)
BEGIN
	SELECT id,name,boxId FROM iot.rooms where userId = dUserId and status=1 and isDeleted=0 order by name ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `room_create` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `room_create`(
	name VARCHAR(45), 
    boxId VARCHAR(45), 
	userId VARCHAR(45) 
)
BEGIN
	insert into iot.rooms values(0, name, boxId, userId, (select now()),1,0);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `room_delete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `room_delete`(roomid INT(11), ruserId INT(11))
BEGIN
	update iot.rooms set status=0, isDeleted=1 where id=roomid and userId = ruserId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `room_devices_list` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `room_devices_list`(dRoomId int)
BEGIN
    SELECT d.id, d.surname, d.speed,d.status, bd.name, bd.url, bd.activeurl, bd.type, bd.id as refId
	FROM iot.rooms_devices AS d, iot.devices AS bd
	WHERE d.roomId = dRoomId and d.baseDeviceId=bd.id and d.isDeleted = false
	order by d.surname ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `room_devices_list_by_userId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `room_devices_list_by_userId`(duserId int)
BEGIN
    select r.name, d.surname, d.id as deviceId, d.roomId as dRoomId, r.id as RoomId 
	from iot.rooms as r, iot.rooms_devices as d
	where r.userId = duserId and d.roomId = r.id and d.isDeleted = 0 and r.isDeleted = 0
	order by name asc; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `room_device_create` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `room_device_create`(
	dSurname VARCHAR(45), 
    dSpeed double, 
	dBaseDeviceId int,
    dRoomId int
)
BEGIN
    insert into iot.rooms_devices values(0, dSurname, dSpeed, dBaseDeviceId, dRoomId, (select now()), 1, 0);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `room_device_delete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `room_device_delete`(dId int)
BEGIN
	update iot.rooms_devices set isDeleted = 1 where id = dId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `room_device_statusUpdate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `room_device_statusUpdate`(dstatus boolean, dspeed int, did int)
BEGIN
	update iot.rooms_devices set status = dstatus, speed = dspeed where id=did;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `room_device_update` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `room_device_update`(
	dId int,
    dSurname VARCHAR(45), 
	dBaseDeviceId int    
)
BEGIN
	update iot.rooms_devices set surname = dSurname, baseDeviceId = dBaseDeviceId where id = dId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `room_update` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `room_update`(
	rid INT,
    rname VARCHAR(45), 
    rboxId VARCHAR(45),
    ruserid INT
)
BEGIN
	update iot.rooms 
    set name = CASE WHEN name IS NOT NULL THEN rname ELSE name END,
    boxId = CASE WHEN boxId IS NOT NULL THEN rboxId ELSE boxId END
    where id=rid and userId = ruserid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `scheduler_create` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `scheduler_create`(
 Sname varchar(45),
 SuserId int,
 SdeviceIds varchar(45),
 Sstarttime time, 
 Sendtime time
 )
BEGIN
	insert into iot.scheduler values(0,Sname,SuserId,SdeviceIds,Sstarttime, Sendtime,1,(select now()),0);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `scheduler_create_room_devices_list` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `scheduler_create_room_devices_list`()
BEGIN
	SELECT rd.id as deviceId, rd.surname as deviceName, r.id as roomId, r.name as roomName
	FROM iot.rooms_devices as rd,  iot.rooms as r
	where rd.roomId = r.id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `scheduler_list` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `scheduler_list`(SuserId int)
BEGIN
	select sch.id, sch.name, sch.starttime, sch.endtime, sch.status
	from iot.scheduler as sch  
	where sch.userId = SuserId and sch.isDeleted = 0;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `scheduler_single_info` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `scheduler_single_info`(SuserId int, Sid int)
BEGIN
	select sch.id as schedulerId, sch.name as schedulerName, sch.starttime, sch.endtime, sch.status, rd.id as deviceId, rd.surname as deviceName, r.id as roomId, r.name as roomName
	from iot.rooms_devices as rd, iot.rooms as r, iot.scheduler as sch  
	where FIND_IN_SET(rd.id, sch.deviceIds) and r.id = rd.roomId and sch.userId = SuserId and sch.id = Sid and sch.isDeleted = 0;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `users_activelist` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `users_activelist`()
BEGIN
	SELECT id,name,mobile,email FROM iot.users where status=1 and isDeleted=0 order by name ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `user_createupdate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `user_createupdate`(
	uid INT,
	uName VARCHAR(45), 
	uMobile DOUBLE, 
	uPassword VARCHAR(45), 
	uEmail VARCHAR(45), 
	uRole VARCHAR(45)
)
BEGIN
	IF uid=0
		THEN 
			insert into iot.users values(uid, uName, uMobile, uPassword, uEmail, uRole, (select now()), (select now()),1,0);
	ELSE
		update iot.users set name = uName, mobile = uMobile, password = (select password from iot.users where id=uid), email = uEmail, role = (select role from iot.users where id=uid) where id=uid;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `user_delete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `user_delete`(userid INT(11))
BEGIN
	update iot.users set status=0, isDeleted=1 where id=userid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `user_single` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `user_single`(useremail varchar(45), userpassword varchar(45))
BEGIN
	SELECT id,name,role,status,isDeleted FROM iot.users WHERE email = useremail and password = userpassword and status = 1 and isDeleted = 0;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-20 10:56:38
