import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import TextStyle from '@tiptap/extension-text-style';
import Text from '@tiptap/extension-text';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import { FontSize } from './TipTapExtensions/fontsize';
import { FontFamily } from './TipTapExtensions/fontFamily';

interface TipTapEditorProps {
  content: string;
  onUpdate: (editor: Editor) => void;
  onFocus: (editor: Editor) => void;
}

const TextContentEditor: React.FC<TipTapEditorProps> = ({ content, onUpdate, onFocus }) => {
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

  export default TextContentEditor