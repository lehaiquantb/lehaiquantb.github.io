import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';

import { uniqueId } from 'lodash';
import prettier from 'prettier';
import prettierPlugin from 'prettier/parser-babel';
import JsZip from 'jszip';
import { saveAs } from 'file-saver';
import { capitalizeFirstLetter } from 'styles/theme/utils';
// const svgCode = `
// <svg xmlns="http://www.w3.org/2000/svg"
//   xmlns:xlink="http://www.w3.org/1999/xlink">
//   <rect x="10" y="10" height="100" width="100"
//     style="stroke:#ff0000; fill: #0000ff"/>
// </svg>
// `;

const converters = [
  {
    key: 'path',
    value: 'Path',
  },
  {
    key: 'circle',
    value: 'Circle',
  },
  {
    key: 'image',
    value: 'Image',
  },
  {
    key: 'defs',
    value: 'Defs',
  },
  {
    key: 'clip-path',
    value: 'ClipPath',
  },
  {
    key: 'shape',
    value: 'Shape',
  },
  {
    key: 'line',
    value: 'Line',
  },
  {
    key: 'rect',
    value: 'Rect',
  },
  {
    key: 'g',
    value: 'G',
  },
  {
    key: 'polygon',
    value: 'Polygon',
  },
  {
    key: 'polyline',
    value: 'Polyline',
  },
  {
    key: 'ellipse',
    value: 'Ellipse',
  },
  {
    key: 'text',
    value: 'Text',
  },
  {
    key: 'tspan',
    value: 'TSpan',
  },
  {
    key: 'symbol',
    value: 'Symbol',
  },
  {
    key: 'use',
    value: 'Use',
  },
  {
    key: 'linearGradient',
    value: 'LinearGradient',
  },
  {
    key: 'radialGradient',
    value: 'RadialGradient',
  },
  {
    key: 'stop',
    value: 'Stop',
  },
  {
    key: 'pattern',
    value: 'Pattern',
  },
  {
    key: 'mask',
    value: 'Mask',
  },
  {
    key: 'filter',
    value: 'Filter',
  },
  {
    key: 'feBlend',
    value: 'FeBlend',
  },
  {
    key: 'feColorMatrix',
    value: 'FeColorMatrix',
  },
  {
    key: 'feComponentTransfer',
    value: 'FeComponentTransfer',
  },
  {
    key: 'feComposite',
    value: 'FeComposite',
  },
  {
    key: 'feConvolveMatrix',
    value: 'FeConvolveMatrix',
  },
  {
    key: 'feDiffuseLighting',
    value: 'FeDiffuseLighting',
  },
  {
    key: 'feDisplacementMap',
    value: 'FeDisplacementMap',
  },
  {
    key: 'feDistantLight',
    value: 'FeDistantLight',
  },
];

export const SvgImage = ({ text }) => {
  return (
    <div style={{ backgroundColor: 'black', width: '40px' }}>
      <img src={`data:image/svg+xml;utf8,${encodeURIComponent(text)}`} />
    </div>
  );
};

type SvgItem = {
  id: string;
  rawText: string;
  resultText: string;
  file: File;
  name: string;
};

const convertToReactNative = (content: string, item: SvgItem) => {
  const existTags: string[] = [];
  // console.log('content', content);
  // debugger;
  let inner = content
    .split(new RegExp(`<svg[^>]*>`, 'g'))?.[1]
    ?.split('</svg>')?.[0];
  // console.log('inner', inner);

  if (!inner) {
    return;
  }

  converters.forEach(converter => {
    const reg = new RegExp(`<${converter.key}`, 'g');
    const reg2 = new RegExp(`</${converter.key}>`, 'g');
    if (inner.match(reg) || inner.match(reg2)) {
      existTags.push(converter.value);
    }
    inner = inner?.replace(reg, `<${converter.value}`);
    inner = inner?.replace(reg2, `</${converter.value}>`);
  });

  const importText = existTags.join(', ');
  const IconName = item?.name?.trim()?.replaceAll(' ', '') ?? '';

  const template1 = `
  import React, { FC } from 'react';
  import { Svg, ${importText} } from 'react-native-svg';
  
  import type { IconProps } from 'components/icons';
  
  const ${IconName}Icon: FC<IconProps> = (props: IconProps) => {
    const { size, tintColor, tintColor2, ...rest } = props;
  
    return <Svg width={size} height={size} fill="none" {...rest}>
      ${inner}
    </Svg>;
  };
  
  ${IconName}Icon.defaultProps = {
    size: 32,
    tintColor: 'white',
    tintColor2: 'white',
  };

  export default ${IconName}Icon;
  `;

  const template2 = `
  import React, { FC } from 'react';
  import { Svg, ${importText} } from 'react-native-svg';
  
  import { IconSvgProps } from '';
  
  const ${IconName}Icon: FC<IconSvgProps> = (props: IconSvgProps) => {
    const { size, ...rest } = props;
  
    return <Svg width={size} height={size} fill="none" {...rest}>
      ${inner}
    </Svg>;
  };
  
  ${IconName}Icon.defaultProps = {
    size: 32,
    tintColor: 'white',
  };

  export default ${IconName}Icon;
  `;

  const text = prettier.format(template1, {
    arrowParens: 'avoid',
    bracketSameLine: false,
    bracketSpacing: true,
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    endOfLine: 'auto',
    parser: 'babel',
    plugins: [prettierPlugin],
  });

  return text;
};

export const ConvertSvgReactNative = () => {
  // useEffect(() => {
  //   const jsCode = (async () =>
  //     // await transform(
  //     //   svgCode,
  //     //   { icon: true },
  //     //   { componentName: 'MyComponent' },
  //     // ))();
  //   // console.log(jsCode);
  // }, []);

  const [items, setItems] = useState<SvgItem[]>([]);
  // console.log(items);

  useEffect(() => {
    console.log('items', items);
  }, [items]);

  const fileRef = useRef<HTMLInputElement>(null);
  const len = useRef<number>(0);
  const [idMapText, setIdMapText] = useState<{ [key in string]: string }>({});
  const isMap = useRef<boolean>(false);

  useEffect(() => {
    // console.log('idMap', idMapText);

    if (
      Object.keys(idMapText).length === items.length &&
      items.length === len.current &&
      !isMap.current
    ) {
      const clone = items.slice();
      for (const item of clone) {
        item.rawText = idMapText?.[item.id] ?? '';
      }
      isMap.current = true;
      setItems(clone);
    }
  }, [idMapText, items]);

  const onConvert = () => {
    // console.log('go convert');

    for (const item of items) {
      if (!item.rawText) {
        continue;
      }
      const json: any = {
        code: item.rawText,
        option: {
          icon: false,
          native: true,
          typescript: true,
          ref: false,
          memo: true,
          titleProp: false,
          descProp: false,
          expandProps: 'end',
          replaceAttrValues: {
            'http://www.w3.org/2000/svg': 'null',
          },
          svgProps: {},
          svgo: true,
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeTitle: false,
                  },
                },
              },
            ],
          },
          prettier: true,
          prettierConfig: {
            semi: false,
          },
        },
      };
      (async () => {
        const rawResponse = await fetch('https://api.react-svgr.com/api/svgr', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(json),
        });
        const content: string = (await rawResponse.json())?.output ?? '';
        // debugger;

        const result = convertToReactNative(content, item);
        // prettier

        result &&
          setItems(items => {
            const clone = [...items];
            // console.log('onConvert', clone);
            // console.log('result', result);

            const index = clone.findIndex(_i => _i.id === item.id);
            if (index !== -1) {
              clone[index].resultText = result;
            }
            return clone;
          });
      })();
    }
  };

  const onChangeName = (id: string, e: ChangeEvent) => {
    const clone = items.slice();
    const i = clone.findIndex(c => c.id === id);
    if (i !== -1) {
      clone[i].name = ((e.target as any)?.value as string) ?? '';
    }
    setItems(clone);
  };

  const onFileChange: ChangeEventHandler<HTMLInputElement> = event => {
    const is: SvgItem[] = [];
    const files = Array.from(event.target.files ?? []);
    isMap.current = false;
    len.current = files.length;

    for (const file of files) {
      const type = file.name?.split('.')?.[1] ?? '';
      if (type === 'svg') {
        const reader = new FileReader();

        const id = uniqueId('SVG');
        reader.readAsText(file);
        reader.onloadend = pr => {
          const text = (pr?.target as any)?.result ?? '';
          setIdMapText(current => {
            return { ...current, [id]: text };
          });
        };

        is.push({
          id,
          rawText: '',
          resultText: '',
          file,
          name:
            capitalizeFirstLetter(
              file?.name?.split('.')?.[0]?.replaceAll(' ', ''),
            ) ?? '',
        });
      }
    }
    setItems(is?.slice());
  };

  const fileName = (item: SvgItem) => {
    return `${item?.name?.replaceAll(' ', '')}Icon.tsx`;
  };

  const onDownloadAll = () => {
    const zip = new JsZip();
    const folder = zip.folder('svgs');
    for (const item of items) {
      if (item.resultText) {
        folder?.file(fileName(item), item.resultText);
      }
    }
    zip.generateAsync({ type: 'blob' }).then(content => {
      saveAs(content, 'svgs.zip');
    });
  };

  const onDownload = (item: SvgItem) => {
    const element = document.createElement('a');
    const file = new Blob([item.resultText], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = fileName(item);
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div>
      <div>
        <button onClick={onDownloadAll}>Download All</button>
      </div>

      <input
        type="file"
        ref={fileRef}
        multiple
        itemType="svg"
        onChange={onFileChange}
      />
      <button onClick={onConvert}>Convert</button>
      <div>
        {items.map(item => {
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '1rem',
              }}
            >
              <label>{item.id}</label>
              <SvgImage text={item.rawText} />
              <input
                value={item.name}
                onChange={e => onChangeName(item.id, e)}
              />
              {!!item.resultText && (
                <button onClick={() => onDownload(item)}>Download</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
