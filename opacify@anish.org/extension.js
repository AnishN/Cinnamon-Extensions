/*const St = imports.gi.St;
const Meta = imports.gi.Meta;
const Lang = imports.lang;
const Main = imports.ui.main;*/
const Clutter = imports.gi.Clutter;
const Tweener = imports.ui.tweener;

let beginGrabOpId;
let endGrabOpId;

function init()
{
	
}

function onBeginGrabOp(display, screen, window, op) {
    let compositor = window.get_compositor_private();
	Tweener.addTween(compositor, { 
		opacity: 255,
		time: 0.10,
		transition: 'easeOutSine',
    });
	Tweener.addTween(compositor, { 
		opacity: 100,
		time: 0.10,
		transition: 'easeOutSine',
    });
}

function onEndGrabOp(display, screen, window, op) {
    let compositor = window.get_compositor_private();
	Tweener.addTween(compositor, { 
		opacity: 255,
		time: 0.10,
		transition: 'easeInSine',
    });
}

function enable() 
{
	beginGrabOpId = global.display.connect('grab-op-begin', onBeginGrabOp);
	endGrabOpId = global.display.connect('grab-op-end', onEndGrabOp);
}

function disable() 
{
    global.display.disconnect(beginGrabOpId);
    global.display.disconnect(endGrabOpId);
}
