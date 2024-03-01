import { useState } from 'react';
import '../../Stylesheets/Quadrat.css'

interface xoProps{
    feldState:string|null;
    onFeldCklick: () => void;
    xoState: boolean;
    spielerWechsel: () => void;
}

export default function Quadrat({feldState, onFeldCklick}: xoProps,){
    return <button className="square" onClick={() => onFeldCklick()}>{feldState}</button>
}