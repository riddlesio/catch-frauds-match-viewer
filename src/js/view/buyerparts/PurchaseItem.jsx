import React        from 'react';
import component    from 'omniscient';

const platform = (
    <g>
        <rect
            className="PurchaseItem-shadow"
            x="85"
            y="110"
            width="5"
            height="45"
            transform="translate(220 45) rotate(90)"
        />
        <rect
            className="PurchaseItem-platform"
            x="65"
            y="80"
            width="40"
            height="60"
            transform="translate(195 25) rotate(90)"
        />
    </g>
);

// 1: pants, 2: tv, 3: shirt, 4: boots
const items = [
    null,
    <g>
        <path className="Pants-blue" d="M70,98.3h4.08v7.62H70V98.3Zm25.91,0H91.84v7.62h4.08V98.3ZM70,110h8.16v-4.08H70V110Zm30-4.08H91.84V110H100v-4.08ZM95.92,98.3v-15H70v15H95.92Z"/>
        <rect x="80.47" y="72.85" width="5" height="25.91" transform="translate(168.77 2.84) rotate(90)"/>
        <rect className="Buckle-gold" x="80.47" y="83.3" width="5" height="5"/>
    </g>,
    <g>
        <path d="M60,70h50v40H60V70Zm19.25,0h5V65h-5v5Zm-5-5h5V60h-5v5Zm-5-5h5V55h-5v5Zm15,10h5V65h-5v5Zm5-5h5V60h-5v5Zm5-5h5V55h-5v5Zm-30-5h5V50h-5v5Z"/>
        <rect className="PurchaseItemTv-gray" x="65" y="75" width="40" height="30"/>
    </g>,
    <path className="PurchaseItemShirt-color" d="M107,85V95h-5V85h5ZM62,95h5V85H62V95ZM92,80v5H87v5H82V85H77V80H67v5h5v25H97V85h5V80H92Z"/>,
    <path className="PurchaseItemBoots-color" d="M70,80V95H65v5H60v10H75V100h5V80H70Zm10,0H75v25h5V80Zm-5,25H60v5H75v-5Zm30-5V95h-5V80H90v20h5v10h15V100h-5Zm-15,5h5V80H90v25Zm20,0H95v5h15v-5Z"/>,
];

const propTypes = {
    item: React.PropTypes.number.isRequired,
};

const PurchaseItem = component('PurchaseItem', function (props) {

    const itemNo = props.item;

    return (
        <g className="Buyer-purchaseItem">
            { itemNo > 0 ? platform : null }
            { items[itemNo] }
        </g>
    );
});

PurchaseItem.propTypes = propTypes;

export default PurchaseItem;
