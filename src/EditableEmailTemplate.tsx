import { useState, useRef } from 'react';
import { Editor } from '@tiptap/react';
import EmailEditor from './EmailEditor';
import SimpleEmailTemplate from './SimpleEmailTemplate'
import TipTapEditor from './TipTapEditor';
import './email.css';

interface Field {
  value: string;
  editorOptions: Array<{ label: string; type: string }>;
}

interface FieldState {
  titleText: Field;
  bodyText: Field;
  footerText: Field;
}

const EditableEmailTemplate: React.FC = () => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [selectedField, setSelectedField] = useState<keyof FieldState | ''>(''); // Ensuring the type is limited to the keys of FieldState

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
    <>
      <div className="layout">
        <div className="main-content-area">
        <SimpleEmailTemplate 
          titleText={
            <TipTapEditor 
              content={fieldState.titleText.value}
              onUpdate={(editor) => onUpdate(editor, 'titleText')}
              onFocus={(editor) => onFocus(editor, 'titleText')}
            />}
            bodyText={
              <TipTapEditor 
                content={fieldState.bodyText.value}
                onUpdate={(editor) => onUpdate(editor, 'bodyText')}
                onFocus={(editor) => onFocus(editor, 'bodyText')}
            />}
            footerText={
              <TipTapEditor 
                content={fieldState.footerText.value}
                onUpdate={(editor) => onUpdate(editor, 'footerText')}
                onFocus={(editor) => onFocus(editor, 'footerText')}
            />}
          />
        </div>

        {/* Side Drawer */}
        <div className={`side-drawer`}>
          <div className="drawer-content">
            {editor && selectedField && fieldState[selectedField]?.editorOptions && (
              <EmailEditor editor={editor} options={fieldState[selectedField].editorOptions} />
            )}
          </div>
          <div className="drawer-content">
            <h3>Email settings</h3>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-buttons">
          <button className="btn" onClick={() => getContent()}>
            Save &amp; Preview
          </button>
        </div>
      </footer>
    </>
  );
};

export default EditableEmailTemplate;
