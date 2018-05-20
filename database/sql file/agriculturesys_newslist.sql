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
-- Table structure for table `newslist`
--
USE carsatuva;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newslist` (
  `newsid` INT(11) NOT NULL AUTO_INCREMENT,
  `newsdate` DATE NOT NULL,
  `newsheader` VARCHAR(45) NOT NULL,
  `userid` INT(11) NOT NULL,
  `newscontext` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`newsid`)
) ENGINE=INNODB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newslist`
--

LOCK TABLES `newslist` WRITE;
/*!40000 ALTER TABLE `newslist` DISABLE KEYS */;
INSERT INTO `newslist` VALUES (1,'2016-06-08','华为两款全新神器首曝光：这次玩大了',1,'<div>&nbsp; 小米推出了4G版本的小米笔记本Air，而另一家杀入笔记本领域的手机厂商华为也在憋大招。据业内消息，华为将在2017年推出两款新的笔记本。</div><div><br></div><div>华为目前只有一款笔记本<span style=\"background-color: rgb(255, 255, 0);\">MateBook</span>，12.5寸屏幕，分离式键盘设计，而明年的两款新本分别为<span style=\"background-color: rgb(231, 148, 57);\">13.3寸、15.6寸</span>，均为传统翻盖式笔记本。</div><div><br></div><h2>MateBook由富士康代工，明年两款新本则会分别交给和硕、广达，同样均为<font color=\"#ff0000\">ODM产品</font>。</h2><div><br></div><div>消息人士称，<span style=\"background-color: rgb(107, 165, 74);\">华为两款新笔记本的总出货量预计可超过200万台</span>，尤其在<span style=\"background-color: rgb(255, 0, 0);\">欧洲前景良好</span>。</div><div><br></div><div>顺便一提，<span style=\"background-color: rgb(0, 255, 255);\">小米笔记本是纬</span>创和英业达代工的。</div>'),(28,'2016-12-06','能让水果保鲜俩月的神器来了 你还敢吃吗？',1,'<div>能够吃上新鲜水果当然是最好的，但未必每个人住的地方附近都有一个菜市场可以经常买到新鲜水果，而且事实上有些水果腐坏的速度确实很快，比较典型的例子当属草莓。当一些水果开始出现腐坏的迹象时，就很难再吸引消费者进行购买了，而扔掉对商家来说又是一件十分浪费的事情。</div><div><br></div><div>近日一家名为Apeel Sciences的创业公司为水果研发了一层薄薄的“保护皮”，用它来包裹住的新鲜水果通常可比以往拥有一段更长的保鲜期。</div><div><br></div><div>这一涂层被该公司命名为“Edipeel”，采用无色隐形式设计，覆盖在水果表面不会改变水果的表面颜色。如上面的公司样图所示，一个被喷上了Edipeel 隐形涂层的柠檬，在放置54天后依然保持着新鲜状态，而作为对比参照的另一个没有喷上该涂层的柠檬早已开始腐坏并局部分解了。</div><div><br></div><div>据称，该涂层可在锁住水果水分的同时使其与空气进行隔绝，既减少水分流失也减缓了氧化过程。该涂层的优势还在于它是完全无色无味可食用的一种无毒害保护膜，可以放心地被添加到水果表面。目前已经开发的有蓝莓、芒果、鳄梨和香蕉的专用Edipeel涂层。</div>'),(29,'2016-12-15','Android死忠粉为啥换iPhone？',1,'<div>目前，苹果和谷歌都推出允许用户将数据从对方平台转移到自家平台的应用工具。但是，对于一个普通的消费者来说，让他们改用另一个平台的原因是什么呢？我们来看看外媒PhoneArena的编辑Joe M从Android平台改投iOS的故事。</div><div><br></div><div>这位年轻的编辑表示，一开始，他和他的女友都是Android用户。但是在更换多部Android手机之后，他的女友最终选择了小尺寸的iPhone SE，因此Joe M也选择更换iPhone 7，目的就是为了跟自己亲密的人使用同一品牌的手机。</div>'),(30,'2016-02-26','肯德基上线新点餐系统：推荐啥主要看脸',1,'<div>他们在这家肯德基餐厅安装了图像识别系统，可以通过扫描顾客的面部表情推测顾客的年龄、性别和当时的心情，从而猜测消费者的意愿，推荐合适的餐品。</div><div><br></div><div>在之前的发布会中，百度发言人表示这套系统会向“20多岁的男性顾客推荐脆皮鸡肉汉堡、烤鸡翅加可乐的套餐”，对于50岁的女性顾客，则会推荐“粥和豆浆的早餐”。</div><div><br></div><div>当然，顾客也可能不喜欢系统推荐的餐品，但这些也仅仅是建议而已。这套系统还有内置识别功能，能记录老顾客的订单记录和饮食偏好</div>'),(31,'2016-12-27','vivo Xplay6体验：后置双摄虚化出色',1,'屏幕下方是一枚内置了指纹识别传感器的实体<font color=\"#ff9c00\">Home键</font>，底部边框依然采用的是传统的vivo风格，3.5mm耳机插口，Android标准充电插口和扬声器，看来虽然vivo赶上了双摄的潮流，但是在去3.5mm耳机插口和Type-C的接口上，还需要一段时间。'),(33,'2016-12-31','三星明年将推6英寸Galaxy S8',1,'<div>北京时间12月25日消息，众所周知，Galaxy S7配备一个5.1英寸的显示屏。之前，有传闻称，Galaxy S8将会分为两种版本，分别采用5.1英寸和5.5英寸显示屏。不过，最新的消息称，三星Galaxy S8的显示屏尺寸可能会更大。</div><div><br></div><div>来自韩国媒体MK News爆料称，三星明年4月份将会发布Galaxy S8和Galaxy S8 Plus智能手机，它们分别采用分辨率为2560 x 1440的5英寸和6英寸双曲面显示屏。这也就意味着，三星新旗舰都将会采用双曲面显示屏，不会有标准平面屏。</div><div><br></div><div>同时，三星Galaxy S8系列手机将会取消实体Home键，以提高屏占比，因此6英寸Galaxy S8 Plus的机身看起来比5.7英寸的Galaxy Note 7还要小，边框也是非常地小。</div><div><br></div><div>目前，三星电子已经通知供应商，从下个月起开始为5英寸Galaxy S8和6英寸Galaxy S8 Plus提供零部件，而Galaxy S8系列手机也会像之前报道中的那样延迟至4月份发布。（完）</div>'),(35,'2016-12-07','折叠屏幕将成新潮流',1,'<div>双曲面屏之后，可折叠屏幕将成为智能手机设计的下一个发展趋势。研发折叠屏幕必备原料的公司Kolon Industries的高管在最近透露了一些消息。这位高管表示，2018年会有三家到五家科技公司开始大规模量产可折叠屏幕设备。预计到2019年，可折叠屏幕设备将会在市场上迅速流行，并且未来在韩国本土就将拥有20%的市场份额。</div><div><br></div><div>Kolon Industries的高管表示，Kolon Industries目前已经开始与三星和LG等公司合作，为这些电子巨头生产可折叠显示屏供应无色聚酰亚胺。同时该高管认为，首款折叠屏幕智能手机的屏幕折叠半径大约为5毫米，而并不会立刻达到1毫米的水平，而是逐渐缩小折叠半径。</div><div><br></div><div>从爆料来看，可折叠屏幕设备似乎已经离我们越来越近了，在未来它将不再只是一个概念，而是会搭载到设备中出现。至于这种设计是否能被用户所欢迎，只有时间能证明了。</div>'),(36,'2017-01-01','高铁WiFi这块肥肉：为何迟迟没有人来抢？',1,'<div>春运来了，不少坐高铁迁徙返乡的人们可能又会思考一个问题，高铁上为何没有WiFi？关于高铁上为何没有WiFi这个问题早在几年前就已经被热议过很多次，呼声由来已久。但每逢春运这个时候这种呼声往往更为迫切。</div><div><br></div><div><br></div><div><br></div><div><br></div>'),(37,'2017-01-04','化肥价格由天气说了算',1,'<div><b>化肥价格的涨跌开关并不掌握在行业自身的手里。在不把关税政策作为调控手段的情况下，调控的手段只能是运输和环保。运输是短期的问题，而环保是氮肥、磷肥中长期内价格波动的主要因素。从天气预报看，近期环保压力仍然巨大，尿素产能释放必然受限，价格仍可能走高。</b></div><div><b><br></b></div><div><b>2016年12月23日，2017年中国化肥出口关税政策出台，尿素和磷肥出口实行了零关税，这是继取消了化肥铁路运费、电价、气价等优惠措施和恢复开征增值税后的又一大改革，是化肥市场化的里程碑（钾肥例外），表明化肥从此步入普通商品之列。化肥尤其是尿素，借机大涨，但笔者前期已经做过分析：零关税对氮肥的实际影响不大，对磷肥是实质的利好，这里不做赘述。</b></div><div><b><br></b></div><div><b>对于后期化肥市场的走势，笔者前期曾从估值逻辑、通胀逻辑、外部制约因素等多方面进行了分析，今天作进一步的梳理，从而找出化肥中、长期价格走势的逻辑主线。</b></div><div><b><br></b></div><div><b>笔者定义估值逻辑为成本逻辑，即价格和成本的关系，其下边际为直接材料成本，其上边际为完全成本：当价格接触下边际时，供应就会大幅缩减；当价格达到上边际时，供应就会增加（必须有过剩产能存在作为前提），因此尿素和磷肥价格的第一阶段上涨为估值修复逻辑。</b></div>');
/*!40000 ALTER TABLE `newslist` ENABLE KEYS */;
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
