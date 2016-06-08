import React        from 'react';
import component    from 'omniscient';

const TextBubble = component('TextBubble', function (props) {

    const emotionNo = props.emotion;

    const emotion = [
        null,
        <path className="cls-5" d="M100,9V19H95V9h5ZM75,9H70V19h5V9ZM70,24v5h5v5H95V29h5V24H70Z"/>,
        <path className="cls-5" d="M67,4V35h36V4H67Zm5,26V9h5V30H72Zm10,0V9h6V30H82Zm16,0H93V9h5V30Z"/>,
        <polygon className="cls-5" points="97 10 97 5 72 5 72 10 66 10 66 25 72 25 72 15 82 15 82 20 72 20 72 30.18 72 35 78 35 78 30 82 30 82 35 87 35 87 30 91 30 91 35 97 35 97 30.18 97 20 87 20 87 15 97 15 97 25 103 25 103 10 97 10"/>,
        <path className="cls-5" d="M100,8V18H95V8h5ZM75,8H70V18h5V8ZM95,33h5V28H95v5ZM70,33h5V28H70v5Zm5-10v5H95V23H75Z"/>,
    ];

    const background = emotionNo === 0
        ? null
        : <polygon className="cls-12" points="110 5 110 0 60 0 60 5 55 5 55 35 60 35 60 40 77 40 77 45 82 45 82 50 87 50 87 45 92 45 92 40 110 40 110 35 115 35 115 5 110 5"/>;

    return (
        <g className="Buyer-textBubble">
            { background }
            { emotion[emotionNo] }
        </g>
    );
});

export default TextBubble;
