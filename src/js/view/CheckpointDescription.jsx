import React        from 'react';
import createView   from 'omniscient';

const CheckpointDescription = createView('CheckpointDescription', function (props) {

    const { descriptionVisible, hideNotes, checkpoint } = props;

    const displayClass = descriptionVisible ? 'visible' : 'hidden';

    function getContent(checkpoint) {
        return (
            <div>
                <h2 className="Notes-description">{ `Checkpoint ${checkpoint.id}` }</h2>
                <p className="Notes-description">{ checkpoint.description }</p>
            </div>
        );
    }

    const maybeContent = notesVisible ? getContent(checkpoint) : null;

    return (
        <div className={ `AdyenGame-notesOverlay AdyenGame-notesOverlay--${displayClass}` }>
            <div className="Layer-content AdyenGame-notesOverlayContent Notes">
                <button onClick={ hideNotes }>close</button>
                { maybeContent }
            </div>
        </div>
    );
});

export default CheckpointDescription;