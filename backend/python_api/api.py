from flask import Flask
from flask_cors import CORS, cross_origin
from idcard import * 
import keras_ocr

pipeline = keras_ocr.pipeline.Pipeline(scale=2)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
@cross_origin()

@app.route("/aadhar_verify")
def aadhar_verify():
    print("Started")
    aadhar_check(pipeline,'aadhar2.jpg')
    return "done"
    # imagefile =request.files.get('file')
    # imagefile.save(imagefile.filename)
    # imagefilepath=imagefile.filename
    # name=request.form.get('Product') +' | '+request.form.get('Serial number')
    # description=request.form.get('Description')

    # trait={'Product':request.form.get('Product'),
    #     'Serial number':request.form.get('Serial number'),
    #     'Product type':request.form.get('Product type'),
    #     'Seller':request.form.get('Seller'),
    #     'Manufacturer':request.form.get('Manufacturer'),
    #     'Price':request.form.get('Price'),
    #     'Country  of origin':request.form.get('Country  of origin'),
    #     'Warranty Period(in months)':request.form.get('Warranty Period(in months)')
    # }

# Adhaar, Wallet -> If this identity exists and belongs to the user (true) otherwise false
# If true, we send otp to the owner's mail address
# Website POST OTP -> Otp verified -> Logged in (true) else false
app.run(debug=True)