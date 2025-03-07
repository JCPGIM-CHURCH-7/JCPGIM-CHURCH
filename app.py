from flask import Flask, render_template, url_for, request, redirect, flash
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
app.secret_key = '123456789'

def create_db_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='Pranab$@12',
            database='jcpgim'
        )
        if connection.is_connected():
            return connection
    except Error as e:
        flash(f"Error: {e}", 'danger')
        return None

db = create_db_connection()

if db is None:
    raise Exception("Failed to connect to the database.")

cursor = db.cursor()

@app.route('/')
def home():
    return render_template("jcpgim.html")

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        name = request.form['username']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirmPassword']
        
        if password != confirm_password:
            flash('Passwords do not match!', 'danger')
            return redirect(url_for('signup'))
        
        query = 'SELECT * FROM users WHERE email = %s'
        cursor.execute(query, (email,))
        user = cursor.fetchone()
        
        if user:
            flash('Email already exists', 'danger')
            return redirect(url_for('signup'))
        
        query1 = 'INSERT INTO users(Name, Email, Password) VALUES(%s, %s, %s)'
        cursor.execute(query1, (name, email, password))
        db.commit()
        
        flash('Signup successful! Please log in.', 'success')
        return redirect(url_for('login'))
    
    return render_template('jcpgimsignup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        query = 'SELECT * FROM users WHERE email = %s AND password = %s'
        cursor.execute(query, (email, password))
        user = cursor.fetchone()
        
        if user:
            flash('Login successful!', 'success')
            return redirect(url_for('jcpgimhome'))
        else:
            flash('Invalid email or password', 'danger')
            return redirect(url_for('login'))
    
    return render_template('jcpgimlogin.html')

@app.route('/jcpgimhome', methods=['GET', 'POST'])
def jcpgimhome():
    return render_template('jcpgimhome.html', services=services)

@app.route('/services', methods=['GET', 'POST'])
def services():    
    return render_template('jcpgimservices.html', services=services)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        
        query = 'INSERT INTO contact_form(Name, Email, Message) VALUES(%s, %s, %s)'
        cursor.execute(query, (name, email, message))
        db.commit()
        
        flash('Your message has been sent successfully!', 'success')
        return redirect(url_for('contact'))
    
    return render_template('jcpgimcontact.html')



if __name__ == '__main__':
    app.run(debug=True)
from flask import redirect, request

@app.before_request
def enforce_https():
    if not request.is_secure:
        return redirect(request.url.replace("http://www.jcpgimchurch.org"), code=301)
 
