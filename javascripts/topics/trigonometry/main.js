/* Touch Trigonometry 2.0
 * Author: Matthew Trost
 * Date: May 8, 2011
 * Description: Interactive visualization of the six basic trigonometric functions.
*/

// NOTE: As author, I want to point out that this code is
// horrendous and needs to be completely reworked, refactored
// and reformatted. -MT

/* GLOBAL CONSTS
*/

// dimensions
var STAGE_WIDTH 	= 1024;
var STAGE_HEIGHT 	= 500;

// colors
var BG_COLOR  = '#FFFFFF';		// white
var BLN_COLOR = '#000000';		// black
var SIN_COLOR = '#FF0000';		// red
var COS_COLOR = '#FF1FFF';		// pink
var TAN_COLOR = '#FF6600';		// orange
var CSC_COLOR = '#00CC33';		// green
var SEC_COLOR = '#660099';		// purple
var COT_COLOR = '#0000FF';		// blue
var INACTIVE_COLOR = 'A6A6A6';	// gray

// line & point attributes
var LN_WID = 1;		// width of display line stroke
var PT_WID = 1;		// width of display point stroke
var PT_RAD = 3;		// radius of display point

// function buttons
var BUTN_W = 118;
var BUTN_H = 23;

// prevalent coordinates
var CIRC_ORIG = new Point(152, 250);		// origin pt of unit circle (px)
var GRPH_ORIG = new Point(298, 251);		// origin pt of graph (px)
var PLT_RANGE = 701;		// distance from origin to 2*pi (px)
var PX_RADIUS = 130;		// radius of circle (px) 
var UC_RADIUS = 1.0;		// 'real' radius of circle
var PXC_RATIO = 111.4;		// converts horiz px to correct ratio

// symbols
var thS = String.fromCharCode(952);		// theta
var piS = String.fromCharCode(960);		// pi
var srS = String.fromCharCode(8730);	// square root
var dgS = String.fromCharCode(176);		// degree
var ifS = String.fromCharCode(8734);	// infinity

/* GLOBAL VARS
*/

// object visibility
var areValuesActive = true;
var isSinActive = true;
var isCosActive = true;
var isTanActive = true;
var isCscActive = true;
var isSecActive = true;
var isCotActive = true;

/* SETUP
*/

/* Initialize Touch Trigonometry.
 * Set up canvas, launch event listeners.
 * Place function value readouts.
*/
function init() {
	
	/* Initialize canvas.
	*/
	var canvas = $('#canvas');
	canvas.attr('width', STAGE_WIDTH);
	canvas.attr('height', STAGE_HEIGHT);
	canvas.attr('style',
		"position: relative;" +
		"border: 0px;" +
		"background: url(\"/images/topics/trigonometry/main.png\") no-repeat scroll 0 0 #FFFFFF;" +
		""
	);
	
	/* Start event listeners
	*/
	canvas.bind('mouseover', mouseOverHandler);
	canvas.bind('mouseout', mouseOutHandler);
	
	/* Set up function value readouts.
	 * The base style is defined in /css/main.css.
	 * The elements are defined in /index.html
	*/
	$('#canvas-stage').append('<div class="trig-readout" id="theta-deg-field">?</div>');
	$('#canvas-stage').append('<div class="trig-readout" id="theta-rad-field">?</div>');
	$('#canvas-stage').append('<div class="trig-readout" id="sin-field">?</div>');
	$('#canvas-stage').append('<div class="trig-readout" id="cos-field">?</div>');
	$('#canvas-stage').append('<div class="trig-readout" id="tan-field">?</div>');
	$('#canvas-stage').append('<div class="trig-readout" id="csc-field">?</div>');
	$('#canvas-stage').append('<div class="trig-readout" id="sec-field">?</div>');
	$('#canvas-stage').append('<div class="trig-readout" id="cot-field">?</div>');
	
	$('#theta-deg-field').attr('style', 'position: absolute; left: 56px; top:  48px; color: ' + BLN_COLOR + ';  font-family: Garamond; font-size: 18px;');
	$('#theta-rad-field').attr('style', 'position: absolute; left: 168px; top: 48px; color: ' + BLN_COLOR + '; font-family: Garamond; font-size: 18px;');
	$('#sin-field').attr('style', 		'position: absolute; left: 88px; top:  408px; color: ' + SIN_COLOR + '; font-family: Garamond; font-size: 18px;');
	$('#cos-field').attr('style', 		'position: absolute; left: 89px; top:  435px; color: ' + COS_COLOR + '; font-family: Garamond; font-size: 18px;');
	$('#tan-field').attr('style', 		'position: absolute; left: 88px; top:  463px; color: ' + TAN_COLOR + '; font-family: Garamond; font-size: 18px;');
	$('#csc-field').attr('style', 		'position: absolute; left: 216px; top: 408px; color: ' + CSC_COLOR + '; font-family: Garamond; font-size: 18px;');
	$('#sec-field').attr('style', 		'position: absolute; left: 217px; top: 435px; color: ' + SEC_COLOR + '; font-family: Garamond; font-size: 18px;');
	$('#cot-field').attr('style', 		'position: absolute; left: 216px; top: 463px; color: ' + COT_COLOR + '; font-family: Garamond; font-size: 18px;');
}

/* DISPLAY
*/

/* Clears the canvas so display objects can be re-drawn
*/
function clearCanvas() {
	var canvas = $('#canvas');
	var context = canvas[0].getContext('2d');
	context.clearRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
}

/* Draw the six static curves on the graph.
 * Curves are re-drawn on each mouse event.
*/
function drawCurves() {
	var canvas = $('#canvas');
	var context = canvas[0].getContext('2d');
	
	// sin
	if (isSinActive) {
		context.beginPath();
		context.moveTo(GRPH_ORIG.x, GRPH_ORIG.y);
		for (i = 0; i < PLT_RANGE; i++) {
			var xStep = GRPH_ORIG.x + (i + 1);
		 	var yStep = GRPH_ORIG.y - Math.sin(i / PXC_RATIO) * PX_RADIUS;
			context.lineTo(xStep, yStep);
		}
		context.strokeStyle = SIN_COLOR;
		context.lineWidth = LN_WID;
		context.stroke();
	}
	
	// cos
	if (isCosActive) {
		context.beginPath();
		context.moveTo(GRPH_ORIG.x, GRPH_ORIG.y - PX_RADIUS);
		for (i = 0; i < PLT_RANGE; i++)
		{
			var xStep = GRPH_ORIG.x + (i + 1);
			var yStep = GRPH_ORIG.y - Math.cos(i / PXC_RATIO) * PX_RADIUS;
			context.lineTo(xStep, yStep);
		}
		context.strokeStyle = COS_COLOR;
		context.lineWidth = LN_WID;
		context.stroke();
	}
	
	// tan
	if (isTanActive) {
		context.beginPath();
		context.moveTo(GRPH_ORIG.x, GRPH_ORIG.y);
		for (i = 0; i < PLT_RANGE; i++)
		{
			var xStep = GRPH_ORIG.x + (i + 1);
			var yStep = GRPH_ORIG.y - Math.tan(i / PXC_RATIO) * PX_RADIUS;
		
			/* The path skips intervals where the tan curve exceeds
			 * the graph's bounds as it approaches infinity.
			*/
			if (i > 150 && i < 200)
				context.moveTo(xStep, yStep);
			else if (i > 500 && i < 550)	
				context.moveTo(xStep, yStep);
			else
				context.lineTo(xStep, yStep);
		}
		context.strokeStyle = TAN_COLOR;
		context.lineWidth = LN_WID;
		context.stroke();
	}
	
	// csc
	if (isCscActive) {
		context.beginPath();
		context.moveTo(GRPH_ORIG.x, GRPH_ORIG.y + 1000);
		for (i = 1; i < PLT_RANGE; i++)
		{
			var xStep = GRPH_ORIG.x + (i + 1);
			var yStep = GRPH_ORIG.y - 1 / Math.sin(i / PXC_RATIO) * PX_RADIUS;
		
			/* The path skips intervals where the csc curve exceeds
			 * the graph's bounds as it approaches infinity.
			*/
			if (i >= 0 && i < 25)
				context.moveTo(xStep, yStep);
			else if (i > 325 && i < 375)
				context.moveTo(xStep, yStep);
			else if (i > 675)
				context.moveTo(xStep, yStep);
			else
				context.lineTo(xStep, yStep);
		}
		context.strokeStyle = CSC_COLOR;
		context.lineWidth = LN_WID;
		context.stroke();
	}
	
	// sec
	if (isSecActive) {
		context.beginPath();
		context.moveTo(GRPH_ORIG.x, GRPH_ORIG.y - PX_RADIUS);
		for (i = 0; i < PLT_RANGE; i++)
		{
			var xStep = GRPH_ORIG.x + (i + 1);
			var yStep = GRPH_ORIG.y - 1 / Math.cos(i / PXC_RATIO) * PX_RADIUS;
		
			/* The path skips intervals where the sec curve exceeds
			 * the graph's bounds as it approaches infinity.
			*/
			if (i > 150 && i < 200)
				context.moveTo(xStep, yStep);
			else if (i > 500 && i < 550)	
				context.moveTo(xStep, yStep);
			else
				context.lineTo(xStep, yStep);
		}
		context.strokeStyle = SEC_COLOR;
		context.lineWidth = LN_WID;
		context.stroke();
	}
	
	// cot
	if (isCotActive) {
		context.beginPath();
		context.moveTo(GRPH_ORIG.x, GRPH_ORIG.y - 1000);
		for (i = 1; i < PLT_RANGE; i++)
		{
			var xStep = GRPH_ORIG.x + (i + 1);
			var yStep = GRPH_ORIG.y - 1 / Math.tan(i / PXC_RATIO) * PX_RADIUS;
		
			/* The path skips intervals where the sec curve exceeds
			 * the graph's bounds as it approaches infinity.
			*/
			if (i >= 0 && i < 25)
				context.moveTo(xStep, yStep);
			else if (i > 325 && i < 375)
				context.moveTo(xStep, yStep);
			else if (i > 675)
				context.moveTo(xStep, yStep);
			else
				context.lineTo(xStep, yStep);
		}
		context.strokeStyle = COT_COLOR;
		context.lineWidth = LN_WID;
		context.stroke();
	}
}

/* Draw the current function value points on the graph,
 * based on the current value of theta.
*/
function drawGraphPoints(theta) {
	var canvas = $('#canvas');
	var context = canvas[0].getContext('2d');
	
	/* Convert theta to an actual x-coordinate point on the graph display.
	*/
	var xCoord = GRPH_ORIG.x + (theta * PXC_RATIO);
	
	/* A point to represent the current value of theta.
	*/
	context.fillStyle = BLN_COLOR;
	context.beginPath();
	context.arc(xCoord, GRPH_ORIG.y, PT_RAD, 0, Math.PI * 2, true);
	context.fill();
	
	// sin
	if (isSinActive) {
		context.fillStyle = SIN_COLOR;
		context.beginPath();
		context.arc(xCoord, GRPH_ORIG.y - Math.sin(theta) * PX_RADIUS, PT_RAD, 0, Math.PI * 2, true);
		context.fill();
	}
	
	// cos
	if (isCosActive) {
		context.fillStyle = COS_COLOR;
		context.beginPath();
		context.arc(xCoord, GRPH_ORIG.y - Math.cos(theta) * PX_RADIUS, PT_RAD, 0, Math.PI * 2, true);
		context.fill();
	}
	
	// tan
	if (isTanActive) {
		context.fillStyle = TAN_COLOR;
		context.beginPath();
		context.arc(xCoord, GRPH_ORIG.y - Math.tan(theta) * PX_RADIUS, PT_RAD, 0, Math.PI * 2, true);
		context.fill();
	}
	
	// csc
	if (isCscActive) {
		context.fillStyle = CSC_COLOR;
		context.beginPath();
		yCoord = GRPH_ORIG.y - 1 / Math.sin(theta) * PX_RADIUS;
		if (theta == 0)
			context.arc(xCoord, -1000, PT_RAD, 0, Math.PI * 2, true);
		else	
			context.arc(xCoord, yCoord, PT_RAD, 0, Math.PI * 2, true);
		context.fill();
	}
	
	// sec
	if (isSecActive) {
		context.fillStyle = SEC_COLOR;
		context.beginPath();
		context.arc(xCoord, GRPH_ORIG.y - 1 / Math.cos(theta) * PX_RADIUS, PT_RAD, 0, Math.PI * 2, true);
		context.fill();
	}
	
	// cot
	if (isCotActive) {
		context.fillStyle = COT_COLOR;
		context.beginPath();
		yCoord = GRPH_ORIG.y - 1 / Math.tan(theta) * PX_RADIUS;
		if (theta == 0)
			context.arc(xCoord, -1000, PT_RAD, 0, Math.PI * 2, true);
		else
			context.arc(xCoord, yCoord, PT_RAD, 0, Math.PI * 2, true);
		context.fill();
	}
}

/* Draw points on the unit circle, based on the current
 * value of theta. I refer to the points as A, B, C, E and F
 * by the convention used here: http://en.wikipedia.org/wiki/File:Circle-trig6.svg
*/
function drawCirclePoints(theta) {
	var canvas = $('#canvas');
	var context = canvas[0].getContext('2d');
	
	// "A"
	x = CIRC_ORIG.x + (Math.cos(theta) * PX_RADIUS);	
	y = CIRC_ORIG.y - (Math.sin(theta) * PX_RADIUS);
	context.fillStyle = BLN_COLOR;
	context.beginPath();
	context.arc(x, y, PT_RAD, 0, Math.PI * 2, true);
	context.fill();
	
	// "B"
	if (isCosActive) {
		x = CIRC_ORIG.x;
		y = CIRC_ORIG.y - (Math.sin(theta) * PX_RADIUS);
		context.fillStyle = COS_COLOR;
		context.beginPath();
		context.arc(x, y, PT_RAD, 0, Math.PI * 2, true);
		context.fill();
	}
	
	// "C"
	if (isSinActive) {
		x = CIRC_ORIG.x + (Math.cos(theta) * PX_RADIUS);
		y = CIRC_ORIG.y;
		context.fillStyle = SIN_COLOR;
		context.beginPath();
		context.arc(x, y, PT_RAD, 0, Math.PI * 2, true);
		context.fill();
	}
	
	// "E"
	if (isSecActive || isTanActive) {
		/* Don't try to draw the point if it's undefined.
		*/
		if (theta != Math.PI / 2 && theta != 3 * Math.PI / 2) {
			x = CIRC_ORIG.x + (1 / Math.cos(theta) * PX_RADIUS);
			y = CIRC_ORIG.y;
			context.fillStyle = TAN_COLOR;
			context.beginPath();
			context.arc(x, y, PT_RAD, 0, Math.PI * 2, true);
			context.fill();
		}
	}
	
	// "F"
	if (isCotActive || isCscActive) {
		/* Don't try to draw the point if it's undefined.
		*/
		if (theta != 0 && theta != Math.PI) {
			x = CIRC_ORIG.x;
			y = CIRC_ORIG.y - (1 / Math.sin(theta) * PX_RADIUS);
			context.fillStyle = COT_COLOR;
			context.beginPath();
			context.arc(x, y, PT_RAD, 0, Math.PI * 2, true);
			context.fill();
		}
	}
	
	/* "O" is at the origin.
	 * This is just a hack to cover up points that mistakenly get
	 * displayed at the origin when values are undefined.
	*/
	context.fillStyle = BLN_COLOR;
	context.beginPath();
	context.arc(CIRC_ORIG.x, CIRC_ORIG.y, PT_RAD, 0, Math.PI * 2, true);
	context.fill();
}

/* Draw lines on the unit circle, based on the current
 * value of theta.
*/
function drawCircleLines(theta) {
	var canvas = $('#canvas');
	var context = canvas[0].getContext('2d');
	
	/* The lines on the unit circle are drawn from point to point,
	 * based on the same computations that place the points on the
	 * unit circle. Hence I'm labeling those by letter.
	*/
	// "A"
	aX = CIRC_ORIG.x + (Math.cos(theta) * PX_RADIUS);	
	aY = CIRC_ORIG.y - (Math.sin(theta) * PX_RADIUS);
	
	// "B"
	bX = CIRC_ORIG.x;
	bY = CIRC_ORIG.y - (Math.sin(theta) * PX_RADIUS);
	
	// "C"
	cX = CIRC_ORIG.x + (Math.cos(theta) * PX_RADIUS);
	cY = CIRC_ORIG.y;
	
	// "E"
	if (theta == Math.PI / 2)
		eX = 9000;
	else if (theta == 3 * Math.PI / 2)
		eX = 9000;
	else
		eX = CIRC_ORIG.x + (1 / Math.cos(theta) * PX_RADIUS);
	eY = CIRC_ORIG.y;
	
	// "F"
	fX = CIRC_ORIG.x;
	if (theta == 0)
		fY = 9000;
	else if (theta == Math.PI)
		fY = 9000;
	else
		fY = CIRC_ORIG.y - (1 / Math.sin(theta) * PX_RADIUS);
	
	// sin
	if (isSinActive) {
		context.beginPath();
		context.moveTo(cX, cY);
		context.lineTo(aX, aY);
		context.strokeStyle = SIN_COLOR;
		context.stroke();
	}
	
	// cos
	if (isCosActive) {
		context.beginPath();
		context.moveTo(bX, bY);
		context.lineTo(aX, aY);
		context.strokeStyle = COS_COLOR;
		context.stroke();
	}
	
	// tan
	if (isTanActive) {
		/* Don't try to draw the line when its function is undefined.
		*/
		if (theta != Math.PI / 2 && theta != 3 * Math.PI / 2) {
			context.beginPath();
			context.moveTo(aX, aY);
			context.lineTo(eX, eY);
			context.strokeStyle = TAN_COLOR;
			context.stroke();
		}
	}
	
	// csc
	if (isCscActive) {
		/* Don't try to draw the line when its function is undefined.
		*/
		if (theta != 0 && theta != Math.PI && theta != 2 * Math.PI) {
			context.beginPath();
			context.moveTo(CIRC_ORIG.x, CIRC_ORIG.y);
			context.lineTo(fX, fY);
			context.strokeStyle = CSC_COLOR;
			context.stroke();
		}
	}
	
	// sec
	if (isSecActive) {
		/* Don't try to draw the line when its function is undefined.
		*/
		if (theta != Math.PI / 2 && theta != 3 * Math.PI / 2) {
			context.beginPath();
			context.moveTo(CIRC_ORIG.x, CIRC_ORIG.y);
			context.lineTo(eX, eY);
			context.strokeStyle = SEC_COLOR;
			context.stroke();
		}
	}
	
	// cot
	if (isCotActive) {
		/* Don't try to draw the line when its function is undefined.
		*/
		if (theta != 0 && theta != Math.PI && theta != 2 * Math.PI) {
			context.beginPath();
			context.moveTo(aX, aY);
			context.lineTo(fX, fY);
			context.strokeStyle = COT_COLOR;
			context.stroke();
		}
	}
	
	/* "Radius", a.k.a.
	 * a line from the center of the circle to a point at arctan
	 * distance around the circumference, based on the current
	 * value of theta. 
	*/
	context.beginPath();
	context.moveTo(CIRC_ORIG.x, CIRC_ORIG.y);
	context.lineTo(aX, aY);
	context.strokeStyle = BLN_COLOR;
	context.stroke();
}

/* Update the value readouts based on the current value of
 * theta.
*/
function updateReadouts(theta) {
	var canvas = $('#canvas');
	var context = canvas[0].getContext('2d');
		
	if (theta == 0) {
		$('#theta-deg-field').text("0" + dgS);
		$('#theta-rad-field').text("0" + " rad");
		$('#sin-field').text("0");
		$('#cos-field').text("1");
		$('#tan-field').text("0");
		$('#csc-field').text(ifS);
		$('#sec-field').text("1");
		$('#cot-field').text(ifS);
	}
	else if (theta == Math.PI / 6) {
		$('#theta-deg-field').text("30" + dgS);
		$('#theta-rad-field').text(piS + "/6 rad");
		$('#sin-field').text("1/2");
		$('#cos-field').text(srS + "3/2");
		$('#tan-field').text("1/" + srS + "3");
		$('#csc-field').text("2");
		$('#sec-field').text("2/" + srS + "3");
		$('#cot-field').text(srS + "3");
	}
	else if (theta == Math.PI / 4) {
		$('#theta-deg-field').text("45" + dgS);
		$('#theta-rad-field').text(piS + "/4 rad");
		$('#sin-field').text("1/" + srS + "2");
		$('#cos-field').text("1/" + srS + "2");
		$('#tan-field').text("1");
		$('#csc-field').text(srS + "2");
		$('#sec-field').text(srS + "2");
		$('#cot-field').text("1");
	}
	else if (theta == Math.PI / 3) {
		$('#theta-deg-field').text("60" + dgS);
		$('#theta-rad-field').text(piS + "/3 rad");
		$('#sin-field').text(srS + "3/2");
		$('#cos-field').text("1/2");
		$('#tan-field').text(srS + "3");
		$('#csc-field').text("2/" + srS + "3");
		$('#sec-field').text("2");
		$('#cot-field').text("1/" + srS + "3");
	}
	else if (theta == Math.PI / 2) {
		$('#theta-deg-field').text("90" + dgS);
		$('#theta-rad-field').text(piS + "/2 rad");
		$('#sin-field').text("1");
		$('#cos-field').text("0");
		$('#tan-field').text(ifS);
		$('#csc-field').text("1");
		$('#sec-field').text(ifS);
		$('#cot-field').text("0");
	}
	else if (theta == 2 * Math.PI / 3) {
		$('#theta-deg-field').text("120" + dgS);
		$('#theta-rad-field').text("2" + piS + "/3 rad");
		$('#sin-field').text(srS + "3/2");
		$('#cos-field').text("-1/2");
		$('#tan-field').text("-" + srS + "3");
		$('#csc-field').text("2/" + srS + "3");
		$('#sec-field').text("-2");
		$('#cot-field').text("-1/" + srS + "3");
	}
	else if (theta == 3 * Math.PI / 4) {
		$('#theta-deg-field').text("135" + dgS);
		$('#theta-rad-field').text("3" + piS + "/4 rad");
		$('#sin-field').text("1/" + srS +"2");
		$('#cos-field').text("-1/" + srS + "2");
		$('#tan-field').text("-1");
		$('#csc-field').text(srS + "2");
		$('#sec-field').text("-" + srS + "2");
		$('#cot-field').text("-1");
	}
	else if (theta == 5 * Math.PI / 6) {
		$('#theta-deg-field').text("150" + dgS);
		$('#theta-rad-field').text("5" + piS + "/6 rad");
		$('#sin-field').text("1/2");
		$('#cos-field').text("-" + srS + "3/2");
		$('#tan-field').text("-1/" + srS + "3");
		$('#csc-field').text("2");
		$('#sec-field').text("-2/" + srS + "3");
		$('#cot-field').text("-" + srS + "3");
	}
	else if (theta == Math.PI) {
		$('#theta-deg-field').text("180" + dgS);
		$('#theta-rad-field').text(piS + " rad");
		$('#sin-field').text("0");
		$('#cos-field').text("-1");
		$('#tan-field').text("0");
		$('#csc-field').text(ifS);
		$('#sec-field').text("-1");
		$('#cot-field').text(ifS);
	}
	else if (theta == 7 * Math.PI / 6) {
		$('#theta-deg-field').text("210" + dgS);
		$('#theta-rad-field').text("7" + piS + "/6 rad");
		$('#sin-field').text("-1/2");
		$('#cos-field').text("-" + srS + "3/2");
		$('#tan-field').text("1/" + srS + "3");
		$('#csc-field').text("-2");
		$('#sec-field').text("-2/" + srS + "3");
		$('#cot-field').text(srS + "3");
	}
	else if (theta == 5 * Math.PI / 4) {
		$('#theta-deg-field').text("225" + dgS);
		$('#theta-rad-field').text("5" + piS + "/4 rad");
		$('#sin-field').text("-1/" + srS + "2");
		$('#cos-field').text("-1/" + srS + "2");
		$('#tan-field').text("1");
		$('#csc-field').text("-" + srS + "2");
		$('#sec-field').text("-" + srS + "2");
		$('#cot-field').text("1");
	}
	else if (theta == 4 * Math.PI / 3) {
		$('#theta-deg-field').text("240" + dgS);
		$('#theta-rad-field').text("4" + piS + "/3 rad");
		$('#sin-field').text("-" + srS + "3/2");
		$('#cos-field').text("-1/2");
		$('#tan-field').text(srS + "3");
		$('#csc-field').text("-2/" + srS + "3");
		$('#sec-field').text("-2");
		$('#cot-field').text("1/" + srS + "3");
	}
	else if (theta == 3 * Math.PI / 2) {
		$('#theta-deg-field').text("270" + dgS);
		$('#theta-rad-field').text("3" + piS + "/2 rad");
		$('#sin-field').text("-1");
		$('#cos-field').text("0");
		$('#tan-field').text(ifS);
		$('#csc-field').text("-1");
		$('#sec-field').text(ifS);
		$('#cot-field').text("0");
	}
	else if (theta == 5 * Math.PI / 3) {
		$('#theta-deg-field').text("300" + dgS);
		$('#theta-rad-field').text("5" + piS + "/3 rad");
		$('#sin-field').text("-" + srS + "3/2");
		$('#cos-field').text("1/2");
		$('#tan-field').text("-" + srS + "3");
		$('#csc-field').text("-2/" + srS + "3");
		$('#sec-field').text("2");
		$('#cot-field').text("-1/" + srS + "3");
	}
	else if (theta == 7 * Math.PI / 4) {
		$('#theta-deg-field').text("315" + dgS);
		$('#theta-rad-field').text("7" + piS + "/4 rad");
		$('#sin-field').text("-1/" + srS + "2");
		$('#cos-field').text("1/" + srS + "2");
		$('#tan-field').text("-1");
		$('#csc-field').text("-" + srS + "2");
		$('#sec-field').text("-" + srS + "2");
		$('#cot-field').text("-1");
	}
	else if (theta == 11 * Math.PI / 6) {
		$('#theta-deg-field').text("330" + dgS);
		$('#theta-rad-field').text("11" + piS + "/6 rad");
		$('#sin-field').text("-1/2");
		$('#cos-field').text(srS + "3/2");
		$('#tan-field').text("-1/" + srS + "3");
		$('#csc-field').text("-2");
		$('#sec-field').text("2/" + srS + "3");
		$('#cot-field').text("-" + srS + "3");
	}
	else if (theta == 2 * Math.PI) {
		$('#theta-deg-field').text("360" + dgS);
		$('#theta-rad-field').text("2" + piS + " rad");
		$('#sin-field').text("0");
		$('#cos-field').text("1");
		$('#tan-field').text("0");
		$('#csc-field').text(ifS);
		$('#sec-field').text("1");
		$('#cot-field').text(ifS);
	}
	else {
		$('#theta-deg-field').text(new String(convThetaToDegs(theta)).substring(0, 5) + dgS);
	  	$('#theta-rad-field').text(new String(theta).substring(0, 5) + " rad");
		$('#sin-field').text(new String(Math.sin(theta)).substring(0, 5));
		$('#cos-field').text(new String(Math.cos(theta)).substring(0, 5));
		$('#tan-field').text(new String(Math.tan(theta)).substring(0, 5));
		$('#csc-field').text(new String(1 / Math.sin(theta)).substring(0, 5));
		$('#sec-field').text(new String(1 / Math.cos(theta)).substring(0, 5));
		$('#cot-field').text(new String(1 / Math.tan(theta)).substring(0, 5));
	}
	
	/* When user disables a function, overlay the button
	 * with gray transparency.
	*/
	if (!isSinActive) {
		context.fillStyle = "rgba(240, 240, 240, 0.8)";
		context.fillRect(27, 410, BUTN_W, BUTN_H);
	}
	if (!isCosActive) {
		context.fillStyle = "rgba(240, 240, 240, 0.8)";
		context.fillRect(27, 437, BUTN_W, BUTN_H);
	}
	if (!isTanActive) {
		context.fillStyle = "rgba(240, 240, 240, 0.8)";
		context.fillRect(27, 465, BUTN_W, BUTN_H);
	}
	if (!isCscActive) {
		context.fillStyle = "rgba(240, 240, 240, 0.8)";
		context.fillRect(156, 410, BUTN_W, BUTN_H);
	}
	if (!isSecActive) {
		context.fillStyle = "rgba(240, 240, 240, 0.8)";
		context.fillRect(156, 437, BUTN_W, BUTN_H);
	}
	if (!isCotActive) {
		context.fillStyle = "rgba(240, 240, 240, 0.8)";
		context.fillRect(156, 465, BUTN_W, BUTN_H);
	}
}

/* EVENTS
*/

/* Handle mouse clicks.
*/
function mouseClickHandler(event) {
	var mouseX, mouseY;
	
	if (event.offsetX) {
		mouseX = event.offsetX;
		mouseY = event.offsetY;
	}
	else if (event.layerX) {
		mouseX = event.layerX;
		mouseY = event.layerY;
	}
	
	/* Disable function when user clicks its button.
	*/
	if (mouseY > 408 && mouseX < 276) {	
		if (mouseX > 25 && mouseX < 145) {
			if (mouseY > 408 && mouseY < 433) {
				if (isSinActive == true) {
					isSinActive = false;
				}
				else
					isSinActive = true;
			}
			if (mouseY > 436 && mouseY < 461)  {
				if (isCosActive == true) {
					isCosActive = false;
				}
				else
					isCosActive = true;
			}
			if (mouseY > 463 && mouseY < 489) {
				if (isTanActive == true) {
					isTanActive = false;
				}
				else
					isTanActive = true;
			}
		}	
		if (mouseX > 155 && mouseX < 275) {
			if (mouseY > 408 && mouseY < 433) {
				if (isCscActive == true) {
					isCscActive = false;
				}
				else
					isCscActive = true;
			}
			if (mouseY > 436 && mouseY < 461)  {
				if (isSecActive == true) {
					isSecActive = false;
				}
				else
					isSecActive = true;
			}
			if (mouseY > 463 && mouseY < 489) {
				if (isCotActive == true) {
					isCotActive = false;
				}
				else
					isCotActive = true;
			}
		}
	}
	/* If user clicked, but not on a button,
	 * de-activate values.
	*/
	else {
		/* Hack so iOS users don't have to tap twice
		 * to change the current mouse position.
		*/
		if (!(/iPhone|iPod|iPad/i).test(navigator.userAgent)) {
			if (areValuesActive == true)
				areValuesActive = false;
			else
				areValuesActive = true;
		}
	}
}

/* Calculate theta, compute function values,
 * and update display objects accordingly every
 * time the cursor moves, based on the cursor's
 * position.
*/
function mouseMoveHandler(event) {
	var mouseX, mouseY;
	if (event.offsetX) {
		mouseX = event.offsetX;
		mouseY = event.offsetY;
	}
	else if (event.layerX) {
		mouseX = event.layerX;
		mouseY = event.layerY;
	}
	
	/* Only refresh the display if the display is
	 * toggled to active.
	*/
	if (areValuesActive) {
		/* Calculate theta.
		 * If the cursor is on the graph, just use the x-coordinate.
		 * If the cursor is on the circle, compute the arctangent.
		*/
		if (mouseX > GRPH_ORIG.x)
			theta = calcThetaOnGraph(mouseX, mouseY);
		else
			theta = calcThetaOnCircle(mouseX, mouseY);	
		// Convert theta to degrees.
		thetaDegs = convThetaToDegs(theta);
		
		/* Draw all graph and unit circle display objects.
		*/
		clearCanvas();
		drawCurves();	
		drawGraphPoints(theta);
		drawCirclePoints(theta);
		drawCircleLines(theta);
		updateReadouts(theta);
	}
}

/* Start tracking the mouse position when cursor
 * enters the stage.
*/
function mouseOverHandler(event) {
	var canvas = $('#canvas');
	canvas.bind('mousemove', mouseMoveHandler);
	canvas.bind('click', mouseClickHandler);
}

/* Stop tracking the mouse position when cursor
 * leaves the stage.
*/
function mouseOutHandler(event) {
	var canvas = $('#canvas');
	canvas.unbind('mousemove', mouseMoveHandler);
	canvas.unbind('click', mouseClickHandler);
}

/* UTILITIES
*/

/* Just a simple class that holds a coordinate pair
*/
function Point(x, y) {
	this.x = x;
	this.y = y;
}

/* Converts theta (radians) to a degree value
*/
function convThetaToDegs(theta) {
	return (theta * 180) / Math.PI;
}

/* Calculates the value of theta based on the
 * mouse position when the cursor is above the graph.
*/
function calcThetaOnGraph(x, y) {
	var rads;
	
	if (x > GRPH_ORIG.x + PLT_RANGE)
		rads = PLT_RANGE / PXC_RATIO;
	if (x <= GRPH_ORIG.x)
		rads = 0;
	else
		rads = (x - GRPH_ORIG.x) / PXC_RATIO;
	
	/* Creates 'locking' behavior around critical points
	 * by assigning a pre-set value to theta when it approaches
	 * a critical point.
	*/
	if (rads >= 0 && rads < 0.025 )
		return 0;
	else if (rads > 0.498 && rads < 0.548)
		return Math.PI / 6;
	else if (rads > 0.760 && rads < 0.810)
		return Math.PI / 4;
	else if (rads > 1.022 && rads < 1.072)
		return Math.PI / 3;
	else if (rads > 1.545 && rads < 1.595)
		return Math.PI / 2;
	else if (rads > 2.069 && rads < 2.119)
		return 2 * Math.PI / 3;
	else if (rads > 2.331 && rads < 2.381)
		return 3 * Math.PI / 4;
	else if (rads > 2.592 && rads < 2.642)
		return 5 * Math.PI / 6;
	else if (rads > 3.116 && rads < 3.166)
		return Math.PI;
	else if (rads > 3.640 && rads < 3.690)
		return 7 * Math.PI / 6;
	else if (rads > 3.901 && rads < 3.951)
		return 5 * Math.PI / 4;
	else if (rads > 4.163 && rads < 4.213)
		return 4 * Math.PI / 3;
	else if (rads > 4.687 && rads < 4.737)
		return 3 * Math.PI / 2;
	else if (rads > 5.210 && rads < 5.260)
		return 5 * Math.PI / 3;
	else if (rads > 5.472 && rads < 5.522)
		return 7 * Math.PI / 4;
	else if (rads > 5.734 && rads < 5.784)
		return 11 * Math.PI / 6;
	else if (rads > 6.258 && rads <= 6.28318)
		return 2 * Math.PI;
	else
		return rads;
}

/* Calculates the value of theta based on the mouse
 * position when the cursor is above the unit circle.
*/
function calcThetaOnCircle(x, y) {
	var rads;
	
	/* Calculates the "true" value of theta (in radians).
	 * Takes arctan of the distance formula,
	 * between the origin of the circle and the mouse cursor posision.
	*/
	if (y < CIRC_ORIG.y)
	{
		if (x > CIRC_ORIG.x)
			rads = Math.atan((CIRC_ORIG.y - y) / (x - CIRC_ORIG.x));
		else
			rads = Math.PI - Math.atan((CIRC_ORIG.y - y) / (CIRC_ORIG.x - x));
	}
	else
	{
		if (x < CIRC_ORIG.x)
			rads = Math.PI + Math.atan((y - CIRC_ORIG.y) / (CIRC_ORIG.x - x));
		else
			rads = (2 * Math.PI) - Math.atan((y - CIRC_ORIG.y) / (x - CIRC_ORIG.x));
	}
	
	/* This conditional creates "locking" behavior around critical points
	 * by assigning a pre-set value to theta when theta's "true"
	 * value approaches a critical point.
	*/
	if (rads >= 0 && rads < 0.025 )
		return 0;
	else if (rads > 0.498 && rads < 0.548)
		return Math.PI / 6;
	else if (rads > 0.760 && rads < 0.810)
		return Math.PI / 4;
	else if (rads > 1.022 && rads < 1.072)
		return Math.PI / 3;
	else if (rads > 1.545 && rads < 1.595)
		return Math.PI / 2;
	else if (rads > 2.069 && rads < 2.119)
		return 2 * Math.PI / 3;
	else if (rads > 2.331 && rads < 2.381)
		return 3 * Math.PI / 4;
	else if (rads > 2.592 && rads < 2.642)
		return 5 * Math.PI / 6;
	else if (rads > 3.116 && rads < 3.166)
		return Math.PI;
	else if (rads > 3.640 && rads < 3.690)
		return 7 * Math.PI / 6;
	else if (rads > 3.901 && rads < 3.951)
		return 5 * Math.PI / 4;
	else if (rads > 4.163 && rads < 4.213)
		return 4 * Math.PI / 3;
	else if (rads > 4.687 && rads < 4.737)
		return 3 * Math.PI / 2;
	else if (rads > 5.210 && rads < 5.260)
		return 5 * Math.PI / 3;
	else if (rads > 5.472 && rads < 5.522)
		return 7 * Math.PI / 4;
	else if (rads > 5.734 && rads < 5.784)
		return 11 * Math.PI / 6;
	else if (rads > 6.258 && rads <= 6.28318)
		return 2 * Math.PI;
	else
		return rads;
}

/* MAIN
*/

/* When the document is loaded, initialize Touch Trigonometry.
*/
$(document).ready(function(){
	init();
});