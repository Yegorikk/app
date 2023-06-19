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

  const calculateResult = useCallback(
    () => {
      if (number1 !== null && number2 !== null && sign !== null) {
        let result = sign === '+' ? parseFloat(number1) + parseFloat(number2) : sign === '-' ? parseFloat(number1) - parseFloat(number2) : sign === '*' ? parseFloat(number1) * parseFloat(number2) : parseFloat(number1) / parseFloat(number2);
        setNumber1(result.toString());
        setNumber2(null);
      }
    }, [number1, sign, number2]);

  const resetCalculator = useCallback(
    () => {
      setNumber1(null);
      setSign(null);
      setNumber2(null);
    }, []);

  const clearLastChar = useCallback(
    () => {
      const [number, setNumber] = sign === null ? [number1, setNumber1] : [number2, setNumber2];
      if (number !== null) {
        setNumber(number.slice(0, -1));
        if (number.length === 0 && sign !== null) {
          setSign(null);
        }
      }
    }, [number1, sign, number2]);

    const enterOperation = useCallback(
      (value) => {
        const operations = {
          '+': () => {setSign('+'); calculateResult();},
          '-': () => {setSign('-'); calculateResult();},
          '*': () => {setSign('*'); calculateResult();},
          '/': () => {setSign('/'); calculateResult();},
          '=': () => {setSign(null); calculateResult();},
          'C': resetCalculator,
          'CE': clearLastChar,
        };
        const operation = operations[value];
        if (operation) {
          operation();
        }
      },
      [calculateResult, resetCalculator, clearLastChar]
    );

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