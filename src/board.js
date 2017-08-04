/**
 * Created by Braydon on 3/08/2017.
 */
import React from 'react';
import Square from './square';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
          };
          this.cw = this.props.calculateWinner.bind(this);
          }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (this.cw(squares) || squares[i]) {
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
              key={`square=${i}`}
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const winner = this.cw(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                {[0,3,6].map(i => <div className="board-row" key={`board-${i}`}>{[0,1,2].map(ii => this.renderSquare(i + ii))}</div>)}
            </div>
        );
    }
}
export default Board;
