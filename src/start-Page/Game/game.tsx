import * as React from 'react';
import './style.css';

interface Props {
    value: number;
}

function randoms(num: number) {
    return Math.floor(Math.random() * Math.floor(num));
}

function field(hardness: number) {
    /*field is a quarter of playable zone*/

    let mus: number[][] = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    hardness *= 10;
    let numbercells: number;
    let maxcells: number;
    let mincells: number;
    let muscells: number[][] = [];
    let currenthardness: number = 0;
    let a: number[]; // a is a coords of one of blocks (current)
    let blockhits: number;
    let q: number;

    for (let i: number = 0; i < mus.length; i++) {
        for (let j: number = 0; j < mus[i].length; j++) {
            muscells.push([i, j]);
        }
    }

    // Find maxcells in field
    if (hardness < 41) {
        maxcells = hardness;
    } else {
        maxcells = 40;
    }

    // Find mincells in field
    if (hardness < 41) {
        mincells = 3;
    } else {
        mincells = 6;
    }

    numbercells = randoms(maxcells);
    if (numbercells < mincells) {
        numbercells = mincells;
    }
    currenthardness += numbercells;
    blockhits = Math.floor((hardness - currenthardness) / numbercells / 1.5);
    for (let i: number = numbercells; i > 0; i--) {
        q = randoms(muscells.length);
        a = muscells[q];
        mus[a[0]][a[1]] = randoms(3) + blockhits;
        muscells.splice(q, 1);

    }

    // mus.map(x => new Array(8));
    return mus;
}

class Cells extends React.Component<Props, {}> {
    render() {
        let x: number = 0;
        let quartermus: number[][] = field(this.props.value);
        
        // tslint:disable-next-line:no-any
        let mus: any[][] = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

        for (let i: number = 2; i < 12; i++) {
            x = 0;
            for (let j: number = 0; j < 15; j++) {
                mus[i][j] = quartermus[(i - 2) % 5][x];
                if (j < 7) {
                    x++;
                } else {
                    x--;
                }
            }
            if (i === 6) {
                quartermus.reverse();
            }
        }
        // tslint:disable-next-line:no-console
        console.log(quartermus);

        // tslint:disable-next-line:jsx-key
        for (let i: number = 0; i < mus.length; i++) {
            for (let j: number = 0; j < mus[i].length; j++) {
                if (mus[i][j] === 0) {
                    mus[i][j] = <div className="cell_null" />;
                } else {
                    mus[i][j] = <div className="cell">{mus[i][j]}</ div>;
                }
            }
        }
        return mus;
    }
}

class Game extends React.Component<Props, {}> {
    render() {
        return (
            <div>
                <div className="game_page">
                    <div className="attention"><p>Restart page to go to select hardness</ p></div>
                    <div />
                        <div className="board" id="board">
                            <Cells value={this.props.value}/>
                        </ div>
                    <div />
                </div>
            </div>
        );
    }
}
export default Game;