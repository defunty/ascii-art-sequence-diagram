import './App.css';
import { useState } from 'react'
import _ from 'lodash'

function App() {
  const [boxes, setBoxes] = useState([])
  const [lines, setLines] = useState([])

  const maxBox = 2
  const maxLine = 10

  const onChangeBoxText = (i, event) => {
    const value = event.target.value
    const _boxes = _.cloneDeep(boxes)
    _boxes[i] = value
    setBoxes(_boxes)
  }

  const onChangeLineText = (i, event) => {
    const text = event.target.value
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

  const addBox = () => {
    if (boxes.length >= maxBox) {
      return
    } else {
      setBoxes((prev) => [...prev, ''])
    }
  }

  const addLine = () => {
    if (lines.length >= maxLine) {
      return
    } else {
      setLines((prev) => [...prev, {text: '', from: 'l2r'}])
    }
  }

  const renderAsciiArt = () => {
    return(
      <pre>
        { boxes.map(box =>
          `
          +${'-'.repeat(box.length + 2)}+
          |${' '.repeat(box.length + 2)}|
          |${' '.repeat(box.length + 2)}|
          | ${box} |
          |${' '.repeat(box.length + 2)}|
          |${' '.repeat(box.length + 2)}|
          +${'-'.repeat(box.length + 2)}+
          `
        )}
      </pre>
    )
  }

  return (
    <div className="App">
      <div className="controller">
        <button onClick={() => addBox()}>addBox (max: {maxBox})</button>
        {boxes.map((value, i) =>
        <div key={i}>
          <input placeholder="box name" type="text" value={value} onChange={(event) => {onChangeBoxText(i, event)}} />
        </div>
        )}
      </div>
      <div className="controller">
        <button onClick={() => addLine()}>addLine (max: {maxLine})</button>
        {lines.map((data,i) =>
          <div key={i}>
            <input placeholder="line text" type="text" value={data.text} onChange={(event) => {onChangeLineText(i, event)}} />
            <select name="" id="" onChange={(event) => {onChangeLineDirection(i, event)}}>
              <option value="l2r">l2r</option>
              <option value="r2l">r2l</option>
            </select>
          </div>
        )}
      </div>
      <div>
        {renderAsciiArt()}
      </div>
    </div>
  );
}

export default App;
