/**
 * Created by Braydon on 3/08/2017.
 */

import React from 'react';

class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

module.exports = Square;