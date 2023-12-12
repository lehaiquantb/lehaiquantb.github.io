import xss from 'xss';
import CodeEditor from '../editor/CodeEditor';
import { useMemo, useState } from 'react';
import { Card, Col, Row } from 'antd';

export const SanitizeHtmlXss = () => {
  const [text, setText] = useState<string>('');
  const onChange = (value: string | undefined) => {
    setText(value ?? '');
  };

  const result = useMemo(() => {
    try {
      return xss(text);
    } catch (error) {
      return `Error ${error}`;
    }
  }, [text]);
  return (
    <div>
      <h1>SanitizeHtmlXss</h1>
      <div>
        <CodeEditor
          height={400}
          language="html"
          onChange={onChange}
          value={text}
        />
      </div>
      <Row gutter={16} style={{ backgroundColor: 'sandybrown', padding: 10 }}>
        <Col span={12}>
          <Card title="Text" bordered={false}>
            <div>
              <p>{result}</p>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Preview" bordered={false}>
            <div dangerouslySetInnerHTML={{ __html: result }}></div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
