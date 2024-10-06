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
    
    const editor = useEditor({
      extensions: [StarterKit, Document, Paragraph, Text, TextStyle, FontFamily, FontSize],
      content: content,
      onUpdate({ editor }) {
        onUpdate(editor);
      },
      onFocus({ editor }) {
        onFocus(editor);
      },
      onBlur({event}) {
        // if (!event.relatedTarget || !(event.relatedTarget instanceof HTMLElement && event.relatedTarget.closest('.TextContentEditor'))) {
        //   // Refocus the editor if blur wasn't caused by focus on another editor
        //   editor?.chain().focus().run();
        // }

      }
    });
  
    if (!editor) {
      return null;
    }
  
    return <div className="TextContentEditor">
      {showTextToolbar && <TextToolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>;
  };

  export default TextContentEditor