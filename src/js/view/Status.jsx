import React       from 'react';
import component   from 'omniscient';

const Status = component('Status', function (props) {

    const { percentage, normal, fairlyJailed, unfairlyJailed, thefts } = props.data;
    const percentageOfTotal = Math.ceil(140 / 100 * percentage);

    return (
        <g className="AdyenGame-status">
            <g transform="translate(120,73)" clipPath="url(#percentageBar)">
                <rect width="140px" height="40px" className="percentageBar-1"></rect>
                <rect width={ percentageOfTotal } height="40px" className="percentageBar-2"></rect>
            </g>
            <text x="14.5%" y="10%" className="AdyenGame-stat AdyenGame-stat--green">
                { `${Math.ceil(percentage)} %` }
            </text>
            <g transform="translate(450,73)">
                <polygon
                    className="normal-1"
                    points="55 5 55 0 5 0 5 5 0 5 0 35 5 35 5 40 55 40 55 35 60 35 60 5 55 5"
                />
                <path
                    className="normal-2"
                    d="M45,7V17H40V7h5ZM20,7H15V17h5V7ZM15,22v5h5v5H40V27h5V22H15Z"
                />
            </g>
            <text x="27.4%" y="10%" className="AdyenGame-stat AdyenGame-stat--green">
                { normal }
            </text>
            <g transform="translate(650,73)">
                <polygon
                    className="fairlyJailed-1"
                    points="55 5 55 0 5 0 5 5 0 5 0 35 5 35 5 40 55 40 55 35 60 35 60 5 55 5"
                />
                <path
                    className="fairlyJailed-2"
                    d="M12,5V36H48V5H12Zm5,26V10h5V31H17Zm10,0V10h6V31H27Zm16,0H38V10h5V31Z"
                />
            </g>
            <text x="37.5%" y="10%" className="AdyenGame-stat AdyenGame-stat--green">
                { fairlyJailed }
            </text>
            <g transform="translate(950,73)">
                <polygon
                    className="unfairlyJailed-1"
                    points="55 5 55 0 5 0 5 5 0 5 0 35 5 35 5 40 55 40 55 35 60 35 60 5 55 5"
                />
                <path
                    className="unfairlyJailed-2"
                    d="M45,8V18H40V8h5ZM20,8H15V18h5V8ZM40,33h5V28H40v5ZM15,33h5V28H15v5Zm5-10v5H40V23H20Z"
                />
            </g>
            <text x="53.5%" y="10%" className="AdyenGame-stat AdyenGame-stat--red">
                { unfairlyJailed }
            </text>
            <g transform="translate(1150,73)">
                <polygon
                    className="theft-1"
                    points="55 5 55 0 5 0 5 5 0 5 0 35 5 35 5 40 55 40 55 35 60 35 60 5 55 5"
                />
                <polygon
                    className="theft-2"
                    points="42 10 42 5 17 5 17 10 11 10 11 25 17 25 17 15 27 15 27 20 17 20 17 29.89 17 35 23 35 23 30 27 30 27 35 32 35 32 30 36 30 36 35 42 35 42 29.89 42 20 32 20 32 15 42 15 42 25 48 25 48 10 42 10"
                />
            </g>
            <text x="64%" y="10%" className="AdyenGame-stat AdyenGame-stat--red">{ thefts }</text>
        </g>
    );
});

export default Status;
