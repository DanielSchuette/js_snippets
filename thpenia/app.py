#!/usr/bin/python3
# a simple static file server using flask
from flask import Flask, request, url_for

# set the directory to serve from
app = Flask(__name__)

# serve index.html at /
url_for("static", filename="index.html")

if __name__ == "__main__":
    app.run()
