import React from 'react';
import store from './store';
import './App.css'

function Button(props) {
  return <button
    onClick={() => { props.trigger(props.val) }}
  >{props.val}</button>
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      out: "0"
    }
    this.refOutput = React.createRef()
  }

  enterNumber(value) {
    let currentValue = value;
    let output = this.refOutput.current
    this.setState({
      out: currentValue
    })
    if (output.value === '0') { output.value = '' }
    output.value += currentValue
  }

  enterOperation(value) {
    let currentValue = value;
    let output = this.refOutput.current
    if (value === '+' || value === '-' || value === '*' || value === '/') { output.value += currentValue }
    if (value === 'C') { output.value = '0' }
    if (value === 'CE') {
      output.value = output.value.substring(0, output.value.length - 1)
      if (output.value === '') { output.value = '0' }
    }
    if (value === '=') {
      try {
        output.value = eval(output.value)
      }
      catch {
        output.value = "Incorrect data"
        setTimeout(() => {
          output.value = '0'
        }, 2000)
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="output">
          <input ref={this.refOutput} type="text" defaultValue={this.state.out} />
        </div>
        <div className='buttons-hold'>
          <div className="buttons">
            {store.buttons.map(item => <Button
              key = {item.val}
              trigger = {this.enterNumber.bind(this)}
              val = {item.val}
            >{item.val}</Button>)}
          </div>
          <div className="operations-column">
            {store.operations_column.map(item => <button
              key = {item.val}
              onClick={() => { this.enterOperation(item.val) }}
            >{item.val}</button>)}
          </div>
        </div>
        <div className="operations-row">
          {store.operations_row.map(item => <button
            key = {item.val}
            onClick={() => { this.enterOperation(item.val) }}
          >{item.val}</button>)}
        </div>
      </div>
    )
  }
}

export default App