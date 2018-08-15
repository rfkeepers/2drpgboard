
function Copy(o) {
    return Object.assign({}, o);
};

function EmitEvent(dom, name, detail) {
    dom.dispatchEvent(new CustomEvent(name, {bubbles: true, detail: detail}));
};

const Events = {
    toggleDrawer: 'toggleDrawer',
};

export {Copy, EmitEvent, Events};