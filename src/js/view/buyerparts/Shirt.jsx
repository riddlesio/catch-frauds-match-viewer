import React        from 'react';
import component    from 'omniscient';

const Shirt = component('Shirt', function (props) {

    const { shirtColor, isBusted, isFraudulent } = props;

    let shirt;

    if (isBusted) {
        shirt = (
            <g id="shirt_-_prison" data-name="shirt - prison">
                <path id="shirt_-_prison_-_black" data-name="shirt - prison - black" d="M120,175v5h-5v-5h5Zm-70,0v5h5v-5H50Zm10-5H55v5h5v22h50V175h5v-5H60Z"/>
                <rect id="shirt_-_prison_-_stripe" data-name="shirt - prison - stripe" className="cls-5" x="60" y="175" width="50" height="5"/>
                <rect id="shirt_-_prison_-_stripe-2" data-name="shirt - prison - stripe" className="cls-5" x="60" y="186" width="50" height="5"/>
            </g>
        );
    } else {
        const color = getColorForPercentage(shirtColor);
        console.log(color);
        const shirtColorStyle = shirtColor <= 0 ? '#8836e8' : color;
        const style = { fill: shirtColorStyle };

        shirt = (
            <path id="shirt_-_arms_up" dataName="shirt - arms up" style={ style } d="M120,165v5h-5v-5h5Zm-70,0v5h5v-5H50Zm9.67,5H55v5h5v22h50V175h5v-5H59.67Z"/>
        );
    }

    const skull = (
        <polygon id="shirt_-skull" dataName="shirt -skull" className="cls-5" points="94 177 94 173 77 173 77 177 73 177 73 187 77 187 77 180 83 180 83 183 77 183 77 190.38 77 194 81 194 81 190 83 190 83 194 87 194 87 190 90 190 90 194 94 194 94 190.38 94 183 87 183 87 180 94 180 94 187 98 187 98 177 94 177"/>
    );

    return (
        <g className="Buyer-shirt">
            { shirt }
            { !isBusted && isFraudulent ? skull : null}
        </g>
    );
});

function getColorForPercentage(pct) {

    const percentColors = [
        { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
        { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
        { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } },
    ];

    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }

    const lower = percentColors[i - 1];
    const upper = percentColors[i];
    const range = upper.pct - lower.pct;
    const rangePct = (pct - lower.pct) / range;
    const pctLower = 1 - rangePct;
    const pctUpper = rangePct;
    const color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };

    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
}

export default Shirt;
