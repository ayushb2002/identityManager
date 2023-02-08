import keras_ocr
pipeline = keras_ocr.pipeline.Pipeline(scale=1)
images = [
    keras_ocr.tools.read(url) for url in [
        'aadhar.jpg',
        'id.jpg',
    ]
]
print(len(images))
from pprint import pprint
prediction_groups = pipeline.recognize(images)
pprint(prediction_groups)
sorted_aadhaar = sorted(prediction_groups[0], key=lambda x: (x[1][0][1],x[1][0][0]))
[print(x[0]) for x in sorted_aadhaar]
sorted_id = sorted(prediction_groups[1], key=lambda x: (x[1][0][1],x[1][0][0]))
[print(x[0]) for x in sorted_id]