import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import _ from 'lodash'

function App() {
  const [boxes, setBoxes] = useState([])
  const [lines, setLines] = useState([])

  const onChangeBoxText = (i, event) => {
    const value = event.target.value
    const _boxes = _.cloneDeep(boxes)
    _boxes[i] = value
    setBoxes(_boxes)
  }

  const onChangeLineText = (i, event) => {
    const text = event.target.value
    console.log(text)
    const _lines = _.cloneDeep(lines)
    _lines[i] = {text: text, from: lines[i].from}
    setLines(_lines)
  }

  const onChangeLineDirection = (i, event) => {
    const direction = event.target.value
    const _lines = _.cloneDeep(lines)
    _lines[i] = {text: lines[i].text, direction: direction}
    setLines(_lines)
  }

  const renderAsciiArt = () => {
    return(
      <div>
        <pre>
          { boxes.map(box =>
            `
            |${'-'.repeat(box.length + 2)}|
            | ${' '.repeat(box.length)} |
            | ${' '.repeat(box.length)} |
            | ${box} |
            | ${' '.repeat(box.length)} |
            | ${' '.repeat(box.length)} |
            |${'-'.repeat(box.length + 2)}|
            `
          )}
        </pre>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => {setBoxes((prev) => [...prev, ''])}}>addBox</button>
        {boxes.map((value, i) =>
          <input key={i} type="text" value={value} onChange={(event) => {onChangeBoxText(i, event)}} />
        )}

        <button onClick={() => {setLines((prev) => [...prev, {text: '', from: 'l2r'}])}}>addLine</button>
        {lines.map((data,i) =>
          <div key={i}>
            <input type="text" value={data.text} onChange={(event) => {onChangeLineText(i, event)}} />
            <select name="" id="" onChange={(event) => {onChangeLineDirection(i, event)}}>
              <option value="l2r">l2r</option>
              <option value="r2l">r2l</option>
            </select>
          </div>
        )}

        {renderAsciiArt()}

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
