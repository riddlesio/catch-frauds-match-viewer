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
                                    <g transform="scale(0.5,0.5)">
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
                                    </g>
                                </svg>
                            </div>
                            <div className="PerformanceOverlay-results">
                                <h2 className="Results-title">Your score</h2>
                                <p className="Results-score">{ score }%</p>
                                <ul>
                                    <li className="Score-result">
                                        <svg className="Score-svgIcon">
                                            <g id="icon-fairlyJailed">
                                                <polygon
                                                    className="fairlyJailed-1"
                                                    points="55 5 55 0 5 0 5 5 0 5 0 35 5 35 5 40 55 40 55 35 60 35 60 5 55 5"
                                                />
                                                <path
                                                    className="fairlyJailed-2"
                                                    d="M12,5V36H48V5H12Zm5,26V10h5V31H17Zm10,0V10h6V31H27Zm16,0H38V10h5V31Z"
                                                />
                                            </g>
                                        </svg>
                                        <span className="Score-scoreText">
                                            { `${fairlyJailed} Fraud detected` }
                                        </span>
                                    </li>
                                    <li className="Score-result">
                                        <svg className="Score-svgIcon">
                                            <g id="icon-theft">
                                                <polygon
                                                    className="theft-1"
                                                    points="55 5 55 0 5 0 5 5 0 5 0 35 5 35 5 40 55 40 55 35 60 35 60 5 55 5"
                                                />
                                                <polygon
                                                    className="theft-2"
                                                    points="42 10 42 5 17 5 17 10 11 10 11 25 17 25 17 15 27 15 27 20 17 20 17 29.89 17 35 23 35 23 30 27 30 27 35 32 35 32 30 36 30 36 35 42 35 42 29.89 42 20 32 20 32 15 42 15 42 25 48 25 48 10 42 10"
                                                />
                                            </g>
                                        </svg>
                                        <span className="Score-scoreText">
                                            { `${thefts} Fraud undetected` }
                                        </span>
                                    </li>
                                    <li className="Score-result">
                                        <svg className="Score-svgIcon">
                                            <g id="icon-unfairlyJailed">
                                                <polygon
                                                    className="unfairlyJailed-1"
                                                    points="55 5 55 0 5 0 5 5 0 5 0 35 5 35 5 40 55 40 55 35 60 35 60 5 55 5"
                                                />
                                                <path
                                                    className="unfairlyJailed-2"
                                                    d="M45,8V18H40V8h5ZM20,8H15V18h5V8ZM40,33h5V28H40v5ZM15,33h5V28H15v5Zm5-10v5H40V23H20Z"
                                                />
                                            </g>
                                        </svg>
                                        <span className="Score-scoreText">
                                            { `${unfairlyJailed} Falsely accused` }
                                        </span>
                                    </li>
                                    <li className="Score-result">
                                        <svg className="Score-svgIcon">
                                            <g id="icon-error">
                                                <polygon
                                                    className="theft-1"
                                                    points="55 5 55 0 5 0 5 5 0 5 0 35 5 35 5 40 55 40 55 35 60 35 60 5 55 5"
                                                />
                                                <path
                                                    className="theft-2"
                                                    d="M22.5,32.5h-5v-5h5v5Zm5-10h-5v5h5v-5Zm5-5.14h-5v5h5v-5Zm5-4.86h-5v5h5v-5Zm5-5h-5v5h5v-5Zm-5,15h-5v5h5v-5Zm5,5h-5v5h5v-5Zm-15-15h-5v5h5v-5Zm-5-5h-5v5h5v-5Z"
                                                />
                                            </g>
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
