import express from "express";
import { selectSql, deleteSql } from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {

    const data = {
        Ssn: req.cookies.Id // 쿠키에 등록된 Id 값을 Ssn key에 value로 저장
    };

    const CustomerName = await selectSql.getCustomerName(data); // 해당 고객의 이름 
    const CarList_reserved = await selectSql.getCarList_reserved(data); // 예약한 차 목록 
    
    for (var i = 0; i< CarList_reserved.length; i++) {
        CarList_reserved[i].Date = CarList_reserved[i].Date.toLocaleDateString() // Date type의 기본 날짜 형식 수정 (yyyy. MM. dd.)
    }
    
    if (req.cookies.Id) { // 쿠키에 등록된 Id 값이 있는 경우 -> 성공적으로 로그인이 진행된 경우
        res.render('view_delete_user', { // hbs 파일 이름을 넘겨줌
            Ssn: req.cookies.Id,
            'CustomerName': CustomerName[0].Name,
            title: '예약한 차량 목록',
            CarList_reserved,
        });
    } else {
        res.render('/')
    }
});


router.post('/', async (req, res) => { // 차량 구매 예약 취소 버튼 클릭 시 동작
    const vars = req.body;
    var Vin_value = req.body.delBtn;
    
    const data = {
        Vin: Vin_value,
        Ssn: req.cookies.Id,
    };
    
    await deleteSql.deleteReservation_user(data); // 해당 차대 번호와 고객으로 등록된 예약 정보를 삭제  
    
    res.send("<script>alert('예약이 취소되었습니다.'); location.href='/view_delete_user';</script>"); 
});

module.exports = router;