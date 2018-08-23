import {Catalogue as CCatalogue} from '../creatures/creatures.js';
import {Catalogue as TCatalogue} from '../terrain/terrain.js';
import {EmitEvent, Events} from '../../utilities/generic.js';
import {Properties} from '../../data/generic.js';
import {State} from '../../global/boardState.js';

function dropObj(e, loc) {
    e.preventDefault();
    removeHover(e);
    // Add Wiggle on failure!
    // FIX NEGATE SELECTION ON RECLICK
    if (!State.canOccupy(loc)) { return; } 
    let detail = e.dataTransfer.getData('text');
    detail = detail.split(':');
    const occupant = getFromCatalogue(detail);
    State.addOccupant(occupant, loc);
    return occupant;
};

function getFromCatalogue(detail) {
    switch (detail[0]) {
    case 'creature':
        return CCatalogue[detail[1]];
    case 'terrain':
        return TCatalogue[detail[1]];
    }
    return undefined;
};

function dragHover(e, loc) {
    e.preventDefault();
    const t = getTile(e.target);
    if (t) {
        t.classList.add(`tile__drop-hover-${State.canOccupy(loc) ? 'available' : 'unavailable'}`);
    }
};

function dragEndHover(e) {
    e.preventDefault();
    removeHover(e);
};

function removeHover(e) {
    const t = getTile(e.target);
    if (t) {
        t.classList.remove('tile__drop-hover-available');
        t.classList.remove('tile__drop-hover-unavailable');
    }
};

function getTile(e) {
    return e.classList && e.classList.contains('tile') ? e : getTile(e.parentElement);
};

function selectOccupant(curr, occ) {
    if (!State.selectedEnt) { return occ; }
    return State.selectedEnt == curr ? undefined : occ;
};

function isOccupiable(occupant) {
    return !occupant || !R.contains(Properties.blocksOccupy, occupant.props);
}

function attrsBasedClasses(attrs, occupant) {
    let classes = '';
    if (attrs.showMove) {
        classes += isOccupiable(occupant) ? 'tile__move-available' : '';
    }
    return classes;
};

const Tile = {
    selected : undefined,
    occupant: undefined,
    view(vnode) {
        return m('.tile', {
            ondrop: e => this.occupant = dropObj(e, {row: vnode.attrs.row, col: vnode.attrs.col}),
            ondragover: e => dragHover(e, {row: vnode.attrs.row, col: vnode.attrs.col}),
            ondragleave: dragEndHover, 
            onclick: _ => {
                this.selected = selectOccupant(this.selected, this.occupant);
                State.select(this.selected, {row: vnode.attrs.row, col: vnode.attrs.col});
            },
            class: `${this.selected ? 'tile-selected' : ''}, ${attrsBasedClasses(vnode.attrs, this.occupant)}`,
        }, [
            m('', `${this.occupant ? this.occupant.icon : ''}`),
        ]);
    },
};

export {Tile};
