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
                                        <rect className="LargePuppet-1" x="46.33" y="100.12"
                                              width="83.18" height="45.02"/>
                                        <rect className="LargePuppet-2" x="46.33" y="154.42"
                                              width="9.45" height="19.22"
                                              transform="translate(102.11 328.06) rotate(-180)"/>
                                        <rect className="LargePuppet-2" x="120.06" y="154.42"
                                              width="9.45" height="19.22"/>
                                        <rect className="LargePuppet-2" x="46.33" y="173.64"
                                              width="18.9" height="9.28"
                                              transform="translate(111.55 356.56) rotate(-180)"/>
                                        <rect className="LargePuppet-2" x="120.06" y="173.64"
                                              width="18.9" height="9.28"/>
                                        <rect className="LargePuppet-1" x="129.51" y="100.29"
                                              width="9.45" height="9.28"/>
                                        <rect className="LargePuppet-1" x="138.95" y="109.56"
                                              width="9.45" height="9.28"/>
                                        <rect className="LargePuppet-3" x="148.4" y="118.84"
                                              width="9.45" height="9.28"/>
                                        <rect className="LargePuppet-3" x="148.4" y="128.12"
                                              width="9.45" height="9.28"/>
                                        <rect className="LargePuppet-3" x="148.4" y="137.39"
                                              width="9.45" height="9.28"/>
                                        <rect className="LargePuppet-3" x="0.08" y="63.81"
                                              width="9.1" height="9.27"
                                              transform="translate(73.08 63.81) rotate(90)"/>
                                        <rect className="LargePuppet-3" x="9.35" y="72.91"
                                              width="9.1" height="9.27"
                                              transform="translate(91.44 63.64) rotate(90)"/>
                                        <rect className="LargePuppet-3" x="18.62" y="82.1"
                                              width="9.1" height="9.27"
                                              transform="translate(109.9 63.57) rotate(90)"/>
                                        <rect className="LargePuppet-1" x="27.88" y="91.2"
                                              width="9.1" height="9.27"
                                              transform="translate(128.26 63.4) rotate(90)"/>
                                        <rect className="LargePuppet-1" x="37.15" y="100.3"
                                              width="9.1" height="9.27"
                                              transform="translate(146.63 63.23) rotate(90)"/>
                                        <rect className="LargePuppet-2" x="83.28" y="108.19"
                                              width="9.28" height="83.18"
                                              transform="translate(237.7 61.86) rotate(90)"/>
                                        <rect className="LargePuppet-4" x="37.86" y="72.6"
                                              width="92.62" height="27.62"/>
                                        <rect className="LargePuppet-4" x="37.86" y="18.72"
                                              width="100.86" height="45.02"/>
                                        <rect className="LargePuppet-4" x="28.41" y="63.73"
                                              width="119.53" height="27.62"/>
                                        <rect className="LargePuppet-3" x="61.81" y="22.68"
                                              width="63.61" height="73.73"
                                              transform="translate(153.16 -34.07) rotate(90)"/>
                                        <rect x="68.33" y="45.44" width="9.45" height="9.28"/>
                                        <rect x="111.59" y="45.44" width="9.45" height="9.28"/>
                                        <rect className="LargePuppet-5" x="89.92" y="42.15"
                                              width="9.53" height="52.7"
                                              transform="translate(163.18 -26.18) rotate(90)"/>
                                        <rect className="LargePuppet-5" x="89.92" y="58.76"
                                              width="9.53" height="37.21"
                                              transform="translate(172.05 -17.32) rotate(90)"/>
                                        <rect className="LargePuppet-4" x="84.39" y="-27.38"
                                              width="9.28" height="82.92"
                                              transform="translate(103.1 -74.94) rotate(90)"/>
                                        <rect className="LargePuppet-4" x="88.21" y="-12.75"
                                              width="10.63" height="36.13"
                                              transform="translate(98.84 -88.21) rotate(90)"/>
                                        <rect className="LargePuppet-3" x="47.12" y="45.44"
                                              width="9.45" height="18.3"/>
                                        <rect className="LargePuppet-3" x="56.75" y="91.35"
                                              width="54.83" height="8.77"/>
                                        <rect className="LargePuppet-4" x="138.71" y="54.63"
                                              width="9.23" height="9.11"/>
                                        <rect className="LargePuppet-5" x="86.74" y="98.94"
                                              width="4.56" height="24.12"
                                              transform="translate(200.02 21.98) rotate(90)"/>
                                        <rect className="LargePuppet-5" x="96.52" y="113.28"
                                              width="4.56" height="19.56"
                                              transform="translate(197.61 246.13) rotate(180)"/>
                                        <rect className="LargePuppet-5" x="89.02" y="125.35"
                                              width="4.56" height="19.56"
                                              transform="translate(226.43 43.82) rotate(90)"/>
                                        <rect className="LargePuppet-5" x="76.96" y="117.85"
                                              width="4.56" height="19.56"
                                              transform="translate(158.49 255.25) rotate(180)"/>
                                        <rect className="LargePuppet-5" x="83.06" y="111.98"
                                              width="4.56" height="16.3"
                                              transform="translate(-34.79 205.47) rotate(-90)"/>
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
