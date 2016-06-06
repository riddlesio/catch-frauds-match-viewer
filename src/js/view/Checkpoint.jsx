import React       from 'react';
import component   from 'omniscient';
import getSkinColor from './util/getSkinColor';

const lifeCycle = {
    getInitialState() {
        return { showInfo: false };
    },

    toggleInfo() {
        this.setState({ showInfo: !this.showInfo });
    },
};

const Checkpoint = component('Checkpoint', lifeCycle, function (props) {

    const { id, description, expression, position, skinColor } = props.checkpoint;
    const { showInfo } = this.state;
    const translate = `translate(100,75)`;
    const skinHex = getSkinColor(skinColor);
    const skinStyle = { fill: skinHex };

    const clickInfo = (
        <g className="Guard-info">
            <text className="Guard-info-description">{ description }</text>
        </g>
    );

    const textBubble = (
        <g>
            <polygon id="text_bubble_-_background" data-name="text bubble - background" className="Guard-6" points="111.5 5 111.5 0 61.5 0 61.5 5 56.5 5 56.5 35 61.5 35 61.5 40 78.5 40 78.5 45 83.5 45 83.5 50 88.5 50 88.5 45 93.5 45 93.5 40 111.5 40 111.5 35 116.5 35 116.5 5 111.5 5"/>
            <text className="Guard-7" transform="translate(83.83 31.25)">!</text>
        </g>
    );

    const hair = [
        <polygon id="hair_-_black_man" data-name="hair - black man" points="107.5 65 62.5 65 57.5 65 57.5 70 57.5 80 62.5 80 62.5 70 107.5 70 107.5 65"/>,
        <polygon id="hair_-_white_man" data-name="hair - white man" className="Guard-2" points="96.5 60 96.5 55 76.5 55 76.5 60 62.5 60 62.5 65 57.5 65 57.5 70 57.5 80 62.5 80 62.5 70 107.5 70 107.5 67.33 107.5 65 107.5 60 96.5 60"/>,
    ];

    return (
        <g key={ id } transform={ translate } className="AdyenGame-guardPost" onClick={ this.toggleInfo }>
            <g className="GuardTile" transform="translate(52,150)">
                <rect id="platofrm" className="GuardTile-1" x="10.24" y="-10.21" width="39.59" height="60" transform="translate(49.82 -10.24) rotate(90)"/>
                <rect id="shadow" className="GuardTile-2" x="27.32" y="12.29" width="5.41" height="60" transform="translate(72.32 12.26) rotate(90)"/>
                <text className="GuardTile-3" transform="translate(22.61 30.42)">{ id }</text>
            </g>
            <g className="Guard">
                <rect id="hitbox" className="Guard-1" width="165" height="165"/>
                { hair[skinColor === 1 ? 0 : 1] }
                <path id="shirt_-_arms_down" data-name="shirt - arms down" d="M117.5,120v5h-5v-5h5Zm-70,0v5h5v-5h-5Zm10-5h-5v5h5v22h50V120h5v-5h-55Z"/>
                <polygon id="pants" points="57.5 142 57.5 147.74 57.5 165 63.5 165 63.5 148 102.5 148 102.5 165 107.5 165 107.5 147.74 107.5 142 57.5 142"/>
                <rect id="pants_-_button" data-name="pants - button" className="Guard-3" x="84.78" y="142" width="6" height="6" transform="translate(175.56 290) rotate(-180)"/>
                <path id="arms" style={ skinStyle } d="M42.5,125h5v17h-5V125Zm75,0v17h5V125h-5Z"/>
                <polygon id="face" style={ skinStyle } points="62.5 70 62.5 80 57.5 80 57.5 90 62.5 90 62.5 110 62.5 115 92.5 115 92.5 110 107.5 110 107.5 70 62.5 70"/>
                <rect id="eye_-_left" data-name="eye - left" x="71.5" y="80" width="5" height="5"/>
                <rect id="eye_-_right" data-name="eye - right" x="96.5" y="80" width="5" height="5"/>
                <path id="mouth" className="Guard-5" d="M101.5,95v5h-30V95h30Z"/>
                <polygon id="hat" points="112.5 65 112.5 45 57.5 45 57.5 65 57.5 70 117.5 70 117.5 65 112.5 65"/>
                <polygon id="hat_-_badge" data-name="hat - badge" className="Guard-3" points="96.5 55 81.5 55 81.5 60 86.5 60 86.5 65 91.5 65 91.5 60 96.5 60 96.5 55"/>
                { expression > 0 ? textBubble : null }
                { showInfo ? clickInfo : null }
            </g>
        </g>
    );
});

export default Checkpoint;
