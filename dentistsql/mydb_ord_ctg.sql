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
-- Table structure for table `ord_ctg`
--

DROP TABLE IF EXISTS `ord_ctg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ord_ctg` (
  `ord_ctgid` int NOT NULL AUTO_INCREMENT,
  `orderid` int NOT NULL,
  `categoryid` int NOT NULL,
  `amount` int DEFAULT NULL,
  PRIMARY KEY (`ord_ctgid`),
  KEY `orderid-fk_idx` (`orderid`),
  KEY `category-id-fk_idx` (`categoryid`),
  CONSTRAINT `category-id-fk` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`),
  CONSTRAINT `order-id-fk` FOREIGN KEY (`orderid`) REFERENCES `orders` (`idorder`)
) ENGINE=InnoDB AUTO_INCREMENT=217 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ord_ctg`
--

LOCK TABLES `ord_ctg` WRITE;
/*!40000 ALTER TABLE `ord_ctg` DISABLE KEYS */;
INSERT INTO `ord_ctg` VALUES (4,11,1,2),(5,11,2,5),(6,11,3,7),(7,12,1,2),(8,12,2,5),(9,12,3,7),(10,13,1,2),(11,13,2,5),(12,13,3,7),(13,14,1,2),(14,14,2,5),(15,14,3,7),(16,15,1,2),(17,15,2,5),(18,15,3,7),(19,16,1,2),(20,16,2,5),(21,16,3,7),(22,17,1,2),(23,17,2,5),(24,17,3,7),(25,18,1,2),(26,18,2,5),(27,18,3,7),(28,19,1,2),(29,19,2,5),(30,19,3,7),(31,20,1,2),(32,20,2,5),(33,20,3,7),(34,21,1,2),(35,21,2,5),(36,21,3,7),(37,22,1,2),(38,22,2,5),(39,22,3,7),(40,23,1,2),(41,23,2,5),(42,23,3,7),(43,24,1,2),(44,24,2,5),(45,24,3,7),(46,25,1,2),(47,25,2,5),(48,25,3,7),(49,26,1,2),(50,26,2,5),(51,26,3,7),(52,27,1,2),(53,27,2,5),(54,27,3,7),(55,28,1,2),(56,28,2,5),(57,28,3,7),(58,29,1,2),(59,29,2,5),(60,29,3,7),(61,30,1,2),(62,30,2,5),(63,30,3,7),(64,31,1,2),(65,31,2,5),(66,31,3,7),(67,32,1,2),(68,32,2,5),(69,32,3,7),(70,33,1,2),(71,33,2,5),(72,33,3,7),(73,34,1,2),(74,34,2,5),(75,34,3,7),(76,35,1,2),(77,35,2,5),(78,35,3,7),(79,36,1,2),(80,36,2,5),(81,36,3,7),(82,37,1,2),(83,37,2,5),(84,37,3,7),(85,38,1,2),(86,38,2,5),(87,38,3,7),(88,39,1,2),(89,39,2,5),(90,39,3,7),(91,40,1,2),(92,40,2,5),(93,40,3,7),(94,41,1,2),(95,41,2,5),(96,41,3,7),(97,42,1,2),(98,42,2,5),(99,42,3,7),(100,43,1,2),(101,43,2,5),(102,43,3,7),(103,44,1,2),(104,44,2,5),(105,44,3,7),(106,45,1,2),(107,45,2,5),(108,45,3,7),(109,46,1,2),(110,46,2,5),(111,46,3,7),(112,47,1,2),(113,47,2,5),(114,47,3,7),(115,48,1,2),(116,48,2,5),(117,48,3,7),(118,49,1,2),(119,49,2,5),(120,49,3,7),(121,50,1,2),(122,50,2,5),(123,50,3,7),(124,51,1,2),(125,51,2,5),(126,51,3,7),(127,52,1,2),(128,52,2,5),(129,52,3,7),(130,53,1,2),(131,53,2,5),(132,53,3,7),(133,54,1,2),(134,54,2,5),(135,54,3,7),(136,55,1,2),(137,55,2,5),(138,55,3,7),(139,56,1,2),(140,56,2,5),(141,56,3,7),(142,57,1,2),(143,57,2,5),(144,57,3,7),(145,58,1,2),(146,58,2,5),(147,58,3,7),(148,58,4,7),(149,59,1,2),(150,59,2,5),(151,59,3,7),(152,59,4,7),(153,60,1,2),(154,60,2,5),(155,60,3,6),(156,60,4,7),(157,61,1,2),(158,61,2,5),(159,61,3,6),(160,61,4,7),(161,62,1,2),(162,62,2,5),(163,62,3,6),(164,62,4,7),(165,63,1,2),(166,63,2,5),(167,63,3,6),(168,63,4,7),(169,64,1,2),(170,64,2,5),(171,64,3,6),(172,64,4,7),(173,65,1,2),(174,65,2,5),(175,65,3,6),(176,65,4,9),(177,66,1,2),(178,66,2,5),(179,66,3,6),(180,66,4,9),(181,66,1,2),(182,66,2,5),(183,66,3,6),(184,66,4,9),(185,66,1,2),(186,66,2,5),(187,66,3,6),(188,66,4,9),(189,67,1,2),(190,67,2,5),(191,67,3,6),(192,67,4,9),(193,69,1,2),(194,69,2,5),(195,69,3,6),(196,69,4,9),(197,70,1,9),(198,70,1,5),(199,70,1,9),(200,70,2,5),(201,72,1,9),(202,72,2,5),(203,73,1,9),(204,73,3,2),(205,74,1,9),(206,74,3,2),(207,75,1,9),(208,75,3,2),(209,76,1,9),(210,76,3,2),(211,77,3,9),(212,77,4,2),(213,78,3,9),(214,78,4,2),(215,79,3,9),(216,79,4,2);
/*!40000 ALTER TABLE `ord_ctg` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-07 19:21:20
