import { Alert, Button, Card, Col, Divider, Row, Tag } from 'antd';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { TimsSocket, socketClient } from 'utils/socket/socket.client';
import ReactJson from 'react-json-view';
import { cloneDeep } from 'lodash';
type FaceDetectorProps = {
  images: string[];
  requestId: string;
  sendAt?: string;
};

type TagFaceProps = {
  type: 'success' | 'not-found' | 'processing' | 'error' | String;
  children: string;
};

export const TagFace = (props: TagFaceProps) => {
  const { type, children } = props;
  const text = children?.toUpperCase() ?? 'UNKNOWN';
  const color = useMemo(() => {
    switch (type) {
      case 'not-found':
        return 'magenta';

      default:
        return type;
    }
  }, [type]);

  return (
    <Tag color={color as string} style={{ fontSize: 'bold' }}>
      {text}
    </Tag>
  );
};

export type PROBLEM_CODE =
  | 'CLIENT_ERROR'
  | 'SERVER_ERROR'
  | 'TIMEOUT_ERROR'
  | 'CONNECTION_ERROR'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR'
  | 'CANCEL_ERROR';

const ImageBase64 = (props: any) => {
  const width = '100%';
  const { requestId, detectedUser, index } = props;
  const [imgRs, setImgRs] = useState<any[]>([]);
  const [status, setStatus] = useState<'in_progress' | PROBLEM_CODE | null>(
    'in_progress',
  );

  const [res, setRes] = useState<any>({});

  useEffect(() => {
    const t = TimsSocket.init();
    t.onChannel('report-checking-response', (data: ExtendSocketData) => {
      const apiRes = data?.data?.data;
      const _data = data?.data?.data?.data?.data;
      const _requestId = data?.data?.requestId;
      // console.log('apiRes', apiRes);
      console.log('Response', data);

      const problem = apiRes?.problem as PROBLEM_CODE;
      const errorCode = (apiRes?.data as any)?.errors?.[0]?.key ?? 'NOT_FOUND';
      // console.log('report-checking-response', _data, requestId, index);
      // eslint-disable-next-line eqeqeq
      if (requestId == _requestId) {
        // debugger;
        setRes(cloneDeep(apiRes?.data) ?? {});
        if (problem === 'CLIENT_ERROR') {
          setStatus(errorCode);
        } else {
          setStatus(problem);
        }
        const _imgR = cloneDeep(_data?.[index ?? 0]);
        // console.log('_imgR', _imgR);

        setImgRs(_imgR ?? {});
      }
    });

    return () => {
      t.clear();
    };
  }, []);

  const Status = useMemo(() => {
    // console.log('status', status);

    switch (status) {
      case 'in_progress':
        return <TagFace type="processing">In processing</TagFace>;
      case null:
      case undefined:
        if (!imgRs?.length) {
          return <TagFace type="red">Unknown</TagFace>;
        }
        return (
          <div>
            {imgRs?.map((i, inx) => (
              <div key={inx}>
                {i?.label_spoofing === 'real' ? (
                  <span>
                    {i?.email}: <TagFace type="success">Real</TagFace>
                  </span>
                ) : (
                  <span>
                    {i?.email}: <TagFace type="cyan">Fake</TagFace>
                  </span>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return <TagFace type="red">{status}</TagFace>;
    }
  }, [status]);

  //   const height = (width * 480) / 640;
  return (
    <div>
      <img
        src={`data:image/png;base64, ${props?.src ?? ''}`}
        alt=""
        style={{ width }}
      />
      <Row>
        <Col>{Status}</Col>
        <Col>
          <ReactJson src={res} />
        </Col>
      </Row>
    </div>
  );
};

export const FaceDetector: FC<FaceDetectorProps> = (
  props: FaceDetectorProps,
) => {
  const { requestId, images = [], sendAt } = props;
  const [imageResults, setImageResults] = useState(() => {
    return images?.map(image => ({ aiResult: {}, src: image }));
  });
  const [detectedUser, setDetectedUser] = useState<any>({});

  // console.log('FaceDetector', props);

  useEffect(() => {
    const t = TimsSocket.init();
    t.onChannel('report-checking-response', (data: ExtendSocketData) => {
      // console.log('report-checking-response', data);
      const _data = data?.data;
      if (requestId === _data?.requestId) {
        setDetectedUser(_data?.detectedUser ?? {});
      }
    });
    return () => {
      t.clear();
    };
  }, []);

  return (
    <div>
      <h3>
        Request: [{requestId}] capture at {sendAt ?? new Date().toISOString()}
      </h3>
      <Row>
        {imageResults?.map((item, index) => (
          <Col span={12} key={index}>
            <Card>
              <ImageBase64
                src={item?.src ?? ''}
                index={index}
                detectedUser={detectedUser}
                requestId={requestId}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Row align={'middle'}>
        <Col>
          {!!detectedUser?.email?.length ? (
            <Alert
              type="success"
              message={`FOUND USER => ${detectedUser?.email ?? ''}`}
            />
          ) : (
            ''
          )}
        </Col>
      </Row>
      <Divider />
    </div>
  );
};

export const DebugDetectFace: FC = () => {
  const [detectImages, setDetectImages] = useState<any[]>([]);
  const bottomRef = React.createRef<HTMLDivElement>();

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const t = TimsSocket.init();
    t.onChannel('report-checking-request', (data: ExtendSocketData) => {
      console.log('Request', data);

      setDetectImages(prev => [
        ...prev,
        { ...data?.data, sendAt: data?.sendAt },
      ]);
    });

    t.onChannel('report-crash', err => {
      console.log('[CRASH]', err);
    });
    return () => {
      t.clear();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detectImages?.length]);

  const onClear = () => {
    setDetectImages([]);
  };

  return (
    <div>
      {detectImages?.map((detectImage, index) => (
        <FaceDetector key={index} {...detectImage} />
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
      <div ref={bottomRef} />
    </div>
  );
};
