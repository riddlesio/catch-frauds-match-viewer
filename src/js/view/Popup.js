import React       from 'react';
import createView  from 'omniscient';

const Popup = createView('Popup', function (props) {

    const { text, onClick } = props.text;

    return (
        <g onClick={ onClick }>
            <rect x="10%" y="10%" className="AdyenGame-overlayBackground"/>
            <text x="50%" y="50%" className="AdyenGame-overlayMessage">{ text }</text>
        </g>
    );
});

export default Popup;
