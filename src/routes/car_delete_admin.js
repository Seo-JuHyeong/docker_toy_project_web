import express from "express";
import { selectSql, deleteSql } from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {

    const CarList_sedan = await selectSql.getCarList_sedan(); // 현재 등록된 판매되지 않은 Sedan 차량 목록
    const CarList_suv = await selectSql.getCarList_suv(); // 현재 등록된 판매되지 않은 Suv 차량 목록
    const CarList_truck = await selectSql.getCarList_truck(); // 현재 등록된 판매되지 않은 Truck 차량 목록
    const CarList_van = await selectSql.getCarList_van(); // 현재 등록된 판매되지 않은 Van 차량 목록

    const data = {
        Sid: req.cookies.Id, // 쿠키에 등록된 Id 값을 Sid key에 value로 저장 
    };

    const SalesPersonName = await selectSql.getSalesPersonName(data); // 해당 판매자의 이름 

    if (req.cookies.Id) { // 쿠키에 등록된 Id 값이 있는 경우 -> 성공적으로 로그인이 진행된 경우
        res.render('car_delete_admin', { // hbs 파일 이름을 넘겨줌
            Sid: req.cookies.Id,
            title: 'SEDAN 차량 정보 삭제',
            CarList_sedan,
            title2: 'SUV 차량 정보 삭제',
            CarList_suv,
            title3: 'TRUCK 차량 정보 삭제',
            CarList_truck,
            title4: 'VAN 차량 정보 삭제',
            CarList_van,
            'SalesPersonName': SalesPersonName[0].Name,
        });
    } else { 
        res.render('/')
    }
});


router.post('/', async (req, res) => { // 차량 정보 삭제 버튼 클릭 시 동작
    
    var Vin_value = req.body.delBtn;

    const data = {
        Vin: Vin_value,
    }; 
    
    const CarType = await selectSql.getCarType(data); // 해당 Vin 값에 대한 차량 Type을 반환

    const Reservation_status = await selectSql.getReservation_status(data) // 해당 Vin 값에 대한 차량의 에약 여부를 판별

    if(Reservation_status[0].Reservation_status == 1) { // 예약이 진행 중인 차 -> 예약 취소 처리 후 삭제 유도
        res.send("<script>alert('해당 차량은 예약이 진행 중입니다. 예약 취소 처리 후 삭제 가능합니다.'); location.href='/car_delete_admin';</script>");
    }else if (Reservation_status[0].Reservation_status == 0) { // 예약이 진행 되지 않고 있으므로 바로 삭제 가능
        if (CarType[0].Ctype == "SEDAN") {
            await deleteSql.deleteSedan(data); // Sedan table에서 해당 Vin의 차량 정보 삭제 (Car table에 대한 서브 클래스)
        } else if (CarType[0].Ctype == "SUV") {
            await deleteSql.deleteSuv(data); // Suv table에서 해당 Vin의 차량 정보 삭제 (Car table에 대한 서브 클래스)
        } else if (CarType[0].Ctype == "TRUCK") {
            await deleteSql.deleteTruck(data); // Truck table에서 해당 Vin의 차량 정보 삭제 (Car table에 대한 서브 클래스)
        } else if (CarType[0].Ctype == "VAN") {
            await deleteSql.deleteVan(data); // Van table에서 해당 Vin의 차량 정보 삭제 (Car table에 대한 서브 클래스)
        }
        await deleteSql.deleteCar(data); // Car table에서 해당 Vin의 차량 정보 삭제 (Vehicle table에 대한 서브 클래스)
        await deleteSql.deleteVehicle(data); // Vehicle table에서 해당 Vin의 차량 정보 삭제 (슈퍼 클래스)
        res.send("<script>alert('차량이 삭제되었습니다.'); location.href='/car_delete_admin';</script>"); 
    }
});

module.exports = router;