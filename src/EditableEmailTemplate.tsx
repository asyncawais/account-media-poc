import {useState} from 'react'
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FontSize } from './fontsize'
import TextStyle from '@tiptap/extension-text-style'
import Text from '@tiptap/extension-text'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import {FontFamily} from './fontFamily'
import EmailEditor from './EmailEditor'

import './email.css'

// TipTapEditor Component with content update callback
const TipTapEditor = ({ content, onUpdate, onFocus }:any) => {
  const editor = useEditor({
    extensions: [StarterKit, Document, Paragraph, Text, TextStyle, FontFamily, FontSize],
    content: content, // Initial content for the editor
    onUpdate({ editor }) {
      onUpdate(editor)
    },
    onFocus() {
      onFocus(editor)
    }
  });

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />
};


const EditableEmailTemplate = () => {

  const [editor, setEditor] = useState(null)
  const [selectedField, setSelectedField] = useState('')

  const [fieldState, setFieldState] = useState({
    title: {
      value: "Your editable title...",
      editorOptions: [
        {label: 'Heading text size', type: 'fontSize'},
        {label: 'Selected colour', type: 'backgroundColour'}
      ]
    },
    text1: {
      value: "Your editable text content...",
      editorOptions: [
        {label: 'Body text size', type: 'fontSize'},
        {label: 'Selected colour', type: 'backgroundColour'}
      ]
    },
    text2: {
      value: "Your editable text content...",
      editorOptions: [
        {label: 'Body text size', type: 'fontSize'},
        {label: 'Selected colour', type: 'backgroundColour'}
      ]
    },
    footer: {
      value: "Your editable footer...",
      editorOptions: [
        {label: 'Footer text size', type: 'fontSize'}
      ]
    }
  })

  const onUpdate = (editor:any, field:string) => {
    const text = editor.getText()
    
    const newFieldState:any = {
      ...fieldState,
    }
    newFieldState[field].value = text

    setFieldState(newFieldState)
  }

  const onFocus = (editor: any, field: string) => {
    setEditor(editor)
    setSelectedField(field)
  }

  const getContent =() => {
    console.log(fieldState)
  }

  return (
    <>
    <div className="layout">
      <div className="main-content-area">
      <div className="container">

        <header>
          <TipTapEditor 
            content={fieldState.title.value} 
            onUpdate={(editor:any) => onUpdate(editor, 'title')} 
            onFocus={(editor:any) => onFocus(editor, 'title')}
          />
        </header>
        <div>
        
      </div>
        {/* Main Content Section */}
        <main className="main-content">
          <div className="column">
            <div><TipTapEditor 
              content={fieldState.text1.value} 
              onUpdate={(editor:any) => onUpdate(editor, 'text1')} 
              onFocus={(editor:any) => onFocus(editor, 'text1')}
            /></div>
          </div>
          <div className="column">
            <div><TipTapEditor 
              content={fieldState.text2.value} 
              onUpdate={(editor:any) => onUpdate(editor, 'text2')} 
              onFocus={(editor:any) => onFocus(editor, 'text2')}
            /></div>
          </div>
        </main>

        {/* Footer Section */}
        <footer className="footer-email">
          <div><TipTapEditor 
            content={fieldState.footer.value} 
            onUpdate={(editor:any) => onUpdate(editor, 'footer')}  
            onFocus={(editor:any) => onFocus(editor, 'footer')}
          /></div>
        </footer>
      </div>


      </div>
     {/* Side Drawer */}
     <div className={`side-drawer`}>
        <div className="drawer-content">
          {editor && <EmailEditor editor={editor} options={fieldState[selectedField]?.editorOptions} />}
        </div>
        <div className="drawer-content">
         <h3>Email settings</h3> 
        </div>
      </div>
    </div>

<footer className="footer">
<div className="footer-buttons">
    <button className="btn" onClick={() => getContent()}>Save &amp; Preview</button>
</div>
</footer>
</>
  );
};

export default EditableEmailTemplate;
