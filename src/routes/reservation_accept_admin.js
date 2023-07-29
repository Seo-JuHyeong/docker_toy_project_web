import express from "express";
import { selectSql, insertSql, deleteSql } from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {

    const data = {
        Sid: req.cookies.Id, // 쿠키에 등록된 Id 값을 Sid key에 value로 저장
    };

    const SalesPersonName = await selectSql.getSalesPersonName(data); // 해당 판매자의 이름 
    const ReservationList = await selectSql.getReservationList(); // 현재 예약 진행 중인 차량 목록

    for (var i = 0; i< ReservationList.length; i++) {
        ReservationList[i].Date = ReservationList[i].Date.toLocaleDateString() // Date type의 기본 날짜 형식 수정 (yyyy. mm. dd.)
    }

    if (req.cookies.Id) { // 쿠키에 등록된 Id 값이 있는 경우 -> 성공적으로 로그인이 진행된 경우
        res.render('reservation_accept_admin', { // hbs 파일 이름을 넘겨줌
            Sid: req.cookies.Id,
            title: '예약이 진행 중인 차량 목록',
            ReservationList,
            'SalesPersonName': SalesPersonName[0].Name,
        });
    } else {
        res.render('/')
    }
});

router.post('/', async (req, res) => { // 구매 예약 차량 거래 승인 버튼 클릭 시 동작
    
    var jsonStr = req.body.delBtn;
    var jsonObj = JSON.parse(jsonStr); // JSON 문자열을 객체로 반환
    
    var today_date = new Date(); // 현재 날짜 반환
    var year = today_date.getFullYear();
    var month = ("0" + (1 + today_date.getMonth())).slice(-2);
    var day = ("0" + today_date.getDate()).slice(-2);
    today_date = year + "-" + month + "-" + day; // yyyy-MM-dd 형태

    const data = {
        Vin: jsonObj.Vin,
        Sid: req.cookies.Id,
        Ssn: jsonObj.Ssn,
        Date: today_date, 
    }; 
    console.log(data)
    
    await insertSql.insertSale(data); // 입력된 정보로 Sale table에 등록
    await deleteSql.deleteReservation(data.Vin)
    res.send("<script>alert('거래가 승인되었습니다.'); location.href='/reservation_accept_admin';</script>"); 
});

module.exports = router;