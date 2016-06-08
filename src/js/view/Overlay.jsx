import React       from 'react';
import createView  from 'omniscient';

const Overlay = createView('Overlay', function (props) {

    const { status, isVisible, checkpoints, closeOverlay } = props;
    const { percentage, normal, fairlyJailed, unfairlyJailed, thefts } = status;
    const isFinished = Math.ceil(percentage) === 100;
    let displayClass = 'Layer u-hidden';
    let content;

    if (isFinished || isVisible) {
        displayClass = 'Layer';
    }

    if (isFinished) {

        const message = `
            Your score:
            Normal transactions passed: ${normal}.
            Discovered fraudulent transactions: ${fairlyJailed}.
            Normal transactions listed as fraudulent ${unfairlyJailed}.
            Fraudulous transactions slipped through your security: ${thefts}`;

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

    const closeButton = isFinished ? null : (
        <button onClick={ closeOverlay } type="button" className="Button GamePlayer-button">
            <span>Close </span><i className="fa fa-times" />
        </button>
    );

    return (
        <div className={ displayClass }>
            <div className="Layer-content AdyenGame-overlay">
                <div className="AdyenGame-overlayContent Overlay">
                    { closeButton }
                    { content }
                </div>
            </div>
        </div>
    );
});

export default Overlay;
