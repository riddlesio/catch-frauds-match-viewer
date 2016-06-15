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

    const skin = getSkinColor(skinColor);
    const positionTransform = `translate(${transformation.X},${transformation.Y}) scale(0.9,0.9) `;
    const bodyDirectionScale = bodyDirection ? '' : 'scale(-1, 1)';
    const directionTransform = `${bodyDirectionScale} translate(-85,-220)`;
    const onClick = props.onClick.bind(null, { id, isApproved });
    const highlightClass = props.highlighted ? 'buyerHitBox--highlighted ' : 'buyerHitBox';

    if (exception) return (
        <g transform={ positionTransform } svgOrigin="50% 0" id={ id } className="Buyer">
            <g transform={ directionTransform }>
                <polygon className="ErrorBuyer" points="110 120 65 120 60 120 60 125 60 135 65 135 65 125 110 125 110 120"/>
                <path className="ErrorBuyer" d="M120,175v5h-5v-5h5Zm-70,0v5h5v-5H50Zm10-5H55v5h5v22h50V175h5v-5H60Z"/>
                <Legs position={ position } className="ErrorBuyer" />
                <g>
                    <polygon className="ErrorBuyer" points="45 185.81 45 191.28 45 197 50 197 50 191.28 50 185.81 50 180 45 180 45 185.81"/>
                    <polygon className="ErrorBuyer" points="120 180 120 185.81 120 191.28 120 197 125 197 125 191.28 125 185.81 125 180 120 180"/>
                </g>
                <polygon className="ErrorBuyer" points="65 125 65 135 60 135 60 145 65 145 65 165 65 170 95 170 95 165 110 165 110 125 65 125" />
                <path className="theft-2" transform="translate(57,124)" d="M22.5,32.5h-5v-5h5v5Zm5-10h-5v5h5v-5Zm5-5.14h-5v5h5v-5Zm5-4.86h-5v5h5v-5Zm5-5h-5v5h5v-5Zm-5,15h-5v5h5v-5Zm5,5h-5v5h5v-5Zm-15-15h-5v5h5v-5Zm-5-5h-5v5h5v-5Z" />
            </g>
        </g>
    );

    // <g transform="translate(0,-30)">
    //     <polygon className="theft-1" points="55 5 55 0 5 0 5 5 0 5 0 35 5 35 5 40 55 40 55 35 60 35 60 5 55 5" />
    //     <path className="theft-2" d="M22.5,32.5h-5v-5h5v5Zm5-10h-5v5h5v-5Zm5-5.14h-5v5h5v-5Zm5-4.86h-5v5h5v-5Zm5-5h-5v5h5v-5Zm-5,15h-5v5h5v-5Zm5,5h-5v5h5v-5Zm-15-15h-5v5h5v-5Zm-5-5h-5v5h5v-5Z" />
    // </g>

    return (
        <g transform={ positionTransform } svgOrigin="50% 0" id={ id } className="Buyer">
            <g transform={ directionTransform } onClick={ onClick }>
                <rect id="hitbox" className={ highlightClass } y="50" width="170" height="170"/>
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
