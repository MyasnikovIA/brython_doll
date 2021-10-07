from flask import Flask, send_from_directory
app = Flask(__name__, static_folder='.')

@app.route('/')
def example():
    return app.send_static_file('index.html')

@app.route('/<name>.js')
def js_files(name):
    return app.send_static_file('js/' + name + '.js')

@app.route('/<path:path>')
def all_files(path):
    return app.send_static_file(path)

if __name__ == '__main__':
    app.debug=True
    app.run()