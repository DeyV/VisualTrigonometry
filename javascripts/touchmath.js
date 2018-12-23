//
// Touch Mathematics JavaScript library v1.0
// http://touchmath.org
// 
// Copyright 2011, Matthew Trost
// Licensed under the MIT license.
//
//

(function (window) {
	"use strict";
	
var $ = window.$,
TouchMath = window.TouchMath = {};

TouchMath.app = {};

//
// //
// // //
// // // //
// // // // //

//
//
// CONSTANTS
//
//

TouchMath.CANVAS_ID    = '#canvas';
TouchMath.STAGE_ID     = '#canvas-stage';
TouchMath.STAGE_WIDTH  = 1024;
TouchMath.STAGE_HEIGHT = 500;

TouchMath.TOP_OFFSET   = 35;
TouchMath.LEFT_OFFSET  = 0;

TouchMath.WHITE	= '#FFFFFF';
TouchMath.BLACK	= '#000000';

TouchMath.GRAY_FAINT	= '#EEEEEE';
TouchMath.GRAY_LIGHT	= '#CCCCCC';
TouchMath.GRAY	= '#999999';
TouchMath.GRAY_MED	= '#666666';
TouchMath.GRAY_DARK	= '#333333';

TouchMath.GREEN = '#33CC00';
TouchMath.GREEN_MED = '#66DD22';
TouchMath.GREEN_LIGHT = '#99EE55';

TouchMath.ORANGE = '#FF9900';
TouchMath.ORANGE_MED = '#FFAA66';
TouchMath.ORANGE_LIGHT = '#FFCC99';

TouchMath.PURPLE = '#9933CC';
TouchMath.PURPLE_MED = '#BB55DD';
TouchMath.PURPLE_LIGHT = '#DD77EE';

TouchMath.BLUE = '#3366CC';
TouchMath.BLUE_MED = '#5599DD';
TouchMath.BLUE_LIGHT = '#77BBEE';

TouchMath.RED = '#FF0000';
TouchMath.RED_MED = '#FF6666';
TouchMath.RED_LIGHT = '#FFBBBB';

TouchMath.TEAL = '#009999';
TouchMath.TEAL_MED = '#22BBBB';
TouchMath.TEAL_LIGHT = '#44DDDD';

TouchMath.PINK = '#FF3399';
TouchMath.PINK_MED = '#FF55BB';
TouchMath.PINK_LIGHT = '#FF77DD';

TouchMath.MAROON = '#990033';
TouchMath.MAROON_MED = '#BB2255';
TouchMath.MAROON_LIGHT = '#DD4477';

TouchMath.YELLOW = '#CC9933';
TouchMath.YELLOW_MED = '#DDAA55';
TouchMath.YELLOW_LIGHT = '#EEBB77';

TouchMath.BROWN = '#996600';
TouchMath.BROWN_MED = '#BB9922';
TouchMath.BROWN_LIGHT = '#DDCC44';

TouchMath.STROKE_WIDTH   = 1;
TouchMath.PLOT_PT_RADIUS = 3;

TouchMath.READOUT_ELEMENT_CLASS = 'readout';
TouchMath.READOUT_DEFAULT_TEXT  = '?';
TouchMath.TYPEFACE              = 'Garamond';
TouchMath.FONTSIZE              = '18px';

TouchMath.LABEL_ELEMENT_CLASS = 'label';

//
//
// JAVASCRIPT ENHANCEMENTS
//
//

function typeOf (value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (typeof value.length === 'number' &&
                !(value.propertyIsEnumerable('length')) &&
                typeof value.splice === 'function') {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
}


//
//
// EVENT HANDLERS 
//
//

TouchMath.clickHandler = function (event, displayObjs) {
	var mouseX, mouseY;
	if (event.offsetX) {
		mouseX = event.offsetX;
		mouseY = event.offsetY;
	} else if (event.layerX) {
		mouseX = event.layerX;
		mouseY = event.layerY;
	}
	mouseX = (mouseX < TouchMath.STAGE_WIDTH) ? mouseX : TouchMath.STAGE_WIDTH;
	mouseY = (mouseY < TouchMath.STAGE_HEIGHT) ? mouseY : TouchMath.STAGE_HEIGHT;
	mouseX = (mouseX > 0) ? mouseX : 0;
	mouseY = (mouseY > 0) ? mouseY : 0;
	TouchMath.app.clickAction(mouseX, mouseY, displayObjs);
};

TouchMath.mouseDownHandler = function (event, displayObjs) {
	var mouseX, mouseY;
	if (event.offsetX) {
		mouseX = event.offsetX;
		mouseY = event.offsetY;
	} else if (event.layerX) {
		mouseX = event.layerX;
		mouseY = event.layerY;
	}
	mouseX = (mouseX < TouchMath.STAGE_WIDTH) ? mouseX : TouchMath.STAGE_WIDTH;
	mouseY = (mouseY < TouchMath.STAGE_HEIGHT) ? mouseY : TouchMath.STAGE_HEIGHT;
	mouseX = (mouseX > 0) ? mouseX : 0;
	mouseY = (mouseY > 0) ? mouseY : 0;
	TouchMath.app.mouseDownAction(mouseX, mouseY, displayObjs);
};

TouchMath.mouseUpHandler = function (event, displayObjs) {
	var mouseX, mouseY;
	if (event.offsetX) {
		mouseX = event.offsetX;
		mouseY = event.offsetY;
	} else if (event.layerX) {
		mouseX = event.layerX;
		mouseY = event.layerY;
	}
	mouseX = (mouseX < TouchMath.STAGE_WIDTH) ? mouseX : TouchMath.STAGE_WIDTH;
	mouseY = (mouseY < TouchMath.STAGE_HEIGHT) ? mouseY : TouchMath.STAGE_HEIGHT;
	mouseX = (mouseX > 0) ? mouseX : 0;
	mouseY = (mouseY > 0) ? mouseY : 0;
	TouchMath.app.mouseUpAction(mouseX, mouseY, displayObjs);
};

TouchMath.touchMoveHandler = function (event, displayObjs) {
	event.preventDefault();
	
	var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0],
		touchX = touch.pageX - TouchMath.LEFT_OFFSET,
		touchY = touch.pageY - TouchMath.TOP_OFFSET;
	
	touchX = (touchX < TouchMath.STAGE_WIDTH) ? touchX : TouchMath.STAGE_WIDTH;
	touchY = (touchY < TouchMath.STAGE_HEIGHT) ? touchY : TouchMath.STAGE_HEIGHT;
	touchX = (touchX > 0) ? touchX : 0;
	touchY = (touchY > 0) ? touchY : 0;
	
	TouchMath.app.touchMoveAction(touchX, touchY, displayObjs);
};

TouchMath.mouseMoveHandler = function (event, displayObjs) {
	var mouseX, mouseY;
	
	if (event.offsetX) {
		mouseX = event.offsetX;
		mouseY = event.offsetY;
	} else if (event.layerX) {
		mouseX = event.layerX;
		mouseY = event.layerY;
	}
	
	mouseX = (mouseX < TouchMath.STAGE_WIDTH) ? mouseX : TouchMath.STAGE_WIDTH;
	mouseY = (mouseY < TouchMath.STAGE_HEIGHT) ? mouseY : TouchMath.STAGE_HEIGHT;
	mouseX = (mouseX > 0) ? mouseX : 0;
	mouseY = (mouseY > 0) ? mouseY : 0;
	
	TouchMath.app.mouseMoveAction(mouseX, mouseY, displayObjs);
};

//
//
// DISPLAY UTILITIES
//
//

TouchMath.initCanvas = function (canvas) {
	canvas.attr('width', TouchMath.STAGE_WIDTH);
	canvas.attr('height', TouchMath.STAGE_HEIGHT);
	canvas.attr('style',
		'position: relative;' +
		'border: 0px;' +
		'background: url("' + TouchMath.app.bgImgUrl() + '") no-repeat scroll 0 0 #FFFFFF;');
};

TouchMath.getStage = function () {
	return $(TouchMath.STAGE_ID);
};

TouchMath.getCanvas = function () {
	return $(TouchMath.CANVAS_ID);
};

TouchMath.getContext = function () {
	var canvas = TouchMath.getCanvas();
	return canvas[0].getContext('2d');
};

TouchMath.clearCanvas = function () {
	var canvas = TouchMath.getCanvas(),
		context = TouchMath.getContext();
	context.clearRect(0, 0, canvas.width(), canvas.height());
};

//
//
// GENERAL INITIALIZATION
//
//

TouchMath.init = function (displayObjs) {
	var canvas = TouchMath.getCanvas();
	TouchMath.initCanvas(canvas);
	canvas.bind({
		mousemove: function (event) {
			TouchMath.mouseMoveHandler(event, displayObjs);
		},
		touchmove: function (event) {
			TouchMath.touchMoveHandler(event, displayObjs);
		},
		mousedown: function (event) {
			TouchMath.mouseDownHandler(event, displayObjs);
		},
		mouseup: function (event) {
			TouchMath.mouseUpHandler(event, displayObjs);
		},
		click: function (event) {
			TouchMath.clickHandler(event, displayObjs);
		}
	});
};

//
//
// MATH FUNCTIONS
//
//

TouchMath.is_defined = function (value) {
	if (isNaN(value)) {
		return false;
	} else if (value === Infinity) {
		return false;
	} else if (value === -Infinity) {
		return false;
	} else if (value === Number.POSITIVE_INFINITY) {
		return false;
	} else if (value === Number.NEGATIVE_INFINITY) {
		return false;
	} else if (value === null) {
		return false;
	} else if (typeof value === 'undefined') {
		return false;
	} else if (typeof value !== 'number') {
		return false;
	} else {
		return true;
	}
}

TouchMath.slope = function (x1, y1, x2, y2) {
	// Compute the slope of the line that joins two coordinate pairs.
	//
	return (y2 - y1) / (x2 - x1);
};

TouchMath.dot_product = function (A, B) {
	// Compute the dot product, given two points.
	//
	return (A.getX() * B.getX()) + (A.getY() * B.getY());
};

TouchMath.cross_product = function (A, B) {
	// Compute the cross product, given two points.
	//
	return (A.getX() * B.getY()) - (B.getX() * A.getY());
};

TouchMath.intersect = function (A, B, C, D) {
	// Calculate the intersect point of two lines AB and CD. Supply each
	// point separately. The point of intersection is returned if such an
	// intersection is detected. If not, `false` is returned.
	//
	var P = TouchMath.point({
			x: A.getX(),
			y: A.getY()
		}),
		R = TouchMath.point({
			x: B.getX() - A.getX(),
			y: B.getY() - A.getY()
		}),
		Q = TouchMath.point({
			x: C.getX(),
			y: C.getY()
		}),
		S = TouchMath.point({
			x: D.getX() - C.getX(),
			y: D.getY() - C.getY()
		}),
		
		crossRS = TouchMath.cross_product(R, S),
		
		minusQP = TouchMath.point({
			x: Q.getX() - P.getX(),
			y: Q.getY() - P.getY()
		}),
		
		t = TouchMath.cross_product(minusQP, S) / crossRS,
		u = TouchMath.cross_product(minusQP, R) / crossRS;
		
	if (u >= 0 && u <= 1 &&
		t >= 0 && t <= 1) {
			
		var M = TouchMath.point({
				x: R.getX() * t,
				y: R.getY() * t
			});
			
		return TouchMath.point({
				x: P.getX() + M.getX(),
				y: P.getY() + M.getY()
			});
		
	} else {
		return false;
	}
};

TouchMath.interpolate_polynom = function (xAry, yAry) {
	var n,
		j,
		k,
		sum,
		prod;
	
	if (typeOf(xAry) === 'array' &&
		typeOf(yAry) === 'array') {
		
		n = xAry.length;
		
		return function (x) {
			sum = 0;
			for (j = 0; j < n; j += 1) {		
				prod = 1;
				for (k = 0; k < n; k += 1) {
					if (k != j) {
					 	prod = prod * ((x - xAry[k]) / (xAry[j] - xAry[k]));
					}
				}
				sum = sum + (yAry[j] * prod);
			}
			return sum;
		};
	} else {
		return undefined;
	}
};

//
//
// MATH OBJECTS
//
//

TouchMath.func = function (spec) {
	var that = {};
	
	that.getFunc = function () { return spec.func; };
	
	that.call = function (x) {
		return that.getFunc()(x); 
	};
	
	return that;
};

TouchMath.line = function (spec) {
	var that = {};
	
	that.getX1 = function () { return spec.x1; };
	that.getY1 = function () { return spec.y1; };
	that.getX2 = function () { return spec.x2; };
	that.getY2 = function () { return spec.y2; };

	var A = TouchMath.point({
			x: that.getX1(),
			y: that.getY1(),
		}),

		B = TouchMath.point({
			x: that.getX2(),
			y: that.getY2(),
		});

	that.getA = function () { return A; };
	that.getB = function () { return B; };
	
	that.slope = function () {
		return TouchMath.slope(
			that.getX1(),
			that.getY1(),
			that.getX2(),
			that.getY2());
	};
	
	that.intersectWith = function (line) {
		return TouchMath.intersect(
			that.getA(),
			that.getB(),
			line.getA(),
			line.getB());
	};
	
	that.toFunc = function (graph) {
		return TouchMath.func({
			func: function (x) {
				return that.slope * (x - that.getX1()) + that.getY1();
			}
		});
	};
	
	that.toStroke = function (graph) {
		var cnvA = that.getA().toDot(graph),
			cnvB = that.getB().toDot(graph);
		
		return TouchMath.stroke({
			x1: cnvA.getX1(),
			y1: cnvA.getY1(),
			x2: cnvB.getX2(),
			y2: cnvB.getY2()
		});
	};
	
	return that;
};

TouchMath.point = function (spec) {
	var that = {};

	that.getX = function () { return spec.x; };
	that.getY = function () { return spec.y; };

	that.toDot = function (graph) {
		return TouchMath.dot({
			x: graph.getOrig().getX() + that.getX() * graph.getXUnit(),
			y: graph.getOrig().getY() - that.getY() * graph.getYUnit()
		});
	};

	return that;
};

//
//
// DISPLAY OBJECTS
//
//

TouchMath.box = function (spec) {
	var that = {};
	
	spec.bColor = spec.bColor || TouchMath.BLACK;
	spec.fColor = spec.fColor || TouchMath.WHITE;
	
	that.getX = function () { return spec.x; };
	that.getY = function () { return spec.y; };
	that.getW = function () { return spec.w; };
	that.getH = function () { return spec.h; };
	that.getBColor = function () { return spec.bColor; };
	that.getFColor = function () { return spec.fColor; };
	
	that.setX = function (x) { spec.x = x; };
	that.setY = function (y) { spec.y = y; };
	that.setW = function (w) { spec.w = w; };
	that.setH = function (h) { spec.h = h; };
	that.setBColor = function (color) { spec.bColor = color; };
	that.setFColor = function (color) { spec.fColor = color; };
	
	that.draw = function () {
		var context = TouchMath.getContext();
		context.lineWidth = TouchMath.STROKE_WIDTH;
		context.strokeStyle = that.getBColor();
		context.fillStyle = that.getFColor();
		context.fillRect(that.getX(), that.getY(), that.getW(), that.getH());
		context.strokeRect(that.getX(), that.getY(), that.getW(), that.getH());
		
		return that;
	};
	
	return that;
}

TouchMath.curve = function (spec) {
	var that = {};
	
	spec.color = spec.color || TouchMath.BLACK;
	
	that.getFunc = function () { return spec.func; };
	that.getColor = function () { return spec.color; };
	
	that.call = function (x) {
		return that.getFunc()(x); 
	};
	
	that.draw = function (boundGraph) {
		var context = TouchMath.getContext(),
		
			steps = boundGraph.getW(),
			a 	  = boundGraph.getA(),
			c     = boundGraph.getC(),
			d     = boundGraph.getD(),
			xUnit = boundGraph.getXUnit(),
			yUnit = boundGraph.getYUnit(),
			lEndP = boundGraph.getX(),
			origY = boundGraph.getOrig().getY(),
			
			x1, y1, x2, y2,
			x1Plot, y1Plot, x2Plot, y2Plot,
			
			i;
		
		context.beginPath();
		
		for (i = 0; i < steps; i += 1) {
			x1 = a + (i / xUnit);
			y1 = that.call(x1);
			
			// Only set up this segment of the stroke if the Y-value is defined.
			// 
			if (TouchMath.is_defined(y1)) {
				x2 = a + ((i + 1) / xUnit);
				y2 = that.call(x2);
				
				if (TouchMath.is_defined(y2)) {
					
					if (y1 < d &&
						y1 > c &&
						y2 < d &&
						y2 > c) {
						
						x1Plot = lEndP + i;
						y1Plot = origY - y1 * yUnit;
						x2Plot = lEndP + (i + 1);
						y2Plot = origY - y2 * yUnit;
		
						context.moveTo(x1Plot, y1Plot);
						context.lineTo(x2Plot, y2Plot);
					}
				}
			}
		}
		context.strokeStyle = that.getColor();
		context.lineWidth = TouchMath.STROKE_WIDTH;
		context.stroke();
	};
	
	return that;
};

TouchMath.stroke = function (spec) {
	var that = {};
	
	spec.color = spec.color || TouchMath.BLACK;

	that.getX1 = function () { return spec.x1; };
	that.getY1 = function () { return spec.y1; };
	that.getX2 = function () { return spec.x2; };
	that.getY2 = function () { return spec.y2; };
	that.getColor = function () { return spec.color; };
	
	that.getA = function () { 
		return TouchMath.dot({
			x: that.getX1(),
			y: that.getY1(),
			color: that.getColor()
		});
	};
	that.getB = function () { 
		return TouchMath.dot({
			x: that.getX2(),
			y: that.getY2(),
			color: that.getColor()
		}); 
	};

	that.setX1 = function (val) { spec.x1 = val; };
	that.setY1 = function (val) { spec.y1 = val; };
	that.setX2 = function (val) { spec.x2 = val; };
	that.setY2 = function (val) { spec.y2 = val; };
	that.setA = function(x, y) { that.getA().setX(x); that.getA().setY(y); };
	that.setB = function(x, y) { that.getB().setX(x); that.getB().setY(y); };
	that.setColor = function (color) { spec.color = color; };
	
	that.update = function (x1, y1, x2, y2) {
		that.setX1(x1);
		that.setY1(y1);
		that.setX2(x2);
		that.setY2(y2);
		that.setA(x1, y1);
		that.setB(x2, y2);
	};
	
	that.draw = function (graph) {
		var context = TouchMath.getContext();
		context.beginPath();
	
		// If a graph is provided, only draw the line within the bounds
		// of the graph. To do so, detect where the line intersects the
		// boundaries, and only draw that portion of the line.
		// 
		if (graph) {
			var Ax = graph.getX(),
				Ay = graph.getY(),
				Bx = graph.getTail().getX(),
				By = graph.getY(),
				Cx = graph.getTail().getX(),
				Cy = graph.getTail().getY(),
				Dx = graph.getX(),
				Dy = graph.getTail().getY(),
		
				AB = TouchMath.line({
					x1: Ax,
					y1: Ay,
					x2: Bx,
					y2: By
				}),
				BC = TouchMath.line({
					x1: Bx,
					y1: By,
					x2: Cx,
					y2: Cy
				}),
				CD = TouchMath.line({
					x1: Cx,
					y1: Cy,
					x2: Dx,
					y2: Dy
				}),
				DA = TouchMath.line({
					x1: Dx,
					y1: Dy,
					x2: Ax,
					y2: Ay
				});
		
			// If an intersect is detected, the point of intersection is
			// returned and stored in the var. If none is detected,
			// `false` is returned.
			// 
			var iAB = that.intersectWith(AB),
				iBC = that.intersectWith(BC),
				iCD = that.intersectWith(CD),
				iDA = that.intersectWith(DA);
		
			if (iAB) {
				context.moveTo(iAB.getX(), iAB.getY());
				if (iBC) {
					context.lineTo(iBC.getX(), iBC.getY());
				} else if (iCD) {
					context.lineTo(iCD.getX(), iCD.getY());
				} else if (iDA) {
					context.lineTo(iDA.getX(), iDA.getY());
				} else {
					if (that.getY1() >= iAB.getY()) {
						context.lineTo(that.getX1(), that.getY1());
					} else {
						context.lineTo(that.getX2(), that.getY2());
					}
				}
			} else if (iBC) {
				context.moveTo(iBC.getX(), iBC.getY());
				if (iAB) {
					context.lineTo(iAB.getX(), iAB.getY());
				} else if (iCD) {
					context.lineTo(iCD.getX(), iCD.getY());
				} else if (iDA) {
					context.lineTo(iDA.getX(), iDA.getY());
				} else {
					if (that.getX1() <= iBC.getX()) {
						context.lineTo(that.getX1(), that.getY1());
					} else {
						context.lineTo(that.getX2(), that.getY2());
					}
				}
			} else if (iCD) {
				context.moveTo(iCD.getX(), iCD.getY());
				if (iAB) {
					context.lineTo(iAB.getX(), iAB.getY());
				} else if (iBC) {
					context.lineTo(iBC.getX(), iBC.getY());
				} else if (iDA) {
					context.lineTo(iDA.getX(), iDA.getY());
				} else {
					if (that.getY1() <= iCD.getY()) {
						context.lineTo(that.getX1(), that.getY1());
					} else {
						context.lineTo(that.getX2(), that.getY2());
					}
				}
			} else if (iDA) {
				context.moveTo(iDA.getX(), iDA.getY());
				if (iAB) {
					context.lineTo(iAB.getX(), iAB.getY());
				} else if (iBC) {
					context.lineTo(iBC.getX(), iBC.getY());
				} else if (iCD) {
					context.lineTo(iCD.getX(), iCD.getY());
				} else {
					if (that.getX1() >= iDA.getX()) {
						context.lineTo(that.getX1(), that.getY1());
					} else {
						context.lineTo(that.getX2(), that.getY2());
					}
				}
			} else {
				// If no intersection is detected, verify the line is
				// contained entirely by the bounding graph, and if so,
				// draw it.
				//
				if (that.getX1() >= DA.getX1() &&
					that.getX1() <= BC.getX1() &&
					that.getX2() >= DA.getX1() &&
					that.getX2() <= BC.getX1() &&
					that.getY1() >= AB.getY1() &&
					that.getY1() <= CD.getY1() &&
					that.getY2() >= AB.getY1() &&
					that.getY2() <= CD.getY1()) {
				
					context.moveTo(that.getX1(), that.getY1());
					context.lineTo(that.getX2(), that.getY2());
				}
			}
		} else {
			// If no graph is provided, just draw the line on the canvas.
			// 
			context.moveTo(that.getX1(), that.getY1());
			context.lineTo(that.getX2(), that.getY2());
		}
	
		context.strokeStyle = that.getColor();
		context.lineWidth = TouchMath.STROKE_WIDTH;
		context.stroke();
		
		return that;
	};

	that.drawA = function () {
		that.getA().draw();
		return that;
	};

	that.drawB = function () {
		that.getB().draw();
		return that;
	};

	that.drawDots = function () {
		that.drawA();
		that.drawB();
		return that;
	};
	
	that.drawWithDots = function (graph) {
		if (graph) {
			that.draw(graph);
		} else {
			that.draw();
		}
		that.drawDots();
		return that;
	};
	
	that.intersectWith = function (stroke) {
		return TouchMath.intersect(
			that.getA(),
			that.getB(),
			stroke.getA(),
			stroke.getB());
	};

	return that;
};

TouchMath.dot = function (spec) {
	var that = {};
	
	spec.color = spec.color || TouchMath.BLACK;

	that.getX = function () { return spec.x; };
	that.getY = function () { return spec.y; };
	that.getColor = function () { return spec.color; };

	that.setX = function (x) { spec.x = x; };
	that.setY = function (y) { spec.y = y; };
	that.setColor = function (color) { spec.color = color; };

	that.toPoint = function (graph) {
		return TouchMath.point({
			x: (that.getX() - graph.getOrig().getX()) / graph.getXUnit(),
			y: (graph.getOrig().getY() - that.getY()) / graph.getYUnit()
		});
	};

	that.draw = function () {
		// Only draw this dot if its x- and y-coordinates are defined.
		// 
		var x = that.getX(),
			y = that.getY();
	
		if (x >= 0 &&
			y >= 0 &&
			x <= TouchMath.STAGE_WIDTH &&
			y <= TouchMath.STAGE_HEIGHT) {
	
			var context = TouchMath.getContext();
			context.beginPath();
			context.arc(x, y, TouchMath.PLOT_PT_RADIUS, 0, Math.PI * 2, true);
			context.fillStyle = that.getColor();
			context.fill();	
		}
		
		return that;
	};

	that.move = function (x, y) {
		that.setX(x);
		that.setY(y);
		return that;
	};

	that.shade = function (color) {
		that.setColor(color);
		return that;
	};

	that.update = function (x, y, color) {
		that.move(x, y);
		that.shade(color);
		return that;
	};

	return that;
};

TouchMath.graph = function (spec) {
	var that = {};

	that.getX = function () { return spec.x; };
	that.getY = function () { return spec.y; };
	that.getW = function () { return spec.w; };
	that.getH = function () { return spec.h; };
	that.getA = function () { return spec.a; };
	that.getB = function () { return spec.b; };
	that.getC = function () { return spec.c; };
	that.getD = function () { return spec.d; };

	that.getXUnit = function () { return that.getW() / Math.abs((that.getB() - that.getA())); };
	that.getYUnit = function () { return that.getH() / Math.abs((that.getD() - that.getC())); };
	
	that.getTail = function () { 
		return TouchMath.dot({
			x: that.getX() + that.getW(),
			y: that.getY() + that.getH()
		}); 
	};
	
	that.getOrig = function () { 
		return TouchMath.dot({
			x: that.getX() - (that.getA() * that.getXUnit()),
			y: that.getY() + (that.getD() * that.getYUnit())
		});
	};
	
	that.setX = function (x) { spec.x = x; };
	that.setY = function (y) { spec.y = y; };
	that.setW = function (w) { spec.w = w; };
	that.setH = function (h) { spec.h = h; };
	that.setA = function (a) { spec.a = a; };
	that.setB = function (b) { spec.b = b; };
	that.setC = function (c) { spec.c = c; };
	that.setD = function (d) { spec.d = d; };

	that.containsDot = function (activeDot) {
		if (activeDot.getX() >= that.getX() &&
			activeDot.getX() <= that.getTail().getX() &&
			activeDot.getY() >= that.getY() &&
			activeDot.getY() <= that.getTail().getY()) {
		
			return true;
		} else {
			return false;
		}
	};

	that.containsPoint = function (activePoint) {
		if (activePoint.getX() >= that.getA() &&
			activePoint.getX() <= that.getB() &&
			activePoint.getY() >= that.getC() &&
			activePoint.getY() <= that.getD()) {
		
			return true;
		} else {
			return false;
		}
	};

	return that;
};

TouchMath.readout = function (spec) {
	var that = {};
	
	spec.color = spec.color || '#000000';
	spec.id = spec.id || 'readout-' + ($('.' + TouchMath.READOUT_ELEMENT_CLASS).length + 1);

	that.getX = function () { return spec.x; };
	that.getY = function () { return spec.y; };
	that.getColor = function () { return spec.color; };
	that.getId = function () { return spec.id; };
	
	that.setX = function (x) { 
		spec.x = x;
		$('#' + that.getId()).remove();
		that.create();
	};
	that.setY = function (y) { 
		spec.y = y;
		$('#' + that.getId()).remove();
		that.create();
	};
	that.setColor = function (color) { 
		spec.color = color;
		$('#' + that.getId()).remove();
		that.create();
	};

	that.create = function () {
		var id = that.getId(),
			idLoc = '#' + id;
		if ($(idLoc).length <= 0) {
			TouchMath.getStage().append('<div ' +
							  'class="' + TouchMath.READOUT_ELEMENT_CLASS + '" ' +
							  'id="' + id + '">' +
							  TouchMath.READOUT_DEFAULT_TEXT + '</div>');
			$(idLoc).attr('unselectable', 'on');
			$(idLoc).attr('style', 'position: absolute;' +
	    					          'left: ' 	      + that.getX()      + 'px; ' +
	    					          'top: '		  + that.getY()      + 'px; ' +
	    					          'color: '       + that.getColor()  + '; ' +
	    					          'font-family: ' + TouchMath.TYPEFACE      + '; ' +
	    					          'font-size: '   + TouchMath.FONTSIZE      + ';');
		}
		return that;
	};
	
	that.update = function (message, limit) {
		$('#' + that.getId()).text(new String(message).substring(0, 0 + limit));
		return that;
	};

	return that;
};

TouchMath.label = function (spec) {
	var that = {};
	
	spec.id = spec.id || 'label-' + ($('.' + TouchMath.LABEL_ELEMENT_CLASS).length + 1);
	
	that.getX = function () { return spec.x; };
	that.getY = function () { return spec.y; };
	that.getW = function () { return spec.w; };
	that.getH = function () { return spec.h; };
	that.getId = function () { return spec.id; };
	that.getUrl = function () { return spec.url; };
	
	that.setX = function (x) { spec.x = x; };
	that.setY = function (y) { spec.y = y; };
	that.setW = function (w) { spec.w = w; };
	that.setH = function (h) { spec.h = h; };
	that.setUrl = function (url) { spec.url = url; };
	
	that.create = function () {
		var id = that.getId(),
			idLoc = '#' + id;
		if ($(idLoc).length <= 0) {
			TouchMath.getStage().append('<div ' +
							  'class="' + TouchMath.LABEL_ELEMENT_CLASS + '" ' +
							  'id="' + id + '">' +
							  '<img id="' + id + '" src="' + that.getUrl() + '" /></div>');
			$(idLoc).attr('unselectable', 'on');
			$(idLoc).attr('style', 'position: absolute;' +
	    					      'left: ' 	      + that.getX()      + 'px; ' +
								  'width: ' 	      + that.getW()      + 'px; ' +
								  'height: ' 	      + that.getH()      + 'px; ' +
								  'margin: 0px 0px 0px 0px; ' +
								  'padding: 0px 0px 0px 0px; ' +
								  'overflow: hidden; ' +
    					          'top: '		  + that.getY()      + 'px; ');
		}
		return that;
	};
	
	that.update = function () {
		$('img#' + that.getId()).attr('src', that.getUrl());
	}
	
	that.remove = function () {
		$('#' + that.getId()).remove();
	}
	
	return that;
}

// // // // //
// // // //
// // //
// //
//

})(window);