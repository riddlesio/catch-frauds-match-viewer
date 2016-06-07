import React        from 'react';
import Overlay      from './Overlay.jsx';
import Status       from './Status.jsx';
import Buyer        from './Buyer.jsx';
import Checkpoint   from './Checkpoint.jsx';
import Counter      from './Counter.jsx';
import component    from 'omniscient';

const lifeCycle = {
    getInitialState() {
        return { isVisible: false };
    },

    toggleInfo() {
        this.setState({ isVisible: !this.state.isVisible });
    },
};

const GameView = component('GameView', lifeCycle, function (props) {

    const { state, settings } = props;
    const { isVisible } = this.state;
    const { status, checkpoints, buyers } = state;
    const { width, height } = settings.canvas;

    console.log(isVisible);

    const renderCheckpoint = (checkpoint) => (
        <Checkpoint checkpoint={ checkpoint } />
    );

    const renderBuyer = (buyer) => (
        <Buyer buyer={ buyer } key={ buyer.id } settings={ settings } />
    );

    let legendButton;

    if (Math.ceil(status.percentage) === 100) {
        legendButton = null;
    } else {
        legendButton = (
            <g transform="translate(1650,70)">
                <rect
                    width="180"
                    height="42"
                    className="AdyenGame-legendButton"
                    onClick={ this.toggleInfo }
                />
                <text
                    transform="translate(37,32)"
                    className="AdyenGame-legendButtonText"
                    onClick={ this.toggleInfo }>Legend</text>
            </g>
        );
    }

    /**
     * Data should have the following structure:
     * {
     * }
     */

    return (
        <svg className="AdyenGame" viewBox={ `0 0 ${width} ${height}` } preserveAspectRatio="xMidYMid meet">
            <Status data={ status } />
            <Counter position={ status.checkoutPosition } />
            { checkpoints.map(renderCheckpoint) }
            { buyers.map(renderBuyer) }
            { legendButton }
            <Overlay status={ status } checkpoints={ checkpoints } isVisible={ isVisible } />
        </svg>
    );
});

export default GameView;
