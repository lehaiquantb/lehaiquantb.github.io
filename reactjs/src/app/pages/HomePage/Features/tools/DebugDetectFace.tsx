import { Card, Col, Row } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { TimsSocket, socketClient } from 'utils/socket/socket.client';
type FaceDetectorProps = {
  images: string[];
  requestId: string;
  sendAt?: string;
};

const ImageBase64 = props => {
  const width = '100%';
  //   const height = (width * 480) / 640;
  return (
    <img
      src={`data:image/png;base64, ${props?.src ?? ''}`}
      alt=""
      style={{ width }}
    />
  );
};

export const FaceDetector: FC<FaceDetectorProps> = (
  props: FaceDetectorProps,
) => {
  const { requestId, images, sendAt } = props;
  const [imageResults, setImageResults] = useState(() => {
    return images.map(image => ({ aiResult: [], src: image }));
  });
  console.log('FaceDetector', props);

  useEffect(() => {
    const t = TimsSocket.init();
    t.onChannel('report-checking-response', (data: ExtendSocketData) => {
      console.log('report-checking-response', data);
    });
    return () => {
      t.clear();
    };
  }, []);
  return (
    <div>
      <h3>
        Request: {requestId} capture at {sendAt ?? new Date().toISOString()}
      </h3>
      <Row>
        {imageResults?.map((item, index) => (
          <Col span={6}>
            <Card>
              <ImageBase64 src={item?.src ?? ''} key={index} />
              <div>RR</div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export const DebugDetectFace: FC = () => {
  const [detectImages, setDetectImages] = useState<any[]>([]);

  useEffect(() => {
    const t = TimsSocket.init();
    t.onChannel('report-checking-request', (data: ExtendSocketData) => {
      setDetectImages(prev => [
        ...prev,
        { ...data?.data, sendAt: data?.sendAt },
      ]);
    });
    return () => {
      t.clear();
    };
  }, []);

  return (
    <div>
      {detectImages?.map(detectImage => (
        <FaceDetector key={detectImage?.requestId} {...detectImage} />
      ))}
    </div>
  );
};
