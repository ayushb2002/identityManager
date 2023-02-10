def gender(data):
    for x in data:
        if x[0].lower()=="male":
            return 'male'
    return 'female'

def name_check(name,data):
    name=sorted(list(name.split()))
    datatemp=[x[0] for x in data]
    for i in range(len(datatemp)-len(name)):
        # print(datatemp[i:i+len(name)])
        if sorted(datatemp[i:i+len(name)])==name:
            return True
    return False

def phone_number(data):
    possible=[]
    for x in data:
        if len(x[0])==10:
            try:
                int(x[0])
                possible.append(x[0])
            except:
                pass
    return possible[-1]

def get_aadhar(data):
    aadhar=[]
    for x in data:
        if len(x[0])==4:
            try:
                int(x[0])
                aadhar.append(x)
            except:
                pass
    aadhar.sort(key=lambda x: (x[1][0][1]),reverse=True)
    # print(aadhar)
    return ' '.join([x[0] for x in aadhar])

def aadhar_check(pipeline,path):
    import keras_ocr
    images = [
        keras_ocr.tools.read(url) for url in [
            path,
            
        ]
    ]
    print(len(images))
    from pprint import pprint
    prediction_groups = pipeline.recognize(images)

    sorted_aadhaar = sorted(prediction_groups[0], key=lambda x: (x[1][0][1],x[1][0][0]))

    print(gender(sorted_aadhaar),name_check('ganesh gummalam setty',sorted_aadhaar),phone_number(sorted_aadhaar),get_aadhar(sorted_aadhaar))
    # [print(x[0]) for x in sorted_aadhaar]
    # sorted_id = sorted(prediction_groups[1], key=lambda x: (x[1][0][1],x[1][0][0]))
    # [print(x[0]) for x in sorted_id]

