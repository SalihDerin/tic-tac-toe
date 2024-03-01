import { useState } from "react";

import Spielinformationen from "./Elements/Spielinformationen";
import Quadrat from "./Elements/Quadrat";
import Reset from "./Elements/Reset"
import '../Stylesheets/Spielfeld.css'
import '../Stylesheets/Spielinformationen.css';

type xo = 'X' | 'O' | null;

export default function Spielfeld() {
    
    // Spielhistorie
    const [historyState, setHistoryState] = useState<xo[][]>([Array<xo>(9).fill(null)])
    let youngestGameState: xo[] = historyState[historyState.length-1];
    function setHistory(zug: number) {
        setHistoryState(historyState.slice(0, zug + 1));
        for(let i = 0; i < historyState[zug].length; i++){
            feldState[i] = historyState[zug][i];
        }
        setXOState(zug % 2 === 0);
    }

    // X ist am Zug bei true
    const [xoState, setXOState] = useState<boolean>(true);
    function spielerWechsel() {
        setXOState(!xoState);
    }

    // Repräsentation des aktuellen Spielfeldes
    const [feldState, setFeldState] = useState<xo[]>(Array<xo>(9).fill(null));
    function onFeldClick(i: number){
        if(feldState[i] || calculateWinner(feldState)) return;
        const nextQuadrat =  feldState.slice();
        xoState ? nextQuadrat[i]='X' : nextQuadrat[i]='O';
        setFeldState(nextQuadrat);
        setHistoryState([...historyState, nextQuadrat]);
        if(!calculateWinner(nextQuadrat)) spielerWechsel();
    }
    
    // Startet einmal alles neu
    const [reset, setReset] = useState<boolean>(false);
    function doReset() {
        setReset(!reset);
    }

    let spielText: string = '';
    let winner: xo = calculateWinner(feldState);
    let fieldsAreFull: boolean = false;

    for(let i: number = 0; i < feldState.length; i++){
        if(feldState[i]){
            fieldsAreFull = true}
            else{
                fieldsAreFull = false; 
                break;
            }
    }

    if(!winner && !fieldsAreFull){
        spielText = 'Aktuell am Zug: ' + (xoState ? 'X' : 'O');
    } else if((fieldsAreFull && winner) || winner){
        spielText = (xoState ? 'X' : 'O') + ' hat gewonnen!'
    } else{
        spielText = 'Unentschieden!'
    }
    
    return(
        <>
            <div className="spielfeld">
                <div className="spiel-informationen">
                    <h1 className='überschrift'>{spielText}</h1>
                </div>
                <div className='reihe' id='1'>
                    <Quadrat 
                        xoState={xoState} spielerWechsel={spielerWechsel} 
                        feldState={feldState[0]} onFeldCklick={() => onFeldClick(0)} />
                    <Quadrat 
                        xoState={xoState} spielerWechsel={spielerWechsel} 
                        feldState={feldState[1]} onFeldCklick={() => onFeldClick(1)} />
                    <Quadrat 
                        xoState={xoState} spielerWechsel={spielerWechsel} 
                        feldState={feldState[2]} onFeldCklick={() => onFeldClick(2)} />
                </div>
                <div className='reihe' id='2'>
                    <Quadrat 
                        xoState={xoState} spielerWechsel={spielerWechsel} 
                        feldState={feldState[3]} onFeldCklick={() => onFeldClick(3)} />
                    <Quadrat 
                        xoState={xoState} spielerWechsel={spielerWechsel} 
                        feldState={feldState[4]} onFeldCklick={() => onFeldClick(4)} />
                    <Quadrat 
                        xoState={xoState} spielerWechsel={spielerWechsel} 
                        feldState={feldState[5]} onFeldCklick={() => onFeldClick(5)} />
                </div>
                <div className='reihe' id='3'>
                    <Quadrat 
                        xoState={xoState} spielerWechsel={spielerWechsel} 
                        feldState={feldState[6]} onFeldCklick={() => onFeldClick(6)} />
                    <Quadrat 
                        xoState={xoState} spielerWechsel={spielerWechsel} 
                        feldState={feldState[7]} onFeldCklick={() => onFeldClick(7)} />
                    <Quadrat 
                        xoState={xoState} spielerWechsel={spielerWechsel} 
                        feldState={feldState[8]} onFeldCklick={() => onFeldClick(8)} />
                </div>
                <Reset gameHistory={historyState} setGameHistory={setHistory} />
            </div>
        </>
    )
}

function calculateWinner(feldState: xo[]): xo{
    const winningLines: number[][] =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const nextQuadrat = feldState.slice();

    for(let i: number = 0; i < winningLines.length; i++){
        const [a, b, c] = winningLines[i]; 
        
        if(nextQuadrat[a]
            && nextQuadrat[a] === nextQuadrat[b]
            && nextQuadrat[a] === nextQuadrat[c]) {
                
                return nextQuadrat[a];
        }
    }

    return null;
}

