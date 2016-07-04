import React       from 'react';
import createView  from 'omniscient';

const propTypes = {
    status: React.PropTypes.object.isRequired,
};

const MatchResults = createView('MatchResults', function (props) {

    const { status, score } = props;
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
                                <svg className="Sider-puppet">
                                    <g dangerouslySetInnerHTML={{
                                        __html: '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#large-puppet"></use>'
                                    }} />
                                </svg>
                            </div>
                            <div className="PerformanceOverlay-results">
                                <h2 className="Results-title">Your score</h2>
                                <p className="Results-score">{ score }%</p>
                                <ul>
                                    <li className="Score-result">
                                        <svg className="Score-svgIcon">
                                            <g dangerouslySetInnerHTML={{
                                                __html: '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-fairlyJailed"></use>'
                                            }} />
                                        </svg>
                                        <span className="Score-scoreText">
                                            { `${fairlyJailed} Fraud detected` }
                                        </span>
                                    </li>
                                    <li className="Score-result">
                                        <svg className="Score-svgIcon">
                                            <g dangerouslySetInnerHTML={{
                                                __html: '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-theft"></use>'
                                            }} />
                                        </svg>
                                        <span className="Score-scoreText">
                                            { `${thefts} Fraud undetected` }
                                        </span>
                                    </li>
                                    <li className="Score-result">
                                        <svg className="Score-svgIcon">
                                            <g dangerouslySetInnerHTML={{
                                                __html: '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-unfairlyJailed"></use>'
                                            }} />
                                        </svg>
                                        <span className="Score-scoreText">
                                            { `${unfairlyJailed} Falsely accused` }
                                        </span>
                                    </li>
                                    <li className="Score-result">
                                        <svg className="Score-svgIcon">
                                            <g dangerouslySetInnerHTML={{
                                                __html: '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-error"></use>'
                                            }} />
                                        </svg>
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
