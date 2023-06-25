import * as Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const HighChart = ({ xAxisData, seriesData, chartTitle }) => {
    const options = {
        chart: {
            type: 'line',
        },
        title: {
            text: chartTitle
        },
        series: [{
            name: 'Changes',
            data: seriesData
        }],
        scrollbar: {
            enabled: true,
        },
        xAxis: {
            title: {
                text: 'Weeks by start dates'
            },
            max: 10,
            categories: xAxisData,
        },
        yAxis: {
            title: {
                text: 'Count'
            },
        }
    };
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}

export default HighChart;
