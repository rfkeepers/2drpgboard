import {Grid} from '../store/grid.js';
import {Emit} from '../../utilities/generic.js';
import * as Creatures from '../creatures/creatures.js';
import * as Terrain from '../terrain/terrain.js';

const events = {
    toggleDrawer: 'toggleDrawer',
};

const drawer = {
    isOpen: true,
    oncreate(vnode) {
        most.fromEvent(events.toggleDrawer, vnode.dom)
            .forEach(e => this.isOpen = e.detail.state);
    },
    view(vnode) {
        return m('.drawer', [
            m(drawerHeader, {open: this.isOpen}, vnode.attrs.title),
            m('.drawer-opener', {
                class: this.isOpen ? 'drawer-open' : 'drawer-closed'
            }, [
                m(drawerBody, {open: this.isOpen}, vnode.children),
            ]),
        ]);
    },
};

const drawerHeader = {
    isOpen: true,
    toggleDrawer(vnode) {
        this.isOpen = !this.isOpen;
        Emit(vnode.dom, events.toggleDrawer, {state: this.isOpen});
    },
    view(vnode) {
        return m('.drawer__header', {
            onclick: _ => this.toggleDrawer(vnode),
        }, [
            m('', vnode.children),
            m('', vnode.attrs.open ? 'v' : '>'),
        ]);
    },
};

const drawerBody = {
    view(vnode) {return m('.drawer__body', vnode.children);},
};

const drawerObj = {
    dragObj(e) {
        e.target.classList.add('drawer__obj-drag');
        e.dataTransfer.setData("text/plain", e.target.id);
        e.dataTransfer.dropEffect = "copy";
    },
    dragEnd(e) {
        e.target.classList.remove('drawer__obj-drag');
    },
    view(vnode) {
        return m('.drawer__obj', {
            id: `${vnode.attrs.type}:${vnode.attrs.id}`,
            draggable: true,
            ondragstart: this.dragObj,
            ondragend: this.dragEnd,
        }, vnode.children);
    },
};

const makeDrawerObj = R.curry((component, entity) => m(drawerObj, {type: entity.type, id: entity.id}, m(component, {entity})));
const withDraggable = o => makeDrawerObj(o.Draggable);
const withValsIn = o => R.values(o);
const makeDrawerEntries = (f, o) => R.map(v => f(v), o);
const populateDrawerWith = d => makeDrawerEntries(withDraggable(d), withValsIn(d.Catalogue));

const strToInt = R.compose(
    v => parseInt(v, 10),
    R.replace(/\D/g, ''),
);
const updateDims = (dims) => R.compose(
    R.curry(Grid.setDimensions(Grid.actions.setDimensions)),
    R.merge(dims),
);
const setRowsLen = (dims) => R.compose(
    updateDims(dims),
    v => {return {rows: v}},
    strToInt,
);
const setColsLen = (dims) => R.compose(
    updateDims(dims),
    v => {return {cols: v}},
    strToInt,
);

const Controls = {
    oninit() {this.dimensions = Grid.getDimensions();},
    view() { 
        return m('.controls', [
            // dimensions
            m('.controls-dim', [
                m('input[type=text].controls__dim__input', {
                    style: {width: `${this.dimensions.rows.toString().length}ch`},
                    oninput: e => setRowsLen(this.dimensions)(e.target.value),
                    value: this.dimensions.rows,
                }),
                m('', {style: {fontSize: '32px'}}, 'x'),
                m('input[type=text].controls__dim__input', {
                    style: {width: `${this.dimensions.cols.toString().length}ch`},
                    oninput: e => setColsLen(this.dimensions)(e.target.value),
                    value: this.dimensions.cols,
                }),
            ]),
            // drawers
            m(drawer, {title: 'Creatures'}, populateDrawerWith(Creatures)),
            m(drawer, {title: 'Terrain'}, populateDrawerWith(Terrain)),
        ]);
    },
};

export {Controls};
