import React        from 'react';
import component    from 'omniscient';
import Legs         from './buyerparts/Legs.jsx';
import PurchaseItem from './buyerparts/PurchaseItem.jsx';
import TextBubble   from './buyerparts/TextBubble.jsx';
import Face         from './buyerparts/Face.jsx';
import Arms         from './buyerparts/Arms.jsx';
import Hair         from './buyerparts/Hair.jsx';
import Shirt        from './buyerparts/Shirt.jsx';

component.debug();

const Buyer = component('Buyer', function (props) {

    const {
        id,
        position,
        emotion,
        shirtColor,
        isBusted,
        faceExpression,
        skinColor,
        purchaseItem,
        isFraudulent,
        faceType,
        isApproved,
    } = props.buyer;
    const {
        routeSteps,
    } = props.settings;

    const skinsColors = ['#ffd9c0', '#C18473', '#87594e'];
    const skin = skinsColors[skinColor];

    const routeLength = (1920 - 170) + (600 - 300) + (1770 - 170) + (890 - 600) + (1770 - 1);
    const stepSize = routeLength / routeSteps;
    const currentStep = position * stepSize;
    const transformation = calculatePositionInfo(currentStep);
    const positionTransform = `translate(${transformation.X},${transformation.Y})`;
    const bodyDirectionScale = transformation.bodyDirection ? '' : 'scale(-1, 1)';
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

function calculatePositionInfo(currentStep) {

    const firstCornerX = 170;
    const firstCornerY = 300;
    const secondCornerX = 170;
    const secondCornerY = 600;
    const thirdCornerX = 1770;
    const thirdCornerY = 600;
    const fourthCornerX = 1770;
    const fourthCornerY = 890;

    let X = 1920 - currentStep;
    let Y = 300;
    let leftOver;

    if (X >= firstCornerX) {
        return { X, Y, bodyDirection: 0 };
    }

    leftOver = firstCornerX - X;
    X = firstCornerX;
    Y = firstCornerY + leftOver;

    if (Y <= secondCornerY) {
        return { X, Y, bodyDirection: 1 };
    }

    leftOver = Y - secondCornerY;
    X = secondCornerX + leftOver;
    Y = secondCornerY;

    if (X <= thirdCornerX) {
        return { X, Y, bodyDirection: 1 };
    }

    leftOver = X - thirdCornerX;
    X = thirdCornerX;
    Y = thirdCornerY + leftOver;

    if (Y <= fourthCornerY) {
        return { X, Y, bodyDirection: 0 };
    }

    leftOver = Y - fourthCornerY;
    X = fourthCornerX - leftOver;
    Y = fourthCornerY;

    return { X, Y, bodyDirection: 0 };
};

export default Buyer;
