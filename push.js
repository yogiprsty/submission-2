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
    "endpoint": "https://fcm.googleapis.com/fcm/send/cNdw9JpYbSI:APA91bGxFaX-28jfgaCUcWS21pXTZn9sGkfUAJ8GrlKMUJ71Y3Kfs05EqBcno8jFaC7D6bu65PoRzecLoWQYVi1gjCYITJoC2nQ9D7PVYXdP8PgCTRxhK02vXFV9jlOuk8Xe07lvANy0",
    "keys": {
        "p256dh": "BLAcSihqgmFjBNW2XfknQXdKIQ+2pBE4rEl1/MnQ/Hv+wB2Xm9uVlcS1n8ow3jm/WZGh26j9+2WOxvw2kwBxvJE=",
        "auth": "rW3RkmrbD0PFYOzp0AwvxQ=="
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