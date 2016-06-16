import React        from 'react';
import component    from 'omniscient';
import createEither from '@riddles/match-viewer/lib/view/logic/createEither';

const propTypes = {
    armsDown: React.PropTypes.bool.isRequired,
    style: React.PropTypes.object,
};

const Arms = createEither({
    Left: ArmsUp,
    Right: ArmsDown,
    isRight: (props) => props.armsDown,
});

function ArmsUp(props) {

    const { fill } = props;

    return (
        <g className="Buyer-arms">
            { /* Left arm */ }
            <polygon style={{ fill }} points="45 153.81 45 159.28 45 165 50 165 50 159.28 50 153.81 50 148 45 148 45 153.81"/>
            { /* Right arm */ }
            <polygon style={{ fill }} points="120 148 120 153.81 120 159.28 120 165 125 165 125 159.28 125 153.81 125 148 120 148"/>
        </g>
    );
}

function ArmsDown(props) {

    const { fill } = props;

    return (
        <g className="Buyer-arms">
            { /* Left arm */ }
            <polygon style={{ fill }}
                     points="45 185.81 45 191.28 45 197 50 197 50 191.28 50 185.81 50 180 45 180 45 185.81"/>
            { /* Right arm */ }
            <polygon style={{ fill }}
                     points="120 180 120 185.81 120 191.28 120 197 125 197 125 191.28 125 185.81 125 180 120 180"/>
        </g>
    );
}

Arms.propTypes = propTypes;

export default component('Arms', Arms);
