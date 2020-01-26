import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Title(){
    return( 
    <div className="Title">
        tic-tac-toe
    </div> 
    )    
}

class TurnIndicator extends React.Component{
    render(){

        let xTurn ="";
        let xClass = "Indicator";
        let oTurn = "";
        let oClass = "Indicator";
        if(!this.props.winner){
            if(this.props.isXNext){
                xTurn = <div className="fadeIn">your turn!</div>
                xClass = "activeIndicator"
            }
            else{
                oTurn = <div className="fadeIn">your turn!</div>
                oClass = "activeIndicator"
            }
        }

        return(
            <div className="TurnIndicator">
                <div>
                <div className={xClass}>X {xTurn}</div>
                <div className={oClass}>O {oTurn}</div>
                </div>
            </div>
        );
    }
}


function Square(props){
    let fade="";
    if (props.value) fade = "fadeIn";

    return(
        <button className={"square square"+props.index} onClick={props.onClick}>
        <div className={fade}>
            {props.value}
        </div>
        </button>
    );
}

class Board extends React.Component{

    renderSquare(i){
        return( <Square  
                    index={i}
                    value={this.props.squares[i]}
                    onClick={( ) => {this.props.onClick(i)}}
                />
        )
    }

    render() {
        return(
            <div>
              <div className="board=row">
                 {this.renderSquare(0)}
                   {this.renderSquare(1)}
                   {this.renderSquare(2)}
               </div>
              <div className="board=row">
                 {this.renderSquare(3)}
                 {this.renderSquare(4)}
                  {this.renderSquare(5)}
              </div>
              <div className="board=row">
                  {this.renderSquare(6)}
                 {this.renderSquare(7)}
                 {this.renderSquare(8)}
              </div>
            </div>
        );
    }
}

class Game extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            squares:Array(9).fill(null),
            Winner:null,
            isXNext: true,
        };
    }

    handleClick(i){
        const current = this.state.squares;
        const squares = current.slice();
        let winner = calculateWinner(squares);

        if (winner || squares[i]){
            return;
        }
        squares[i] = this.state.isXNext ? "X" : "O";

        winner = calculateWinner(squares);
        console.log(winner)

        this.setState({
            squares: squares,
            winner: winner,
            isXNext: !this.state.isXNext,
        })
    }

    render(){
        const squares = this.state.squares;
        const winner = this.state.winner;
        let status;
        if(winner){
            status = "Winner: " + winner ;
        }

        if(calculateWinner(squares)==="D") status = "Draw";

        let turnIndicator = (winner) ? "" : <TurnIndicator isXNext={this.state.isXNext} winner ={this.state.winner} />;
        let gameInfo = (winner) ? <div className="game-info"><div>{status}</div></div> : "";
        return(
            <div className="game">
                <Title />
                <div className="game-board">
                    <Board
                        squares = {squares}
                        onClick = {(i) => this.handleClick(i)}
                     />
                    
                </div>
                {gameInfo}
                {turnIndicator}
                
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    for(let i=0; i<squares.length ; i++){
        if(!squares[i]) return null;
    }
    return "D";
  }

//=================================


ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
