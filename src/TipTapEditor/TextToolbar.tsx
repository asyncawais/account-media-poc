import { Editor } from '@tiptap/react';
import './TextToolbar.css';

interface TextToolbarProps {
    editor: Editor;
}

const TextToolbar = ({ editor }: TextToolbarProps) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="toolbar">
            {/* Bold Button */}
            <button
                onMouseDown={(event) => {
                    event.preventDefault(); // Prevent button focus
                    editor.chain().focus().toggleBold().run();
                }}
            >
                B
            </button>

            {/* Italic Button */}
            <button
                onMouseDown={(event) => {
                    event.preventDefault(); // Prevent button focus
                    editor.chain().focus().toggleItalic().run();
                }}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
            >
                I
            </button>

            {/* Bullet List Button */}
            <button
                onMouseDown={(event) => {
                    event.preventDefault(); // Prevent button focus
                    editor.chain().focus().toggleBulletList().run();
                }}
                disabled={!editor.can().chain().focus().toggleBulletList().run()}
            >
                Li
            </button>
        </div>
    );
};

export default TextToolbar;
