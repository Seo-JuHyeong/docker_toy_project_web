import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
const router = express.Router();

router.use(cookieParser());
router.use(expressSession({ // Session을 사용할 때 설정 값
    secret: 'dilab',
    resave: true,
    saveUninitialized: true,
}))

router.get('/', (req, res) => {
    if (req.cookies.user) {
        res.clearCookie('Id') // 쿠키에 저장된 Id 값 삭제
        res.redirect("/");
    } else {
        res.redirect("/");
    }
})

module.exports = router;