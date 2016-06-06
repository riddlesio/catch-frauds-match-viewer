import React        from 'react';
import Overlay      from './Overlay.jsx';
import Status       from './Status.jsx';
import Buyer        from './Buyer.jsx';
import Checkpoint   from './Checkpoint.jsx';
import Counter      from './Counter.jsx';

function GameView(props) {

    const { state, settings } = props;
    const { status, checkpoints, buyers } = state;
    const { width, height } = settings.canvas;

    const renderCheckpoint = (checkpoint) => (
        <Checkpoint checkpoint={ checkpoint } />
    );

    const renderBuyer = (buyer) => (
        <Buyer buyer={ buyer } key={ buyer.id } settings={ settings } />
    );

    /**
     * Data should have the following structure:
     * {
     * }
     */

    // TODOS
    // Change overlay to MaybeOverlay
    // Create buyer symbol for every buyer. With props.
    // Create defs for buyer properties.
    // Create position map

    return (
        <svg className="AdyenGame" viewBox={ `0 0 ${width} ${height}` } preserveAspectRatio="xMidYMid meet">
            <Status data={ status } />
            <Counter position={ status.checkoutPosition } />
            { checkpoints.map(renderCheckpoint) }
            { buyers.map(renderBuyer) }
            <Overlay data={ status } />
        </svg>
    );
};

export default GameView;
