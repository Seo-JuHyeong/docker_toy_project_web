# 2022-Database-project

<br>
<br>

## 📌 실행 환경
*Visual Studio Code*

*MySQL Workbench*

<br>
<br>

## 📌 서버 실행 방법
1. 레포지토리 복사 
    > 1. git clone <원격저장소 주소>
    > 2. 해당 폴더 이동 
    > 3. npm install
    > 4. npm run start

<br>
<br>

2. database/sql.js 파일 내부에서 본인의 데이터베이스 정보 입력
<pre> 
<code>
    const pool = mysql.createPool(
    process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'car_dealer', // 본인의 데이터베이스 이름
    password: 'password', // 본인의 데이터베이스 password
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

</code> 
</pre>

<br>
<br>

## 📌 설계 내용
#### 1. EER Diagram

![image](https://user-images.githubusercontent.com/88774870/210204108-668f47f1-7926-4702-8dbc-e43472555a7f.png)

<br>
<br>

#### 2. Relational Schema

![image](https://user-images.githubusercontent.com/88774870/210204326-87433595-476c-4ece-a382-3030e0dce8e8.png)

<br>
<br>

## 📌 Service 소개
### 1. Main Page

![image](https://user-images.githubusercontent.com/88774870/210205197-110ca198-55d8-48ed-80ce-35ab230558d7.png)

✔ Main Page에서는 사용자의 **로그인을 유도**하는 문구를 띄어줍니다!

<br>
<br>

![image](https://user-images.githubusercontent.com/88774870/210246025-cdf763a2-2930-4e73-950d-c1dfe43dd5f8.png)

✔ 사용자 계정으로 로그인한 경우 **구매자 전용 Page**가 나타나며 **왼쪽 메뉴 버튼 클릭을 유도**하는 문구를 띄어줍니다!

<br>
<br>

![image](https://user-images.githubusercontent.com/88774870/210245479-b048190c-4d6b-45ea-a1b8-873c80e380a1.png)

✔ 관리자 계정으로 로그인한 경우 **판매자 전용 Page**가 나타나며 **왼쪽 메뉴 버튼 클릭을 유도**하는 문구를 띄어줍니다!

<br>
<br>

### 2. 사용자 페이지

![image](https://user-images.githubusercontent.com/88774870/210260053-24e296a3-86a4-4cf7-a51e-cb639fae2f21.png)

✔ **차량 구매 예약 Page**에서는 현재 **예약이 가능한 모든 차량**이 차종 별로 출력됩니다! 

✔ 예약 날짜를 설정하고 예약 신청 버튼 클릭 시 **예약이 진행**됩니다! 

🖍 _"GV80" 차량을 예약해 보겠습니다._

<br>
<br>

![image](https://user-images.githubusercontent.com/88774870/210491053-1a9792c4-7e17-48da-b885-94d4a78a5dac.png)

✔ 이때, 해당 구매자가 예약한 차 대수가 5대 이상일 경우 Alert를 띄워 **추가 예약을 금지**합니다!

<br>
<br>

![image](https://user-images.githubusercontent.com/88774870/210254846-8a23a10a-9e78-40ed-a69c-02d5c097224a.png)

✔ 또한, 구매자가 입력한 예약 날짜가 현재 날짜로부터 **이전의 날짜로 선택**된 경우와 **7일 이후의 날짜로 선택**된 경우 

Alert를 띄워 **올바른 예약 날짜를 입력하도록 유도**하는 유효성 검사를 진행합니다! 

<br>
<br>

![image](https://user-images.githubusercontent.com/88774870/210258047-7a09337a-8a58-45b0-85ff-740e03d8679b.png)

✔ 예약한 차 대수가 5대 미만이며 입력한 예약 날짜가 유효성 검사를 통과하였다면 정상적으로 **예약이 등록**됩니다! 

<br>
<br>

![image](https://user-images.githubusercontent.com/88774870/210259296-2477703c-7137-4c29-ae9d-465be65e82b5.png)

✔ **차량 예약 조회 및 취소 Page**에서는 해당 구매자가 현재 **예약을 등록한 차량 목록**이 출력됩니다! 

✔ 예약 삭제 버튼 클릭 시 **예약이 취소**됩니다!

<br>
<br>

![image](https://user-images.githubusercontent.com/88774870/210472782-4f048b3c-4c4b-4075-bdb3-0f465bafa6fc.png)

✔ **차량 구매 목록 조회 Page**에서는 해당 구매자가 **구매한 차량 목록**이 출력됩니다! 

<br>
<br>

### 3. 관리자 페이지

![image](https://user-images.githubusercontent.com/88774870/210474994-26f1bd0a-2915-4f8c-899b-558c531ef18e.png)

✔ **차량 정보 등록 Page**에서는 판매자가 차종 별로 **차량을 등록**할 수 있습니다! 

🖍 _"G90 LWB" 차량을 등록해 보겠습니다._

<br>
<br>

<img width="1142" alt="image" src="https://user-images.githubusercontent.com/88774870/210485700-5cae2c93-1ef9-4201-90fb-dba706fb14e8.png">

✔ 정상적으로 **차량이 등록**됩니다! 

<br>
<br>

![image](https://user-images.githubusercontent.com/88774870/210486091-ae1b48ac-8f66-4936-89bf-897205e5cbcc.png)

✔ **차량 정보 수정 Page**에서는 등록된 **차량의 정보를 수정**할 수 있습니다!

<br>
<br>

![image](https://user-images.githubusercontent.com/88774870/210486601-f3eee175-6301-4de6-9037-ddcf319e586d.png)

✔ **차량 정보 삭제 Page**에서는 등록된 **차량을 삭제**할 수 있습니다!

<br>
<br>

![image](https://user-images.githubusercontent.com/88774870/210487211-11e075e9-7682-4a6e-a3a5-cdc2c3716d80.png)

✔ **구매 예약 조회 및 처리 Page**에서는 현재 진행 중인 예약에 대해 **거래를 승인**하거나 **예약을 취소**할 수 있습니다! 

🖍 _"GV80" 차량의 예약에 대해 거래를 승인해 보겠습니다._

<br>
<br>

![image](https://user-images.githubusercontent.com/88774870/210489326-0ae10f19-8fe6-4e77-b93f-80191431dcf9.png)

✔ 정상적으로 **차량이 판매**됩니다! 

<br>
<br>

![image](https://user-images.githubusercontent.com/88774870/210489687-7fb868f1-f407-4154-a873-877783a090b6.png)

✔ **구매 예약 정보 수정 Page**에서는 진행 중인 **예약 정보를 수정**할 수 있습니다!

<br>
<br>

![image](https://user-images.githubusercontent.com/88774870/210489923-fc73dcdb-5001-45e8-be18-3520d36caec5.png)

✔ **차량 판매 목록 조회 Page**에서는 해당 판매자가 **판매한 차량 목록**이 출력됩니다! 
