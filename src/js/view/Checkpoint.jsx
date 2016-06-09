import React        from 'react';
import component    from 'omniscient';
import getSkinColor from './util/getSkinColor';

// 1: black, 2: white
const hair = [
    <polygon points="107.5 65 62.5 65 57.5 65 57.5 70 57.5 80 62.5 80 62.5 70 107.5 70 107.5 65"/>,
    <polygon className="Guard-2" points="96.5 60 96.5 55 76.5 55 76.5 60 62.5 60 62.5 65 57.5 65 57.5 70 57.5 80 62.5 80 62.5 70 107.5 70 107.5 67.33 107.5 65 107.5 60 96.5 60"/>,
];

const textBubble = (
    <g>
        <polygon className="Guard-textBubble" points="111.5 5 111.5 0 61.5 0 61.5 5 56.5 5 56.5 35 61.5 35 61.5 40 78.5 40 78.5 45 83.5 45 83.5 50 88.5 50 88.5 45 93.5 45 93.5 40 111.5 40 111.5 35 116.5 35 116.5 5 111.5 5"/>
        <text className="Guard-textBubble-exclamation" transform="translate(83.83 31.25)">!</text>
    </g>
);

const Checkpoint = component('Checkpoint', function (props) {

    const { id, expression, transformation, skinColor, bodyDirection } = props.checkpoint;
    const translate = `translate(${transformation.X},${transformation.Y})`;
    const skinHex = getSkinColor(skinColor);
    const skinStyle = { fill: skinHex };
    const bodyDirectionScale = bodyDirection ? '' : 'scale(-1, 1)';
    const directionTransform = bodyDirectionScale.length > 0 ? `${bodyDirectionScale} translate(-165,0)` : '';
    const tileTextX = id > 9 ? -10 : 0;

    return (
        <g transform={ translate }>
            <g key={ id } transform="translate(-82.5,-220)" className="AdyenGame-guardPost">
                <g className="GuardTile" transform="translate(48,150)">
                    { /* Tile platform */ }
                    <rect className="GuardTile-1" x="15.24" y="-15.21" width="39.59" height="70" transform="translate(54.82 -15.24) rotate(90)"/>
                    { /* Tile shadow */ }
                    <rect className="GuardTile-2" x="32.32" y="7.29" width="5.41" height="70" transform="translate(77.32 7.26) rotate(90)"/>
                    <text className="GuardTile-3" transform="translate(25.61 30.42)" x={ tileTextX }>{ id }</text>
                </g>
                <g className="Guard" transform={ directionTransform }>
                    { /* Hitbox */ }
                    <rect className="Guard-1" width="165" height="165"/>
                    { hair[skinColor === 1 ? 0 : 1] }
                    { /* Shirt */ }
                    <path d="M117.5,120v5h-5v-5h5Zm-70,0v5h5v-5h-5Zm10-5h-5v5h5v22h50V120h5v-5h-55Z"/>
                    { /* Pants */ }
                    <polygon points="57.5 142 57.5 147.74 57.5 165 63.5 165 63.5 148 102.5 148 102.5 165 107.5 165 107.5 147.74 107.5 142 57.5 142"/>
                    <rect className="Guard-3" x="84.78" y="142" width="6" height="6" transform="translate(175.56 290) rotate(-180)"/>
                    { /* Arms */ }
                    <path style={ skinStyle } d="M42.5,125h5v17h-5V125Zm75,0v17h5V125h-5Z"/>
                    { /* Face */ }
                    <polygon style={ skinStyle } points="62.5 70 62.5 80 57.5 80 57.5 90 62.5 90 62.5 110 62.5 115 92.5 115 92.5 110 107.5 110 107.5 70 62.5 70"/>
                    <rect x="71.5" y="80" width="5" height="5"/>
                    <rect x="96.5" y="80" width="5" height="5"/>
                    <path className="Guard-5" d="M101.5,95v5h-30V95h30Z"/>
                    { /* Hat */ }
                    <polygon points="112.5 65 112.5 45 57.5 45 57.5 65 57.5 70 117.5 70 117.5 65 112.5 65"/>
                    <polygon className="Guard-3" points="96.5 55 81.5 55 81.5 60 86.5 60 86.5 65 91.5 65 91.5 60 96.5 60 96.5 55"/>
                    { expression > 0 ? textBubble : null }
                </g>
            </g>
        </g>
    );
});

export default Checkpoint;
