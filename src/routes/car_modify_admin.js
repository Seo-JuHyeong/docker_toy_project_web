import express from "express";
import { selectSql, updateSql } from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {

    const CarList_sedan = await selectSql.getCarList_sedan(); // 현재 등록된 판매되지 않은 sedan 차량 목록
    const CarList_suv = await selectSql.getCarList_suv(); // 현재 등록된 판매되지 않은 Suv 차량 목록
    const CarList_truck = await selectSql.getCarList_truck(); // 현재 등록된 판매되지 않은 truck 차량 목록
    const CarList_van = await selectSql.getCarList_van(); // 현재 등록된 판매되지 않은 van 차량 목록

    const data = {
        Sid: req.cookies.Id, // 쿠키에 등록된 Id 값을 Sid key에 value로 저장
    };

    const SalesPersonName = await selectSql.getSalesPersonName(data); // 해당 판매자의 이름 

    if (req.cookies.Id) { // 쿠키에 등록된 Id 값이 있는 경우 -> 성공적으로 로그인이 진행된 경우
        res.render('car_modify_admin', { // hbs 파일 이름을 넘겨줌
            Sid: req.cookies.Id,
            title: 'SEDAN 차량 정보 수정',
            CarList_sedan,
            title2: 'SUV 차량 정보 수정',
            CarList_suv,
            title3: 'TRUCK 차량 정보 수정',
            CarList_truck,
            title4: 'VAN 차량 정보 수정',
            CarList_van,
            'SalesPersonName': SalesPersonName[0].Name,
        });
    } else {
        res.render('/')
    }
});


router.post('/', async (req, res) => { // 차량 정보 수정 버튼 클릭 시 동작
    
    const vars = req.body;
    var Vin_value = req.body.delBtn;

    const data = {
        Vin: Vin_value,
        Year: vars.Year,
        Price: vars.Price,
        Fuel: vars.Fuel,
        Seater: vars.Seater,
        Model: vars.Model,
        Color: vars.Color,
        Manufacturer: vars.Manufacturer,
        Plate_number: vars.Plate_number,
        Mileage: vars.Mileage,
        Engine_size: vars.Engine_size,
        Size_grade: vars.Size_grade,
        Tonnage: vars.Tonnage,
        Purpose: vars.Purpose
    };
    
    await updateSql.updateVehicle(data); // 입력된 정보로 Vehicel table 수정 (슈퍼클래스)
    await updateSql.updateCar(data); // 입력된 정보로 Car table 수정 (Vehicle table에 대한 서브 클래스)

    const CarType = await selectSql.getCarType(data); // 해당 Vin 값에 대한 차량 Type을 반환
    if (CarType[0].Ctype == "SEDAN") {
        await updateSql.updateSedan(data); // 입력된 정보로 Sedan table 수정 (Car table에 대한 서브 클래스)
    } else if (CarType[0].Ctype == "SUV") {
        await updateSql.updateSuv(data); // 입력된 정보로 Suv table 수정 (Car table에 대한 서브 클래스)
    } else if (CarType[0].Ctype == "TRUCK") {
        await updateSql.updateTruck(data); // 입력된 정보로 Truck table 수정 (Car table에 대한 서브 클래스)
    } else if (CarType[0].Ctype == "VAN") {
        await updateSql.updateVan(data); // 입력된 정보로 Van table 수정 (Car table에 대한 서브 클래스)
    }

    res.send("<script>alert('차량 정보가 수정되었습니다.'); location.href='/car_modify_admin';</script>"); 
});

module.exports = router;