function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  
  handleClick(i) {
    const squares = this.state.squares.slice();
    
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  renderRestart(winner,tie){
    console.log('outside if block');
    if(winner || tie){
      console.log('inside if block');
      return(
          <button 
            className="restart"
            onClick={ 
              () => {
                  const squares = Array(9).fill(null);
                  
                  this.setState({
                    squares: squares,
                    xIsNext: true,
                  });
              }
            }
          > RESTART
          </button>  
        );
    } 
    return null;
    
  }
  
  render() {
    let tie = null;
    let nullSquares = 0;
    let status;
    
    nullSquares = checkTie(this.state.squares);
    const winner = calculateWinner(this.state.squares);
    
    if (winner) {
      status = 'Winner: ' + winner;
    } else if(nullSquares==0){
      status = "It's a tie!!!";
      tie = true;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status} {this.renderRestart(winner,tie)}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />)

function checkTie(squares){
  let nullSquares = 0;
  for(let i=0; i<squares.length; i++){
    if(!squares[i]){
      nullSquares++;
    }
  }
  console.log('nullSquares: '+nullSquares);
  return nullSquares;
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
  return null;
}
