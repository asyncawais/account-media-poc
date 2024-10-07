import './App.scss'
import { render } from '@react-email/render';

// import CreateEmailEditor from './CreateEmailEditor'
import CreateEmailEditor from './CreateEmailEditor/CreateEmailEditor'
import EmailTemplate from './EmailTemplates/TwoColumns'

function App() {

  const gen = async () => {
    const html = await render(<EmailTemplate />, {
      pretty: true,
    });
    console.log(html);
    navigator.clipboard.writeText(html)

  }
  

  

  return (
    <>
      <EmailTemplate />
      <button onClick={gen}>copy</button>
      

    </>
  )
}

export default App
