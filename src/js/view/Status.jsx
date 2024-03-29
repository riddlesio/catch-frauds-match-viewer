import React       from 'react';
import component   from 'omniscient';

const propTypes = {
    data: React.PropTypes.object.isRequired,
};

const Status = component('Status', function (props) {

    const { percentage, normal, fairlyJailed, unfairlyJailed, thefts, errors } = props.data;
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
            <use transform="translate(450,73)" xlinkHref="#icon-normal" />
            <text x="27.6%" y="10%" className="AdyenGame-stat AdyenGame-stat--green">
                { normal }
            </text>
            <use transform="translate(650,73)" xlinkHref="#icon-fairlyJailed" />
            <text x="38%" y="10%" className="AdyenGame-stat AdyenGame-stat--green">
                { fairlyJailed }
            </text>
            <use transform="translate(950,73)" xlinkHref="#icon-unfairlyJailed" />
            <text x="53.6%" y="10%" className="AdyenGame-stat AdyenGame-stat--red">
                { unfairlyJailed }
            </text>
            <use transform="translate(1150,73)" xlinkHref="#icon-theft" />
            <text x="64%" y="10%" className="AdyenGame-stat AdyenGame-stat--red">{ thefts }</text>
            <use transform="translate(1350,73)" xlinkHref="#icon-error" />
            <text x="74.5%" y="10%" className="AdyenGame-stat AdyenGame-stat--red">{ errors }</text>
        </g>
    );
});

Status.propTypes = propTypes;

export default Status;
