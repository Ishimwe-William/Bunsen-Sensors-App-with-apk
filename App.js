import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunity from '@expo/vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import StepCounter from './components/StepCounter';
import GPSTracker from './components/GPSTracker';
import LightSensor from './components/LightSensor';
import Compass from './components/Compass';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {MotionAndSecurity} from "./components/MotionAndSecurity";


const Tab = createMaterialTopTabNavigator();

const App = () => {
    return (

        <NavigationContainer>
            <Tab.Navigator
                tabBarPosition="bottom"
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarActiveTintColor: "tomato",
                    tabBarInactiveTintColor: "gray",
                    tabBarIndicatorStyle: {
                        height: 1,
                        backgroundColor: "tomato",
                    },
                    tabBarStyle: {
                        height: '10%',
                        borderTopWidth: 0.2,
                        borderColor: "tomato",
                    },
                }}
            >
                <Tab.Screen
                    name="Step Counter"
                    component={StepCounter}
                    options={{
                        tabBarIcon: ({color}) => <MaterialCommunity size={26} name="motion-sensor" color={color}/>,
                    }}
                />
                <Tab.Screen
                    name="GPS Tracker"
                    component={GPSTracker}
                    options={{
                        tabBarIcon: ({color}) => <MaterialCommunity size={26} name="google-maps" color={color}/>,
                    }}
                />
                <Tab.Screen
                    name="Light Sensor"
                    component={LightSensor}
                    options={{
                        tabBarIcon: ({color}) => <MaterialCommunity size={26} name="track-light" color={color}/>,
                    }}
                />
                <Tab.Screen
                    name="Motion And Security"
                    component={MotionAndSecurity}
                    options={{
                        tabBarIcon: ({color}) => <MaterialCommunity size={24} name="phone-rotate-portrait"
                                                                    color={color}/>,
                    }}
                />
                <Tab.Screen
                    name="Compass"
                    component={Compass}
                    options={{
                        tabBarIcon: ({color}) => <FontAwesome size={26} name="compass" color={color}/>,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;

