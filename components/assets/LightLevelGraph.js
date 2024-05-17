/**
 * <h3>AnimatedCircularProgress</h3> taken from:
 * <b>https://www.npmjs.com/package/react-native-circular-progress
 **/

import React from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {StyleSheet, Text} from "react-native";

export const LightGraph = ({lightLevel}) => {
    const percentage = (lightLevel / 30000) * 100;

    return (
        <>
            <Text style={styles.title}>Light Sensor</Text>

            <AnimatedCircularProgress
                size={300}
                width={30}
                fill={percentage ? percentage : 0}
                tintColor="tomato"
                backgroundColor="gray"
                rotation={270}
                arcSweepAngle={180}
            >
                {() => (
                    <>
                        <Text style={{fontSize: 44, margin: 35, fontFamily: 'sans-serif-light'}}>
                            {percentage ? percentage.toFixed(2) : 0}%
                        </Text>
                        <Text>Range: [0 - 30,000] lux </Text>
                        <Text style={styles.lightLevel}>
                            Light level: {lightLevel.toFixed(2) + ' lux'}
                        </Text>
                    </>
                )}
            </AnimatedCircularProgress>
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
    },
    lightLevel: {
        fontSize: 17,
    },
});

