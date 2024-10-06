import { Editor } from '@tiptap/react';

import './TextToolbar.css';

interface TextToolbarProps {
    editor: Editor;
}

const TextToolbar = ({ editor }:TextToolbarProps) => {
    if (!editor) {
      return null;
    }
  
    return (
      <div className="toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()} 
                disabled={!editor.can().chain().focus().toggleBold().run()}>
          B
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} 
                disabled={!editor.can().chain().focus().toggleItalic().run()}>
          I
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} 
                disabled={!editor.can().chain().focus().toggleBulletList().run()}>
          Li
        </button>
      </div>
    );
  };

export default TextToolbar