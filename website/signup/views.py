from django.shortcuts import render
from django.db import connection
import oracledb

oracledb.init_oracle_client(config_dir='C:/Users/2105017-GouroveRoy/Downloads/oracle/WINDOWS.X64_193000_db_home/network/admin')

fn = ''
ln = ''
sx = ''
em = ''
pw = ''

connection = oracledb.connect(user='hr', password='hr', dsn='localhost:1521/ORCL')

# Create your views here.
def signUp(request):
    global fn, ln, sx, em, pw
    if request.method == "POST":
        cursor = connection.cursor()
        d = request.POST
        for key, value in d.items():
            if key=="first_name":
                fn=value
            if key=="last_name":
                ln=value
            if key=="sex":
                sx=value
            if key=="email":
                em=value
            if key=="password":
                pw=value
        # cursor.execute(
        #     "INSERT INTO USERS (FIRST_NAME, LAST_NAME, SEX, EMAIL, PASSWORD) "
        #     "VALUES (%s, %s, %s, %s, %s)",
        #     (fn, ln, sx, em, pw)
        # )
        sql = """INSERT INTO USERS (FIRST_NAME, LAST_NAME, SEX, EMAIL, PASSWORD)
            VALUES (:fname, :lname, :gender, :eml, :pwd)"""
        cursor.execute(sql, [fn, ln, sx, em, pw])
        connection.commit()
        cursor.close()
    return render(request, 'signup.html')
