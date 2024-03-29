import React        from 'react';
import component    from 'omniscient';

const hairTypes = [
    <polygon className="Hair-gold" points="116 148 116 118 104 118 104 113 99 113 99 108 79 108 79 113 60 113 60 118 55 118 55 148 50 148 50 165 55 165 55 170 110 170 110 165 120 165 120 148 116 148"/>,
    <polygon className="Hair-blond" points="116 148 116 118 104 118 104 113 99 113 99 108 79 108 79 113 60 113 60 118 55 118 55 148 50 148 50 165 55 165 55 170 110 170 110 165 120 165 120 148 116 148"/>,
    <polygon points="125 120 120 120 120 115 115 115 115 110 110 110 110 105 105 105 105 100 65 100 65 105 60 105 60 110 55 110 55 115 50 115 50 120 45 120 45 135 50 135 50 148 56 148 56 155 114 155 114 148 120 148 120 135 125 135 125 120"/>,
    <polygon points="110 120 65 120 60 120 60 125 60 135 65 135 65 125 110 125 110 120"/>,
    <polygon className="cls-3" points="99 115 99 110 79 110 79 115 65 115 65 120 60 120 60 125 60 135 65 135 65 125 110 125 110 122.33 110 120 110 115 99 115"/>,
];

const propTypes = {
    faceType: React.PropTypes.number.isRequired,
};

const Hair = component('Hair', function (props) {

    return hairTypes[props.faceType];
});

Hair.propTypes = propTypes;

export default Hair;
