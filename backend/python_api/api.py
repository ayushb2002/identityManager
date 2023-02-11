from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from idcard import * 
from face_recog import *
import keras_ocr

pipeline = keras_ocr.pipeline.Pipeline(scale=2)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
@cross_origin()

@app.route("/aadhar_verify",methods = ['POST'])
def aadhar_verify():
    print("Started")
    imagefile=request.files.get('file')
    imagefile.save(imagefile.filename)
    imagefilepath=imagefile.filename
    
    name=request.form.get('name')
    aadhaar=request.form.get('aadhaar')
    # wallet=request.form.get('wallet')
    # email=request.form.get('email')
    gender=request.form.get('gender')
    # dob=request.form.get('dob')
    # pwd=request.form.get('pwd')
    
    res=str(aadhar_check(pipeline,imagefilepath,name,aadhaar,gender))
    print("Done")
    return res

@app.route("/face_match",methods = ['POST'])
def face_match():
    print('Started')
    imagefile=request.files.get('file')
    imagefile.save(imagefile.filename)
    imagefilepath=imagefile.filename

    imagefile2=request.files.get('file2')
    imagefile2.save(imagefile2.filename)
    imagefilepath2=imagefile2.filename

    print('Done')
    return jsonify(face_match(imagefilepath,imagefilepath2))
# Adhaar, Wallet -> If this identity exists and belongs to the user (true) otherwise false
# If true, we send otp to the owner's mail address
# Website POST OTP -> Otp verified -> Logged in (true) else false
app.run(debug=True)