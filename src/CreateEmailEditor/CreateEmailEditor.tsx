import { useState, useRef } from 'react';
import { Editor } from '@tiptap/react';

import EmailEditor from '../EmailEditor/EmailEditor';
import TextContentEditor from '../TipTapEditor/TextContentEditor'
import SimpleEmailTemplate from '../EmailTemplates/SimpleEmailTemplate'

import './CreateEmailEditor.css';

interface Field {
  value: string;
  editorOptions: Array<{ label: string; type: string }>;
}

interface FieldState {
  titleText: Field;
  bodyText: Field;
  footerText: Field;
}

const Layout = () => {
  
  
  
  const [editor, setEditor] = useState<Editor | null>(null);
  const [selectedField, setSelectedField] = useState<keyof FieldState | ''>('');
  const [fieldState, setFieldState] = useState<FieldState>({
    titleText: {
      value: '<span style="font-size: 32px">Add your heading here</span>',
      editorOptions: [
        { label: 'Heading text size', type: 'fontSize' },
        { label: 'Selected colour', type: 'backgroundColour' },
      ],
    },
    bodyText: {
      value: 'Add your content here',
      editorOptions: [
        { label: 'Body text size', type: 'fontSize' },
        { label: 'Selected colour', type: 'backgroundColour' },
      ],
    },
    footerText: {
      value: 'Address and contact details',
      editorOptions: [{ label: 'Footer text size', type: 'fontSize' }],
    },
  });

  const onUpdate = (editor: Editor, field: keyof FieldState) => {
    const html = editor.getHTML();
   

    const newFieldState: FieldState = {
      ...fieldState,
    };
    newFieldState[field].value = html;
   

    setFieldState(newFieldState);
  };

  const onFocus = (editor: Editor, field: keyof FieldState) => {
    setEditor(editor);
    setSelectedField(field);
  };

  const getContent = () => {
    console.log(containerRef?.current?.innerHTML)
    console.log(fieldState);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="container">
      <main className="main-section">
        <SimpleEmailTemplate 
            titleText={
              <TextContentEditor 
                content={fieldState.titleText.value}
                onUpdate={(editor) => onUpdate(editor, 'titleText')}
                onFocus={(editor) => onFocus(editor, 'titleText')}
              />}
              bodyText={
                <TextContentEditor 
                  content={fieldState.bodyText.value}
                  onUpdate={(editor) => onUpdate(editor, 'bodyText')}
                  onFocus={(editor) => onFocus(editor, 'bodyText')}
                  showTextToolbar={selectedField === 'bodyText'}
              />}
              footerText={
                <TextContentEditor 
                  content={fieldState.footerText.value}
                  onUpdate={(editor) => onUpdate(editor, 'footerText')}
                  onFocus={(editor) => onFocus(editor, 'footerText')}
              />}
            />
      </main>
      <aside className="side-panel">
        <div>
          <h2>Email Editor</h2>
          {editor && selectedField && fieldState[selectedField]?.editorOptions && (
              <EmailEditor editor={editor} options={fieldState[selectedField].editorOptions} />
            )}
        </div>
        <h2>Email settings</h2>
      </aside>
      <footer className="footer">
        <button className="save-button" onClick={getContent}>Save &amp; Preview</button>
      </footer>
    </div>
  );
};

export default Layout;
