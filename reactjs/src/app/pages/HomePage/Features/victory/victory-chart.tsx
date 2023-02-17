import React from 'react';
import { VictoryAxis, VictoryChart, VictoryTheme } from 'victory';
import { ColorValue, ViewStyle, View, ViewProps } from 'react-native';
// eslint-disable-next-line import/no-named-as-default
import Svg, { Defs, LinearGradient, Stop } from 'react-native-svg';
// import { Colors } from 'react-native-ui-lib';
import { VictoryArea } from 'victory';
const datax = [
  { x: 1, y: 0 },
  { x: 2, y: 10 },
  { x: 3, y: 20 },
  { x: 4, y: 30 },
  { x: 5, y: 30 },
  { x: 6, y: 35 },
  { x: 7, y: 30 },
  { x: 8, y: 14 },
  { x: 9, y: 2 },
  { x: 10, y: 9 },
  { x: 11, y: 10 },
  { x: 12, y: 11 },
  { x: 13, y: 12 },
  { x: 14, y: 11 },
  { x: 15, y: 30 },
  { x: 16, y: 0 },
];

type Props = {
  data?: {
    x: number;
    y: number;
  }[];
  width?: number;
  height?: number;
  widthChart?: number;
  heightChart?: number;
  maxDomain?: {
    x?: number;
    y?: number;
  };
  color?: ColorValue;
};

export const VictoryChartCustom = (props: Props) => {
  const {
    data = datax,
    width = 500,
    height = 200,
    widthChart = 500,
    heightChart = 200,
    maxDomain = { x: 16 },
    color = 'black',
  } = props;

  return (
    <div style={{ marginLeft: '200px', width: '900px', height: '1000px' }}>
      <VictoryChart>
        <Svg
          style={[
            {
              height,
              width,
            },
          ]}
        >
          <Defs>
            <LinearGradient id="gradient" x1="50%" y1="30%" x2="50%" y2="100%">
              <Stop offset="0%" stopColor={color} stopOpacity={0.33} />
              <Stop offset="100%" stopColor={color} stopOpacity={0.01} />
            </LinearGradient>
          </Defs>
        </Svg>
        <VictoryArea
          standalone={false}
          interpolation="natural"
          width={widthChart}
          height={heightChart}
          maxDomain={maxDomain}
          padding={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          // domainPadding={{
          //   x: 0,
          //   y: 0,
          // }}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          style={{
            data: {
              fill: 'url(#gradient)',
              stroke: String(color),
              strokeWidth: 1,
            },
          }}
          data={data}
        />
        <VictoryAxis style={{ axis: { stroke: 'none' } }} offsetY={60} />
      </VictoryChart>
    </div>
  );
};
