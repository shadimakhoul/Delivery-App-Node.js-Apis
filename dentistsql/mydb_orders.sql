-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `idorder` int NOT NULL AUTO_INCREMENT,
  `customerId` int NOT NULL,
  `newLocation` varchar(45) DEFAULT 'NO',
  `status` int DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`idorder`),
  KEY `cust-id-fk_idx` (`customerId`),
  CONSTRAINT `cust-id-fk` FOREIGN KEY (`customerId`) REFERENCES `accounts` (`idaccount`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (11,5,'insurbance',0,'2021-12-04 15:24:55'),(12,5,'insurbance',0,'2021-12-04 15:31:05'),(13,5,'insurbance',0,'2021-12-04 15:32:01'),(14,5,'insurbance',0,'2021-12-04 15:32:46'),(15,5,'insurbance',0,'2021-12-04 15:32:50'),(16,5,'insurbance',0,'2021-12-04 15:34:35'),(17,5,'insurbance',0,'2021-12-04 15:40:11'),(18,5,'insurbance',0,'2021-12-04 15:41:20'),(19,5,'insurbance',0,'2021-12-04 15:42:36'),(20,5,'insurbance',0,'2021-12-04 15:49:23'),(21,5,'insurbance',0,'2021-12-04 15:53:05'),(22,5,'insurbance',0,'2021-12-04 15:54:07'),(23,5,'insurbance',0,'2021-12-04 15:55:35'),(24,5,'insurbance',0,'2021-12-04 15:56:20'),(25,5,'insurbance',0,'2021-12-04 15:56:32'),(26,5,'insurbance',0,'2021-12-04 16:07:23'),(27,5,'insurbance',0,'2021-12-04 16:08:14'),(28,5,'insurbance',0,'2021-12-04 16:12:09'),(29,5,'insurbance',0,'2021-12-04 16:12:22'),(30,5,'insurbance',0,'2021-12-04 16:12:53'),(31,5,'insurbance',0,'2021-12-04 16:13:15'),(32,5,'insurbance',0,'2021-12-04 16:13:55'),(33,5,'insurbance',0,'2021-12-04 16:14:48'),(34,5,'insurbance',0,'2021-12-04 16:15:12'),(35,5,'insurbance',0,'2021-12-04 16:16:07'),(36,5,'insurbance',0,'2021-12-04 16:16:21'),(37,5,'insurbance',0,'2021-12-04 16:16:57'),(38,5,'insurbance',0,'2021-12-04 16:17:45'),(39,5,'insurbance',0,'2021-12-04 16:18:28'),(40,5,'insurbance',0,'2021-12-04 16:18:32'),(41,5,'insurbance',0,'2021-12-04 16:18:47'),(42,5,'insurbance',0,'2021-12-04 17:19:31'),(43,5,'insurbance',0,'2021-12-04 17:19:46'),(44,5,'insurbance',0,'2021-12-04 17:21:12'),(45,5,'insurbance',0,'2021-12-04 17:23:51'),(46,5,'insurbance',0,'2021-12-04 17:24:23'),(47,5,'insurbance',0,'2021-12-04 17:25:07'),(48,5,'insurbance',0,'2021-12-04 17:25:22'),(49,5,'insurbance',0,'2021-12-04 17:26:57'),(50,5,'insurbance',0,'2021-12-04 17:40:16'),(51,5,'insurbance',0,'2021-12-04 17:41:33'),(52,5,'insurbance',0,'2021-12-04 17:41:55'),(53,5,'insurbance',0,'2021-12-04 18:06:37'),(54,5,'insurbance',0,'2021-12-04 18:07:00'),(55,5,'insurbance',0,'2021-12-04 18:37:06'),(56,5,'insurbance',0,'2021-12-04 18:46:34'),(57,5,'insurbance',0,'2021-12-04 20:56:43'),(58,5,'insurbance',0,'2021-12-04 21:12:22'),(59,5,'insurbance',0,'2021-12-04 21:13:09'),(60,5,'insurbance',0,'2021-12-04 21:14:08'),(61,5,'insurbance',0,'2021-12-04 21:53:52'),(62,5,'insurbance',0,'2021-12-04 21:54:02'),(63,5,'insurbance',0,'2021-12-04 21:54:05'),(64,5,'insurbance',0,'2021-12-04 21:54:21'),(65,5,'insurbance',0,'2021-12-04 21:54:30'),(66,5,'insurbance',0,'2021-12-04 21:55:00'),(67,5,'insurbance',0,'2021-12-04 21:56:33'),(68,5,'insurbance',0,'2021-12-10 12:34:26'),(69,5,'insurbance',0,'2021-12-10 12:34:55'),(70,9,'insurbance',0,'2021-12-17 13:37:55'),(72,16,'insurbance',0,'2021-12-17 13:39:39'),(73,16,'insurbance',0,'2021-12-18 12:23:01'),(74,16,'insurbance',0,'2021-12-18 16:08:30'),(75,16,'insurbance',0,'2021-12-18 16:08:41'),(76,17,'insurbance',0,'2021-12-18 16:10:04'),(77,17,'insurbance',0,'2021-12-18 16:10:52'),(78,17,'insurbance',0,'2021-12-18 16:57:23'),(79,17,'insurbance',0,'2021-12-18 17:22:32');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-07 19:21:21
