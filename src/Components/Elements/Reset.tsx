import '../../Stylesheets/Reset.css'

type resetProps = {
    gameHistory: ('X'| 'O' | null)[][];
    setGameHistory: (zug: number) => void;
}

export default function Reset({gameHistory, setGameHistory}: resetProps) {
    return(
        <ol>
            {gameHistory.map((quadrate, move) => {
            
                let knopfText: string = '';

                if(move === 0){
                    knopfText = 'Spiel neustarten';
                } else if (move > 0){
                    knopfText = 'Zurück zu Zug #' + move;
                }

                return(
                    <>
                        <li key={move}>
                            <button onClick={() => setGameHistory(move)}>{knopfText}</button>
                        </li>
                    </>
                )
            })}
        </ol>
    )
}