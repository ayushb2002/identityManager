def face_match(f1="v1.jpg",f2="v2.jpg"):
    from deepface import DeepFace
    backends = ['opencv', 'mediapipe']
    models = [
  "VGG-Face", 
  "Facenet", 
  "Facenet512", 
  "OpenFace", 
  "DeepFace", 
  "DeepID", 
  "ArcFace", 
  "Dlib", 
  "SFace",
]
    result = DeepFace.verify(img1_path=f1, img2_path=f2, detector_backend=backends[0],model_name=models[8])
    
    try:
        if result['verified']==True:
            return {'match':True, 'message': 'Faces matched!'}
        else:
            return {'match':False, 'message': 'Faces don\'t match!'}
        pass
    except:
        return {'match':False, 'message': 'Can\'t identify human!'}

# import base64
# import requests
# f1="v1.jpg"
# f2="v2.jpg"
# with open(f1, "rb") as image_file:
#     encoded_string1 = base64.b64encode(image_file.read())
# with open(f2, "rb") as image_file:
#     encoded_string2 = base64.b64encode(image_file.read())
# # print(encoded_string1)
# # print(str(encoded_string1)[2:-1])
# r = requests.post(url='https://akhaliq-deepface.hf.space/+/api/predict/', json={"data": ["data:image/jpeg;base64,"+str(encoded_string1)[2:-1],"data:image/jpeg;base64,"+str(encoded_string2)[2:-1],"DeepFace","cosine"]})
# print(r.json())



# print(encoded_string)