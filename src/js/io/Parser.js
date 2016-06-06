import _ from 'lodash';

/**
 * Parses the passed data object into settings which are usable by the viewer
 * @param   {Object} data       The JSON data received from the server
 * @param   {Object} [defaults] The default settings as passed from the gameViewer
 * @returns {Object}            The settings object
 */
function parseSettings(data, defaults = {}) {
    return {
        ...defaults,
        ...data.settings,
    };
}

/**
 * Parses the passed data and settings into states which can be rendered by the viewer
 * @param   {Object} data     The JSON data received from the server
 * @param   {Object} settings The parsed settings
 * @returns {Array}           List of states
 */
function parseStates(data, settings) {

    const results = data.results;
    const path = settings.path;
    const checkpoints = createCheckpoints(data.settings.checkpoints, path);
    const routeSteps = settings.routeSteps;
    const stateCount = (results.length - 1) * settings.spawnDelay + routeSteps + 1;
    const buyers = results.map((result, index) => ({
        result,
        look: createRandomBuyerLook(),
        id: index,
    }));

    return Array.from({ length: stateCount }, createStateParser({
        buyers,
        settings,
        checkpoints,
        stateCount,
        routeSteps,
    }));
}

function createStateParser({ buyers, settings, checkpoints, stateCount, routeSteps }) {

    let previousStatus = {
        currentState: -1,
        percentage: 0,
        normal: 0,
        fairlyJailed: 0,
        unfairlyJailed: 0,
        thefts: 0,
    };

    return function parseState() {

        const currentState = previousStatus.currentState + 1;
        const { checkoutPosition, spawnDelay } = settings;
        const lastBuyerIndex = buyers.length - 1;
        const latestPossibleBuyerIndex = Math.floor(currentState / spawnDelay);
        const latestBuyerIndex = latestPossibleBuyerIndex > lastBuyerIndex ? lastBuyerIndex : latestPossibleBuyerIndex;
        const currentActiveBuyerIndexes = calculateBuyerIndexes(latestBuyerIndex, spawnDelay, currentState, routeSteps);

        const visibleBuyers = buyers
        // .slice(currentlyActiveBuyers.start, currentlyActiveBuyers.end)
            .filter((x, index) => _.includes(currentActiveBuyerIndexes, index))
            .map(({ look, result, id }) => {

                const { isBusted, isApproved, isFraudulent } = result;

                const position = calculatePosition(id, spawnDelay, currentState);
                const busted = isBusted ? calculateBusted(isApproved, checkpoints, position) : false;
                const approved = calculateApproved(checkpoints, position, isApproved);
                const shirtColor = calculateShirtColor(isApproved, approved);
                const faceExpression = getFaceExpression(busted);
                const purchaseItem = busted ? 0 : look.purchaseItem;
                const emotion = 0;

                return {
                    id,
                    position,
                    shirtColor,
                    isBusted: busted,
                    isApproved: approved,
                    emotion,
                    faceExpression,
                    purchaseItem,
                    faceType: look.faceType,
                    skinColor: look.skinColor,
                    isFraudulent,
                };
            });

        let isBusted = undefined;
        let isFraudulent = undefined;

        // Create a state for guards
        const checkpointsState = checkpoints.map(setCheckpointExpressions);

        const checkingOut = visibleBuyers.find(buyer => buyer.position === checkoutPosition);

        if (checkingOut) {
            isBusted = checkingOut.isBusted;
            isFraudulent = checkingOut.isFraudulent;
        }

        const status = createStatusFromStatus(previousStatus, isBusted, isFraudulent, stateCount);

        previousStatus = status;

        return {
            status,
            checkpoints: checkpointsState,
            buyers: visibleBuyers,
        };
    };
}

function createCheckpoints(checkpoints, path) {

    // Add expressions for checkpoint guards. Expressions are related to buyer by position.
    const skinColors = [0, 1, 2];

    let checks = checkpoints.map((checkpoint, index) => {

        return {
            id: index + 1,
            description: checkpoint.description,
            skinColor: getRandomFromArray(skinColors),
        };
    });

    return checks;

    const amountPerLane = checkpoints.length / 3;

    let lanes = [
        { start: path[0].X, end: path[1].X },
        { start: path[2].X, end: path[3].X },
        { start: path[4].X, end: path[5].X },
    ];

    lanes = lanes.map((lane) => {
        return {
            width: Math.abs(lane.start - lane.end),
            ...lane,
        };
    });

    console.log(lanes);

    checks.forEach((cp, index) => {

        let laneWidth;
        let spacePerCheckpoint;
        let x;
        let y;
        const id = cp.id;
        const min = amountPerLane - 1;

        if (index < amountPerLane) {
            laneWidth = lanes[0].width - 100;
            spacePerCheckpoint = laneWidth / amountPerLane;
            x = id * spacePerCheckpoint;
            y = 250;
        } else if (index > amountPerLane * 2) {
            laneWidth = lanes[2].width - 100;
            spacePerCheckpoint = laneWidth / amountPerLane;
            x = (id - (min * 2)) * spacePerCheckpoint;
            y = 750;
        } else {
            laneWidth = lanes[1].width - 100;
            spacePerCheckpoint = laneWidth / amountPerLane;
            x = (id - min) * spacePerCheckpoint;
            y = 550;
        }

        cp.transform = `translate(${x},${y})`;
    });

    console.log(checks);

    return checks;
}

function setCheckpointExpressions(checkpoint, buyers) {

    // Add expressions for checkpoint guards. Expressions are related to buyer by position.
    const expression = 0;

    return {
        expression,
        ...checkpoint,
    };
}

function calculateBuyerIndexes(latestBuyerIndex, spawnDelay, currentState, routeSteps) {

    const latestBuyerStartState = latestBuyerIndex * spawnDelay;
    const latestBuyerPosition   = currentState - latestBuyerStartState;
    const stepsLeft             = routeSteps - latestBuyerPosition - 1;

    let visibleBuyerCount = Math.floor(stepsLeft / spawnDelay) + 1;

    if (visibleBuyerCount > (latestBuyerIndex + 1)) {
        visibleBuyerCount = (latestBuyerIndex + 1);
    }

    // console.log(visibleBuyerCount);
    //
    // return {
    //     start: latestBuyerIndex - visibleBuyerCount,
    //     end: latestBuyerIndex + 1,
    // };

    // console.log('-------------------------');
    // console.log('visibleBuyerCount:', visibleBuyerCount);

    let index = latestBuyerIndex;
    let indexes = [];

    while (visibleBuyerCount > 0) {
        indexes.push(index);
        index--;
        visibleBuyerCount--;
    }

    return indexes;
}

function calculatePosition(index, spawnDelay, currentState) {

    const startPosition = index * spawnDelay;

    return currentState - startPosition;
}

function calculateBusted(isApproved, checkpoints, position) {

    const lastFalseIndex                = isApproved.lastIndexOf(false);
    const lastFalseCheckpointPosition   = checkpoints[lastFalseIndex].position;

    return lastFalseCheckpointPosition <= position;
}

function calculateApproved(checkpoints, position, isApproved) {

    const passedCheckpoints = checkpoints.filter((checkpoint) => (
        checkpoint.position <= position
    ));
    const passedCheckpointAmount = passedCheckpoints.length;

    return isApproved.filter((approve, index) => (
        (index + 1) <= passedCheckpointAmount
    ));
}

function calculateShirtColor(isApproved, approved) {

    const amountOfFalseApproves = isApproved.filter(isFalse).length;
    const amountOfFalseApproved = approved.filter(isFalse).length;
    const shirtColorStepSize = 100 / amountOfFalseApproves;

    return shirtColorStepSize * amountOfFalseApproved;
}

function createStatusFromStatus(oldStatus, isBusted, isFraudulent, stateCount) {

    let {
        currentState,
        percentage,
        normal,
        fairlyJailed,
        unfairlyJailed,
        thefts,
    } = oldStatus;

    currentState += 1;
    percentage = 100 / stateCount * currentState; // (currentState + 1)

    // console.log('isBusted', isBusted);
    // console.log('isFraudulent', isFraudulent);

    if (isBusted && isFraudulent) {
        // console.log('fairlyJailed')
        fairlyJailed += 1;
    } else if (isBusted) {
        // console.log('unfairlyJailed')
        unfairlyJailed += 1;
    } else if (isFraudulent) {
        // console.log('thefts')
        thefts += 1;
    } else if (typeof isBusted !== 'undefined' && typeof isFraudulent !== 'undefined') {
        // console.log('normal')
        normal += 1;
    }

    return {
        currentState,
        percentage,
        normal,
        fairlyJailed,
        unfairlyJailed,
        thefts,
    };
}

function createRandomBuyerLook() {

    const purchaseItems = [1, 2, 3, 4];
    const faceTypes     = [0, 1, 2, 3, 4];
    const skinColors    = [0, 1, 2];

    return {
        purchaseItem: getRandomFromArray(purchaseItems),
        faceType: getRandomFromArray(faceTypes),
        skinColor: getRandomFromArray(skinColors),
    };
}

function getFaceExpression(busted) {

    return busted ? 1 : 0;
}

function isFalse(value) {
    return value === false;
}

function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export {
    parseSettings,
    parseStates,
};
