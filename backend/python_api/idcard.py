def make_request(img):
    import requests
    url = "https://porcupyne.onrender.com/convert"
    img_path = img

    files = {"file": open(img_path, "rb")}

    response = requests.post(url, files=files)

    if response.status_code == 200:
        # pprint(type(response.json()))
        return response.json()["results"]["lines"]

import re

def is_male(g,lines):
    res = False
    for line in lines:
        res = res or bool(re.search("female", line.lower()))
    if res and g.lower()=='female':
        return True
    if (not res) and g.lower()=='male':
        return True
    return False
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

def aadhar_check(path,name,aadhaar,g):
    try:
        lines = make_request(path)
        return is_male(g,lines) and name_checker(name,lines) and aadhaar_checker(aadhaar,lines)
    except:
        return False