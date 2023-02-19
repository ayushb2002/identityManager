from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from idcard import * 
from face_recog import *
import base64
import os
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
@cross_origin()

@app.route("/test")
def test():
    return 'hi'
@app.route("/aadhar_verify",methods = ['POST'])
def aadhar_verify():
    print("Started")
    imagefile=request.files.get('file')
    imagefile.save(imagefile.filename)
    imagefilepath=imagefile.filename
    
    name=request.form.get('name')
    aadhaar=request.form.get('aadhaar')
    gender=request.form.get('gender')

    print('request =',name,aadhaar,gender)
    res=str(aadhar_check(imagefilepath,name,aadhaar,gender))
    print(res)
    print("Done")
    os.remove(imagefilepath)
    return jsonify(res)

@app.route("/face_match",methods = ['POST'])
def face_match_api():
    print('Started')
    imagefile=request.files.get('image2')
    imagefile.save(imagefile.filename)
    imagefilepath=imagefile.filename

    imagefile2=request.form.get('image1')
    with open('temp.jpg','wb') as f:
        i = bytes(imagefile2[23::],"ascii")
        f.write(base64.decodebytes(i))
    res = jsonify(face_match(imagefilepath,"temp.jpg"))
    print('Done')
    os.remove(imagefilepath)
    os.remove('temp.jpg')
    return res
