import express from "express";
import { selectSql, insertSql } from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {

    const CarList_available_reservation_sedan = await selectSql.getCarList_available_reservation_sedan(); // 예약 가능한 Sedan 차량 목록
    const CarList_available_reservation_suv = await selectSql.getCarList_available_reservation_suv(); // 예약 가능한 Suv 차량 목록
    const CarList_available_reservation_truck = await selectSql.getCarList_available_reservation_truck(); // 예약 가능한 Yruck 차량 목록
    const CarList_available_reservation_van = await selectSql.getCarList_available_reservation_van(); // 예약 가능한 Van 차량 목록
    
    const data = {
        Ssn: req.cookies.Id, // 쿠키에 등록된 Id 값을 Ssn key에 value로 저장
    }; 
    const CustomerName = await selectSql.getCustomerName(data); // 해당 고객의 이름 
    
    if (req.cookies.Id) { // 쿠키에 등록된 Id 값이 있는 경우 -> 성공적으로 로그인이 진행된 경우
        res.render('reservation_user', { // hbs 파일 이름을 넘겨줌
            Ssn: req.cookies.Id,
            title: 'SEDAN sector',
            CarList_available_reservation_sedan,
            title2: 'SUV sector',
            CarList_available_reservation_suv,
            title3: 'TRUCK sector',
            CarList_available_reservation_truck,
            title4: 'VAN sector',
            CarList_available_reservation_van,
            'CustomerName': CustomerName[0].Name,
        });
    } else {
        res.render('/')
    }
});


router.post('/', async (req, res) => { // 차량 구매 예약 신청 버튼 클릭 시 동작
    const vars = req.body;
    var Vin_value = req.body.delBtn;
    
    const data = {
        Vin: Vin_value,
        Ssn: req.cookies.Id,
        Date: vars.Reservation_date
    };

    const Count_carList_reserved = await selectSql.getCount_carList_reserved(data); // 해당 사용자가 예약한 차 대수 
    
    if (Count_carList_reserved[0].count >= 5) { // 해당 사용자가 예약한 차 대수가 5대 이상일 경우
        res.send("<script>alert('예약은 최대 5건 가능합니다.'); location.href='/reservation_user';</script>");
    } else {
        const today_date = new Date(); // 현재 날짜 반환 
        const selected_date = new Date(data.Date)
        const diffDate = selected_date.getTime() - today_date.getTime(); // 사용자가 선택한 날짜 - 현재 날짜 
        const diffDate_to_day = Math.round(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일    
        if (diffDate_to_day < 0) { // 사용자가 입력한 날짜가 현재 날짜로부터 과거일 경우
            res.send("<script>alert('해당 날짜는 유효하지 않습니다.'); location.href='/reservation_user';</script>"); 
        }else if (diffDate_to_day > 7) { // 사용자가 입력한 날짜가 현재 날짜로부터 7일 이후인 경우
            res.send("<script>alert('예약은 7일 이내로 가능합니다.'); location.href='/reservation_user';</script>");
        }else {
            await insertSql.insertReservation(data); // 입력된 정보를 예약 table에 삽입
            res.send("<script>alert('예약이 완료되었습니다.'); location.href='/reservation_user';</script>");
        }
    }
});

module.exports = router;