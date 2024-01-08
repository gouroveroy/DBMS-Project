from django.shortcuts import render
from django.db import connection
import oracledb

oracledb.init_oracle_client(
    config_dir="C:/Users/2105017-GouroveRoy/Downloads/oracle/WINDOWS.X64_193000_db_home/network/admin"
)

connection = oracledb.connect(user="hr", password="hr", dsn="localhost:1521/ORCL")

idn = ""
slno = ""
val = ""


# Create your views here.
def update(request):
    global idn, slno, val
    if request.method == "POST":
        cursor = connection.cursor()
        d = request.POST

        for key, value in d.items():
            if key == "id":
                idn = value
            if key == "slno":
                slno = value
            if key == "value":
                val = value

        if slno == "1":
            sql = """UPDATE USERS SET ID = :id2
                WHERE ID = :id"""
            cursor.execute(sql, {"id2": int(val), "id": idn})
        if slno == "2":
            sql = """UPDATE USERS SET FIRST_NAME = :fn 
                WHERE ID = :id"""
            cursor.execute(sql, {"fn": val, "id": idn})
        if slno == "3":
            sql = """UPDATE USERS SET LAST_NAME = :ln 
                WHERE ID = :id"""
            cursor.execute(sql, {"ln": val, "id": idn})
        if slno == "4":
            sql = """UPDATE USERS SET SEX = :sx 
                WHERE ID = :id"""
            cursor.execute(sql, {"sx": val, "id": idn})
        if slno == "5":
            sql = """UPDATE USERS SET EMAIL = :em 
                WHERE ID = :id"""
            cursor.execute(sql, {"em": val, "id": idn})
        if slno == "6":
            sql = """UPDATE USERS SET PASSWORD = :pw 
                WHERE ID = :id"""
            cursor.execute(sql, {"pw": val, "id": idn})

        connection.commit()
        cursor.close()
    return render(request, "update.html")
