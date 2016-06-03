import React       from 'react';
import component   from 'omniscient';

const Status = component('Status', function (props) {

    const { percentage, normal, fairlyJailed, unfairlyJailed, thefts } = props.data;

    return (
        <g className="AdyenGame-status">
            <g transform="translate(120,73)">
                <polygon className="percentageBar-1" points="140.67 6.37 135.67 6.37 135.67 0.37 85.67 0.37 85.67 40.37 135.67 40.37 135.67 36.37 140.67 36.37 140.67 6.37"/>
                <polygon className="percentageBar-2" points="4.67 0.37 4.67 6.37 -0.33 6.37 -0.33 36.37 4.67 36.37 4.67 40.37 85.67 40.37 85.67 0.37 4.67 0.37"/>
            </g>
            <text x="14.5%" y="10%" className="AdyenGame-stat AdyenGame-stat--green">{ `${Math.ceil(percentage)} %` }</text>
            <g transform="translate(450,73)">
                <polygon id="icon_-_background" data-name="icon - background" className="normal-1" points="55 5 55 0 5 0 5 5 0 5 0 35 5 35 5 40 55 40 55 35 60 35 60 5 55 5"/>
                <path id="icon_-_smile" data-name="icon - smile" className="normal-2" d="M45,7V17H40V7h5ZM20,7H15V17h5V7ZM15,22v5h5v5H40V27h5V22H15Z"/>
            </g>
            <text x="27.4%" y="10%" className="AdyenGame-stat AdyenGame-stat--green">{ normal }</text>
            <g transform="translate(650,73)">
                <polygon id="icon_-_background" data-name="icon - background" className="fairlyJailed-1" points="55 5 55 0 5 0 5 5 0 5 0 35 5 35 5 40 55 40 55 35 60 35 60 5 55 5"/>
                <path id="icon_-_jail" data-name="icon - jail" className="fairlyJailed-2" d="M12,5V36H48V5H12Zm5,26V10h5V31H17Zm10,0V10h6V31H27Zm16,0H38V10h5V31Z"/>
            </g>
            <text x="37.5%" y="10%" className="AdyenGame-stat AdyenGame-stat--green">{ fairlyJailed }</text>
            <g transform="translate(950,73)">
                <polygon id="icon_-_background" data-name="icon - background" className="unfairlyJailed-1" points="55 5 55 0 5 0 5 5 0 5 0 35 5 35 5 40 55 40 55 35 60 35 60 5 55 5"/>
                <path id="icon_-_sad_face" data-name="icon - sad face" className="unfairlyJailed-2" d="M45,8V18H40V8h5ZM20,8H15V18h5V8ZM40,33h5V28H40v5ZM15,33h5V28H15v5Zm5-10v5H40V23H20Z"/>
            </g>
            <text x="53.5%" y="10%" className="AdyenGame-stat AdyenGame-stat--red">{ unfairlyJailed }</text>
            <g transform="translate(1150,73)">
                <polygon id="icon_-_background" data-name="icon - background" className="theft-1" points="55 5 55 0 5 0 5 5 0 5 0 35 5 35 5 40 55 40 55 35 60 35 60 5 55 5"/>
                <polygon id="icon_-_skull" data-name="icon - skull" className="theft-2" points="42 10 42 5 17 5 17 10 11 10 11 25 17 25 17 15 27 15 27 20 17 20 17 29.89 17 35 23 35 23 30 27 30 27 35 32 35 32 30 36 30 36 35 42 35 42 29.89 42 20 32 20 32 15 42 15 42 25 48 25 48 10 42 10"/>
            </g>
            <text x="64%" y="10%" className="AdyenGame-stat AdyenGame-stat--red">{ thefts }</text>
        </g>
    );
});

export default Status;
