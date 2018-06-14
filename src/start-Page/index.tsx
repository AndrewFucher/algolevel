import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style.css';
import Game from './Game/game';

function Onclick() {
  let text: string = (document.getElementById('firstid') as HTMLInputElement).value;
  let numberCells: number;
  numberCells = parseInt(text, 10);
  if (parseInt(text, 10)) {
    ReactDOM.render(
      <Game value={numberCells}/>,
      document.getElementById('root') as HTMLElement
    );
  } else {
    (document.getElementById('firstid') as HTMLInputElement).value = '';
  }
}

class Page extends React.Component {
    render() {
      return (
        <div className="page">
            <div className="words">Input Hardness of level!</div>
            <input className="inp" id="firstid" type="text"/>
            <button className="but" onClick={() => Onclick()}>START</button>
        </ div>
      );
    }
}
export default Page;