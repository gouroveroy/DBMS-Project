from django.shortcuts import render
from django.db import connection
import oracledb

oracledb.init_oracle_client(config_dir='C:/Users/2105017-GouroveRoy/Downloads/oracle/WINDOWS.X64_193000_db_home/network/admin')

em = ''
pw = ''

connection = oracledb.connect(user='hr', password='hr', dsn='localhost:1521/ORCL')

# Create your views here.
def logIn(request):
    global em, pw
    if request.method == "POST":
        cursor = connection.cursor()
        d = request.POST
        for key, value in d.items():
            if key=="email":
                em=value
            if key=="password":
                pw=value
        # cursor.execute(
        #     "INSERT INTO USERS (FIRST_NAME, LAST_NAME, SEX, EMAIL, PASSWORD) "
        #     "VALUES (%s, %s, %s, %s, %s)",
        #     (fn, ln, sx, em, pw)
        # )
        sql = """SELECT * FROM USERS
            WHERE EMAIL = :eml AND PASSWORD = :pwd"""
        cursor.execute(sql, [em, pw])
        t = tuple(cursor.fetchall())
        if t == ():
            return render(request, "error.html")
        else:
            return render(request, "welcome.html")
    return render(request, 'login.html')
