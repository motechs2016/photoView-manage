-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-03-19 10:48:41
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `photo_manage`
--

-- --------------------------------------------------------

--
-- 表的结构 `album`
--

CREATE TABLE IF NOT EXISTS `album` (
  `id` varchar(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `num` varchar(10) NOT NULL,
  `pwd` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `album`
--

INSERT INTO `album` (`id`, `name`, `num`, `pwd`) VALUES
('0', '风景', '12', '1234'),
('1', 'NBA', '27', '1234');

-- --------------------------------------------------------

--
-- 表的结构 `photo`
--

CREATE TABLE IF NOT EXISTS `photo` (
  `id` varchar(10) NOT NULL,
  `album` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `src` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `photo`
--

INSERT INTO `photo` (`id`, `album`, `name`, `src`) VALUES
('0', '0', '风景', 'http://7xrbxc.com1.z0.glb.clouddn.com/FpMRD0dBkd3RvB2Bh6_rgw1U6tPA'),
('1', '0', '风景', 'http://7xrbxc.com1.z0.glb.clouddn.com/FkhQ9DKRmIW-Mz9kcjG9GyQWUicF'),
('11', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/lnkwiqp1FS98NfBfTbLznOkHF8Q6'),
('12', '0', '风景', 'http://7xrbxc.com1.z0.glb.clouddn.com/FkzdLRf6vwxbBEahykUc1zqYz0I3'),
('13', '0', '风景', 'http://7xrbxc.com1.z0.glb.clouddn.com/FvfKBVSHJGdSyXib8vXJk9Zd9u6a'),
('14', '0', '风景', 'http://7xrbxc.com1.z0.glb.clouddn.com/FtJ98EnSJmWIaJwoEqXxJpC_4SQ_'),
('15', '0', '风景', 'http://7xrbxc.com1.z0.glb.clouddn.com/FnbhfODk4q_p33AUPj1UkdiNcTvx'),
('16', '0', '风景', 'http://7xrbxc.com1.z0.glb.clouddn.com/FudCIDWwEFiHrU_ZGyygZHx3Lm_s'),
('17', '0', '风景', 'http://7xrbxc.com1.z0.glb.clouddn.com/FtJaIfAeUsaugkty3J5xyRkHVNps'),
('18', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/FnaS3REktR3TNcELKKrVgUD4pAu1'),
('19', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/Fqk_x3oNmQ_ISljwHXXQ42b1akFa'),
('2', '0', '风景', 'http://7xrbxc.com1.z0.glb.clouddn.com/Fm90OgyXUHy-a9MS-oNGlt0Sbj3a'),
('20', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/FuwfXCVh98Z-IPEu_PSqYOPsELqe'),
('21', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/FjsZOFCTNgUg5HqIvdzEa_tkKbhF'),
('22', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/FhBpycq7nq-LKPlxCKh1IbGxrH72'),
('23', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/FrPDCwXaEXqsOQ2H3T9CNijwTORJ'),
('24', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/Fi4OBQMwF-WNGs0sFTBuSP1pYnfd'),
('27', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/Fhvq3k7qCFlxmge-FmgDucNPBDxX'),
('28', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/FrgO_mC-ERshOSt7vT7fk-k3ye8h'),
('29', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/FpgQnCuTcwmqdM1Yq-2haNLFY2bZ'),
('3', '0', '风景', 'http://7xrbxc.com1.z0.glb.clouddn.com/FokPpoouW3oQKQKtU9b3Tz3xOq-d'),
('30', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/FpFmOToq0EpD-YgBZPtrfEq_YYld'),
('31', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/FrFOkMWA11mx8RMXGpvV1cq-Wsl4'),
('32', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/Fqt9uJgdf81lWMeSb3oJTX8WoyV7'),
('33', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/FikiZfZU5u7OvnDQYNci5WfrA3bJ'),
('34', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/FvDH6Mm6nMwiL8N_aMIxoL5ws25o'),
('35', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/FtvR2T207M3KZSUhnrK_6L06e152'),
('36', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/Fk9cTbPQkC2STeJutXkQfjAvDhI-'),
('37', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/FsO_83mU6AwvPvvz-Z5L_Otu6uO0'),
('38', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/Fl-iIaRBUejQayICmJu0VxTG1nwk'),
('39', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/FuunRq_08XqyW7ofu_hybRZki1J4'),
('4', '0', '风景', 'http://7xrbxc.com1.z0.glb.clouddn.com/FpE2wimuJ3tK49bFiIJQATXb4B12'),
('40', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/FgDP7yOnsQUBrw883LnL1adSJLB6'),
('5', '0', '风景', 'http://7xrbxc.com1.z0.glb.clouddn.com/FmLi-yNAkKTCuwDlOPerXx1T3YNH'),
('6', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/FjTGPdxt8NX3ZvV0cuLq3Iv1CrAh'),
('7', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/FloCeTJnJAs6xBoYMH749VjoDTI7'),
('8', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/Fm9gDM5V0bKO24hwIpsU71W3cfbO'),
('9', '1', 'NBA', 'http://7xrbxc.com1.z0.glb.clouddn.com/Fstw2YaPnr6Puv0-GX3JOBxhLa_U');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
