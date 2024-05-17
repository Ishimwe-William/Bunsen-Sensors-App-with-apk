import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export async function SendPushNotification(title, message) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: message,
            data: { data: 'goes here' },
        },
        trigger: { seconds: 2 },
    });
}
