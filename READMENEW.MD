

## react

```bash



# start app
yarn start;


#view logs
tail -f ~/Library/Logs/CoreSimulator/xxxx/system.log;



tail -f ~/Library/Logs/CoreSimulator/D14AE015-145D-4E76-9F55-7DC5B7275B18/system.log;



npm install --save react react-dom react-scripts;


npm update -g

npm update;



```


GADMobileAds.configure(withApplicationID: "ca-app-pub-2238175514602475~2579388810")


// banner id 
ca-app-pub-2238175514602475/4220322281




#### STORAGE FLOW

PROPS

REDUX STATE

ASYNC STORAGE

FIREBASE

####### LOCALE
Locale is set in persist:root when user lands on homeIntro


####### LOCATION

src/native/components/pages/admin/WorkerSignUpLocation.js
When set location page is visited, save to asyncstorage or redux store which may be same


## APP


### Save Location

src/native/components/pages/admin/WorkerSignUpLocation.js






## issues with pods not being installed

https://github.com/invertase/react-native-firebase/issues/614


## expo issue

    "react-native": "~0.55.2",
    
    "react-native": "https://github.com/expo/react-native/archive/sdk-27.0.0.tar.gz",

    "react-native": "https://github.com/expo/react-native/archive/sdk-30.0.0.tar.gz",

## EXPO

app file used by simulator

```bash


cd /Users/amirmeshkin/Library/Developer/Xcode/DerivedData/trabajamos-aibtfhwgqramsdeifijzebdwjqfz/Build/Products/Debug-iphonesimulator

/Users/amirmeshkin/Library/Developer/Xcode/DerivedData/trabajamos-aibtfhwgqramsdeifijzebdwjqfz/Build/Products/Debug-iphonesimulator
```


## MISC COMMANDS


```javascript

    const UID = Firebase.auth().currentUser.uid;
    
    
````


```bash



#clear npm cache
npm cache clean --force

```
## API

```bash

# Post a new document to worker
# /api/worker/get/:id
# http://localhost:8888/api/worker/post

# Get ALL workers
# /api/workers/get
# http://localhost:8888/api/workers/get

# Get one worker
# /api/worker/get/:id
# http://localhost:8888/api/worker/get/1



```


### ISSUES WITH PACKAGE VERSIOS

redux-persist needs to be 5.6.12

upgraded to 5.6.12 but problem still exists, upgraded to 5.10.0 and still exists

https://github.com/rt2zz/redux-persist/issues/717

  "redux-persist": "^5.9.1",


#### error list

copy and paste errors here

expo publish error

[18:22:07] app.json specifies: /Users/amirmeshkin/_sites/apps/trabajamos4/ios/trabajamos/Supporting/shell-app.bundle, but that directory does not exist.

[18:22:18] ENOENT: no such file or directory, open '/Users/amirmeshkin/_sites/apps/trabajamos4/android/app/src/main/java/host/exp/exponent/generated/AppConstants.java'
[18:22:18] Set EXPO_DEBUG=true in your env to view the stack trace.

