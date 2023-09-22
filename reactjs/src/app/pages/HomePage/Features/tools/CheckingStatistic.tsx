import { Button, Col, Divider, Input, Row } from 'antd';
import { getCheckingList, getList, loggerApi } from 'api/logger.api';
import React, { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import { FaceDetector } from './DebugDetectFace';
import ReactJson from 'react-json-view';
import dayjs from 'dayjs';
const { REACT_APP_LOGGER_BASE_URL } = process.env;

type Props = {};

type Item = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  deletedBy: null;
  updatedBy: null;
  requestId: string;
  result: {
    message: string;
    data: {
      current_time: string;
      email: string;
      fullName: string;
      id: number;
      label_spoofing: string;
      checkingImageUrl: string;
    }[][];
    version: string;
  };
  problem: null;
  success: boolean;
  appConfig: {
    persistNavigation: 'dev';
    catchErrors: 'always';
    exitRoutes: ['Welcome'];
    API_URL: string;
    EAC_AI_AUTO_CHECKING_URL: 'https://eac.ttloffice.com/eac-ai/api/v1';
    DEBUG: {
      SOCKET_DEBUG_ENABLED: true;
      SOCKET_DEBUG_URI: 'https://5000.quanlh.code-server.dev-tokyotechlab.com';
      LOGGER_FILE_ENABLED: true;
    };
    APP_VERSION: '1.0.4 (PROD - 18/08/2023)';
    ENV: 'production';
  };
  __v: 0;
  checkingImageUrls: string[];
};

const StatisticItem = (item: Item) => {
  return (
    <div>
      <h3>{item?.requestId}</h3>

      <img
        src={
          item?.result?.data?.[0]?.[0]?.checkingImageUrl ||
          item?.checkingImageUrls?.[0] ||
          'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg'
        }
        alt=""
        style={{ width: 200 }}
      />
      <Row>
        <Col>
          <ReactJson src={item.result ?? {}} />
        </Col>
      </Row>
      <Divider />
    </div>
  );
};

const CheckingStatistic: FC<Props> = (props: Props) => {
  const defaultUrl = `${REACT_APP_LOGGER_BASE_URL}/checking?limit=1000&page=1&orderBy&orderDirection&fromTime=${dayjs()
    .startOf('D')
    .toISOString()}&toTime=${dayjs().endOf('D').toISOString()}`;
  const [url, setUrl] = useState(defaultUrl);
  const { data, error, isLoading, mutate } = useSWR([url], getList);
  const [url1, setUrl1] = useState(defaultUrl);

  useEffect(() => {
    console.log(data?.data?.items);
  }, [data]);

  const onClear = () => {};
  const onChangeUrl = u => {
    setUrl1(u.target.value);
  };

  const onLoad = () => {
    setUrl(url1);
  };

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      <Input value={url1} onChange={onChangeUrl} />
      <div>
        {data?.data?.items?.map((item, index) => (
          <StatisticItem {...item} key={item?._id} />
        ))}
        <Button
          type="primary"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          onClick={onClear}
        >
          Clear
        </Button>
        <Button
          type="primary"
          style={{
            position: 'absolute',
            top: 100,
            right: 0,
          }}
          onClick={onLoad}
        >
          Load
        </Button>
      </div>
    </div>
  );
};

CheckingStatistic.defaultProps = {};

export default CheckingStatistic;
