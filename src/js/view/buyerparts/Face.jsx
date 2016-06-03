import React        from 'react';
import component    from 'omniscient';

const Face = component('Face', function (props) {

    const { faceExpression, skinColor, isFraudulent, isBusted } = props;
    const skinStyle = { fill: skinColor };
    const expressionNo = faceExpression;
    const eyesNo = isFraudulent ? 1 : 0;
    const bandanaColor = isBusted ? '#000000' : '#8836e8';
    const bandanaStyle = { fill: bandanaColor };

    const expressions = [
        <polygon id="mouth_-_smile" dataName="mouth - smile" className="cls-5" points="74 145 74 150 79 150 79 155 99 155 99 150 104 150 104 145 74 145"/>,
        <path id="mouth_-_frown" dataName="mouth - frown" className="cls-5" d="M99,145v5H79v-5H99ZM74,155h5v-5H74v5Zm25-5v5h5v-5H99Z"/>,
    ];
    const eyes = [
        <g>
            <rect id="eye_-_left" dataName="eye - left" x="74" y="135" width="5" height="5"/>
            <rect id="eye_-_right" dataName="eye - right" x="99" y="135" width="5" height="5"/>
        </g>,
        <g id="eyes_-_bandana" dataName="eyes - bandana">
            <path id="eyes_-_bandana-2" dataName="eyes - bandana" style={ bandanaStyle } d="M110,130v15H65V135H60v-5h50Zm-55-5v5h5v-5H55Zm0,15h5v-5H55v5Z"/>
            <rect id="bandana_eye_-_left" dataName="bandana eye - left" className="cls-5" x="74" y="135" width="5" height="5"/>
            <rect id="bandana_eye_-_right" dataName="bandana eye - right" className="cls-5" x="99" y="135" width="5" height="5"/>
        </g>,
    ];

    return (
        <g className="Buyer-face">
            <polygon id="face" style={ skinStyle } points="65 125 65 135 60 135 60 145 65 145 65 165 65 170 95 170 95 165 110 165 110 125 65 125"/>
            { eyes[eyesNo] }
            { expressions[expressionNo] }
        </g>
    );
});

export default Face;
