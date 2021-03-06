from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import mysql.connector as mysql
import json
import random


app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)

connection = mysql.connect(user='root', password='password', host='127.0.0.1', database='calendar')

@app.route("/get_events", methods=['GET', 'POST'])
def get_events():
    # data = json.loads(request.get_data().decode("utf-8"))
    # cursor = connection.cursor(buffered=True)
    # #query = "SELECT name FROM events WHERE user_id = %s AND startMonth <= %s AND startDay <= %s AND startYear <= %s AND endMonth >= %s AND endDay >= %s AND endYear >= %s"
    # query = "SELECT name FROM events WHERE user_id = %s AND startMonth <= %s AND startDay <= %s AND startYear <= %s AND endMonth >= %s AND endDay >= %s AND endYear >= %s"
    # try:
    #     cursor.execute(query, (data['userID'], data['startMonth'], data['startDay'], data['startYear'], data['endMonth'], data['endDay'],data['endYear']))
    #     #cursor.execute(query, (data['userID'],data['startMonth'],data['startDay'],data['startYear'],data['endMonth'],data['endDay'],data['endYear']))
    # except mysql.Error as e:
    #     print(e)
    #     cursor.close()
    #     return jsonify(auth=False)
    # result = cursor.fetchall()

    # cursor.close()
    # return jsonify(auth=True,res=result)
    return jsonify(auth=False)


@app.route("/add_event", methods=['GET', 'POST'])
def add_event():
    data = json.loads(request.get_data().decode("utf-8"))
    print(data);
    cursor = connection.cursor(buffered=True)
    query = "INSERT INTO events (user_id, name, start_date, end_date, start_time, end_time) VALUES (%s, %s, %s, %s, %s, %s)"
    try:
        cursor.execute(query, (data['userID'],data['name'],data['startDate'],data['endDate'],data['startTime'],data['endTime']))
    except mysql.Error as e:
        print(e)
        cursor.close()
        return jsonify(auth=False)
    
    connection.commit()
    cursor.close()
    return jsonify(auth=True)

@app.route("/make_cookie", methods=['GET', 'POST'])
def make_cookie():
    data = json.loads(request.get_data().decode("utf-8"))
    seed = str(random.randint(1, 9999999999999999))
    cookie = bcrypt.generate_password_hash(seed).decode("utf-8")
    cursor = connection.cursor(buffered=True)
    query = "UPDATE users SET cookie = %s WHERE id = %s"

    try:
        cursor.execute(query, (cookie,data['userID']))
    except mysql.Error as e:
        print(e)
        cursor.close()
        return jsonify(auth=False)
    
    connection.commit()
    cursor.close()

    return jsonify(auth=True, cookie=cookie, id=data['userID'])

@app.route("/register", methods=['GET', 'POST'])
def register():
    data = json.loads(request.get_data().decode("utf-8"))
    pw_hash = bcrypt.generate_password_hash(data['password']).decode("utf-8")
    cursor = connection.cursor(buffered=True)
    query = "INSERT INTO users (username, hashed_password) VALUES (%s,%s)"

    try:
        cursor.execute(query, (data['username'], pw_hash))
    except mysql.Error as e:
        print(e)
        cursor.close()
        return jsonify(auth=False, error=e)
        
    connection.commit()
    cursor.close()
    return jsonify(auth=True)

@app.route("/login", methods=['GET', 'POST'])
def login():
    data = json.loads(request.get_data().decode("utf-8"))
    cursor = connection.cursor(buffered=True)
    query = ("SELECT count(*) AS count, hashed_password, id FROM users WHERE username = %s GROUP BY id")

    try:
        cursor.execute(query, (data['username'],))
    except mysql.Error as e:
        print(e)
        cursor.close()
        return jsonify(auth=False, error=e)

    result = cursor.fetchall()
    auth = False

    if (len(result) == 1):
        auth = bcrypt.check_password_hash(result[0][1], data['password'])
    else:
        cursor.close()
        return jsonify(auth=False)

    cursor.close()
    
    if (auth == True):
        return jsonify(auth=True, id=result[0][2])
    else:
        return jsonify(auth=False)

# Maintains session; checks if user is logged-in via a cookie
# gets passed in a cookie in dict format
@app.route("/auth", methods=['GET', 'POST'])
def auth():
    data = json.loads(request.get_data().decode("utf-8"))
    cursor = connection.cursor()
    query = ("SELECT id FROM users WHERE cookie = %s")
    try:
        cursor.execute(query,(data['cookie'],))
    except mysql.Error as e:
        print(e)
        cursor.close()
        return jsonify(auth=False, error=e)
    result = cursor.fetchone()
    cursor.close()
    if (result != None):
        return jsonify(auth=True,id=result[0])
    else:
        return jsonify(auth=False)

@app.route("/logout", methods=['GET', 'POST'])
def logout():
    data = json.loads(request.get_data().decode("utf-8"))
    cursor = connection.cursor()
    query = ("UPDATE users SET cookie = null WHERE id = %s")
    try:
        cursor.execute(query,(data['userID'],))
    except mysql.Error as e:
        print(e)
        cursor.close()
        return jsonify(auth=False, error=e)
    return jsonify(auth=True)