import { useRef, useState } from 'react';
import { AppColors } from 'styles/StyleConstants';
import {
  Candle,
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryZoomContainer,
} from 'victory';

interface ICandlestickData {
  x: string;
  open: string;
  close: string;
  high: string;
  low: string;
}

const sampleData: ICandlestickData[] = [
  {
    close: '23653.6',
    high: '23653.6',
    low: '23652.8',
    open: '23652.8',
    x: '1677573480000',
  },
  {
    close: '23667.95',
    high: '23667.95',
    low: '23654',
    open: '23654',
    x: '1677573540000',
  },
  {
    close: '23671.1',
    high: '23671.1',
    low: '23668.7',
    open: '23671',
    x: '1677573600000',
  },
  {
    close: '23681.8',
    high: '23681.8',
    low: '23672.1',
    open: '23672.1',
    x: '1677573660000',
  },
  {
    close: '23681.8',
    high: '23681.8',
    low: '23681.8',
    open: '23681.8',
    x: '1677573720000',
  },
  {
    close: '23676.2',
    high: '23676.4',
    low: '23676.2',
    open: '23676.4',
    x: '1677573780000',
  },
  {
    close: '23676.2',
    high: '23676.2',
    low: '23676.2',
    open: '23676.2',
    x: '1677573840000',
  },
  {
    close: '23666.7',
    high: '23666.7',
    low: '23666.7',
    open: '23666.7',
    x: '1677573900000',
  },
  {
    close: '23666.7',
    high: '23666.7',
    low: '23666.7',
    open: '23666.7',
    x: '1677573960000',
  },
  {
    close: '23666.7',
    high: '23666.7',
    low: '23666.7',
    open: '23666.7',
    x: '1677574020000',
  },
  {
    close: '23644.4',
    high: '23644.4',
    low: '23644.4',
    open: '23644.4',
    x: '1677574080000',
  },
  {
    close: '23644.4',
    high: '23644.4',
    low: '23644.4',
    open: '23644.4',
    x: '1677574140000',
  },
  {
    close: '23644.4',
    high: '23644.4',
    low: '23644.4',
    open: '23644.4',
    x: '1677574200000',
  },
  {
    close: '23645.25',
    high: '23645.25',
    low: '23628.5',
    open: '23628.5',
    x: '1677574260000',
  },
  {
    close: '23664.85',
    high: '23664.85',
    low: '23651.6',
    open: '23651.6',
    x: '1677574320000',
  },
  {
    close: '23682.9',
    high: '23682.9',
    low: '23674.7',
    open: '23674.7',
    x: '1677574380000',
  },
  {
    close: '23668.25',
    high: '23668.3',
    low: '23668.25',
    open: '23668.3',
    x: '1677574440000',
  },
  {
    close: '23678.55',
    high: '23678.55',
    low: '23676.6',
    open: '23676.6',
    x: '1677574500000',
  },
  {
    close: '23680.05',
    high: '23680.05',
    low: '23678.8',
    open: '23678.8',
    x: '1677574560000',
  },
  {
    close: '23680.05',
    high: '23680.05',
    low: '23680.05',
    open: '23680.05',
    x: '1677574620000',
  },
];

export const CandleChart = () => {
  const [candleStickData, setCandleStickData] =
    useState<ICandlestickData[]>(sampleData);

  const chartDomain = useRef<[number, number]>([23628.5, 23682.9]);

  return (
    <div>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 0, y: 0 }}
        padding={{
          top: 25,
          bottom: 30,
          left: 20,
          right: 60,
        }}
        height={300}
        width={600}
        domain={{ y: [chartDomain.current[0], chartDomain.current[1]] }}
        containerComponent={<VictoryZoomContainer />}
      >
        <VictoryAxis
          dependentAxis
          orientation="left"
          style={{
            axis: { stroke: AppColors.grayF2 },
            grid: { stroke: () => AppColors.grayF2 },
            ticks: {
              stroke: AppColors.grayF2,
              size: 20,
              fill: AppColors.gray83,
            },
            tickLabels: {
              fontSize: 15,
              padding: 10,
              fill: AppColors.transparent,
            },
          }}
        />
        <VictoryAxis
          orientation="bottom"
          style={{
            axis: { stroke: AppColors.grayF2 },
            ticks: {
              stroke: AppColors.grayF2,
              size: 0,
              fill: AppColors.gray83,
            },
          }}
          tickFormat={t =>
            `${new Date(+t).getHours()}:${new Date(+t).getMinutes()}`
          }
          tickLabelComponent={<VictoryLabel textAnchor="end" dx={15} dy={0} />}
          tickCount={5}
        />
        <VictoryAxis
          dependentAxis
          orientation="right"
          style={{
            axis: { stroke: AppColors.grayF2 },
            grid: { stroke: () => AppColors.grayF2 },
            ticks: { stroke: AppColors.grayF2, size: 100 },
            tickLabels: { fontSize: 15, padding: 10, fill: AppColors.gray83 },
          }}
          tickLabelComponent={
            <VictoryLabel textAnchor="end" dx={-57} dy={-10} />
          }
        />
        <VictoryAxis
          tickValues={[]}
          maxDomain={{ x: 1677574620000 }}
          minDomain={{ x: 1677573480000 }}
          y={15}
        />
        <VictoryGroup>
          <VictoryCandlestick
            data={candleStickData}
            candleColors={{
              positive: AppColors.green46,
              negative: AppColors.redF9,
            }}
            style={{
              data: {
                fill: ({ datum }) =>
                  datum.open > datum.close
                    ? AppColors.redF9
                    : AppColors.green46,
                stroke: ({ datum }) =>
                  datum.open > datum.close
                    ? AppColors.redF9
                    : AppColors.green46,
              },
            }}
            dataComponent={<Candle rectComponent={<rect rx={3} />} />}
          />
          <VictoryLine
            interpolation="natural"
            style={{
              data: { stroke: AppColors.blue2F },
            }}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};
