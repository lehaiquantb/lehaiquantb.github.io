import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
type KeyItem = {
  key: string;
  value: any;
};
const results: KeyItem[] = [];

export const Editor = () => {
  const editorView = useRef<EditorView>();

  useEffect(() => {
    if (!editorView.current) {
      editorView.current = new EditorView({
        extensions: [basicSetup, javascript()],
        parent: document.body,
      });
    }
  }, []);

  const spreadObject = (nestedObject: any, prevKey?: string) => {
    if (typeof nestedObject !== 'object') {
      return;
    }

    Object.keys(nestedObject).forEach(key => {
      const _prevKey = prevKey ? `${prevKey}.${key}` : key;
      if (typeof nestedObject?.[key] === 'object') {
        spreadObject(nestedObject?.[key], _prevKey);
      } else {
        results.push({
          key: _prevKey,
          value: nestedObject?.[key],
        });
      }
    });
  };

  useEffect(() => {
    // spreadObject(editorView.current?.state.doc.toJSON());
    // console.log(results);
  }, []);

  const onConvert = () => {
    console.log(
      'editorView.current?.state.doc.toJSON()',
      editorView.current?.state.doc.toJSON(),
    );

    spreadObject({
      tabName: 'Alarm',
      scheduleSetting: 'Comfort alarm',
      start: 'Start',
      schedule: 'Smart alarm',
      alarm: 'Alarm',
      noAlarm: 'No alarm',
      counDownTime: '{{hour}}h {{minute}}m until wake-up time',
      sleepTimeCountDown:
        'Start your routine to sleep within {{hours}} hours {{minutes}} minutes',
      noAlarmMessage:
        'Wake up without an alarm.\nOnly sleep analysis is active.',
      setTime: 'Set time',
      shallowTime: 'Shallow time',
      alarmScheduleSetting: 'SET SLEEPING SCHEDULE',
      close: 'Close',
      scheduleHeader: 'Schedule',
      modalGuide: {
        text1: 'No alarm,',
        text2: 'only sleep analysis is active',
        t: {
          t2: 'only sleep analysis is active',
        },
      },
      modalGuideSchedule: {
        text1: 'Wake up easier than before.\nAlarm will sound during your',
        text2: 'light sleep*',
        text3: 'within 20 minutes before your\nwake-up time.',
      },
      modalScheduleCreate: {
        textTop: 'Up to 3 alarms per week\nCan be set.',
        textBottom: '* For registered days\nCannot be newly registered',
        swipeButton: '( Add alarm )\nTap !',
        settingDate: 'Days Active',
        textTitle:
          'By setting an alarm schedule, \nyou can encourage your sleep and\n you can simplify the daily settings.',
      },
      alarmGuide: {
        title1: 'Alarm1',
        title2: 'Alarm2',
        title3: 'Alarm3',
      },
      confirmCreateSchedule: {
        title: 'Confirmation',
        subText:
          'Are you sure you want to navigate away from this page? Your changes have not been saved.',
        leftBtn: 'Back',
        rightBtn: 'Cancel',
      },
    });
    console.log(results);
  };

  return (
    <div>
      <h1>Editor</h1>
      <div id="editor"></div>
      <button onClick={onConvert}>Convert</button>
    </div>
  );
};
