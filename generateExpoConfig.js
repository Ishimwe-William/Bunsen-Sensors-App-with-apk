require('dotenv').config();

const fs = require('fs');

const expoConfig = {
    "expo": {
        "name": "My-app 23722",
        "slug": "snack-bae3569a-603d-4bea-811b-9163db541f60",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/icon.png",
        "userInterfaceStyle": "light",
        "splash": {
            "image": "./assets/splash.png",
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
        },
        "ios": {
            "supportsTablet": true
        },
        "android": {
            "config": {
                "googleMaps": {
                    "apiKey": process.env.GOOGLE_MAP_API_KEY
                }
            },
            "adaptiveIcon": {
                "foregroundImage": "./assets/adaptive-icon.png",
                "backgroundColor": "#ffffff"
            },
            "package": "com.bunsenwill.snackbae3569a603d4bea811b9163db541f60"
        },
        "web": {
            "favicon": "./assets/favicon.png"
        },
        "extra": {
            "eas": {
                "projectId": "7c57cd69-2a26-4b7d-ab09-6441a2211e9a"
            }
        }
    }
};

fs.writeFileSync('app.json', JSON.stringify(expoConfig, null, 2));
