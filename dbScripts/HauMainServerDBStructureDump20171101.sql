CREATE DATABASE  IF NOT EXISTS `haudb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `haudb`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: haudb
-- ------------------------------------------------------
-- Server version	5.7.19-log

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
-- Table structure for table `hau_acs`
--

DROP TABLE IF EXISTS `hau_acs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_acs` (
  `AC_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `AC_APPL_ID` bigint(20) DEFAULT NULL,
  `AC_BORD_ID` bigint(20) DEFAULT NULL,
  `AC_ISON` tinyint(4) DEFAULT NULL,
  `AC_PIN` int(11) DEFAULT NULL,
  `AC_TEMPERATURE` int(11) DEFAULT NULL,
  `AC_ISDELETED` tinyint(4) DEFAULT NULL,
  `AC_CREATEDBY` bigint(20) DEFAULT NULL,
  `AC_CREATEDDATE` datetime DEFAULT NULL,
  `AC_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `AC_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`AC_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_acsextraswitches`
--

DROP TABLE IF EXISTS `hau_acsextraswitches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_acsextraswitches` (
  `ACE_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ACE_AC_ID` bigint(20) DEFAULT NULL,
  `ACE_NAME` varchar(200) DEFAULT NULL,
  `ACE_VALUE` int(11) DEFAULT NULL,
  `ACE_ISDELETED` tinyint(4) DEFAULT NULL,
  `ACE_CREATEDBY` bigint(20) DEFAULT NULL,
  `ACE_CREATEDDATE` datetime DEFAULT NULL,
  `ACE_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `ACE_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`ACE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_acsextraswitcheshistory`
--

DROP TABLE IF EXISTS `hau_acsextraswitcheshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_acsextraswitcheshistory` (
  `ACEH_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ACEH_ACE_ID` bigint(20) DEFAULT NULL,
  `ACEH_AC_ID` bigint(20) DEFAULT NULL,
  `ACEH_NAME` varchar(200) DEFAULT NULL,
  `ACEH_VALUE` int(11) DEFAULT NULL,
  `ACEH_ISDELETED` tinyint(4) DEFAULT NULL,
  `ACEH_CREATEDBY` bigint(20) DEFAULT NULL,
  `ACEH_CREATEDDATE` datetime DEFAULT NULL,
  `ACEH_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `ACEH_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`ACEH_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_acshistory`
--

DROP TABLE IF EXISTS `hau_acshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_acshistory` (
  `ACH_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ACH_AC_ID` bigint(20) DEFAULT NULL,
  `ACH_APPL_ID` bigint(20) DEFAULT NULL,
  `ACH_BORD_ID` bigint(20) DEFAULT NULL,
  `ACH_ISON` tinyint(4) DEFAULT NULL,
  `ACH_PIN` int(11) DEFAULT NULL,
  `ACH_TEMPERATURE` int(11) DEFAULT NULL,
  `ACH_ISDELETED` tinyint(4) DEFAULT NULL,
  `ACH_CREATEDBY` bigint(20) DEFAULT NULL,
  `ACH_CREATEDDATE` datetime DEFAULT NULL,
  `ACH_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `ACH_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`ACH_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_acswitches`
--

DROP TABLE IF EXISTS `hau_acswitches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_acswitches` (
  `ACSW_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ACSW_AC_ID` bigint(20) DEFAULT NULL,
  `ACSW_SWIT_ID` tinyint(4) DEFAULT NULL,
  `ACSW_PRIO_ID` bigint(20) DEFAULT NULL,
  `ACSW_ISACTIVE` tinyint(4) DEFAULT NULL,
  `ACSW_ISDELETED` tinyint(4) DEFAULT NULL,
  `ACSW_CREATEDBY` bigint(20) DEFAULT NULL,
  `ACSW_CREATEDDATE` datetime DEFAULT NULL,
  `ACSW_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `ACSW_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`ACSW_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_adminparams`
--

DROP TABLE IF EXISTS `hau_adminparams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_adminparams` (
  `ADM_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ADM_ENTT_ID` bigint(20) DEFAULT NULL,
  `ADM_USERTOKENLOGINTIME` bigint(20) DEFAULT NULL,
  `ADM_ISDELETED` tinyint(4) DEFAULT '0',
  `ADM_CREATEDBY` bigint(20) DEFAULT NULL,
  `ADM_CREATEDDATE` datetime DEFAULT NULL,
  `ADM_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `ADM_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`ADM_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_appliances`
--

DROP TABLE IF EXISTS `hau_appliances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_appliances` (
  `APPL_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `APPL_TYPE` bigint(20) DEFAULT NULL,
  `APPL_BORD_ID` bigint(20) DEFAULT NULL,
  `APPL_CREATEDBY` bigint(20) DEFAULT NULL,
  `APPL_CREATEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`APPL_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_appliancestype`
--

DROP TABLE IF EXISTS `hau_appliancestype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_appliancestype` (
  `APTY_ID` int(11) NOT NULL,
  `APTY_NAME` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`APTY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_boards`
--

DROP TABLE IF EXISTS `hau_boards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_boards` (
  `BORD_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `BORD_NAME` varchar(200) DEFAULT NULL,
  `BORD_ROOM_ID` bigint(20) DEFAULT NULL,
  `BORD_ISPRIMARY` tinyint(4) DEFAULT NULL,
  `BORD_ISACTIVE` tinyint(4) DEFAULT NULL,
  `BORD_ISDELETED` tinyint(4) DEFAULT NULL,
  `BORD_CREATEDBY` bigint(20) DEFAULT NULL,
  `BORD_CREATEDDATE` datetime DEFAULT NULL,
  `BORD_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `BORD_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`BORD_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_entities`
--

DROP TABLE IF EXISTS `hau_entities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_entities` (
  `ENTT_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ENTT_NAME` varchar(100) DEFAULT NULL,
  `ENTT_IDENTITY` varchar(250) DEFAULT NULL,
  `ENTT_ENTY_ID` bigint(20) DEFAULT NULL,
  `ENTT_ENTT_ID` bigint(20) DEFAULT NULL,
  `ENTT_ADDRESS` varchar(1000) DEFAULT NULL,
  `ENTT_CONTACTPERSON` varchar(250) DEFAULT NULL,
  `ENTT_SUPPORTEMAIL` varchar(100) DEFAULT NULL,
  `ENTT_SALESEMAIL` varchar(100) DEFAULT NULL,
  `ENTT_CONTACTNUMBER1` varchar(50) DEFAULT NULL,
  `ENTT_CONTACTNUMBER2` varchar(50) DEFAULT NULL,
  `ENTT_CONTACTNUMBER3` varchar(50) DEFAULT NULL,
  `ENTT_FAX` varchar(50) DEFAULT NULL,
  `ENTT_ISACTIVE` tinyint(4) DEFAULT NULL,
  `ENTT_ISDELETED` tinyint(4) DEFAULT NULL,
  `ENTT_CREATEDBY` bigint(20) DEFAULT NULL,
  `ENTT_CREATEDDATE` datetime DEFAULT NULL,
  `ENTT_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `ENTT_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`ENTT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_entitytype`
--

DROP TABLE IF EXISTS `hau_entitytype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_entitytype` (
  `ENTY_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ENTY_NAME` varchar(100) DEFAULT NULL,
  `ENTY_DESCRIPTION` varchar(250) DEFAULT NULL,
  `ENTY_ISDELETED` tinyint(4) DEFAULT NULL,
  `ENTY_CREATEDBY` bigint(20) DEFAULT NULL,
  `ENTY_CREATEDDATE` datetime DEFAULT NULL,
  `ENTY_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `ENTY_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`ENTY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_errorlog`
--

DROP TABLE IF EXISTS `hau_errorlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_errorlog` (
  `ERRL_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ERRL_HOST` varchar(1000) DEFAULT NULL,
  `ERRL_TYPE` varchar(1000) DEFAULT NULL,
  `ERRL_BROWSERINFO` varchar(100) DEFAULT NULL,
  `ERRL_SOURCE` varchar(1000) DEFAULT NULL,
  `ERRL_MESSAGE` varchar(1000) DEFAULT NULL,
  `ERRL_USER_ID` bigint(20) DEFAULT NULL,
  `ERRL_STATUSCODE` varchar(100) DEFAULT NULL,
  `ERRL_DATEUTC` datetime DEFAULT NULL,
  `ERRL_ALLXML` varchar(8000) DEFAULT NULL,
  PRIMARY KEY (`ERRL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_fans`
--

DROP TABLE IF EXISTS `hau_fans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_fans` (
  `FAN_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `FAN_APPL_ID` bigint(20) DEFAULT NULL,
  `FAN_BORD_ID` bigint(20) DEFAULT NULL,
  `FAN_ISON` tinyint(4) DEFAULT NULL,
  `FAN_DIMMERVALUE` int(11) DEFAULT NULL,
  `FAN_PIN` int(11) DEFAULT NULL,
  `FAN_ISACTIVE` tinyint(4) DEFAULT NULL,
  `FAN_ISDELETED` tinyint(4) DEFAULT NULL,
  `FAN_CREATEDBY` bigint(20) DEFAULT NULL,
  `FAN_CREATEDDATE` datetime DEFAULT NULL,
  `FAN_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `FAN_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`FAN_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_fanshistory`
--

DROP TABLE IF EXISTS `hau_fanshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_fanshistory` (
  `FANH_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `FANH_FAN_ID` bigint(20) DEFAULT NULL,
  `FANH_APPL_ID` bigint(20) DEFAULT NULL,
  `FANH_BORD_ID` bigint(20) DEFAULT NULL,
  `FANH_ISON` tinyint(4) DEFAULT NULL,
  `FANH_DIMMERVALUE` int(11) DEFAULT NULL,
  `FANH_PIN` int(11) DEFAULT NULL,
  `FANH_ISACTIVE` tinyint(4) DEFAULT NULL,
  `FANH_ISDELETED` tinyint(4) DEFAULT NULL,
  `FANH_CREATEDBY` bigint(20) DEFAULT NULL,
  `FANH_CREATEDDATE` datetime DEFAULT NULL,
  `FANH_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `FANH_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`FANH_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_fanswitches`
--

DROP TABLE IF EXISTS `hau_fanswitches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_fanswitches` (
  `FSWT_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `FSWT_FAN_ID` bigint(20) DEFAULT NULL,
  `FSWT_SWIT_ID` tinyint(4) DEFAULT NULL,
  `FSWT_PRIO_ID` bigint(20) DEFAULT NULL,
  `FSWT_ISACTIVE` tinyint(4) DEFAULT NULL,
  `FSWT_ISDELETED` tinyint(4) DEFAULT NULL,
  `FSWT_CREATEDBY` bigint(20) DEFAULT NULL,
  `FSWT_CREATEDDATE` datetime DEFAULT NULL,
  `FSWT_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `FSWT_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`FSWT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_fanswitcheshistory`
--

DROP TABLE IF EXISTS `hau_fanswitcheshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_fanswitcheshistory` (
  `FSWTH_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `FSWTH_FSWT_ID` bigint(20) DEFAULT NULL,
  `FSWTH_FAN_ID` bigint(20) DEFAULT NULL,
  `FSWTH_SWIT_ID` tinyint(4) DEFAULT NULL,
  `FSWTH_PRIO_ID` bigint(20) DEFAULT NULL,
  `FSWTH_ISACTIVE` tinyint(4) DEFAULT NULL,
  `FSWTH_ISDELETED` tinyint(4) DEFAULT NULL,
  `FSWTH_CREATEDBY` bigint(20) DEFAULT NULL,
  `FSWTH_CREATEDDATE` datetime DEFAULT NULL,
  `FSWTH_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `FSWTH_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`FSWTH_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_lights`
--

DROP TABLE IF EXISTS `hau_lights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_lights` (
  `LIGH_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `LIGH_APPL_ID` bigint(20) DEFAULT NULL,
  `LIGH_BORD_ID` bigint(20) DEFAULT NULL,
  `LIGH_ISON` tinyint(4) DEFAULT NULL,
  `LIGH_DIMMERVALUE` int(11) DEFAULT NULL,
  `LIGH_PIN` int(11) DEFAULT NULL,
  `LIGH_ISACTIVE` tinyint(4) DEFAULT NULL,
  `LIGH_ISDELETED` tinyint(4) DEFAULT NULL,
  `LIGH_CREATEDBY` bigint(20) DEFAULT NULL,
  `LIGH_CREATEDDATE` datetime DEFAULT NULL,
  `LIGH_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `LIGH_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`LIGH_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_lightshistory`
--

DROP TABLE IF EXISTS `hau_lightshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_lightshistory` (
  `LIGHH_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `LIGHH_LIGH_ID` bigint(20) DEFAULT NULL,
  `LIGHH_APPL_ID` bigint(20) DEFAULT NULL,
  `LIGHH_BORD_ID` bigint(20) DEFAULT NULL,
  `LIGHH_ISON` tinyint(4) DEFAULT NULL,
  `LIGHH_DIMMERVALUE` int(11) DEFAULT NULL,
  `LIGHH_PIN` int(11) DEFAULT NULL,
  `LIGHH_ISACTIVE` tinyint(4) DEFAULT NULL,
  `LIGHH_ISDELETED` tinyint(4) DEFAULT NULL,
  `LIGHH_CREATEDBY` bigint(20) DEFAULT NULL,
  `LIGHH_CREATEDDATE` datetime DEFAULT NULL,
  `LIGHH_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `LIGHH_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`LIGHH_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=66253 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_lightswitches`
--

DROP TABLE IF EXISTS `hau_lightswitches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_lightswitches` (
  `LSWT_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `LSWT_LIGH_ID` bigint(20) DEFAULT NULL,
  `LSWT_SWIT_ID` tinyint(4) DEFAULT NULL,
  `LSWT_PRIO_ID` bigint(20) DEFAULT NULL,
  `LSWT_ISACTIVE` tinyint(4) DEFAULT NULL,
  `LSWT_ISDELETED` tinyint(4) DEFAULT NULL,
  `LSWT_CREATEDBY` bigint(20) DEFAULT NULL,
  `LSWT_CREATEDDATE` datetime DEFAULT NULL,
  `LSWT_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `LSWT_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`LSWT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_lightswitcheshistory`
--

DROP TABLE IF EXISTS `hau_lightswitcheshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_lightswitcheshistory` (
  `TSWTH_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `TSWTH_LSWT_ID` bigint(20) DEFAULT NULL,
  `TSWTH_LIGH_ID` bigint(20) DEFAULT NULL,
  `TSWTH_SWIT_ID` tinyint(4) DEFAULT NULL,
  `TSWTH_PRIO_ID` bigint(20) DEFAULT NULL,
  `TSWTH_ISACTIVE` tinyint(4) DEFAULT NULL,
  `TSWTH_ISDELETED` tinyint(4) DEFAULT NULL,
  `TSWTH_CREATEDBY` bigint(20) DEFAULT NULL,
  `TSWTH_CREATEDDATE` datetime DEFAULT NULL,
  `TSWTH_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `TSWTH_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`TSWTH_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_logindata`
--

DROP TABLE IF EXISTS `hau_logindata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_logindata` (
  `LOG_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `LOG_USER_ID` bigint(20) DEFAULT NULL,
  `LOG_INTIME` int(11) DEFAULT NULL,
  `LOG_TOK_ID` bigint(20) DEFAULT NULL,
  `LOG_ISLOGEDOUT` tinyint(4) DEFAULT NULL,
  `LOG_ISDELETED` tinyint(4) DEFAULT NULL,
  `LOG_CREATEDBY` bigint(20) DEFAULT NULL,
  `LOG_CREATEDDATE` datetime DEFAULT NULL,
  `LOG_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `LOG_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`LOG_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=317 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_pagesorperameter`
--

DROP TABLE IF EXISTS `hau_pagesorperameter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_pagesorperameter` (
  `PAGE_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `PAGE_NAME` varchar(100) DEFAULT NULL,
  `PAGE_DESC` varchar(500) DEFAULT NULL,
  `PAGE_OPT1TEXT` varchar(100) DEFAULT NULL,
  `PAGE_OPT2TEXT` varchar(100) DEFAULT NULL,
  `PAGE_OPT3TEXT` varchar(100) DEFAULT NULL,
  `PAGE_OPT4TEXT` varchar(100) DEFAULT NULL,
  `PAGE_OPT5TEXT` varchar(100) DEFAULT NULL,
  `PAGE_OPT6TEXT` varchar(100) DEFAULT NULL,
  `PAGE_ISPAGE` tinyint(4) DEFAULT NULL,
  `PAGE_ISDISPINPAGEACC` tinyint(4) DEFAULT NULL,
  `PAGE_ISDELETED` tinyint(4) DEFAULT NULL,
  `PAGE_CREATEDBY` bigint(20) DEFAULT NULL,
  `PAGE_CREATEDDATE` datetime DEFAULT NULL,
  `PAGE_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `PAGE_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`PAGE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_pagewiseroleaccess`
--

DROP TABLE IF EXISTS `hau_pagewiseroleaccess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_pagewiseroleaccess` (
  `PACC_ID` bigint(20) DEFAULT NULL,
  `PACC_PAGE_ID` bigint(20) DEFAULT NULL,
  `PACC_ROLE_ID` bigint(20) DEFAULT NULL,
  `PACC_OPT1VALUE` varchar(200) DEFAULT NULL,
  `PACC_OPT2VALUE` varchar(200) DEFAULT NULL,
  `PACC_OPT3VALUE` varchar(200) DEFAULT NULL,
  `PACC_OPT4VALUE` varchar(200) DEFAULT NULL,
  `PACC_OPT5VALUE` varchar(200) DEFAULT NULL,
  `PACC_OPT6VALUE` varchar(200) DEFAULT NULL,
  `PACC_ISACTIVE` tinyint(4) DEFAULT NULL,
  `PACC_ISDELETED` tinyint(4) DEFAULT NULL,
  `PACC_CREATEDBY` bigint(20) DEFAULT NULL,
  `PACC_CREATEDDATE` datetime DEFAULT NULL,
  `PACC_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `PACC_MODIFIEDDATE` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_priority`
--

DROP TABLE IF EXISTS `hau_priority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_priority` (
  `PRIO_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `PRIO_NAME` varchar(200) DEFAULT NULL,
  `PRIO_DESCRIPTION` bigint(20) DEFAULT NULL,
  `PRIO_SEQUENCE` int(11) DEFAULT NULL,
  `PRIO_PIN` int(11) DEFAULT NULL,
  `PRIO_ISDELETED` tinyint(4) DEFAULT NULL,
  `PRIO_CREATEDBY` bigint(20) DEFAULT NULL,
  `PRIO_CREATEDDATE` datetime DEFAULT NULL,
  `PRIO_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `PRIO_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`PRIO_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_roles`
--

DROP TABLE IF EXISTS `hau_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_roles` (
  `ROLE_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ROLE_NAME` varchar(50) DEFAULT NULL,
  `ROLE_DESC` varchar(200) DEFAULT NULL,
  `ROLE_TYPE` tinyint(4) DEFAULT NULL,
  `ROLE_ISDELETED` tinyint(4) DEFAULT NULL,
  `ROLE_CREATEDBY` bigint(20) DEFAULT NULL,
  `ROLE_CREATEDDATE` datetime DEFAULT NULL,
  `ROLE_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `ROLE_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`ROLE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_rooms`
--

DROP TABLE IF EXISTS `hau_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_rooms` (
  `ROOM_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ROOM_NAME` varchar(250) DEFAULT NULL,
  `ROOM_ENTT_ID` bigint(20) DEFAULT NULL,
  `ROOM_ROTY_ID` bigint(20) DEFAULT NULL,
  `ROOM_LEFTSIDEROOM_ID` bigint(20) DEFAULT NULL,
  `ROOM_FRIENTROOM_ID` bigint(20) DEFAULT NULL,
  `ROOM_BACKSIDEROOM_ID` bigint(20) DEFAULT NULL,
  `ROOM_RIGHTSIDEROOM_ID` bigint(20) DEFAULT NULL,
  `ROOM_ISACTIVE` tinyint(4) DEFAULT NULL,
  `ROOM_ISDELETED` tinyint(4) DEFAULT NULL,
  `ROOM_CREATEDBY` bigint(20) DEFAULT NULL,
  `ROOM_CREATEDDATE` datetime DEFAULT NULL,
  `ROOM_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `ROOM_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`ROOM_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_roomtypes`
--

DROP TABLE IF EXISTS `hau_roomtypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_roomtypes` (
  `ROTY_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ROTY_NAME` varchar(200) DEFAULT NULL,
  `ROTY_DESCRIPTION` varchar(1000) DEFAULT NULL,
  `ROTY_IMAGENAME` varchar(200) DEFAULT NULL,
  `ROTY_ISACTIVE` tinyint(4) DEFAULT NULL,
  `ROTY_ISDELETED` tinyint(4) DEFAULT NULL,
  `ROTY_CREATEDBY` bigint(20) DEFAULT NULL,
  `ROTY_CREATEDDATE` datetime DEFAULT NULL,
  `ROTY_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `ROTY_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`ROTY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_scheduling`
--

DROP TABLE IF EXISTS `hau_scheduling`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_scheduling` (
  `TUSH_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `TUSH_ISSENSORBASED` varchar(200) DEFAULT NULL,
  `TUSH_SR_ID` varchar(1000) DEFAULT NULL,
  `TUSH_ISTIMEBASED` tinyint(4) DEFAULT NULL,
  `TUSH_ISFULLDAY` tinyint(4) DEFAULT NULL,
  `TUSH_FROMDATE` datetime DEFAULT NULL,
  `TUSH_TODATE` datetime DEFAULT NULL,
  `TUSH_ISON` tinyint(4) DEFAULT NULL,
  `TUSH_ISSWITCH` tinyint(4) DEFAULT NULL,
  `TUSH_SWIT_ID` bigint(20) DEFAULT NULL,
  `TUSH_ISDEVICEON` tinyint(4) DEFAULT NULL,
  `TUSH_DEV_ID` bigint(20) DEFAULT NULL,
  `TUSH_PRIORITY` bigint(20) DEFAULT '1',
  `TUSH_ISDELETED` tinyint(4) DEFAULT NULL,
  `TUSH_CREATEDBY` bigint(20) DEFAULT NULL,
  `TUSH_CREATEDDATE` datetime DEFAULT NULL,
  `TUSH_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `TUSH_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`TUSH_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_schedulinghistory`
--

DROP TABLE IF EXISTS `hau_schedulinghistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_schedulinghistory` (
  `TUSHH_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `TUSHH_TUSH_ID` bigint(20) DEFAULT NULL,
  `TUSHH_ISSENSORBASED` varchar(200) DEFAULT NULL,
  `TUSHH_SR_ID` varchar(1000) DEFAULT NULL,
  `TUSHH_ISTIMEBASED` tinyint(4) DEFAULT NULL,
  `TUSHH_ISFULLDAY` tinyint(4) DEFAULT NULL,
  `TUSHH_FROMDATE` datetime DEFAULT NULL,
  `TUSHH_TODATE` datetime DEFAULT NULL,
  `TUSHH_FROMTIME` int(11) DEFAULT NULL,
  `TUSHH_TOTIME` int(11) DEFAULT NULL,
  `TUSHH_ISON` tinyint(4) DEFAULT NULL,
  `TUSHH_ISSWITCH` tinyint(4) DEFAULT NULL,
  `TUSHH_SWIT_ID` bigint(20) DEFAULT NULL,
  `TUSHH_ISDEVICEON` tinyint(4) DEFAULT NULL,
  `TUSHH_DEV_ID` bigint(20) DEFAULT NULL,
  `TUSHH_ISDELETED` tinyint(4) DEFAULT NULL,
  `TUSHH_CREATEDBY` bigint(20) DEFAULT NULL,
  `TUSHH_CREATEDDATE` datetime DEFAULT NULL,
  `TUSHH_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `TUSHH_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`TUSHH_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_sensors`
--

DROP TABLE IF EXISTS `hau_sensors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_sensors` (
  `SR_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `SR_NAME` varchar(200) DEFAULT NULL,
  `SR_SRTY_ID` bigint(20) DEFAULT NULL,
  `SR_BORD_ID` bigint(20) DEFAULT NULL,
  `SR_PIN` int(11) DEFAULT NULL,
  `SR_VALUE1` bigint(20) DEFAULT NULL,
  `SR_VALUE2` bigint(20) DEFAULT NULL,
  `SR_ISDELETED` tinyint(4) DEFAULT NULL,
  `SR_CREATEDBY` bigint(20) DEFAULT NULL,
  `SR_CREATEDDATE` datetime DEFAULT NULL,
  `SR_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `SR_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`SR_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_sensorshistory`
--

DROP TABLE IF EXISTS `hau_sensorshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_sensorshistory` (
  `SRH_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `SRH_SR_ID` bigint(20) DEFAULT NULL,
  `SRH_NAME` varchar(200) DEFAULT NULL,
  `SRH_BORD_ID` varchar(1000) DEFAULT NULL,
  `SRH_PIN` int(11) DEFAULT NULL,
  `SRH_VALUE1` bigint(20) DEFAULT NULL,
  `SRH_VALUE2` bigint(20) DEFAULT NULL,
  `SRH_ISDELETED` tinyint(4) DEFAULT NULL,
  `SRH_CREATEDBY` bigint(20) DEFAULT NULL,
  `SRH_CREATEDDATE` datetime DEFAULT NULL,
  `SRH_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `SRH_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`SRH_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_sensortypes`
--

DROP TABLE IF EXISTS `hau_sensortypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_sensortypes` (
  `SRTY_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `SRTY_NAME` varchar(200) DEFAULT NULL,
  `SRTY_DESCRIPTION` varchar(1000) DEFAULT NULL,
  `SRTY_ISDELETED` tinyint(4) DEFAULT NULL,
  `SRTY_CREATEDBY` bigint(20) DEFAULT NULL,
  `SRTY_CREATEDDATE` datetime DEFAULT NULL,
  `SRTY_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `SRTY_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`SRTY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_switchs`
--

DROP TABLE IF EXISTS `hau_switchs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_switchs` (
  `SWIT_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `SWIT_NAME` varchar(200) DEFAULT NULL,
  `SWIT_SWTY_ID` bigint(20) DEFAULT NULL,
  `SWIT_BORD_ID` bigint(20) DEFAULT NULL,
  `SWIT_SEQUENCE` bigint(20) DEFAULT NULL,
  `SWIT_PIN` int(11) DEFAULT NULL,
  `SWIT_ISON` tinyint(4) DEFAULT '0',
  `SWIT_DIMMERVALUE` bigint(20) DEFAULT '100',
  `SWIT_ISACTIVE` tinyint(4) DEFAULT NULL,
  `SWIT_ISDELETED` tinyint(4) DEFAULT NULL,
  `SWIT_CREATEDBY` bigint(20) DEFAULT NULL,
  `SWIT_CREATEDDATE` datetime DEFAULT NULL,
  `SWIT_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `SWIT_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`SWIT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_switchshistory`
--

DROP TABLE IF EXISTS `hau_switchshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_switchshistory` (
  `SWITH_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `SWITH_SWIT_ID` bigint(20) DEFAULT NULL,
  `SWITH_NAME` varchar(200) DEFAULT NULL,
  `SWITH_SWTY_ID` bigint(20) DEFAULT NULL,
  `SWITH_BORD_ID` bigint(20) DEFAULT NULL,
  `SWITH_SEQUENCE` bigint(20) DEFAULT NULL,
  `SWITH_PIN` int(11) DEFAULT NULL,
  `SWITH_ISON` tinyint(4) DEFAULT '0',
  `SWITH_ISACTIVE` tinyint(4) DEFAULT NULL,
  `SWITH_ISDELETED` tinyint(4) DEFAULT NULL,
  `SWITH_CREATEDBY` bigint(20) DEFAULT NULL,
  `SWITH_CREATEDDATE` datetime DEFAULT NULL,
  `SWITH_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `SWITH_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`SWITH_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_switchtypes`
--

DROP TABLE IF EXISTS `hau_switchtypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_switchtypes` (
  `SWTY_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `SWTY_NAME` varchar(200) DEFAULT NULL,
  `SWTY_DESCRIPTION` varchar(1000) DEFAULT NULL,
  `SWTY_ISACTIVE` tinyint(4) DEFAULT NULL,
  `SWTY_ISDELETED` tinyint(4) DEFAULT NULL,
  `SWTY_CREATEDBY` bigint(20) DEFAULT NULL,
  `SWTY_CREATEDDATE` datetime DEFAULT NULL,
  `SWTY_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `SWTY_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`SWTY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_token`
--

DROP TABLE IF EXISTS `hau_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_token` (
  `TOKN_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `TOKN_USER_ID` varchar(1000) DEFAULT NULL,
  `TOKN_AUTHTOKEN` varchar(8000) DEFAULT NULL,
  `TOKN_ISSUEDON` datetime DEFAULT NULL,
  `TOKN_EXPIRESON` datetime DEFAULT NULL,
  `TOKN_CREATEDDATE` datetime DEFAULT NULL,
  `TOKN_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`TOKN_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_tubelights`
--

DROP TABLE IF EXISTS `hau_tubelights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_tubelights` (
  `TUBE_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `TUBE_APPL_ID` bigint(20) DEFAULT NULL,
  `TUBE_BORD_ID` bigint(20) DEFAULT NULL,
  `TUBE_ISON` tinyint(4) DEFAULT NULL,
  `TUBE_PIN` int(11) DEFAULT NULL,
  `TUBE_ISACTIVE` tinyint(4) DEFAULT NULL,
  `TUBE_ISDELETED` tinyint(4) DEFAULT NULL,
  `TUBE_CREATEDBY` bigint(20) DEFAULT NULL,
  `TUBE_CREATEDDATE` datetime DEFAULT NULL,
  `TUBE_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `TUBE_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`TUBE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_tubelightshistory`
--

DROP TABLE IF EXISTS `hau_tubelightshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_tubelightshistory` (
  `TUBEH_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `TUBEH_TUBE_ID` bigint(20) DEFAULT NULL,
  `TUBEH_APPL_ID` bigint(20) DEFAULT NULL,
  `TUBEH_BORD_ID` bigint(20) DEFAULT NULL,
  `TUBEH_ISON` tinyint(4) DEFAULT NULL,
  `TUBEH_PIN` int(11) DEFAULT NULL,
  `TUBEH_ISACTIVE` tinyint(4) DEFAULT NULL,
  `TUBEH_ISDELETED` tinyint(4) DEFAULT NULL,
  `TUBEH_CREATEDBY` bigint(20) DEFAULT NULL,
  `TUBEH_CREATEDDATE` datetime DEFAULT NULL,
  `TUBEH_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `TUBEH_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`TUBEH_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_tubelightswitches`
--

DROP TABLE IF EXISTS `hau_tubelightswitches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_tubelightswitches` (
  `TSWT_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `TSWT_TUBE_ID` bigint(20) DEFAULT NULL,
  `TSWT_SWIT_ID` tinyint(4) DEFAULT NULL,
  `TSWT_PRIO_ID` bigint(20) DEFAULT NULL,
  `TSWT_ISACTIVE` tinyint(4) DEFAULT NULL,
  `TSWT_ISDELETED` tinyint(4) DEFAULT NULL,
  `TSWT_CREATEDBY` bigint(20) DEFAULT NULL,
  `TSWT_CREATEDDATE` datetime DEFAULT NULL,
  `TSWT_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `TSWT_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`TSWT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_tubelightswitcheshistory`
--

DROP TABLE IF EXISTS `hau_tubelightswitcheshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_tubelightswitcheshistory` (
  `TSWTH_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `TSWTH_TSWT_ID` bigint(20) DEFAULT NULL,
  `TSWTH_TUBE_ID` bigint(20) DEFAULT NULL,
  `TSWTH_SWIT_ID` tinyint(4) DEFAULT NULL,
  `TSWTH_PRIO_ID` bigint(20) DEFAULT NULL,
  `TSWTH_ISACTIVE` tinyint(4) DEFAULT NULL,
  `TSWTH_ISDELETED` tinyint(4) DEFAULT NULL,
  `TSWTH_CREATEDBY` bigint(20) DEFAULT NULL,
  `TSWTH_CREATEDDATE` datetime DEFAULT NULL,
  `TSWTH_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `TSWTH_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`TSWTH_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_tvs`
--

DROP TABLE IF EXISTS `hau_tvs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_tvs` (
  `TV_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `TV_APPL_ID` bigint(20) DEFAULT NULL,
  `TV_BORD_ID` bigint(20) DEFAULT NULL,
  `TV_ISON` tinyint(4) DEFAULT NULL,
  `TV_PIN` int(11) DEFAULT NULL,
  `TV_ISDELETED` tinyint(4) DEFAULT NULL,
  `TV_CREATEDBY` bigint(20) DEFAULT NULL,
  `TV_CREATEDDATE` datetime DEFAULT NULL,
  `TV_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `TV_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`TV_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_tvsextraswitches`
--

DROP TABLE IF EXISTS `hau_tvsextraswitches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_tvsextraswitches` (
  `TVE_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `TVE_TV_ID` bigint(20) DEFAULT NULL,
  `TVE_NAME` varchar(200) DEFAULT NULL,
  `TVE_VALUE` int(11) DEFAULT NULL,
  `TVE_ISDELETED` tinyint(4) DEFAULT NULL,
  `TVE_CREATEDBY` bigint(20) DEFAULT NULL,
  `TVE_CREATEDDATE` datetime DEFAULT NULL,
  `TVE_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `TVE_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`TVE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_tvsextraswitcheshistory`
--

DROP TABLE IF EXISTS `hau_tvsextraswitcheshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_tvsextraswitcheshistory` (
  `TVEH_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `TVEH_TV_ID` bigint(20) DEFAULT NULL,
  `TVEH_NAME` varchar(200) DEFAULT NULL,
  `TVEH_VALUE` int(11) DEFAULT NULL,
  `TVEH_ISDELETED` tinyint(4) DEFAULT NULL,
  `TVEH_CREATEDBY` bigint(20) DEFAULT NULL,
  `TVEH_CREATEDDATE` datetime DEFAULT NULL,
  `TVEH_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `TVEH_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`TVEH_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_tvshistory`
--

DROP TABLE IF EXISTS `hau_tvshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_tvshistory` (
  `TVH_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `TVH_TV_ID` bigint(20) DEFAULT NULL,
  `TVH_APPL_ID` bigint(20) DEFAULT NULL,
  `TVH_BORD_ID` bigint(20) DEFAULT NULL,
  `TVH_ISON` tinyint(4) DEFAULT NULL,
  `TVH_PIN` int(11) DEFAULT NULL,
  `TVH_TEMPERATURE` int(11) DEFAULT NULL,
  `TVH_ISDELETED` tinyint(4) DEFAULT NULL,
  `TVH_CREATEDBY` bigint(20) DEFAULT NULL,
  `TVH_CREATEDDATE` datetime DEFAULT NULL,
  `TVH_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `TVH_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`TVH_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_tvswitches`
--

DROP TABLE IF EXISTS `hau_tvswitches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_tvswitches` (
  `TVSW_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `TVSW_TV_ID` bigint(20) DEFAULT NULL,
  `TVSW_SWIT_ID` tinyint(4) DEFAULT NULL,
  `TVSW_PRIO_ID` bigint(20) DEFAULT NULL,
  `TVSW_ISACTIVE` tinyint(4) DEFAULT NULL,
  `TVSW_ISDELETED` tinyint(4) DEFAULT NULL,
  `TVSW_CREATEDBY` bigint(20) DEFAULT NULL,
  `TVSW_CREATEDDATE` datetime DEFAULT NULL,
  `TVSW_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `TVSW_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`TVSW_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_userroles`
--

DROP TABLE IF EXISTS `hau_userroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_userroles` (
  `USRE_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `USRE_ENTT_ID` bigint(20) DEFAULT NULL,
  `USRE_USER_ID` bigint(20) DEFAULT NULL,
  `USRE_ROLE_ID` bigint(20) DEFAULT NULL,
  `USRE_ISACTIVE` tinyint(4) DEFAULT NULL,
  `USRE_ISDELETED` tinyint(4) DEFAULT NULL,
  `USRE_CREATEDBY` bigint(20) DEFAULT NULL,
  `USRE_CREATEDDATE` datetime DEFAULT NULL,
  `USRE_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `USRE_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`USRE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_users`
--

DROP TABLE IF EXISTS `hau_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_users` (
  `USER_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `USER_USERNAME` varchar(50) DEFAULT NULL,
  `USER_DISPLAYNAME` varchar(100) DEFAULT NULL,
  `USER_DESIGNATION` varchar(100) DEFAULT NULL,
  `USER_PASSWORD` varchar(100) DEFAULT NULL,
  `USER_NFCCODE` varchar(100) DEFAULT NULL,
  `USER_BARCODE` varchar(100) DEFAULT NULL,
  `USER_USER_ID` bigint(20) DEFAULT NULL,
  `USER_EMAIL` varchar(50) DEFAULT NULL,
  `USER_ENTT_ID` bigint(20) DEFAULT NULL,
  `USER_LANGUAGE` varchar(200) DEFAULT NULL,
  `USER_ISALLOWCOMPCHANGE` tinyint(4) DEFAULT NULL,
  `USER_PHOTOFILENAME` varchar(1000) DEFAULT NULL,
  `USER_MOBILE` varchar(50) DEFAULT NULL,
  `USER_ADDRESS` varchar(250) DEFAULT NULL,
  `USER_USERTYPE` varchar(100) DEFAULT NULL,
  `USER_ROLE_ID` bigint(20) DEFAULT NULL,
  `USER_ISACTIVE` tinyint(4) DEFAULT NULL,
  `USER_ISDELETED` tinyint(4) DEFAULT NULL,
  `USER_CREATEDBY` bigint(20) DEFAULT NULL,
  `USER_CREATEDDATE` datetime DEFAULT NULL,
  `USER_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `USER_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hau_userwiseboardaccess`
--

DROP TABLE IF EXISTS `hau_userwiseboardaccess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hau_userwiseboardaccess` (
  `UWBA_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `UWBA_USER_ID` bigint(20) DEFAULT NULL,
  `UWBA_BORD_ID` bigint(20) DEFAULT NULL,
  `UWBA_HASACCESS` tinyint(4) DEFAULT NULL,
  `UWBA_ISDELETED` tinyint(4) DEFAULT NULL,
  `UWBA_CREATEDBY` bigint(20) DEFAULT NULL,
  `UWBA_CREATEDDATE` datetime DEFAULT NULL,
  `UWBA_MODIFIEDBY` bigint(20) DEFAULT NULL,
  `UWBA_MODIFIEDDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`UWBA_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'haudb'
--

--
-- Dumping routines for database 'haudb'
--
/*!50003 DROP PROCEDURE IF EXISTS `new_procedure` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_procedure`(
in _id nvarchar(20))
BEGIN
	if (_id = "ram") then
    begin
     select 1;
	end;
    else
     begin
		select 2;
	 end;
	end if;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_validateuser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_validateuser`(
in _homeid nvarchar(100),
in _USER_USERNAME nvarchar(200),
in _USER_PASSWORD nvarchar(200)
)
BEGIN
	if (_homeid = '') then
    begin
     
	/*if (SELECT        1=1 FROM hau_users WHERE (lower(USER_USERNAME) = lower(_USER_USERNAME)) AND (USER_PASSWORD = _USER_PASSWORD)) then
    begin
			declare _user_id bigint(20);
            DECLARE _ADM_USERTOKENLOGINTIME BIGINT(20);
            DECLARE _ENTT_ID BIGINT(20);
            declare _token nvarchar(200);
            #set _token = (select uuid());
			set       _user_id = (select USER_ID FROM hau_users WHERE (lower(USER_USERNAME) = lower(_USER_USERNAME)) AND (USER_PASSWORD = _USER_PASSWORD) limit 1);
            set _ENTT_ID = (select USRE_ENTT_ID from hau_userroles where USRE_USER_ID = _user_id and USRE_ISDELETED <> 1 limit 1);
            set _ADM_USERTOKENLOGINTIME = (select ADM_USERTOKENLOGINTIME from hau_adminparams where ADM_ENTT_ID = _ENTT_ID and ADM_ISDELETED <>1 limit 1);
			#SELECT        _user_id;
        	#INSERT INTO `haudb`.`hau_token` (`TOKN_USER_ID`, `TOKN_AUTHTOKEN`, `TOKN_ISSUEDON`, `TOKN_EXPIRESON`, `TOKN_CREATEDDATE`, `TOKN_MODIFIEDDATE`) VALUES
            #(_user_id, _token, CURRENT_DATE, DATE_ADD(CURRENT_DATE,INTERVAL _ADM_USERTOKENLOGINTIME DAY), CURRENT_DATE, CURRENT_DATE);
		
			INSERT INTO hau_logindata
                         (LOG_USER_ID, LOG_INTIME,  LOG_ISDELETED, LOG_CREATEDBY, LOG_CREATEDDATE, LOG_MODIFIEDBY, LOG_MODIFIEDDATE)
				VALUES        (_user_id, CURRENT_DATE, 0, 1, CURRENT_DATE, 1, CURRENT_DATE);
				
				SELECT        hau_users.*,  hau_roles.*, hau_entities.*,LAST_INSERT_ID() as logindata_id
				FROM            hau_users left outer join
										 hau_entities ON hau_users.USER_ENTT_ID = hau_entities.ENTT_ID left outer join
										 hau_roles ON hau_users.USER_ROLE_ID = hau_roles.ROLE_ID
				WHERE        (hau_users.USER_ID = _user_id) AND (hau_users.USER_ISACTIVE = 1) AND (hau_users.USER_ISDELETED is null or (hau_users.USER_ISDELETED = 0)) AND 
										 (hau_roles.ROLE_ISDELETED is null or hau_roles.ROLE_ISDELETED = 0) limit 1;

    
    END;
    END IF;
    */
    end;
    else
    begin
    #if (SELECT        1=1 FROM hau_users inner join hau_userroles on USRE_USER_ID = USER_ID inner join hau_entities on ENTT_ID= USER_ENTT_ID  WHERE ENTT_IDENTITY = _homeid and (lower(USER_USERNAME) = lower(_USER_USERNAME)) AND (USER_PASSWORD = _USER_PASSWORD)) then
    if (SELECT        1=1 FROM hau_users inner join hau_entities on ENTT_ID= USER_ENTT_ID  WHERE ENTT_IDENTITY = _homeid and (lower(USER_USERNAME) = lower(_USER_USERNAME)) AND (USER_PASSWORD = _USER_PASSWORD) and (USER_ISDELETED is null or USER_ISDELETED = 0) and USER_ISACTIVE = 1) then
    begin
			declare _user_id bigint(20);
            DECLARE _ADM_USERTOKENLOGINTIME BIGINT(20);
            DECLARE _ENTT_ID BIGINT(20);
            declare _token nvarchar(200);
            #set _token = (select uuid());
			set       _user_id = (select USER_ID FROM hau_users WHERE (lower(USER_USERNAME) = lower(_USER_USERNAME)) AND (USER_PASSWORD = _USER_PASSWORD) and (USER_ISDELETED is null or USER_ISDELETED = 0) limit 1);
            set _ENTT_ID = (select USER_ENTT_ID from hau_users WHERE  USER_ID = _user_id  limit 1);
            set _ADM_USERTOKENLOGINTIME = (select ADM_USERTOKENLOGINTIME from hau_adminparams where ADM_ENTT_ID = _ENTT_ID and ADM_ISDELETED <>1 limit 1);
			#SELECT        _user_id;
        	#INSERT INTO `haudb`.`hau_token` (`TOKN_USER_ID`, `TOKN_AUTHTOKEN`, `TOKN_ISSUEDON`, `TOKN_EXPIRESON`, `TOKN_CREATEDDATE`, `TOKN_MODIFIEDDATE`) VALUES
            #(_user_id, _token, CURRENT_DATE, DATE_ADD(CURRENT_DATE,INTERVAL _ADM_USERTOKENLOGINTIME DAY), CURRENT_DATE, CURRENT_DATE);
		
			INSERT INTO hau_logindata
                         (LOG_USER_ID, LOG_INTIME,  LOG_ISDELETED, LOG_CREATEDBY, LOG_CREATEDDATE, LOG_MODIFIEDBY, LOG_MODIFIEDDATE)
				VALUES        (_user_id, CURRENT_DATE, 0, 1, CURRENT_DATE, 1, CURRENT_DATE);
				
				SELECT        hau_users.*,  hau_roles.*, hau_entities.*,LAST_INSERT_ID() as logindata_id
				FROM            hau_users left outer join
										 hau_entities ON hau_users.USER_ENTT_ID = hau_entities.ENTT_ID left outer join
										 hau_roles ON hau_users.USER_ROLE_ID = hau_roles.ROLE_ID
				WHERE        (hau_users.USER_ID = _user_id) AND (hau_users.USER_ISACTIVE = 1) AND (hau_users.USER_ISDELETED is null or (hau_users.USER_ISDELETED = 0)) AND 
										 (hau_roles.ROLE_ISDELETED is null or hau_roles.ROLE_ISDELETED = 0) limit 1;
				select * from hau_userwiseboardaccess u inner join hau_boards b on b.BORD_ID = u.UWBA_BORD_ID inner join hau_rooms r on r.ROOM_ID = b.BORD_ROOM_ID where u.UWBA_USER_ID = _user_id;
    
    END;
    END IF;
    
    end;
    end if;
    
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

-- Dump completed on 2017-11-01 16:02:40
