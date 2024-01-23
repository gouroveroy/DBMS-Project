from django.shortcuts import render
from django.db import connection
import oracledb

oracledb.init_oracle_client(
    config_dir="C:/Users/2105017-GouroveRoy/Downloads/oracle/WINDOWS.X64_193000_db_home/network/admin"
)

connection = oracledb.connect(user="hr", password="hr", dsn="localhost:1521/ORCL")

fn = ""
ln = ""
ag = ""
na = ""
jd = ""
ps = ""

# Create your views here.
def addPlayer(request):
    global fn, ln, ag, na, jd, ps
    if request.method == "POST":
        cursor = connection.cursor()
        d = request.POST
        for key, value in d.items():
            if key == "first_name":
                fn = value
            if key == "last_name":
                ln = value
            if key == "age":
                ag = value
            if key == "nation":
                na = value
            if key == "joindate":
                jd = value
            if key == "playingstate":
                ps = value
        # cursor.execute(
        #     "INSERT INTO USERS (FIRST_NAME, LAST_NAME, SEX, EMAIL, PASSWORD) "
        #     "VALUES (%s, %s, %s, %s, %s)",
        #     (fn, ln, sx, em, pw)
        # )
        sql = """INSERT INTO PLAYER (FIRST_NAME, LAST_NAME, AGE, NATIONALITY, JOINING_DATE, PLAYING_STATE)
            VALUES (:fname, :lname, :age, :na, TO_DATE(:jd, 'YYYY-MM-DD'), :ps)"""
        cursor.execute(sql, [fn, ln, ag, na, jd, ps])
        # cursor.execute(sql, {"fname": fn, "lname": ln, "age": ag, "na": na, "jd": jd, "ps": ps})

        connection.commit()
        cursor.close()
    return render(request, 'addplayer.html')
