import { useState, useRef } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FontSize } from './fontsize';
import TextStyle from '@tiptap/extension-text-style';
import Text from '@tiptap/extension-text';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import { FontFamily } from './fontFamily';
import EmailEditor from './EmailEditor';
import SimpleEmailTemplate from './SimpleEmailTemplate'
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

// TipTapEditor Component with content update callback
interface TipTapEditorProps {
  content: string;
  onUpdate: (editor: Editor) => void;
  onFocus: (editor: Editor) => void;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({ content, onUpdate, onFocus }) => {
  const editor = useEditor({
    extensions: [StarterKit, Document, Paragraph, Text, TextStyle, FontFamily, FontSize],
    content: content, // Initial content for the editor
    onUpdate({ editor }) {
      onUpdate(editor);
    },
    onFocus({ editor }) {
      onFocus(editor);
    },
  });

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
};

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
