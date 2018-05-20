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
-- Table structure for table `productlist`
--

DROP TABLE IF EXISTS `productlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productlist` (
  `productid` int(11) NOT NULL AUTO_INCREMENT,
  `productname` varchar(45) DEFAULT NULL,
  `productprice` float DEFAULT NULL,
  `productmeasurement` varchar(45) DEFAULT NULL,
  `productnumber` int(11) DEFAULT NULL,
  `productdescription` mediumtext,
  `productimage` varchar(50) DEFAULT NULL,
  `userid` int(11) NOT NULL,
  `producttype` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`productid`),
  UNIQUE KEY `productid_UNIQUE` (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productlist`
--

LOCK TABLES `productlist` WRITE;
/*!40000 ALTER TABLE `productlist` DISABLE KEYS */;
INSERT INTO `productlist` VALUES (38,'鸡咪',90,'个',1,'这是一个鸡咪这是一个鸡咪这是一个鸡咪这是一个鸡咪这是一个鸡咪这是一个鸡咪这是一个鸡咪这是一个鸡咪这是一个鸡咪这是一个鸡咪这是一个鸡咪这是一个鸡咪这是一个鸡咪','1_鸡咪.png',29,'Fruit'),(39,'鸡锦',111,'个',1,'这是一个鸡锦这是一个鸡锦这是一个鸡锦这是一个鸡锦这是一个鸡锦这是一个鸡锦这是一个鸡锦这是一个鸡锦这是一个鸡锦这是一个鸡锦这是一个鸡锦这是一个鸡锦','1_鸡锦.jpg',29,'Vegetable'),(40,'鸡盛',1111,'个',1,'这是一个鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛鸡盛','1_鸡盛.com_3843d101e2PWZUHGD33896146ade',29,'Meat'),(43,'鸡蛋',1,'个',1,'这是鸡蛋这是鸡蛋这是鸡蛋这是鸡蛋这是鸡蛋这是鸡蛋这是鸡蛋这是鸡蛋这是鸡蛋这是鸡蛋这是鸡蛋这是鸡蛋','3_鸡蛋.jpeg',36,'Meat');
/*!40000 ALTER TABLE `productlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Scarwen`@`%`*/ /*!50003 trigger afterdeleteproduct after delete
on productlist for each row
begin
declare _productid int;
set _productid = old.productid;
delete from stallproductlist where productid = _productid;
end */;;
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

-- Dump completed on 2017-01-04 23:55:49
