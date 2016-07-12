import React       from 'react';
import createView  from 'omniscient';

const propTypes = {
    status: React.PropTypes.object.isRequired,
};

const MatchResults = createView('MatchResults', function (props) {

    const { status, score, name } = props;
    const isFinished = Math.ceil(status.percentage) === 100;
    const displayClass = isFinished ? '' : 'u-hidden';
    const { normal, fairlyJailed, unfairlyJailed, thefts, errors } = status;

    const normalResult = renderResult('normal', normal, 'normal transactions');
    const fairlyJailedResult = renderResult('fairlyJailed', fairlyJailed, 'detected fraud');
    const theftResult = renderResult('theft', thefts, 'undetected fraud');
    const unfairlyJailedResult = renderResult('unfairlyJailed', unfairlyJailed, 'false positive');
    const errorResult = renderResult('error', errors, 'error');

    return (
        <div className={ `Layer ${displayClass}` }>
            <div className="AdyenGame-overlay">
                <div className="Layer-content AdyenGame-overlayLightbox">
                    <div className="AdyenGame-overlayContent Overlay">
                        <div className="PerformanceOverlay">
                            <div className="PerformanceOverlay-sider Sider">
                                <svg className="Sider-puppet">
                                    <use xlinkHref="#large-puppet" />
                                </svg>
                            </div>
                            <div className="PerformanceOverlay-results">
                                <h2 className="Results-title">{ name }'s Score</h2>
                                <p className="Results-score">{ score }%</p>
                                <ul>
                                    { normalResult }
                                    { fairlyJailedResult }
                                    { theftResult }
                                    { unfairlyJailedResult }
                                    { errorResult }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

function renderResult(type, value, name) {

    const label = maybeMultiple(type, `${value} ${name}`);

    return (
        <li className="Score-result">
            <svg className="Score-svgIcon">
                <use xlinkHref={ `#icon-${type}` } />
            </svg>
                <span className="Score-scoreText">
                    { label }
                </span>
        </li>
    );
}

function maybeMultiple(value, label) {
    if (value > 1) {
        return label + 's';
    }

    return label;
}

MatchResults.propTypes = propTypes;

export default MatchResults;
