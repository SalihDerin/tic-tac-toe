import { useState } from 'react';
import '../../Stylesheets/Spielinformationen.css';

type spieler = 'X' | 'O';

interface xIstDran {
    xoState: boolean;
    winnerProp?: 'X' | 'O' | null;
}

export default function Spielinformationen({xoState, winnerProp}:xIstDran){
    // let spieler: spieler = xoState ? 'X' : 'O';
    
    
    
    // return (<h1 className="überschrift">{spielState}</h1>)
}