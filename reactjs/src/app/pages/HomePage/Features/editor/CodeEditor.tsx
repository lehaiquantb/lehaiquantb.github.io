import Editor, { EditorProps, Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import {
  ForwardRefExoticComponent,
  MutableRefObject,
  RefAttributes,
  forwardRef,
} from 'react';
type IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
type Props = {
  editorRef?: MutableRefObject<IStandaloneCodeEditor | undefined>;
} & EditorProps;

const CodeEditor: ForwardRefExoticComponent<
  Props & RefAttributes<IStandaloneCodeEditor>
> = forwardRef((props: Props, ref) => {
  const { editorRef, ...rest } = props;

  function handleEditorDidMount(editor: IStandaloneCodeEditor, monaco: Monaco) {
    if (editorRef) editorRef.current = editor;
  }

  const handleEditorChange = (
    value: string | undefined,
    ev: editor.IModelContentChangedEvent,
  ) => {
    if (value) {
      console.log(value);
      // debugger
    }
    // console.log("here is the current model value:", value);
  };

  return (
    <div>
      <Editor
        height="55rem"
        defaultValue={`/* --- Start here --- */\n`}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        {...rest}
      />
    </div>
  );
});

CodeEditor.defaultProps = {};

export default CodeEditor;
