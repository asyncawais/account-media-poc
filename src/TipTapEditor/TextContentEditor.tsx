import { useState } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Text from '@tiptap/extension-text';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';

import TextToolbar from './TextToolbar';

import { FontSize } from '../TipTapExtensions/fontsize';
import { FontFamily } from '../TipTapExtensions/fontFamily';

import './TextContentEditor.css'

interface TipTapEditorProps {
  content: string;
  onUpdate: (editor: Editor) => void;
  onFocus: (editor: Editor) => void;
  showTextToolbar?: boolean;
}

const TextContentEditor: React.FC<TipTapEditorProps> = ({ content, onUpdate, onFocus, showTextToolbar }) => {
    const [isFocused, setIsFocused] = useState(false); 

    const editor = useEditor({
      extensions: [StarterKit, Document, Paragraph, Text, TextStyle, FontFamily, FontSize],
      content: content,
      onUpdate({ editor }) {
        onUpdate(editor);
      },
      onFocus({ editor }) {
        onFocus(editor);
        setIsFocused(true);
      },
      onBlur() {
        
      },
    });
  
    if (!editor) {
      return null;
    }
  
    return <div className="TextContentEditor">
      {isFocused && showTextToolbar && <TextToolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>;
  };

  export default TextContentEditor