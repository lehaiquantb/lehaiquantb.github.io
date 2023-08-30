import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { Masthead } from './Masthead';
import { Features } from './Features';
import { PageWrapper } from 'app/components/PageWrapper';
import { GradientChart } from './Features/victory/gradient-chart';
import { VictoryChartCustom } from './Features/victory/victory-chart';
import { ConvertSvgReactNative } from './Features/svgr/convert-svg-rn';
import { CandleChart } from './Features/victory/CandleChart';
import { Editor } from './Features/editor/Editor';
import { ColumnChart } from './Features/victory/ColumnChart';
import { ConvertImageBase64 } from './Features/tools/ConvertImageBase64';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { DebugDetectFace } from './Features/tools/DebugDetectFace';
import { CommonTool } from './Features/tools/CommonTool';
import CheckingStatistic from './Features/tools/CheckingStatistic';
import TestAiApi from './Features/tools/TestAiApi';

const data = [
  { x: 1, y: 25 },
  { x: 2, y: 10 },
  { x: 3, y: 20 },
  { x: 4, y: 30 },
  { x: 5, y: 30 },
  { x: 6, y: 30 },
  { x: 7, y: 30 },
  { x: 8, y: 14 },
  { x: 9, y: 2 },
  { x: 10, y: 9 },
  { x: 11, y: 10 },
  { x: 12, y: 11 },
  { x: 13, y: 12 },
  { x: 14, y: 11 },
  { x: 15, y: 30 },
  { x: 16, y: 10 },
];

const onChange = (key: string) => {};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Common Tools`,
    children: <CommonTool />,
  },
  {
    key: '2',
    label: `Debug Detect Face Realtime`,
    children: <DebugDetectFace />,
  },
  // {
  //   key: '3',
  //   label: `Checking Statistic`,
  //   children: <CheckingStatistic />,
  // },
  // {
  //   key: '4',
  //   label: `Test AI API`,
  //   children: <TestAiApi />,
  // },
];

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <NavBar />
      <PageWrapper style={{ height: '100%' }}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        {/* <GradientChart data={data} /> */}
        {/* <VictoryChartCustom /> */}
        {/* <ColumnChart /> */}

        {/* <Masthead />
        <Features /> */}
      </PageWrapper>
    </>
  );
}
