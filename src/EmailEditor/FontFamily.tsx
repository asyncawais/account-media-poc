
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

export default FontFamily 