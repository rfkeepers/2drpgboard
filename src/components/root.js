import {Board} from './board/board.js';
import {Controls} from './controls/controls.js';

const Root = {
    view() { return m('.root', [
        m('.root-ctrls', m(Controls)),
        m('.root-board', m(Board)),
    ]);},
};

export {Root};