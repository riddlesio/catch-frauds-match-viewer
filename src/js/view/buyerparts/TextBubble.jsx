import React        from 'react';
import component    from 'omniscient';

const emotion = [
    null,
    <path className="FillWhite" d="M100,9V19H95V9h5ZM75,9H70V19h5V9ZM70,24v5h5v5H95V29h5V24H70Z"/>,
    <path className="FillWhite" d="M67,4V35h36V4H67Zm5,26V9h5V30H72Zm10,0V9h6V30H82Zm16,0H93V9h5V30Z"/>,
    <polygon className="FillWhite" points="97 10 97 5 72 5 72 10 66 10 66 25 72 25 72 15 82 15 82 20 72 20 72 30.18 72 35 78 35 78 30 82 30 82 35 87 35 87 30 91 30 91 35 97 35 97 30.18 97 20 87 20 87 15 97 15 97 25 103 25 103 10 97 10"/>,
    <path className="FillWhite" d="M100,8V18H95V8h5ZM75,8H70V18h5V8ZM95,33h5V28H95v5ZM70,33h5V28H70v5Zm5-10v5H95V23H75Z"/>,
    <path className="FillWhite" transform="translate(55,0)" d="M22.5,32.5h-5v-5h5v5Zm5-10h-5v5h5v-5Zm5-5.14h-5v5h5v-5Zm5-4.86h-5v5h5v-5Zm5-5h-5v5h5v-5Zm-5,15h-5v5h5v-5Zm5,5h-5v5h5v-5Zm-15-15h-5v5h5v-5Zm-5-5h-5v5h5v-5Z"/>
];

const propTypes = {
    emotion: React.PropTypes.number.isRequired,
};

const TextBubble = component('TextBubble', function (props) {

    const emotionNo = props.emotion;

    let displayClass;

    if (emotionNo === 0) {
        displayClass = 'u-hidden';
    } else if (emotionNo > 0 && emotionNo < 3) {
        displayClass = 'TextBubble-background--green';
    } else {
        displayClass = 'TextBubble-background--red';
    }

    const className = `TextBubble-background ${displayClass}`;

    return (
        <g className="Buyer-textBubble">
            <polygon className={ className } points="110 5 110 0 60 0 60 5 55 5 55 35 60 35 60 40 77 40 77 45 82 45 82 50 87 50 87 45 92 45 92 40 110 40 110 35 115 35 115 5 110 5"/>
            { emotion[emotionNo] }
        </g>
    );
});

TextBubble.propTypes = propTypes;

export default TextBubble;
