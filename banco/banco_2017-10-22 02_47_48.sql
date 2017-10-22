-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.6.17 - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Copiando estrutura do banco de dados para devagri
CREATE DATABASE IF NOT EXISTS `devagri` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_general_ci */;
USE `devagri`;


-- Copiando estrutura para tabela devagri.pluviometro
CREATE TABLE IF NOT EXISTS `pluviometro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(60) COLLATE latin1_general_ci NOT NULL,
  `latitude` varchar(60) COLLATE latin1_general_ci NOT NULL,
  `longitude` varchar(60) COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela devagri.pluviometro: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `pluviometro` DISABLE KEYS */;
/*!40000 ALTER TABLE `pluviometro` ENABLE KEYS */;


-- Copiando estrutura para tabela devagri.pluviometro_medicao
CREATE TABLE IF NOT EXISTS `pluviometro_medicao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor` decimal(10,3) NOT NULL,
  `periodo` datetime NOT NULL,
  `pluviometro_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela devagri.pluviometro_medicao: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `pluviometro_medicao` DISABLE KEYS */;
/*!40000 ALTER TABLE `pluviometro_medicao` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
