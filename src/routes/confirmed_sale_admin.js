import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {

    const data = {
        Sid: req.cookies.Id // 쿠키에 등록된 Id 값을 Sid key에 value로 저장
    };

    const SalesPersonName = await selectSql.getSalesPersonName(data); // 해당 판매자의 이름 
    const CarList_sold = await selectSql.getCarList_sold(data); // 해당 판매자가 판매한 차 목록 
    
    for (var i = 0; i< CarList_sold.length; i++) {
        CarList_sold[i].Date = CarList_sold[i].Date.toLocaleDateString() // Date type의 기본 날짜 형식 수정 (yyyy. mm. dd.)
    }
    
    if (req.cookies.Id) { // 쿠키에 등록된 Id 값이 있는 경우 -> 성공적으로 로그인이 진행된 경우
        res.render('confirmed_sale_admin', { // hbs 파일 이름을 넘겨줌
            Sid: req.cookies.Id,
            'SalesPersonName': SalesPersonName[0].Name,
            title: '판매한 차량 목록',
            CarList_sold,
        });
    } else {
        res.render('/')
    }
});

module.exports = router;