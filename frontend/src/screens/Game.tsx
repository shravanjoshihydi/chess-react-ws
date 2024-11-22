import { useState, useEffect } from "react";
import ChessBoard from "../components/ChessBoard";
import Button from "../components/Button";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

const Game = () => {
  const socket = useSocket();
  const [chess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          setStarted(true);
          break;
        case MOVE: {
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          break;
        }
        case GAME_OVER: {
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          break;
        }
      }
    };
  }, [chess, socket]);

  if (!socket) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-2 gap-4">
          <div className="cols-span-4 w-full flex justify-center">
            <ChessBoard
              chess={chess}
              setBoard={setBoard}
              socket={socket}
              board={board}
            />
          </div>
          <div className="cols-span-2 flex justify-center items-start pt-20 bg-slate-800">
            {!started && (
              <Button
                onClick={() => {
                  socket.send(JSON.stringify({ type: INIT_GAME }));
                }}
              >
                Play
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
