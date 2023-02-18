from pprint import pprint

def make_request(img):
    import requests
    url = "https://porcupyne.onrender.com/convert"
    img_path = img

    files = {"file": open(img_path, "rb")}

    response = requests.post(url, files=files)

    if response.status_code == 200:
        # pprint(type(response.json()))
        return response.json()["results"]["lines"]



lines = make_request()
import re

def is_male(lines):
    res = False
    for line in lines:
        res = res or bool(re.search("MALE", line))
    return res
def name_checker(name, lines):
    res = False
    for line in lines:
        res = res or bool(re.search(name.lower(), line.lower()))
    return res
def aadhaar_checker(aadhaar, lines):
    res = False
    aadhaar = str(aadhaar)
    aadhaar = aadhaar[0:4] + " " + aadhaar[4:8] + " " + aadhaar[8:12]
    for line in lines:
        res = res or bool(re.search(aadhaar, line))
    return res

print(is_male(lines))
print(name_checker("Vedant Agnihotri", lines))
print(aadhaar_checker("570764181422", lines))