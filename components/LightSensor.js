import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import * as Brightness from 'expo-brightness';
import * as Sensors from 'expo-sensors';
import {LightGraph} from "./assets/LightLevelGraph";
import {useIsFocused} from '@react-navigation/native';
import {SendPushNotification} from "./assets/Notification";
import {StatusBar} from 'expo-status-bar';

const LightSensor = () => {
    const [lightLevel, setLightLevel] = useState(0);
    const [isScreenCovered, setIsScreenCovered] = useState(false);
    const [notificationSent, setNotificationSent] = useState(false);
    const SCREEN_COVER_THRESHOLD = 10;
    const BRIGHTNESS_THRESHOLD = 5000;
    const isFocused = useIsFocused();
    const currentBrightnessRef = useRef();
    const debounceTimerRef = useRef(null);

    useEffect(() => {
        const requestPermissions = async () => {
            const {status} = await Brightness.requestPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permission Error', 'Please grant permission to access brightness and sensors.');
            } else {
                await fetchBrightness();
            }
        };
        requestPermissions();
    }, []);

    useEffect(() => {
        const subscription = Sensors.LightSensor.addListener((data) => {
            setLightLevel(data.illuminance);
        });

        return () => {
            subscription.remove();
        };
    }, []);


    useEffect(() => {
        if (isFocused) {
            checkScreenCover(lightLevel);
        }
    }, [isFocused, lightLevel])


    useEffect(() => {

        if (lightLevel <= SCREEN_COVER_THRESHOLD) {
            setIsScreenCovered(true);
            setNotificationSent(false);
        }

        manageNotifications();
    }, [lightLevel])

    const fetchBrightness = async () => {
        try {
            currentBrightnessRef.current = await Brightness.getBrightnessAsync();
        } catch (error) {
            console.error('Error fetching brightness:', error);
        }
    };


    const manageNotifications = () => {
        if (lightLevel > BRIGHTNESS_THRESHOLD && !notificationSent) {
            debounceNotification();
        }
    }

    const checkScreenCover = async (illuminance) => {
        if (illuminance <= SCREEN_COVER_THRESHOLD) {
            try {
                setIsScreenCovered(true);
                await turnOffScreen();
            } catch (error) {
                console.error(error)
            } finally {
                setNotificationSent(false)
            }
            return;
        }

        setIsScreenCovered(false);
        await restoreBrightness()
    };

    const debounceNotification = () => {
        try {
            clearTimeout(debounceTimerRef.current);
            debounceTimerRef.current = setTimeout(() => {
                SendPushNotification('Sensors App - Light', 'The environment is too bright.');
            }, 2000);
        } catch (error) {
            console.error(error)
        } finally {
            setNotificationSent(true);
        }

    };

    const restoreBrightness = async () => {
        if (currentBrightnessRef.current !== undefined) {
            try {
                await Brightness.setSystemBrightnessAsync(currentBrightnessRef.current);
            } catch (error) {
                console.error('Error setting brightness:', error);
            }
        }
    };

    const turnOffScreen = async () => {
        try {
            await Brightness.setSystemBrightnessAsync(0);
        } catch (error) {
            console.error('Error turning off screen:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1,}}>
            <View style={styles.container}>
                <LightGraph lightLevel={lightLevel}/>
                <Text style={styles.lightLevel}>
                    {isScreenCovered ? 'Screen covered' :
                        <>
                            <Text style={styles.threshold}>Screen is covered below {SCREEN_COVER_THRESHOLD} lux!</Text>
                        </>
                    }
                </Text>
                <StatusBar style="dark"/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    lightLevel: {
        fontSize: 18,
    },
    threshold: {
        fontSize: 12,
        marginTop: 10,
        fontStyle: 'italic',
    },
});

export default LightSensor;
