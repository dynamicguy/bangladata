from flask import Flask, session, url_for, request, redirect, render_template
#from flask_admin import Admin
from flask_script import Manager
from flask_bootstrap import Bootstrap
#from flask_babel import Babel, gettext, refresh

app = Flask(__name__)
bootstrap = Bootstrap(app)
manager = Manager(app)

@app.route('/')
def index():
    return render_template('parlelections.html')


@app.route('/rohingya')
def rohingya():
    return render_template('rohingya.html')

@app.route('/parlelections')
def parlelections():
    return render_template('parlelections.html')

@app.route('/violence')
def violence():
    return render_template('violence.html')

@app.route('/coverage')
def coverage():
    return render_template('coverage.html')

@app.route('/myanmar')
def myanmar():
    return render_template('myanmar.html')

@app.route('/carto')
def carto():
    return render_template('carto.html')

if __name__ == '__main__':
    manager.run()
