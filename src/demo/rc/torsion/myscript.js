window.onload = function (){

    var vu = 160;
    var tu = 15.0;
    var bw = 300;
    var h = 600;

    var coverSide = 40;
    var coverTop = 60;
    var coverBot = 40;

    var fc = 21.0;
    var fy = 390;
    var fyt = 240;
    var phi = 0.75;

    var pitchT =  150;
    var lnum = 4;

    var avIndex = 0;
    var avPitch = 200;
    var avStrNum = 0;
    var avIndex2 = 0;
    var avPitch2 = 200;

    var nxtop = 3;
    var nxtop2 = 2;
    var sti = 2;
    var stiTop2 = 2;
    var nxbot = 3;
    var nxbot2 = 0;
    var stiBot = 2;
    var stiBot2 = 2;

    ////////////////////////////////////////////////////////////////////////
    document.getElementById('job').value = 'New Project';
    document.getElementById('vu').value = vu;
    document.getElementById('tu').value= tu;
    document.getElementById('bw').value = bw;
    document.getElementById('h').value = h;
    //
    document.getElementById('coverSide').value = coverSide;
    document.getElementById('coverTop').value = coverTop;
    document.getElementById('coverBot').value = coverBot;
    //
    document.getElementById('fc').value = fc;
    document.getElementById('fy').value = fy;
    document.getElementById('fyt').value = fyt;
    document.getElementById('phi').value = phi;
    //
    document.TorsionForm.DiaTorsionName.selectedIndex = 1;
    document.getElementById('pitchTorsion').value = pitchT;
    document.getElementById('lnum').value = lnum;
    document.LongForm.DiaLongName.selectedIndex = 1;
    //
    document.ShearForm.DiaShearName.selectedIndex = avIndex;
    document.getElementById('pitch').value = avPitch;
    document.getElementById('strNum').value = avStrNum;
    document.ShearForm2.DiaShearName2.selectedIndex = avIndex2;
    document.getElementById('pitch2').value = avPitch2;
    //
    document.getElementById('topNum').value = nxtop;
    document.getElementById('topNum2').value = nxtop2;
    document.topRebarForm.topRebarName.selectedIndex = sti;
    document.topRebarForm2.topRebarName2.selectedIndex = stiTop2;
    //
    document.getElementById('botNum').value = nxbot;
    document.getElementById('botNum2').value = nxbot2;
    document.botRebarForm.botRebarName.selectedIndex = stiBot;
    document.botRebarForm2.botRebarName2.selectedIndex = stiBot2;

    ////////////////////////////////////////////////////////////////////////
    DrawSec();
}


////////////////////////////////////////////////////////////////////////
var downloadAsFile = function(fileName, content) {

    var textArray = [];

    var npara = 29;
    textArray[0]    = document.title;
    textArray[1]    = document.getElementById('job').value ;
    //
    textArray[2]    = document.getElementById('vu').value ;
    textArray[3]    = document.getElementById('tu').value;
    textArray[4]    = document.getElementById('bw').value ;
    textArray[5]    = document.getElementById('h').value ;
    //
    textArray[6]    = document.getElementById('coverSide').value ;
    textArray[7]    = document.getElementById('coverTop').value ;
    textArray[8]    = document.getElementById('coverBot').value ;
    //
    textArray[9]    = document.getElementById('fc').value ;
    textArray[10]    = document.getElementById('fy').value ;
    textArray[11]    = document.getElementById('fyt').value ;
    textArray[12]    = document.getElementById('phi').value ;
    //
    textArray[13]    = document.TorsionForm.DiaTorsionName.selectedIndex ;
    textArray[14]    = document.getElementById('pitchTorsion').value ;
    textArray[15]    = document.getElementById('lnum').value ;
    textArray[16]    = document.LongForm.DiaLongName.selectedIndex ;
    //
    textArray[17]    = document.ShearForm.DiaShearName.selectedIndex ;
    textArray[18]    = document.getElementById('pitch').value ;
    textArray[19]    = document.getElementById('strNum').value ;
    textArray[20]    = document.ShearForm2.DiaShearName2.selectedIndex ;
    textArray[21]    = document.getElementById('pitch2').value ;
    //
    textArray[22]    = document.getElementById('topNum').value ;
    textArray[23]    = document.getElementById('topNum2').value ;
    textArray[24]    = document.topRebarForm.topRebarName.selectedIndex ;
    textArray[25]    = document.topRebarForm2.topRebarName2.selectedIndex ;
    //
    textArray[26]    = document.getElementById('botNum').value ;
    textArray[27]    = document.getElementById('botNum2').value ;
    textArray[28]    = document.botRebarForm.botRebarName.selectedIndex ;
    textArray[29]    = document.botRebarForm2.botRebarName2.selectedIndex ;

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

	    document.title = textArray[0]    ;
	    document.getElementById('job').value  = textArray[1]    ;
	    //
	    document.getElementById('vu').value  = textArray[2]    ;
	    document.getElementById('tu').value = textArray[3]    ;
	    document.getElementById('bw').value  = textArray[4]    ;
	    document.getElementById('h').value  = textArray[5]    ;
	    //
	    document.getElementById('coverSide').value  = textArray[6]    ;
	    document.getElementById('coverTop').value  = textArray[7]    ;
	    document.getElementById('coverBot').value  = textArray[8]    ;
	    //
	    document.getElementById('fc').value  = textArray[9]    ;
	    document.getElementById('fy').value  = textArray[10]    ;
	    document.getElementById('fyt').value  = textArray[11]    ;
	    document.getElementById('phi').value  = textArray[12]    ;
	    //
	    document.TorsionForm.DiaTorsionName.selectedIndex  = textArray[13]    ;
	    document.getElementById('pitchTorsion').value  = textArray[14]    ;
	    document.getElementById('lnum').value  = textArray[15]    ;
	    document.LongForm.DiaLongName.selectedIndex  = textArray[16]    ;
	    //
	    document.ShearForm.DiaShearName.selectedIndex  = textArray[17]    ;
	    document.getElementById('pitch').value  = textArray[18]    ;
	    document.getElementById('strNum').value  = textArray[19]    ;
	    document.ShearForm2.DiaShearName2.selectedIndex  = textArray[20]    ;
	    document.getElementById('pitch2').value  = textArray[21]    ;
	    //
	    document.getElementById('topNum').value  = textArray[22]    ;
	    document.getElementById('topNum2').value  = textArray[23]    ;
	    document.topRebarForm.topRebarName.selectedIndex  = textArray[24]    ;
	    document.topRebarForm2.topRebarName2.selectedIndex  = textArray[25]    ;
	    //
	    document.getElementById('botNum').value  = textArray[26]    ;
	    document.getElementById('botNum2').value  = textArray[27]    ;
	    document.botRebarForm.botRebarName.selectedIndex  = textArray[28]    ;
	    document.botRebarForm2.botRebarName2.selectedIndex  = textArray[29]    ;

	    OnButtonClick();

	}
    },false);

}

////////////////////////////////////////////////////////////////////////


// Exe
function OnButtonClick(){


    // Input

    var vu = Number(document.getElementById('vu').value);
    var tu = Number(document.getElementById('tu').value);
    var bw = Number(document.getElementById('bw').value);
    var h = Number(document.getElementById('h').value);
    var fc = Number(document.getElementById('fc').value);
    var phi = Number(document.getElementById('phi').value);
    var fy = Number(document.getElementById('fy').value);
    var fyt = Number(document.getElementById('fyt').value);

    var coverSide = Number(document.getElementById('coverSide').value);
    var coverTop = Number(document.getElementById('coverTop').value);
    var coverBot = Number(document.getElementById('coverBot').value);
    var diaT =  Number(document.TorsionForm.DiaTorsionName.value);

    var pitchT =  Number(document.getElementById('pitchTorsion').value);


    // Start Cal
    var bwtorsion = bw - 2.0*coverSide - diaT;
    var htorsion = h - coverTop - coverBot - diaT;

    var lamda = 1.0; // Normal Concrete
    var d = Math.min(h-coverBot-diaT-16,h-coverTop-diaT-16); // Effective Depth

    var acp = bw*h;
    var pcp = 2.0*(1.0*bw+1.0*h);
    var aoh = bwtorsion*htorsion;
    var ph = 2.0*(bwtorsion+htorsion);

    // Neglective Tortional Moment
    var tnn; // Neglective Totional Moment;
    tnn = phi * 0.083 * lamda * Math.sqrt(fc) * ( Math.pow(acp,2)/pcp );
    tnn = tnn/Math.pow(10,6);

    // Reduction due to Re-Distribution
    var modtu = phi * 0.33 * lamda * Math.sqrt(fc) *  ( Math.pow(acp,2)/pcp );
    modtu = modtu/Math.pow(10,6);

    // Comination Loads Check;
    var vc,vctau;
    var taumax, taumax1, taumax2;
    var tauU, tauVu, tauTu;

    tauVu = vu*1000.0/(bw*d);
    tauTu = (tu*Math.pow(10,6)*ph)/(1.7*aoh*aoh);

    vctau = 0.17* lamda * Math.sqrt(fc);
    vc = vctau * bw * d;

    taumax1 = vctau;
    taumax2 = 0.66*Math.sqrt(fc);

    taumax = taumax1 + taumax2;
    tauU = tauVu + tauTu;

    var tauComb;
    tauComb = Math.sqrt(Math.pow(tauVu,2)+Math.pow(tauTu,2));

    // Nominal Tortional Moment Strength

    var tn;
    var ao = 0.85*aoh;

    var s = pitchT;

    var at = Number(Vbar[document.TorsionForm.DiaTorsionName.selectedIndex].As);


    tn = 2.0*ao*at*fyt/s;
    tn = tn/Math.pow(10,6);

    // Longitudinal Reinforcement

    var al;
    al = tu*Math.pow(10,6)/(2.0*ao*fyt);
    al = al*ph*(fyt/fy);

    var diaAs = Number(Rebar[document.LongForm.DiaLongName.selectedIndex].As);
    var diaLong = document.LongForm.DiaLongName.value;

    var lnum = Number(document.getElementById('lnum').value);
    var las = lnum*diaAs;

    // Minimum Transverse Reinforcement
    var avmin;
    var avmin1,avmin2;

    avmin1 = 0.062 * Math.sqrt(fc) * bw*s/fyt;
    avmin2 = 0.35*bw*s/fyt;
    avmin = Math.max(avmin1,avmin2);

    var av;
    var avIndex = document.ShearForm.DiaShearName.selectedIndex;
    var avPitch = document.getElementById('pitch').value;
    var avIndex2 = document.ShearForm2.DiaShearName2.selectedIndex;
    var avStrNum = document.getElementById('strNum').value;
    var avPitch2= document.getElementById('pitch2').value;

    av = 2.0* Vbar[avIndex].As *( s/ avPitch ) + avStrNum * Vbar[avIndex2].As * ( s / avPitch2 );

    // Minimum Longitudinal Reinformacement

    var almin;
    var almin1,almin2;

    almin1 = 0.42*Math.sqrt(fc)*acp/fy - at/s*ph*fyt/fy;
    almin2 = 0.175*bw/fyt;
    almin = Math.max(almin1,almin2);


    var result = '';

    //
    result += '<h4> - Neglective Torsional Moment </h4>';

    result += '<table><tr>';
    result += '<td>';
    result += 'Neglective Torsional Moment T<sub>n</sub>\' = ';
    result += '</td><td>';
    result += tnn.toFixed(2) + 'kN.m';
    result += '</td>';
    result += '</tr></table>';

    //
    result += '<h4> - Reduction due to  Re-Distribution </h4>';
    result += '<table><tr>';
    result += '<td>';
    result += 'Maximum Torsional Moment T<sub>u,max</sub> = ';
    result += '</td><td>';
    result += modtu.toFixed(2) + 'kN.m';
    result += '</td>';
    result += '</tr></table>';


    //
    result += '<h4> - Cross-sectional dimensions </h4>';

    result += '<table><tr>';
    result += '<td>';
    result += ' p<sub>h</sub>  =';
    result += '</td><td>';
    result += ph.toFixed(0) + 'mm, &nbsp;';
    result += '</td><td>';
    result += ' A<sub>oh</sub>  =';
    result += '</td><td>';
    result += aoh.toFixed(0) + 'mm<sup>2</sup>, &nbsp;';
    result += '</td>';
    result += '</tr></table>';

    result += '<table><tr>';
    result += '<td>';
    result += ' V<sub>u</sub> / ( b<sub>w</sub> d)  = ';
    result += '</td><td>';
    result += tauVu.toFixed(2) + 'N/mm<sup>2</sup>, &nbsp;';
    result += '</td><td>';
    result += ' ( T<sub>u</sub> p<sub>h</sub> ) / ( 1.7 A<sub>oh</sub><sup>2</sup> ) =';
    result += '</td><td>';
    result += tauTu.toFixed(2) + 'N/mm<sup>2</sup>, &nbsp; Then, ';
    result += '</td><td>';
    result += '&radic; (' + tauVu.toFixed(2) + '<sup>2</sup> + ' + tauTu.toFixed(2) + '<sup>2</sup> ) = ';
    result += '</td><td>';
    result += tauComb.toFixed(2) + 'N/mm<sup>2</sup>';
    result += '</td>';
    result += '</tr></table>';

    result += '<table><tr>';
    result += '<td>';
    result += ' V<sub>c</sub> / (b<sub>w</sub> d )= 0.17 &lambda; &radic; (f<sub>c</sub>) = ';
    result += '</td><td>';
    result += vctau.toFixed(2) + 'N/mm<sup>2</sup>, &nbsp;';
    result += '</td><td>';
    result += ' 0.66 &radic; (f<sub>c</sub> ) = ';
    result += '</td><td>';
    result += taumax2.toFixed(2) + 'N/mm<sup>2</sup>, &nbsp;';
    result += '</td><td>';
    result += '&phi; (' + taumax1.toFixed(2) + ' + ' + taumax2.toFixed(2) + ' ) = ';
    result += '</td><td>';
    result += (phi*taumax).toFixed(2) + 'N/mm<sup>2</sup>, &nbsp;';
    result += '</td>';
    result += '</tr></table>';

    result += '<p Align="right" style="color:red;">';
    if( phi*taumax > tauComb ){
	result += '------ OK';
    }
    else{
	result += '------ NG!!!!';
    }
    result += '</p>';


    //
    result += '<h4> - Nominal Strength </h4>';
    result += '<table><tr>';
    result += '<td>';
    result += 'T<sub>n</sub> = 2 A<sub>o</sub> A<sub>t</sub> f<sub>yt</sub> / s = ';
    result += '</td><td>';
    result += tn.toFixed(2) + 'kN.m';
    result += '</td>';
    result += '</tr></table>';

    result += '<table><tr>';
    result += '<td>';
    result += ' &phi; T<sub>n</sub> = ';
    result += '</td><td>';
    result += phi.toFixed(2) + ' x ' + tn.toFixed(2) + '=';
    result += '</td><td>';
    result += (phi*tn).toFixed(2) + ' kN.m ';

    result += '</td>';
    result += '</tr></table>';

    result += '<p Align="right" style="color:red;">';
    if( phi*tn > tu ){
	result += ' > T<sub>u</sub> = ' + tu.toFixed(2) ;
	result += ' ( &phi; T<sub>n</sub>/ T<sub>u</sub> = ' + (phi*tn/tu).toFixed(2) + ')'+ ' --- OK';
    }
    else{
	result += ' < T<sub>u</sub> = ' + tu.toFixed(2);
	result += ' ( &phi; T<sub>n</sub>/ T<sub>u</sub> = ' + (phi*tn/tu).toFixed(2) + ')' + ' --- <u>NG</u>';
    }
    result += '</p>';

    //
    result += '<h4> - Longitudinal reinforcement </h4>';
    result += '<table><tr>';
    result += '<td>';
    result += 'A<sub>l</sub> = ( A<sub>t</sub> / s ) p<sub>h</sub> ( f<sub>yt</sub> / f<sub>y</sub> ) cot<sup>2</sup>&theta; = ';
    result += '</td><td>';
    result += al.toFixed(0) + 'mm<sup>2</su>';
    result += '</td><td>';
    result += ', &nbsp; -> &nbsp; Use ' + lnum.toFixed(0) + '-' + diaLong;
    result += '</td><td>';
    result += ', &nbsp; A<sub>l</sub>  = ';
    result += '</td><td>';
    result += las.toFixed(0) + 'mm<sup>2</sup>';
    result += '</td>';
    result += '</tr></table>';

    result += '<p Align="right" style="color:red;">';
    if( al < las ){
	result += '------ OK';
    }
    else{
	result += '------ NG!!!!';
    }
    result += '</p>';


    //
    result += '<h4> - Minimu Reinforcement </h4>';

    result += '<table><tr>';
    result += '<td>';
    result += 'A<sub>v</sub> + 2 A<sub>t</sub> = ';
    result += '</td><td>';
    result += (av+2*at).toFixed(0) + 'mm<sup>2</sup>';
    result += '</td>';
    result += '</tr></table>';

    result += '<table><tr>';
    result += '<td>';
    result += '( A<sub>v</sub> + 2 A<sub>t</sub> )<sub>min</sub>= Max[ 0.062 &radic;(f<sub>c</sub>) b<sub>w</sub> s / f<sub>yt</sub> , 0.35 b<sub>w</sub> s / f<sub>yt</sub> ] = ';
    result += '</td><td>';
    result += avmin.toFixed(0) + 'mm<sup>2</sup>';
    result += '</td>';
    result += '</tr></table>';

    result += '<p Align="right" style="color:red;">';
    if( avmin < av+2*al ){
	result += '------ OK';
    }
    else{
	result += '------ NG!!!!';
    }
    result += '</p>';

    result += '<table><tr>';
    result += '<td>';
    result += 'A<sub>l,min</sub> = Max[ 0.42 &radic;(f<sub>c</sub>) A<sub>cp</sub> / f<sub>y</sub> - (A<sub>t</sub>/s) p<sub>h</sub> f<sub>yt</sub> / f<sub>y</sub> , 0.175 b<sub>w</sub> / f<sub>yt</sub> ] = ';
    result += '</td><td>';
    result += almin.toFixed(0) + 'mm<sup>2</sup>';
    result += '</td>';
    result += '</tr></table>';

    result += '<p Align="right" style="color:red;">';
    if( almin < las ){
	result += '------ OK';
    }
    else{
	result += '------ NG!!!!';
    }
    result += '</p>';

    result += '<table><tr>';
    result += '<td>';
    result += 'Spacing of transverse torsion reinforcement; Min[ p<sub>h</sub>/8 , 300mm ] =  ';
    result += '</td><td>';
    result += (Math.min(ph/8.0,300)).toFixed(0) + 'mm';
    result += '</td>';
    result += '</tr></table>';

    result += '<p Align="right" style="color:red;">';
    if( (Math.min(ph/8.0,300)) > s ){
	result += '------ OK';
    }
    else{
	result += '------ NG!!!!';
    }
    result += '</p>';

    //
    result += '</p>';
    document.getElementById('result').innerHTML = result;

    DrawSec();

}

// Draw Beam Section Per Input Data
var canvas, ctx;
var scale, xscale, yscale, xcen, ycen;
function ST2obj(name,dia,As,x,y,fs) {
    this.name = name;
    this.dia = dia;
	this.As = As;
	this.x = x;
	this.y = y;
	this.fs = fs;
}
var Steel = new Array();
var rhog, Ag, Ast;

function DrawSec () {

    var h = Number(document.getElementById('h').value);
    var b = Number(document.getElementById('bw').value);
    var cover = Number(document.getElementById('coverSide').value);

    var coverSide = Number(document.getElementById('coverSide').value);
    var coverTop = Number(document.getElementById('coverTop').value);
    var coverBot = Number(document.getElementById('coverBot').value);

    var diat =  Number(document.TorsionForm.DiaTorsionName.value);

    var bwtorsion = b - 2.0*coverSide - diat;
    var htorsion = h - coverTop - coverBot - diat;

//    var sti = form.rebar.selectedIndex;

    var result = '<canvas width=\"260\" height=\"235\" id=\"picCanvas\"></canvas>';
    document.getElementById('picture').innerHTML = result;

    var canvas = document.getElementById('picCanvas');
    ctx = canvas.getContext("2d");

    var xcen = canvas.width / 2 - 35;
    var ycen = canvas.height / 2 + 20;

    var xscale = (canvas.width-110)/b;
    var yscale = (canvas.height-80)/h;
    var scale = (xscale < yscale) ? xscale : yscale;
    var strIndex = Number(document.TorsionForm.DiaTorsionName.selectedIndex);


    // Draw Beam Section
    ctx.beginPath();
    ctx.rect(xcen-b/2*scale,ycen-h/2*scale,b*scale,h*scale);
    ctx.fillStyle = "rgb(242,244,255)";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Draw Beam Torsional Str.
    ctx.beginPath();
    ctx.rect(xcen-bwtorsion/2*scale,ycen-h/2*scale+coverTop*scale+Vbar[strIndex].dia/2*scale,bwtorsion*scale,htorsion*scale);
    ctx.lineWidth = diat*scale;
    ctx.strokeStyle = "blue";
    ctx.stroke();

    ctx.lineWidth = 1;

    // Draw Dimension Lines
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.font = "12pt sans-serif";
    ctx.textAlign = "center";

    // Draw Beam Dimensions
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale,ycen-h/2*scale-10);
    ctx.lineTo(xcen-b/2*scale,ycen-h/2*scale-30);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen+b/2*scale,ycen-h/2*scale-10);
    ctx.lineTo(xcen+b/2*scale,ycen-h/2*scale-30);
    ctx.stroke();
    drawLineArrow2(xcen-b/2*scale,ycen-h/2*scale-20,xcen+b/2*scale,ycen-h/2*scale-20);
    ctx.fillText(b+' mm',xcen,ycen-h/2*scale-30);

    ctx.beginPath();
    ctx.moveTo(xcen+b/2*scale+10,ycen-h/2*scale);
    ctx.lineTo(xcen+b/2*scale+30,ycen-h/2*scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen+b/2*scale+10,ycen+h/2*scale);
    ctx.lineTo(xcen+b/2*scale+30,ycen+h/2*scale);
    ctx.stroke();

    drawLineArrow2(xcen+b/2*scale+20,ycen-h/2*scale,xcen+b/2*scale+20,ycen+h/2*scale);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(h+' mm',xcen+b/2*scale+30,ycen);

    // Create Steel Array & Check
    var xpos, ypos, spac;
    Ag = b*h;
//    nx = Number(form.nx.value);
    var nxtop = Number( document.getElementById('topNum').value );
    var nxtop2 = Number( document.getElementById('topNum2').value );
    var sti = Number(document.topRebarForm.topRebarName.selectedIndex);
    var stiTop2 = Number(document.topRebarForm2.topRebarName2.selectedIndex);

    var nxbot = Number( document.getElementById('botNum').value );
    var nxbot2 = Number( document.getElementById('botNum2').value );
    var stiBot = Number(document.botRebarForm.botRebarName.selectedIndex);
    var stiBot2 = Number(document.botRebarForm2.botRebarName2.selectedIndex);

    var ny = Number(document.getElementById('lnum').value)/2 + 2;
    var stiSide = Number(document.LongForm.DiaLongName.selectedIndex);

    if (nxtop < 2 || nxbot <2 ) {
	alert('At leaset, 2 Layers needed');
	return;
    }
    //    spac = (b - 2*coverSide - nx*Rebar[sti].dia)/(nx-1);

    if (ny < 2) {
	alert('At leaset, 2 Layers needed');
	return;
    }
    spac = (h - 2*cover - ny*Rebar[sti].dia)/(ny-1);
    ns = nxtop + nxtop2 + nxbot + nxbot2 + 2*ny - 4;

    var idx = 0;

    // Top Rebar, Layer 1
    spac = (b - 2*coverSide - 2*Vbar[strIndex].dia - Rebar[sti].dia)/(nxtop-1);
    for (var i = 0; i < nxtop; i++) {
	xpos = -b/2 + cover + Vbar[strIndex].dia + Rebar[sti].dia/2 + spac*i;
	ypos = h/2 - coverTop - Vbar[strIndex].dia - Rebar[sti].dia/2;
	Steel[idx++] = new ST2obj(Rebar[sti].name,Rebar[sti].dia,Rebar[sti].As,xpos,-ypos,0);
    }
    // Top Rebar, Layer 2
    spac = (b - 2*coverSide - 2*Vbar[strIndex].dia - Rebar[sti].dia)/(nxtop2-1);
    for (var i = 0; i < nxtop2; i++) {
	xpos = -b/2 + cover + Vbar[strIndex].dia + Rebar[sti].dia/2 + spac*i;
	ypos = h/2 - coverTop - Vbar[strIndex].dia - Rebar[sti].dia/2 - Rebar[stiTop2].dia*2.7;
	Steel[idx++] = new ST2obj(Rebar[sti].name,Rebar[stiTop2].dia,Rebar[stiTop2].As,xpos,-ypos,0);
    }

    // Bot Rebar, Layer 1
    spac = (b - 2*coverSide - 2*Vbar[strIndex].dia - Rebar[sti].dia)/(nxbot-1);
    for (var i = 0; i < nxbot; i++) {
	xpos = -b/2 + cover + Vbar[strIndex].dia + Rebar[sti].dia/2 + spac*i;
	ypos = h/2 - coverBot - Vbar[strIndex].dia - Rebar[sti].dia/2;
	Steel[idx++] = new ST2obj(Rebar[sti].name,Rebar[stiBot].dia,Rebar[stiBot].As,xpos,ypos,0);
    }

    // Bot Rebar, Layer 2
    spac = (b - 2*coverSide - 2*Vbar[strIndex].dia - Rebar[sti].dia)/(nxbot2-1);
    for (var i = 0; i < nxbot2; i++) {
	xpos = -b/2 + cover + Vbar[strIndex].dia + Rebar[sti].dia/2 + spac*i;
	ypos = h/2 - coverBot - Vbar[strIndex].dia - Rebar[sti].dia/2 - Rebar[stiBot2].dia*2.7;
	Steel[idx++] = new ST2obj(Rebar[sti].name,Rebar[stiBot2].dia,Rebar[stiBot2].As,xpos,ypos,0);
    }

    // Side Rebar
    spac = (h - coverTop - coverBot - Rebar[sti].dia)/(ny-1);

    for (var i = 1; i < ny-1; i++) {
	xpos = b/2 - cover - Vbar[strIndex].dia - Rebar[sti].dia/2;
	ypos = -h/2 + coverTop + Rebar[sti].dia/2 + spac*i;
	Steel[idx++] = new ST2obj(Rebar[sti].name,Rebar[stiSide].dia,Rebar[sti].As,-xpos,ypos,0);
	Steel[idx++] = new ST2obj(Rebar[sti].name,Rebar[stiSide].dia,Rebar[sti].As,xpos,ypos,0);
    }

    // Draw Rebar
    ctx.fillStyle = "red";
    for (var i = 0; i < ns; i++) {
	ctx.beginPath();
	ctx.arc(xcen+Steel[i].x*scale,ycen+Steel[i].y*scale,Steel[i].dia/2*scale,0,2*Math.PI,true);
	ctx.fill();
    }

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

Rebar[0] = new STobj("DB12",12,113,37.7);
Rebar[1] = new STobj("DB16",16,201,50.3);
Rebar[2] = new STobj("DB20",20,314,62.8);
Rebar[3] = new STobj("DB25",25,491,78.5);
Rebar[4] = new STobj("DB28",28,616,88.0);
Rebar[5] = new STobj("DB32",32,804,100.5);

var Vbar = new Array();

Vbar[0] = new STobj("RB9",9,63.6,28.2);
Vbar[1] = new STobj("DB10",10,78.5,31.4);
Vbar[2] = new STobj("DB12",12,113.0,37.7);
