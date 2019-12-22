import {Copy} from '../utilities/generic.js';
import {IsWithinRadius} from '../utilities/grid.js';
import {Properties} from '../data/generic.js';

const Views = {
    options: 'options',
    movement: 'move',
    vision: 'vision',
};

function rowColKey(row, col) {
    return `${row}:${col}`;
};

function locKey(loc) {
    return rowColKey(loc.row, loc.col);
};

const dims = {
    rows: 10,
    cols: 10,
};

function getRadius(origin, radius) {
    if (!radius) { return undefined; }
    let inRadius = [];
    for (let r = 0; r < dims.rows; r++) {
        for (let c = 0; c < dims.cols; c++) {
            if (r === origin.row && c === origin.col) { continue; }
            if (IsWithinRadius({row: r, col: c}, origin, radius)) {
                inRadius.push(rowColKey(r, c));
            }
        }
    }
    return inRadius;
};

function canMoveTo(loc, destination, steps, radius, visited) {
    if (!visited) { visited = []; }
    let outcome = tryMoveTo({row: loc.row+1, col: loc.col}, destination, steps-1, radius, visited);
    if (outcome.success) { return outcome.success; }
    visited = outcome.visited;
    outcome = tryMoveTo({row: loc.row-1, col: loc.col}, destination, steps-1, radius, visited);
    if (outcome.success) { return outcome.success; }
    visited = outcome.visited;
    outcome = tryMoveTo({col: loc.col+1, row: loc.row}, destination, steps-1, radius, visited);
    if (outcome.success) { return outcome.success; }
    visited = outcome.visited;
    outcome = tryMoveTo({col: loc.col-1, row: loc.row}, destination, steps-1, radius, visited);
    return outcome.success;
};

function tryMoveTo(loc, dest, steps, radius, visited) {
    let success = false;
    let key = locKey(loc);
    if (!R.contains(key, visited)) {
        visited.push(key);
        success = checkMove(loc, dest, steps, radius, visited);
        visited = R.remove(R.findIndex((R.equals)(key), visited), 1, visited);
    }
    return {success, visited};
};

function checkMove(curr, dest, steps, radius, visited) {
    if (curr.row === dest.row && curr.col === dest.col) { return true; }
    if (steps === 0
        || !R.contains(locKey(curr), radius)
        || !State.canOccupy(curr)
    ) { return false; }
    return canMoveTo(curr, dest, steps, radius, visited);
};

const State = {
    getStateAt(loc) {
        let attrs = Copy(loc);
        if (this.selectedEnt) {
            attrs.showOptions = this.selectedView === Views.options
                && loc.row === this.selectedLoc.row && loc.col === this.selectedLoc.col;
            attrs.showMove = this.selectedView === Views.movement
                && R.contains(locKey(loc), this.selectedRadius)
                && canMoveTo(loc, this.selectedLoc, this.selectedEnt.stats.move, this.selectedRadius);
        }
        return attrs;
    },

    selectedEnt: undefined,
    selectedLoc: undefined,
    selectedMovement: undefined,
    selectedRadius: undefined,
    selectedView: undefined,
    selectedVision: undefined,
    select(occupant, loc) {
        if (this.selectedLoc && loc.row === this.selectedLoc.row && loc.col === this.selectedLoc.col) { return this.deselect(); }
        this.selectedEnt = Copy(occupant);
        this.selectedLoc = occupant ? loc : undefined;
        this.selectedRadius = occupant ? getRadius(loc, R.path(['stats', 'move'], occupant)) : undefined;
        this.selectedMovement = undefined; // get from occupant map
        this.selectedVision = undefined; // get from occupant map
        this.selectedView = Views.options;
        m.redraw();
    },

    deselect() {
        this.selectedEnt = undefined;
        this.selectedLoc = undefined;
    },

    selectView(view) {
        this.selectedView = view;
    },

    creatures: {},
    terrain: {},

    addOccupant(o, loc) {
        switch (o.type) {
        case 'creature':
            this.creatures[locKey(loc)] = o;
            break;
        case 'terrain':
            this.terrain[locKey(loc)] = o;
            break;
        }
        this.deselect();
    },

    canOccupy(loc) {
        let key = locKey(loc);
        let cr = this.creatures[key];
        if (cr && R.contains(Properties.blocksOccupy, cr.props)) { return false; }
        let tr = this.terrain[key];
        if (tr && R.contains(Properties.blocksOccupy, tr.props)) { return false; }
        return true;
    },
};

export {State, Views};
