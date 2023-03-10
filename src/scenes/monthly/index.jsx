import React, { useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetSalesQuery } from 'state/api';
import { ResponsiveLine } from '@nivo/line';
import Header from 'components/Header';

const Monthly = () => {

    const { data } = useGetSalesQuery();
    const theme = useTheme();

    const formattedData = useMemo(() => {
        if (!data) return [];
        const { monthlyData } = data;
        const totalSalesData = {
            id: 'totalSales',
            color: theme.palette.secondary.main,
            data: []
        };
        const totalUnitsData = {
            id: 'totalUnits',
            color: theme.palette.secondary[600],
            data: []
        };
        monthlyData.forEach(({ month, totalSales, totalUnits }) => {
            totalSalesData.data.push({ x: month, y: totalSales });
            totalUnitsData.data.push({ x: month, y: totalUnits });
        });
        return [totalSalesData, totalUnitsData];
    }, [data]);

    return (
        <Box m='1.5rem 2.5rem'>
            <Header title='MONTHLY DATA' subtitle='Chart of monthly data' />
            <Box height='75vh'>
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
                            legend: 'Month',
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
};

export default Monthly;
