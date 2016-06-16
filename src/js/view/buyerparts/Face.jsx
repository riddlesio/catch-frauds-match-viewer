import React        from 'react';
import component    from 'omniscient';

const propTypes = {
    faceExpression: React.PropTypes.number.isRequired,
    skinColor: React.PropTypes.string.isRequired,
    shirtColor: React.PropTypes.node.isRequired,
    isFraudulent: React.PropTypes.bool.isRequired,
    isBusted: React.PropTypes.bool.isRequired,
};

// 0: Mouth Smile // 1: Mouth Frown
const expressions = [
    <polygon
        className="FillWhite"
        points="74 145 74 150 79 150 79 155 99 155 99 150 104 150 104 145 74 145"
    />,
    <path
        className="FillWhite"
        d="M99,145v5H79v-5H99ZM74,155h5v-5H74v5Zm25-5v5h5v-5H99Z"
    />,
];

const Face = component('Face', function (props) {

    const { faceExpression, skinColor, shirtColor, isFraudulent, isBusted, sadFace } = props;
    const skinStyle = { fill: skinColor };
    const expressionNo = sadFace ? 1 : faceExpression;
    const eyesNo = isFraudulent ? 1 : 0;
    const bandanaColor = isBusted ? '#000000' : shirtColor;
    const bandanaStyle = { fill: bandanaColor };

    // 1: Normal eyes // 2: Bandana
    const eyes = [
        <g>
            <rect x="74" y="135" width="5" height="5"/>
            <rect x="99" y="135" width="5" height="5"/>
        </g>,
        <g>
            <path
                style={ bandanaStyle }
                d="M110,130v15H65V135H60v-5h50Zm-55-5v5h5v-5H55Zm0,15h5v-5H55v5Z"
            />
            <rect className="FillWhite" x="74" y="135" width="5" height="5"/>
            <rect className="FillWhite" x="99" y="135" width="5" height="5"/>
        </g>,
    ];

    return (
        <g className="Buyer-face">
            <polygon
                style={ skinStyle }
                points="65 125 65 135 60 135 60 145 65 145 65 165 65 170 95 170 95 165 110 165 110 125 65 125"
            />
            { eyes[eyesNo] }
            { expressions[expressionNo] }
        </g>
    );
});

Face.propTypes = propTypes;

export default Face;
