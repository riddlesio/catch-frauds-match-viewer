import React        from 'react';
import component    from 'omniscient';
import isEven       from '../util/isEven';

const legPositions = [
    <polygon className="Pants-blue" points="60 197 60 203 60.01 203 67.97 220.02 73.4 217.47 66.63 203 103.37 203 96.6 217.47 102.03 220.02 109.99 203 110 203 110 197 60 197" />,
    <polygon className="Pants-blue" points="119.58 217.47 110 197 110 197 60 197 60 199 60 203 60 220 66 220 66 217.95 66 203 104.44 203 106.18 203 114.14 220.02 119.58 217.47" />,
];

const propTypes = {
    position: React.PropTypes.number.isRequired,
};

const Legs = component('Legs', function (props) {

    const legs = isEven(props.position) ? legPositions[0] : legPositions [1];

    return (
        <g className="Buyer-legs">
            { legs }
        </g>
    );
});

Legs.propTypes = propTypes;

export default Legs;
