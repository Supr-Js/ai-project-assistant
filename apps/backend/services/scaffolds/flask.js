// apps/backend/services/scaffolds/flask.js
export function flaskScaffold(projectName = 'my-flask-app') {
  return {
    [`${projectName}/app.py`]: `from flask import Flask
app = Flask(__name__)

@app.get('/')
def hello():
    return 'Hello, ${projectName}!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)`
  };
}