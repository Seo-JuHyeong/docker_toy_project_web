import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {

    const data = {
        Ssn: req.cookies.Id // 쿠키에 등록된 Id 값을 Ssn key에 value로 저장
    };

    const CustomerName = await selectSql.getCustomerName(data); // 해당 고객의 이름 
    const CarList_purchased = await selectSql.getCarList_purchased(data); // 해당 고객이 구매한 차 목록 
    
    for (var i = 0; i< CarList_purchased.length; i++) {
        CarList_purchased[i].Date = CarList_purchased[i].Date.toLocaleDateString() // Date type의 기본 날짜 형식 수정 (yyyy. mm. dd.)
    }
    
    if (req.cookies.Id) { // 쿠키에 등록된 Id 값이 있는 경우 -> 성공적으로 로그인이 진행된 경우
        res.render('confirmed_sale_user', { // hbs 파일 이름을 넘겨줌
            Ssn: req.cookies.Id,
            'CustomerName': CustomerName[0].Name,
            title: '구매한 차량 목록',
            CarList_purchased,
        });
    } else {
        res.render('/')
    }
});

module.exports = router;