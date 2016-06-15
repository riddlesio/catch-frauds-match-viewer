import React        from 'react';
import createView   from 'omniscient';

const CheckpointDescription = createView('CheckpointDescription', function (props) {

    const { descriptionVisible, hideNotes, checkpoint } = props;

    const displayClass = descriptionVisible ? 'visible' : 'hidden';

    function getContent(checkpoint) {
        return (
            <div className="Notes-description">
                <h2>{ `Checkpoint ${checkpoint.id}` }</h2>
                <p>{ checkpoint.description }</p>
            </div>
        );
    }

    const maybeContent = descriptionVisible ? getContent(checkpoint) : null;

    return (
        <div className={ `AdyenGame-notesOverlay AdyenGame-notesOverlay--${displayClass}` }>
            <div className="Layer-content AdyenGame-notesOverlayContent Notes">
                <button
                    type="button"
                    className="Notes-closeButton"
                    onClick={ hideNotes }>
                    <i className="fa fa-times"></i>
                </button>
                { maybeContent }
            </div>
        </div>
    );
});

export default CheckpointDescription;
