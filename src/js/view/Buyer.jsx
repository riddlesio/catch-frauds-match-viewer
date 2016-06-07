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
import getRouteLength from './util/getRouteLength';

// component.debug();

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
        faceType,
        isApproved,
    } = props.buyer;

    const skin = getSkinColor(skinColor);
    const positionTransform = `translate(${transformation.X},${transformation.Y})`;
    const bodyDirectionScale = bodyDirection ? '' : 'scale(-1, 1)';
    const directionTransform = `${bodyDirectionScale} translate(-85,-220)`

    return (
        <g transform={ positionTransform } svgOrigin="50% 0" id={ id } className="Buyer">
            <g transform={ directionTransform }>
                <rect id="hitbox" className="cls-1" y="50" width="170" height="170"/>
                <Hair faceType={ faceType } />
                <Shirt
                    shirtColor={ shirtColor }
                    isBusted={ isBusted }
                    isFraudulent={ isFraudulent }
                />
                <Legs position={ position } />
                <Arms isBusted={ isBusted } skinColor={ skin } />
                <Face
                    faceType={ faceType }
                    faceExpression={ faceExpression }
                    skinColor={ skin }
                    isFraudulent={ isFraudulent }
                    isBusted={ isBusted }
                />
                <PurchaseItem item={ purchaseItem } />
                <TextBubble emotion={ emotion } />
            </g>
        </g>
    );
});

export default Buyer;
