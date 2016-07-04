import React        from 'react';
import component    from 'omniscient';
import isEven       from '../util/isEven';

const legPaths = [
    'M105,203H60v-6h50v6h-5Zm0,0v4h7v-4h-7Zm2,4v4h7v-4h-7Zm2,4v4h7v-4h-7Zm2,4v5h7v-5h-7ZM60,203v17h6V203H60Z',
    'M105,203H60v-6h50v6h-5Zm-2,0v4h7v-4h-7Zm-3,4v4h7v-4h-7Zm-3,4v4h7v-4H97Zm-3,4v5h7v-5H94ZM60,203v4h7v-4H60Zm3,4v4h7v-4H63Zm3,4v4h7v-4H66Zm3,4v5h7v-5H69Z',

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
