import React        from 'react';
import component    from 'omniscient';
import Legs         from './buyerparts/Legs.jsx';
import PurchaseItem from './buyerparts/PurchaseItem.jsx';
import TextBubble   from './buyerparts/TextBubble.jsx';
import Face         from './buyerparts/Face.jsx';
import Arms         from './buyerparts/Arms.jsx';
import Hair         from './buyerparts/Hair.jsx';
import Shirt        from './buyerparts/Shirt.jsx';
import getSkinColor from './util/getSkinColor';

const propTypes = {
    buyer: React.PropTypes.object.isRequired,
};

const lifeCycle = {

    componentWillReceiveProps(nextProps) {
        const { buyer, highlighted, showDetails } = nextProps;
        const { id, isApproved } = buyer;

        if (highlighted) {
            showDetails({ id, isApproved });
        }
    },
};

const Buyer = component('Buyer', lifeCycle, function (props) {

    const { buyer } = props;
    const {
        id,
        position,
        emotion,
        shirtColor,
        isBusted,
        faceExpression,
        transformation,
        bodyDirection,
        skinColor,
        isApproved,
        faceType,
        exception,
    } = buyer;
    let {
        purchaseItem,
        isFraudulent,
    } = buyer;

    const skin = getSkinColor(skinColor);
    const positionTransform = `translate(${transformation.X},${transformation.Y}) scale(0.9,0.9) `;
    const bodyDirectionScale = bodyDirection ? '' : 'scale(-1, 1)';
    const directionTransform = `${bodyDirectionScale} translate(-85,-220)`;
    const onClick = props.onClick.bind(null, { id, isApproved });
    const highlightClass = props.highlighted ? 'buyerHitBox--highlighted ' : 'buyerHitBox';

    let armsDown = isBusted;
    let sadFace;

    if (exception) {
        isFraudulent = false;
        purchaseItem = 0;
        armsDown = true;
        sadFace = true;
    }

    return (
        <g transform={ positionTransform } svgOrigin="50% 0" id={ id } className="Buyer">
            <g transform={ directionTransform } onClick={ onClick }>
                <rect id="hitbox" className={ highlightClass } y="50" width="170" height="170"/>
                <Hair faceType={ faceType } />
                <Shirt
                    shirtColor={ shirtColor }
                    isBusted={ isBusted }
                    armsDown={ armsDown }
                    isFraudulent={ isFraudulent }
                />
                <Legs position={ position } />
                <Arms armsDown={ armsDown } fill={ skin } />
                <Face
                    sadFace={ sadFace }
                    faceType={ faceType }
                    faceExpression={ faceExpression }
                    skinColor={ skin }
                    shirtColor={ shirtColor }
                    isFraudulent={ isFraudulent }
                    isBusted={ isBusted }
                />
                <PurchaseItem item={ purchaseItem } />
                <TextBubble emotion={ emotion } />
            </g>
        </g>
    );
});

Buyer.propTypes = propTypes;

export default Buyer;
