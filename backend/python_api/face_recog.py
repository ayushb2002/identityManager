def face_match(f1="v2.jpg",f2="v1.jpg"):
    from deepface import DeepFace
    backends = ['opencv', 'ssd', 'dlib', 'mtcnn', 'retinaface', 'mediapipe']
    try:
        result = DeepFace.verify(img1_path=f1, img2_path=f2, detector_backend=backends[0])
        if result['verified']==True:
            return {'match':True, 'message': 'Faces matched!'}
        else:
            return {'match':False, 'message': 'Faces don\'t match!'}
    except:
        return {'match':False, 'message': 'Can\'t identify human!'}
    
print(face_match())