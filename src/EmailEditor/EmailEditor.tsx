
import FontSize from './FontSize'
import FontFamily from './FontFamily';

const EmailEditor = ({editor, options}:any) => {
 return (
    <div className={`email-editor`}>
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
