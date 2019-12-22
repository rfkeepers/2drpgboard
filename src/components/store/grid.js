/* ===  === */

const sequence = R.range(0);

let grid = [];
function init() {
    R.map(row => {
        let entry = [];
        R.map(col => {
            entry = R.append({
                row,
                col,
                creature: {},
                terrain: {},
                canOccupy: true,
            }, entry);
        })(sequence(dimensions.cols))
        grid = R.append(entry, grid);
    })(sequence(dimensions.rows))
};

/* ===  === */

const showMove = () => camera.showMove = true;
const hideMove = () => camera.showMove = false;
const camera = {
    showMove: false,
};

/* ===  === */

let dimensions = {
    cols: 10,
    rows: 10,
};
function getDimensions() {return R.clone(dimensions);}
function setDimensions(dims) {dimensions = dims;};

/* ===  === */

const rowEq = R.propEq('row');
const colEq = R.propEq('col');
const alreadySelected = (row, col) => R.ifElse(R.isNil, () => false, R.allPass([rowEq(row), colEq(col)]));
const select = R.assoc('selected', true);
const deselect = R.dissoc('selected');

let selected = undefined;
function selectTile({row, col}) {
    if (alreadySelected(row, col)(selected)) {
        grid[row][col] = deselect(grid[row][col]);
        selected = undefined;
        hideMove();
        return
    }
    grid[row][col] = select(grid[row][col]);
    if (!R.isNil(selected)) {
        grid[selected.row][selected.col] = deselect(grid[selected.row][selected.col])
    }
    selected = {row, col};
    setMovementAround(row, col);
    showMove();
};

/* ===  === */

/*function setVisionAround(row, col) {
    
}*/

const addMoveable = R.assoc('canMove', true);
const remMoveable = R.dissoc('canMove');
function setMovementAround(row, col) {
    // if (R.isEmpty(grid[row][col].creature)) return;
    R.map(r => {
        R.map(c => {
            grid[r][c] = R.ifElse(canMove(3, row, col), addMoveable, remMoveable)(grid[r][c])
        })(sequence(dimensions.cols))
    })(sequence(dimensions.rows))
}
const canMove = R.curry((tics, or, oc, tile) => {
    let pr = tile.row;
    let pc = tile.col;
    if (Math.abs(or-pr) > tics || Math.abs(oc-pc) > tics) return false;
    let mh = or-pr < 0 ? 1 : -1;
    let mv = oc-pc < 0 ? 1 : -1;
    // might need to run twice for vertical-dominant move.
    let to = tics;
    for (let h = 0;; h += mh) {
        if (or+h < 0 || to-- < 0) break;
        let ti = to;
        for (let v = 0;; v += mv) {
            if (oc+v < 0 || ti-- < 0) break;
            if (!grid[or+h][oc+v].canOccupy) return false;
            if (or+h === pr && oc+v === pc) return true;
        }
    }
    return false; 
});

/* ===  === */

const canOccupy = R.assoc('canOccupy', true);
const notOccupy = R.dissoc('canOccupy');
function occupy({occupant, row, col}) {
    const tile = grid[row][col];
    tile[occupant.type] = occupant;

    // update tile properies like canOccupy and blocksVision
}

/* ===  === */

function getTile(row, col) {
    // overrides boardOld.getStateAt
    return grid[row][col];
};

function getCamera() {
    return camera;
};

/* ===  === */

const events = {delta: 'i-am-delta-event'};
const actions = {
    dimensionsChanged: 'i-am-grid-dimensions-event',
    occupy: 'i-am-occupying-a-tile',
    tileSelected: 'i-am-tile-selected-event',
};

function observe(dom) {return dom.addEventListener(events.delta, delta);};
const eventOn = (action) => R.curry((action, dom, payload) =>
    dom.dispatchEvent(new CustomEvent(events.delta, {
        bubbles: true,
        detail: {action, payload},
    })))(action);

const emit = {
    addOccupant: eventOn(actions.occupy),
    selectTile: eventOn(actions.tileSelected),
    updateDimensions: eventOn(actions.dimensionsChanged),
};

function delta(event) {
    let action = event.detail.action;
    let payload = event.detail.payload;
    switch (action) {
    case actions.addOccupant:
        occupy(payload);
        break;
    case actions.dimensionsChanged:
        setDimensions(payload);
        break;
    case actions.tileSelected:
        selectTile(payload);
        break;
    }
};

const Grid = {
    emit,

    init,
    observe,

    getDimensions,
    setDimensions,

    getCamera,
    getTile,
};

export {Grid};

