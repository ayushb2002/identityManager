from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
config = get_config()
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
@cross_origin()

@app.route("/aadhar_verify",methods=['POST'])
def aadhar_verify(request):
    print("Started")
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