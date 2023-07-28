# 10만 건 Data 생성 
import random
from tkinter import E

Vin_chars = 'ABCDEFGHIJKLMNOPQRSTU0123456789'
YearList = ["2010년", "2011년", "2012년", "2013년", "2014년","2015년", "2016년", "2017년", "2018년", "2019년", "2020년", "2021년", "2022년", "2023년"]
PriceList = ["1050만원", "3450만원", "3900만원", "1400만원", "1750만원","2100만원", "2700만원", "2900만원", "2950만원", "4500만원", "5200만원"]
FuelList = ["전기", "가솔린", "디젤", "LPG", "하이브리드"]
SeaterList = ["2인승", "5인승"]
ManufacturerList = ["현대 자동차", "기아 자동차"]
H_ModelList = [["그랜저", "쏘나타"], ["싼타페", "투싼"], ["포터2", "포터1"], ["스타리아", "스타렉스"]]
K_ModelList = [["K5", "K7"], ["니로", "셀토스"], ["봉고3", "봉고2"], ["카니발 2세대", "카니발 3세대"]]
ColorList = ["어비스 블랙 펄", "티타늄 그레이 매트", "다크 오션 블루", "파이어리 레드", "멜버른 그레이"]
Plate_numberList = ["가", "나", "다", "라", "마", "바", "조", "아"]
CtypeList = ["SEDAN", "SUV", "TRUCK", "VAN"]
Engine_sizeList = ["3500cc", "3000cc", "2500cc"]
Size_gradeList = ["소형", "준중형", "중형"]
TonnageList = ["1톤", "1.2톤", "1.4톤"]
PurposeList = ["캠핑", "리무진", "수송"]


def random_Vin():
    result = ""
    for i in range(17):
        result += random.choice(Vin_chars)
    return result

base = "INSERT INTO Vehicle VALUES ("
base2 = "INSERT INTO Car VALUES ("

base_sedan = "INSERT INTO Sedan VALUES ("
base_suv = "INSERT INTO Suv VALUES ("
base_truck = "INSERT INTO Truck VALUES ("
base_van = "INSERT INTO Van VALUES ("
base3= ""

sql = []
for i in range(100000):
    if i % 100000 == 0: print(i)
    
    y_idx = random.randint(0, 13)
    p_idx = random.randint(0, 10)
    f_idx = random.randint(0, 4)
    s_idx = random.randint(0, 1)
    m_idx = random.randint(0, 1)
    type_idx = random.randint(0, 3) # 차종 선택
    model_idx = random.randint(0, 1) # 차량 모델 선택
    c_idx = random.randint(0, 4)
    e_idx = random.randint(0, 2)

    Vin = random_Vin()
    Year = YearList[y_idx]
    Price = PriceList[p_idx]
    Fuel = FuelList[f_idx]
    Seater = SeaterList[s_idx]
    Manufacturer = ManufacturerList[m_idx]
    if m_idx == 0 : Model = H_ModelList[type_idx][model_idx] # 현대 자동차
    elif m_idx == 1 : Model = K_ModelList[type_idx][model_idx] # 기아 자동차
    Color = ColorList[c_idx]

    query = base + '"' + Vin + '", "' + Year + '", "' + Price + '", "' + Fuel + '", "' + Seater + '", "' + Model + '", "' + Color + '", "' + Manufacturer + '", "CAR"' + ');\n'
    
    pn_idx = random.randint(0, 7)

    Plate_number = str(random.randint(10, 400)) + Plate_numberList[pn_idx] + str(random.randint(1000, 9999))
    Mileage = str(random.randint(500, 200000)) + "km"
    Ctype = CtypeList[type_idx]

    query2 = base2 + '"' + Vin + '", "' + Plate_number + '", "' + Mileage + '", "' + Ctype + '"' + ');\n'
    
    if type_idx == 0 : query3 = base_sedan + '"' + Vin + '", "' + Engine_sizeList[e_idx] + '"' + ');\n'
    elif type_idx == 1 : query3 = base_suv + '"' + Vin + '", "' + Size_gradeList[e_idx] + '"' + ');\n'
    elif type_idx == 2 : query3 = base_truck + '"' + Vin + '", "' + TonnageList[e_idx] + '"' + ');\n'
    elif type_idx == 3 : query3 = base_van + '"' + Vin + '", "' + PurposeList[e_idx] + '"' + ');\n'
    
    sql.append(query)
    sql.append(query2)
    sql.append(query3)

f = open('vehicle_data.sql', 'w')
for i, s in enumerate(sql):
    f.writelines(s)

f.close()