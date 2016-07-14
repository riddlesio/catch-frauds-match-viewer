import React        from 'react';
import component    from 'omniscient';
import MatchResults from './MatchResults.jsx';
import Status       from './Status.jsx';
import Buyer        from './Buyer.jsx';
import Checkpoint   from './Checkpoint.jsx';
import Counter      from './Counter.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import { event }    from '@riddles/match-viewer';
import CheckpointDescription from './CheckpointDescription.jsx';

const { PlaybackEvent } = event;

const lifeCycle = {

    getInitialState() {

        return {
            descriptionVisible: false,
            guardId: null,
            buyerDetailsVisible: false,
            buyerId: null,
            buyerApproved: [],
        };
    },

    componentWillMount() {

        PlaybackEvent.on(PlaybackEvent.PLAY, this.hideBuyerDetails);
    },

    showBuyerDetails(buyerStats) {

        this.props.controls.pause();

        this.setState({
            buyerDetailsVisible: true,
            buyerId: buyerStats.id,
            buyerApproved: buyerStats.isApproved,
        });
    },

    hideBuyerDetails() {

        this.setState({
            buyerDetailsVisible: false,
            buyerId: null,
            buyerApproved: [],
        });
    },

    toggleBuyerDetails(buyerStats, event) {

        event.stopPropagation();

        const { buyerDetailsVisible, buyerId } = this.state;
        const isDifferentBuyer = buyerStats.id !== buyerId;

        if (isDifferentBuyer || !buyerDetailsVisible) {
            this.showBuyerDetails(buyerStats);
        } else {
            this.props.controls.play();
            this.hideBuyerDetails();
        }
    },

    showGuardNotes(guardId, event) {

        event.stopPropagation();

        this.setState({
            descriptionVisible: true,
            guardId,
        });
    },

    hideGuardNotes() {

        this.setState({
            descriptionVisible: false,
        });
    },

    disableSelection() {

        if (this.state.descriptionVisible) {
            this.hideGuardNotes();
        }

        if (this.state.buyerDetailsVisible) {

            this.props.controls.play();
            this.hideBuyerDetails();
        }
    },
};

const GameView = component('GameView', lifeCycle, function (props) {

    const { state, settings, score } = props;
    const { descriptionVisible, guardId, buyerId, buyerApproved, buyerDetailsVisible } = this.state;
    const { status, checkpoints, buyers, error } = state;
    const { canvas, name } = settings;
    const { width, height } = canvas;

    console.log(state);

    return (
        <div style={{ height: '100%' }}>
            <svg className="u-hidden">
                <symbol id="icon-normal">
                    <path
                        className="normal-1"
                        d="M55,5V0H5V5H0V35H5v5H55V35h5V5H55ZM15,7h5V17H15V7ZM45,27H40v5H20V27H15V22H45v5Zm0-10H40V7h5V17Z"
                    />
                </symbol>
                <symbol id="icon-theft">
                    <g>
                        <rect className="theft-1" x="32" y="15" width="10" height="5"/>
                        <path
                            className="theft-1"
                            d="M55,5V0H5V5H0V35H5v5H55V35h5V5H55ZM48,25H42V35H36V30H32v5H27V30H23v5H17V25H11V10h6V5H42v5h6V25Z"/>
                        <rect className="theft-1" x="17" y="15" width="10" height="5"/>
                    </g>
                </symbol>
                <symbol id="icon-fairlyJailed">
                    <g>
                        <polygon
                            className="fairlyJailed-1"
                            points="43 31 43 10 38 10 38 31 42.51 31 43 31"
                        />
                        <rect className="fairlyJailed-1" x="27" y="10" width="6" height="21"/>
                        <rect className="fairlyJailed-1" x="17" y="10" width="5" height="21"/>
                        <path
                            className="fairlyJailed-1"
                            d="M55,5V0H5V5H0V35H5v5H55V35h5V5H55ZM48,9.5V36H12V5H48V9.5Z"
                        />
                    </g>
                </symbol>
                <symbol id="icon-unfairlyJailed">
                    <path
                        className="unfairlyJailed-1"
                        d="M55,5V0H5V5H0V35H5v5H55V35h5V5H55ZM15,8h5V18H15V8ZM45,33H40V28H20v5H15V28h5V23H40v5h5v5Zm0-15H40V8h5V18Z"
                    />
                </symbol>
                <symbol id="icon-error">
                    <path
                        className="theft-1"
                        d="M55,5V0H5V5H0V35H5v5H55V35h5V5H55ZM27,28H22v5H17V28h5V23h5v5Zm15,5H37V28H32V23h5v5h5v5Zm0-20H37v5H32v5H27V18H22V13H17V8h5v5h5v5h5V13h5V8h5v5Z"
                    />
                </symbol>
                <symbol id="large-puppet">
                    <polygon className="LargePuppet-1"
                             points="148 119 148 128.12 148 137.39 148 147 158 147 158 137.39 158 128.12 158 119 148 119"/>
                    <rect className="LargePuppet-1" y="64" width="9" height="9"/>
                    <rect className="LargePuppet-1" x="9" y="73" width="10" height="9"/>
                    <rect className="LargePuppet-1" x="19" y="82" width="9" height="9"/>
                    <polygon className="LargePuppet-2"
                             points="130 100 46 100 37 100 37 91 28 91 28 100 37 100 37 109 46 109 46 145 130 145 130 110 139 110 139 100 130 100"/>
                    <rect className="LargePuppet-2" x="139" y="110" width="9" height="9"/>
                    <polygon className="LargePuppet-3"
                             points="130 174 130 154.42 130 145 46 145 46 154.42 46 173.64 46 183 65 183 65 174 56 174 56 154 120 154 120 173.64 120 183 139 183 139 174 130 174"/>
                    <polygon className="LargePuppet-4"
                             points="139 64 139 64 148 64 148 55 139 55 139 19 130 19 130 9 112 9 112 0 75 0 75 9 48 9 48 19 38 19 38 64 28 64 28 91 37 91 37 100 130 100 130 91 148 91 148 64 139 64"/>
                    <polygon className="LargePuppet-1" points="57 28 57 91.35 57 100 112 100 112 91 130 91 130 28 57 28"/>
                    <rect className="LargePuppet-1" x="47" y="45" width="10" height="19"/>
                    <rect x="68.33" y="45.44" width="9.45" height="9.28"/>
                    <rect x="111.59" y="45.44" width="9.45" height="9.28"/>
                    <polygon className="LargePuppet-5" points="121 64 68 64 68 73 76 73 76 82 113 82 113 73 121 73 121 64"/>
                    <polygon className="LargePuppet-5"
                             points="77 109 77 113 97 113 97 133 82 133 82 122 93 122 93 118 81.53 118 77.19 118 77 118 77 137 81.53 137 101 137 101 132.84 101 113.28 101 109 77 109"/>
                </symbol>
            </svg>
            <svg
                className="AdyenGame"
                viewBox={ `0 0 ${width} ${height}` }
                preserveAspectRatio="xMidYMid meet"
                onClick={ this.disableSelection }
            >
                <defs>
                    <clipPath id="percentageBar">
                        <polygon points="135.67 6.37 135.67 0.37 85.67 0.37 4.67 0.37 4.67 6.37 -0.33 6.37 -0.33 36.37 4.67 36.37 4.67 40.37 85.67 40.37 135.67 40.37 135.67 36.37 140.67 36.37 140.67 6.37 135.67 6.37"/>
                    </clipPath>
                </defs>
                <Status data={ status } />
                <Counter />
                { checkpoints.map(getCheckpointRenderer(this.showGuardNotes, buyerApproved)) }
                {
                    buyers.map(
                        getBuyerRenderer(
                            this.toggleBuyerDetails,
                            this.showBuyerDetails,
                            buyerDetailsVisible,
                            buyerId,
                            settings
                        )
                    )
                }
                <ErrorMessage error={ error } />
            </svg>
            <CheckpointDescription
                descriptionVisible={ descriptionVisible }
                hideNotes={ this.hideGuardNotes }
                checkpoint={ checkpoints[guardId - 1] }
            />
            <MatchResults status={ status } name={ name } score={ score }/>
        </div>
    );
});

function getCheckpointRenderer(toggleGuardNotes, buyerApproved) {

    return function renderCheckpoint(checkpoint, index) {

        const hasApproved = buyerApproved[index];

        return <Checkpoint
            key={ `Checkpoint${index}` }
            checkpoint={ checkpoint }
            onClick={ toggleGuardNotes }
            hasApproved={ hasApproved }
        />;
    };
}

function getBuyerRenderer(toggleBuyerDetails, showBuyerDetails, buyerDetailsVisible, buyerId, settings) {

    return function renderBuyer(buyer) {

        const highlighted = buyerDetailsVisible && buyer.id === buyerId;
        const key = `Buyer--${buyer.id}`;

        return <Buyer
            buyer={ buyer }
            key={ key }
            highlighted={ highlighted }
            settings={ settings }
            onClick={ toggleBuyerDetails }
            showDetails={ showBuyerDetails }
        />;
    };
}

export default GameView;
