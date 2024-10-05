import { useState } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FontSize } from './fontsize';
import TextStyle from '@tiptap/extension-text-style';
import Text from '@tiptap/extension-text';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import { FontFamily } from './fontFamily';
import EmailEditor from './EmailEditor';

import './email.css';

interface Field {
  value: string;
  html: string;
  editorOptions: Array<{ label: string; type: string }>;
}

interface FieldState {
  title: Field;
  text1: Field;
  text2: Field;
  footer: Field;
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
    title: {
      value: 'Add your heading here',
      html: '',
      editorOptions: [
        { label: 'Heading text size', type: 'fontSize' },
        { label: 'Selected colour', type: 'backgroundColour' },
      ],
    },
    text1: {
      value: 'Add your content here',
      html: '',
      editorOptions: [
        { label: 'Body text size', type: 'fontSize' },
        { label: 'Selected colour', type: 'backgroundColour' },
      ],
    },
    text2: {
      value: 'Add your content here',
      html: '',
      editorOptions: [
        { label: 'Body text size', type: 'fontSize' },
        { label: 'Selected colour', type: 'backgroundColour' },
      ],
    },
    footer: {
      value: 'Address and contact details',
      html: '',
      editorOptions: [{ label: 'Footer text size', type: 'fontSize' }],
    },
  });

  const onUpdate = (editor: Editor, field: keyof FieldState) => {
    const text = editor.getText();
    const html = editor.getHTML();

    const newFieldState: FieldState = {
      ...fieldState,
    };
    newFieldState[field].value = text;
    newFieldState[field].html = html;

    setFieldState(newFieldState);
  };

  const onFocus = (editor: Editor, field: keyof FieldState) => {
    setEditor(editor);
    setSelectedField(field);
  };

  const getContent = () => {
    console.log(fieldState);
  };

  return (
    <>
      <div className="layout">
        <div className="main-content-area">
          <div className="container">
            <header>
              <TipTapEditor
                content={fieldState.title.value}
                onUpdate={(editor) => onUpdate(editor, 'title')}
                onFocus={(editor) => onFocus(editor, 'title')}
              />
            </header>

            {/* Main Content Section */}
            <main className="main-content">
              <div className="column">
                <TipTapEditor
                  content={fieldState.text1.value}
                  onUpdate={(editor) => onUpdate(editor, 'text1')}
                  onFocus={(editor) => onFocus(editor, 'text1')}
                />
              </div>
              <div className="column">
                <TipTapEditor
                  content={fieldState.text2.value}
                  onUpdate={(editor) => onUpdate(editor, 'text2')}
                  onFocus={(editor) => onFocus(editor, 'text2')}
                />
              </div>
            </main>

            {/* Footer Section */}
            <footer className="footer-email">
              <TipTapEditor
                content={fieldState.footer.value}
                onUpdate={(editor) => onUpdate(editor, 'footer')}
                onFocus={(editor) => onFocus(editor, 'footer')}
              />
            </footer>
          </div>
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
