-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: duanmishoes
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `chat_lieu`
--

DROP TABLE IF EXISTS `chat_lieu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_lieu` (
  `trang_thai` int NOT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `ma` varchar(255) DEFAULT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  `ten` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_lieu`
--

LOCK TABLES `chat_lieu` WRITE;
/*!40000 ALTER TABLE `chat_lieu` DISABLE KEYS */;
INSERT INTO `chat_lieu` VALUES (0,NULL,'2024-04-16 10:13:20.169327','90736616-4be3-4b4c-8fff-0521b75ba541','CL-1',NULL,NULL,'Vải'),(0,NULL,'2024-04-24 22:54:33.861801','a166ade1-041f-4107-ab1f-811b1e7bf13d','CL-2',NULL,NULL,'Da lộn');
/*!40000 ALTER TABLE `chat_lieu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chi_tiet_san_pham`
--

DROP TABLE IF EXISTS `chi_tiet_san_pham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chi_tiet_san_pham` (
  `gia_ban` decimal(38,2) DEFAULT NULL,
  `gia_nhap` decimal(38,2) DEFAULT NULL,
  `gioi_tinh` bit(1) NOT NULL,
  `so_luong` int NOT NULL,
  `trang_thai` int NOT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `chat_lieu_id` varchar(255) DEFAULT NULL,
  `danh_muc_id` varchar(255) DEFAULT NULL,
  `de_giay_id` varchar(255) DEFAULT NULL,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `hang_id` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `khuyen_mai_id` varchar(255) DEFAULT NULL,
  `kich_thuoc_id` varchar(255) DEFAULT NULL,
  `mau_sac_id` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  `qr_code` varchar(255) DEFAULT NULL,
  `san_pham_id` varchar(255) DEFAULT NULL,
  `ten_ct` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbkysckyh1v0fyrgm5fl0gb3wh` (`chat_lieu_id`),
  KEY `FK6kimwl5cox4tkk2h5i9luh1c4` (`danh_muc_id`),
  KEY `FKrv7hax19b2viv7ty4niugfioh` (`de_giay_id`),
  KEY `FKjfqr8qtlomggpv6awdya4ocg` (`hang_id`),
  KEY `FKpk7ud1lpgfhwb3uruo9vilhe2` (`khuyen_mai_id`),
  KEY `FKaqvokp1kg51kgr2bor6nuw3bw` (`kich_thuoc_id`),
  KEY `FKg49vwt1ynuqcvl3vnxgc4am8w` (`mau_sac_id`),
  KEY `FKon3wfvsmke49kj325yixevh8p` (`san_pham_id`),
  CONSTRAINT `FK6kimwl5cox4tkk2h5i9luh1c4` FOREIGN KEY (`danh_muc_id`) REFERENCES `danh_muc` (`id`),
  CONSTRAINT `FKaqvokp1kg51kgr2bor6nuw3bw` FOREIGN KEY (`kich_thuoc_id`) REFERENCES `kich_thuoc` (`id`),
  CONSTRAINT `FKbkysckyh1v0fyrgm5fl0gb3wh` FOREIGN KEY (`chat_lieu_id`) REFERENCES `chat_lieu` (`id`),
  CONSTRAINT `FKg49vwt1ynuqcvl3vnxgc4am8w` FOREIGN KEY (`mau_sac_id`) REFERENCES `mau_sac` (`id`),
  CONSTRAINT `FKjfqr8qtlomggpv6awdya4ocg` FOREIGN KEY (`hang_id`) REFERENCES `hang` (`id`),
  CONSTRAINT `FKon3wfvsmke49kj325yixevh8p` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`id`),
  CONSTRAINT `FKpk7ud1lpgfhwb3uruo9vilhe2` FOREIGN KEY (`khuyen_mai_id`) REFERENCES `khuyen_mai` (`id`),
  CONSTRAINT `FKrv7hax19b2viv7ty4niugfioh` FOREIGN KEY (`de_giay_id`) REFERENCES `de_giay` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi_tiet_san_pham`
--

LOCK TABLES `chi_tiet_san_pham` WRITE;
/*!40000 ALTER TABLE `chi_tiet_san_pham` DISABLE KEYS */;
INSERT INTO `chi_tiet_san_pham` VALUES (1000000.00,0.00,_binary '',4,0,'2024-05-02 13:36:04.071479','2024-04-16 10:19:21.770504','a166ade1-041f-4107-ab1f-811b1e7bf13d','61e7d326-f5af-49de-96ae-410a0d5c7da8','a40026a2-aad9-48e1-ba56-f96acdd736fb','https://res.cloudinary.com/dtetgawxc/image/upload/v1713975120/Vans6_nnxcry.png','b0c5c227-c063-4f47-8a8b-f853ef18791e','0a6bec7e-b4c2-47f7-ac67-0d22fa29fa85',NULL,'94968aa9-eec3-4c91-b606-0eed4735f9c7','f2316617-8eb5-4ad8-bd32-e51eafbf5ba8','Vans Sport Low Tri-Tone có đế cao su trắng, phần trên bằng da lộn ba màu, biểu tượng \"V\" nổi bật bên hông, thiết kế cổ điển và thoải mái.',NULL,NULL,NULL,'d81910af-1795-41cd-998f-514d978db49e','Vans Sport Low Tri-Tone [purple-35]'),(3000000.00,0.00,_binary '',49,0,'2024-04-16 10:29:31.210315','2024-04-16 10:23:19.881495','90736616-4be3-4b4c-8fff-0521b75ba541','561816be-97f0-477c-81b7-25599958636f','c27107b5-76be-4a59-8bba-28947871c6f4','https://res.cloudinary.com/dtetgawxc/image/upload/v1713973573/Converse6_idf06l.png','aeb49dc2-494e-4e67-b40d-e8087a816a6d','3b14ecb8-3f21-4824-b7f7-9bf32d18c2a5',NULL,'4048e418-fed7-4b48-a58c-1d40fffea522','2690f892-81d8-48e2-be1d-0e0654ea1761','Converse Chuck Taylor All Star Classic có kiểu dáng đơn giản, đế cao su, mũi tròn, chất liệu canvas, dây buộc truyền thống, logo ngôi sao, thoải mái và linh hoạt.',NULL,NULL,NULL,'8176d7b7-2b85-4cad-b528-c7253ec40969','Converse Chuck Taylor All Star Classic [white-36]'),(5000000.00,0.00,_binary '',91,0,NULL,'2024-04-16 10:27:44.105568','90736616-4be3-4b4c-8fff-0521b75ba541','61e7d326-f5af-49de-96ae-410a0d5c7da8','a40026a2-aad9-48e1-ba56-f96acdd736fb','https://res.cloudinary.com/dtetgawxc/image/upload/v1713968497/Airmax1_kxwrnm.png','cca1c263-d18a-4f38-817f-6aa8c08fd781','495f19b5-5d24-4c8b-9a8a-53aa99a6f5a9','a7f090c9-7971-4193-a5ac-45bd3a2203aa','4048e418-fed7-4b48-a58c-1d40fffea522','d738f734-ebab-447b-9117-4769cc370d72','Giày Nike Air Max có thiết kế hiện đại, đệm khí Air tối ưu, phong cách năng động, và tính linh hoạt cao. Chất liệu bền bỉ, kết hợp màu sắc đa dạng. Phù hợp cho tập luyện, dạo phố, và phong cách thời trang hàng ngày.',NULL,NULL,NULL,'8a85b683-6c88-45e1-bdfa-4d12c25daa32','Nike Air Max [black-36]'),(5000000.00,0.00,_binary '',94,0,NULL,'2024-04-16 10:27:44.107942','90736616-4be3-4b4c-8fff-0521b75ba541','61e7d326-f5af-49de-96ae-410a0d5c7da8','a40026a2-aad9-48e1-ba56-f96acdd736fb','https://res.cloudinary.com/dtetgawxc/image/upload/v1713965560/Airmax6_h9rh1a.png','cca1c263-d18a-4f38-817f-6aa8c08fd781','51b1604f-2c4e-4900-961d-23eeb0b4888e',NULL,'94968aa9-eec3-4c91-b606-0eed4735f9c7','2690f892-81d8-48e2-be1d-0e0654ea1761','Giày Nike Air Max có thiết kế hiện đại, đệm khí Air tối ưu, phong cách năng động, và tính linh hoạt cao. Chất liệu bền bỉ, kết hợp màu sắc đa dạng. Phù hợp cho tập luyện, dạo phố, và phong cách thời trang hàng ngày.',NULL,NULL,NULL,'8a85b683-6c88-45e1-bdfa-4d12c25daa32','Nike Air Max [white-35]'),(3000000.00,0.00,_binary '',50,0,'2024-04-16 10:29:31.210315','2024-04-16 10:23:19.881495','90736616-4be3-4b4c-8fff-0521b75ba541','561816be-97f0-477c-81b7-25599958636f','c27107b5-76be-4a59-8bba-28947871c6f4','https://res.cloudinary.com/dtetgawxc/image/upload/v1713973573/Converse6_idf06l.png','aeb49dc2-494e-4e67-b40d-e8087a816a6d','5509216e-52bd-49e0-a506-ad3f540ed839',NULL,'94968aa9-eec3-4c91-b606-0eed4735f9c7','2690f892-81d8-48e2-be1d-0e0654ea1761','Converse Chuck Taylor All Star Classic có kiểu dáng đơn giản, đế cao su, mũi tròn, chất liệu canvas, dây buộc truyền thống, logo ngôi sao, thoải mái và linh hoạt.',NULL,NULL,NULL,'8176d7b7-2b85-4cad-b528-c7253ec40969','Converse Chuck Taylor All Star Classic [white-35]'),(5000000.00,0.00,_binary '',100,0,NULL,'2024-04-16 10:27:44.105568','90736616-4be3-4b4c-8fff-0521b75ba541','61e7d326-f5af-49de-96ae-410a0d5c7da8','a40026a2-aad9-48e1-ba56-f96acdd736fb','https://res.cloudinary.com/dtetgawxc/image/upload/v1713965560/Airmax6_h9rh1a.png','cca1c263-d18a-4f38-817f-6aa8c08fd781','5d25eb56-e9ea-4250-90fe-1900d7ad0a72',NULL,'4048e418-fed7-4b48-a58c-1d40fffea522','2690f892-81d8-48e2-be1d-0e0654ea1761','Giày Nike Air Max có thiết kế hiện đại, đệm khí Air tối ưu, phong cách năng động, và tính linh hoạt cao. Chất liệu bền bỉ, kết hợp màu sắc đa dạng. Phù hợp cho tập luyện, dạo phố, và phong cách thời trang hàng ngày.',NULL,NULL,NULL,'8a85b683-6c88-45e1-bdfa-4d12c25daa32','Nike Air Max [white-36]'),(3000000.00,0.00,_binary '',50,0,'2024-04-16 10:29:31.210315','2024-04-16 10:23:19.881495','90736616-4be3-4b4c-8fff-0521b75ba541','561816be-97f0-477c-81b7-25599958636f','c27107b5-76be-4a59-8bba-28947871c6f4','https://res.cloudinary.com/dtetgawxc/image/upload/v1713969604/Converse1_vcexnq.png','aeb49dc2-494e-4e67-b40d-e8087a816a6d','60034f77-55b1-4064-8fb8-d14049e063af',NULL,'94968aa9-eec3-4c91-b606-0eed4735f9c7','d738f734-ebab-447b-9117-4769cc370d72','Converse Chuck Taylor All Star Classic có kiểu dáng đơn giản, đế cao su, mũi tròn, chất liệu canvas, dây buộc truyền thống, logo ngôi sao, thoải mái và linh hoạt.',NULL,NULL,NULL,'8176d7b7-2b85-4cad-b528-c7253ec40969','Converse Chuck Taylor All Star Classic [black-35]'),(5000000.00,0.00,_binary '',99,0,NULL,'2024-04-16 10:27:44.105568','90736616-4be3-4b4c-8fff-0521b75ba541','61e7d326-f5af-49de-96ae-410a0d5c7da8','a40026a2-aad9-48e1-ba56-f96acdd736fb','https://res.cloudinary.com/dtetgawxc/image/upload/v1713968497/Airmax1_kxwrnm.png','cca1c263-d18a-4f38-817f-6aa8c08fd781','82a4449d-46ca-4856-a284-acbfd2b36392',NULL,'94968aa9-eec3-4c91-b606-0eed4735f9c7','d738f734-ebab-447b-9117-4769cc370d72','Giày Nike Air Max có thiết kế hiện đại, đệm khí Air tối ưu, phong cách năng động, và tính linh hoạt cao. Chất liệu bền bỉ, kết hợp màu sắc đa dạng. Phù hợp cho tập luyện, dạo phố, và phong cách thời trang hàng ngày.',NULL,NULL,NULL,'8a85b683-6c88-45e1-bdfa-4d12c25daa32','Nike Air Max [black-35]'),(1000000.00,0.00,_binary '',10,0,'2024-04-16 10:36:59.125129','2024-04-16 10:19:21.770504','a166ade1-041f-4107-ab1f-811b1e7bf13d','61e7d326-f5af-49de-96ae-410a0d5c7da8','a40026a2-aad9-48e1-ba56-f96acdd736fb','https://res.cloudinary.com/dtetgawxc/image/upload/v1713975120/Vans6_nnxcry.png','b0c5c227-c063-4f47-8a8b-f853ef18791e','99e56523-06da-44e6-94e4-c41697d02e7e','a7f090c9-7971-4193-a5ac-45bd3a2203aa','4048e418-fed7-4b48-a58c-1d40fffea522','f2316617-8eb5-4ad8-bd32-e51eafbf5ba8','Vans Sport Low Tri-Tone có đế cao su trắng, phần trên bằng da lộn ba màu, biểu tượng \"V\" nổi bật bên hông, thiết kế cổ điển và thoải mái.',NULL,NULL,NULL,'d81910af-1795-41cd-998f-514d978db49e','Vans Sport Low Tri-Tone [purple-36]'),(1000000.00,0.00,_binary '',20,0,'2024-04-16 10:36:59.105659','2024-04-16 10:19:21.770504','a166ade1-041f-4107-ab1f-811b1e7bf13d','61e7d326-f5af-49de-96ae-410a0d5c7da8','a40026a2-aad9-48e1-ba56-f96acdd736fb','https://res.cloudinary.com/dtetgawxc/image/upload/v1713974612/Vans1_cgfdvo.png','b0c5c227-c063-4f47-8a8b-f853ef18791e','9a77b987-3360-4a01-8514-e1379acf12ff','a7f090c9-7971-4193-a5ac-45bd3a2203aa','4048e418-fed7-4b48-a58c-1d40fffea522','9016082a-5dcf-4465-8c4c-40e3ace75f01','Vans Sport Low Tri-Tone có đế cao su trắng, phần trên bằng da lộn ba màu, biểu tượng \"V\" nổi bật bên hông, thiết kế cổ điển và thoải mái.',NULL,NULL,NULL,'d81910af-1795-41cd-998f-514d978db49e','Vans Sport Low Tri-Tone [green-36]'),(1000000.00,0.00,_binary '',18,0,'2024-04-16 10:36:59.105659','2024-04-16 10:19:21.770504','a166ade1-041f-4107-ab1f-811b1e7bf13d','61e7d326-f5af-49de-96ae-410a0d5c7da8','a40026a2-aad9-48e1-ba56-f96acdd736fb','https://res.cloudinary.com/dtetgawxc/image/upload/v1713974612/Vans1_cgfdvo.png','b0c5c227-c063-4f47-8a8b-f853ef18791e','9a9d726e-8451-4952-8bf6-40ad51c8630c','a7f090c9-7971-4193-a5ac-45bd3a2203aa','94968aa9-eec3-4c91-b606-0eed4735f9c7','9016082a-5dcf-4465-8c4c-40e3ace75f01','Vans Sport Low Tri-Tone có đế cao su trắng, phần trên bằng da lộn ba màu, biểu tượng \"V\" nổi bật bên hông, thiết kế cổ điển và thoải mái.',NULL,NULL,NULL,'d81910af-1795-41cd-998f-514d978db49e','Vans Sport Low Tri-Tone [green-35]'),(3000000.00,0.00,_binary '',50,0,'2024-04-16 10:29:31.210315','2024-04-16 10:23:19.881495','90736616-4be3-4b4c-8fff-0521b75ba541','561816be-97f0-477c-81b7-25599958636f','c27107b5-76be-4a59-8bba-28947871c6f4','https://res.cloudinary.com/dtetgawxc/image/upload/v1713969604/Converse1_vcexnq.png','aeb49dc2-494e-4e67-b40d-e8087a816a6d','f6576e6d-30e0-4af4-99ba-1cfc315c2518',NULL,'4048e418-fed7-4b48-a58c-1d40fffea522','d738f734-ebab-447b-9117-4769cc370d72','Converse Chuck Taylor All Star Classic có kiểu dáng đơn giản, đế cao su, mũi tròn, chất liệu canvas, dây buộc truyền thống, logo ngôi sao, thoải mái và linh hoạt.',NULL,NULL,NULL,'8176d7b7-2b85-4cad-b528-c7253ec40969','Converse Chuck Taylor All Star Classic [black-36]');
/*!40000 ALTER TABLE `chi_tiet_san_pham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitietsp_khuyenmai`
--

DROP TABLE IF EXISTS `chitietsp_khuyenmai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietsp_khuyenmai` (
  `trang_thai` int NOT NULL,
  `chi_tiet_sp_id` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `khuyen_mai_id` varchar(255) DEFAULT NULL,
  `ma` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKoa1vhrsivlsp55ogbumruv639` (`chi_tiet_sp_id`),
  KEY `FKnup4qqo2vmaqj8e8wnpae241r` (`khuyen_mai_id`),
  CONSTRAINT `FKnup4qqo2vmaqj8e8wnpae241r` FOREIGN KEY (`khuyen_mai_id`) REFERENCES `khuyen_mai` (`id`),
  CONSTRAINT `FKoa1vhrsivlsp55ogbumruv639` FOREIGN KEY (`chi_tiet_sp_id`) REFERENCES `chi_tiet_san_pham` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietsp_khuyenmai`
--

LOCK TABLES `chitietsp_khuyenmai` WRITE;
/*!40000 ALTER TABLE `chitietsp_khuyenmai` DISABLE KEYS */;
INSERT INTO `chitietsp_khuyenmai` VALUES (1,'9a9d726e-8451-4952-8bf6-40ad51c8630c','707a3c6b-6b21-4bc5-99e3-7d10768c4447','a7f090c9-7971-4193-a5ac-45bd3a2203aa','Khai chươngVans Sport Low Tri-Tonegreen35'),(1,'99e56523-06da-44e6-94e4-c41697d02e7e','b955c888-6b83-45f5-838b-d1b92ece744d','a7f090c9-7971-4193-a5ac-45bd3a2203aa','Khai chươngVans Sport Low Tri-Tonepurple36'),(1,'495f19b5-5d24-4c8b-9a8a-53aa99a6f5a9','d843b343-44f0-49fa-8ee4-e5df056b51aa','a7f090c9-7971-4193-a5ac-45bd3a2203aa','Khai chươngNike Air Maxblack36'),(1,'9a77b987-3360-4a01-8514-e1379acf12ff','f20d198d-9a92-4c4f-a4d9-780b8be1a05f','a7f090c9-7971-4193-a5ac-45bd3a2203aa','Khai chươngVans Sport Low Tri-Tonegreen36');
/*!40000 ALTER TABLE `chitietsp_khuyenmai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cong_thuc`
--

DROP TABLE IF EXISTS `cong_thuc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cong_thuc` (
  `gia_tri_doi` decimal(38,2) DEFAULT NULL,
  `ti_so` decimal(38,2) DEFAULT NULL,
  `trang_thai` int NOT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cong_thuc`
--

LOCK TABLES `cong_thuc` WRITE;
/*!40000 ALTER TABLE `cong_thuc` DISABLE KEYS */;
/*!40000 ALTER TABLE `cong_thuc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danh_muc`
--

DROP TABLE IF EXISTS `danh_muc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danh_muc` (
  `trang_thai` int NOT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `ma` varchar(255) DEFAULT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  `ten` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danh_muc`
--

LOCK TABLES `danh_muc` WRITE;
/*!40000 ALTER TABLE `danh_muc` DISABLE KEYS */;
INSERT INTO `danh_muc` VALUES (0,NULL,'2024-04-16 10:16:10.949060','561816be-97f0-477c-81b7-25599958636f','DM-2',NULL,NULL,'Mid - Top'),(0,NULL,'2024-04-16 10:14:56.585609','61e7d326-f5af-49de-96ae-410a0d5c7da8','DM-1',NULL,NULL,'Low - Top');
/*!40000 ALTER TABLE `danh_muc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `de_giay`
--

DROP TABLE IF EXISTS `de_giay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `de_giay` (
  `trang_thai` int NOT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `ma` varchar(255) DEFAULT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  `ten` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `de_giay`
--

LOCK TABLES `de_giay` WRITE;
/*!40000 ALTER TABLE `de_giay` DISABLE KEYS */;
INSERT INTO `de_giay` VALUES (0,NULL,'2024-04-16 10:14:13.077882','a40026a2-aad9-48e1-ba56-f96acdd736fb','DG-2',NULL,NULL,'2'),(0,NULL,'2024-04-16 10:14:09.315781','c27107b5-76be-4a59-8bba-28947871c6f4','DG-1',NULL,NULL,'1');
/*!40000 ALTER TABLE `de_giay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dia_chi`
--

DROP TABLE IF EXISTS `dia_chi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dia_chi` (
  `id_huyen` int DEFAULT NULL,
  `id_quoc_gia` int NOT NULL,
  `id_thanh_pho` int DEFAULT NULL,
  `trang_thai` int NOT NULL,
  `dia_chi` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `id_xa` varchar(255) DEFAULT NULL,
  `nguoi_dung_id` varchar(255) DEFAULT NULL,
  `quoc_gia` varchar(255) DEFAULT NULL,
  `so_dien_thoai` varchar(255) DEFAULT NULL,
  `ten_huyen` varchar(255) DEFAULT NULL,
  `ten_nguoi_nhan` varchar(255) DEFAULT NULL,
  `ten_thanh_pho` varchar(255) DEFAULT NULL,
  `ten_xa` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgqmc6rp2hwibk5eijopxx3pxf` (`nguoi_dung_id`),
  CONSTRAINT `FKgqmc6rp2hwibk5eijopxx3pxf` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dia_chi`
--

LOCK TABLES `dia_chi` WRITE;
/*!40000 ALTER TABLE `dia_chi` DISABLE KEYS */;
INSERT INTO `dia_chi` VALUES (3440,0,201,0,'16','0fe39057-874f-4283-a875-2c30ec879d9e','13010','9b03dcff-8e27-4845-bc84-27947cfe31c9',NULL,'0988353709','Quận Nam Từ Liêm','Nguyễn Tùng Dương','Hà Nội','Phường Xuân Phương'),(0,0,0,0,'123','59d2b4fe-1ac6-4906-b131-5e2c7f9c49ca',NULL,'1a11ab3e-27c0-4c19-b131-395510ec6e05',NULL,'0353541842','Thành phố Ninh Bình','Phạm Quang Anh','Ninh Bình','Xã Ninh Nhất'),(1809,0,201,0,'366','6cf77972-42fe-4037-8033-ee431e98b45b','1B2419','6eb35ec4-a260-4700-bb19-c5a9476d84dc',NULL,'0348055118','Huyện Thanh Oai','Nguyễn Thị Phương Anh','Hà Nội','Xã Thanh Thùy'),(3440,0,201,1,'16','d22bba87-d68c-43d2-8f64-e05e3193f8fc','13010','6eb35ec4-a260-4700-bb19-c5a9476d84dc',NULL,'0988353709','Quận Nam Từ Liêm','Nguyễn Tùng Dương','Hà Nội','Phường Xuân Phương'),(3695,0,202,0,'22','ddb78b1c-2a83-4024-a670-50e2f71c1a75','90768','813c9650-3161-4620-a1b0-4adbf0357f08',NULL,'0988353709','Thành Phố Thủ Đức','Tiến hiệp','Hồ Chí Minh','Phường An Khánh');
/*!40000 ALTER TABLE `dia_chi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gio_hang`
--

DROP TABLE IF EXISTS `gio_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gio_hang` (
  `trang_thai` int NOT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `khach_hang_id` varchar(255) DEFAULT NULL,
  `ma` varchar(255) DEFAULT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  `nhan_vien_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhar6emy2v7u9alrlh5qjse18o` (`khach_hang_id`),
  CONSTRAINT `FKhar6emy2v7u9alrlh5qjse18o` FOREIGN KEY (`khach_hang_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gio_hang`
--

LOCK TABLES `gio_hang` WRITE;
/*!40000 ALTER TABLE `gio_hang` DISABLE KEYS */;
INSERT INTO `gio_hang` VALUES (0,NULL,'2024-04-16 10:43:49.304469','afff3109-aba4-45af-8c70-8ee8e49d8771','6eb35ec4-a260-4700-bb19-c5a9476d84dc','I2MP2D',NULL,NULL,NULL),(0,NULL,'2024-04-16 10:41:00.519219','f6a3cb64-c3af-4d30-9b35-a722037a1703',NULL,'9TM9PO',NULL,NULL,NULL);
/*!40000 ALTER TABLE `gio_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gio_hang_chi_tiet`
--

DROP TABLE IF EXISTS `gio_hang_chi_tiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gio_hang_chi_tiet` (
  `so_luong` int NOT NULL,
  `thanh_tien` decimal(38,2) DEFAULT NULL,
  `trang_thai` int NOT NULL,
  `chi_tiet_sp_id` varchar(255) DEFAULT NULL,
  `gio_hang_id` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlthwogr9n21pvt8x1cwk2ayu5` (`chi_tiet_sp_id`),
  KEY `FK1mlfoe699lwia5g2mtp8yedji` (`gio_hang_id`),
  CONSTRAINT `FK1mlfoe699lwia5g2mtp8yedji` FOREIGN KEY (`gio_hang_id`) REFERENCES `gio_hang` (`id`),
  CONSTRAINT `FKlthwogr9n21pvt8x1cwk2ayu5` FOREIGN KEY (`chi_tiet_sp_id`) REFERENCES `chi_tiet_san_pham` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gio_hang_chi_tiet`
--

LOCK TABLES `gio_hang_chi_tiet` WRITE;
/*!40000 ALTER TABLE `gio_hang_chi_tiet` DISABLE KEYS */;
/*!40000 ALTER TABLE `gio_hang_chi_tiet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hang`
--

DROP TABLE IF EXISTS `hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hang` (
  `trang_thai` int NOT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `ma` varchar(255) DEFAULT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  `ten` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hang`
--

LOCK TABLES `hang` WRITE;
/*!40000 ALTER TABLE `hang` DISABLE KEYS */;
INSERT INTO `hang` VALUES (0,NULL,'2024-04-24 20:53:42.107514','aeb49dc2-494e-4e67-b40d-e8087a816a6d','H-3',NULL,NULL,'Converse'),(0,NULL,'2024-04-16 10:25:25.602449','b0c5c227-c063-4f47-8a8b-f853ef18791e','H-2',NULL,NULL,'Vans'),(0,NULL,'2024-04-16 10:13:39.711279','cca1c263-d18a-4f38-817f-6aa8c08fd781','H-1',NULL,NULL,'Nike');
/*!40000 ALTER TABLE `hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hinh_anh`
--

DROP TABLE IF EXISTS `hinh_anh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hinh_anh` (
  `trang_thai` int NOT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `chi_tiet_san_pham_id` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `ma` varchar(255) DEFAULT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  `ten` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6prygp6f58eul27n2ie2gvqak` (`chi_tiet_san_pham_id`),
  CONSTRAINT `FK6prygp6f58eul27n2ie2gvqak` FOREIGN KEY (`chi_tiet_san_pham_id`) REFERENCES `chi_tiet_san_pham` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hinh_anh`
--

LOCK TABLES `hinh_anh` WRITE;
/*!40000 ALTER TABLE `hinh_anh` DISABLE KEYS */;
INSERT INTO `hinh_anh` VALUES (0,NULL,NULL,'9a9d726e-8451-4952-8bf6-40ad51c8630c','0133c030-1400-47d7-ac50-13cecaa5b323','HA',NULL,NULL,'9016082a-5dcf-4465-8c4c-40e3ace75f01','https://res.cloudinary.com/dtetgawxc/image/upload/v1713974612/Vans1_cgfdvo.png'),(0,NULL,NULL,'5d25eb56-e9ea-4250-90fe-1900d7ad0a72','01671e3d-a2b2-4429-8117-b463bdbfc361','HA',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713965560/Airmax9_abox0v.png'),(0,NULL,NULL,'5509216e-52bd-49e0-a506-ad3f540ed839','04ed37b4-5b23-4e54-b370-47f88f7a123b','HA',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713973573/Converse6_idf06l.png'),(0,NULL,NULL,'51b1604f-2c4e-4900-961d-23eeb0b4888e','05850d7e-fe56-4f1c-a5fb-c88843eae3cf','HA',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713965560/Airmax9_abox0v.png'),(0,NULL,NULL,'f6576e6d-30e0-4af4-99ba-1cfc315c2518','255cebd7-23c9-453d-b943-5d26185c24e6','HA',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713969604/Converse1_vcexnq.png'),(0,NULL,NULL,'51b1604f-2c4e-4900-961d-23eeb0b4888e','263a7f03-06cd-488a-ba5c-c400dc6b32eb','HA',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713965560/Airmax8_wxfr4c.png'),(0,NULL,NULL,'3b14ecb8-3f21-4824-b7f7-9bf32d18c2a5','2d4eb817-97c6-489e-a8e4-2ce2f0f72b5a','HA',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713973573/Converse6_idf06l.png'),(0,NULL,NULL,'5d25eb56-e9ea-4250-90fe-1900d7ad0a72','31e2301b-fe33-47cb-8f01-f7714de876cc','HA',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713965560/Airmax8_wxfr4c.png'),(0,NULL,NULL,'60034f77-55b1-4064-8fb8-d14049e063af','3e14130f-998c-4b6c-96a6-c6d87d8cf3eb','HA',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713969604/Converse1_vcexnq.png'),(0,NULL,NULL,'5509216e-52bd-49e0-a506-ad3f540ed839','3ec09cff-39c8-47b1-a08a-962cfe8c8625','HA-7',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713973573/Converse7_ukzty6.png'),(0,NULL,NULL,'5509216e-52bd-49e0-a506-ad3f540ed839','45fbca55-453a-4c1c-8a10-ae863ca175cd','HA',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713973573/Converse8_svpxzi.png'),(0,NULL,NULL,'5509216e-52bd-49e0-a506-ad3f540ed839','466b7417-cfbe-46a2-b881-8d04189320b7','HA',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713973573/Converse9_evzrgz.png'),(0,NULL,NULL,'495f19b5-5d24-4c8b-9a8a-53aa99a6f5a9','477b474a-f18a-493d-b92d-849c84dcf14b','HA-11',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713968501/Airmax4_tfpx6c.png'),(0,NULL,NULL,'82a4449d-46ca-4856-a284-acbfd2b36392','4ac20790-fdd3-46ad-8aea-a2cde339f89d','HA',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713968501/Airmax4_tfpx6c.png'),(0,NULL,NULL,'51b1604f-2c4e-4900-961d-23eeb0b4888e','4e3bb279-0e73-4a5d-a5d9-753b7a443afd','HA',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713965561/Airmax7_vbovl1.png'),(0,NULL,NULL,'9a9d726e-8451-4952-8bf6-40ad51c8630c','4e7d0493-03f4-4214-bf70-1f542972f49c','HA',NULL,NULL,'9016082a-5dcf-4465-8c4c-40e3ace75f01','https://res.cloudinary.com/dtetgawxc/image/upload/v1713974613/Vans2_mmg4as.png'),(0,NULL,NULL,'99e56523-06da-44e6-94e4-c41697d02e7e','4ebb76ce-4690-4c8c-b863-a5a45f65f307','HA',NULL,NULL,'f2316617-8eb5-4ad8-bd32-e51eafbf5ba8','https://res.cloudinary.com/dtetgawxc/image/upload/v1713975120/Vans6_nnxcry.png'),(0,NULL,NULL,'495f19b5-5d24-4c8b-9a8a-53aa99a6f5a9','5173d606-caed-4629-baa5-aa0a8d771290','HA',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713968497/Airmax3_g8tbut.png'),(0,NULL,NULL,'5d25eb56-e9ea-4250-90fe-1900d7ad0a72','5d615d78-c55e-4151-a861-d75ecb2da017','HA',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713965561/Airmax7_vbovl1.png'),(0,NULL,NULL,'82a4449d-46ca-4856-a284-acbfd2b36392','65b0cee6-cdbc-4829-88ab-6e8593835972','HA',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713968497/Airmax3_g8tbut.png'),(0,NULL,NULL,'3b14ecb8-3f21-4824-b7f7-9bf32d18c2a5','68c4fb16-2aab-421a-932f-4d5e6b26c256','HA',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713973573/Converse7_ukzty6.png'),(0,NULL,NULL,'0a6bec7e-b4c2-47f7-ac67-0d22fa29fa85','69b3464d-4fce-48bc-ba6c-6baf733f723a','HA',NULL,NULL,'f2316617-8eb5-4ad8-bd32-e51eafbf5ba8','https://res.cloudinary.com/dtetgawxc/image/upload/v1713975120/Vans6_nnxcry.png'),(0,NULL,NULL,'495f19b5-5d24-4c8b-9a8a-53aa99a6f5a9','6b396e52-5ab8-4307-a6f3-006718dd9800','HA',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713968497/Airmax2_o61sxz.png'),(0,NULL,NULL,'3b14ecb8-3f21-4824-b7f7-9bf32d18c2a5','76e4446c-f0e9-454d-8d46-1c6d1560ecea','HA',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713973573/Converse8_svpxzi.png'),(0,NULL,NULL,'3b14ecb8-3f21-4824-b7f7-9bf32d18c2a5','79e48c2d-1eba-4594-b9c5-fb5ab2120328','HA-7',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713973573/Converse9_evzrgz.png'),(0,NULL,NULL,'f6576e6d-30e0-4af4-99ba-1cfc315c2518','7b0a420c-00bf-406a-b579-431acc552263','HA',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713969602/Converse2_tfmrwg.png'),(0,NULL,NULL,'9a77b987-3360-4a01-8514-e1379acf12ff','7bc5ca0f-32c0-43c2-853e-b9bb7b018171','HA',NULL,NULL,'9016082a-5dcf-4465-8c4c-40e3ace75f01','https://res.cloudinary.com/dtetgawxc/image/upload/v1713974612/Vans1_cgfdvo.png'),(0,NULL,NULL,'99e56523-06da-44e6-94e4-c41697d02e7e','7c064a9f-02d3-4259-be85-a743f9eaeadc','HA-1',NULL,NULL,'f2316617-8eb5-4ad8-bd32-e51eafbf5ba8','https://res.cloudinary.com/dtetgawxc/image/upload/v1713975121/Vans7_nn4lac.png'),(0,NULL,NULL,'9a9d726e-8451-4952-8bf6-40ad51c8630c','803cf1a6-76c0-4fac-bcaa-3aa26b59a2c3','HA-1',NULL,NULL,'9016082a-5dcf-4465-8c4c-40e3ace75f01','https://res.cloudinary.com/dtetgawxc/image/upload/v1713974613/Vans3_nygbcy.png'),(0,NULL,NULL,'5d25eb56-e9ea-4250-90fe-1900d7ad0a72','8b27d1ff-3925-40c7-9ce0-41d8f943e00d','HA',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713965560/Airmax10_xwobdd.png'),(0,NULL,NULL,'5509216e-52bd-49e0-a506-ad3f540ed839','912eebd5-0881-42bf-863f-56540baface9','HA',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713973574/Converse10_pn6ehe.png'),(0,NULL,NULL,'99e56523-06da-44e6-94e4-c41697d02e7e','9396d6c3-e9b8-4548-a8b0-98611e35a515','HA',NULL,NULL,'f2316617-8eb5-4ad8-bd32-e51eafbf5ba8','https://res.cloudinary.com/dtetgawxc/image/upload/v1713975124/Vans8_bxyudm.png'),(0,NULL,NULL,'0a6bec7e-b4c2-47f7-ac67-0d22fa29fa85','94d23549-d859-419f-b42d-9febf01af96b','HA',NULL,NULL,'f2316617-8eb5-4ad8-bd32-e51eafbf5ba8','https://res.cloudinary.com/dtetgawxc/image/upload/v1713975121/Vans7_nn4lac.png'),(0,NULL,NULL,'82a4449d-46ca-4856-a284-acbfd2b36392','959f2128-9aaa-4c6b-bb8a-d0462f2a1790','HA',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713968497/Airmax2_o61sxz.png'),(0,NULL,NULL,'60034f77-55b1-4064-8fb8-d14049e063af','9985bacc-a749-4588-9530-c0288c50ce70','HA-7',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713969602/Converse2_tfmrwg.png'),(0,NULL,NULL,'82a4449d-46ca-4856-a284-acbfd2b36392','9b5ac49a-7a10-41cd-b7c5-e106f6304d05','HA',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713968498/Airmax5_bsvtkn.png'),(0,NULL,NULL,'60034f77-55b1-4064-8fb8-d14049e063af','a051bbd7-b78f-4548-a859-b79f19571b7b','HA',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713969603/Converse3_njgr2v.png'),(0,NULL,NULL,'0a6bec7e-b4c2-47f7-ac67-0d22fa29fa85','a207d154-d090-4640-b25f-20a22f89840b','HA',NULL,NULL,'f2316617-8eb5-4ad8-bd32-e51eafbf5ba8','https://res.cloudinary.com/dtetgawxc/image/upload/v1713975124/Vans8_bxyudm.png'),(0,NULL,NULL,'51b1604f-2c4e-4900-961d-23eeb0b4888e','a251510c-9a8d-4ab9-864f-33f5c8e55d08','HA',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713965560/Airmax10_xwobdd.png'),(0,NULL,NULL,'9a77b987-3360-4a01-8514-e1379acf12ff','a25c8825-8ba6-41ff-a54e-9744a2f74754','HA',NULL,NULL,'9016082a-5dcf-4465-8c4c-40e3ace75f01','https://res.cloudinary.com/dtetgawxc/image/upload/v1713974613/Vans2_mmg4as.png'),(0,NULL,NULL,'0a6bec7e-b4c2-47f7-ac67-0d22fa29fa85','a864a3fb-7b5f-4614-938a-79426482f306','HA',NULL,NULL,'f2316617-8eb5-4ad8-bd32-e51eafbf5ba8','https://res.cloudinary.com/dtetgawxc/image/upload/v1713975123/Vans9_utalsu.png'),(0,NULL,NULL,'82a4449d-46ca-4856-a284-acbfd2b36392','acf84444-9b45-448a-815e-056c5bcc0f5b','HA-11',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713968497/Airmax1_kxwrnm.png'),(0,NULL,NULL,'9a9d726e-8451-4952-8bf6-40ad51c8630c','afa39bd9-5a14-4a3f-ad23-386bae3a9e29','HA',NULL,NULL,'9016082a-5dcf-4465-8c4c-40e3ace75f01','https://res.cloudinary.com/dtetgawxc/image/upload/v1713974613/Vans4_zcvldf.png'),(0,NULL,NULL,'9a9d726e-8451-4952-8bf6-40ad51c8630c','b04678d0-f123-4b82-9bf5-45d662e48f45','HA',NULL,NULL,'9016082a-5dcf-4465-8c4c-40e3ace75f01','https://res.cloudinary.com/dtetgawxc/image/upload/v1713974614/Vans5_p5x6fb.png'),(0,NULL,NULL,'3b14ecb8-3f21-4824-b7f7-9bf32d18c2a5','b180b0c2-b314-42af-a4f1-13a21439bc40','HA',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713973574/Converse10_pn6ehe.png'),(0,NULL,NULL,'f6576e6d-30e0-4af4-99ba-1cfc315c2518','b24d7beb-fe3a-4e10-95b8-9fbfff25bd48','HA',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713969603/Converse3_njgr2v.png'),(0,NULL,NULL,'9a77b987-3360-4a01-8514-e1379acf12ff','b45a8b34-99af-4723-bcff-f0a7f8e7d9fb','HA',NULL,NULL,'9016082a-5dcf-4465-8c4c-40e3ace75f01','https://res.cloudinary.com/dtetgawxc/image/upload/v1713974613/Vans3_nygbcy.png'),(0,NULL,NULL,'0a6bec7e-b4c2-47f7-ac67-0d22fa29fa85','b82d8def-023a-416f-a947-214cd2538b19','HA-1',NULL,NULL,'f2316617-8eb5-4ad8-bd32-e51eafbf5ba8','https://res.cloudinary.com/dtetgawxc/image/upload/v1713975125/Vans10_tayi0j.png'),(0,NULL,NULL,'60034f77-55b1-4064-8fb8-d14049e063af','ba33b9b4-6cb9-43b8-8ef3-f0863d5ba81e','HA',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713969604/Converse4_vpzzvt.png'),(0,NULL,NULL,'51b1604f-2c4e-4900-961d-23eeb0b4888e','c02899a0-c61c-4ab6-9603-ff9b2316e0f5','HA-11',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713965560/Airmax6_h9rh1a.png'),(0,NULL,NULL,'99e56523-06da-44e6-94e4-c41697d02e7e','c7327f8b-d1d3-4067-83fd-5b348928faed','HA',NULL,NULL,'f2316617-8eb5-4ad8-bd32-e51eafbf5ba8','https://res.cloudinary.com/dtetgawxc/image/upload/v1713975123/Vans9_utalsu.png'),(0,NULL,NULL,'f6576e6d-30e0-4af4-99ba-1cfc315c2518','cfe39ecb-efae-4a15-94f9-c890c62f2f60','HA-7',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713969604/Converse4_vpzzvt.png'),(0,NULL,NULL,'9a77b987-3360-4a01-8514-e1379acf12ff','d284697b-1123-4508-bce7-b120a4b42c4e','HA',NULL,NULL,'9016082a-5dcf-4465-8c4c-40e3ace75f01','https://res.cloudinary.com/dtetgawxc/image/upload/v1713974613/Vans4_zcvldf.png'),(0,NULL,NULL,'5d25eb56-e9ea-4250-90fe-1900d7ad0a72','db3945d1-9b49-4349-8835-65eb5c61b4cb','HA-11',NULL,NULL,'2690f892-81d8-48e2-be1d-0e0654ea1761','https://res.cloudinary.com/dtetgawxc/image/upload/v1713965560/Airmax6_h9rh1a.png'),(0,NULL,NULL,'9a77b987-3360-4a01-8514-e1379acf12ff','de6d4b82-1028-41dd-a944-dc7d2632595e','HA-1',NULL,NULL,'9016082a-5dcf-4465-8c4c-40e3ace75f01','https://res.cloudinary.com/dtetgawxc/image/upload/v1713974614/Vans5_p5x6fb.png'),(0,NULL,NULL,'60034f77-55b1-4064-8fb8-d14049e063af','e06335e2-8c1f-44e3-8e6d-72bd2a0238c9','HA',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713969603/Converse5_xwwokk.png'),(0,NULL,NULL,'495f19b5-5d24-4c8b-9a8a-53aa99a6f5a9','e37052c1-895e-4e55-9d66-eb43cd058c7d','HA',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713968498/Airmax5_bsvtkn.png'),(0,NULL,NULL,'495f19b5-5d24-4c8b-9a8a-53aa99a6f5a9','eae82891-7689-416b-84c4-e0859ec84710','HA',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713968497/Airmax1_kxwrnm.png'),(0,NULL,NULL,'99e56523-06da-44e6-94e4-c41697d02e7e','f34d375d-ad93-4622-b37c-530128d3da84','HA',NULL,NULL,'f2316617-8eb5-4ad8-bd32-e51eafbf5ba8','https://res.cloudinary.com/dtetgawxc/image/upload/v1713975125/Vans10_tayi0j.png'),(0,NULL,NULL,'f6576e6d-30e0-4af4-99ba-1cfc315c2518','f5a2ad76-fb19-440b-8ccc-7f395364298e','HA',NULL,NULL,'d738f734-ebab-447b-9117-4769cc370d72','https://res.cloudinary.com/dtetgawxc/image/upload/v1713969603/Converse5_xwwokk.png');
/*!40000 ALTER TABLE `hinh_anh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoa_don`
--

DROP TABLE IF EXISTS `hoa_don`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoa_don` (
  `diem_su_dung` int NOT NULL,
  `gia_giam_gia` decimal(38,2) DEFAULT NULL,
  `gia_goc` decimal(38,2) DEFAULT NULL,
  `gia_tri_diem` int NOT NULL,
  `loai_hoa_don` int NOT NULL,
  `ngay_du_kien_nhan` date DEFAULT NULL,
  `ngay_nhan_hang` date DEFAULT NULL,
  `ngay_tra_hang` date DEFAULT NULL,
  `thanh_tien` decimal(38,2) DEFAULT NULL,
  `tien_van_chuyen` decimal(38,2) DEFAULT NULL,
  `tra_sau` int NOT NULL,
  `trang_thai` int NOT NULL,
  `ngay_mua` datetime(6) DEFAULT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `dia_chi` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `khach_hang_id` varchar(255) DEFAULT NULL,
  `ma` varchar(255) DEFAULT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  `nhan_vien_id` varchar(255) DEFAULT NULL,
  `qr_code` varchar(255) DEFAULT NULL,
  `so_dien_thoai` varchar(255) DEFAULT NULL,
  `ten_nguoi_nhan` varchar(255) DEFAULT NULL,
  `voucher_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9x8nd1bpb2t3xtxrihupbr3ry` (`khach_hang_id`),
  KEY `FKo4nv1iqxdngecqy05t2hp3a6p` (`voucher_id`),
  CONSTRAINT `FK9x8nd1bpb2t3xtxrihupbr3ry` FOREIGN KEY (`khach_hang_id`) REFERENCES `nguoi_dung` (`id`),
  CONSTRAINT `FKo4nv1iqxdngecqy05t2hp3a6p` FOREIGN KEY (`voucher_id`) REFERENCES `voucher` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don`
--

LOCK TABLES `hoa_don` WRITE;
/*!40000 ALTER TABLE `hoa_don` DISABLE KEYS */;
INSERT INTO `hoa_don` VALUES (0,NULL,10000000.00,0,1,NULL,NULL,NULL,10000000.00,NULL,0,5,'2024-04-25 22:09:15.684078','2024-04-25 22:09:15.618788','2024-04-25 22:08:55.234368',NULL,NULL,NULL,'0fe7328d-5b56-404b-a80d-d1bde9bf7bd2',NULL,'HDTQ1714082935000-5',NULL,'NV1','NV1',NULL,NULL,NULL,NULL),(0,20000.00,10000000.00,0,0,'2024-04-18',NULL,NULL,9999980.00,36500.00,0,10,'2024-04-16 10:41:55.075754','2024-04-25 21:46:19.402244','2024-04-16 10:41:55.075754','123/Xã Thanh Sơn/Huyện Mai Châu/Hòa Bình','duongntph29011@fpt.edu.vn',NULL,'35ba3655-489e-4494-95b6-f72567c64473',NULL,'HD5786',NULL,NULL,NULL,NULL,'0988353709','Quang huy','acf40169-a8a6-43c3-9345-8a9e15fa078d'),(0,10000.00,10000000.00,0,1,NULL,NULL,NULL,9990000.00,NULL,0,5,'2024-04-25 21:52:03.929342','2024-04-25 21:52:03.870538','2024-04-25 21:51:34.776896',NULL,NULL,NULL,'4dddca2a-5ed3-4a80-a248-7791dd64431f',NULL,'HDTQ1714081894000-2',NULL,'NV1','NV1',NULL,NULL,NULL,'acf40169-a8a6-43c3-9345-8a9e15fa078d'),(0,NULL,0.00,0,1,NULL,NULL,NULL,0.00,NULL,0,0,NULL,NULL,'2024-04-30 21:05:24.113116',NULL,NULL,NULL,'552e8d70-a985-4f22-b17c-72eaed90e54f','813c9650-3161-4620-a1b0-4adbf0357f08','HDTQ1714511124000-1',NULL,'NV1','NV1',NULL,NULL,NULL,NULL),(0,10000.00,15000000.00,0,1,'2024-04-27',NULL,NULL,14990000.00,29000.00,0,3,'2024-04-25 22:05:51.593410','2024-04-30 21:36:15.038734','2024-04-25 22:04:20.760596','36/Xã Thanh Thùy/Huyện Thanh Oai/Hà Nội','anhntpph28990@fpt.edu.vn',NULL,'8dd1259a-5b14-418a-a79d-6fc77f6e8e0f','6eb35ec4-a260-4700-bb19-c5a9476d84dc','HDTQ1714082660000-4',NULL,'NV1','NV1',NULL,'0348055118','Nguyễn Thị Phương Anh','acf40169-a8a6-43c3-9345-8a9e15fa078d'),(0,50000.00,5029000.00,0,0,'2024-04-18',NULL,NULL,4979000.00,29000.00,0,0,'2024-04-16 11:12:04.431838',NULL,'2024-04-16 11:12:04.431838','36/Xã Thanh Thùy/Huyện Thanh Oai/Hà Nội','anhntpph28990@fpt.edu.vn',NULL,'9675c5bb-ccc1-4745-ae76-e89e051ed057','6eb35ec4-a260-4700-bb19-c5a9476d84dc','HD7090',NULL,NULL,NULL,NULL,'0348055118','Nguyễn Thị Phương Anh','ca2dab15-bf86-44c2-9a42-dbd51c8b2656'),(0,NULL,5000000.00,0,1,'2024-04-27',NULL,NULL,5000000.00,29000.00,1,0,'2024-04-25 22:02:16.069282',NULL,'2024-04-25 21:51:33.376965','36/Xã Thanh Thùy/Huyện Thanh Oai/Hà Nội','anhntpph28990@fpt.edu.vn',NULL,'af658b1c-c539-4097-bcf5-426ca7660aa6','6eb35ec4-a260-4700-bb19-c5a9476d84dc','HDTQ1714081893000-1',NULL,'NV1','NV1',NULL,'0348055118','Nguyễn Thị Phương Anh',NULL),(0,10000.00,10000000.00,0,1,'2024-04-27',NULL,NULL,9990000.00,29000.00,0,3,'2024-04-25 21:53:12.333506','2024-04-30 21:37:29.538844','2024-04-25 21:52:07.281769','36/Xã Thanh Thùy/Huyện Thanh Oai/Hà Nội','anhntpph28990@fpt.edu.vn',NULL,'bdea8992-ce1f-42f9-9751-3555a2ebad34','6eb35ec4-a260-4700-bb19-c5a9476d84dc','HDTQ1714081927000-3',NULL,'NV1','NV1',NULL,'0348055118','Nguyễn Thị Phương Anh','acf40169-a8a6-43c3-9345-8a9e15fa078d'),(0,50000.00,2829000.00,0,0,'2024-04-18',NULL,NULL,2779000.00,29000.00,0,5,'2024-04-16 10:45:45.585660','2024-04-16 10:46:36.519617','2024-04-16 10:45:45.585660','36/Xã Thanh Thùy/Huyện Thanh Oai/Hà Nội','anhntpph28990@fpt.edu.vn',NULL,'bec28bae-8e9a-4c75-89c9-7190ac0dc6a3','6eb35ec4-a260-4700-bb19-c5a9476d84dc','HD2047',NULL,NULL,NULL,NULL,'0348055118','Nguyễn Thị Phương Anh','ca2dab15-bf86-44c2-9a42-dbd51c8b2656'),(0,NULL,1029000.00,0,0,'2024-04-18',NULL,NULL,1029000.00,29000.00,0,5,'2024-04-16 11:01:09.272113','2024-04-16 11:01:43.195199','2024-04-16 11:01:09.272113','36/Xã Thanh Thùy/Huyện Thanh Oai/Hà Nội','anhntpph28990@fpt.edu.vn',NULL,'c5defe7c-0272-4fcb-a786-fbc38c283baa','6eb35ec4-a260-4700-bb19-c5a9476d84dc','HD7643',NULL,NULL,NULL,NULL,'0348055118','Nguyễn Thị Phương Anh',NULL),(0,50000.00,7990000.00,0,1,NULL,NULL,NULL,7940000.00,NULL,0,4,'2024-04-16 10:40:30.678516','2024-04-16 10:40:30.628522','2024-04-16 10:38:13.562957',NULL,NULL,NULL,'d30baa1f-24b7-4a52-b5a3-f52c2c44fcbe','6eb35ec4-a260-4700-bb19-c5a9476d84dc','HDTQ1713225600000-2',NULL,NULL,NULL,NULL,NULL,NULL,'ca2dab15-bf86-44c2-9a42-dbd51c8b2656'),(0,50000.00,5000000.00,0,1,NULL,NULL,NULL,4950000.00,NULL,0,4,'2024-04-16 10:38:01.275718','2024-04-16 10:38:01.239328','2024-04-16 09:55:39.178987',NULL,NULL,NULL,'d4982a79-5e75-40cc-8ec7-4f09b6864932','813c9650-3161-4620-a1b0-4adbf0357f08','HDTQ1713225600000-1',NULL,NULL,NULL,NULL,NULL,NULL,'ca2dab15-bf86-44c2-9a42-dbd51c8b2656'),(0,50000.00,5000000.00,0,0,'2024-05-02',NULL,NULL,4950000.00,29000.00,0,5,'2024-04-30 21:27:43.737960','2024-04-30 21:32:53.251680','2024-04-30 21:27:43.737960','366/Xã Thanh Thùy/Huyện Thanh Oai/Hà Nội','anhntpph28990@fpt.edu.vn',NULL,'dcb115f8-eac5-4987-8184-e69f10256df7','6eb35ec4-a260-4700-bb19-c5a9476d84dc','HD8527',NULL,NULL,NULL,NULL,'0348055118','Nguyễn Thị Phương Anh','ca2dab15-bf86-44c2-9a42-dbd51c8b2656');
/*!40000 ALTER TABLE `hoa_don` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoa_don_chi_tiet`
--

DROP TABLE IF EXISTS `hoa_don_chi_tiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoa_don_chi_tiet` (
  `gia_giam` decimal(38,2) DEFAULT NULL,
  `gia_sau_giam` decimal(38,2) DEFAULT NULL,
  `so_luong` int NOT NULL,
  `trang_thai` int NOT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `chi_tiet_san_pham_id` varchar(255) DEFAULT NULL,
  `hoa_don_id` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrfhfuxvvaom66464xk6dyyvlk` (`chi_tiet_san_pham_id`),
  KEY `FKj92be09idb627l61la7oauu79` (`hoa_don_id`),
  CONSTRAINT `FKj92be09idb627l61la7oauu79` FOREIGN KEY (`hoa_don_id`) REFERENCES `hoa_don` (`id`),
  CONSTRAINT `FKrfhfuxvvaom66464xk6dyyvlk` FOREIGN KEY (`chi_tiet_san_pham_id`) REFERENCES `chi_tiet_san_pham` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don_chi_tiet`
--

LOCK TABLES `hoa_don_chi_tiet` WRITE;
/*!40000 ALTER TABLE `hoa_don_chi_tiet` DISABLE KEYS */;
INSERT INTO `hoa_don_chi_tiet` VALUES (NULL,5000000.00,1,2,NULL,'2024-04-16 10:41:55.118922','82a4449d-46ca-4856-a284-acbfd2b36392','35ba3655-489e-4494-95b6-f72567c64473','04b5a3a7-e219-44c4-a3b0-a7fa5e135238',NULL,NULL),(NULL,1000000.00,1,1,NULL,'2024-04-16 11:01:09.290138','0a6bec7e-b4c2-47f7-ac67-0d22fa29fa85','c5defe7c-0272-4fcb-a786-fbc38c283baa','04ec24bf-4ad1-41b7-8d5c-cfda3be1bc4c',NULL,NULL),(0.00,5000000.00,2,1,NULL,'2024-04-25 22:09:00.955211','51b1604f-2c4e-4900-961d-23eeb0b4888e','0fe7328d-5b56-404b-a80d-d1bde9bf7bd2','0fa86ab3-9312-42d8-8bea-cc2c11593429',NULL,NULL),(NULL,1000000.00,1,1,NULL,'2024-04-16 10:45:45.626666','0a6bec7e-b4c2-47f7-ac67-0d22fa29fa85','bec28bae-8e9a-4c75-89c9-7190ac0dc6a3','13e8fb6f-a46c-47e1-86f2-a96b110672b5',NULL,NULL),(NULL,5000000.00,1,2,NULL,'2024-04-16 10:41:55.106630','51b1604f-2c4e-4900-961d-23eeb0b4888e','35ba3655-489e-4494-95b6-f72567c64473','16ce04ea-ae5d-4537-82f8-41d1293ca91f',NULL,NULL),(0.00,5000000.00,2,1,NULL,'2024-04-25 22:04:26.921311','495f19b5-5d24-4c8b-9a8a-53aa99a6f5a9','8dd1259a-5b14-418a-a79d-6fc77f6e8e0f','3db91081-f435-461d-b136-a20540b7a4a5',NULL,NULL),(0.00,5000000.00,1,1,NULL,'2024-04-25 21:52:18.842079','51b1604f-2c4e-4900-961d-23eeb0b4888e','bdea8992-ce1f-42f9-9751-3555a2ebad34','41ee8e66-1037-4cdf-a80e-d380e3d355c9',NULL,NULL),(0.00,5000000.00,1,1,NULL,'2024-04-25 21:52:13.159145','495f19b5-5d24-4c8b-9a8a-53aa99a6f5a9','bdea8992-ce1f-42f9-9751-3555a2ebad34','42df48e2-92d9-42fc-b006-1b5864b8b7f8',NULL,NULL),(0.00,5000000.00,1,1,NULL,'2024-04-16 10:38:25.840083','495f19b5-5d24-4c8b-9a8a-53aa99a6f5a9','d30baa1f-24b7-4a52-b5a3-f52c2c44fcbe','5bc243c3-c5ed-4d7d-9065-b1e3b9075825',NULL,NULL),(0.00,5000000.00,2,1,NULL,'2024-04-25 21:51:49.432665','495f19b5-5d24-4c8b-9a8a-53aa99a6f5a9','4dddca2a-5ed3-4a80-a248-7791dd64431f','68edd400-dc5e-47ca-96f4-d17ba82b23be',NULL,NULL),(0.00,5000000.00,1,1,NULL,'2024-04-30 21:27:43.827265','495f19b5-5d24-4c8b-9a8a-53aa99a6f5a9','dcb115f8-eac5-4987-8184-e69f10256df7','a1f4666a-c1cb-4957-b1a6-56849bb370fd',NULL,NULL),(0.00,5000000.00,1,1,NULL,'2024-04-25 22:04:32.635226','51b1604f-2c4e-4900-961d-23eeb0b4888e','8dd1259a-5b14-418a-a79d-6fc77f6e8e0f','a9b2f02f-049d-41fe-8fc6-f651e3e2a21d',NULL,NULL),(0.00,5000000.00,1,1,NULL,'2024-04-25 22:02:04.628014','495f19b5-5d24-4c8b-9a8a-53aa99a6f5a9','af658b1c-c539-4097-bcf5-426ca7660aa6','c0a7ea48-2b43-47f2-bca6-601b393cc755',NULL,NULL),(0.00,5000000.00,1,1,NULL,'2024-04-16 10:28:19.819224','495f19b5-5d24-4c8b-9a8a-53aa99a6f5a9','d4982a79-5e75-40cc-8ec7-4f09b6864932','d2faa091-689d-49f8-874c-2b9ca3787441',NULL,NULL),(NULL,5000000.00,1,1,NULL,'2024-04-16 11:12:04.482489','51b1604f-2c4e-4900-961d-23eeb0b4888e','9675c5bb-ccc1-4745-ae76-e89e051ed057','d7041df2-f87c-4427-a500-daa87a8fde15',NULL,NULL),(10000.00,2990000.00,1,1,NULL,'2024-04-16 10:38:21.756008','3b14ecb8-3f21-4824-b7f7-9bf32d18c2a5','d30baa1f-24b7-4a52-b5a3-f52c2c44fcbe','e4900901-09b6-4da2-bbae-f2a9e5029978',NULL,NULL),(NULL,1800000.00,2,1,NULL,'2024-04-16 10:45:45.614629','9a9d726e-8451-4952-8bf6-40ad51c8630c','bec28bae-8e9a-4c75-89c9-7190ac0dc6a3','ec582a01-36b2-46a9-bd47-b107636d62b5',NULL,NULL);
/*!40000 ALTER TABLE `hoa_don_chi_tiet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khuyen_mai`
--

DROP TABLE IF EXISTS `khuyen_mai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khuyen_mai` (
  `gia_tri_khuyen_mai` decimal(38,2) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  `ngay_bat_dau` datetime(6) DEFAULT NULL,
  `ngay_ket_thuc` datetime(6) DEFAULT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `loai` varchar(255) DEFAULT NULL,
  `ma` varchar(255) DEFAULT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  `ten` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khuyen_mai`
--

LOCK TABLES `khuyen_mai` WRITE;
/*!40000 ALTER TABLE `khuyen_mai` DISABLE KEYS */;
INSERT INTO `khuyen_mai` VALUES (10.00,1,'2024-04-16 10:36:59.000000','2024-05-18 10:36:51.000000','2024-05-02 13:44:56.382000',NULL,'a7f090c9-7971-4193-a5ac-45bd3a2203aa','Phần trăm','Khai trương',NULL,NULL,'Khai trương'),(10000.00,2,'2024-04-16 10:30:06.270000','2024-05-01 10:29:17.616000',NULL,'2024-04-16 10:29:31.085000','e745b292-9abb-41d1-944d-a8c55eb66a61','Tiền mặt','Sale',NULL,NULL,'Chào mừng 30/4 -1/5');
/*!40000 ALTER TABLE `khuyen_mai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kich_thuoc`
--

DROP TABLE IF EXISTS `kich_thuoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kich_thuoc` (
  `trang_thai` int NOT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `ma` varchar(255) DEFAULT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  `ten` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kich_thuoc`
--

LOCK TABLES `kich_thuoc` WRITE;
/*!40000 ALTER TABLE `kich_thuoc` DISABLE KEYS */;
INSERT INTO `kich_thuoc` VALUES (0,NULL,'2024-04-30 21:39:31.481786','14da366c-a175-4d4f-ba8d-ca449babe2a2','KT-4',NULL,NULL,'38'),(0,NULL,'2024-04-16 10:16:41.089292','4048e418-fed7-4b48-a58c-1d40fffea522','KT-2',NULL,NULL,'36'),(0,NULL,'2024-04-16 10:16:37.044989','94968aa9-eec3-4c91-b606-0eed4735f9c7','KT-1',NULL,NULL,'35'),(0,NULL,'2024-04-30 21:39:24.788520','a9363e3f-db89-46ea-820b-db7cd97e9d99','KT-3',NULL,NULL,'37');
/*!40000 ALTER TABLE `kich_thuoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lich_su_diem`
--

DROP TABLE IF EXISTS `lich_su_diem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lich_su_diem` (
  `diem` int NOT NULL,
  `trang_thai` int NOT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `cong_thuc_id` varchar(255) DEFAULT NULL,
  `hoa_don_id` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  `tai_khoan_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8sicogc46qqa07pan1nysglh` (`cong_thuc_id`),
  KEY `FKc5xk6t1jeefnsj45rbuicfacm` (`hoa_don_id`),
  KEY `FKi20ixwl8h0xsgey6n0s1p1hns` (`tai_khoan_id`),
  CONSTRAINT `FK8sicogc46qqa07pan1nysglh` FOREIGN KEY (`cong_thuc_id`) REFERENCES `cong_thuc` (`id`),
  CONSTRAINT `FKc5xk6t1jeefnsj45rbuicfacm` FOREIGN KEY (`hoa_don_id`) REFERENCES `hoa_don` (`id`),
  CONSTRAINT `FKi20ixwl8h0xsgey6n0s1p1hns` FOREIGN KEY (`tai_khoan_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lich_su_diem`
--

LOCK TABLES `lich_su_diem` WRITE;
/*!40000 ALTER TABLE `lich_su_diem` DISABLE KEYS */;
/*!40000 ALTER TABLE `lich_su_diem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lich_su_hoa_don`
--

DROP TABLE IF EXISTS `lich_su_hoa_don`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lich_su_hoa_don` (
  `trang_thai` int NOT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `hoa_don_id` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `mo_ta_hoat_dong` varchar(255) DEFAULT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKiaf4ysmtefox1a5imh3ojhjsm` (`hoa_don_id`),
  CONSTRAINT `FKiaf4ysmtefox1a5imh3ojhjsm` FOREIGN KEY (`hoa_don_id`) REFERENCES `hoa_don` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lich_su_hoa_don`
--

LOCK TABLES `lich_su_hoa_don` WRITE;
/*!40000 ALTER TABLE `lich_su_hoa_don` DISABLE KEYS */;
INSERT INTO `lich_su_hoa_don` VALUES (4,NULL,'2024-04-25 21:53:12.326529','bdea8992-ce1f-42f9-9751-3555a2ebad34','023af298-38c9-4537-8c61-950d03d20f26',NULL,NULL,'NV1'),(2,NULL,'2024-04-25 21:53:12.326529','bdea8992-ce1f-42f9-9751-3555a2ebad34','06c84df0-7337-414c-b077-c32afbfde309',NULL,NULL,'NV1'),(0,NULL,'2024-04-25 21:51:34.787859','4dddca2a-5ed3-4a80-a248-7791dd64431f','11264f1c-676c-4f37-8cbf-e2ec538d4728',NULL,NULL,'NV1'),(1,NULL,'2024-04-16 11:01:19.085855','c5defe7c-0272-4fcb-a786-fbc38c283baa','135091f2-e941-4fbb-8315-4c4dde7d2685','123',NULL,'NV01'),(4,NULL,'2024-04-25 22:05:51.585436','8dd1259a-5b14-418a-a79d-6fc77f6e8e0f','148df1b7-7d35-4503-8069-08d5bd3bf470',NULL,NULL,'NV1'),(0,NULL,'2024-04-25 21:52:07.299709','bdea8992-ce1f-42f9-9751-3555a2ebad34','16bdfeab-6735-43f6-ab8d-d29cfd66840d',NULL,NULL,'NV1'),(3,NULL,'2024-04-16 10:46:29.461804','bec28bae-8e9a-4c75-89c9-7190ac0dc6a3','1e521ed2-e9a5-43f7-a25c-f86a65c4db31','123',NULL,'NV01'),(0,NULL,'2024-04-16 09:55:39.184971','d4982a79-5e75-40cc-8ec7-4f09b6864932','1f91f638-6405-40c1-a3f6-91531fc9e391',NULL,NULL,NULL),(5,NULL,'2024-04-25 22:09:15.679094','0fe7328d-5b56-404b-a80d-d1bde9bf7bd2','26c2f508-9632-46ea-b620-ba3d48044153',NULL,NULL,'NV1'),(0,NULL,'2024-04-16 10:45:45.664944','bec28bae-8e9a-4c75-89c9-7190ac0dc6a3','26ca3ced-9a06-4a9c-8024-de04b666eb2a',NULL,NULL,'Nguyễn Thị Phương Anh'),(1,NULL,'2024-04-16 10:46:23.232957','bec28bae-8e9a-4c75-89c9-7190ac0dc6a3','2f6c1d2a-01b6-4840-bb76-6f549525fc2b','123',NULL,'NV01'),(3,NULL,'2024-04-30 21:31:52.240986','dcb115f8-eac5-4987-8184-e69f10256df7','3ab8c65f-bc52-4454-ae66-51088bcf9bf3','[NV1-Nguyễn Tùng Dương] đã xác nhận ',NULL,'NV1'),(0,NULL,'2024-04-25 22:04:21.100960','8dd1259a-5b14-418a-a79d-6fc77f6e8e0f','3bc01ea2-fd6c-4f3c-9562-7e23c04dc88c',NULL,NULL,'NV1'),(3,NULL,'2024-04-30 21:37:29.538844','bdea8992-ce1f-42f9-9751-3555a2ebad34','5072d2d4-50ae-4e9c-aa13-005771c381d4','[NV1-Nguyễn Tùng Dương] đã xác nhận ',NULL,'NV1'),(10,NULL,'2024-04-25 23:07:49.161255','35ba3655-489e-4494-95b6-f72567c64473','5478cb7d-4a5c-4913-b57a-323615967c27',NULL,NULL,NULL),(0,NULL,'2024-04-25 21:51:33.385935','af658b1c-c539-4097-bcf5-426ca7660aa6','5a02d7c2-9111-404a-a0bf-70f424498cef',NULL,NULL,'NV1'),(0,NULL,'2024-04-16 10:38:13.569479','d30baa1f-24b7-4a52-b5a3-f52c2c44fcbe','6281faa5-9eab-4b3e-926f-7c1f6a100250',NULL,NULL,NULL),(4,NULL,'2024-04-16 11:01:09.314296','c5defe7c-0272-4fcb-a786-fbc38c283baa','638de72f-5b2e-43ff-82b8-de77b29d6acc',NULL,NULL,'Nguyễn Thị Phương Anh'),(3,NULL,'2024-04-30 21:36:15.038734','8dd1259a-5b14-418a-a79d-6fc77f6e8e0f','680d5260-7126-4d6a-8eba-538cd22a83ad','[NV1-Nguyễn Tùng Dương] đã xác nhận ',NULL,'NV1'),(5,NULL,'2024-04-30 21:32:53.252679','dcb115f8-eac5-4987-8184-e69f10256df7','6e1ecb66-43f9-4697-a833-415a45f156fe','[NV1-Nguyễn Tùng Dương] đã xác nhận ',NULL,'NV1'),(0,NULL,'2024-04-16 11:12:08.844613','9675c5bb-ccc1-4745-ae76-e89e051ed057','70cad619-73d5-4719-b5cb-ba1cde37fa78',NULL,NULL,'Nguyễn Thị Phương Anh'),(0,NULL,'2024-04-30 21:05:24.118620','552e8d70-a985-4f22-b17c-72eaed90e54f','74b84912-33d0-4bcc-af82-b6a629006f2e',NULL,NULL,'NV1'),(2,NULL,'2024-04-30 21:28:32.609634','dcb115f8-eac5-4987-8184-e69f10256df7','7875382e-c68c-4b84-9ba4-1ee766dbf236','[NV1-Nguyễn Tùng Dương] đã xác nhận ',NULL,'NV1'),(5,NULL,'2024-04-25 21:52:03.920371','4dddca2a-5ed3-4a80-a248-7791dd64431f','833f23ec-db3a-433a-832a-30817402e942',NULL,NULL,'NV1'),(5,NULL,'2024-04-16 10:46:36.519617','bec28bae-8e9a-4c75-89c9-7190ac0dc6a3','8c2fe656-9b14-4644-846a-cfeb0b26cf9e','123',NULL,'NV01'),(1,NULL,'2024-04-25 22:05:51.585436','8dd1259a-5b14-418a-a79d-6fc77f6e8e0f','8f950a15-7bab-4022-abef-efff2fbefdf9',NULL,NULL,'NV1'),(0,NULL,'2024-04-30 21:27:47.867038','dcb115f8-eac5-4987-8184-e69f10256df7','a69c3ff1-1056-47ae-8da3-0dcbc071162f',NULL,NULL,'Nguyễn Thị Phương Anh'),(1,NULL,'2024-04-25 21:46:19.402244','35ba3655-489e-4494-95b6-f72567c64473','a85027a8-8f0c-4fac-bcc5-efb6d4b3e5b0','[NV1-Nguyễn Tùng Dương] đã xác nhận ',NULL,'NV1'),(4,NULL,'2024-04-30 21:32:12.747818','dcb115f8-eac5-4987-8184-e69f10256df7','ae2921cf-3209-4b00-808b-78f531c22089','[NV1-Nguyễn Tùng Dương] đã xác nhận ',NULL,'NV1'),(2,NULL,'2024-04-16 11:01:22.994988','c5defe7c-0272-4fcb-a786-fbc38c283baa','ba3aadcf-15d5-4793-acf3-3ee370be7ede','123',NULL,'NV01'),(3,NULL,'2024-04-16 11:01:29.985003','c5defe7c-0272-4fcb-a786-fbc38c283baa','c356e354-383b-47c0-b6e7-8d3777460505','123',NULL,'NV01'),(4,NULL,'2024-04-16 10:38:01.267205','d4982a79-5e75-40cc-8ec7-4f09b6864932','c3668fa5-6ab2-4dd9-8f42-1ab688d8a3e2',NULL,NULL,'NV1'),(0,NULL,'2024-04-16 11:01:09.340416','c5defe7c-0272-4fcb-a786-fbc38c283baa','ca16e79b-dfbd-44f4-b33b-554e1d1a3bbf',NULL,NULL,'Nguyễn Thị Phương Anh'),(0,NULL,'2024-04-25 22:08:55.250314','0fe7328d-5b56-404b-a80d-d1bde9bf7bd2','cb77c6ae-4747-4f5e-88d4-9414d1b38380',NULL,NULL,'NV1'),(4,NULL,'2024-04-16 10:46:32.046000','bec28bae-8e9a-4c75-89c9-7190ac0dc6a3','d1f3692d-7021-4cf1-a944-7dab3bf65880','123',NULL,'NV01'),(4,NULL,'2024-04-16 10:40:30.673529','d30baa1f-24b7-4a52-b5a3-f52c2c44fcbe','d886ec81-8111-46cf-943c-59d912a610c5',NULL,NULL,'NV1'),(5,NULL,'2024-04-16 11:01:43.195199','c5defe7c-0272-4fcb-a786-fbc38c283baa','db087427-5a05-444d-bc68-e69898ea048a','đã vận chuyển',NULL,'NV01'),(1,NULL,'2024-04-30 21:28:03.982120','dcb115f8-eac5-4987-8184-e69f10256df7','e66e8a07-5280-4cfa-929e-0d612f29b113','[NV1-Nguyễn Tùng Dương] đã xác nhận ',NULL,'NV1'),(2,NULL,'2024-04-16 10:46:26.730584','bec28bae-8e9a-4c75-89c9-7190ac0dc6a3','fa199600-5d69-4ff8-8698-83a9c526f0e0','123',NULL,'NV01'),(0,NULL,'2024-04-16 10:41:55.165968','35ba3655-489e-4494-95b6-f72567c64473','fcb49d68-e040-40d5-9d1e-6de1c9bdd868',NULL,NULL,'Quang huy');
/*!40000 ALTER TABLE `lich_su_hoa_don` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mau_sac`
--

DROP TABLE IF EXISTS `mau_sac`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mau_sac` (
  `trang_thai` int NOT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `ma` varchar(255) DEFAULT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  `ten` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mau_sac`
--

LOCK TABLES `mau_sac` WRITE;
/*!40000 ALTER TABLE `mau_sac` DISABLE KEYS */;
INSERT INTO `mau_sac` VALUES (0,NULL,'2024-04-16 10:18:38.159148','2690f892-81d8-48e2-be1d-0e0654ea1761','#ffffff',NULL,NULL,'white'),(0,NULL,'2024-04-24 20:09:04.302319','9016082a-5dcf-4465-8c4c-40e3ace75f01','#627a6e',NULL,NULL,'green'),(0,NULL,'2024-04-30 21:39:49.102831','d043c295-35d5-4e93-b373-3c0f89398203','#b87a7a',NULL,NULL,'rosybrown'),(0,NULL,'2024-04-16 10:17:14.039921','d738f734-ebab-447b-9117-4769cc370d72','#0d0d0d',NULL,NULL,'black'),(0,NULL,'2024-04-16 10:17:56.458879','f2316617-8eb5-4ad8-bd32-e51eafbf5ba8','#55165e',NULL,NULL,'purple');
/*!40000 ALTER TABLE `mau_sac` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoi_dung`
--

DROP TABLE IF EXISTS `nguoi_dung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoi_dung` (
  `diem` int NOT NULL,
  `gioi_tinh` bit(1) DEFAULT NULL,
  `trang_thai` int NOT NULL,
  `ngay_sinh` bigint DEFAULT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `ngay_tham_gia` datetime(6) DEFAULT NULL,
  `anh` varchar(255) DEFAULT NULL,
  `chuc_vu` varchar(255) DEFAULT NULL,
  `chung_minh_thu` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `hang_khach_hang` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `ma` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  `so_dien_thoai` varchar(255) DEFAULT NULL,
  `ten` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoi_dung`
--

LOCK TABLES `nguoi_dung` WRITE;
/*!40000 ALTER TABLE `nguoi_dung` DISABLE KEYS */;
INSERT INTO `nguoi_dung` VALUES (0,_binary '',0,872467200000,'2024-04-26 09:19:19.518098','2024-04-16 10:05:15.489394','2024-04-16 09:53:00.017556','http://res.cloudinary.com/dm0w2qws8/image/upload/v1714097958/nytevdbircleyyooosja.png','NHANVIEN','001097000103','anhpqph29035@fpt.edu.vn',NULL,'1a11ab3e-27c0-4c19-b131-395510ec6e05','NV2','$2a$12$0bOuzhY2RCoPVwkVXCk8WeNO5H1/k7aYE8870ByEepyCqfDL5EY92',NULL,NULL,'0353541842','Phạm Quang Anh'),(0,_binary '\0',0,1062460800000,NULL,'2024-04-16 10:05:15.489394','2024-04-16 10:05:15.489394','https://res.cloudinary.com/dm0w2qws8/image/upload/v1704871922/lsszfyfclddwfubolbbh.jpg','KHACHHANG','001097000102','anhntpph28990@fpt.edu.vn',NULL,'6eb35ec4-a260-4700-bb19-c5a9476d84dc','KH1','$2a$12$0bOuzhY2RCoPVwkVXCk8WeNO5H1/k7aYE8870ByEepyCqfDL5EY92',NULL,NULL,'0348055118','Nguyễn Thị Phương Anh'),(0,_binary '',0,896313600000,'2024-04-26 09:20:05.674829','2024-04-16 10:08:15.799318','2024-04-16 10:08:15.799318','http://res.cloudinary.com/dm0w2qws8/image/upload/v1714098004/gtbhbpntk93mifzfaj4j.png','KHACHHANG','001097000102','hiepntph29450@fpt.edu.vn',NULL,'813c9650-3161-4620-a1b0-4adbf0357f08','KH2','$2a$12$0bOuzhY2RCoPVwkVXCk8WeNO5H1/k7aYE8870ByEepyCqfDL5EY92',NULL,NULL,'0868998237','Nguyễn Tiến Hiệp'),(0,_binary '',0,872467200000,'2024-04-16 10:04:20.414750','2024-04-16 10:05:15.489394',NULL,'https://res.cloudinary.com/dm0w2qws8/image/upload/v1705929263/t5lak2vcklu1jfcfdpab.jpg','NHANVIEN','001097000109','bindzvl1997@gmail.com',NULL,'9b03dcff-8e27-4845-bc84-27947cfe31c9','NV1','$2a$12$0bOuzhY2RCoPVwkVXCk8WeNO5H1/k7aYE8870ByEepyCqfDL5EY92',NULL,NULL,'0988353709','Nguyễn Tùng Dương');
/*!40000 ALTER TABLE `nguoi_dung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoidung_voucher`
--

DROP TABLE IF EXISTS `nguoidung_voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoidung_voucher` (
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `nguoi_dung_id` varchar(255) DEFAULT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  `trang_thai` enum('DANG_HOAT_DONG','DANG_SU_DUNG','DA_DUNG_HET','KHONG_SU_DUNG','NGUNG_HOAT_DONG','SAP_DIEN_RA','TAM_DUNG') DEFAULT NULL,
  `voucher_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcxr17pys95hqhi022huh6b0ny` (`nguoi_dung_id`),
  KEY `FK70s3xwf0wq75bgakukuua69po` (`voucher_id`),
  CONSTRAINT `FK70s3xwf0wq75bgakukuua69po` FOREIGN KEY (`voucher_id`) REFERENCES `voucher` (`id`),
  CONSTRAINT `FKcxr17pys95hqhi022huh6b0ny` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoidung_voucher`
--

LOCK TABLES `nguoidung_voucher` WRITE;
/*!40000 ALTER TABLE `nguoidung_voucher` DISABLE KEYS */;
INSERT INTO `nguoidung_voucher` VALUES (NULL,'2024-04-16 10:36:18.934944','3f339150-9532-4b2a-badd-ba273e159ef5','6eb35ec4-a260-4700-bb19-c5a9476d84dc',NULL,NULL,'DANG_SU_DUNG','ca2dab15-bf86-44c2-9a42-dbd51c8b2656'),(NULL,'2024-04-16 10:36:18.934944','ce6b3bf0-ae69-4d40-ba47-1af28d1ec524','813c9650-3161-4620-a1b0-4adbf0357f08',NULL,NULL,'DANG_SU_DUNG','ca2dab15-bf86-44c2-9a42-dbd51c8b2656');
/*!40000 ALTER TABLE `nguoidung_voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `san_pham`
--

DROP TABLE IF EXISTS `san_pham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `san_pham` (
  `trang_thai` int NOT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `ma` varchar(255) DEFAULT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  `ten` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `san_pham`
--

LOCK TABLES `san_pham` WRITE;
/*!40000 ALTER TABLE `san_pham` DISABLE KEYS */;
INSERT INTO `san_pham` VALUES (0,NULL,NULL,'8176d7b7-2b85-4cad-b528-c7253ec40969','SP-2',NULL,NULL,'Converse Chuck Taylor All Star Classic'),(0,NULL,NULL,'8a85b683-6c88-45e1-bdfa-4d12c25daa32','SP-3',NULL,NULL,'Nike Air Max'),(0,NULL,NULL,'d81910af-1795-41cd-998f-514d978db49e','SP-1',NULL,NULL,'Vans Sport Low Tri-Tone');
/*!40000 ALTER TABLE `san_pham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thanh_toan`
--

DROP TABLE IF EXISTS `thanh_toan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thanh_toan` (
  `chuyen_khoan` decimal(38,2) DEFAULT NULL,
  `phuong_thuc` int NOT NULL,
  `tien_mat` decimal(38,2) DEFAULT NULL,
  `tong_tien` decimal(38,2) DEFAULT NULL,
  `trang_thai` int NOT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `hoa_don_id` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  `phuong_thuc_vnp` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKklpxpcwtwikunrxtfmqje5vee` (`hoa_don_id`),
  CONSTRAINT `FKklpxpcwtwikunrxtfmqje5vee` FOREIGN KEY (`hoa_don_id`) REFERENCES `hoa_don` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thanh_toan`
--

LOCK TABLES `thanh_toan` WRITE;
/*!40000 ALTER TABLE `thanh_toan` DISABLE KEYS */;
INSERT INTO `thanh_toan` VALUES (NULL,0,10016500.00,10016500.00,0,NULL,'2024-04-16 10:41:55.149595','35ba3655-489e-4494-95b6-f72567c64473','0e068adb-7b46-4cb2-b281-988875d40ff9',NULL,NULL,NULL,NULL),(NULL,0,4950000.00,4950000.00,0,NULL,'2024-04-30 21:27:43.875477','dcb115f8-eac5-4987-8184-e69f10256df7','11035aa1-1d52-4070-9ec8-c4b7bd6a436a',NULL,NULL,NULL,NULL),(NULL,0,16000000.00,16000000.00,1,NULL,'2024-04-25 22:05:39.736675','8dd1259a-5b14-418a-a79d-6fc77f6e8e0f','19c506ea-a856-4834-9ea6-a43ecc42f382',NULL,NULL,'NV1',NULL),(NULL,0,10000000.00,10000000.00,1,NULL,'2024-04-25 21:52:02.845712','4dddca2a-5ed3-4a80-a248-7791dd64431f','3b64871c-4dff-4339-b1fb-6814ecfb2304',NULL,NULL,'NV1',NULL),(NULL,0,20000.00,20000.00,1,NULL,'2024-04-25 21:53:10.431021','bdea8992-ce1f-42f9-9751-3555a2ebad34','61fc13e1-fa22-444c-8640-7d6b8359c938',NULL,NULL,'NV1',NULL),(NULL,0,4979000.00,4979000.00,0,NULL,'2024-04-16 11:12:04.515819','9675c5bb-ccc1-4745-ae76-e89e051ed057','840e266e-2e36-431e-b65a-702eb86c9dc4',NULL,NULL,NULL,NULL),(1029000.00,1,NULL,1029000.00,0,NULL,'2024-04-16 11:01:09.314296','c5defe7c-0272-4fcb-a786-fbc38c283baa','85ee2cd9-d074-4c02-90dd-9b5d579e78da',NULL,NULL,NULL,'47298420'),(NULL,0,10000000.00,10000000.00,1,NULL,'2024-04-25 21:52:57.373761','bdea8992-ce1f-42f9-9751-3555a2ebad34','96a0ca0c-d5c2-43eb-a333-675489beaba5',NULL,NULL,'NV1',NULL),(NULL,0,10000000.00,10000000.00,1,NULL,'2024-04-25 22:09:14.626392','0fe7328d-5b56-404b-a80d-d1bde9bf7bd2','ab50cddc-cc3a-4682-a5d6-b0fbce785400',NULL,NULL,'NV1',NULL),(NULL,0,7940000.00,7940000.00,1,NULL,'2024-04-16 10:40:29.521036','d30baa1f-24b7-4a52-b5a3-f52c2c44fcbe','b1e0b8d7-6f4d-4ac2-a41c-7c33c66e0899',NULL,NULL,'NV1',NULL),(NULL,0,4950000.00,4950000.00,1,NULL,'2024-04-16 10:37:58.803081','d4982a79-5e75-40cc-8ec7-4f09b6864932','b21a1821-32f1-4cb9-ad10-182f657cd394',NULL,NULL,'NV1',NULL),(NULL,0,2779000.00,2779000.00,0,NULL,'2024-04-16 10:45:45.652025','bec28bae-8e9a-4c75-89c9-7190ac0dc6a3','c1a8fc7e-e718-48ea-a981-67da01f9d233',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `thanh_toan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thong_bao`
--

DROP TABLE IF EXISTS `thong_bao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thong_bao` (
  `loai` int NOT NULL,
  `trang_thai` int NOT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `hoa_don_id` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `nguoi_dung` varchar(255) DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKq1moijbsasrb0bbydfjwbwprr` (`hoa_don_id`),
  KEY `FK72gov8dj7m1moph18pfclw2px` (`nguoi_dung`),
  CONSTRAINT `FK72gov8dj7m1moph18pfclw2px` FOREIGN KEY (`nguoi_dung`) REFERENCES `nguoi_dung` (`id`),
  CONSTRAINT `FKq1moijbsasrb0bbydfjwbwprr` FOREIGN KEY (`hoa_don_id`) REFERENCES `hoa_don` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thong_bao`
--

LOCK TABLES `thong_bao` WRITE;
/*!40000 ALTER TABLE `thong_bao` DISABLE KEYS */;
INSERT INTO `thong_bao` VALUES (1,0,NULL,'2024-04-30 21:36:15.101765','8dd1259a-5b14-418a-a79d-6fc77f6e8e0f','02b28de5-a6b7-44d6-b8d7-d925be9ddb57','6eb35ec4-a260-4700-bb19-c5a9476d84dc','Hóa đơn HDTQ1714082660000-4 đang  vận chuyển'),(1,1,NULL,'2024-04-16 11:01:19.098195','c5defe7c-0272-4fcb-a786-fbc38c283baa','02b978af-355f-425d-8e03-9cef0ed01058','6eb35ec4-a260-4700-bb19-c5a9476d84dc','hóa đơn HD7643 đã xác nhận đơn hàng'),(1,0,NULL,NULL,NULL,'0c1c5bbb-52e5-418d-9698-36deeee3c98f',NULL,NULL),(1,0,NULL,NULL,NULL,'0fc16f28-b222-446e-82c0-50b468d56e32',NULL,NULL),(1,0,NULL,NULL,NULL,'109b2c30-6313-4bd6-a133-921dadf7480c',NULL,NULL),(1,0,NULL,NULL,NULL,'13f37334-385e-4dea-96b7-db298988eb9e',NULL,NULL),(1,1,NULL,'2024-04-30 21:28:03.993889','dcb115f8-eac5-4987-8184-e69f10256df7','1615e40c-f110-4f54-8c2d-4d1a46bcf7db','6eb35ec4-a260-4700-bb19-c5a9476d84dc','Hóa đơn HD8527đã xác nhận'),(1,0,NULL,NULL,NULL,'19b2cdf0-3778-434f-9644-ce642520613e',NULL,NULL),(1,0,NULL,NULL,NULL,'1aad2df9-75a2-4641-8282-f79a6c2c06d2',NULL,NULL),(1,0,NULL,NULL,NULL,'1b5c5272-26a8-4aa7-84a0-f83a7aa95b05',NULL,NULL),(1,0,NULL,NULL,NULL,'1c94911c-2c13-41a9-8f58-2b4c5cbd88d5',NULL,NULL),(0,0,NULL,'2024-04-16 10:45:45.658416','bec28bae-8e9a-4c75-89c9-7190ac0dc6a3','1fc4f32e-931c-4a00-8151-3606a0ae3d93','6eb35ec4-a260-4700-bb19-c5a9476d84dc','hóa đơn HD2047 chờ xác nhận'),(1,0,NULL,NULL,NULL,'214ca88a-87ee-4ee5-9fdf-15bae96d2804',NULL,NULL),(1,0,NULL,NULL,NULL,'2515dda9-93a5-47af-81dd-0e52d30a7836',NULL,NULL),(1,0,NULL,NULL,NULL,'25892145-976d-4860-bcce-a13dfff6fba8',NULL,NULL),(0,0,NULL,'2024-04-16 11:12:08.829146','9675c5bb-ccc1-4745-ae76-e89e051ed057','2abd598b-f2bf-4353-a504-0857dc7438e1','6eb35ec4-a260-4700-bb19-c5a9476d84dc','hóa đơn HD7090 chờ xác nhận'),(1,0,NULL,NULL,NULL,'2d155ac6-6d3c-4a78-9481-0751bc4f0ab2',NULL,NULL),(1,0,NULL,NULL,NULL,'2dd2522e-7796-4993-9fd5-7ee1d266b9d6',NULL,NULL),(1,0,NULL,NULL,NULL,'2eff4a1a-b79f-458b-bf43-055892367008',NULL,NULL),(1,0,NULL,NULL,NULL,'2f9db8fa-050c-4759-b0ac-5c1fb93720c8',NULL,NULL),(1,0,NULL,NULL,NULL,'2ffc6cc5-f38d-41c1-b123-60fa53d2912c',NULL,NULL),(1,0,NULL,NULL,NULL,'34042e93-8d03-4614-a11a-f376ece94927',NULL,NULL),(1,0,NULL,NULL,NULL,'348e11f7-fc69-4549-bbb5-e097ec2dbe0f',NULL,NULL),(1,1,NULL,'2024-04-16 10:46:36.530833','bec28bae-8e9a-4c75-89c9-7190ac0dc6a3','349e1a54-df96-4c1c-bd9d-779231d72f4e','6eb35ec4-a260-4700-bb19-c5a9476d84dc','hóa đơn HD2047 đã xác nhận đơn hàng'),(1,0,NULL,NULL,NULL,'36983d52-729a-4222-ba08-06c8ade85515',NULL,NULL),(1,0,NULL,NULL,NULL,'395778f1-3030-4a7e-8698-907dc96df79e',NULL,NULL),(1,0,NULL,NULL,NULL,'3a7e31ac-76ab-412f-947a-4246d5899de5',NULL,NULL),(1,0,NULL,NULL,NULL,'3b65e1e5-6be3-4405-8ed9-6267dfbb2b00',NULL,NULL),(1,0,NULL,NULL,NULL,'3b881f58-95d2-48ba-993f-6b7ddfbbf3d1',NULL,NULL),(1,0,NULL,NULL,NULL,'3e6261ec-e4c4-4874-b3a2-e15d4c785a8b',NULL,NULL),(1,0,NULL,NULL,NULL,'3e77b1ec-c8e4-4884-b656-f3ff3e81180b',NULL,NULL),(1,0,NULL,NULL,NULL,'41d8d24b-3dee-4f4c-b972-3bc7dc2c6326',NULL,NULL),(1,0,NULL,NULL,NULL,'438d20eb-2c13-42fa-a863-a732e95f7238',NULL,NULL),(1,0,NULL,NULL,NULL,'47669b7d-2910-43a1-8eda-bfcc542330c3',NULL,NULL),(1,0,NULL,NULL,NULL,'4c10bd20-cc2e-4dbf-941c-ffba8c0f729c',NULL,NULL),(1,0,NULL,NULL,NULL,'4ca4155d-b00a-4e22-9ccc-dda5364b1b56',NULL,NULL),(1,0,NULL,NULL,NULL,'4e5cf46c-892d-4ba2-91be-eaeeb246a478',NULL,NULL),(1,0,NULL,NULL,NULL,'523999ce-074d-4902-8769-a609e37b7818',NULL,NULL),(1,0,NULL,NULL,NULL,'56437397-301c-447b-aa8c-cc1aabd8fc98',NULL,NULL),(1,0,NULL,NULL,NULL,'57f94c81-e4e2-4e4a-9931-29bed5543bfe',NULL,NULL),(1,0,NULL,NULL,NULL,'582dfc78-52c9-470b-a734-0a447778cfd0',NULL,NULL),(1,0,NULL,NULL,NULL,'5a516d4a-3139-42a0-8293-301e76994bb4',NULL,NULL),(1,0,NULL,NULL,NULL,'5b11dcad-2def-46cf-9dae-a5ffd79844e9',NULL,NULL),(0,1,NULL,'2024-04-30 21:27:47.855812','dcb115f8-eac5-4987-8184-e69f10256df7','5e2dbf97-8c09-4eb9-b47d-299327cf2c21','6eb35ec4-a260-4700-bb19-c5a9476d84dc','hóa đơn HD8527 chờ xác nhận'),(1,0,NULL,NULL,NULL,'5fbab0fa-77f0-42ef-8e99-e13392626505',NULL,NULL),(1,0,NULL,NULL,NULL,'63e88338-1abc-49a7-8feb-ee408cdacee4',NULL,NULL),(1,0,NULL,NULL,NULL,'64a7771a-c4c1-42c7-a777-320e10a1fe07',NULL,NULL),(1,0,NULL,NULL,NULL,'662eec56-541c-4b0f-94c8-6bcb3fce2323',NULL,NULL),(1,1,NULL,'2024-04-16 11:01:23.005518','c5defe7c-0272-4fcb-a786-fbc38c283baa','67c55ec4-8c0d-4d01-b414-2b81bdbf5f9e','6eb35ec4-a260-4700-bb19-c5a9476d84dc','hóa đơn HD7643 đã xác nhận đơn hàng'),(1,0,NULL,'2024-04-25 21:46:19.486377','35ba3655-489e-4494-95b6-f72567c64473','6b450f43-9a12-475c-b7b3-f471bc71eb13',NULL,'hóa đơn HD5786 đã xác nhận đơn hàng'),(1,0,NULL,NULL,NULL,'72bc13e4-3abb-45e6-82ba-0ca095fa6836',NULL,NULL),(1,0,NULL,NULL,NULL,'743186b4-e447-40e5-a63d-964ce62b9659',NULL,NULL),(1,0,NULL,NULL,NULL,'758664f7-7560-4091-9010-11fd0808d728',NULL,NULL),(1,0,NULL,NULL,NULL,'7642e398-ae22-4b03-b7d1-f1a5929ee170',NULL,NULL),(1,0,NULL,NULL,NULL,'780a661d-13fb-4ace-a313-e01ceebc6367',NULL,NULL),(1,0,NULL,NULL,NULL,'78ccb7c6-961c-4683-b975-05fdb6053698',NULL,NULL),(1,1,NULL,'2024-04-16 10:46:26.745070','bec28bae-8e9a-4c75-89c9-7190ac0dc6a3','78e79288-926f-46c0-b9e2-dd5a1fff04a4','6eb35ec4-a260-4700-bb19-c5a9476d84dc','hóa đơn HD2047 đã xác nhận đơn hàng'),(1,0,NULL,NULL,NULL,'79235d6b-205f-4dba-8041-ae223d61d336',NULL,NULL),(1,0,NULL,NULL,NULL,'7a06027a-f819-4390-9c2d-a4019dff72d4',NULL,NULL),(1,0,NULL,NULL,NULL,'7ab2ede9-b9d4-489e-b206-5beaa519e239',NULL,NULL),(1,0,NULL,NULL,NULL,'854205db-3bc9-4f25-a523-fc5652c6d38b',NULL,NULL),(0,0,NULL,'2024-04-16 10:41:55.156848','35ba3655-489e-4494-95b6-f72567c64473','8ebf8847-6c5a-4737-ac1a-2387ddff4b62',NULL,'hóa đơn HD5786 chờ xác nhận'),(1,0,NULL,NULL,NULL,'9488e7e9-12b3-405e-9b82-a69f154d4c83',NULL,NULL),(1,0,NULL,'2024-04-30 21:31:52.254315','dcb115f8-eac5-4987-8184-e69f10256df7','961747be-8fee-4052-b903-2ca80fbc3e4c','6eb35ec4-a260-4700-bb19-c5a9476d84dc','Hóa đơn HD8527đang  vận chuyển'),(1,0,NULL,NULL,NULL,'962cd972-398d-4cde-8552-96b1770e309d',NULL,NULL),(1,0,NULL,NULL,NULL,'99401cb2-e36d-4427-995e-e417d401251a',NULL,NULL),(1,1,NULL,'2024-04-16 10:46:32.055552','bec28bae-8e9a-4c75-89c9-7190ac0dc6a3','9ad65a89-5174-4430-89b6-23dd374c660f','6eb35ec4-a260-4700-bb19-c5a9476d84dc','hóa đơn HD2047 đã xác nhận đơn hàng'),(1,0,NULL,NULL,NULL,'9b1438f4-1a33-49cb-8762-ad1c27f79204',NULL,NULL),(1,0,NULL,'2024-04-30 21:37:29.549343','bdea8992-ce1f-42f9-9751-3555a2ebad34','9c40b7b5-54c7-42bb-a2f1-c3865e1b4987','6eb35ec4-a260-4700-bb19-c5a9476d84dc','Hóa đơn HDTQ1714081927000-3 đang  vận chuyển'),(1,0,NULL,NULL,NULL,'a3c720dc-3175-48e0-a055-088037fd1ae8',NULL,NULL),(1,0,NULL,NULL,NULL,'a634f24f-2c96-4a55-a0d6-e2b8480006e5',NULL,NULL),(1,0,NULL,NULL,NULL,'ad9c01c8-2a2b-44c2-97ef-1419bf4a3ac2',NULL,NULL),(1,0,NULL,NULL,NULL,'b11508e0-c2fa-44f7-9a73-7da7bd507531',NULL,NULL),(1,0,NULL,NULL,NULL,'b11bd47c-f356-4fb3-b948-297485acd7df',NULL,NULL),(1,0,NULL,NULL,NULL,'b1e490dc-0c50-4e94-b7e0-ce5cb6c6c53a',NULL,NULL),(1,1,NULL,'2024-04-16 11:01:29.996434','c5defe7c-0272-4fcb-a786-fbc38c283baa','b59ca33d-1fff-42af-b543-a4cba2fdd3bf','6eb35ec4-a260-4700-bb19-c5a9476d84dc','hóa đơn HD7643 đã xác nhận đơn hàng'),(1,0,NULL,NULL,NULL,'b666dfa4-a04b-4836-ac89-6590caf8ceaf',NULL,NULL),(1,0,NULL,NULL,NULL,'bfb360f6-50ec-4d7e-85bd-cf19d6f15595',NULL,NULL),(1,0,NULL,NULL,NULL,'c218d1ae-1e56-40c3-ab9f-3e3cae223334',NULL,NULL),(1,0,NULL,NULL,NULL,'cc584bb6-8af9-46a8-ba14-56f2b6015a15',NULL,NULL),(1,0,NULL,NULL,NULL,'cfcc1203-f71b-44c7-acfd-11253f8fa72f',NULL,NULL),(1,0,NULL,NULL,NULL,'d0e53aaf-1180-4ffd-ad9d-a243b5aec115',NULL,NULL),(1,1,NULL,'2024-04-16 11:01:43.209213','c5defe7c-0272-4fcb-a786-fbc38c283baa','d2eb4b19-749f-4e90-9740-57976e14bdcb','6eb35ec4-a260-4700-bb19-c5a9476d84dc','hóa đơn HD7643 đã xác nhận đơn hàng'),(1,0,NULL,NULL,NULL,'d325fb10-df04-40c2-a76a-fa3261a0363c',NULL,NULL),(1,0,NULL,NULL,NULL,'d80a7b38-5f21-4d35-bf0e-2d9e5a38b36b',NULL,NULL),(1,0,NULL,NULL,NULL,'d9f47904-d6e0-4cbb-9412-c9f8aaf01daf',NULL,NULL),(1,0,NULL,NULL,NULL,'da399d74-ca97-4950-9d08-91e25407265e',NULL,NULL),(1,1,NULL,'2024-04-16 10:46:23.245172','bec28bae-8e9a-4c75-89c9-7190ac0dc6a3','da81b9ee-bb21-403e-a445-3b63744ef75f','6eb35ec4-a260-4700-bb19-c5a9476d84dc','hóa đơn HD2047 đã xác nhận đơn hàng'),(1,0,NULL,NULL,NULL,'db391419-b12d-4573-9a1a-a16a44932588',NULL,NULL),(1,0,NULL,NULL,NULL,'e05b033c-8152-409b-8546-be61aa96f513',NULL,NULL),(0,0,NULL,'2024-04-16 11:01:09.331921','c5defe7c-0272-4fcb-a786-fbc38c283baa','e0eb05f9-893d-4c9d-a525-540404eb9328','6eb35ec4-a260-4700-bb19-c5a9476d84dc','hóa đơn HD7643 chờ xác nhận'),(1,0,NULL,NULL,NULL,'e54a0c94-6100-4e63-b120-1b34cb863922',NULL,NULL),(1,0,NULL,NULL,NULL,'e6161b23-ebcc-4862-b8e5-9c0638cfc13e',NULL,NULL),(1,0,NULL,'2024-04-30 21:32:12.763333','dcb115f8-eac5-4987-8184-e69f10256df7','e9733913-fa0c-4072-8a4f-981577a63c05','6eb35ec4-a260-4700-bb19-c5a9476d84dc','Hóa đơn HD8527đã thanh toán'),(1,1,NULL,'2024-04-16 10:46:29.471562','bec28bae-8e9a-4c75-89c9-7190ac0dc6a3','e9a62205-0cfc-4eb2-a9c6-9e5c230d6b5e','6eb35ec4-a260-4700-bb19-c5a9476d84dc','hóa đơn HD2047 đã xác nhận đơn hàng'),(1,0,NULL,NULL,NULL,'ec65e608-935b-4fe2-9825-5f8525cf4d99',NULL,NULL),(1,0,NULL,NULL,NULL,'eda972d6-07bc-4be3-8951-0e37c34fcac8',NULL,NULL),(1,0,NULL,NULL,NULL,'f0607060-2555-498c-9ec7-1195d087295d',NULL,NULL),(1,0,NULL,NULL,NULL,'f2ba7a73-8467-4ef7-bf37-bf508aca555c',NULL,NULL),(1,0,NULL,'2024-04-30 21:32:53.262560','dcb115f8-eac5-4987-8184-e69f10256df7','f2e411e5-d309-4380-94e0-3896f7e3a9ec','6eb35ec4-a260-4700-bb19-c5a9476d84dc','Hóa đơn HD8527thành công'),(1,1,NULL,'2024-04-30 21:28:32.627635','dcb115f8-eac5-4987-8184-e69f10256df7','f48c4a24-a5d3-4c96-a12e-1569ed7239f5','6eb35ec4-a260-4700-bb19-c5a9476d84dc','Hóa đơn HD8527chờ vận chuyển'),(1,0,NULL,NULL,NULL,'f523746c-6325-4faa-befa-de3aa1419cb4',NULL,NULL),(1,0,NULL,NULL,NULL,'f90620c2-9ffb-4df6-8adb-b36b806aa3f5',NULL,NULL),(1,0,NULL,NULL,NULL,'fccad655-ff55-4cfa-bdac-c1ed8bf66bf9',NULL,NULL),(1,0,NULL,NULL,NULL,'fe126889-b335-4cbb-9c41-513d5cc0df9f',NULL,NULL),(1,0,NULL,NULL,NULL,'fe41d4aa-26df-4bb4-8003-c8991b58a2f7',NULL,NULL);
/*!40000 ALTER TABLE `thong_bao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tra_hang`
--

DROP TABLE IF EXISTS `tra_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tra_hang` (
  `so_luong` int NOT NULL,
  `trang_thai` int NOT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `chi_tiet_san_pham_id` varchar(255) DEFAULT NULL,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbuhx797nilwfcdpr2y12083ml` (`chi_tiet_san_pham_id`),
  CONSTRAINT `FKbuhx797nilwfcdpr2y12083ml` FOREIGN KEY (`chi_tiet_san_pham_id`) REFERENCES `chi_tiet_san_pham` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tra_hang`
--

LOCK TABLES `tra_hang` WRITE;
/*!40000 ALTER TABLE `tra_hang` DISABLE KEYS */;
INSERT INTO `tra_hang` VALUES (1,0,NULL,'2024-04-25 22:33:57.409147','82a4449d-46ca-4856-a284-acbfd2b36392','lỗi đế giày','3780ce82-bba2-4b8d-a659-81d531d767cf',NULL,NULL),(1,0,NULL,'2024-04-25 23:07:49.067720','51b1604f-2c4e-4900-961d-23eeb0b4888e','lỗi','edeb3c9f-9d52-4eb6-ac08-52eded0c7189',NULL,NULL);
/*!40000 ALTER TABLE `tra_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voucher` (
  `dieu_kien` decimal(38,2) DEFAULT NULL,
  `giam_toi_da` decimal(38,2) DEFAULT NULL,
  `muc_do` int NOT NULL,
  `so_luong` int NOT NULL,
  `ngay_bat_dau` datetime(6) DEFAULT NULL,
  `ngay_ket_thuc` datetime(6) DEFAULT NULL,
  `ngay_sua` datetime(6) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `loai_voucher` varchar(255) DEFAULT NULL,
  `ma` varchar(255) DEFAULT NULL,
  `nguoi_sua` varchar(255) DEFAULT NULL,
  `nguoi_tao` varchar(255) DEFAULT NULL,
  `ten` varchar(255) DEFAULT NULL,
  `trang_thai` enum('DANG_HOAT_DONG','DANG_SU_DUNG','DA_DUNG_HET','KHONG_SU_DUNG','NGUNG_HOAT_DONG','SAP_DIEN_RA','TAM_DUNG') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher`
--

LOCK TABLES `voucher` WRITE;
/*!40000 ALTER TABLE `voucher` DISABLE KEYS */;
INSERT INTO `voucher` VALUES (3000000.00,20000.00,20000,199,'2024-04-25 23:32:51.066000','2024-07-13 10:35:06.000000','2024-04-25 23:31:58.173000',NULL,'acf40169-a8a6-43c3-9345-8a9e15fa078d','Tiền mặt','Sale',NULL,NULL,'Chào mừng 30 tháng 4','DANG_HOAT_DONG'),(2000000.00,50000.00,20,197,'2024-04-16 10:37:03.715000','2024-05-24 10:36:11.165000',NULL,'2024-04-16 10:36:18.777000','ca2dab15-bf86-44c2-9a42-dbd51c8b2656','Phần trăm','Khai trương',NULL,NULL,'Khai trương','DANG_HOAT_DONG');
/*!40000 ALTER TABLE `voucher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-03  0:40:00
