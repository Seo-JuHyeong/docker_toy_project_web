-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Schema car_dealer
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema car_dealer
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `car_dealer` DEFAULT CHARACTER SET utf8mb4;
USE `car_dealer` ;

-- -----------------------------------------------------
-- Table `car_dealer`.`vehicle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_dealer`.`vehicle` (
  `Vin` VARCHAR(30) NOT NULL,
  `Year` VARCHAR(30) NOT NULL,
  `Price` VARCHAR(30) NOT NULL,
  `Fuel` VARCHAR(30) NOT NULL,
  `Seater` VARCHAR(30) NOT NULL,
  `Model` VARCHAR(30) NOT NULL,
  `Color` VARCHAR(30) NOT NULL,
  `Manufacturer` VARCHAR(30) NOT NULL,
  `Vtype` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`Vin`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `car_dealer`.`boat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_dealer`.`boat` (
  `Vin` VARCHAR(30) NOT NULL,
  `Purpose` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`Vin`),
  INDEX `fk_BOAT_VEHICLE_idx` (`Vin` ASC) VISIBLE,
  CONSTRAINT `fk_BOAT_VEHICLE`
    FOREIGN KEY (`Vin`)
    REFERENCES `car_dealer`.`vehicle` (`Vin`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `car_dealer`.`car`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_dealer`.`car` (
  `Vin` VARCHAR(30) NOT NULL,
  `Plate_number` VARCHAR(30) NOT NULL,
  `Mileage` VARCHAR(30) NOT NULL,
  `Ctype` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`Vin`),
  INDEX `fk_CAR_VEHICLE1_idx` (`Vin` ASC) VISIBLE,
  CONSTRAINT `fk_CAR_VEHICLE1`
    FOREIGN KEY (`Vin`)
    REFERENCES `car_dealer`.`vehicle` (`Vin`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `car_dealer`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_dealer`.`customer` (
  `Ssn` VARCHAR(30) NOT NULL,
  `Name` VARCHAR(30) NOT NULL,
  `City` VARCHAR(30) NOT NULL,
  `Town` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`Ssn`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `car_dealer`.`motorcycle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_dealer`.`motorcycle` (
  `Vin` VARCHAR(30) NOT NULL,
  `Displacement` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`Vin`),
  INDEX `fk_MOTORCYCLE_VEHICLE1_idx` (`Vin` ASC) VISIBLE,
  CONSTRAINT `fk_MOTORCYCLE_VEHICLE1`
    FOREIGN KEY (`Vin`)
    REFERENCES `car_dealer`.`vehicle` (`Vin`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `car_dealer`.`reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_dealer`.`reservation` (
  `Vin` VARCHAR(30) NOT NULL,
  `Ssn` VARCHAR(30) NOT NULL,
  `Date` DATE NOT NULL,
  PRIMARY KEY (`Ssn`),
  UNIQUE INDEX `Vin_UNIQUE` (`Vin` ASC) VISIBLE,
  UNIQUE INDEX `Ssn_UNIQUE` (`Ssn` ASC) VISIBLE,
  INDEX `fk_VEHICLE_TO_SALE_VEHICLE1_idx` (`Vin` ASC) VISIBLE,
  CONSTRAINT `fk_RESERVATION_CUSTOMER1`
    FOREIGN KEY (`Ssn`)
    REFERENCES `car_dealer`.`customer` (`Ssn`),
  CONSTRAINT `fk_VEHICLE_TO_SALE_VEHICLE1`
    FOREIGN KEY (`Vin`)
    REFERENCES `car_dealer`.`vehicle` (`Vin`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `car_dealer`.`salesperson`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_dealer`.`salesperson` (
  `Sid` VARCHAR(30) NOT NULL,
  `Name` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`Sid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `car_dealer`.`sale`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_dealer`.`sale` (
  `Vin` VARCHAR(30) NOT NULL,
  `Sid` VARCHAR(30) NOT NULL,
  `Ssn` VARCHAR(30) NOT NULL,
  `Date` DATE NOT NULL,
  UNIQUE INDEX `Vin_UNIQUE` (`Vin` ASC) VISIBLE,
  UNIQUE INDEX `Sid_UNIQUE` (`Sid` ASC) VISIBLE,
  UNIQUE INDEX `Ssn_UNIQUE` (`Ssn` ASC) VISIBLE,
  INDEX `fk_SALE_RESERVATION1` (`Vin` ASC, `Ssn` ASC) VISIBLE,
  CONSTRAINT `fk_SALE_RESERVATION1`
    FOREIGN KEY (`Vin` , `Ssn`)
    REFERENCES `car_dealer`.`reservation` (`Vin` , `Ssn`),
  CONSTRAINT `fk_SALE_SALESPERSON1`
    FOREIGN KEY (`Sid`)
    REFERENCES `car_dealer`.`salesperson` (`Sid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `car_dealer`.`sedan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_dealer`.`sedan` (
  `Vin` VARCHAR(30) NOT NULL,
  `Engine_size` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`Vin`),
  INDEX `fk_SEDAN_CAR1_idx` (`Vin` ASC) VISIBLE,
  CONSTRAINT `fk_SEDAN_CAR1`
    FOREIGN KEY (`Vin`)
    REFERENCES `car_dealer`.`car` (`Vin`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `car_dealer`.`suv`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_dealer`.`suv` (
  `Vin` VARCHAR(30) NOT NULL,
  `Size_grade` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`Vin`),
  INDEX `fk_SUV_CAR1_idx` (`Vin` ASC) VISIBLE,
  CONSTRAINT `fk_SUV_CAR1`
    FOREIGN KEY (`Vin`)
    REFERENCES `car_dealer`.`car` (`Vin`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `car_dealer`.`train`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_dealer`.`train` (
  `Vin` VARCHAR(30) NOT NULL,
  `Speed` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`Vin`),
  INDEX `fk_TRAIN_VEHICLE1_idx` (`Vin` ASC) VISIBLE,
  CONSTRAINT `fk_TRAIN_VEHICLE1`
    FOREIGN KEY (`Vin`)
    REFERENCES `car_dealer`.`vehicle` (`Vin`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `car_dealer`.`truck`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_dealer`.`truck` (
  `Vin` VARCHAR(30) NOT NULL,
  `Tonnage` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`Vin`),
  INDEX `fk_TRUCK_CAR1_idx` (`Vin` ASC) VISIBLE,
  CONSTRAINT `fk_TRUCK_CAR1`
    FOREIGN KEY (`Vin`)
    REFERENCES `car_dealer`.`car` (`Vin`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `car_dealer`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_dealer`.`user` (
  `ID` VARCHAR(30) NOT NULL,
  `Password` VARCHAR(30) NOT NULL,
  `Role` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `car_dealer`.`van`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_dealer`.`van` (
  `Vin` VARCHAR(30) NOT NULL,
  `Purpose` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`Vin`),
  INDEX `fk_VAN_CAR1_idx` (`Vin` ASC) VISIBLE,
  CONSTRAINT `fk_VAN_CAR1`
    FOREIGN KEY (`Vin`)
    REFERENCES `car_dealer`.`car` (`Vin`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

insert into vehicle values ("KHHN6B3CMFR000002","2022년","3500만원","가솔린","5인승","그랜저","어비스 블랙 펄","현대자동차","CAR");
insert into car values ("KHHN6B3CMFR000002","256가 5622","300km","SEDAN");
insert into sedan values ("KHHN6B3CMFR000002","3470cc");

insert into vehicle values ("KKKV3B1HTEF000003","2018년","2700만원","가솔린","5인승","K9","딥 크로마 블루","기아자동차","CAR");
insert into car values ("KKKV3B1HTEF000003","35바 7777","114500km","SEDAN");
insert into sedan values ("KKKV3B1HTEF000003","5038cc");

insert into vehicle values ("KHHC4C1HMBP000001","2022년","6,950만원","수소","5인승","넥쏘","티타늄 그레이 매트","현대자동차","CAR");
insert into car values ("KHHC4C1HMBP000001","09어 8667","785km","SUV");
insert into suv values ("KHHC4C1HMBP000001","중형");

insert into vehicle values ("KKKA3V2KMBP000001","2022년","2900만원","하이브리드","5인승","니로","스노우 화이트 펄","기아자동차","CAR");
insert into car values ("KKKA3V2KMBP000001","021나 0422","200km","SUV");
insert into suv values ("KKKA3V2KMBP000001","소형");

insert into vehicle values ("KKKQ9V7SJRT000002","2019년","1850만원","가솔린","5인승","셀토스","다크 오션 블루","기아자동차","CAR");
insert into car values ("KKKQ9V7SJRT000002","38바 2362","75153km","SUV");
insert into suv values ("KKKQ9V7SJRT000002","소형");

insert into vehicle values ("KHHG9F3NFGF000003","2017년","1300만원","가솔린","5인승","싼타페","팬텀 블랙","현대자동차","CAR");
insert into car values ("KHHG9F3NFGF000003","74마 7247","163000km","SUV");
insert into suv values ("KHHG9F3NFGF000003","중형");

insert into vehicle values ("KKKB1D3FWJK000003","2019년","2200만원","가솔린","5인승","스포티지","파이어리 레드","기아자동차","CAR");
insert into car values ("KKKB1D3FWJK000003","86다 1256","50124km","SUV");
insert into suv values ("KKKB1D3FWJK000003","준중형");

insert into vehicle values ("KGGD4G7JTCW000004","2022년","5800만원","가솔린","5인승","GV80","멜버른 그레이","제네시스","CAR");
insert into car values ("KGGD4G7JTCW000004","305마 7451","4234km","SUV");
insert into suv values ("KGGD4G7JTCW000004","준대형");

insert into vehicle values ("KHHS3N2BDWD000001","2019년","1300만원","디젤","2인승","포터2","블루","현대자동차","CAR");
insert into car values ("KHHS3N2BDWD000001","81라 1685","110124km","TRUCK");
insert into truck values ("KHHS3N2BDWD000001","1톤");

insert into vehicle values ("KKKS2G9GREC000002","2020년","1650만원","LPG","2인승","봉고3","화이트","기아자동차","CAR");
insert into car values ("KKKS2G9GREC000002","72보 9425","88952km","TRUCK");
insert into truck values ("KKKS2G9GREC000002","1.2톤");

insert into vehicle values ("KHHE9X7JRTE000001","2023년","6200만원","LPG","4인승","스타리아 캠퍼 4","크리미 화이트","현대자동차","CAR");
insert into car values ("KHHE9X7JRTE000001","313마 7452","2124km","VAN");
insert into van values ("KHHE9X7JRTE000001","캠핑");

insert into vehicle values ("KHHQ1D4QWEB000002","2017년","1100만원","LPG","12인승","그랜드 스타렉스","실버","현대자동차","CAR");
insert into car values ("KHHQ1D4QWEB000002","72라 1923","181453km","VAN");
insert into van values ("KHHQ1D4QWEB000002","사람 운송");

insert into user values ("12181784", "test1234", "User");
insert into user values ("11111111", "test1234", "Admin");
insert into user values ("24222422", "test1234", "User");
insert into user values ("22222222", "test1234", "Admin");

insert into salesperson values ("11111111", "구정남");
insert into salesperson values ("22222222", "이유진");

insert into customer values ("12181784", "서주형", "인천광역시", "동구");
insert into customer values ("24222422", "정라현", "서울특별시", "강서구");

insert into reservation values ("KKKQ9V7SJRT000002", "24222422", "2022-12-18");

