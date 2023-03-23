import React, { FC, useEffect, useState } from 'react';
import { gaussian, smoothSignal } from 'utils/gau';
import { VictoryBar, VictoryChart, VictoryHistogram } from 'victory';
import simplify from 'simplify-geometry';
import { Point, Simplify, SimplifyTo } from 'curvereduce';
type Props = {};
// console.log('simplifyGeometry', simplify);

const maxY = 200;

// number of points
const maxX = 6000; //2 * 60 * 60;
const convertToMaxX = 1000;
const time = 2 * 60 * 60;

const randomArray = (length: number, max: number) => {
  const _arrs = Array.from(
    { length },
    (_, i) => Math.random() * Math.random() * max,
  );
  return _arrs;
};

const arrX = randomArray(maxX, time).sort();
console.log('arrX', arrX);

const arrY = randomArray(maxX, maxY);

const linestring = arrX.map((item, index) => [item, arrY[index]]);
const points = arrX.map((item, index) => ({ x: item, y: arrY[index] }));

// console.log('linestring', simplify(linestring, 2.9));
const _arrs = points;
const _sampleHistogramData = SimplifyTo(points, convertToMaxX);
console.log('points', points);
console.log('simplify', _sampleHistogramData);

console.log('[arrs.length]', _arrs?.length);
console.log('[sampleHistogramData.length]', _sampleHistogramData?.length);
export const ColumnChart: FC<Props> = (props: Props) => {
  const { ...rest } = props;
  //   const [arrs, setArrs] = useState<Point[]>([]);
  //   const [sampleHistogramData, setSampleHistogramData] = useState<Point[]>([]);
  useEffect(() => {
    // const _sampleHistogramData = simplify(linestring, 10)?.map(item => ({
    //   x: item[0],
    //   y: item[1],
    // }));
    // const _sampleHistogramData = gaussian(arrs, 10);
    // const _sampleHistogramData2 = _sampleHistogramData.map(item =>
    //   isNaN(item) ? 0 : item,
    // );
    // setArrs(_arrs);
    // setSampleHistogramData(_sampleHistogramData);
    // console.log('arrs', _arrs);
    // console.log('sampleHistogramData', _sampleHistogramData);
  }, []);

  return (
    <div>
      <VictoryChart>
        <VictoryBar
          style={{
            data: { fill: '#c43a31' },
          }}
          data={_arrs}
          //   bins={[0, 3, 7, 10]}
        />
      </VictoryChart>
      <VictoryChart>
        <VictoryBar
          style={{
            data: { fill: '#c43a31' },
          }}
          data={_sampleHistogramData}
          //   bins={[0, 3, 7, 10]}
          //   bins={5}
        />
      </VictoryChart>
    </div>
  );
};

ColumnChart.defaultProps = {};
