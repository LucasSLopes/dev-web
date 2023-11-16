-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: inventario
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `matricula` varchar(10) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `permissao` enum('ADMINISTRADOR','GESTOR','USUARIO') NOT NULL DEFAULT 'USUARIO',
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(15) NOT NULL,
  PRIMARY KEY (`matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('123456','Lucas','8758789','Iasmyn.doe@example.com','USUARIO','$2b$10$.caZTXig/9.H3XK/q.tgGuZIFzBIMYXlNWY0kQ4DW0tUiKLdudG1S',''),('18767','Iasmyn','777856628','Iasmyn.doe@example.com','USUARIO','$2b$10$Rn9IFV4RCzthyUTtfScfZeo7jKzIzWIvKrom/SeoQUCgJWrMajZTa','62253321'),('334343','Lucas','125678901','usuario@exame.com','ADMINISTRADOR','rgrgrrrgr',''),('454545','Julia','557837','teste@gggg.com','ADMINISTRADOR','$2b$10$sdmLdvxXKAZvehiGwOWF0OOU8BkPBtr9Ws/iw1Ko.yfh39BwVwYSK',''),('537512','Catherine','99837837','teste@teste.com','USUARIO','$2b$10$FX1YDy7eGxq6IWtos7Lz4ezoXYWbxv3i2ZOaMzmEmMAY2/GFFeRfO',''),('708090','Laurindo','837837','teste2@teste.com','USUARIO','$2b$10$jgbF.7IRgDyfRIvoxVwh2O7VtImuZUewUR2zeJSi4MrcLn7twY8mu',''),('98767','USUARIO','99856628','john.doe@example.com','USUARIO','$2b$10$UDVFzRX6rWAEDct8wTeVwusLVV5LH7ddDbChr5dN01hOv/GHVGuEe','62253321');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-15 21:10:28
