-- MariaDB dump 10.17  Distrib 10.4.14-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: crm
-- ------------------------------------------------------
-- Server version	10.4.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `Id_Admin` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  PRIMARY KEY (`Id_Admin`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (0,'admin','$2y$10$9vKKkq6oddysBA.rmwtNQenzqyg95wIxoNYo7DoEYUqlGEPIlwn9a');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backlink`
--

DROP TABLE IF EXISTS `backlink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `backlink` (
  `Id_BackLink` int(100) NOT NULL AUTO_INCREMENT,
  `Name_BackLink` varchar(100) DEFAULT NULL,
  `Url_BackLink` varchar(100) DEFAULT NULL,
  `Type_BackLink` varchar(100) DEFAULT NULL,
  `Risk_Level` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id_BackLink`),
  UNIQUE KEY `Name_BackLink` (`Name_BackLink`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backlink`
--

LOCK TABLES `backlink` WRITE;
/*!40000 ALTER TABLE `backlink` DISABLE KEYS */;
INSERT INTO `backlink` VALUES (1,'mapquest','https://mapquest.com/','Maps & Local',NULL),(2,'askmap','http://www.askmap.net/','Maps & Local',NULL),(3,'place123','http://www.place123.net/','Maps & Local',NULL),(4,'uebermaps','https://uebermaps.com/','Maps & Local',NULL),(5,'citybyapp','https://www.citybyapp.com/','Maps & Local',NULL),(6,'iglobal','https://www.iglobal.co/','Maps & Local',NULL),(7,'freead1','https://freead1.net/','Classified Ads',NULL),(8,'expatriates','https://www.expatriates.com/','Classified Ads',NULL),(9,'qwikad','https://qwikad.com/','Classified Ads',NULL),(10,'adlandpro','http://www.adlandpro.com/','Classified Ads',NULL),(11,'adsyellowpages','http://www.adsyellowpages.com/','Classified Ads',NULL),(12,'classifieds.justlanded','https://classifieds.justlanded.com/en/','Classified Ads',NULL),(13,'pinterest','https://www.pinterest.com/','Images',NULL),(14,'flickr','https://www.flickr.com','Images',NULL),(15,'create.piktochart','https://create.piktochart.com/','Images',NULL),(16,'500px','https://500px.com/','Images',NULL),(17,'trover','https://www.trover.com/','Images',NULL),(18,'pbase','https://pbase.com/','Images',NULL),(19,'photopeach','https://photopeach.com/','Images',NULL),(20,'mobypicture','http://www.mobypicture.com/','Images',NULL),(21,'23hq','http://www.23hq.com/','Images',NULL),(22,'pexels','https://www.pexels.com/','Profiles',NULL),(23,'ted','https://www.ted.com','Profiles',NULL),(24,'mixcloud','https://www.mixcloud.com/','Profiles',NULL),(25,'dealspotr','https://dealspotr.com/','Profiles',NULL),(26,'coolors','https://coolors.co/','Profiles',NULL),(27,'bonanza','https://www.bonanza.com/','Profiles',NULL),(28,'hubpages','https://hubpages.com/','Profiles',NULL),(29,'about','https://about.me/','Profiles',NULL),(30,'visual','https://visual.ly/','Profiles',NULL),(31,'snupps','https://www.snupps.com/','Profiles',NULL),(32,'pearltrees','https://www.pearltrees.com/','Social Bookmarking',NULL),(33,'scoop','https://www.scoop.it/','Social Bookmarking',NULL),(34,'list','https://list.ly/','Social Bookmarking',NULL),(35,'podbean','https://podbean.com/','Social Bookmarking',NULL),(36,'diigo','https://www.diigo.com/','Social Bookmarking',NULL),(37,'instapaper','https://www.instapaper.com/','Social Bookmarking',NULL),(38,'4mark','http://www.4mark.net/','Social Bookmarking',NULL),(39,'reddit','https://old.reddit.com/','Social Bookmarking',NULL),(40,'video-bookmark','http://www.video-bookmark.com','Social Bookmarking',NULL),(41,'socialbookmarkssite','http://www.socialbookmarkssite.com/','Social Bookmarking',NULL),(42,'write','https://www.write.as','Premium Blogging',NULL),(43,'livejournal','https://www.livejournal.com','Premium Blogging',NULL),(44,'medium','https://www.medium.com','Premium Blogging',NULL),(45,'edublogs','https://www.edublogs.com','Premium Blogging',NULL),(46,'decor2day','https://decor2day.com/redirect.php','Google Links',NULL),(47,'sites.google','https://www.sites.google.com','Google Links',NULL);
/*!40000 ALTER TABLE `backlink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competitor`
--

DROP TABLE IF EXISTS `competitor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `competitor` (
  `Id_Competitor` int(100) NOT NULL AUTO_INCREMENT,
  `Company_Name` varchar(28) NOT NULL,
  `Company_Url` varchar(28) DEFAULT NULL,
  `Id_User` int(100) DEFAULT NULL,
  PRIMARY KEY (`Id_Competitor`),
  KEY `Id_User` (`Id_User`),
  CONSTRAINT `competitor_ibfk_1` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competitor`
--

LOCK TABLES `competitor` WRITE;
/*!40000 ALTER TABLE `competitor` DISABLE KEYS */;
/*!40000 ALTER TABLE `competitor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `important_elements`
--

DROP TABLE IF EXISTS `important_elements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `important_elements` (
  `Id_Important_Element` int(100) NOT NULL AUTO_INCREMENT,
  `Date_Update` datetime DEFAULT NULL,
  `Framework` varchar(100) DEFAULT NULL,
  `Domain_Age` varchar(100) DEFAULT NULL,
  `Servers` varchar(100) DEFAULT NULL,
  `CDN` varchar(100) DEFAULT NULL,
  `Hierarchy` varchar(100) DEFAULT NULL,
  `Click_Depth` double DEFAULT NULL,
  `Internal_Link` double DEFAULT NULL,
  `Number_Page` double DEFAULT NULL,
  `Page_Load_Speed` double DEFAULT NULL,
  `Avg_Word_Per_Page` double DEFAULT NULL,
  `Avg_Internal_Link` double DEFAULT NULL,
  `Avg_HTag` double DEFAULT NULL,
  `Domain_Authority` double DEFAULT NULL,
  `Avg_External_Link` double DEFAULT NULL,
  `Number_Referring_Domains` double DEFAULT NULL,
  `Number_Ip` double DEFAULT NULL,
  `Number_Backlinks` double DEFAULT NULL,
  `Publishing_Rate` double DEFAULT NULL,
  `Id_Competitor` int(100) DEFAULT NULL,
  `Id_User` int(100) DEFAULT NULL,
  PRIMARY KEY (`Id_Important_Element`),
  KEY `Id_Competitor` (`Id_Competitor`),
  KEY `Id_User` (`Id_User`),
  CONSTRAINT `important_elements_ibfk_1` FOREIGN KEY (`Id_Competitor`) REFERENCES `competitor` (`Id_Competitor`),
  CONSTRAINT `important_elements_ibfk_2` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `important_elements`
--

LOCK TABLES `important_elements` WRITE;
/*!40000 ALTER TABLE `important_elements` DISABLE KEYS */;
/*!40000 ALTER TABLE `important_elements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keyword`
--

DROP TABLE IF EXISTS `keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keyword` (
  `Id_Keyword` int(100) NOT NULL AUTO_INCREMENT,
  `Name_Keyword` varchar(100) DEFAULT NULL,
  `Source_Data` varchar(100) DEFAULT NULL,
  `Id_User` int(100) DEFAULT NULL,
  PRIMARY KEY (`Id_Keyword`),
  UNIQUE KEY `Name_Keyword` (`Name_Keyword`),
  KEY `Id_User` (`Id_User`),
  CONSTRAINT `keyword_ibfk_1` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keyword`
--

LOCK TABLES `keyword` WRITE;
/*!40000 ALTER TABLE `keyword` DISABLE KEYS */;
/*!40000 ALTER TABLE `keyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keyword_task`
--

DROP TABLE IF EXISTS `keyword_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keyword_task` (
  `Id_KewordTask` int(100) NOT NULL AUTO_INCREMENT,
  `Name_Task` varchar(100) DEFAULT NULL,
  `Checked` tinyint(1) DEFAULT NULL,
  `Date_Ajoute` date NOT NULL,
  `Date_Expiration` date NOT NULL,
  `Id_Keyword` int(100) DEFAULT NULL,
  PRIMARY KEY (`Id_KewordTask`),
  KEY `Id_Keyword` (`Id_Keyword`),
  CONSTRAINT `keyword_task_ibfk_1` FOREIGN KEY (`Id_Keyword`) REFERENCES `keyword` (`Id_Keyword`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keyword_task`
--

LOCK TABLES `keyword_task` WRITE;
/*!40000 ALTER TABLE `keyword_task` DISABLE KEYS */;
/*!40000 ALTER TABLE `keyword_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keyword_update`
--

DROP TABLE IF EXISTS `keyword_update`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keyword_update` (
  `Id_Update` int(100) NOT NULL AUTO_INCREMENT,
  `Date_Update` datetime DEFAULT NULL,
  `Number_Search` int(100) DEFAULT NULL,
  `Google_Position` int(100) DEFAULT NULL,
  `Bing_Position` int(100) DEFAULT NULL,
  `Impression` int(100) DEFAULT NULL,
  `Clicks` int(100) DEFAULT NULL,
  `Id_Keyword` int(100) DEFAULT NULL,
  PRIMARY KEY (`Id_Update`),
  KEY `Id_Keyword` (`Id_Keyword`),
  CONSTRAINT `keyword_update_ibfk_1` FOREIGN KEY (`Id_Keyword`) REFERENCES `keyword` (`Id_Keyword`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keyword_update`
--

LOCK TABLES `keyword_update` WRITE;
/*!40000 ALTER TABLE `keyword_update` DISABLE KEYS */;
/*!40000 ALTER TABLE `keyword_update` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `traitement`
--

DROP TABLE IF EXISTS `traitement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `traitement` (
  `Id_Traitement` int(100) NOT NULL AUTO_INCREMENT,
  `Id_Keyword` int(100) DEFAULT NULL,
  `Id_BackLink` int(100) DEFAULT NULL,
  `Date_Traitement` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Traitement`),
  KEY `Id_Keyword` (`Id_Keyword`),
  KEY `Id_BackLink` (`Id_BackLink`),
  CONSTRAINT `traitement_ibfk_1` FOREIGN KEY (`Id_Keyword`) REFERENCES `keyword` (`Id_Keyword`),
  CONSTRAINT `traitement_ibfk_2` FOREIGN KEY (`Id_BackLink`) REFERENCES `backlink` (`Id_BackLink`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `traitement`
--

LOCK TABLES `traitement` WRITE;
/*!40000 ALTER TABLE `traitement` DISABLE KEYS */;
/*!40000 ALTER TABLE `traitement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `Id_User` int(100) NOT NULL AUTO_INCREMENT,
  `Full_Name` varchar(121) NOT NULL,
  `Company_Name` varchar(121) DEFAULT NULL,
  `Company_Url` varchar(121) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Email` varchar(80) NOT NULL,
  PRIMARY KEY (`Id_User`),
  UNIQUE KEY `Full_Name` (`Full_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `website_task`
--

DROP TABLE IF EXISTS `website_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `website_task` (
  `Id_Task` int(100) NOT NULL AUTO_INCREMENT,
  `Name_Task` varchar(100) DEFAULT NULL,
  `Type_Task` varchar(100) DEFAULT NULL,
  `Checked` tinyint(1) DEFAULT NULL,
  `Date_Ajoute` date NOT NULL,
  `Date_Expiration` date NOT NULL,
  `Id_User` int(100) DEFAULT NULL,
  PRIMARY KEY (`Id_Task`),
  KEY `Id_User` (`Id_User`),
  CONSTRAINT `website_task_ibfk_1` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `website_task`
--

LOCK TABLES `website_task` WRITE;
/*!40000 ALTER TABLE `website_task` DISABLE KEYS */;
/*!40000 ALTER TABLE `website_task` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-10 18:23:09
