from django.shortcuts import render
from django.db import connection
import oracledb

oracledb.init_oracle_client(
    config_dir="C:/Users/2105017-GouroveRoy/Downloads/oracle/WINDOWS.X64_193000_db_home/network/admin"
)

connection = oracledb.connect(user="hr", password="hr", dsn="localhost:1521/ORCL")


# Create your views here.
def home(request):
    return render(request, "home.html")


def sight(request):
    return render(request, "sight.html")

def delete(request):
    em = ""
    id = ""
    flag = 0
    if request.method == "POST":
        cursor = connection.cursor()
        d = request.POST
        # emid = d.items().value
        for key, value in d.items():
            if key == "email":
                em = value
                flag = 0
            if key == "id":
                flag = 1
                id = value
        # cursor.execute(
        #     "INSERT INTO USERS (FIRST_NAME, LAST_NAME, SEX, EMAIL, PASSWORD) "
        #     "VALUES (%s, %s, %s, %s, %s)",
        #     (fn, ln, sx, em, pw)
        # )
        if flag == 0:
            sql = """DELETE FROM USERS
                WHERE EMAIL = :em"""
            cursor.execute(sql, [em])
        if flag == 1:
            sql = """DELETE FROM USERS
                WHERE ID = :id"""
            cursor.execute(sql, [id])

        connection.commit()
        cursor.close()
    return render(request, "delete.html")
