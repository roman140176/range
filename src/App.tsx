import React, {useState} from 'react';
import Range from "./components/Range/Range";
import './style.scss'
import {log} from "util";
function App() {
const min = 100000;
    const max = 600000;
    const step = 1000;
    const currency = 'руб.';
    const [value,setValue] = useState<number>(100000)
    const [amountValue,setAmountValue] = useState<string>("0")
    const [width,setWidth] = useState<string>("0")
    function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = Math.round(+e.target.value);
        setValue(newValue)
        setAmountValue(newValue.toString())
        let pr = ((newValue - min) * 100) / (max - min);
        console.log('CHANGE', pr)
        setWidth((pr).toString() + '%')

    }

    function amountInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAmountValue(e.target.value.replace(/[^\d-]/g, ""))
        setValue(Math.round(+e.target.value))
        let pr = ((Math.round(+e.target.value) - min)* 100) / (max - min);
        setWidth((pr).toString() + '%');
        if(Math.round(+e.target.value) < min){
            setWidth( '0%');
        }
        if(Math.round(+e.target.value) > max){
            setWidth( '100%');
        }
    }

    function amountBlur(e: React.ChangeEvent<HTMLInputElement>) {
        if(parseInt(amountValue) > max){
            setAmountValue(max.toString())
        }
        if(parseInt(amountValue) < min){
            setAmountValue(min.toString())
        }

        if(amountValue == ''){
            setAmountValue(min.toString())
        }

    }


    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if(!amountValue[0] || amountValue[0]==="0"){
            setAmountValue('')
        }

    }

    return (
    <div className="App">
        <div className="container">
             <Range value={value}
             min={min}
             max={max}
             step={step}
             changeInput={(e)=>changeInput(e)}
             currency={currency}
             amountValue={amountValue}
             amountMin={min}
             amountMax={max}
             amountInputChange = {(e)=>amountInputChange(e)}
             maxLength = {7}
             amountBlur = {(e)=>amountBlur(e)}
             handleKeyPress = {(e)=>handleKeyPress(e)}
             label = {'Стоимость репетитора'}
             showMinMax = {false}
             preliminary={'Предварительный расчёт'}
             width={width}
             />
        </div>
    </div>
  );
}

export default App;
