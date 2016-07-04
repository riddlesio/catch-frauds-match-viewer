import React        from 'react';
import component    from 'omniscient';

const prisonShirt = (
    <g id="shirt_-_prison" data-name="shirt - prison">
        <path d="M120,175v5h-5v-5h5Zm-70,0v5h5v-5H50Zm10-5H55v5h5v22h50V175h5v-5H60Z"/>
        <rect className="FillWhite" x="60" y="175" width="50" height="5"/>
        <rect className="FillWhite" x="60" y="186" width="50" height="5"/>
    </g>
);

const skull = (
    <polygon
        className="FillWhite"
        points="94 177 94 173 77 173 77 177 73 177 73 187 77 187 77 180 83 180 83 183 77 183 77 190.38 77 194 81 194 81 190 83 190 83 194 87 194 87 190 90 190 90 194 94 194 94 190.38 94 183 87 183 87 180 94 180 94 187 98 187 98 177 94 177"
    />
);

const propTypes = {
    shirtColor: React.PropTypes.node.isRequired,
    isFraudulent: React.PropTypes.bool.isRequired,
    isBusted: React.PropTypes.bool.isRequired,
};

const Shirt = component('Shirt', function (props) {

    const { shirtColor, isBusted, isFraudulent, armsDown } = props;

    let shirt;

    if (!isBusted) {

        const style = { fill: shirtColor };

        if (armsDown) {
            shirt = (
                <path
                    style={{ fill: '#FF5552' }}
                    d="M120,175v5h-5v-5h5Zm-70,0v5h5v-5H50Zm10-5H55v5h5v22h50V175h5v-5H60Z"
                />
            );
        } else {
            shirt = (
                <path
                    style={ style }
                    d="M120,165v5h-5v-5h5Zm-70,0v5h5v-5H50Zm9.67,5H55v5h5v22h50V175h5v-5H59.67Z"
                />
            );
        }
    } else {
        shirt = prisonShirt;
    }

    return (
        <g className="Buyer-shirt">
            { shirt }
            { !isBusted && isFraudulent ? skull : null}
        </g>
    );
});

Shirt.propTypes = propTypes;

export default Shirt;
