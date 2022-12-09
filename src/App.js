import "./App.css";
import Square from "./Components/Square";
import { useEffect, useState } from "react";
import { Patterns } from "./Pattern.js";
import WinnerScreen from "./WinnerScreen";

const clicksound = new Audio("./click.mp3");
const winsound = new Audio("./win.mp3");
const restartsound = new Audio("./restart.mp3");

const clickplay = () => {
  clicksound.play();
  
};

const winplay = () => {
  winsound.play();
  
};

const restartplay = () => {
  restartsound.play();
  
};

function App() {
  
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("⭕");
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [win, setWin] = useState(false);
  useEffect(() => {
    checkWinner();
    checkDraw();
    if (player === "❌") {
      setPlayer("⭕");
    } else {
      setPlayer("❌");
    }
  }, [board]);

  useEffect(() => {
    if (result.state !== "none") {
      setWin(true);
      winplay()
      // alert(`Game Finished! Winning Player:${result.winner} `);
    }
  }, [result]);

  const handleClick = (square) => {
    clickplay()
    setBoard(
      board.map((val, idx) => {
        if (idx === square && val === "") {
          return player;
        }
        return val;
      })
    );
  };

  const checkWinner = () => {
    Patterns.forEach((currPatern) => {
      const firstPlayer = board[currPatern[0]];
      if (firstPlayer === "") return;
      let foundWinningPattern = true;
      currPatern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern) {
        setResult({ winner: player, state: "Won" });
      }
    });
  };
  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("⭕");
    setWin(false)
    restartplay()
    
  };


  const checkDraw=()=>{
    let filled=true;
    board.forEach((square)=>{
      if(square===""){
        filled=false
      }
    })
    if(filled){
      setResult({winner:"No One",state:"Draw"})
    }
  }

  return (
    <div className="App">
      <div className="board">
        <h1>
          Let's Play <br /> Tic Tac Toe
        </h1>
        <div className="row">
          <Square
            chooseSquare={() => {
              handleClick(0);
            }}
            val={board[0]}
          />
          <Square
            chooseSquare={() => {
              handleClick(1);
            }}
            val={board[1]}
          />
          <Square
            chooseSquare={() => {
              handleClick(2);
            }}
            val={board[2]}
          />
        </div>
        <div className="row">
          <Square
            chooseSquare={() => {
              handleClick(3);
            }}
            val={board[3]}
          />
          <Square
            chooseSquare={() => {
              handleClick(4);
            }}
            val={board[4]}
          />
          <Square
            chooseSquare={() => {
              handleClick(5);
            }}
            val={board[5]}
          />
        </div>
        <div className="row">
          <Square
            chooseSquare={() => {
              handleClick(6);
            }}
            val={board[6]}
          />
          <Square
            chooseSquare={() => {
              handleClick(7);
            }}
            val={board[7]}
          />
          <Square
            chooseSquare={() => {
              handleClick(8);
            }}
            val={board[8]}
          />
        </div>
      </div>
      {win ?<WinnerScreen restartGame={restartGame} playerWon={result.winner}/>:setBoard}
    </div>
  );
}

export default App;
