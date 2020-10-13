// Window Load
window.onload = function (){


    var nux,mux;
    var nuy,muy;
    nux = 405.0;
    nuy = 405.0;
    mux = 150.0;
    muy = 200.0;
    var phi = 0.90;

    var lx = 3500;
    var ly = 4500;
    var df = 3500;

    var cx = 500;
    var cy = 1000;
    var lx1 = 1750;
    var ly1 = 2250;

    var d1 = 1000;
    var d2 = 500;

    var fc = 21;
    var fy = 170;
    var gamma = 20;
    var cover = 60;

    var beaCap = 150;

    document.getElementById('job').value = 'New Project';
    document.getElementById('nux').value = nux;
    document.getElementById('mux').value = mux;
    document.getElementById('nuy').value = nuy;
    document.getElementById('muy').value = muy;
    //document.getElementById('phi').value = phi;
    document.getElementById('lx').value = lx;
    document.getElementById('ly').value = ly;
    document.getElementById('df').value = df;
    document.getElementById('cx').value = cx;
    document.getElementById('cy').value = cy;
    document.getElementById('lx1').value = lx1;
    document.getElementById('ly1').value = ly1;
    document.getElementById('d1').value = d1;
    document.getElementById('d2').value = d2;
    document.getElementById('fc').value = fc;
    document.getElementById('fy').value = fy;
    document.getElementById('gamma').value = gamma;
    document.getElementById('cover').value = cover;

    document.getElementById('numX').value = 22;
    document.getElementById('rebarX').selectedIndex = 3;
    document.getElementById('numY').value = 12;
    document.getElementById('rebarY').selectedIndex = 3;

    document.getElementById('beaCap').value = beaCap;

    DrawSec();

}

////////////////////////////////////////////////////////////////////////

var downloadAsFile = function(fileName, content) {

    var textArray = [];

    var npara = 24;
    textArray[0]    = document.title;
    textArray[1]    = document.getElementById('job').value ;
    textArray[2]    = document.getElementById('nux').value ;
    textArray[3]    = document.getElementById('mux').value ;
    textArray[4]    = document.getElementById('nuy').value ;
    textArray[5]    = document.getElementById('muy').value ;
    //textArray[6]    = document.getElementById('phi').value ;
    textArray[6]    = 'None';
    textArray[7]    = document.getElementById('lx').value ;
    textArray[8]    = document.getElementById('ly').value ;
    textArray[9]    = document.getElementById('df').value ;
    textArray[10]    = document.getElementById('cx').value ;
    textArray[11]    = document.getElementById('cy').value ;
    textArray[12]    = document.getElementById('lx1').value ;
    textArray[13]    = document.getElementById('ly1').value ;
    textArray[14]    = document.getElementById('d1').value ;
    textArray[15]    = document.getElementById('d2').value ;
    textArray[16]    = document.getElementById('fc').value ;
    textArray[17]    = document.getElementById('fy').value ;
    textArray[18]    = document.getElementById('gamma').value ;
    textArray[19]    = document.getElementById('cover').value ;
    textArray[20]    = document.getElementById('numX').value ;
    textArray[21]    = document.getElementById('rebarX').selectedIndex ;
    textArray[22]    = document.getElementById('numY').value ;
    textArray[23]    = document.getElementById('rebarY').selectedIndex ;
    textArray[24]    = document.getElementById('beaCap').value ;

    content ='';
    var i;
    for( i = 0; i<=npara; i++){
	content += textArray[i] + "\n";
    }

    var blob = new Blob([content]);
    var url = window.URL || window.webkitURL;
    var blobURL = url.createObjectURL(blob);

    var a = document.createElement('a');
    a.download = fileName;
    a.href = blobURL;
    a.click();
};

//////////////////////////////////////////////////

function OpenFile(){

    var Inp = document.createElement('input');
    Inp.type = 'file';
    Inp.click();

    //ダイアログでファイルが選択された時
    Inp.addEventListener("change",function(evt){

	var file = evt.target.files;

	//FileReaderの作成
	var reader = new FileReader();
	//テキスト形式で読み込む
	reader.readAsText(file[0]);

	//読込終了後の処理
	reader.onload = function(ev){

	    //CR+LF,CR,LF のいずれかの改行コードでsplitします。
	    var textArray = reader.result.split(/\r\n|\r|\n/);

	    var form = document.inputForm;

	    document.getElementById('job').value  = textArray[1]    ;
	    document.getElementById('nux').value  = textArray[2]    ;
	    document.getElementById('mux').value  = textArray[3]    ;
	    document.getElementById('nuy').value  = textArray[4]    ;
	    document.getElementById('muy').value  = textArray[5]    ;
	    //document.getElementById('phi').value  = textArray[6]    ;
	    document.getElementById('lx').value  = textArray[7]    ;
	    document.getElementById('ly').value  = textArray[8]    ;
	    document.getElementById('df').value  = textArray[9]    ;
	    document.getElementById('cx').value  = textArray[10]    ;
	    document.getElementById('cy').value  = textArray[11]    ;
	    document.getElementById('lx1').value  = textArray[12]    ;
	    document.getElementById('ly1').value  = textArray[13]    ;
	    document.getElementById('d1').value  = textArray[14]    ;
	    document.getElementById('d2').value  = textArray[15]    ;
	    document.getElementById('fc').value  = textArray[16]    ;
	    document.getElementById('fy').value  = textArray[17]    ;
	    document.getElementById('gamma').value  = textArray[18]    ;
	    document.getElementById('cover').value  = textArray[19]    ;
	    document.getElementById('numX').value = textArray[20]    ;
	    document.getElementById('rebarX').selectedIndex = textArray[21]    ;
	    document.getElementById('numY').value = textArray[22]    ;
	    document.getElementById('rebarY').selectedIndex = textArray[23]    ;
	    document.getElementById('beaCap').value = textArray[24]    ;
	    DrawSec();
	    OnButtonClick();

	}
    },false);

}

////////////////////////////////////////////////////////////////////////

function OnButtonClick(){


    // input
    // ------------------------------------------------------------

    var nux = Number( document.getElementById('nux').value );
    var mux = Number( document.getElementById('mux').value );
    var nuy = Number( document.getElementById('nuy').value );
    var muy = Number( document.getElementById('muy').value );

    //var phi = Number( document.getElementById('phi').value ) ;

    var lx = Number( document.getElementById('lx').value ) ;
    var ly = Number( document.getElementById('ly').value ) ;
    var df = Number( document.getElementById('df').value ) ;

    var cx = Number( document.getElementById('cx').value ) ;
    var cy = Number( document.getElementById('cy').value ) ;
    var lx1 = Number( document.getElementById('lx1').value ) ;
    var ly1 = Number( document.getElementById('ly1').value ) ;

    var d1 = Number( document.getElementById('d1').value ) ;
    var d2 = Number( document.getElementById('d2').value ) ;

    var fc = Number( document.getElementById('fc').value ) ;
    var fy = Number( document.getElementById('fy').value ) ;

    var gamma = Number( document.getElementById('gamma').value ) ;
    var cover = Number( document.getElementById('cover').value ) ;

    var numX = document.getElementById('numX').value;
    var stiX = document.getElementById('rebarX').selectedIndex;
    var numY = document.getElementById('numY').value;
    var stiY = document.getElementById('rebarY').selectedIndex;

    var beaCap = document.getElementById('beaCap').value;

    // --------------------------------------------------
    // CALCULATION
    // --------------------------------------------------

    var atx = numX*Rebar[stiX].As*100;
    var aty = numY*Rebar[stiY].As*100;

    DrawSec();

    output('X',nux,mux-nux*(lx/2-lx1)/1000,
	   lx,ly,df,cx,cy,lx1,ly1,d1,
	   fc,fy,gamma,cover,
	   atx,aty,beaCap);

    output('Y',nuy,muy-nuy*(ly/2-ly1)/1000,
	   ly,lx,df,cy,cx,ly1,lx1,d1,
	   fc,fy,gamma,cover,
	   aty,atx,beaCap);

    // Output for X

}


// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------

var canvas,ctx;
var xcen,ycen;
var xscale,yscale,scale;

function DrawSec() {

    var lx = Number( document.getElementById('lx').value ) ;
    var ly = Number( document.getElementById('ly').value ) ;
    var df = Number( document.getElementById('df').value ) ;

    var cx = Number( document.getElementById('cx').value ) ;
    var cy = Number( document.getElementById('cy').value ) ;
    var lx1 = Number( document.getElementById('lx1').value ) ;
    var ly1 = Number( document.getElementById('ly1').value ) ;

    var d1 = Number( document.getElementById('d1').value ) ;
    var d2 = Number( document.getElementById('d2').value ) ;

    //
    var gapx = Math.min(lx,ly)/4;
    var gapy = Math.min(lx,ly)/4;
    //
    var b = lx + gapx + df;
    var h = ly + gapy + df;
    //
    var numX = document.getElementById('numX').value;
    var stiX = document.getElementById('rebarX').selectedIndex;
    var numY = document.getElementById('numY').value;
    var stiY = document.getElementById('rebarY').selectedIndex;
    //

    var result = '<canvas width=\"650\" height=\"600\" id=\"picCanvas\"></canvas>';
    document.getElementById('picture').innerHTML = result;


    canvas = document.getElementById('picCanvas');
    ctx = canvas.getContext("2d");

    xcen = canvas.width / 2 + 35;
    ycen = canvas.height / 2 - 20;

    xscale = (canvas.width-110)/b;
    yscale = (canvas.height-80)/h;
    scale = (xscale < yscale) ? xscale : yscale;

    // Draw Footing Plan
    ctx.beginPath();
    ctx.rect(xcen-b/2*scale, ycen+h/2*scale-ly*scale,
	     lx*scale, ly*scale);
    ctx.fillStyle = "rgb(242,244,255)";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Draw Footing Section X
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale,
               ycen+h/2*scale-ly*scale-gapy*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale,
	       ycen+h/2*scale-ly*scale-gapy*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale,
	       ycen+h/2*scale-ly*scale-gapy*scale-d2*scale);
    ctx.lineTo(xcen-b/2*scale+lx1*scale+cx/2*scale,
	       ycen+h/2*scale-ly*scale-gapy*scale-d1*scale);
    ctx.lineTo(xcen-b/2*scale+lx1*scale+cx/2*scale,
	       ycen+h/2*scale-ly*scale-gapy*scale-df*scale);
    ctx.lineTo(xcen-b/2*scale+lx1*scale-cx/2*scale,
	       ycen+h/2*scale-ly*scale-gapy*scale-df*scale);
    ctx.lineTo(xcen-b/2*scale+lx1*scale-cx/2*scale,
	       ycen+h/2*scale-ly*scale-gapy*scale-d1*scale);
    ctx.lineTo(xcen-b/2*scale,
	       ycen+h/2*scale-ly*scale-gapy*scale-d2*scale);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Draw Footing Section X
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+lx*scale+gapx*scale,
               ycen+h/2*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale+d2*scale,
	       ycen+h/2*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale+d1*scale,
	       ycen+h/2*scale-ly1*scale+cy/2*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale+df*scale,
	       ycen+h/2*scale-ly1*scale+cy/2*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale+df*scale,
	       ycen+h/2*scale-ly1*scale-cy/2*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale+d1*scale,
	       ycen+h/2*scale-ly1*scale-cy/2*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale+d2*scale,
	       ycen+h/2*scale-ly*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale,
	       ycen+h/2*scale-ly*scale);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Draw Column Plan
    ctx.beginPath();
    ctx.rect(xcen-b/2*scale+lx1*scale-cx/2*scale,
	     ycen+h/2*scale-ly1*scale-cy/2*scale,
	     cx*scale, cy*scale);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();


    // Draw Dimension Lines
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.font = "12pt sans-serif";
    ctx.textAlign = "center";

    // Draw Load
    drawLineArrow (xcen+(-b/2+lx/2)*scale,
		   ycen+(h/2-ly-gapy-df)*scale-20,
		   xcen+(-b/2+lx/2)*scale,
		   ycen+(h/2-ly-gapy-df)*scale+30);
    ctx.fillText(  "Nux",
		   xcen+(-b/2+lx/2)*scale+40,
		   ycen+(h/2-ly-gapy-df)*scale+20);
    drawLineArrow (xcen+(-b/2+lx/2)*scale-40,
		   ycen+(h/2-ly-gapy-d1)*scale-10,
		   xcen+(-b/2+lx/2)*scale+40,
		   ycen+(h/2-ly-gapy-d1)*scale-10);
    ctx.fillText(  "Mux",
		   xcen+(-b/2+lx/2)*scale+70,
		   ycen+(h/2-ly-gapy-d1)*scale-10);

    drawLineArrow (xcen+(-b/2+lx+gapx+df)*scale+30,
		   ycen+(h/2-ly/2)*scale,
		   xcen+(-b/2+lx+gapx+df)*scale-20,
		   ycen+(h/2-ly/2)*scale);
    ctx.fillText(  "Nuy",
		   xcen+(-b/2+lx+gapx+df)*scale-20,
		   ycen+(h/2-ly/2)*scale+50);
    drawLineArrow (xcen+(-b/2+lx+gapx+d1)*scale+20,
		   ycen+(h/2-ly/2)*scale+30,
		   xcen+(-b/2+lx+gapx+d1)*scale+20,
		   ycen+(h/2-ly/2)*scale-30);
    ctx.fillText(  "Muy",
		   xcen+(-b/2+lx+gapx+d1)*scale+20,
		   ycen+(h/2-ly/2)*scale-50);

    // Draw Rc width
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale,ycen+h/2*scale+10);
    ctx.lineTo(xcen-b/2*scale,ycen+h/2*scale+30);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+lx*scale,ycen+h/2*scale+10);
    ctx.lineTo(xcen-b/2*scale+lx*scale,ycen+h/2*scale+30);
    ctx.stroke();
    drawLineArrow2(xcen-b/2*scale,ycen+h/2*scale+20,
		   xcen-b/2*scale+lx*scale,ycen+h/2*scale+20);
    ctx.fillText(lx,xcen-b/2*scale+lx/2*scale,ycen+h/2*scale+40);


    // GL line for Y
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+lx*scale+gapx*scale,
	       ycen+h/2*scale+10);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale,
	       ycen+h/2*scale+30);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+lx*scale+gapx*scale+df*scale,
	       ycen+h/2*scale+10);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale+df*scale,
	       ycen+h/2*scale+30);
    ctx.stroke();

    drawLineArrow2(xcen-b/2*scale+lx*scale+gapx*scale,
		   ycen+h/2*scale+20,
		   xcen-b/2*scale+lx*scale+gapx*scale+df*scale,
		   ycen+h/2*scale+20);
    ctx.fillText(df,
		 xcen-b/2*scale+lx*scale+gapx*scale+df/2*scale,
		 ycen+h/2*scale+40);

    // Footing Depth
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale-30,ycen+h/2*scale-ly*scale);
    ctx.lineTo(xcen-b/2*scale-10,ycen+h/2*scale-ly*scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale-30,ycen+h/2*scale);
    ctx.lineTo(xcen-b/2*scale-10,ycen+h/2*scale);
    ctx.stroke();

    drawLineArrow2(xcen-b/2*scale-20,ycen+h/2*scale,
		   xcen-b/2*scale-20,ycen+h/2*scale-ly*scale);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(ly,xcen-b/2*scale-70,ycen+h/2*scale-ly/2*scale);

    // Soil Depth
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale-30,
	       ycen+h/2*scale-ly*scale-gapy*scale-df*scale);
    ctx.lineTo(xcen-b/2*scale-10,
	       ycen+h/2*scale-ly*scale-gapy*scale-df*scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale-30,
	       ycen+h/2*scale-ly*scale-gapy*scale);
    ctx.lineTo(xcen-b/2*scale-10,
	       ycen+h/2*scale-ly*scale-gapy*scale);
    ctx.stroke();

    drawLineArrow2(xcen-b/2*scale-20,
		   ycen+h/2*scale-ly*scale-gapy*scale,
		   xcen-b/2*scale-20,
		   ycen+h/2*scale-ly*scale-gapy*scale-df*scale);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(df,xcen-b/2*scale-70,
		 ycen+h/2*scale-ly*scale-gapy*scale-df/2*scale);

    // Footing Thickness
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+30+lx*scale,
	       ycen+h/2*scale-ly*scale-gapy*scale-d2*scale);
    ctx.lineTo(xcen-b/2*scale+10+lx*scale,
	       ycen+h/2*scale-ly*scale-gapy*scale-d2*scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+30+lx*scale,
	       ycen+h/2*scale-ly*scale-gapy*scale);
    ctx.lineTo(xcen-b/2*scale+10+lx*scale,
	       ycen+h/2*scale-ly*scale-gapy*scale);
    ctx.stroke();

    drawLineArrow2(xcen-b/2*scale+20+lx*scale,
		   ycen+h/2*scale-ly*scale-gapy*scale,
		   xcen-b/2*scale+20+lx*scale,
		   ycen+h/2*scale-ly*scale-gapy*scale-d2*scale);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(d2,xcen-b/2*scale+30+lx*scale,
		 ycen+h/2*scale-ly*scale-gapy*scale-d2/2*scale);

    // Footing Thickness
    var alpha = 50;
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+30+lx*scale+alpha,
	       ycen+h/2*scale-ly*scale-gapy*scale-d1*scale);
    ctx.lineTo(xcen-b/2*scale+10+lx*scale+alpha,
	       ycen+h/2*scale-ly*scale-gapy*scale-d1*scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+30+lx*scale+alpha,
	       ycen+h/2*scale-ly*scale-gapy*scale);
    ctx.lineTo(xcen-b/2*scale+10+lx*scale+alpha,
	       ycen+h/2*scale-ly*scale-gapy*scale);
    ctx.stroke();

    drawLineArrow2(xcen-b/2*scale+20+lx*scale+alpha,
		   ycen+h/2*scale-ly*scale-gapy*scale,
		   xcen-b/2*scale+20+lx*scale+alpha,
		   ycen+h/2*scale-ly*scale-gapy*scale-d1*scale);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(d1,xcen-b/2*scale+30+lx*scale+alpha,
		 ycen+h/2*scale-ly*scale-gapy*scale-d1/2*scale);

    // GL line for X
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale,
	       ycen+h/2*scale-ly*scale-gapy*scale-df*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale,
	       ycen+h/2*scale-ly*scale-gapy*scale-df*scale);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "gray";
    ctx.stroke();

    ctx.fillText('GL',xcen-b/2*scale+10+lx*scale,
		 ycen+h/2*scale-ly*scale-gapy*scale-df*scale);

    // GL line for Y
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+lx*scale+gapx*scale+df*scale,
	       ycen+h/2*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale+df*scale,
	       ycen+h/2*scale-ly*scale);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "gray";
    ctx.stroke();

    // Draw Rebar
    var i = 1;
    var del = (ly-180)/(numX-1);
    ctx.lineWidth = 1
    ctx.strokeStyle = "blue";

    for ( i = 1; i <=numX; i++ ){
	ctx.beginPath();
	ctx.moveTo(xcen-b/2*scale+90*scale,
		   ycen+h/2*scale-90*scale-del*scale*(i-1));
	ctx.lineTo(xcen-b/2*scale-90*scale+lx*scale,
		   ycen+h/2*scale-90*scale-del*scale*(i-1));
	ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+90*scale,
	       ycen+h/2*scale-90*scale-gapy*scale-ly*scale);
    ctx.lineTo(xcen-b/2*scale-90*scale+lx*scale,
	       ycen+h/2*scale-90*scale-gapy*scale-ly*scale);
    ctx.stroke();


    var del = (lx-180)/(numY-1);
    for ( i = 1; i <=numY; i++ ){
	ctx.beginPath();
	ctx.moveTo(xcen-b/2*scale+90*scale+del*scale*(i-1),
		   ycen+h/2*scale-90*scale);
	ctx.lineTo(xcen-b/2*scale+90*scale+del*scale*(i-1),
		   ycen+h/2*scale+90*scale-ly*scale);
	ctx.lineWidth = 1
	ctx.setLineDash([2]);
	ctx.strokeStyle = "blue";
	ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+90*scale+lx*scale+gapx*scale,
	       ycen+h/2*scale-90*scale);
    ctx.lineTo(xcen-b/2*scale+90*scale+lx*scale+gapx*scale,
	       ycen+h/2*scale+90*scale-ly*scale);
    ctx.lineWidth = 1
    ctx.setLineDash([2]);
    ctx.strokeStyle = "blue";
    ctx.stroke();


    /*
    ctx.arc(xcen-b/2*scale+lx*scale,
	    ycen+h/2*scale-ly*scale,
	    dia/2*scale,0,2*Math.PI,true);
    */

    var result = '';
    result += '<h3>'
    result += 'X-Direction; &nbsp;' + numX + '- DB' + Rebar[stiX].dia*10;
    result += '</h3></p>'
    result += '<p><h3>'
    result += 'Y-Direction; &nbsp;' + numY + '- DB' + Rebar[stiY].dia*10;
    result += '</h3></p>'

    document.getElementById('addRebar').innerHTML = result;
}

function drawLineArrow (x1,y1,x2,y2) {
    var arrow = [
	[ 2, 0 ],
	[ -8, -5 ],
	[ -8, 5 ]
    ];
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    var ang = Math.atan2(y2-y1,x2-x1);
    drawFilledPolygon(translateShape(rotateShape(arrow,ang),x2,y2));
}

function drawLineArrow2 (x1,y1,x2,y2) {
  var arrow = [
      [ 0, 0 ],
	  [ 10, -5 ],
	  [ 10, 5 ]
  ];
  var arrow2 = [
      [ 0, 0 ],
	  [ -10, -5 ],
	  [ -10, 5 ]
  ];
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
  var ang = Math.atan2(y2-y1,x2-x1);
  drawFilledPolygon(translateShape(rotateShape(arrow,ang),x1,y1));
  drawFilledPolygon(translateShape(rotateShape(arrow2,ang),x2,y2));
}

function drawFilledPolygon (shape) {
  ctx.beginPath();
  ctx.moveTo(shape[0][0],shape[0][1]);
  for (p in shape)
    if (p > 0) ctx.lineTo(shape[p][0],shape[p][1]);
  ctx.lineTo(shape[0][0],shape[0][1]);
  ctx.fill();
}

function translateShape (shape,x,y) {
  var rv = [];
  for (p in shape)
    rv.push([ shape[p][0] + x, shape[p][1] + y ]);
  return rv;
}

function rotateShape (shape,ang) {
  var rv = [];
  for (p in shape)
    rv.push(rotatePoint(ang,shape[p][0],shape[p][1]));
  return rv;
}

function rotatePoint (ang,x,y) {
  return [
    (x * Math.cos(ang)) - (y * Math.sin(ang)),
	(x * Math.sin(ang)) + (y * Math.cos(ang))
  ];
}

function output(Direction,
		nux,mux,
		lx,ly,df,cx,cy,lx1,ly1,d1,
		fc,fy,gamma,cover,
		atL,atP,beaCap) {

    //# Eccentricity and axial force including weight of under ground
    lx = lx/1000;
    ly = ly/1000;
    df = df/1000;
    cx = cx/1000;
    cy = cy/1000;
    lx1 = lx1/1000;
    ly1 = ly1/1000;

    var nnx = nux + gamma*lx*ly*df;
    var ex = mux/nnx;

    //" For Soil Pressure"
    var alpha,alphab;
    var sigmin,sigmax;
    var xn;
    var sigmaxSoil,sigminSoil,xnSoil;

    if (ex/lx <= 1.0/6.0 ){
	alpha = 1.0 + 6.0 * ex/lx;
	xnSoil = 'None';
	alphab = 1.0 - 6.0 * ex/lx;
	sigminSoil = alphab*nnx/(lx*ly);
    }
    if (ex/lx > 1.0/6.0 ){
	alpha = 2.0/( 3.0*(0.5-ex/lx) );
	xnSoil = 3.0*lx*(0.5-ex/lx);
	alphab = 0.0;
	sigminSoil = 0.0;
    }
    sigmaxSoil = alpha*nnx/(lx*ly);

    //" Soil pressure to footing"
    var exb = mux/nux;
    var al,alb;
    if (exb/lx <= 1.0/6.0 ){
	al = 1.0 + 6.0 * exb/lx;
	xn = 'None';
	alb = 1.0 + 6.0 * exb/lx;
	sigmax = al*nux/(lx*ly);
	sigmin = alb*nux/(lx*ly);
    }
    if (exb/lx > 1.0/6.0 ){
	al = 2.0/( 3.0*(0.5-exb/lx) );
	xn = 3.0*lx*(0.5-exb/lx);
	sigmax = al*nux/(lx*ly);
	alb = 0.0;
	sigmin = 0.0;
    }

    //# For Shear

    var h  =  lx - lx1 - cx/2;
    var hb =  ly - ly1 - cy/2;

    var hsigb;
    var maxsigb;

    if (exb/lx <= 1.0/6.0){
	hsigb   = (sigmax*(lx-h)+sigmin*h)/lx;
	maxsigb = sigmax;
    }
    if (exb/lx > 1.0/6.0){
	hsigb   = sigmax*(xn-h)/xn;
	maxsigb = sigmax;
    }

    var qx = (hsigb+maxsigb)/2.0 * ly * h;
    var qy = nux*hb/ly;

    var mx = qx * h/3.0 * (2.0*maxsigb + 3.0*hsigb) / (maxsigb+hsigb);
    var my = qy * hb/2.0;


    var d = d1/1000 - cover/1000 - 15/1000;
    var taudx = qx/(ly*d*1000);
    var taudy = qy/(lx*d*1000);
    var tauc = 0.0913*Math.sqrt(fc);
    var reqatx = mx*Math.pow(10,6) / ( 0.875 * d * 1000 * fy);
    var reqaty = my*Math.pow(10,6) / ( 0.875 * d * 1000 * fy);

    var result = '';

    result += "<p>";
    result += "<h3>" + Direction + " Direction </h3>";

    ////////////////////////////////////////////////////////////////////////
    result += "<h4> - Soil pressure </h4>";

    //
    result += "<table><tr>";

    result += "<td>";
    result += " N<sub>u," + Direction + "</sub>' = ";
    result += "</td>";

    result += "<td>";
    result += nnx.toFixed(0);
    result += "</td>";

    result += "<td>";
    result += " kN, &nbsp;";
    result += "</td>";

    result += "<td>";
    result += " M<sub>u," + Direction + "</sub>' = ";
    result += "</td>";

    result += "<td>";
    result += mux.toFixed(0);
    result += "</td>";

    result += "<td>";
    result += " kN.m, &nbsp;";
    result += "</td>";

    result += "</tr></table>";
    result += "<table><tr>";

    result += "<td>";
    result += " e" + Direction + " = N<sub>u," + Direction + "</sub>' / M<sub>u" + Direction + "</sub> = ";
    result += "</td>";

    result += "<td>";
    result += ex.toFixed(3);
    result += "</td>";

    result += "<td>";
    result += " -";
    result += "</td>";

    result += "</tr></table>";

    //
    result += "<table><tr>";

    result += "<td>";
    result += " &alpha; = ";
    result += "</td>";

    result += "<td>";
    result += alpha.toFixed(2);
    result += "</td>";

    result += "<td>";
    result += ", &nbsp;";
    result += "</td>";

    result += "<td>";
    result += " &sigma;<sub>max</sub> = ";
    result += "</td>";

    result += "<td>";
    result += sigmaxSoil.toFixed(0);
    result += "</td>";

    result += "<td>";
    result += " kN/m<sup>2</sup>";
    result += "</td>";

    //
    result += "<tr>";
    result += "</tr>";

    result += "<td>";
    result += " &alpha;<sub>min</sub> = ";
    result += "</td>";

    result += "<td>";
    result += alphab.toFixed(2);
    result += "</td>";

    result += "<td>";
    result += ", &nbsp;";
    result += "</td>";

    result += "<td>";
    result += " &sigma;<sub>max</sub> = ";
    result += "</td>";

    result += "<td>";
    result += sigminSoil.toFixed(0);
    result += "</td>";

    result += "<td>";
    result += " kN/m<sup>2</sup> &nbsp;";
    result += "</td>";

    if( alphab == 0.0 ){
	result += "<td>";
	result += " xn = ";
	result += "</td>";

	result += "<td>";
	result += (xnSoil*1000).toFixed(0);
	result += "</td>";

	result += "<td>";
	result += " mm, -UP LIFT)";
	result += "</td>";
    }

    result += "</tr></table>";

    result += '<p Align="right" style="color:red;">';
    if( sigmaxSoil/ beaCap < 1.0 ){
	result += "<b>-----OK</b>";
    }
    else{
	result += "<b>-----NG</b>";
    }

    ////////////////////////////////////////////////////////////////////////
    result += "<h4> - Pressure to footing </h4>";

    //
    result += "<table><tr>";

    result += "<td>";
    result += "e" + Direction + "' = N<sub>u" + Direction + "</sub> / M<sub>u" + Direction + "</sub> = ";
    result += "</td>";

    result += "<td>";
    result += exb.toFixed(3);
    result += "</td>";

    result += "<td>";
    result += " -";
    result += "</td>";

    result += "</tr></table>";

    //
    result += "<table><tr>";

    result += "<td>";
    result += " &alpha; = ";
    result += "</td>";

    result += "<td>";
    result += al.toFixed(2);
    result += "</td>";

    result += "<td>";
    result += ", &nbsp;";
    result += "</td>";

    result += "<td>";
    result += " &sigma;<sub>max</sub> = ";
    result += "</td>";

    result += "<td>";
    result += sigmax.toFixed(0);
    result += "</td>";

    result += "<td>";
    result += " kN/m<sup>2</sup>";
    result += "</td>";

    //
    result += "<tr>";
    result += "</tr>";

    result += "<td>";
    result += " &alpha;<sub>min</sub> = ";
    result += "</td>";

    result += "<td>";
    result += alb.toFixed(2);
    result += "</td>";

    result += "<td>";
    result += ", &nbsp;";
    result += "</td>";

    result += "<td>";
    result += " &sigma;<sub>max</sub> = ";
    result += "</td>";

    result += "<td>";
    result += sigmin.toFixed(0);
    result += "</td>";

    result += "<td>";
    result += " kN/m<sup>2</sup> &nbsp;";
    result += "</td>";

    if( alb == 0.0 ){
	result += "<td>";
	result += " xn = ";
	result += "</td>";

	result += "<td>";
	result += (xn*1000).toFixed(0);
	result += "</td>";

	result += "<td>";
	result += " mm, -UP LIFT";
	result += "</td>";
    }

    result += "</tr></table>";

    ////////////////////////////////////////////////////////////////////////
    result += "<h4> - Stress of footing </h4>";

    //
    result += "<table><tr>";

    result += "<td>";
    result += " V<sub>L</sub> = ";
    result += "</td>";

    result += "<td>";
    result += qx.toFixed(0);
    result += "</td>";

    result += "<td>";
    result += "kN, &nbsp;";
    result += "</td>";

    result += "<td>";
    result += " M<sub>L</sub> = "
    result += "</td>";

    result += "<td>";
    result += mx.toFixed(0);
    result += "</td>";

    result += "<td>";
    result += " kN.m";
    result += "</td>";

    //
    result += "<tr>";
    result += "</tr>";

    result += "<td>";
    result += " V<sub>P</sub> = ";
    result += "</td>";

    result += "<td>";
    result += qy.toFixed(0);
    result += "</td>";

    result += "<td>";
    result += "kN, &nbsp;";
    result += "</td>";

    result += "<td>";
    result += " M<sub>P</sub>  ="
    result += "</td>";

    result += "<td>";
    result += my.toFixed(0);
    result += "</td>";

    result += "<td>";
    result += " kN.m";
    result += "</td>";

    result += "</td>";

    result += "</tr></table>";

    ////////////////////////////////////////////////////////////////////////
    result += "<h4> - Capacity Check </h4>";

    //
    result += "<table><tr>";

    result += "<td>";
    result += " &tau;<sub>L</sub>; = ";
    result += "</td>";

    result += "<td>";
    result += taudx.toFixed(2);
    result += "</td>";

    result += "<td>";
    result += "N/mm<sup>2</sup>, &nbsp;";
    result += "</td>";

    result += "<td>";
    result += " &tau;<sub>P</sub> = "
    result += "</td>";

    result += "<td>";
    result += taudy.toFixed(2);
    result += "</td>";

    result += "<td>";
    result += " N/mm<sup>2</sup>";
    result += "</td>";

    //
    result += "</tr>";
    result += "<tr>";

    result += "<td>";
    result += " req( a<sub>L</sub> ) = ";
    result += "</td>";

    result += "<td>";
    result += reqatx.toFixed(0);
    result += "</td>";

    result += "<td>";
    result += "mm<sup>2</sup>, &nbsp;";
    result += "</td>";

    result += "<td>";
    result += " req( a<sub>P</sub> ) =";
    result += "</td>";

    result += "<td>";
    result += reqaty.toFixed(0);
    result += "</td>";

    result += "<td>";
    result += " mm<sup>2</sup>";
    result += "</td>";

    result += "</td>";

    result += "</tr>";
    result += "<tr>";

    result += "<td>";
    result += " a<sub>L</sub> = ";
    result += "</td>";

    result += "<td>";
    result += atL.toFixed(0);
    result += "</td>";

    result += "<td>";
    result += "mm<sup>2</sup>, &nbsp;";
    result += "</td>";

    result += "<td>";
    result += " a<sub>P</sub> =";
    result += "</td>";

    result += "<td>";
    result += atP.toFixed(0);
    result += "</td>";

    result += "<td>";
    result += " mm<sup>2</sup>";
    result += "</td>";

    result += "</td>";

    //////////////////////////////
    result += "</tr>";
    result += "<tr>";
    //////////////////////////////

    result += "<td>";
    result += " req a<sub>L</sub> / a<sub>L</sub> = ";
    result += "</td>";

    result += "<td>";
    result += (reqatx/atL).toFixed(2);
    result += "</td>";

    result += "<td>";
    result += "&nbsp;";
    result += "</td>";

    result += "<td>";
    result += " req a<sub>P</sub> / a<sub>P</sub> =";
    result += "</td>";

    result += "<td>";
    result += (reqaty/atP).toFixed(2);
    result += "</td>";

    result += "<td>";
    result += "";
    result += "</td>";

    result += "</td>";

    result += "</tr></table>";

    result += '<p Align="right" style="color:red;">';

    if( Math.min( reqatx/atL,reqaty/atP )< 1.0 ){
	result += "<b>-----OK</b>";
    }
    else{
	result += "<b>-----NG</b>";
    }




    // --------------------------------------------------
    // --------------------------------------------------
    // END

    result += "</p>";
    document.getElementById('result'+Direction).innerHTML = result;

}

//------------------------------------------------------------------
// Steel Rebar Data
//------------------------------------------------------------------

function STobj(name,dia,As,O) {
    this.name = name;
    this.dia = dia;
    this.As = As;
    this.O = O;
}

var Rebar = new Array();

Rebar[0] = new STobj("DB12",1.2,1.13,3.77);
Rebar[1] = new STobj("DB16",1.6,2.01,5.03);
Rebar[2] = new STobj("DB20",2.0,3.14,6.28);
Rebar[3] = new STobj("DB25",2.5,4.91,7.85);
Rebar[4] = new STobj("DB28",2.8,6.16,8.80);
Rebar[5] = new STobj("DB32",3.2,8.04,10.05);

var Vbar = new Array();

Vbar[0] = new STobj("RB9",0.9,0.636,2.82);
Vbar[1] = new STobj("DB10",1.0,0.785,3.14);
Vbar[2] = new STobj("DB12",1.2,1.13,3.77);

function changeFooting(){
    var lx = document.getElementById('lx').value ;
    var ly = document.getElementById('ly').value ;
    document.getElementById('lx1').value = lx/2;
    document.getElementById('ly1').value = ly/2;
}

function Reset(){
    document.getElementById('result'+'X').innerHTML = '';
    document.getElementById('result'+'Y').innerHTML = '';
}
