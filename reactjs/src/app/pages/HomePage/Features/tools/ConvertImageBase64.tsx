import React from 'react';
import { parseJson } from 'styles/theme/utils';

export const ConvertImageBase64 = () => {
  const [imgSrcs, setImgSrcs] = React.useState([]);

  const onChange = e => {
    console.log(e.target.value);
    const json = parseJson(e.target.value);
    setImgSrcs(json?.images);
  };

  const onPaste = e => {
    // console.log(e);
  };

  return (
    <div style={{ marginBottom: 100 }}>
      <h1>Convert Image to Base64</h1>
      <textarea
        name=""
        id=""
        style={{ width: '100%', height: 300 }}
        onChange={onChange}
        onPaste={onPaste}
      ></textarea>
      <div style={{ marginTop: 50, paddingBottom: 100 }}>
        {imgSrcs?.length > 0 ? (
          <h2>Result</h2>
        ) : (
          <p>you need to paste to textarea</p>
        )}
        {imgSrcs?.map((imgSrc, index) => (
          <img
            src={`data:image/png;base64, ${imgSrc}`}
            alt=""
            style={{ maxHeight: 300, marginLeft: 10 }}
          />
        ))}
      </div>
    </div>
  );
};
