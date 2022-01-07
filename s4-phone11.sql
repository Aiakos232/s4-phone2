
-- tablo yapısı dökülüyor qbtoesx.phone_messages
CREATE TABLE IF NOT EXISTS `phone_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(50) DEFAULT NULL,
  `number` varchar(50) DEFAULT NULL,
  `messages` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `identifier` (`identifier`),
  KEY `number` (`number`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;



-- tablo yapısı dökülüyor qbtoesx.player_contacts
CREATE TABLE IF NOT EXISTS `player_contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `number` varchar(50) DEFAULT NULL,
  `iban` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `identifier` (`identifier`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;


-- tablo yapısı dökülüyor qbtoesx.player_mails
CREATE TABLE IF NOT EXISTS `player_mails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(50) DEFAULT NULL,
  `sender` varchar(50) DEFAULT NULL,
  `subject` varchar(50) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `read` tinyint(4) DEFAULT 0,
  `mailid` int(11) DEFAULT NULL,
  `date` timestamp NULL DEFAULT current_timestamp(),
  `button` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `identifier` (`identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- tablo yapısı dökülüyor qbtoesx.s4_gallery
CREATE TABLE IF NOT EXISTS `s4_gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` text NOT NULL,
  `resim` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- tablo yapısı dökülüyor qbtoesx.s4_instagram_postlar
CREATE TABLE IF NOT EXISTS `s4_instagram_postlar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner` text NOT NULL,
  `foto` text NOT NULL,
  `efekt` text NOT NULL,
  `yazi` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;



-- tablo yapısı dökülüyor qbtoesx.s4_instagram_takip
CREATE TABLE IF NOT EXISTS `s4_instagram_takip` (
  `takip_eden` text NOT NULL,
  `takip_edilen` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- tablo yapısı dökülüyor qbtoesx.s4_not
CREATE TABLE IF NOT EXISTS `s4_not` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` text NOT NULL,
  `baslik` text NOT NULL,
  `aciklama` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;



-- tablo yapısı dökülüyor qbtoesx.s4_yellowpages
CREATE TABLE IF NOT EXISTS `s4_yellowpages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner` text NOT NULL,
  `mesaj` text NOT NULL,
  `isim` text NOT NULL,
  `telno` text NOT NULL,
  `resim` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;





ALTER TABLE `users` 
ADD COLUMN  `biyografi` text NOT NULL,
ADD COLUMN `bt` int(11) NOT NULL DEFAULT 0,
ADD COLUMN  `iban` varchar(50) DEFAULT NULL,
ADD COLUMN   `phone` longtext DEFAULT NULL,
ADD COLUMN   `profilepicture` longtext DEFAULT NULL,
ADD COLUMN   `background` longtext DEFAULT NULL,;