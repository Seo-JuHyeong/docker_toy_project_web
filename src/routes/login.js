import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
import { selectSql } from "../database/sql";

const router = express.Router();

// 쿠키 및 세션 설정
router.use(cookieParser());
router.use(expressSession({
    secret: 'dilab',
    resave: true,
    saveUninitialized: true,
}))

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/admin_main', async (req, res) => { // 관리자 페이지

    const data = {
        Sid: req.cookies.Id, // 쿠키에 등록된 Id 값을 Sid key에 value로 저장
    }; 

    const SalesPersonName = await selectSql.getSalesPersonName(data); // 해당 판매자의 이름 

    res.render('admin_main', {'Sid': req.cookies.Id, 'SalesPersonName': SalesPersonName[0].Name}); // 로그인 한 관리자의 경우 쿠키 값과 이름을 넘겨서 main으로 이동
});

router.get('/user_main', async (req, res) => { // 사용자 페이지
    
    const data = {
        Ssn: req.cookies.Id, // 쿠키에 등록된 Id 값을 Ssn key에 value로 저장
    }; 

    const CustomerName = await selectSql.getCustomerName(data); // 해당 고객의 이름 
    
    res.render('user_main', {'Ssn': req.cookies.Id, 'CustomerName': CustomerName[0].Name}); // 로그인 한 사용자의 경우 쿠키 값과 이름을 넘겨서 main으로 이동
});

router.post('/', async (req, res) => {
    const vars = req.body;
    const users = await selectSql.getUsers();
    let WhoAmI = ''; // 관리자, 사용자 판별
    let Id = ''; 
    let checkLogin = false;

    users.map((user) => { // map -> 반복문
        if (vars.id == user.ID && vars.password == user.Password) { // 등록된 회원 여부 판단
            checkLogin = true;
            if (user.Role == "Admin") {
                WhoAmI = "Admin";
                Id = user.ID;
            } else if (user.Role == "User") {
                WhoAmI = "User";
                Id = user.ID;
            }
        }
    })

    if (checkLogin) { // 로그인에 성공한 경우 동작
        res.cookie('Id', Id, { // 로그인한 사람의 Id를 쿠키로 등록
            expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효) -> 유지되는 시간 
            httpOnly: true
        })

        if (WhoAmI == "Admin") {  // 로그인한 사람이 관리자인 경우 동작
            res.redirect('/admin_main'); // get mapping을 통해 관리자 페이지로 넘어감
        } else if (WhoAmI == "User") { // 로그인한 사람이 사용자인 경우 동작
            res.redirect('/user_main'); // get mapping을 통해 사용자 페이지로 넘어감
        }
    } else { // 로그인에 실패한 경우 초기 화면으로 돌아감
        res.send("<script>alert('아이디 또는 비밀번호를 잘못 입력했습니다.'); location.href='/';</script>");
    }
})

module.exports = router;