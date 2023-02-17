import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { Masthead } from './Masthead';
import { Features } from './Features';
import { PageWrapper } from 'app/components/PageWrapper';
import { GradientChart } from './Features/victory/gradient-chart';
import { VictoryChartCustom } from './Features/victory/victory-chart';
import { ConvertSvgReactNative } from './Features/svgr/convert-svg-rn';
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
        {/* <GradientChart data={data} /> */}
        <VictoryChartCustom />
        <ConvertSvgReactNative />
        {/* <Masthead />
        <Features /> */}
      </PageWrapper>
    </>
  );
}
