import 'regenerator-runtime/runtime'
import './App.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState } from 'react';

function App() {
  const startListening = () => SpeechRecognition.startListening({ continuos: true, language: 'en-IN' });
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const [text, setText] = useState("");
  const [isCopied, setCopied] = useClipboard(text);
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <>
      <div className='container'>
        <h2>Speech to Text Converter</h2>
        <br />
        <p>A React hook that converts speech from the microphone to text and makes it available to your React
          components.
        </p>

        <div className="main-content" onClick={() => setText(transcript)}>
          {transcript}
        </div>

        <div className="btn-style">
          <button onClick={setCopied}>{isCopied ? 'Copied' : 'Copy To Clipboard'}</button>
          <button onClick={startListening}>Start Listening</button>
          <button onClick={SpeechRecognition.stopListening}>Stop Listing</button>
        </div>
      </div>
    </>
  )
}

export default App
