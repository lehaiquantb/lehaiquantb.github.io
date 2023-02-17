import React from 'react';
import { ColorValue, ViewStyle, View, ViewProps } from 'react-native';
// eslint-disable-next-line import/no-named-as-default
import Svg, { Defs, LinearGradient, Stop } from 'react-native-svg';
// import { Colors } from 'react-native-ui-lib';
import { VictoryArea } from 'victory';

type Props = {
  data: {
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

export const GradientChart = (props: Props) => {
  const {
    data,
    width = 1000,
    height = 500,
    widthChart = 1000,
    heightChart = 500,
    maxDomain = { y: 32 },
    color = 'black',
  } = props;

  return (
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
        domainPadding={{
          x: 0,
          y: 0,
        }}
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
    </Svg>
  );
};
