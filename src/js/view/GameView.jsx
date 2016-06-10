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

    const renderCheckpoint = (checkpoint) => (
        <Checkpoint checkpoint={ checkpoint } />
    );

    const renderBuyer = (buyer) => (
        <Buyer buyer={ buyer } key={ buyer.id } settings={ settings } />
    );

    const legendButton = (
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

    const maybeLegendButton = Math.ceil(status.percentage) === 100 ? null : legendButton;

    return (
        <div>
            <svg
                className="AdyenGame"
                viewBox={ `0 0 ${width} ${height}` }
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <clipPath id="percentageBar">
                        <polygon points="140.67 6.37 135.67 6.37 135.67 0.37 5 0.37 5 40.37 135.67 40.37 135.67 36.37 140.67 36.37 140.67 6.37"/>
                        <polygon points="4.67 0.37 4.67 6.37 -0.33 6.37 -0.33 36.37 4.67 36.37 4.67 40.37 87 40.37 87 0.37 4.67 0.37" />
                    </clipPath>
                </defs>
                <Status data={ status } />
                <Counter />
                { checkpoints.map(renderCheckpoint) }
                { buyers.map(renderBuyer) }
                { maybeLegendButton }
            </svg>
            <Overlay
                closeOverlay={ this.toggleInfo }
                status={ status }
                checkpoints={ checkpoints }
                isVisible={ isVisible }
            />
        </div>
    );
});

export default GameView;
