/**
 * Created by Braydon on 3/08/2017.
 */
import React from 'react';
import Board from './board';

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board calculateWinner={this.props.calculateWinner}/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}
export default Game;
