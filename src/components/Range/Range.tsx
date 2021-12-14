import React, {FC, useState} from 'react';
import styles from "./Range.module.scss";

interface RangeProps {
    min:number;
    max:number;
    step:number;
    currency:string;
    maxLength:number
    label?:string;
    showMinMax:boolean;
    preliminary:string;
    stateValue:number;
}
export const Range:FC<RangeProps> = ({
min,
max,
step,
currency,
maxLength,
label,
showMinMax,
preliminary,
stateValue,
...props
}):JSX.Element => {

    const [range,setValue] = useState<number>(stateValue)
    const [amount,setAmountValue] = useState<string>("0")
    const [progress,setWidth] = useState<string>("0")

    function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = Math.round(+e.target.value);
        setValue(newValue)
        setAmountValue(newValue.toString())
        let pr = ((newValue - min) * 100) / (max - min);
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
        if(parseInt(amount) > max){
            setAmountValue(max.toString())
        }
        if(parseInt(amount) < min){
            setAmountValue(min.toString())
        }

        if(amount == ''){
            setAmountValue(min.toString())
        }

    }


    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if(!amount[0] || amount[0]==="0"){
            setAmountValue('')
        }

    }

    return (
        <div className={styles.rangeBox}>
            <div className={styles.selected}>
                <div className={styles.rangeLabel}>{label}</div>
               <input
                type="text"
                inputMode='numeric'
                pattern='[0-9]*'
                onKeyPress={handleKeyPress}
                maxLength={maxLength}
                value={amount}
                data-min={min}
                data-max={max}
                className={styles.amount}
                onChange={amountInputChange}
                onBlur={amountBlur}
               />

                <div className={styles.sumWrapper}>
                    <div className={styles.sum}>{amount == "" ? "0" : amount}</div>
                    <div className={styles.currency}>&nbsp;{currency}</div>
                </div>
            </div>
            <div className={styles.inputWrap}>
                <input className={styles.rangeInput} type="range" step={step} min={min} max={max} value={range} onChange={changeInput}/>
                 <div className={styles.progress} style={{'width':progress}}></div>
                 <div className={styles.bg}></div>
            </div>
            {
                showMinMax ?
                    <div className={styles.minmax}>
                        <div className={styles.min}>{min>=1000 ? min / 1000 + ' тыс.' : min}</div>
                        <div className={styles.max}>{max>=1000 ? max / 1000 + ' тыс.' : max}</div>
                    </div>
                    :
                    <div className={styles.calculation}>
                        <div className={styles.preliminary}>{preliminary}</div>
                    </div>
            }

        </div>
    );
};

export default Range;