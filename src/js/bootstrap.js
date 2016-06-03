import dataProvider  from '@riddles/match-viewer/lib/dataProvider/aiGamesDataProvider';
import MatchViewer from './game/MatchViewer';

let displayChrome = true;

if (window.frameElement.getAttribute('data-indexgame')) {
    displayChrome = false;
}

const game = new MatchViewer({
    name: 'adyen-fraud-challenge',
    dataProvider: dataProvider(),
    player: {
        // Determines whether they player's chrome should be displayed
        chrome: displayChrome,

        // Determines whether view selection should be possible
        viewstack: false,

        // A number between 0 and 1
        aspectRatio: 1920 / 1080,

        // Time between each step when playing
        playbackTimeout: {
            min: 10,
            max: 550,
        },
    },
});
