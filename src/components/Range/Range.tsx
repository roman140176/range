import React, {FC} from 'react';
import styles from "./Range.module.scss";

interface RangeProps {
    value:number;
    min:number;
    max:number;
    step:number;
    changeInput:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    amountInputChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    amountBlur:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    handleKeyPress:(e:React.KeyboardEvent<HTMLInputElement>)=>void;
    currency:string;
    amountValue:string;
    amountMin:number;
    amountMax:number;
    maxLength:number
    label?:string;
    showMinMax:boolean;
    preliminary:string;
    width:string;
}
export const Range:FC<RangeProps> = ({
value,
min,
max,
step,
changeInput,
currency,
amountValue,
amountMin,
amountMax,
amountInputChange,
maxLength,
amountBlur,
handleKeyPress,
label,
showMinMax,
preliminary,
width,
...props
}):JSX.Element => {

    return (
        <div className={styles.rangeBox}>
            <div className={styles.rangeBox__selected}>
                <div className={styles.rangeBox__label}>{label}</div>
               <input
                type="text"
                inputMode='numeric'
                pattern='[0-9]*'
                onKeyPress={handleKeyPress}
                maxLength={maxLength}
                value={amountValue}
                data-min={amountMin}
                data-max={amountMax}
                className={styles.rangeBox__amount}
                onChange={amountInputChange}
                onBlur={amountBlur}
               />

                <div className={styles.rangeBox__sumWrapper}>
                    <div className={styles.rangeBox__sum}>{amountValue == "" ? "0" : amountValue}</div>
                    <div className={styles.rangeBox__currency}>&nbsp;{currency}</div>
                </div>
            </div>
            <div className={styles.rangeBox__inputWrap}>
                <input className={styles.rangeBox__input} type="range" step={step} min={min} max={max} value={value} onChange={changeInput}/>
                 <div className={styles.rangeBox__progress} style={{'width':width}}></div>
                 <div className={styles.rangeBox__bg}></div>
            </div>
            {
                showMinMax ?
                    <div className={styles.rangeBox__minmax}>
                        <div className={styles.rangeBox__min}>{min>=1000 ? min / 1000 + ' тыс.' : min}</div>
                        <div className={styles.rangeBox__max}>{max>=1000 ? max / 1000 + ' тыс.' : max}</div>
                    </div>
                    :
                    <div className={styles.rangeBox__calculation}>
                        <div className={styles.rangeBox__preliminary}>{preliminary}</div>
                    </div>
            }

        </div>
    );
};

export default Range;