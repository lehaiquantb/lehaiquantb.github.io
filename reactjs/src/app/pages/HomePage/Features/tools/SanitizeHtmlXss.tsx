import xss, { IFilterXSSOptions } from 'xss';
import CodeEditor from '../editor/CodeEditor';
import { useMemo, useState } from 'react';
import { Card, Col, Row } from 'antd';
const XSS_OPTIONS: IFilterXSSOptions = {
  onTagAttr(tag, name, value, isWhiteAttr) {
    const allowAttributes = ['class'];
    const allowRegexAttributes = [/^data-\S+$/g];
    if (allowAttributes.includes(name)) {
      return `${name}="${value}"`;
    }
    for (const regex of allowRegexAttributes) {
      if (regex.test(name)) {
        return `${name}="${value}"`;
      }
    }
  },
};

export const SanitizeHtmlXss = () => {
  const [text, setText] = useState<string>('');
  const onChange = (value: string | undefined) => {
    setText(value ?? '');
  };

  const result = useMemo(() => {
    try {
      return xss(text, XSS_OPTIONS);
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
