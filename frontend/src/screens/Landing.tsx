import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Landing = () => {
    const navigate = useNavigate();
  return (
      <div className="mt-2">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 p-10">
          <div>
            <img src={"/frontend/public/chessboard.jpeg"} />
          </div>
          <div className="flex flex-col justify-center text-center gap-5">
            <h1 className="text-3xl font-bold text-white">
              Welcome to Chess
            </h1>
            <p className="text-lg text-white">
              This is a simple chess game built with React and TypeScript. Backend logic using Nodejs, WebSockets.
            </p>
            <div className="mt-4">
              <Button onClick={()=>navigate('/game')}>
                Start Game
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Landing;
