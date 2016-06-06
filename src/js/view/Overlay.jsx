import React       from 'react';
const _             = require('lodash');
const createView    = require('omniscient');
const classNames    = require('classnames');

const Overlay = createView('Overlay', function (props) {

    const { winner } = props;

    const cx = classNames({
        'TetrisGame-overlay': true,
        'u-hidden': !winner,
    });

    let message;

    if (winner === 'none') {
        message = 'The game is a draw';
    } else {
        message = `${winner} won the game!`;
    }

    return (
        <g className={ cx }>
            <rect x="0" y="0" width="100%" height="100%" className="TetrisGame-overlayBackground"/>
            <text x="50%" y="50%" className="TetrisGame-overlayMessage">{ message }</text>
        </g>
    );
});

export default Overlay;
