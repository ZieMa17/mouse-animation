(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:



(lib.cheese = function() {
	this.initialize(img.cheese);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,387,276);


(lib.intro = function() {
	this.initialize(img.intro);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1920,1080);


(lib.maze1 = function() {
	this.initialize(img.maze1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1920,1080);


(lib.maze2 = function() {
	this.initialize(img.maze2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1920,1080);


(lib.maze3 = function() {
	this.initialize(img.maze3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1920,1080);


(lib.mouse = function() {
	this.initialize(img.mouse);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,385,242);


(lib.star = function() {
	this.initialize(img.star);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,169,147);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.target = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.star();
	this.instance.parent = this;
	this.instance.setTransform(-84.5,-73.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-84.5,-73.5,169,147);


(lib.mouse_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.mouse();
	this.instance.parent = this;
	this.instance.setTransform(-192.5,-121);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.mouse_1, new cjs.Rectangle(-192.5,-121,385,242), null);


(lib.cheese_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.cheese();
	this.instance.parent = this;
	this.instance.setTransform(-193.5,-138);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.cheese_1, new cjs.Rectangle(-193.5,-138,387,276), null);


// stage content:
(lib.animation = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.isAnimationPlaying = false;
		this.nextFrame = 1;
		this.mazeContext = null;
		this.isGhostMode = false;
		this.handleMouse = function (e) {
			if (e.nativeEvent.buttons === 1) {
				this.mouse.hasReachedTarget = false;
				this.target.x = e.localX;
				this.target.y = e.localY;
			}
		};
		this.containsWall = function (x, y, width, height) {
			if (this.mazeContext === null || this.isGhostMode) {
				return false; // ignore first screen and cheat code
			}
		
			const imgData = this.mazeContext.getImageData(x - width / 2, y - height / 2, width, height);
			const data = imgData.data;
			// check colors in given position
			for (let i = 0; i < data.length; i += 4) {
				if (data[i] !== 32 && data[i + 1] !== 41 && data[i + 2] !== 50) {
					return true;
				}
			}
		
			return false;
		};
		this.playNextScene = function () {
			this.isAnimationPlaying = true;
		
			const video = document.createElement('video');
			video.setAttribute('style', 'position:absolute;pointer-events:none;width:100%;');
			video.autoplay = true;
			video.controls = false;
			video.src = `video/scene-${this.nextFrame}.mp4`;
			video.addEventListener('play', () => {
				createjs.Sound.stop();
			});
			video.addEventListener('pause', () => {
				this.stage.canvas.parentElement.removeChild(video);
				this.gotoAndStop(this.nextFrame);
			});
			this.stage.canvas.parentElement.appendChild(video);
		};
		
		const cheeseBounds = this.cheese.getBounds();
		this.cheese.width = cheeseBounds.width;
		this.cheese.height = cheeseBounds.height;
		this.cheese.wasReachedBy = function (object) {
			return object.x + object.width > this.x &&
				object.x < this.x + this.width &&
				object.y + object.height > this.y &&
				object.y < this.y + this.height;
		};
		
		const mouseBounds = this.mouse.getBounds();
		this.mouse.width = mouseBounds.width;
		this.mouse.height = mouseBounds.height;
		this.mouse.speed = 0.05;
		this.mouse.hasReachedTarget = false;
		this.mouse.rotateTowards = function (object) {
			this.rotation = Math.atan2(
				object.y - this.y,
				object.x - this.x,
			) * 180 / Math.PI;
		};
		this.mouse.chase = function (object) {
			if (this.hasReachedTarget) {
				return;
			}
		
			const xDiff = object.x - this.x;
			const yDiff = object.y - this.y;
			if (Math.abs(xDiff) < 1 && Math.abs(yDiff) < 1) {
				this.hasReachedTarget = true;
				return;
			}
		
			this.rotateTowards(object);
		
			const newX = this.x + xDiff * this.speed;
			const newY = this.y + yDiff * this.speed;
		
			const bounds = this.getTransformedBounds();
			if (this.parent.containsWall(newX, newY, bounds.width / 2, bounds.height / 2)) {
				this.hasReachedTarget = true;
				return;
			}
		
			this.x = newX;
			this.y = newY;
		};
		
		this.stage.addEventListener('stagemousemove', e => this.handleMouse(e));
		this.stage.addEventListener('stagemousedown', e => this.handleMouse(e));
		document.addEventListener('keypress', e => {
			if (e.keyCode === 103) {
				this.isGhostMode = !this.isGhostMode;
				console.log('Cheat: ghost mode - ' + (this.isGhostMode ? 'enabled' : 'disabled'));
			}
		});
		
		createjs.Ticker.addEventListener('tick', () => {
			if (this.isAnimationPlaying) {
				return;
			}
		
			this.mouse.chase(this.target);
			if (this.cheese.wasReachedBy(this.mouse)) {
				this.playNextScene();
			}
		});
		playSound("maze",-1);
	}
	this.frame_1 = function() {
		this.instance_1.cache(0, 0, 1920, 1080);
		this.mazeContext = this.instance_1.cacheCanvas.getContext('2d');
		this.isAnimationPlaying = false;
		this.nextFrame = 2;
		
		setTimeout(() => {
			const cheeseBounds = this.cheese.getTransformedBounds();
			this.cheese.width = cheeseBounds.width;
			this.cheese.height = cheeseBounds.height;
		
			const mouseBounds = this.mouse.getTransformedBounds();
			const size = Math.min(mouseBounds.width, mouseBounds.height);
			this.mouse.width = this.mouse.height = size;
		}, 100);
		
		playSound("maze", -1);
	}
	this.frame_2 = function() {
		this.instance_2.cache(0, 0, 1920, 1080);
		this.mazeContext = this.instance_2.cacheCanvas.getContext('2d');
		this.isAnimationPlaying = false;
		this.nextFrame = 3;
		
		setTimeout(() => {
			const cheeseBounds = this.cheese.getTransformedBounds();
			this.cheese.width = cheeseBounds.width;
			this.cheese.height = cheeseBounds.height;
		
			const mouseBounds = this.mouse.getTransformedBounds();
			const size = Math.min(mouseBounds.width, mouseBounds.height);
			this.mouse.width = this.mouse.height = size;
		}, 100);
		
		playSound("maze", -1);
	}
	this.frame_3 = function() {
		this.instance_3.cache(0, 0, 1920, 1080);
		this.mazeContext = this.instance_3.cacheCanvas.getContext('2d');
		this.isAnimationPlaying = false;
		this.nextFrame = 4;
		
		setTimeout(() => {
			const cheeseBounds = this.cheese.getTransformedBounds();
			this.cheese.width = cheeseBounds.width;
			this.cheese.height = cheeseBounds.height;
		
			const mouseBounds = this.mouse.getTransformedBounds();
			const size = Math.min(mouseBounds.width, mouseBounds.height);
			this.mouse.width = this.mouse.height = size;
		}, 100);
		
		playSound("maze", -1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(2));

	// mouse
	this.mouse = new lib.mouse_1();
	this.mouse.parent = this;
	this.mouse.setTransform(1579.3,771.3,0.789,0.789);

	this.timeline.addTween(cjs.Tween.get(this.mouse).wait(1).to({scaleX:0.22,scaleY:0.22,x:157.1,y:750.6},0).wait(1).to({x:472.5,y:631.8},0).wait(1).to({regX:0.4,scaleX:0.15,scaleY:0.15,x:62.5,y:587.5},0).to({_off:true},1).wait(1));

	// star
	this.target = new lib.target();
	this.target.parent = this;
	this.target.setTransform(1579.3,770.9,0.789,0.789);

	this.timeline.addTween(cjs.Tween.get(this.target).wait(1).to({regY:0.5,scaleX:0.22,scaleY:0.22,x:157.1,y:750.6},0).wait(1).to({x:472.5,y:631.9},0).wait(1).to({regX:0.4,regY:0.7,scaleX:0.15,scaleY:0.15,x:62.5,y:587.5},0).to({_off:true},1).wait(1));

	// cheese
	this.cheese = new lib.cheese_1();
	this.cheese.parent = this;
	this.cheese.setTransform(531.2,351.8,1.164,1.164,-28.7,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.cheese).wait(1).to({regX:0,regY:0,scaleX:0.34,scaleY:0.34,rotation:0,x:1587.5,y:328.3},0).wait(1).to({scaleX:0.26,scaleY:0.26,x:1810.2,y:79.6},0).wait(1).to({scaleX:0.2,scaleY:0.2,x:1849.4,y:269.6},0).to({_off:true},1).wait(1));

	// background
	this.instance = new lib.intro();
	this.instance.parent = this;

	this.instance_1 = new lib.maze1();
	this.instance_1.parent = this;

	this.instance_2 = new lib.maze2();
	this.instance_2.parent = this;

	this.instance_3 = new lib.maze3();
	this.instance_3.parent = this;

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#990000").ss(1,1,1).p("Eia3hZmME1vAAAMAAACzNMk1vAAAg");
	this.shape.setTransform(966.7,540.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Eia3BZmMAAAizMME1vAAAMAAACzMg");
	this.shape_1.setTransform(966.7,540.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(960,540,1920,1080);
// library properties:
lib.properties = {
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#666666",
	opacity: 1.00,
	webfonts: {},
	manifest: [
		{src:"images/cheese.png", id:"cheese"},
		{src:"images/intro.jpg", id:"intro"},
		{src:"images/maze1.jpg", id:"maze1"},
		{src:"images/maze2.jpg", id:"maze2"},
		{src:"images/maze3.jpg", id:"maze3"},
		{src:"images/mouse.png", id:"mouse"},
		{src:"images/star.png", id:"star"},
		{src:"sounds/maze.mp3", id:"maze"}
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;