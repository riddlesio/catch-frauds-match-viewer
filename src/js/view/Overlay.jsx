import React       from 'react';
import createView  from 'omniscient';

const propTypes = {
    status: React.PropTypes.object.isRequired,
    isVisible: React.PropTypes.bool.isRequired,
    checkpoints: React.PropTypes.array,
    closeOverlay: React.PropTypes.func,
};

const Overlay = createView('Overlay', function (props) {

    const { status, isVisible, checkpoints, closeOverlay } = props;
    const isFinished = Math.ceil(status.percentage) === 100;
    const displayClass = isFinished || isVisible ? '' : 'u-hidden';

    const performanceOverlay = (
        <PerformanceOverlay status={ status } />
    );
    const informationOverlay = (
        <InformationOverlay
            checkpoints={ checkpoints }
            closeOverlay={ closeOverlay }
        />
    );
    const content = isFinished ? performanceOverlay : informationOverlay;

    return (
        <div className={ `Layer ${displayClass}` }>
            <div className="AdyenGame-overlay">
                <div className="Layer-content AdyenGame-overlayLightbox">
                    <div className="AdyenGame-overlayContent Overlay">
                        { content }
                    </div>
                </div>
            </div>
        </div>
    );
});

Overlay.propTypes = propTypes;

function PerformanceOverlay(props) {

    const { fairlyJailed, unfairlyJailed, thefts } = props.status;

    return (
        <div className="PerformanceOverlay">
            <div className="PerformanceOverlay-sider Sider">
                <img className="Sider-puppet" src="../img/puppet_big.png" />
            </div>
            <div className="PerformanceOverlay-results">
                <h2 className="Results-title">Your score</h2>
                <p className="Results-score">80%</p>
                <ul>
                    <li>
                        <img className="Score-scoreIcon" src="../img/icon-star.png" />
                        <span className="Score-scoreText">
                            { `${fairlyJailed} Fraud detected` }
                        </span>
                    </li>
                    <li>
                        <img className="Score-scoreIcon" src="../img/icon-star.png" />
                        <span className="Score-scoreText">
                            { `${thefts} Fraud undetected` }
                        </span>
                    </li>
                    <li>
                        <img className="Score-scoreIcon" src="../img/icon-star.png" />
                        <span className="Score-scoreText">
                            { `${unfairlyJailed} Falsely accused` }
                        </span>
                    </li>
                    <li>
                        <img className="Score-scoreIcon" src="../img/icon-star.png" />
                        <span className="Score-scoreText">
                            { `5th on the leaderboard` }
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function InformationOverlay(props) {

    const list = props.checkpoints.map((cp) => (
        <li className="Checkpoints-checkpoint" key={ cp.id }>
            <p className="Checkpoint-number">{ `Check ${cp.id}:`}</p>
            <p className="Checkpoint-description">{ cp.description }</p>
        </li>
    ));

    return (
        <div className="InformationOverlay">
            <button
                onClick={ props.closeOverlay }
                type="button"
                className="Button GamePlayer-button Overlay-closeButton"
            >
                <i className="fa fa-times"/>
                <span> Close</span>
            </button>
            <h2 className="InformationOverlay-heading">Checkpoints with notes</h2>
            <ul className="InformationOverlay-checkpoints">
                { list }
            </ul>
        </div>
    );
}

export default Overlay;
