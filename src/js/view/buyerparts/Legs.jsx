import React        from 'react';
import component    from 'omniscient';

const Legs = component('Legs', function (props) {

    const position = props.position;
    const even = isEven(position);
    console.log(position);

    let legs;

    if (even) {
        legs = <polygon id="legs_-_staafjes_-_crossed" data-name="legs - staafjes - crossed" className="cls-6" points="60 197 60 203 60.01 203 67.97 220.02 73.4 217.47 66.63 203 103.37 203 96.6 217.47 102.03 220.02 109.99 203 110 203 110 197 60 197"/>;
    } else {
        legs = <polygon id="legs_-_staafjes_-_forward" data-name="legs - staafjes - forward" className="cls-6" points="119.58 217.47 110 197 110 197 60 197 60 199 60 203 60 220 66 220 66 217.95 66 203 104.44 203 106.18 203 114.14 220.02 119.58 217.47"/>;
    }

    return (
        <g className="Buyer-legs">
            { legs }
        </g>
    );
});

function isEven(n) {
    return n % 2 === 0;
}

// function calculateLegPositions(position) {
//
//     let legs = 1;
//
//     if ((position / 4) % 1 === 0) {
//         legs = 0;
//     }
//
//     if (((position + 2) / 4) % 1 === 0) {
//         legs = 2;
//     }
//
//     return legs;
// }

export default Legs;
