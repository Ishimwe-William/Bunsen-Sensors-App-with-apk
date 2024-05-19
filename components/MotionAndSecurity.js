import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, ScrollView, View} from 'react-native';
import {Accelerometer} from 'expo-sensors';
import * as ScreenOrientation from 'expo-screen-orientation';
import {SendPushNotification} from "./assets/Notification";
import {BarGraph} from "./assets/BarChartGraph";
import {useIsFocused} from "@react-navigation/native";
import {StatusBar} from 'expo-status-bar';

export const MotionAndSecurity = () => {
    const [acceleration, setAcceleration] = useState({x: 0, y: 0, z: 0});
    const [subscription, setSubscription] = useState(null);
    const [magnitude, setMagnitude] = useState(0);
    const isFocused = useIsFocused();
    const SHAKE_THRESHOLD = 2;

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    const _subscribe = () => {
        setSubscription(Accelerometer.addListener(setAcceleration));
        Accelerometer.setUpdateInterval(1000);
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    const calculateMagnitude = () => {
        const {x, y, z} = acceleration;
        setMagnitude(Math.sqrt((x ** 2 + y ** 2 + z ** 2)))
    }

    const checkVibrationState = async () => {
        if (magnitude > SHAKE_THRESHOLD)
            await SendPushNotification('Sensors App - Accelerometer', 'We noticed a movement of shaking!')
    }
    const changeOrientation = async () => {
        const {x, y} = acceleration;
        if (x > 0.65) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        } else if (x < -0.65) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        } else if (y > 0) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
        }
    };

    useEffect(() => {
        if (isFocused) changeOrientation().then();
        else ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
        calculateMagnitude();
        checkVibrationState().then()
    }, [acceleration]);

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1,}}>
            <View style={styles.container}>
                <Text style={styles.title}>Accelerometer</Text>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={[styles.cell, {fontWeight: 'bold'}]}>Axis</Text>
                        <Text style={[styles.cell, {fontWeight: 'bold'}]}>Value</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>x</Text>
                        <Text style={styles.cell}>{acceleration.x.toFixed(6)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>y</Text>
                        <Text style={styles.cell}>{acceleration.y.toFixed(6)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>z</Text>
                        <Text style={styles.cell}>{acceleration.z.toFixed(6)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Magnitude</Text>
                        <Text style={styles.cell}>{magnitude.toFixed(6)}</Text>
                    </View>
                </View>
                <View style={{padding: 3, marginTop: 5}}>
                    <BarGraph acceleration={acceleration}/>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={subscription ? _unsubscribe : _subscribe}
                        style={styles.button}>
                        <Text>{subscription ? 'Stop' : 'Start'}</Text>
                    </TouchableOpacity>
                </View>
                <StatusBar style="dark"/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    text: {
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: 15,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 8,
    },
    title: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    table: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    cell: {
        flex: 1,
        padding: 4,
        textAlign: 'center',
    },
});
