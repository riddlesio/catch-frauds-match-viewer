import React        from 'react';
import component    from 'omniscient';
import Overlay      from './Overlay.jsx';
import Status       from './Status.jsx';
import Buyer        from './Buyer.jsx';
import Checkpoint   from './Checkpoint.jsx';
import Counter      from './Counter.jsx';
import ErrorLog     from './ErrorLog.jsx';
import Notes        from './Notes.jsx';

const lifeCycle = {

    getInitialState() {
        return {
            isVisible: false,
            notesVisible: false,
            guardId: null,
            buyerId: null,
        };
    },

    toggleOverlay() {
        this.setState({ isVisible: !this.state.isVisible });
    },

    toggleBuyerNotes(buyerId) {
        this.resetNoteIds();
        this.setState({ buyerId });
        this.showNotes();
    },

    toggleGuardNotes(guardId) {
        console.log(guardId);
        this.resetNoteIds();
        this.setState({ guardId });
        this.showNotes();
    },

    showNotes() {
        this.setState({ notesVisible: true });
    },

    hideNotes() {
        this.setState({ notesVisible: false });
    },

    resetNoteIds() {
        this.setState({ guardId: null, buyerId: null });
    },
};

const GameView = component('GameView', lifeCycle, function (props) {

    const { state, settings } = props;
    const { isVisible, notesVisible, guardId } = this.state;
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

    // const legendButton = (
    //     <g transform="translate(1650,70)">
    //         <rect
    //             width="180"
    //             height="42"
    //             className="AdyenGame-legendButton"
    //             onClick={ this.toggleOverlay }
    //         />
    //         <text
    //             transform="translate(37,32)"
    //             className="AdyenGame-legendButtonText"
    //             onClick={ this.toggleOverlay }>Legend</text>
    //     </g>
    // );

    // const maybeLegendButton = Math.ceil(status.percentage) === 100 ? null : legendButton;

    const maybeLegendButton = null;

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
                { checkpoints.map(getCheckpointRenderer(this.toggleGuardNotes)) }
                { buyers.map(getBuyerRenderer(this.toggleBuyerNotes)) }
                { maybeLegendButton }
                <ErrorLog error={ error } />
            </svg>
            <Notes
                notesVisible={ notesVisible }
                hideNotes={ this.hideNotes }
                checkpoint={ checkpoints[guardId - 1] }
            />
            <Overlay
                closeOverlay={ this.toggleOverlay }
                status={ status }
                checkpoints={ checkpoints }
                isVisible={ isVisible }
            />
        </div>
    );
});

export default GameView;
