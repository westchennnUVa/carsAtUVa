-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: agriculturesys
-- ------------------------------------------------------
-- Server version	5.7.13-log

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
-- Table structure for table `stalllist`
--

DROP TABLE IF EXISTS `stalllist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stalllist` (
  `stallid` int(11) NOT NULL AUTO_INCREMENT,
  `stallcode` varchar(45) NOT NULL,
  `stallisused` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `examination` int(5) DEFAULT NULL,
  PRIMARY KEY (`stallid`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stalllist`
--

LOCK TABLES `stalllist` WRITE;
/*!40000 ALTER TABLE `stalllist` DISABLE KEYS */;
INSERT INTO `stalllist` VALUES (1,'东区一号',1,29,1),(2,'东区二号',0,0,1),(3,'东区三号',1,36,1),(4,'东区四号',0,0,1),(5,'东区五号',0,0,1),(6,'东区六号',0,0,1),(7,'东区七号',0,0,1),(8,'东区八号',0,0,1),(9,'东区九号',0,0,1),(10,'东区十号',0,0,1),(11,'西区十号',0,0,1),(12,'西区九号',0,0,1),(13,'西区八号',0,0,1),(14,'西区七号',0,0,1),(15,'西区六号',0,0,1),(16,'西区五号',0,0,1),(17,'西区四号',0,0,1),(18,'西区三号',0,0,1),(19,'西区二号',0,0,1),(20,'西区一号',0,0,1),(21,'南区一号',0,0,1),(22,'南区二号',0,0,1),(23,'南区三号',0,0,1),(24,'南区四号',0,0,1),(25,'南区五号',0,0,1),(26,'南区六号',0,0,1),(27,'南区七号',0,0,1),(28,'南区八号',0,0,1),(29,'南区九号',0,0,1),(30,'南区十号',0,0,1);
/*!40000 ALTER TABLE `stalllist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-04 23:55:48
