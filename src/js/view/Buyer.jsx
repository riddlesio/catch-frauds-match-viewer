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
        skinColor,
        purchaseItem,
        isFraudulent,
        faceType,
        isApproved,
    } = props.buyer;
    const {
        routeSteps,
        path
    } = props.settings;

    const skin = getSkinColor(skinColor);
    const routeLength = getRouteLength();

    const stepSize = routeLength / routeSteps;
    const currentStep = position * stepSize;
    const transformation = calculatePositionInfo(currentStep, path);
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

function calculatePositionInfo(currentStep, path) {

    const firstCornerX = path[1].X;
    const firstCornerY = path[1].Y;
    const secondCornerX = path[2].X;
    const secondCornerY = path[2].Y;
    const thirdCornerX = path[3].X;
    const thirdCornerY = path[3].Y;
    const fourthCornerX = path[4].X;
    const fourthCornerY = path[4].Y;

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
