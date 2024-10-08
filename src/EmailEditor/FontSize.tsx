
import { useEffect, useState } from 'react';

const FontSize = ({ editor, label }: any) => {
    const [fontSize, setFontSize] = useState<string>('16'); // Default to 16px
  
    // Function to get the current font size of the selected text
    const getCurrentFontSize = () => {
      if (!editor) return;
  
      const { fontSize } = editor.getAttributes('textStyle');
      if (fontSize) {
        setFontSize(fontSize.replace('px', '')); // Remove 'px' and set the state
      } else {
        setFontSize('16'); // Default font size if not found
      }
    };
  
    // When editor is focused or selection changes, get the current font size
    useEffect(() => {
      getCurrentFontSize();
  
      editor.on('selectionUpdate', () => {
        getCurrentFontSize();
      });
  
      return () => {
        editor.off('selectionUpdate');
      };
    }, [editor]);
  
    // Function to apply font size change
    const applyFontSize = (value: string) => {
      if (!editor) return;
  
      editor.chain().focus().setFontSize(`${value}px`).run();
  
      setFontSize(value); // Update the state
    };
  
    // Handle font size change on blur or pressing Enter key
    const handleBlurOrEnter = (event: any) => {
      const value = event.target.value;
  
      // Only apply the font size if input is blurred or Enter is pressed
      if (event.type === 'blur' || (event.type === 'keydown' && event.key === 'Enter')) {
        applyFontSize(value);
        editor.chain().focus().run(); // Refocus the editor to keep the text selection
      }
    };
  
    return (
      <div>
        <label>
          {label} 
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)} // Update input state without applying the font size immediately
            onBlur={handleBlurOrEnter} // Apply font size on blur
            onKeyDown={handleBlurOrEnter} // Apply font size on Enter key press
          />px
        </label>
      </div>
    );
  };

export default FontSize