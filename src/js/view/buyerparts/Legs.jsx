import React        from 'react';
import component    from 'omniscient';
import isEven       from '../util/isEven';

const legPaths = [
    'M105,203H60v-6h50v6h-5Zm2,0v4h5v-4h-5Zm2,4v4h5v-4h-5Zm2,4v4h5v-4h-5Zm2,4v5h5v-5h-5ZM60,203v17h5V203H60Z',
    'M105,203H60v-6h50v6h-5Zm0,0v4h5v-4h-5Zm-3,4v4h5v-4h-5Zm-3,4v4h5v-4H99Zm-3,4v5h5v-5H96ZM60,203v4h5v-4H60Zm3,4v4h5v-4H63Zm3,4v4h5v-4H66Zm3,4v5h5v-5H69Z'
];

const getLegs = (index, className) => (
    <path className={ className } d={ legPaths[index] } />
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
