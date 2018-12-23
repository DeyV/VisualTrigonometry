(function (TouchMath) {
	'use strict';
	
TouchMath.app.__STATE__ = [];
TouchMath.app.__STATE__['FUNC'] = 6;
TouchMath.app.__STATE__['ZOOM_ACTIVE'] = true;
TouchMath.app.__STATE__['GRAPH_ACTIVE'] = true;
TouchMath.app.__STATE__['SEC_OFFSET'] = 0.5;

TouchMath.app.returnDisplayObjs = function () {
	var displayObjs = {};
	
	displayObjs.graphs = {
		Y: TouchMath.graph({
			x: 101,
			y: 0,
			w: 344,
			h: 167,
			a: -10,
			b: 10,
			c: -5,
			d: 5
		}),
		DY: TouchMath.graph({
			x: 101,
			y: 165,
			w: 344,
			h: 167,
			a: -10,
			b: 10,
			c: -5,
			d: 5
		}),
		D2Y: TouchMath.graph({
			x: 101,
			y: 332,
			w: 344,
			h: 167,
			a: -10,
			b: 10,
			c: -5,
			d: 5
		}),
		zoom: TouchMath.graph({
			x: 605,
			y: 0,
			w: 419,
			h: 500,
			a: -1,
			b: 1,
			c: -1,
			d: 1
		})
	};
	
	displayObjs.dots = {
		Y: TouchMath.dot({
			x: 100,
			y: 83
		}),
		DY: TouchMath.dot({
			x: 100,
			y: 249
		}),
		D2Y: TouchMath.dot({
			x: 100,
			y: 415
		}),
		markDY: TouchMath.dot({
			x: 100,
			y: 83
		}),
		markD2Y: TouchMath.dot({
			x: 100,
			y: 249
		}),
		zoomC: TouchMath.dot({
			x: 815,
			y: 250
		}),
		zoomSec: TouchMath.dot({
			x: 0,
			y: 0
		})
	};
	
	displayObjs.strokes = {
		yUp: TouchMath.stroke({
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0
		}),
		yFore: TouchMath.stroke({
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0
		}),
		yTan: TouchMath.stroke({
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0
		}),
		yTanO: TouchMath.stroke({
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0
		}),
		sweepDY: TouchMath.stroke({
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0
		}),
		dyUp: TouchMath.stroke({
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0
		}),
		dyFore: TouchMath.stroke({
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0
		}),
		dyTan: TouchMath.stroke({
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0
		}),
		dyTanO: TouchMath.stroke({
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0
		}),
		sweepD2Y: TouchMath.stroke({
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0
		})
	};
	
	displayObjs.curves = {
		y: [],
		dy: [],
		d2y: []
	};
	displayObjs.curves.y[1] = TouchMath.curve({
  		func: function (x) { return x; },
  		color: TouchMath.RED
  	});
	displayObjs.curves.dy[1] = TouchMath.curve({
  		func: function (x) { return 1; },
  		color: TouchMath.RED_MED
  	});
	displayObjs.curves.d2y[1] = TouchMath.curve({
  		func: function (x) { return 0; },
  		color: TouchMath.RED_LIGHT
  	});
	
	displayObjs.curves.y[2] = TouchMath.curve({
  		func: function (x) { return x * x; },
  		color: TouchMath.ORANGE
  	});
	displayObjs.curves.dy[2] = TouchMath.curve({
  		func: function (x) { return 2 * x; },
  		color: TouchMath.ORANGE_MED
  	});
	displayObjs.curves.d2y[2] = TouchMath.curve({
  		func: function (x) { return 2; },
  		color: TouchMath.ORANGE_LIGHT
  	});

	displayObjs.curves.y[3] = TouchMath.curve({
  		func: function (x) { return x * x * x; },
  		color: TouchMath.YELLOW
  	});
	displayObjs.curves.dy[3] = TouchMath.curve({
  		func: function (x) { return 3 * x * x; },
  		color: TouchMath.YELLOW_MED
  	});
	displayObjs.curves.d2y[3] = TouchMath.curve({
  		func: function (x) { return 6 * x; },
  		color: TouchMath.YELLOW_LIGHT
  	});

  	displayObjs.curves.y[4] = TouchMath.curve({
  		func: function (x) { return 1 / x; },
  		color: TouchMath.GREEN
  	});
	displayObjs.curves.dy[4] = TouchMath.curve({
  		func: function (x) { return -1 / (x * x); },
  		color: TouchMath.GREEN_MED
  	});
	displayObjs.curves.d2y[4] = TouchMath.curve({
  		func: function (x) { return 2 / (x * x * x); },
  		color: TouchMath.GREEN_LIGHT
  	});
	
	displayObjs.curves.y[5] = TouchMath.curve({
		func: function (x) { return Math.log(x * x); },
		color: TouchMath.BLUE
	});
	displayObjs.curves.dy[5] = TouchMath.curve({
		func: function (x) { return 2 / x; },
		color: TouchMath.BLUE_MED
	});
	displayObjs.curves.d2y[5] = TouchMath.curve({
		func: function (x) { return -2 / (x * x); },
		color: TouchMath.BLUE_LIGHT
	});
	
	displayObjs.curves.y[6] = TouchMath.curve({
		func: function (x) { return Math.sin(x); },
		color: TouchMath.TEAL
	});
	displayObjs.curves.dy[6] = TouchMath.curve({
		func: function (x) { return Math.cos(x); },
		color: TouchMath.TEAL_MED
	});
	displayObjs.curves.d2y[6] = TouchMath.curve({
		func: function (x) { return -Math.sin(x); },
		color: TouchMath.TEAL_LIGHT
	});
	
	displayObjs.curves.y[7] = TouchMath.curve({
		func: function (x) { return Math.pow(Math.PI, x); },
		color: TouchMath.PURPLE
	});
	displayObjs.curves.dy[7] = TouchMath.curve({
		func: function (x) { return Math.pow(Math.PI, x) * Math.log(Math.PI); },
		color: TouchMath.PURPLE_MED
	});
	displayObjs.curves.d2y[7] = TouchMath.curve({
		func: function (x) { return Math.pow(Math.PI, x) * Math.pow(Math.log(Math.PI), 2); },
		color: TouchMath.PURPLE_LIGHT
	});
	
	displayObjs.curves.y[8] = TouchMath.curve({
		func: function (x) { return Math.pow(Math.E, x); },
		color: TouchMath.MAROON
	});
	displayObjs.curves.dy[8] = TouchMath.curve({
		func: function (x) { return Math.pow(Math.E, x); },
		color: TouchMath.MAROON_MED
	});
	displayObjs.curves.d2y[8] = TouchMath.curve({
		func: function (x) { return Math.pow(Math.E, x); },
		color: TouchMath.MAROON_LIGHT
	});
	
	displayObjs.curves.y[9] = TouchMath.curve({
		func: function (x) { return Math.asin(x); },
		color: TouchMath.PINK
	});
	displayObjs.curves.dy[9] = TouchMath.curve({
		func: function (x) { return 1 / Math.sqrt(1 - (x * x)); },
		color: TouchMath.PINK_MED
	});
	displayObjs.curves.d2y[9] = TouchMath.curve({
		func: function (x) { return x / Math.pow((1 - (x * x)), (3 / 2)); },
		color: TouchMath.PINK_LIGHT
	});
	
	displayObjs.curves.y[10] = TouchMath.curve({
		func: function (x) { return Math.sqrt(x); },
		color: TouchMath.BROWN
	});
	displayObjs.curves.dy[10] = TouchMath.curve({
		func: function (x) { return 1 / (2 * Math.sqrt(x)); },
		color: TouchMath.BROWN_MED
	});
	displayObjs.curves.d2y[10] = TouchMath.curve({
		func: function (x) { return -1 / (4 * Math.pow(x, (3 / 2))); },
		color: TouchMath.BROWN_LIGHT
	});
	
	displayObjs.boxes = {
		deltaX: TouchMath.box({
			x: 815,
			y: 0,
			w: 0,
			h: 500,
			bColor: 'rgba(255, 255, 255, 0)',
			fColor: 'rgba(200, 200, 200, 0.1)'
		}),
		deltaY: TouchMath.box({
			x: 605,
			y: 250,
			w: 419,
			h: 0,
			bColor: 'rgba(255, 255, 255, 0)',
			fColor: 'rgba(200, 200, 200, 0.1)'
		})
	};
	
	displayObjs.labels = {
		Y: TouchMath.label({
			x: 445,
			y: 4,
			w: 159,
			h: 159,
			url: '/images/topics/derivatives/question.png'
		}).create(),
		DY: TouchMath.label({
			x: 445,
			y: 170,
			w: 159,
			h: 159,
			url: '/images/topics/derivatives/question.png'
		}).create(),
		D2Y: TouchMath.label({
			x: 445,
			y: 336,
			w: 159,
			h: 159,
			url: '/images/topics/derivatives/question.png'
		}).create(),
		expY: TouchMath.label({
			x: 315,
			y: 6,
			w: 57,
			h: 34,
			url: '/images/topics/derivatives/y6-01.png'
		}).create(),
		expDY: TouchMath.label({
			x: 323,
			y: 173,
			w: 57,
			h: 32,
			url: '/images/topics/derivatives/dy6-01.png'
		}).create(),
		expD2Y: TouchMath.label({
			x: 328,
			y: 340,
			w: 57,
			h: 32,
			url: '/images/topics/derivatives/d2y6-01.png'
		}).create()
	};
	
	displayObjs.readouts = {
		X: TouchMath.readout({
			x: 646,
			y: 235,
			color: TouchMath.BLACK
		}).create(),
		Y: TouchMath.readout({
			x: 391,
			y: 9,
			color: TouchMath.TEAL
		}).create(),
		YOth: TouchMath.readout({
			x: 841,
			y: 462,
			color: TouchMath.TEAL
		}).create(),
		DY: TouchMath.readout({
			x: 400,
			y: 176,
			color: TouchMath.TEAL_MED
		}).create(),
		D2Y: TouchMath.readout({
			x: 404,
			y: 343,
			color: TouchMath.TEAL_LIGHT
		}).create(),
		deltaX: TouchMath.readout({
			x: 856,
			y: 3,
			color: TouchMath.GRAY_LIGHT
		}).create(),
		deltaY: TouchMath.readout({
			x: 977,
			y: 221,
			color: TouchMath.GRAY_LIGHT
		}).create()
	};
	
	return displayObjs;
};

TouchMath.app.mouseMoveAction = function (eventX, eventY, displayObjs) {
	var readouts  = displayObjs.readouts,
		graphs    = displayObjs.graphs,
		dots      = displayObjs.dots,
		strokes   = displayObjs.strokes,
		curves    = displayObjs.curves,
		boxes     = displayObjs.boxes,
		labels    = displayObjs.labels,
		
		realX,
		criticalNums,
		realY,
		realDY,
		realD2Y,
		deltaX,
		deltaY,
		secOffset = TouchMath.app.__STATE__['SEC_OFFSET'],
		
		currentFunc = TouchMath.app.__STATE__['FUNC'];
	
	TouchMath.clearCanvas();
	
	curves.y[currentFunc].draw(graphs.Y);
	curves.dy[currentFunc].draw(graphs.DY);
	curves.d2y[currentFunc].draw(graphs.D2Y);
	
	realX = (eventX - graphs.Y.getOrig().getX()) / graphs.Y.getXUnit();
	
	if (eventX < 100) {
		realX = 0;
		TouchMath.app.__STATE__['FUNC'] = Math.floor(eventY / 50) + 1;
		TouchMath.app.__STATE__['ZOOM_ACTIVE'] = true;
		
		currentFunc = TouchMath.app.__STATE__['FUNC'];
		
		readouts.Y.setColor(curves.y[currentFunc].getColor());
		readouts.YOth.setColor(curves.y[currentFunc].getColor());
		readouts.DY.setColor(curves.dy[currentFunc].getColor());
		readouts.D2Y.setColor(curves.d2y[currentFunc].getColor());
		
		labels.expY.setUrl('/images/topics/derivatives/y' + currentFunc + '-01.png');
		labels.expDY.setUrl('/images/topics/derivatives/dy' + currentFunc + '-01.png');
		labels.expD2Y.setUrl('/images/topics/derivatives/d2y' + currentFunc + '-01.png');
		labels.expY.update();
		labels.expDY.update();
		labels.expD2Y.update();
		
	} else if (eventX >= 445 && eventX <= 605) {
		realX = 0;
		TouchMath.app.__STATE__['ZOOM_ACTIVE'] = true;
	} else if (eventX > 605) {
		realX = 0;
		if (TouchMath.app.__STATE__['ZOOM_ACTIVE'] == true) {
			TouchMath.app.__STATE__['SEC_OFFSET'] = (815 - eventX) / graphs.zoom.getXUnit();
		}
	}
	
	realY = curves.y[currentFunc].call(realX);
	realDY = curves.dy[currentFunc].call(realX);
	realD2Y = curves.d2y[currentFunc].call(realX);
	
	graphs.zoom.setA(realX - 1);
	graphs.zoom.setB(realX + 1);
	graphs.zoom.setC(realY - 1);
	graphs.zoom.setD(realY + 1);
	curves.y[currentFunc].draw(graphs.zoom);
	
	dots.Y = TouchMath.point({
		x: realX,
		y: realY
	}).toDot(graphs.Y);
	
	dots.DY = TouchMath.point({
		x: realX,
		y: realDY
	}).toDot(graphs.DY);
	dots.DY.setColor(curves.dy[currentFunc].getColor());
	
	dots.D2Y = TouchMath.point({
		x: realX,
		y: realD2Y
	}).toDot(graphs.D2Y);
	dots.D2Y.setColor(curves.d2y[currentFunc].getColor());
	
	if (graphs.Y.containsDot(dots.Y)) {
		dots.Y.draw();
	}
	if (graphs.DY.containsDot(dots.DY)) {
		dots.DY.draw();
	}
	if (graphs.D2Y.containsDot(dots.D2Y)) {
		dots.D2Y.draw();
	}
	
	strokes.yUp.update(
		dots.Y.getX(),
		dots.Y.getY(),
		dots.Y.getX(),
		dots.Y.getY() - (realDY * graphs.Y.getYUnit())
	);
	strokes.yUp.setColor(curves.dy[currentFunc].getColor());
	strokes.yUp.draw(graphs.Y);
	
	strokes.yFore.update(
		dots.Y.getX(),
		dots.Y.getY() - (realDY * graphs.Y.getYUnit()),
		dots.Y.getX() + graphs.Y.getXUnit(),
		dots.Y.getY() - (realDY * graphs.Y.getYUnit())
	);
	strokes.yFore.setColor(TouchMath.GRAY);
	strokes.yFore.draw(graphs.Y);
	
	strokes.yTan.update(
		dots.Y.getX(),
		dots.Y.getY(),
		dots.Y.getX() + graphs.Y.getXUnit(),
		dots.Y.getY() - (realDY * graphs.Y.getYUnit())
	);
	strokes.yTan.draw(graphs.Y);
	
	strokes.yTanO.update(
		dots.Y.getX(),
		dots.Y.getY(),
		dots.Y.getX() - graphs.Y.getXUnit(),
		dots.Y.getY() + (realDY * graphs.Y.getYUnit())
	);
	strokes.yTanO.draw(graphs.Y);
	
	strokes.sweepDY.update(
		dots.DY.getX(),
		dots.DY.getY(),
		dots.DY.getX(),
		dots.DY.getY() + (realDY * graphs.Y.getYUnit())
	);
	strokes.sweepDY.setColor(curves.dy[currentFunc].getColor());
	strokes.sweepDY.draw(graphs.DY);
	
	strokes.dyUp.update(
		dots.DY.getX(),
		dots.DY.getY(),
		dots.DY.getX(),
		dots.DY.getY() - (realD2Y * graphs.DY.getYUnit())
	);
	strokes.dyUp.setColor(curves.d2y[currentFunc].getColor());
	strokes.dyUp.draw(graphs.DY);
	
	strokes.dyFore.update(
		dots.DY.getX(),
		dots.DY.getY() - (realD2Y * graphs.DY.getYUnit()),
		dots.DY.getX() + graphs.DY.getXUnit(),
		dots.DY.getY() - (realD2Y * graphs.DY.getYUnit())
	);
	strokes.dyFore.setColor(TouchMath.GRAY);
	strokes.dyFore.draw(graphs.DY);
	
	strokes.dyTan.update(
		dots.DY.getX(),
		dots.DY.getY(),
		dots.DY.getX() + graphs.DY.getXUnit(),
		dots.DY.getY() - (realD2Y * graphs.DY.getYUnit())
	);
	strokes.dyTan.setColor(TouchMath.GRAY_MED);
	strokes.dyTan.draw(graphs.DY);
	
	strokes.dyTanO.update(
		dots.DY.getX(),
		dots.DY.getY(),
		dots.DY.getX() - graphs.DY.getXUnit(),
		dots.DY.getY() + (realD2Y * graphs.DY.getYUnit())
	);
	strokes.dyTanO.setColor(TouchMath.GRAY_MED);
	strokes.dyTanO.draw(graphs.DY);
	
	strokes.sweepD2Y.update(
		dots.D2Y.getX(),
		dots.D2Y.getY(),
		dots.D2Y.getX(),
		dots.D2Y.getY() + (realD2Y * graphs.DY.getYUnit())
	);
	strokes.sweepD2Y.setColor(curves.d2y[currentFunc].getColor());
	strokes.sweepD2Y.draw(graphs.D2Y);
	
	dots.markDY.setX(dots.Y.getX());
	dots.markDY.setY(dots.Y.getY() - (realDY * graphs.Y.getYUnit()));
	dots.markDY.setColor(curves.dy[currentFunc].getColor());
	if (graphs.Y.containsDot(dots.markDY)) {
		dots.markDY.draw();
	}
	
	dots.markD2Y.setX(dots.DY.getX());
	dots.markD2Y.setY(dots.DY.getY() - (realD2Y * graphs.DY.getYUnit()));
	dots.markD2Y.setColor(curves.d2y[currentFunc].getColor());
	if (graphs.DY.containsDot(dots.markD2Y)) {
		dots.markD2Y.draw();
	}
	
	var zoomTan = TouchMath.curve({
		func: function (x) {
			var m  = curves.dy[currentFunc].call(realX),
				x1 = realX,
				y1 = realY;
			return (m * (x - x1)) + y1;
		},
		color: TouchMath.BLACK
	});
	zoomTan.draw(graphs.zoom);
	
	dots.zoomC.draw();
	
	dots.zoomSec = TouchMath.point({
		x: realX - secOffset,
		y: curves.y[currentFunc].call(realX - secOffset)
	}).toDot(graphs.zoom);
	dots.zoomSec.setColor(TouchMath.GRAY);
	dots.zoomSec.draw();
	
	var zoomSecLine = TouchMath.curve({
		func: function (x) {
			var x1 = realX,
				y1 = realY,
				x2 = realX - secOffset,
				y2 = curves.y[currentFunc].call(realX - secOffset),
				m  = TouchMath.slope(x1, y1, x2, y2);
			return (m * (x - x1)) + y1;
		},
		color: TouchMath.GRAY_LIGHT
	});
	zoomSecLine.draw(graphs.zoom);
	
	var trackA = TouchMath.stroke({
		x1: 605,
		y1: 0,
		x2: dots.Y.getX() - 18,
		y2: dots.Y.getY() - 22
	});
	trackA.setColor(TouchMath.GRAY_FAINT);
	trackA.draw(graphs.Y);
	
	var trackB = TouchMath.stroke({
		x1: 1024,
		y1: 0,
		x2: dots.Y.getX() + 18,
		y2: dots.Y.getY() - 22
	});
	trackB.setColor(TouchMath.GRAY_FAINT);
	trackB.draw(graphs.Y);
	
	var trackC = TouchMath.stroke({
		x1: 1024,
		y1: 500,
		x2: dots.Y.getX() + 18,
		y2: dots.Y.getY() + 22
	});
	trackC.setColor(TouchMath.GRAY_FAINT);
	trackC.draw(graphs.Y);
	
	var trackD = TouchMath.stroke({
		x1: 605,
		y1: 500,
		x2: dots.Y.getX() - 18,
		y2: dots.Y.getY() + 22
	});
	trackD.setColor(TouchMath.GRAY_FAINT);
	trackD.draw(graphs.Y);
	
	var boxTracker = TouchMath.box({
		x: dots.Y.getX() - 18,
		y: dots.Y.getY() - 22,
		w: 36,
		h: 44,
		bColor: TouchMath.GRAY_FAINT,
		fColor: 'rgba(255, 255, 255, 0)'
	});
	boxTracker.draw();
	
	boxes.deltaX.setW(dots.zoomSec.getX() - dots.zoomC.getX());
	boxes.deltaX.draw();
	boxes.deltaY.setH(dots.zoomSec.getY() - dots.zoomC.getY());
	boxes.deltaY.draw();
	
	deltaX = boxes.deltaX.getW() / graphs.zoom.getXUnit();
	deltaY = -boxes.deltaY.getH() / graphs.zoom.getYUnit();
	
	readouts.X.update(realX, 5);
	if (TouchMath.is_defined(realY)) {
		readouts.Y.update(realY, 4);
		readouts.YOth.update(realY, 4);
		readouts.DY.update(realDY, 4);
		readouts.D2Y.update(realD2Y, 4);
		readouts.deltaX.update(deltaX, 4);
		readouts.deltaY.update(deltaY, 4);
	} else {
		readouts.Y.update(String.fromCharCode(8734), 4);
		readouts.YOth.update(String.fromCharCode(8734), 4);
		readouts.DY.update(String.fromCharCode(8734), 4);
		readouts.D2Y.update(String.fromCharCode(8734), 4);
		readouts.deltaX.update(String.fromCharCode(8734), 4);
		readouts.deltaY.update(String.fromCharCode(8734), 3);
	}
	
	if (!TouchMath.is_defined(realY)) {
		labels.Y.setUrl('/images/topics/derivatives/undef.png');
		labels.DY.setUrl('/images/topics/derivatives/undef.png');
		labels.D2Y.setUrl('/images/topics/derivatives/undef.png');
	} else {
		if (realDY > 0) {
			labels.DY.setUrl('/images/topics/derivatives/plus.png');
			if (realD2Y > 0) {
				labels.D2Y.setUrl('/images/topics/derivatives/plus.png');
				labels.Y.setUrl('/images/topics/derivatives/inc_up.png');
			} else if (realD2Y < 0) {
				labels.D2Y.setUrl('/images/topics/derivatives/minus.png');
				labels.Y.setUrl('/images/topics/derivatives/inc_down.png');
			} else if (realD2Y == 0) {
				labels.D2Y.setUrl('/images/topics/derivatives/zero.png');
				labels.Y.setUrl('/images/topics/derivatives/inflec_inc.png');
			}
		} else if (realDY < 0) {
			labels.DY.setUrl('/images/topics/derivatives/minus.png');
			if (realD2Y > 0) {
				labels.D2Y.setUrl('/images/topics/derivatives/plus.png');
				labels.Y.setUrl('/images/topics/derivatives/dec_up.png');
			} else if (realD2Y < 0) {
				labels.D2Y.setUrl('/images/topics/derivatives/minus.png');
				labels.Y.setUrl('/images/topics/derivatives/dec_down.png');
			} else if (realD2Y == 0) {
				labels.D2Y.setUrl('/images/topics/derivatives/zero.png');
				labels.Y.setUrl('/images/topics/derivatives/inflec_dec.png');
			}
		} else if (realDY == 0) {
			labels.DY.setUrl('/images/topics/derivatives/zero.png');
			if (realD2Y > 0) {
				labels.D2Y.setUrl('/images/topics/derivatives/plus.png');
				labels.Y.setUrl('/images/topics/derivatives/min.png');
			} else if (realD2Y < 0) {
				labels.D2Y.setUrl('/images/topics/derivatives/minus.png');
				labels.Y.setUrl('/images/topics/derivatives/max.png');
			} else if (realD2Y == 0) {
				labels.D2Y.setUrl('/images/topics/derivatives/zero.png');
				labels.Y.setUrl('/images/topics/derivatives/flat.png');
			}
		}
	}
	labels.Y.update();
	labels.DY.update();
	labels.D2Y.update();
};

TouchMath.app.touchMoveAction = function (eventX, eventY, displayObjs) {
	TouchMath.app.mouseMoveAction(eventX, eventY, displayObjs);
};

TouchMath.app.mouseDownAction = function (eventX, eventY, displayObjs) {
	
};

TouchMath.app.mouseUpAction = function (eventX, eventY, displayObjs) {
	
};

TouchMath.app.clickAction = function (eventX, eventY, displayObjs) {
	if (eventX < 100) {
		
	} else if (eventX >= 445 && eventX <= 605) {
		if (TouchMath.app.__STATE__['GRAPH_ACTIVE'] == true) {
			TouchMath.app.__STATE__['GRAPH_ACTIVE'] = false;
		} else {
			TouchMath.app.__STATE__['GRAPH_ACTIVE'] = true;
		}
	} else if (eventX > 605) {
		if (TouchMath.app.__STATE__['ZOOM_ACTIVE'] == true) {
			TouchMath.app.__STATE__['ZOOM_ACTIVE'] = false;
		} else {
			TouchMath.app.__STATE__['ZOOM_ACTIVE'] = true;
		}
	}
};

TouchMath.app.bgImgUrl = function () {
	return '/images/topics/derivatives/main-01.png';
};

})(window.TouchMath);

$(document).ready(function () {
	'use strict';	
	window.TouchMath.init(window.TouchMath.app.returnDisplayObjs());	
});