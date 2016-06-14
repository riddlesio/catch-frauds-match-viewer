import React       from 'react';
import createView  from 'omniscient';

const propTypes = {
    status: React.PropTypes.object.isRequired,
};

const MatchResults = createView('MatchResults', function (props) {

    const { status } = props;
    const isFinished = Math.ceil(status.percentage) === 100;
    const displayClass = isFinished ? '' : 'u-hidden';
    const { fairlyJailed, unfairlyJailed, thefts, errors } = status;

    return (
        <div className={ `Layer ${displayClass}` }>
            <div className="AdyenGame-overlay">
                <div className="Layer-content AdyenGame-overlayLightbox">
                    <div className="AdyenGame-overlayContent Overlay">
                        <div className="PerformanceOverlay">
                            <div className="PerformanceOverlay-sider Sider">
                                <img className="Sider-puppet" src="img/puppet_big.png" />
                            </div>
                            <div className="PerformanceOverlay-results">
                                <h2 className="Results-title">Your score</h2>
                                <p className="Results-score">80%</p>
                                <ul>
                                    <li>
                                        <img className="Score-scoreIcon" src="img/icon_jail.png" />
                                        <span className="Score-scoreText">
                                            { `${fairlyJailed} Fraud detected` }
                                        </span>
                                    </li>
                                    <li>
                                        <img className="Score-scoreIcon" src="img/icon_skull.png" />
                                        <span className="Score-scoreText">
                                            { `${thefts} Fraud undetected` }
                                        </span>
                                    </li>
                                    <li>
                                        <img className="Score-scoreIcon" src="img/icon_sad.png" />
                                            <span className="Score-scoreText">
                                                { `${unfairlyJailed} Falsely accused` }
                                            </span>
                                    </li>
                                    <li>
                                        <img className="Score-scoreIcon" src="img/icon_error.png" />
                                            <span className="Score-scoreText">
                                                { `${errors} Parse errors` }
                                            </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

MatchResults.propTypes = propTypes;

export default MatchResults;
