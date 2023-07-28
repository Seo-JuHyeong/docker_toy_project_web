import express from "express";
import { selectSql, updateSql } from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {

    const data = {
        Sid: req.cookies.Id, // 쿠키에 등록된 Id 값을 Sid key에 value로 저장
    };

    const SalesPersonName = await selectSql.getSalesPersonName(data); // 해당 판매자의 이름 
    const ReservationList = await selectSql. getReservationList(); // 현재 예약 진행 중인 차량 목록

    for (var i = 0; i< ReservationList.length; i++) {
        ReservationList[i].Date = ReservationList[i].Date.toLocaleDateString() // Date type의 기본 날짜 형식 수정 (yyyy. MM. dd.)
    }

    if (req.cookies.Id) {
        res.render('reservation_modify_admin', { // hbs 파일 이름을 넘겨줌
            Sid: req.cookies.Id,
            title: '예약이 진행 중인 차량 목록',
            ReservationList,
            'SalesPersonName': SalesPersonName[0].Name,
        });
    } else {
        res.render('/')
    }
});

router.post('/', async (req, res) => { // 구매 예약 차량 정보 수정 버튼 클릭 시 동작
    
    const vars = req.body;
    var Vin_value = req.body.delBtn;

    const data = {
        Vin: Vin_value,
        Ssn: vars.Ssn,
        Date: vars.Date.replace(/ /g, ''), // Date type 의 data 형식을 맞추기 위해 공백 제거 
    };
    
    await updateSql.updateReservation(data); // 해당 data로 예약 table 수정

    res.send("<script>alert('예약 정보가 수정되었습니다.'); location.href='/reservation_modify_admin';</script>"); 
});

module.exports = router;