import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

const ChessBoard = ({
  chess,
  setBoard,
  board,
  socket
}: {
  chess: Chess;
  setBoard:(value: React.SetStateAction<({
    square: Square;
    type: PieceSymbol;
    color: Color;
} | null)[][]>) => void;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) => {
    const [from, setFrom] = useState<null | Square>(null);

    const handleSquareClick = ( squareRepresentation:Square) => {
        if(!from){
            setFrom(squareRepresentation);
        } else{
            socket.send(JSON.stringify({
                type:MOVE,
                payload:{
                        from, 
                        to: squareRepresentation
                }
            }));
            setFrom(null)
            chess.move({
                from, 
                to: squareRepresentation
            });
            setBoard(chess.board())
        }
    }
  return (
    <div className="text-white">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
                const squareRepresentation  = String.fromCharCode(97+ (j%8)) + String(8-i) as Square;
              return (
                <div onClick={()=>{handleSquareClick(squareRepresentation)}} key={j} className={`w-16 h-16 ${(i+j)%2 == 0? 'bg-slate-600':'bg-white'}`}>
                    <div className="flex h-full w-full justify-center items-center text-slate-900">
                        {square ? <img className="w-10" src={`/src/assets/pieces/${square?.color === 'b'? `black/${square?.type}` : `white/${square?.type?.toUpperCase()}`}.png`}/>:null}
                    </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
