import React        from 'react';
import component    from 'omniscient';
import isEven       from '../util/isEven';

const legPositions = [
    '60 197 60 203 60.01 203 67.97 220.02 73.4 217.47 66.63 203 103.37 203 96.6 217.47 102.03 220.02 109.99 203 110 203 110 197 60 197',
    '119.58 217.47 110 197 110 197 60 197 60 199 60 203 60 220 66 220 66 217.95 66 203 104.44 203 106.18 203 114.14 220.02 119.58 217.47',
];

const getLegs = (index, className) => (
    <polygon className={ className } points={ legPositions[index] } />
);

const propTypes = {
    position: React.PropTypes.number.isRequired,
};

const Legs = component('Legs', function (props) {

    const className = props.className ? props.className : 'Pants-blue';
    const legs = isEven(props.position) ? getLegs(0, className) : getLegs(1, className);

    return (
        <g className="Buyer-legs">
            { legs }
        </g>
    );
});

Legs.propTypes = propTypes;

export default Legs;
