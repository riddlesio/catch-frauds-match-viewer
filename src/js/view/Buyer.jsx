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

const Buyer = component('Buyer', function (props) {

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
        purchaseItem,
        isFraudulent,
        isApproved,
        faceType,
        exception,
    } = props.buyer;

    if (exception) return null;

    const skin = getSkinColor(skinColor);
    const positionTransform = `translate(${transformation.X},${transformation.Y})`;
    const bodyDirectionScale = bodyDirection ? '' : 'scale(-1, 1)';
    const directionTransform = `${bodyDirectionScale} translate(-5,-220)`;
    const onClick = props.onClick.bind(null, { id, isApproved });

    return (
        <g transform={ positionTransform } svgOrigin="50% 0" id={ id } className="Buyer">
            <g transform={ directionTransform } onClick={ onClick }>
                <rect id="hitbox" className="cls-1" y="50" width="170" height="170"/>
                <Hair faceType={ faceType } />
                <Shirt
                    shirtColor={ shirtColor }
                    isBusted={ isBusted }
                    isFraudulent={ isFraudulent }
                />
                <Legs position={ position } />
                <Arms isBusted={ isBusted } fill={ skin } />
                <Face
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
