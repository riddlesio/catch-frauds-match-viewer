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
            <g transform="translate(450,73)" dangerouslySetInnerHTML={{
                __html: '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-normal"></use>'
            }} />
            <text x="27.4%" y="10%" className="AdyenGame-stat AdyenGame-stat--green">
                { normal }
            </text>
            <g transform="translate(650,73)" dangerouslySetInnerHTML={{
                __html: '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-fairlyJailed"></use>'
            }} />
            <text x="37.5%" y="10%" className="AdyenGame-stat AdyenGame-stat--green">
                { fairlyJailed }
            </text>
            <g transform="translate(950,73)" dangerouslySetInnerHTML={{
                __html: '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-unfairlyJailed"></use>'
            }} />
            <text x="53.5%" y="10%" className="AdyenGame-stat AdyenGame-stat--red">
                { unfairlyJailed }
            </text>
            <g transform="translate(1150,73)" dangerouslySetInnerHTML={{
                __html: '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-theft"></use>'
            }} />
            <text x="64%" y="10%" className="AdyenGame-stat AdyenGame-stat--red">{ thefts }</text>
            <g transform="translate(1350,73)" dangerouslySetInnerHTML={{
                __html: '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-error"></use>'
            }} />
            <text x="74.5%" y="10%" className="AdyenGame-stat AdyenGame-stat--red">{ errors }</text>
        </g>
    );
});

Status.propTypes = propTypes;

export default Status;
