function Copy(o) {
    return Object.assign({}, o);
};

function Listen(dom, action, handler) {
    dom.addEventListener(action, handler);
}

function Emit(dom, action, detail) {
    dom.dispatchEvent(new CustomEvent(action, {bubbles: true, detail: detail}));
};

const Events = {
    selectOccupant: 'selectTileOccupant',
};

export {Copy, Emit, Events, Listen};