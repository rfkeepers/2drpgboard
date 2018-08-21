import {Settings} from '../../global/settings.js';
import {EmitEvent, Events} from '../../utilities/generic.js';
import * as Creatures from '../creatures/creatures.js';
import * as Terrain from '../terrain/terrain.js';

const drawer = {
    isOpen: true,
    oncreate(vnode) {
        most.fromEvent(Events.toggleDrawer, vnode.dom)
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
        EmitEvent(vnode.dom, Events.toggleDrawer, {state: this.isOpen});
    },
    view(vnode) {
        return m('.drawer-header', {
            onclick: _ => this.toggleDrawer(vnode),
        }, [
            m('', vnode.children),
            m('', vnode.attrs.open ? 'v' : '>'),
        ]);
    },
};

const drawerBody = {
    view(vnode) {return m('.drawer-body', vnode.children);},
};

const drawerObj = {
    dragObj(e) {
        e.target.classList.add('drawer-obj__drag');
        e.dataTransfer.setData("text/plain", e.target.id);
        e.dataTransfer.dropEffect = "copy";
    },
    dragEnd(e) {
        e.target.classList.remove('drawer-obj__drag');
    },
    view(vnode) {
        return m('.drawer-obj', {
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

const Controls = {
    oninit() {Settings.setDims(Settings.dims);},
    view() { return m('.controls', [
        // dims
        m('.controls-dim', [
            m('input[type=text].controls-dim__input', {
                style: {width: `${Settings.dims.rows.length}ch`},
                oninput: m.withAttr('value', v => Settings.updateDim('rows', v)),
                value: Settings.dims.rows,
            }),
            m('', {style: {fontSize: '32px'}}, 'x'),
            m('input[type=text].controls-dim__input', {
                style: {width: `${Settings.dims.cols.length}ch`},
                oninput: m.withAttr('value', v => Settings.updateDim('cols', v)),
                value: Settings.dims.cols,
            }),
        ]),
        // drawers
        m(drawer, {title: 'Creatures'}, populateDrawerWith(Creatures)),
        m(drawer, {title: 'Terrain'}, populateDrawerWith(Terrain)),
    ]);},
};

export {Controls};
