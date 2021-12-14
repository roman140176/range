import React, {useState} from 'react';
import Range from "./components/Range/Range";
import './style.scss'
function App() {

    return (
    <div className="App">
        <div className="container">
             <Range
             min={100000}
             max={600000}
             step={1000}
             currency={'руб.'}
             maxLength = {7}
             label = {'Стоимость репетитора'}
             showMinMax = {false}
             preliminary={'Предварительный расчёт'}
             stateValue={100000}
             />
        </div>
    </div>
  );
}

export default App;
