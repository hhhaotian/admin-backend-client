import React, { useMemo, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme, Box } from '@mui/material';
import { useGetSalesQuery } from 'state/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from 'components/Header';

function Daily () {
    const [startDate, setStartDate] = useState(new Date('2021-02-01'));
    const [endDate, setEndDate] = useState(new Date('2021-03-01'));
    const { data } = useGetSalesQuery();
    const theme = useTheme();

    const formattedData = useMemo(() => {
        if (!data) return [];
        const dailySales = {
            id: 'dailySales',
            color: theme.palette.secondary.main,
            data: []
        };
        const dailyUnits = {
            id: 'dailyUnits',
            color: theme.palette.secondary[600],
            data: []
        };
        const { dailyData } = data;
        dailyData.forEach(item => {
            const date = new Date(item.date);
            if (date >= startDate && date <= endDate) {
                const spliteDate = item.date.substring(item.date.indexOf('-') + 1);
                dailySales.data = [
                    ...dailySales.data,
                    { x: spliteDate, y: item.totalSales }
                ];
                dailyUnits.data = [
                    ...dailyUnits.data,
                    { x: spliteDate, y: item.totalUnits }
                ];
            }

        });
        return [dailySales, dailyUnits];

    }, [data, startDate, endDate]);


    return (
        <Box m='1.5rem 2.5rem'>
            <Header title='DAILY SALES' subtitle='Chart of daily sales' />
            <Box height='75vh'>
                <Box display='flex' justifyContent='flex-end'>
                    <Box>
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </Box>
                    <Box>
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </Box>


                </Box>
                {data ? <>
                    <ResponsiveLine
                        data={formattedData}
                        margin={{ top: 50, right: 50, bottom: 50, left: 80 }}
                        colors={{ datum: 'color' }}
                        xScale={{ type: 'point' }}
                        yScale={{
                            type: 'linear',
                            min: 'auto',
                            max: 'auto',
                            stacked: false,
                            reverse: false
                        }}
                        theme={{
                            axis: {
                                domain: {
                                    line: {
                                        stroke: theme.palette.secondary[200]
                                    },
                                },
                                legend: {
                                    text: {
                                        fill: theme.palette.secondary[200]
                                    }
                                },
                                ticks: {
                                    line: {
                                        stroke: theme.palette.secondary[200],
                                        strokWidth: 1
                                    },
                                    text: {
                                        fill: theme.palette.secondary[200]
                                    }
                                }
                            },
                            legends: {
                                text: {
                                    fill: theme.palette.secondary[200]
                                }
                            },
                            tooltip: {
                                container: {
                                    color: theme.palette.primary.main
                                }
                            }
                        }}
                        yFormat=" >-.2f"
                        curve='catmullRom'
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            orient: 'bottom',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Date',
                            legendOffset: 36,
                            legendPosition: 'middle'
                        }}
                        axisLeft={{
                            orient: 'left',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: `Total`,
                            legendOffset: -60,
                            legendPosition: 'middle'
                        }}
                        enableGridX={false}
                        enableGridY={false}
                        pointSize={10}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabelYOffset={-12}
                        useMesh={true}
                        legends={
                            [
                                {
                                    anchor: 'top-right',
                                    direction: 'column',
                                    justify: false,
                                    translateX: 30,
                                    translateY: -40,
                                    itemsSpacing: 0,
                                    itemDirection: 'left-to-right',
                                    itemWidth: 80,
                                    itemHeight: 20,
                                    itemOpacity: 0.75,
                                    symbolSize: 12,
                                    symbolShape: 'circle',
                                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemBackground: 'rgba(0, 0, 0, .03)',
                                                itemOpacity: 1
                                            }
                                        }
                                    ]
                                }
                            ]}
                    />
                </> : <></>}


            </Box>

        </Box>
    );
}

export default Daily;
