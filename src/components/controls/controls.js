import {Gl} from '../global.js';
import {EmitEvent, Events} from '../../utilities/generic.js';
import * as Creatures from '../creatures/creatures.js';
import {Doodad} from '../doodads/doodads.js';

// add creature
// add doodad

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
    dragObj(e, entity) {
        e.dataTransfer.setData("text/plain", e.target.id);
        e.dataTransfer.dropEffect = "copy";
    },
    view(vnode) {
        return m('.drawer-obj', {
            id: R.path(['entity', 'id'], vnode.attrs),
            draggable: true,
            ondragstart: this.dragObj,
        }, vnode.children);
    },
};

const Controls = {
    oninit() {Gl.setDims(Gl.dims);},
    view() { return m('.controls', [
        // dims
        m('.controls-dim', [
            m('input[type=text].controls-dim__input', {
                style: {width: `${Gl.dims.rows.length}ch`},
                oninput: m.withAttr('value', v => Gl.updateDim('rows', v)),
                value: Gl.dims.rows,
            }),
            m('', {style: {fontSize: '32px'}}, 'x'),
            m('input[type=text].controls-dim__input', {
                style: {width: `${Gl.dims.cols.length}ch`},
                oninput: m.withAttr('value', v => Gl.updateDim('cols', v)),
                value: Gl.dims.cols,
            }),
        ]),
        // drawers
        m(drawer, {title: 'Creatures'}, [
            Creatures.Catalogue.map(cc => m(drawerObj, {entity: cc}, m(Creatures.Draggable, {creature: cc}))),
        ]),
        m(drawer, {title: 'Doodads'}, [
            m(drawerObj, m(Doodad)),
            m(drawerObj, m(Doodad)),
            m(drawerObj, m(Doodad)),
            m(drawerObj, m(Doodad)),
            m(drawerObj, m(Doodad)),
            m(drawerObj, m(Doodad)),
            m(drawerObj, m(Doodad)),
            m(drawerObj, m(Doodad)),
        ]),
    ]);},
};

export {Controls};
