import express from "express";
import { selectSql, insertSql } from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {

    const data = {
        Sid: req.cookies.Id, // 쿠키에 등록된 Id 값을 Sid key에 value로 저장
    }; 

    const SalesPersonName = await selectSql.getSalesPersonName(data); // 해당 판매자의 이름 

    if (req.cookies.Id) { // 쿠키에 등록된 Id 값이 있는 경우 -> 성공적으로 로그인이 진행된 경우
        res.render('car_enter_admin', { // hbs 파일 이름을 넘겨줌
            Sid: req.cookies.Id,
            'SalesPersonName': SalesPersonName[0].Name,
        });
    } else {
        res.render('/')
    }
});


router.post('/', async (req, res) => { // 차량 정보 등록 버튼 클릭 시 동작
    
    const vars = req.body;
    var CarType = req.body.delBtn; // 관리자의 차량 정보 입력에 대한 차량 Type을 반환
    
    const data = {
        Vin: vars.Vin,
        Year: vars.Year,
        Price: vars.Price,
        Fuel: vars.Fuel,
        Seater: vars.Seater,
        Model: vars.Model,
        Color: vars.Color,
        Manufacturer: vars.Manufacturer,
        Plate_number: vars.Plate_number,
        Mileage: vars.Mileage,
        Ctype: CarType,
        Engine_size: vars.Engine_size,
        Size_grade: vars.Size_grade,
        Tonnage: vars.Tonnage,
        Purpose: vars.Purpose
    }; 

    await insertSql.insertVehicle(data); // 입력된 정보를 Vehicel table에 삽입 (슈퍼클래스)
    await insertSql.insertCar(data); // 입력된 정보를 Car table에 삽입 (Vehicle table에 대한 서브 클래스)

    if (CarType == "SEDAN") {
        await insertSql.insertSedan(data); // 입력된 정보를 Sedan table에 삽입 (Car table에 대한 서브 클래스)
    } else if (CarType == "SUV") {
        await insertSql.insertSuv(data); // 입력된 정보를 Suv table에 삽입 (Car table에 대한 서브 클래스)
    } else if (CarType == "TRUCK") {
        await insertSql.insertTruck(data); // 입력된 정보를 Truck table에 삽입 (Car table에 대한 서브 클래스)
    } else if (CarType == "VAN") {
        await insertSql.insertVan(data); // 입력된 정보를 Van table에 삽입 (Car table에 대한 서브 클래스)
    }

    res.send("<script>alert('차량이 등록되었습니다.'); location.href='/car_enter_admin';</script>"); 
});

module.exports = router;