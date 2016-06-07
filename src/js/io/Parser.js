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
        const { checkoutPosition, spawnDelay, routeSteps, path } = settings;
        const lastBuyerIndex = buyers.length - 1;
        const latestPossibleBuyerIndex = Math.floor(currentState / spawnDelay);
        const latestBuyerIndex = latestPossibleBuyerIndex > lastBuyerIndex ? lastBuyerIndex : latestPossibleBuyerIndex;
        const currentActiveBuyerIndexes = calculateBuyerIndexes(latestBuyerIndex, spawnDelay, currentState, routeSteps);

        // Slice instead of filter
        const visibleBuyers = buyers
            .filter((x, index) => _.includes(currentActiveBuyerIndexes, index))
            .map(({ look, result, id }) => {

                const { isBusted, isApproved, isFraudulent } = result;

                const position = calculatePosition(id, spawnDelay, currentState);
                const stepSize = getRouteLength() / routeSteps;
                const currentStep = position * stepSize;
                const transformation = calculatePositionInfo(currentStep, path);
                const bodyDirection = getBodyDirection(transformation, path);
                const busted = isBusted ? calculateBusted(isApproved, checkpoints, position) : false;
                const approved = calculateApproved(checkpoints, position, isApproved);
                const shirtColor = calculateShirtColor(isApproved, approved);
                const faceExpression = getFaceExpression(busted);
                const purchaseItem = busted ? 0 : look.purchaseItem;
                const emotion = 0;

                return {
                    id,
                    position,
                    bodyDirection,
                    transformation,
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
            transformation: 'translate(200,250)',
            bodyDirection: 0,
        };
    });

    // Divide into chunks with length:
    const amountPerLane = Math.ceil(checkpoints.length / 3);

    let lanes = [
        { start: path[0].X, end: path[1].X },
        { start: path[2].X, end: path[3].X },
        { start: path[4].X, end: path[5].X },
    ];

    lanes = lanes.map((lane, index) => {

        let width;

        if (index === 0) {
            width = (lane.start - 85) - (lane.end + 85);
        } else if (index === 1) {
            width = (lane.start + 85) - lane.end;
        } else {
            width = (lane.start - 85) - (lane.end + 400);
        }

        return {
            width: Math.abs(width),
            ...lane,
        };
    });

    let i = 0;
    let index = 0;
    let widthPerGuard = lanes[0].width / amountPerLane;
    let translateX = lanes[0].start - 200;

    while (i < amountPerLane) {
        checks[index].transformation = { X: translateX, Y: 80 };
        checks[index].bodyDirection = getBodyDirection(checks[index].transformation, path);
        translateX -= widthPerGuard;
        i++;
        index++;
    }

    widthPerGuard = lanes[1].width / amountPerLane;
    translateX = lanes[1].start + 50;

    while (i < (amountPerLane * 2)) {
        checks[index].transformation = { X: translateX, Y: 380 };
        checks[index].bodyDirection = getBodyDirection(checks[index].transformation, path);
        translateX += widthPerGuard;
        i++;
        index++;
    }

    widthPerGuard = lanes[2].width / amountPerLane;
    translateX = lanes[2].start - (widthPerGuard * 1.5);

    // while (i < (checks.length - 1)) {
    while (i < (amountPerLane * 3)) {
        if (checks[index]) {
            checks[index].transformation = { X: translateX, Y: 660 };
            checks[index].bodyDirection = getBodyDirection(checks[index].transformation, path);
        }

        translateX -= widthPerGuard;
        i++;
        index++;
    }

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
        return { X, Y };
    }

    leftOver = firstCornerX - X;
    X = firstCornerX;
    Y = firstCornerY + leftOver;

    if (Y <= secondCornerY) {
        return { X, Y };
    }

    leftOver = Y - secondCornerY;
    X = secondCornerX + leftOver;
    Y = secondCornerY;

    if (X <= thirdCornerX) {
        return { X, Y };
    }

    leftOver = X - thirdCornerX;
    X = thirdCornerX;
    Y = thirdCornerY + leftOver;

    if (Y <= fourthCornerY) {
        return { X, Y };
    }

    leftOver = Y - fourthCornerY;
    X = fourthCornerX - leftOver;
    Y = fourthCornerY;

    return { X, Y };
}

function getBodyDirection(transformation, path) {

    const transformationY = transformation.Y;

    if (transformationY <= path[1].Y) {
        return 0;
    } else if (transformationY <= path[2].Y) {
        return 1;
    } else {
        return 0;
    }
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
    percentage = 100 / stateCount * currentState;

    if (isBusted && isFraudulent) {
        fairlyJailed += 1;
    } else if (isBusted) {
        unfairlyJailed += 1;
    } else if (isFraudulent) {
        thefts += 1;
    } else if (typeof isBusted !== 'undefined' && typeof isFraudulent !== 'undefined') {
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

function getRouteLength() {

    return (1920 - 170) + (600 - 300) + (1770 - 170) + (890 - 600) + (1770 - 1);
}

export {
    parseSettings,
    parseStates,
};
