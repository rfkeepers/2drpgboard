import {Catalogue} from '../store/catalogue.js';
import {Emit} from '../../utilities/generic.js';
import {Properties} from '../../data/generic.js';
import {Grid} from '../store/grid.js';

const canOccupy = R.pathEq(['props', 'canOccupy'], true);

/* === === */

function hasMoveable(p) { return p && R.contains(Properties.hasMoveable)(p); };
function hasFacing(p) { return p && R.contains(Properties.hasFacing)(p); };
function hasVision(p) { return p && R.contains(Properties.hasVision)(p); };
function getProps(vn) { return R.path(['attrs', 'selected', 'props'], vn); };

function optionsSizeClass(show) { return `tile-options__popup-${show ? 'max' : 'min'}`; };
function optionsPositionClass(row, col) {
    return `tile-options__popup-${row < 3 ? 'bottom' : 'top'}-${col < 4 || col < (Grid.getDimensions().cols - 4) ? 'right' : 'left'}`;
};
const tileOptionBtn = {
    view(vnode) {
        return m('.tile-option', vnode.children)
    },
};

const tileOptions = {
    view(vnode) {
        return m('', {style: {position: 'relative'}},
            m('.tile-options__popup', {
                class: `${optionsSizeClass(vnode.attrs.show)} ${optionsPositionClass(vnode.attrs.row, vnode.attrs.col)}`,
            }, [
                hasMoveable(getProps(vnode)) && m(tileOptionBtn, 'move'),
                hasFacing(getProps(vnode)) && m(tileOptionBtn, 'face'),
                hasVision(getProps(vnode)) && m(tileOptionBtn, 'vision'),
            ]),
        );
    },
};

/* === === */

function dropObj(e, row, col) {
    e.preventDefault();
    removeHover(e);
    // Add Wiggle on failure!
    // FIX NEGATE SELECTION ON RECLICK
    const tile = Grid.getTile(row, col);
    if (!canOccupy(tile)) { return; }
    Grid.emit.addOccupant({occupant: Catalogue.get(e.dataTransfer.getData('text')), row, col});
    return occupant;
};

function dragHover(e, row, col) {
    e.preventDefault();
    const t = findTileComponent(e.target);
    if (t) {
        t.classList.add(`tile__drop-hover-${canOccupy(Grid.getTile(row, col)) ? 'available' : 'unavailable'}`);
    }
};

function dragEndHover(e) {
    e.preventDefault();
    removeHover(e);
};

function removeHover(e) {
    const t = findTileComponent(e.target);
    if (t) {
        t.classList.remove('tile__drop-hover-available');
        t.classList.remove('tile__drop-hover-unavailable');
    }
};

function findTileComponent(e) {
    return e.classList && e.classList.contains('tile') ? e : findTileComponent(e.parentElement);
};

function conditionalCss({attrs}) {
    let classes = '';
    classes += attrs.selected ? 'tile-selected ' : '';
    if (attrs.showMove) classes += attrs.canMove ? 'tile-move-available ' : 'tile-move-unavailable';
    return classes;
};

const Tile = {
    occupant: undefined,
    view(vnode) {
        return m('.tile', {
            ondrop: e => this.occupant = dropObj(e, vnode.attrs.row, vnode.attrs.col),
            ondragover: e => dragHover(e, vnode.attrs.row, vnode.attrs.col),
            ondragleave: dragEndHover, 
            onclick: () => Grid.emit.selectTile(vnode.dom, {row: vnode.attrs.row, col: vnode.attrs.col}),
            class: `${conditionalCss(vnode)}`,
        }, [
            m('', `${this.occupant ? this.occupant.icon : ''}`),
            m(tileOptions, {show: vnode.attrs.showOptions, selected: vnode.attrs.selected, row: vnode.attrs.row, col: vnode.attrs.col}),
        ]);
    },
};

export {Tile};
