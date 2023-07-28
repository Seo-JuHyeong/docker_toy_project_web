import express from "express";
import logger from "morgan";
import path from "path";
import liveReload from 'livereload';
import connectLiveReload from 'connect-livereload';

import loginRouter from "./routes/login";
import logoutRouter from './routes/logout';
import reservation_userRouter from "./routes/reservation_user";
import view_delete_userRouter from "./routes/view_delete_user";
import confirmed_sale_userRouter from "./routes/confirmed_sale_user";
import car_enter_adminRouter from "./routes/car_enter_admin";
import car_modify_adminRouter from "./routes/car_modify_admin";
import car_delete_adminRouter from "./routes/car_delete_admin";
import reservation_accept_adminRouter from "./routes/reservation_accept_admin";
import reservation_delete_adminRouter from "./routes/reservation_delete_admin";
import reservation_modify_adminRouter from "./routes/reservation_modify_admin";
import confirmed_sale_adminRouter from "./routes/confirmed_sale_admin";

const PORT = 3000;

const liveReloadServer = liveReload.createServer(); // 코드 업데이트 시 자동으로 웹 페이지 reload
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100)
});

const app = express();

app.use(connectLiveReload());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, 'public'))) // hbs에게 css파일의 위치를 알려 주기 위함

app.use(logger("dev"));

app.use("/", loginRouter);
app.use("/logout", logoutRouter);
app.use("/reservation_user", reservation_userRouter); 
app.use("/view_delete_user", view_delete_userRouter);
app.use("/confirmed_sale_user", confirmed_sale_userRouter);
app.use("/car_enter_admin", car_enter_adminRouter); 
app.use("/car_modify_admin", car_modify_adminRouter); 
app.use("/car_delete_admin", car_delete_adminRouter);
app.use("/reservation_accept_admin", reservation_accept_adminRouter); 
app.use("/reservation_delete_admin", reservation_delete_adminRouter); 
app.use("/reservation_modify_admin", reservation_modify_adminRouter);
app.use("/confirmed_sale_admin", confirmed_sale_adminRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});