import React, { FC, useEffect, useMemo, useState } from 'react';
import { gaussian, smoothSignal } from 'utils/gau';
import { VictoryBar, VictoryChart, VictoryHistogram } from 'victory';
import simplifyJS from 'simplify-js';
import undulation from './undulation.json';
import { InputNumber, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

type Props = {};
// console.log('simplifyGeometry', simplify);

type Point = {
  x: number;
  y: number;
};
const maxY = 100;

// number of points
const maxX = 10000; //2 * 60 * 60;
const convertToMaxX = 1000;
const time = 2 * 60 * 60;

const randomArray = (length: number, max: number) => {
  const _arrs = Array.from({ length }, (_, i) => {
    const r = Math.random() * Math.random() * max;
    return r;
  });
  return _arrs;
};

const arrX = randomArray(maxX, time).sort();
console.log('arrX', arrX);

const arrY = randomArray(maxX, maxY);

const linestring = arrX.map((item, index) => [item, arrY[index]]);

// const points = arrX.map((item, index) => ({ x: item, y: arrY[index] }));
const points = undulation.attention.map((item, index) => ({
  x: item.start,
  y: item.level,
}));

// console.log('linestring', simplify(linestring, 2.9));
const _arrs = points;
// const results = SimplifyTo(points, convertToMaxX);
const results = simplifyJS(points, 25, true);
// console.log('points', points);
// console.log('simplify', results);

// console.log('[arrs.length]', _arrs?.length);
// console.log('[sampleHistogramData.length]', results?.length);
export const ColumnChart: FC<Props> = (props: Props) => {
  const { ...rest } = props;
  const [undulations, setUndulations] = useState<Point[]>(_arrs);
  const [tolarence, setTolarence] = useState<number>(25);

  const uploadProps: UploadProps = {
    name: 'file',
    async onChange(info) {
      const text = await info.file.originFileObj?.text();
      const undulation = JSON.parse(text || '{}');
      const _u =
        undulation?.attention?.map((item, index) => ({
          x: item.start,
          y: item.level,
        })) ?? [];
      setUndulations(_u);
      // if (info.file.status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      // if (info.file.status === 'done') {
      //   message.success(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === 'error') {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
  };

  const undulationsResult = useMemo(() => {
    return simplifyJS(undulations, tolarence, true);
  }, [undulations, tolarence]);
  console.log('UNDULATIONS', undulations);
  console.log('RESULTS', undulationsResult);

  //   const [sampleHistogramData, setSampleHistogramData] = useState<Point[]>([]);
  useEffect(() => {
    // const results = simplify(linestring, 10)?.map(item => ({
    //   x: item[0],
    //   y: item[1],
    // }));
    // const results = gaussian(arrs, 10);
    // const results2 = results.map(item =>
    //   isNaN(item) ? 0 : item,
    // );
    // setArrs(_arrs);
    // setSampleHistogramData(results);
    // console.log('arrs', _arrs);
    // console.log('sampleHistogramData', results);
  }, []);

  return (
    <div style={{ marginTop: 100, marginBottom: 100 }}>
      <div>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Choose undulation file</Button>
        </Upload>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <InputNumber defaultValue={25} onChange={setTolarence as any} />
        <Tag>{`From: ${undulations.length}`}</Tag>
        <Tag>{`To: ${undulationsResult.length}`}</Tag>
      </div>
      <div style={{ marginTop: 30, marginBottom: 30 }}>
        <VictoryBar
          height={30}
          style={{
            data: { fill: '#c43a31' },
          }}
          data={undulations}
          //   bins={[0, 3, 7, 10]}
        />
        <br />
        <VictoryBar
          height={30}
          style={{
            data: { fill: '#c43a31' },
          }}
          data={undulationsResult}
          //   bins={[0, 3, 7, 10]}
          //   bins={5}
        />
      </div>
    </div>
  );
};

ColumnChart.defaultProps = {};
