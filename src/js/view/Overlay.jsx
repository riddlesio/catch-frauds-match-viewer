import React       from 'react';
import createView  from 'omniscient';

const Overlay = createView('Overlay', function (props) {

    const { status, isVisible, checkpoints } = props;
    const { percentage, normal, fairlyJailed, unfairlyJailed, thefts } = status;
    const isFinished = Math.ceil(percentage) === 100;
    let displayClass = 'u-hidden';
    let content;

    if (isFinished || isVisible) {
        displayClass = '';
    }

    if (isFinished) {

        const message = `Your score: Normal transactions passed: ${normal}. Discovered fraudulent ` +
            `transactions: ${fairlyJailed}. Normal transactions listed as fraudulent` +
            ` ${unfairlyJailed}. Fraudulous transactions slipped through your security: ${thefts}`;

        content = <p>{ message }</p>;
    } else {
        const text = checkpoints.map((cp) => (
            <p key={ cp.id } ><b>{ `Checkpoint ${cp.id}:`}</b> { cp.description }</p>
        ));

        content = (
            <div>
                <h2>Checkpoints and their descriptions</h2>
                { text }
            </div>
        );
    }

    return (
        <g className={ displayClass }>
            <rect x="10%" y="10%" className="AdyenGame-overlayBackground" />
            <foreignObject x="10%" y="10%" className="AdyenGame-overlayMessage">
                <div className="AdyenGame-overlayTextDiv">
                    { content }
                </div>
            </foreignObject>
        </g>
    );
});

export default Overlay;
