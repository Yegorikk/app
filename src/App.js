import React, { useCallback, useMemo, useState } from 'react';
import store from './store';
import './App.css'

function Button(props) {
  return <button
    onClick={() => { props.trigger(props.val) }}
  >{props.val}</button>
}

function App() {
  const [number1, setNumber1] = useState(null);
  const [sign, setSign] = useState(null);
  const [number2, setNumber2] = useState(null);

  const enterNumber = (value) => {
    const [number, setNumber] = sign === null ? [number1, setNumber1] : [number2, setNumber2];
    let newOut = number === null ? value : number + value;
    setNumber(newOut);
  };

  const enterOperation = useCallback(
  (value) => {
    switch (value) {
      case '+':
        setSign('+');
        calculateResult();
        break;
      case '-':
        setSign('-');
        calculateResult();
        break;
      case '*':
        setSign('*');
        calculateResult();
        break;
      case '/':
        setSign('/');
        calculateResult();
        break;
      case '=':
        calculateResult();
        setSign(null);
        break;
      case 'C':
        resetCalculator();
        break;
      case 'CE':
        clearLastChar();
        break;
        break;
      default:
        break;
    }
  },[enterNumber]);

  const calculateResult = useCallback(
    () => {
    if (number1 !== null && number2 !== null && sign !== null) {
      let result = 0;
      switch (sign) {
        case '+':
          result = parseFloat(number1) + parseFloat(number2);
          break;
        case '-':
          result = parseFloat(number1) - parseFloat(number2);
          break;
        case '*':
          result = parseFloat(number1) * parseFloat(number2);
          break;
        case '/':
          result = parseFloat(number1) / parseFloat(number2);
          break;
        default:
          break;
      }
      setNumber1(result.toString());
      setNumber2(null);
    }
  },[enterNumber]);

  const resetCalculator = useCallback(
    () => {
    setNumber1(null);
    setSign(null);
    setNumber2(null);
  },[enterNumber]);

  const clearLastChar = useCallback(
    () => {
      if (sign === null) {
        number1 !== null && setNumber1(number1.length === 1 ? null : number1.slice(0, -1));
      } else {
        number2 !== null && setNumber2(number2.length === 1 ? null : number2.slice(0, -1));
      }
    }, [sign, number1, number2]);

  const calculatorText = useMemo(() => {
    let text = '';
    text += number1 || 'Enter equation'
    if (sign) {
      text += sign
      text += number2 || ''
    }
    return text;
  }, [number1, sign, number2])

  return (
    <div className="container">
      <div className="output">
        <input type="text" value={calculatorText} readOnly />
      </div>
      <div className='buttons-hold'>
        <div className="buttons">
          {store.buttons.map(item => <Button
            key={item.val}
            trigger={enterNumber}
            val={item.val}
          >{item.val}</Button>)}
        </div>
        <div className="operations-column">
          {store.operations_column.map(item => <Button
            key={item.val}
            trigger={enterOperation}
            val={item.val}
          >{item.val}</Button>)}
        </div>
      </div>
      <div className="operations-row">
        {store.operations_row.map(item => <Button
          key={item.val}
          trigger={enterOperation}
          val={item.val}
        >{item.val}</Button>)}
      </div>
    </div>
  )
}

export default App