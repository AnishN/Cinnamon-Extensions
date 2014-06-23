/*const St = imports.gi.St;
const Meta = imports.gi.Meta;
const Lang = imports.lang;
const Main = imports.ui.main;*/
const Clutter = imports.gi.Clutter;
const Settings = imports.ui.settings;
const Tweener = imports.ui.tweener;

let beginGrabOpId;
let endGrabOpId;
let settings;

function init(metadata)
{
    settings = new SettingsHandler(metadata.uuid);
}

function SettingsHandler(uuid) {
    this._init(uuid);
}

SettingsHandler.prototype = {
    _init: function(uuid) {
	this.settings = new Settings.ExtensionSettings(this, uuid);
	this.settings.bindProperty(Settings.BindingDirection.IN, "opacity", "opacity", function(){});
	this.settings.bindProperty(Settings.BindingDirection.IN, "beginTime", "beginTime", function(){});
	this.settings.bindProperty(Settings.BindingDirection.IN, "beginEffect", "beginEffect", function(){});
	this.settings.bindProperty(Settings.BindingDirection.IN, "endTime", "endTime", function(){});
	this.settings.bindProperty(Settings.BindingDirection.IN, "endEffect", "endEffect", function(){});
    }
}

function onBeginGrabOp(display, screen, window, op) {
    let compositor = window.get_compositor_private();
	Tweener.addTween(compositor, { 
		opacity: settings.opacity,
		time: settings.beginTime/1000,
		transition: settings.beginEffect
    });
}

function onEndGrabOp(display, screen, window, op) {
    let compositor = window.get_compositor_private();
	Tweener.addTween(compositor, { 
		opacity: 255,
		time: settings.endTime/1000,
		transition: settings.endEffect
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
