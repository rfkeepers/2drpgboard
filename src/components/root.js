import {Board} from './board/board.js';
import {Controls} from './controls/controls.js';
import {Grid} from './store/grid.js';

const Root = {
    oninit() {Grid.init();},
    oncreate(vnode) {Grid.observe(vnode.dom);},
    view() {
        return m('.root', [
            m('.root-ctrls', m(Controls)),
            m('.root-board', m(Board)),
        ]);
    },
};

export {Root};