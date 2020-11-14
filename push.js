const webPush = require('/usr/local/lib/node_modules/web-push')

const vapidKeys = {
    "publicKey": "BOWPiUa4rFJ5QYrai7F5pMWhtGWVCwNtjS6xUiUwndd4xjyFHGMU4uJ1Yj8yIFIrEuIGTfauaRAo6JFVjetDDGQ",
    "privateKey": "Uz8l6-InK5DsRgnClRgNMM_P2dLynG7Akzb_USmjQHo"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/d7ly7QDbaMI:APA91bEaSlqVgrLt1F12HDcac-N9g7LFa4himkh8dPnyurzNa5I57ceZ4TbIpFVMarL6cfHWeNIky25F-qt3twSXgIuCYWKQtvd5JheiIYZaKhlG-AqhZzJlI70Sp9xP0eO4htRsrtKI",
    "keys": {
        "p256dh": "BBcDX6CGfBv/vnA+k5mb1Ta/OEAh567s7Ntc/7lGPYLqqsKR8ZZ5iAZb8Ij7RgNt7iHiPXbaD4I5nqk3qKJy0C8=",
        "auth": "amySA7e3DWvgUPaIbpKb/w=="
    }
};
var payload = 'Update Standings';

var options = {
    gcmAPIKey: '134266062484',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);