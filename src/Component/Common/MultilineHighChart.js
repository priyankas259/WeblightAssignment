import * as Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const MultiLineHighChart = ({ xAxisData, seriesData }) => {
    const options = {
        chart: {
            type: 'line',
        },
        title: {
            text: 'Contributor Changes'
        },
        series: seriesData,
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

export default MultiLineHighChart;
