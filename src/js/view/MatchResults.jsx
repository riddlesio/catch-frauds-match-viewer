import React       from 'react';
import createView  from 'omniscient';

const propTypes = {
    status: React.PropTypes.object.isRequired,
};

const lifeCycle = {

    getInitialState() {
        return { result: -1 };
    },

    handleRightClick() {
        const result = this.state.result < this.props.checkpointScores.length - 1
            ? this.state.result + 1
            : this.state.result;

        this.setState({ result });
    },

    handleLeftClick() {
        const result = this.state.result >= 0 ? this.state.result - 1 : this.state.result;

        this.setState({ result });
    },
};

const MatchResults = createView('MatchResults', lifeCycle, function (props) {

    const { status, score, name, checkpointScores } = props;
    const { result } = this.state;
    const isFinished = Math.ceil(status.percentage) === 100;
    const displayClass = isFinished ? '' : 'u-hidden';
    const { normal, fairlyJailed, unfairlyJailed, thefts, errors } = status;
    const showRightArrow = result > -1;
    const showLeftArrow = result < checkpointScores.length - 1;

    const totalScoreProps = {
        name,
        score,
        normal,
        fairlyJailed,
        thefts,
        unfairlyJailed,
        errors,
    };

    return (
        <div className={ `Layer ${displayClass}` }>
            <div className="AdyenGame-overlay">
                <div className="Layer-content AdyenGame-overlayLightbox">
                    <div className="AdyenGame-overlayContent Overlay">
                        { renderLeftArrow(this.handleLeftClick, showRightArrow) }
                        {
                            result <= -1
                                ? <TotalScore { ...totalScoreProps } />
                                : <CheckpointScore
                                    name={ name }
                                    checkpointScore={ checkpointScores[this.state.result] }
                                  />
                        }
                        { renderRightArrow(this.handleRightClick, showLeftArrow) }
                    </div>
                </div>
            </div>
        </div>
    );
});

function TotalScore(props) {

    const {
        name,
        score,
        normal,
        fairlyJailed,
        thefts,
        unfairlyJailed,
        errors,
    } = props;

    const fairlyJailedResult = renderResult('fairlyJailed', fairlyJailed, 'detected fraud');
    const theftResult = renderResult('theft', thefts, 'undetected fraud');
    const unfairlyJailedResult = renderResult('unfairlyJailed', unfairlyJailed, 'false positive');
    const errorResult = renderResult('error', errors, 'error');

    return (
        <div className="PerformanceOverlay">
            <div className="PerformanceOverlay-sider Sider">
                <svg className="Sider-puppet">
                    <use xlinkHref="#large-puppet" />
                </svg>
            </div>
            <div className="PerformanceOverlay-results">
                <h2 className="Results-title">{ name }'s score</h2>
                <p className="Results-score">{ score }%</p>
                <ul>
                    <li className="Score-result">
                        <svg className="Score-svgIcon">
                            <use xlinkHref="#icon-normal" />
                        </svg>
                        <span className="Score-scoreText">
                            { `${normal} correctly approved` }
                        </span>
                    </li>
                    { fairlyJailedResult }
                    { theftResult }
                    { unfairlyJailedResult }
                    { errorResult }
                </ul>
            </div>
        </div>
    );
}

function CheckpointScore({ name, checkpointScore }) {

    const { id, falsePositives, frauds } = checkpointScore;

    const unfairlyJailedResult = renderResult('unfairlyJailed', falsePositives, 'false positive');
    const typesDetectedResults = frauds.map(({ detectedFrauds, type }) => {
        const letter = String.fromCharCode(96 + type);

        return renderResult('fairlyJailed', detectedFrauds, `fraud-${letter} detected`);
    });

    return (
        <div className="PerformanceOverlay">
            <div className="PerformanceOverlay-sider Sider">
                <svg className="Sider-guard">
                    <use xlinkHref="#large-guard" style={{ transform: 'translate(-25px)' }}/>
                </svg>
            </div>
            <div className="PerformanceOverlay-results">
                <h2 className="Results-title">{ name }'s score</h2>
                <p className="Results-checkpoint">{ `Checkpoint ${id}` }</p>
                <ul>
                    { unfairlyJailedResult }
                    { typesDetectedResults }
                </ul>
            </div>
        </div>
    );
}

function renderResult(type, value, name) {

    return (
        <li key={ name } className="Score-result">
            <svg className="Score-svgIcon">
                <use xlinkHref={ `#icon-${type}` } />
            </svg>
            <span className="Score-scoreText">
                { `${value} ${name}` }
            </span>
        </li>
    );
}

function renderRightArrow(onClick, showArrow) {
    return renderArrow(onClick, showArrow, true);
}

function renderLeftArrow(onClick, showArrow) {
    return renderArrow(onClick, showArrow, false);
}

function renderArrow(onClick, showArrow, isRightArrow) {
    const arrowStyle = isRightArrow ? {} : { transform: 'rotate(180deg)' };
    const clickStyle = showArrow ? { cursor: 'pointer' } : { opacity: 0 };

    return (
        <div onClick={ onClick } style={ clickStyle }>
            <svg
                x="0px"
                y="0px"
                width="60px"
                height="60px"
                viewBox="0 0 306 306"
                style={ arrowStyle }
            >
                <polygon
                    style={{ fill: '#00953A' }}
                    points="94.35,0 58.65,35.7 175.95,153 58.65,270.3 94.35,306 247.35,153"
                />
            </svg>
        </div>
    );
}

MatchResults.propTypes = propTypes;

export default MatchResults;
