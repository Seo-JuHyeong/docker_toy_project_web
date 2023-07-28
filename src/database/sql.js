import mysql from "mysql2";

// 데이터베이스 연결
const pool = mysql.createPool(process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'car_dealer',
    password: '730216hj',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// async / await 사용
const promisePool = pool.promise();

// select query
export const selectSql = {
    getUsers: async () => { // User table 반환  
      const [rows] = await promisePool.query(`select * from user`);
      return rows
    },

    // data라는 객체 타입의 파라미터에 입력할 정보를 받아서 query문 생성
    getCustomerName: async (data) => { // 해당 Ssn을 가진 고객 이름 반환 
      const [rows] = await promisePool.query(`select Name from customer where Ssn = "${data.Ssn}"`);
      return rows
    },

    getSalesPersonName: async (data) => { // 해당 Sid를 가진 판매자 이름 반환 
      const [rows] = await promisePool.query(`select Name from salesperson where Sid = "${data.Sid}"`);
      return rows
    },
    
    getCarList_reserved: async (data) => { // 해당 Ssn의 고객이 예약한 판매 처리되지 않은 차량 목록 반환 
      const [rows] = await promisePool.query(`SELECT v.*, c.*, r.Date FROM vehicle as v, car as c, reservation as r where v.Vin = c.Vin and v.Vin = r.Vin and r.Ssn = "${data.Ssn}" and r.Vin not in (select Vin from sale)`);
      return rows
    },
   
    getCarList_purchased: async (data) => { // 해당 고객이 구매한 차량 목록 반환 
      const [rows] = await promisePool.query(`SELECT v.*, c.*, s.Date, s.Sid, sp.Name FROM vehicle as v, car as c, sale as s, salesperson as sp where v.Vin = c.Vin and v.Vin = s.Vin and s.Ssn = "${data.Ssn}" and s.Sid = sp.Sid;`);
      return rows
    },

    getCarList_sold: async (data) => { // 해당 판매자가 판매한 차량 목록 반환 
      const [rows] = await promisePool.query(`SELECT v.*, c.*, s.Date, s.Ssn, ct.Name FROM vehicle as v, car as c, sale as s, customer as ct where v.Vin = c.Vin and v.Vin = s.Vin and s.Sid = "${data.Sid}" and s.Ssn = ct.Ssn`);
      return rows
    },

    getCarList_available_reservation_sedan: async () => { // 예약 가능한 Sedan 목록 반환 
      const sql = `select * from vehicle natural join car natural join sedan where Vin not in (select Vin from reservation)`;
      const [result] = await promisePool.query(sql);  
      return result
    },
    
    getCarList_available_reservation_suv: async () => { // 예약 가능한 Suv 목록 반환 
      const sql = `select * from vehicle natural join car natural join suv where Vin not in (select Vin from reservation)`;
      const [result] = await promisePool.query(sql);  
      return result
    },
    
    getCarList_available_reservation_truck: async () => { // 예약 가능한 Truck 목록 반환 
      const sql = `select * from vehicle natural join car natural join truck where Vin not in (select Vin from reservation)`;
      const [result] = await promisePool.query(sql);  
      return result
    },

    getCarList_available_reservation_van: async () => { // 예약 가능한 Van 목록 반환 
      const sql = `select * from vehicle natural join car natural join van where Vin not in (select Vin from reservation)`;
      const [result] = await promisePool.query(sql);  
      return result
    },

    getCount_carList_reserved: async (data) => { // 해당 고객이 예약한 차량의 수 반환 
      const [rows] = await promisePool.query(`select count(*) as count from reservation where Ssn = "${data.Ssn}" and Vin not in (select Vin from sale);`);
      return rows
    },    

    getCarList_sedan: async () => { // 판매되지 않은 Sedan 목록 반환 
      const sql = `select * from vehicle natural join car natural join sedan where Vin not in (select Vin from sale)`;
      const [result] = await promisePool.query(sql);  
      return result
    },
  
    getCarList_suv: async () => { // 판매되지 않은 Suv 목록 반환 
      const sql = `select * from vehicle natural join car natural join suv where Vin not in (select Vin from sale)`;
      const [result] = await promisePool.query(sql);  
      return result
    },
  
    getCarList_truck: async () => { // 판매되지 않은 Truck 목록 반환 
      const sql = `select * from vehicle natural join car natural join truck where Vin not in (select Vin from sale)`;
      const [result] = await promisePool.query(sql);  
      return result
    },

    getCarList_van: async () => { // 판매되지 않은 Van 목록 반환 
      const sql = `select * from vehicle natural join car natural join van where Vin not in (select Vin from sale)`;
      const [result] = await promisePool.query(sql);  
      return result
    },

    getCarType: async (data) => { // 해당 차대 번호의 차량 Type 값 반환 
      const sql = `select Ctype from car where Vin = "${data.Vin}"`;
      const [result] = await promisePool.query(sql);  
      return result
    },

    getReservation_status: async (data) => { // 해당 차대 번호의 차량의 예약 여부 판별 
      const sql = `select count(*) as Reservation_status from reservation where vin = "${data.Vin}"`;
      const [result] = await promisePool.query(sql); 
      return result
    },

    getReservationList: async () => { // 판매되지 않은 예약 차량 목록 반환 
      const sql = `select r.*, v.*, c.*, ct.Name from reservation as r, vehicle as v, car as c, customer as ct where r.Vin = v.Vin and v.Vin = c.Vin and r.Ssn = ct.Ssn and r.Vin not in (select Vin from sale)`;      
      const [result] = await promisePool.query(sql); 
      return result
    },
}

// insert query
export const insertSql = {
  // data라는 객체 타입의 파라미터에 입력할 정보를 받아서 query문 생성
  // async, await 사용 (deadlock 방지) -> 자바는 위에서부터 순차적으로 실행되지 않기 때문
  insertReservation: async (data) => { // 해당 차대 번호, 고객, 날짜를 예약 table에 삽입
    const sql = `insert into reservation values (
        "${data.Vin}", "${data.Ssn}", "${data.Date}"
    )`
    await promisePool.query(sql); // 위 기능이 끝날 때 까지 기다림
  },
  
  insertVehicle: async (data) => { // 해당 차량 정보를 Vehicle table에 삽입 (슈퍼클래스)
    const sql = `insert into vehicle values (
      "${data.Vin}", "${data.Year}", "${data.Price}", "${data.Fuel}", "${data.Seater}", "${data.Model}", "${data.Color}", "${data.Manufacturer}", "CAR"
    )` 
    await promisePool.query(sql);
  },

  insertCar: async (data) => { // 해당 차량 정보를 Car table에 삽입 (Vehicle table에 대한 서브클래스)
    const sql = `insert into car values (
      "${data.Vin}", "${data.Plate_number}", "${data.Mileage}", "${data.Ctype}"
    )` 
    await promisePool.query(sql);
  }, 

  insertSedan: async (data) => { // 해당 차량 정보를 Sedan table에 삽입 (Car table에 대한 서브클래스) 
    const sql = `insert into sedan values (
      "${data.Vin}", "${data.Engine_size}"
    )` 
    await promisePool.query(sql);
  },

  insertSuv: async (data) => { // 해당 차량 정보를 Suv table에 삽입 (Car table에 대한 서브클래스)
    const sql = `insert into suv values (
      "${data.Vin}", "${data.Size_grade}"
    )` 
    await promisePool.query(sql);
  },

  insertTruck: async (data) => { // 해당 차량 정보를 Truck table에 삽입 (Car table에 대한 서브클래스)
    const sql = `insert into truck values (
      "${data.Vin}", "${data.Tonnage}"
    )` 
    await promisePool.query(sql);
  },

  insertVan: async (data) => { // 해당 차량 정보를 Van table에 삽입 (Car table에 대한 서브클래스)
    const sql = `insert into van values (
      "${data.Vin}", "${data.Purpose}"
    )` 
    await promisePool.query(sql);
  },

  insertSale: async (data) => { // 해당 차대 번호, 판매자, 고객, 날짜를 Sale table에 삽입
    const sql = `insert into sale values (
        "${data.Vin}", "${data.Sid}", "${data.Ssn}", "${data.Date}"
    )`
    await promisePool.query(sql);
  },
};

// delete query
export const deleteSql = {
  // data라는 객체 타입의 파라미터에 입력할 정보를 받아서 query문 생성
  // async, await 사용 (deadlock 방지) -> 자바는 위에서부터 순차적으로 실행되지 않기 때문
  deleteReservation_user: async (data) => { // 해당 차대 번호와 고객으로 등록된 예약 정보를 삭제 
    const sql = `delete from reservation where Vin = "${data.Vin}" and Ssn = "${data.Ssn}"`
    await promisePool.query(sql); // 위 기능이 끝날 때 까지 기다림
  },

  deleteVehicle: async (data) => { // 해당 차대 번호의 차량을 Vehicle table에서 삭제
    const sql = `delete from vehicle where Vin = "${data.Vin}"`  
    await promisePool.query(sql);
  },

  deleteCar: async (data) => { // 해당 차대 번호의 차량을 Car table에서 삭제
    const sql = `delete from car where Vin = "${data.Vin}"` 
    await promisePool.query(sql);
  }, 

  deleteSedan: async (data) => { // 해당 차대 번호의 차량을 Sedan table에서 삭제
    const sql = `delete from sedan where Vin = "${data.Vin}"`  
    await promisePool.query(sql);
  },

  deleteSuv: async (data) => { // 해당 차대 번호의 차량을 Suv table에서 삭제
    const sql = `delete from suv where Vin = "${data.Vin}"`  
    await promisePool.query(sql);
  },

  deleteTruck: async (data) => { // 해당 차대 번호의 차량을 Truck table에서 삭제
    const sql = `delete from truck where Vin = "${data.Vin}"`  
    await promisePool.query(sql);
  },

  deleteVan: async (data) => { // 해당 차대 번호의 차량을 Van table에서 삭제
    const sql = `delete from van where Vin = "${data.Vin}"`  
    await promisePool.query(sql);
  },

  deleteReservation: async (data) => { // 해당 차대 번호의 차량을 예약 table에서 삭제
    const sql = `delete from reservation where Vin = "${data.Vin}"`  
    await promisePool.query(sql);
  },
};

// update query
export const updateSql = {
  updateVehicle: async (data) => { // 해당 차량 정보로 Vehicle table 수정
    const sql = `update vehicle set Year = "${data.Year}", Price = "${data.Price}", Fuel = "${data.Fuel}", Seater = "${data.Seater}", Model = "${data.Model}", Color = "${data.Color}", Manufacturer = "${data.Manufacturer}" where Vin = "${data.Vin}"`
    await promisePool.query(sql);
  },

  updateCar: async (data) => { // 해당 차량 정보로 Car table 수정
    const sql = `update car set Plate_number = "${data.Plate_number}", Mileage = "${data.Mileage}" where Vin = "${data.Vin}"`
    await promisePool.query(sql);
  }, 

  updateSedan: async (data) => { // 해당 차량 정보로 Sedan table 수정
    const sql = `update sedan set Engine_size = "${data.Engine_size}" where Vin = "${data.Vin}"`
    await promisePool.query(sql);
  },

  updateSuv: async (data) => { // 해당 차량 정보로 Suv table 수정
    const sql = `update suv set Size_grade = "${data.Size_grade}" where Vin = "${data.Vin}"`
    await promisePool.query(sql);
  },

  updateTruck: async (data) => { // 해당 차량 정보로 Truck table 수정
    const sql = `update truck set Tonnage = "${data.Tonnage}" where Vin = "${data.Vin}"`
    await promisePool.query(sql);
  },

  updateVan: async (data) => { // 해당 차량 정보로 Van table 수정
    const sql = `update van set Purpose = "${data.Purpose}" where Vin = "${data.Vin}"`
    await promisePool.query(sql);
  },

  updateReservation: async (data) => { // 해당 고객, 날짜, 차대 번호 정보로 예약 table 수정
    const sql = `update reservation set Ssn = "${data.Ssn}", Date = "${data.Date}"  where Vin = "${data.Vin}"`
    await promisePool.query(sql);
  },
}