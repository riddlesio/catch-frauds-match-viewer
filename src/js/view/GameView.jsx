import React        from 'react';
import component    from 'omniscient';
import MatchResults from './MatchResults.jsx';
import Status       from './Status.jsx';
import Buyer        from './Buyer.jsx';
import Checkpoint   from './Checkpoint.jsx';
import Counter      from './Counter.jsx';
import ErrorLog     from './ErrorLog.jsx';
import CheckpointDescription from './CheckpointDescription.jsx';

const lifeCycle = {

    getInitialState() {
        return {
            descriptionVisible: false,
            buyerDetailsVisible: false,
            guardId: null,
            buyerId: null,
        };
    },

    deFocusBuyer() {
        this.setState({ buyerDetailsVisible: false });
    },

    toggleBuyerDetails(buyerId) {
        this.setState({ buyerDetailsVisible: !this.buyerDetailsVisible, buyerId });
    },

    showGuardNotes(guardId) {
        this.setState({ guardId });
        this.setState({ descriptionVisible: true });
    },

    hideGuardNotes() {
        this.setState({ descriptionVisible: false });
    },

};

const GameView = component('GameView', lifeCycle, function (props) {

    const { state, settings } = props;
    const { descriptionVisible, guardId, buyerId } = this.state;
    const { status, checkpoints, buyers, error } = state;
    const { width, height } = settings.canvas;

    function getCheckpointRenderer(toggleGuardNotes) {

        return function renderCheckpoint(checkpoint) {
            return <Checkpoint
                checkpoint={ checkpoint }
                onClick={toggleGuardNotes}
            />;
        };
    }

    function getBuyerRenderer(toggleBuyerNotes) {

        return function renderBuyer(buyer) {
            return <Buyer
                buyer={ buyer }
                key={ buyer.id }
                settings={ settings }
                onClick={ toggleBuyerNotes }
            />;
        };
    }

    return (
        <div>
            <svg
                className="AdyenGame"
                viewBox={ `0 0 ${width} ${height}` }
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <clipPath id="percentageBar">
                        <polygon points="135.67 6.37 135.67 0.37 85.67 0.37 4.67 0.37 4.67 6.37 -0.33 6.37 -0.33 36.37 4.67 36.37 4.67 40.37 85.67 40.37 135.67 40.37 135.67 36.37 140.67 36.37 140.67 6.37 135.67 6.37"/>
                    </clipPath>
                    <clipPath id="percentageBar2">
                        <polygon points="140.67 6.37 135.67 6.37 135.67 0.37 5 0.37 5 40.37 135.67 40.37 135.67 36.37 140.67 36.37 140.67 6.37"/>
                        <polygon points="4.67 0.37 4.67 6.37 -0.33 6.37 -0.33 36.37 4.67 36.37 4.67 40.37 87 40.37 87 0.37 4.67 0.37" />
                    </clipPath>
                </defs>
                <Status data={ status } />
                <Counter />
                { checkpoints.map(getCheckpointRenderer(this.showGuardNotes)) }
                { buyers.map(getBuyerRenderer(this.toggleBuyerDetails)) }
                <ErrorLog error={ error } />
            </svg>
            <CheckpointDescription
                descriptionVisible={ descriptionVisible }
                hideNotes={ this.hideGuardNotes }
                checkpoint={ checkpoints[guardId - 1] }
            />
            <MatchResults status={ status }/>
        </div>
    );
});

export default GameView;
