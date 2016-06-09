import React       from 'react';
import component   from 'omniscient';

const Status = component('Status', function () {

    return (
        <g className="AdyenGame-counter" transform={ `translate(200,680)` }>
            <rect className="Counter-1" x="65" y="40.3"  width="50" height="180" transform="translate(220.3 40.3) rotate(90)"/>
            <polygon className="Counter-2" points="76.97 115 76.97 120 96.97 120 96.97 140 81.97 140 81.97 130 93.97 130 93.97 125 81.74 125 77.21 125 76.97 125 76.97 145 81.74 145 101.97 145 101.97 140.46 101.97 120.01 101.97 115 76.97 115"/>
            <rect className="Counter-3" x="74.85" y="0.15" width="30.3" height="180" transform="translate(180.15 0.15) rotate(90)"/>
            <path className="Counter-4" d="M125,70v5h-5V70h5ZM55,70v5h5V70H55Zm10-5H60v5h5v5h50V70h5V65H65Z"/>
            <polygon className="Counter-5" points="49.97 80.81 49.97 86.28 49.97 92 54.97 92 54.97 86.28 54.97 80.81 54.97 75 49.97 75 49.97 80.81"/>
            <polygon className="Counter-5" points="124.97 75 124.97 80.81 124.97 86.28 124.97 92 129.97 92 129.97 86.28 129.97 80.81 129.97 75 124.97 75"/>
            <polygon className="Counter-5" points="69.97 20 69.97 30 64.97 30 64.97 40 69.97 40 69.97 60 69.97 65 99.97 65 99.97 60 114.97 60 114.97 20 69.97 20"/>
            <rect x="78.97" y="30" width="5" height="5"/>
            <rect x="103.97" y="30" width="5" height="5"/>
            <polygon className="Counter-2" points="78.97 40 78.97 45 83.97 45 83.97 50 103.97 50 103.97 45 108.97 45 108.97 40 78.97 40"/>
            <polygon className="Counter-6" points="109.97 0 109.97 5 103.97 5 83.97 5 83.97 10 69.97 10 69.97 15 64.97 15 64.97 20 64.97 30 69.97 30 69.97 20 114.97 20 114.97 17.33 114.97 15 114.97 10 114.97 5 114.97 0 109.97 0"/>
        </g>
    );
});

export default Status;
