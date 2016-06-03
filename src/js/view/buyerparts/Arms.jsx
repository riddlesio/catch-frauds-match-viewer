import React        from 'react';
import component    from 'omniscient';

const Arms = component('Arms', function (props) {

    const { isBusted, skinColor } = props;
    const skinStyle = { fill: skinColor };

    let arms;

    if (!isBusted) {
        arms = (
            <g>
                <polygon id="arm_-_left" dataName="arm - left" style={ skinStyle } points="45 153.81 45 159.28 45 165 50 165 50 159.28 50 153.81 50 148 45 148 45 153.81"/>
                <polygon id="arm_-_right" dataName="arm - right" style={ skinStyle } points="120 148 120 153.81 120 159.28 120 165 125 165 125 159.28 125 153.81 125 148 120 148"/>
            </g>
        );
    } else {
        arms = (
            <g>
                <polygon id="arm_down_-_left" data-name="arm down - left" style={ skinStyle } points="45 185.81 45 191.28 45 197 50 197 50 191.28 50 185.81 50 180 45 180 45 185.81"/>
                <polygon id="arm_down_-_right" data-name="arm down - right" style={ skinStyle } points="120 180 120 185.81 120 191.28 120 197 125 197 125 191.28 125 185.81 125 180 120 180"/>
            </g>
        );
    }

    return (
        <g className="Buyer-arms">
            { arms }
        </g>
    );
});

export default Arms;
