/**
 * https://instamobile.io/react-native-tutorials/react-native-charts/
 *
 * LineChart
 * PieChart
 * ProgressChart
 *  ContributionGraph
 *  StackedBarChart
 */

import {BarChart} from 'react-native-chart-kit'
import {Dimensions} from "react-native";

export const BarGraph = ({acceleration}) => {
    const barData = {
        labels: ['x', 'y', 'z'],
        datasets: [
            {
                data: [acceleration.x, acceleration.y, acceleration.z],
            },
        ],
    };
    return (
        <BarChart
            data={barData}
            width={(Dimensions.get('window').width) - 40}
            height={220}
            yAxisSuffix={'g'}
            chartConfig={{
                backgroundColor: 'tomato',
                backgroundGradientFrom: '#000',
                backgroundGradientTo: 'tomato',
                decimalPlaces: 4,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16,
                }
            }}
        />
    )
}
