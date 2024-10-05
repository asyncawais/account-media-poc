import {useEffect} from 'react'

const FontSize = ({editor, label}:any) => {
  const changeFontSize = (event:any) => {

    if (!editor) {
      return
    }

    const value = event.target.value

    if (editor.state.selection.empty) {
      // If no text is selected, update the entire block where the cursor is
      editor.chain().focus().setNode('paragraph', { style: `font-size: ${value}px` }).run();
    } else {
      // If text is selected, update the selected text
      editor.chain().focus().setFontSize(`${value}px`).run();
    }
  }
  
  return <div><label>{label} 
        <input onBlur={(event) => changeFontSize(event)} />px
      </label>
    </div>
 
}

const FontFamily = ({editor}:any) => {
  const onClick = () => {
    if (!editor) {
      return
    }
    editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run()
  }

  return <div><label>font family: 
    <button
        onClick={() => onClick()}
        data-test-id="comic-sans"
      >
        Comic Sans
      </button>
    </label>
    </div>
 }

const EmailEditor = ({editor, options}:any) => {

  useEffect(() => {
    console.log(options)
  }, [options])

 return (
    <div className={`email-editor`}>
      <h3>Email editor</h3>

      {options?.map((option: any) => {
        if (option.type === 'fontSize') {
          return <FontSize editor={editor} key={option.type} label={option.label} />;
        }
        if (option.type === 'fontFamily') {
          return <FontFamily editor={editor} key={option.type} label={option.label} />;
        }
        return null; // To handle other cases
      })}
    </div>
 )
}

export default EmailEditor;
