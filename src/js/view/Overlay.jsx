import React       from 'react';
import createView  from 'omniscient';

const propTypes = {
    status: React.PropTypes.object.isRequired,
    isVisible: React.PropTypes.bool.isRequired,
    checkpoints: React.PropTypes.object,
    closeOverlay: React.PropTypes.func,
};

const Overlay = createView('Overlay', function (props) {

    const { status, isVisible, checkpoints, closeOverlay } = props;
    const { percentage } = status;
    const isFinished = Math.ceil(percentage) === 100;
    let displayClass = 'Layer u-hidden';
    let content;

    if (isFinished || isVisible) {
        displayClass = 'Layer';
    }

    if (isFinished) {
        content = <PerformanceOverlay status={ status } />;
    } else {
        content = <InformationOverlay checkpoints={ checkpoints } />;
    }

    const closeButton = isFinished ? null : (
        <button onClick={ closeOverlay } type="button" className="Button GamePlayer-button">
            <span>Close </span><i className="fa fa-times" />
        </button>
    );

    return (
        <div className={ displayClass }>
            <div className="AdyenGame-overlay">
                <div className="Layer-content AdyenGame-overlayLightbox">
                    <div className="AdyenGame-overlayContent Overlay">
                        { closeButton }
                        { content }
                    </div>
                </div>
            </div>
        </div>
    );
});

Overlay.propTypes = propTypes;

function PerformanceOverlay(props) {

    const { status } = props;
    const { normal, fairlyJailed, unfairlyJailed, thefts } = status;

    const message = `
            Your score:
            Normal transactions passed: ${normal}.
            Discovered fraudulent transactions: ${fairlyJailed}.
            Normal transactions listed as fraudulent ${unfairlyJailed}.
            Fraudulous transactions slipped through your security: ${thefts}`;

    return (
        <div className="PerformanceOverlay">
            <div className="Overlay-column PerformanceOverlay-sider">
                <img className="PerformanceOverlay-puppet" src="../img/puppet_big.png" />
            </div>
            <div className="Overlay-column PerformanceOverlay-main">
                <h2 className="PerformanceOverlay-title">Your score</h2>
                <p className="PerformanceOverlay-score">80%</p>
                <ul>
                    <li>
                        <img className="PerformanceOverlay-scoreIcon" src="../img/icon-star.png" />
                        <span className="PerformanceOverlay-scoreText">{ `${fairlyJailed} Fraud detected` }</span>
                    </li>
                    <li>
                        <img className="PerformanceOverlay-scoreIcon" src="../img/icon-star.png" />
                        <span className="PerformanceOverlay-scoreText">{ `${thefts} Fraud undetected` }</span>
                    </li>
                    <li>
                        <img className="PerformanceOverlay-scoreIcon" src="../img/icon-star.png" />
                        <span className="PerformanceOverlay-scoreText">{ `${unfairlyJailed} People falsely accused` }</span>
                    </li>
                    <li>
                        <img className="PerformanceOverlay-scoreIcon" src="../img/icon-star.png" />
                        <span className="PerformanceOverlay-scoreText">{ `5th on the leaderboard` }</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function InformationOverlay(props) {

    const { checkpoints } = props;

    const text = checkpoints.map((cp) => (
        <p key={ cp.id }>
            <b>{ `Checkpoint ${cp.id}:`}</b>
            { cp.description }
        </p>
    ));

    return (
        <div>
            <h2>Checkpoints and their descriptions</h2>
            { text }
        </div>
    );
}

export default Overlay;
