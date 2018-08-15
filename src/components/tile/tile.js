function dropObj(e) {
    e.preventDefault();
    removeHover(e);
};

function dragHover(e) {
    e.preventDefault();
    const t = getTile(e.target);
    if (t) {
        t.classList.add('tile__drop-hover');
    }
};

function dragEndHover(e) {
    e.preventDefault();
    removeHover(e);
};

function removeHover(e) {
    const t = getTile(e.target);
    if (t) {
        t.classList.remove('tile__drop-hover');
    }
};

function getTile(e) {
    return e.classList && e.classList.contains('tile')
        ? e
        : getTile(e.parentElement);
};

const Tile = {
    selected : false,
    msg: '',
    oninit(vnode) {this.msg = `[${vnode.attrs.row},${vnode.attrs.col}]`;},
    view() {
        return m('.tile', {
            ondrop: dropObj,
            ondragover: dragHover,
            ondragleave: dragEndHover, 
            onclick: _ => this.selected = !this.selected,
            class: `${this.selected ? 'tile-selected' : ''}`,
        }, m('.thinpad', `${this.msg}`));
    },
};

export {Tile};
