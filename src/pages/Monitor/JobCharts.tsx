import React from 'react';
import ReactApexChart from "react-apexcharts";

import getChartColorsArray from "../../Components/Common/ChartDynamicColor";

const JobWidgetCharts = ({ dataColors, series }: any) => {
    var areacharteathereumColors = getChartColorsArray(dataColors);

    var options: any = {
        chart: {
            width: 130,
            height: 46,
            type: "area",
            sparkline: {
                enabled: true,
            },
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            width: 1.5,
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [50, 100, 100, 100],
            },
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function (seriesName: any) {
                        return ''
                    }
                }
            },
            marker: {
                show: false
            }
        },
        colors: areacharteathereumColors,
    };
    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="area"
                height="46"
                width="130"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

const StatisticsApplicationsChart = ({ dataColors }: any) => {
    var statisticsApplicationColors = getChartColorsArray(dataColors);

    const series: any = [{
        name: 'Success',
        type: 'column',
        data: [40, 50, 28, 74, 39, 87, 54, 36, 50, 87, 84]
    }, {
        name: 'Error',
        type: 'column',
        data: [4, 5, 42, 10, 24, 28, 60, 35, 47, 64, 78]
    }, {
        name: 'Total',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    }];
    var options: any = {
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
            toolbar: {
                show: false,
            },
        },
        legend: {
            show: true,
            offsetY: 10,
        },
        stroke: {
            width: [0, 0, 2, 2],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                columnWidth: '30%'
            }
        },
        fill: {
            opacity: [1, 1, 0.1, 1],
            gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
            }
        },
        labels: ['01/01/2022', '02/01/2022', '03/01/2022', '04/01/2022', '05/01/2022', '06/01/2022', '07/01/2022',
            '08/01/2022', '09/01/2022', '10/01/2022', '11/01/2022'
        ],
        colors: statisticsApplicationColors,
        markers: {
            size: 0
        },
        xaxis: {
            type: 'datetime'
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y: any) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " points";
                    }
                    return y;

                }
            }
        }
    }
    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={350}
                className="apex-charts pb-3"
            />
        </React.Fragment>
    );
};


export { JobWidgetCharts, StatisticsApplicationsChart };