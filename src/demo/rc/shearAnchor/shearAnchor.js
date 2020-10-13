var downloadAsFile = function(fileName, content) {

    var textArray = [];
    textArray[0]    = document.getElementById('job').value;
    textArray[1]    = document.getElementById('vu').value;
    textArray[2]    = document.getElementById('phi').value;
    textArray[3]    = document.getElementById('fc').value;
    textArray[4]    = document.inputform.da.selectedIndex;
    textArray[5]    = document.getElementById('hef').value;
    textArray[6]    = document.getElementById('na').value;
    textArray[7]    = document.getElementById('ca1').value;
    textArray[8]    = document.getElementById('ca2').value;
    textArray[9]    = document.getElementById('ca3').value;
    textArray[10]    = document.getElementById('s').value;
    textArray[11]    = document.getElementById('ha').value;
    textArray[12]    = document.getElementById('ev').value;
    textArray[13]    = document.inputform.psicv.selectedIndex;

    var content ='';
    var i;
    for( i = 0; i<=13; i++){
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

	    document.getElementById('job').value = textArray[0];
	    document.getElementById('vu').value = textArray[1];
	    document.getElementById('phi').value = textArray[2];
	    document.getElementById('fc').value = textArray[3];
	    document.inputform.da.selectedIndex = textArray[4];
	    document.getElementById('hef').value = textArray[5];
	    document.getElementById('na').value = textArray[6];
	    document.getElementById('ca1').value = textArray[7];
	    document.getElementById('ca2').value = textArray[8];
	    document.getElementById('ca3').value = textArray[9];
	    document.getElementById('s').value = textArray[10];
	    document.getElementById('ha').value = textArray[11];
	    document.getElementById('ev').value = textArray[12];
	    document.inputform.psicv.selectedIndex = textArray[13];

	    DrawSec(inputform);
	    ModByRF(inputform);
	    OnButtonClick();

	}
    },false);

}

//////////////////////////////////////////////////

/*
var obj1 = document.getElementById("selfile");

//ダイアログでファイルが選択された時
obj1.addEventListener("change",function(evt){

    var file = evt.target.files;

    //FileReaderの作成
    var reader = new FileReader();
    //テキスト形式で読み込む
    reader.readAsText(file[0]);

    //読込終了後の処理
    reader.onload = function(ev){

	//CR+LF,CR,LF のいずれかの改行コードでsplitします。
	var textArray = reader.result.split(/\r\n|\r|\n/);

	document.getElementById('job').value = textArray[0]
	document.getElementById('vu').value = textArray[1]
	document.getElementById('phi').value = textArray[2]
	document.getElementById('fc').value = textArray[3]
	document.inputform.da.selectedIndex = textArray[4]
	document.getElementById('hef').value = textArray[5]
	document.getElementById('na').value = textArray[6]
	document.getElementById('ca1').value = textArray[7]
	document.getElementById('ca2').value = textArray[8]
	document.getElementById('ca3').value = textArray[9]
	document.getElementById('s').value = textArray[10]
	document.getElementById('ha').value = textArray[11]
	document.getElementById('ev').value = textArray[12]
	document.inputform.psicv.selectedIndex = textArray[13]

	DrawSec(inputform);
	ModByRF(inputform);
	OnButtonClick();
    }
},false);

*/
//////////////////////////////////////////////////
window.onload = function (){

    // Init
    document.getElementById('job').value = 'New Project';
    document.getElementById('vu').value = Number(    30.0).toFixed(1);
    document.getElementById('phi').value = Number(    0.70).toFixed(2);
    document.getElementById('fc').value = Number(    21.0).toFixed(1);
    document.inputform.da.selectedIndex = 2;
    document.getElementById('hef').value = Number(    500).toFixed(0);
    document.getElementById('na').value = 2;
    document.getElementById('ca1').value = Number(    150).toFixed(0);
    document.getElementById('ca2').value = Number(    180).toFixed(0);
    document.getElementById('ca3').value = Number(    120).toFixed(0);
    document.getElementById('s').value = Number(    200).toFixed(0);
    document.getElementById('ha').value = Number(    1000).toFixed(0);
    document.getElementById('ev').value = Number(    0.0).toFixed(1);
    document.inputform.psicv.selectedIndex = 1;

    DrawSec(inputform);
    ModByRF(inputform);

}


function ModByRF(obj){

//    var psic = document.mod.psicv.value;
    var result = "";
    result += "Note: ";
    var idx = obj.psicv.selectedIndex;
//    var psic = obj.options[idx].value;

    if ( idx == 0 ){
	result += "No cracking at service loads";
	result += "<br> &nbsp;";
	result += "<br> &nbsp;";
	result += "<br>";
    }
    if ( idx == 1 ){
	result += "Cracked concrete with reinforcement of DB13 or greater between the anchor and the edge and with the reinforcement enclosed within stirups spaced at not more than 100mm";
    }
    if ( idx == 2){
	result += "Cracked concrete with reinforcement of DB13 or greater between the anchor and the edge";
	result += "<br> &nbsp;";
	result += "<br>";

    }
    if ( idx == 3){
	result += "Cracked concrete with no supplementary reinforcement or edge reinforcement smaller than DB13";
	result += "<br> &nbsp;";
	result += "<br>";

    }

    document.getElementById('addMod').innerHTML = result;
}


function OnButtonClick(){


    // input
    // ------------------------------------------------------------

    //    var btn = document.getElementById('btn');

    var vuForm = document.getElementById('vu');
//    var vnucForm = document.getElementById('vnuc');
    var fcForm = document.getElementById('fc');
//    var fyForm = document.getElementById('fy');

    var da = Number(document.inputform.da.value);

    var hefForm = document.getElementById('hef');
    var naForm = document.getElementById('na');
    var ca1Form = document.getElementById('ca1');
    var ca2Form = document.getElementById('ca2');
    var ca3Form = document.getElementById('ca3');
    var sForm = document.getElementById('s');
    var phiForm = document.getElementById('phi');

    var haForm = document.getElementById('ha');
    var evForm = document.getElementById('ev');

    var psicv = Number(document.inputform.psicv.value);

    // Start calculation
    // ------------------------------------------------------------

    //    btn.addEventListener('click', function() {

    var vu = Number(vuForm.value);
//    var vnuc = vnucForm.value;
    var fc = Number(fcForm.value);
//    var fy = fyForm.value;

    var hef = Number(hefForm.value);
    var na  = Number(naForm.value);
    var ca1 = Number(ca1Form.value);
    var ca2 = Number(ca2Form.value);
    var ca3 = Number(ca3Form.value);
    var s   = Number(sForm.value);
    var phi = Number(phiForm.value);

    var ha  = Number(haForm.value);
    var ev  = Number(evForm.value);
    var lamda = 1.0;
    // --------------------------------------------------
    // CALCULATION

    var avco = 4.5* Math.pow(ca1,2);


    // --------------------------------------------------
    // Input Check
    /*
    result += '<p>'
    result += vu
    result += '</p><p>'
    result += vnuc
    result += '</p><p>'
    result += fc
    result += '</p><p>'
    result += fy
    result += '</p><p>'
    result += da
    result += '</p><p>'
    result += hef
    result += '</p><p>'
    result += na
    result += '</p><p>'
    result += ca1
    result += '</p><p>'
    result += ca2
    result += '</p><p>'
    result += s
    result += '</p><p>'
    result += phi
    result += '</p>'
    */

    // --------------------------------------------------
    // Output

    var result = '';
    result += "<p>";

//    result += "<h3> - Concrete breakout strength of anchor in shear</h3>";

    result += "<h4> -- Projected area for a single anchor in a deep member;";
    result += " A<sub>V<sub>co</sub></sub></h4>";
    result += "<table><tr>";
    result += "<td>";
    result += " A<sub>V<sub>CO</sub></sub> = 4.5 ( c<sub>a1</sub> )<sup>2</sup> = ";
    result += "</td>";
    result += "<td>";
    result += avco.toFixed(0);
    result += "</td>";
    result += "<td>";
    result += " mm<sup>2</sup>";
    result += "</td>";
    result += "</tr></table>";

    var xx,y,ss,x1,x2;


    if( 1.5 * ca1 < ca2 ){
	x1 = 1.5 * ca1;
    }
    else{
	x1 = ca2;
    }

    if( s < 3.0*ca1 ){
	ss = s*(na-1);
    }
    else{
	ss = 3.0*ca1*(na-1);
    }

    if( 1.5 * ca1 < ca3 ){
	x2 = 1.5 * ca1;
    }
    else{
	x2 = ca3;
    }

    xx = x1*1.0 + ss*1.0 + x2*1.0;

    result += "<h4> -- Projected area of the failure surface;";
    result += " A<sub>V<sub>c</sub></sub></h4>";

    result += "<table><tr>";

    result += "<td>";
    result += "Failure width; ";
    result += "</td>";
    result += "<td>";
    result += " x = Min{ 1.5 C<sub>a1</sub>, C<sub>a2</sub> } + Min{ s, 3.0 C<sub>a1</sub> } ( n<sub>a</sub> -1 ) + Min{ 1.5C<sub>a1</sub>, C<sub>a3</sub> } = ";
    result += "</td>";
    result += "<td>";
    result += xx.toFixed(0);
    result += "</td>";
    result += "<td>";
    result += " mm,";
    result += "</td>";

    result += "</tr></table>";
    result += "<table><tr>";

    result += "<td>";
    result += "Failure depth; ";
    result += "</td>";
    result += "<td>";
    if( ha < 1.5 * ca1 ) {
	y = ha;
	result += " h<sub>a</sub> < 1.5 c<sub>a1</sub>, Therefore, y = h<sub>a</sub> = ";
    }
    else{
	y = 1.5 * ca1;
	result += " h<sub>a</sub> > 1.5 c<sub>a1</sub>, Therefore, y = 1.5 c<sub>a1</sub> = ";
    }
    result += "</td>";
    result += "<td>";
    result += (y*1.0).toFixed(0) + " mm";
    result += "</td>";

    result += "</tr>";
    result += "</table>";

    result += "<table>";
    result += "<tr>";
    result += "<td>";
    result += " A<sub>VC</sub></sub> = x y = ";
    result += "</td>";
    result += "<td>";
    var avc;
    avc = xx*y;
    result += avc.toFixed(0);
    result += "</td>";
    result += "<td>";
    result += " mm<sup>2</sup>";
    result += "</td>";

    result += "</tr>";
    result += "</table>";

    // ------------------------------------------------------------------------
    result += "<h4> -- Basic concrete breakout strength for single anchor;";
    result += " V<sub>b<sub></h4>";
    result += "<table><tr>";

    result += "<td>";
    result += "l<sub>e</sub> =";
    result += "</td>";

    var le;
    if( hef < 8.0* da ){
	le = hef;
	result += "<td>";
	result += "h<sub>ef</sub> ( h<sub>ef</sub> &lt 8 d<sub>a</sub> ) = ";
	result += "</td>";
    }
    else{
	le = 8.0*da;
	result += "<td>";
	result += "8 d<sub>a</sub> ( h<sub>ef</sub> &gt 8 d<sub>a</sub> ) = ";
	result += "</td>";
    }

    result += "<td>";
    result += le;
    result += "</td>";
    result += "<td>";
    result += " mm";
    result += "</td>";

    var vb;
    vb = 0.6* Math.pow( (le/da), 0.2 ) * Math.sqrt(da) * lamda * Math.sqrt(fc) * Math.pow(ca1,1.5);
    vb = vb/1000.0;

    result += "</tr></table>";
    result += "<table><tr>";

    result += "<td>";
    result += " V<sub>b</sub> = 0.6 ( l<sub>e</sub>/d<sub>a</sub> )<sup>0.2</sup> &radic;(d<sub>a</sub>) &lambda; &radic;(f<sub>c</sub><sup>'</sup> ( c<sub>a1</sub> )<sup>1.5</sup> = ";
    result += "</td>";
    result += "<td>";
    result += vb.toFixed(2);
    result += "</td>";
    result += "<td>";
    result += " kN";
    result += "</td>";
    result += "</tr></table>";


    result += "<h4> -- Modification factor for anchor groups loaded eccentrically;";
    result += " &psi;<sub>ec,V</sub>, &psi;<sub>ed,V</sub></h4>";

    if ( na > 1 ){
	result += "<table><tr>";
	result += "<td>";
	result += "  &psi;<sub>ec,V</sub> = 1 / ( 1 + ( 2 e<sup>'</sup><sub>V</sub> ) / ( 3 c<sub>a1</sub> ) ) = ";
	result += "</td>";
	result += "<td>";
	var psiecv = 1.0 / ( 1+ 2.0*ev /(3.0*ca1) );
	result += psiecv.toFixed(2);
	result += "</td>";
	result += "<td>";
	result += " --> ";
	result += "</td>";
	if ( psiecv > 1.0 ){
	    psiecv = 1.0;
	}
	result += "<td>";
	result += psiecv.toFixed(2);
	result += "</td>";
	result += "</tr></table>";
    }

    result += "<table><tr>";

    result += "<td>";
    result += " C<sub>a2</sub> = Min{ C<sub>a2</sub>, C<sub>a3</sub> } = ";
    result += "</td>";

    var caa2;
    if ( ca2 > ca3 ) {
	caa2 = ca3;
    }
    else {
	caa2 = ca2;
    }

    result += "<td>";
    result += caa2;
    result += "</td>";
    result += "<td>";
    result += "mm  --> ";
    result += "</td>";

    var psiedv;

    if ( caa2 > 1.5 * ca1 ) {
	psiedv = 1.0;
	result += "<td>";
	result += " C<sub>a2</sub> &nt; 1.5 C<sub>a1</sub>,";
	result += "</td>";
	result += "</tr></table>";
	result += "<table><tr>";
	result += "<td>";
	result += "-> &psi;<sub>ed,V</sub> =" + psiedv.toFixed(2);
	result += "</td>";
    }
    else {
	psiedv = 0.7 + 0.3 * caa2/(1.5*ca1);
	result += "<td>";
	result += " C<sub>a2</sub> &lt; 1.5 C<sub>a1</sub>,";
	result += "</td>";
	result += "</tr></table>";
	result += "<table><tr>";
	result += "<td>";
	result += "&psi;<sub>ed,V</sub> = 0.7 + 0.3 C<sub>a2</sub> / ( 1.5 C<sub>a1</sub> ) = " + psiedv.toFixed(2);
	result += "</td>";
    }


    result += "</tr></table>";


    result += "<h4> -- Modification factor based on presence or absence of cracks in concrete and RF.;";
    result += " &psi;<sub>c,V</sub> = " + psicv;
    result += "</h4>";

    result += "<h4> -- Modification factor where h<sub>a</sub> &lt 1.5 c<sub>a1</sub>;";
    result += " &psi;<sub>h,V</sub></h4>";
    result += "<table><tr>";
    result += "<td>";
    result += "  &psi;<sub>h,V</sub> =";
    result += "</td>";

    var psihv;
    if ( ha < 1.5*ca1 ) {
	psihv = Math.sqrt( 1.5*ca1/ha );
	result += "<td>";
	result += psihv.toFixed(2);
	result += "</td>";
	result += "<td>";
	result += " ( h<sub>a</sub> &lt 1.5 C<sub>ca1</sub> )";
	result += "</td>";
    }
    else{
	psihv = 1.0;
	result += "<td>";
	result += psihv.toFixed(2);
	result += "</td>";
	result += "<td>";
	result += " ( h<sub>a</sub> &gt 1.5 C<sub>ca1</sub> )";
	result += "</td>";
    }
    result += "<td>";
    if( psihv < 1.0 ){
	psihv = 1.0;
    }
    result += " ---> " + psihv.toFixed(2);
    result += "</td>";
    result += "</tr></table>";


    result += "<h4> -- Nominal concrete breakout strength;";
    result += " V<sub>cb</sub> ( V<sub>cbg</sub> ) </h4> ";

    result += "<table><tr>";
    result += "<td>";
    result += "A<sub>VC</sub> / A<sub>V<sub>CO</sub></sub> = ";
    result += "</td>";
    result += "<td>";
    result += (avc/avco).toFixed(2);
    result += "</td>";
    result += "</tr></table>";

    if( na == 1 ){
	result += "<table><tr>";
	result += "<td>";
	result += "  V<sub>cb</sub> = ( A<sub>Vc</sub> / A<sub>V<sub>CO</sub></sub> ) &psi;<sub>ed,V</sub> &psi;<sub>c,V</sub> &psi;<sub>h,V</sub> V<sub>b</sub> = ";
	result += (avc/avco).toFixed(2) + " x " + psiedv.toFixed(2) + " x " + (1.0*psicv).toFixed(2) + " x " + psihv.toFixed(2) + " x " + vb.toFixed(2) + " = ";
	result += "</td>";
	result += "<td>";
	var vcb;
	vcb = (avc/avco).toFixed(2) * psiedv.toFixed(2) * psicv.toFixed(2) * psihv.toFixed(2) * vb.toFixed(2);
	result += vcb.toFixed(2);
	result += "</td>";
	result += "<td>";
	result += " kN";
	result += "</td>";
	result += "</tr></table>";

	result += "<h4> -- Capacity Check;</h4>";

	result += "<table><tr>";
	result += "<td>";
	result += " &phi; V<sub>cb</sub> = ";
	result += "</td>";
	result += "<td>";
	result +=  phi + " x " + vcb.toFixed(2) + " = ";
	result += "</td>";
	result += "<td>";
	result +=  (phi*vcb).toFixed(2);
	result += "</td>";
	result += "<td>";
	result += "kN";
	result += "</td>";
	result += "</tr>";
	result += "</table>";

	result += "<table><tr>";
	result += "<td>";
	result += " &phi; V<sub>cb</sub> / V<sub>u</sub> = ";
	result += "</td>";
	result += "<td>";
	result += (phi*vcb).toFixed(2) + " / " + vu + " = ";
	result += "</td>";
	result += "<td>";
	var safety = phi*vcb/vu;
	result +=  safety.toFixed(2);
	result += "</td>";

	result += "<td>";
	if( safety > 1.0 ){
	    result += '&nbsp; > 1.0';
	}else{
	    result += '&nbsp; < 1.0';
	}
	result += "</td>";

	result += "</tr>";
	result += "</table>";

	result += '<p Align="right" style="color:red;">';

	if( safety > 1.0 ){
	    result += "<b>-----OK</b>";
	}
	else{
	    result += "<b>-----NG</b>";
	}

    }

    // Group Anchor
    else{
	result += "<table><tr>";
	result += "<td>";
	result += "  V<sub>cbg</sub> = ( A<sub>Vc</sub> / A<sub>V<sub>CO</sub></sub> ) ";
	result += "&psi;<sub>ec,V</sub> &psi;<sub>ed,V</sub> &psi;<sub>c,V</sub> &psi;<sub>h,V</sub> V<sub>b</sub> = ";
	result += (avc/avco).toFixed(2) + " x " + psiecv.toFixed(2) + " x " +psiedv.toFixed(2) + " x " + psicv + " x " + psihv.toFixed(2) + " x " + vb.toFixed(2) + " = ";
	result += "</td>";
	result += "<td>";
	var vcb;
	vcb = (avc/avco).toFixed(2) * psiecv.toFixed(2) * psiedv.toFixed(2) * psicv.toFixed(2) * psihv.toFixed(2) * vb.toFixed(2);
	result += vcb.toFixed(2);
	result += "</td>";
	result += "<td>";
	result += " kN";
	result += "</td>";
	result += "</tr></table>";

	result += "<h4> -- Capacity Check;</h4>";

	result += "<table><tr>";
	result += "<td>";
	result += " &phi; V<sub>cbg</sub> = ";
	result += "</td>";
	result += "<td>";
	result +=  phi + " x " + vcb.toFixed(2) + " = ";
	result += "</td>";
	result += "<td>";
	result +=  (phi*vcb).toFixed(2);
	result += "</td>";
	result += "<td>";
	result += "kN";
	result += "</td>";
	result += "</tr>";
	result += "</table>";

	result += "<table><tr>";
	result += "<td>";
	result += " &phi; V<sub>cbg</sub> / V<sub>u</sub> = ";
	result += "</td>";
	result += "<td>";
	result += (phi*vcb).toFixed(2) + " / " + vu + " = ";
	result += "</td>";
	result += "<td>";
	var safety = phi*vcb/vu;
	result +=  safety.toFixed(2);
	result += "</td>";

	result += "<td>";
	if( safety > 1.0 ){
	    result += '&nbsp; > 1.0';
	}else{
	    result += '&nbsp; < 1.0';
	}
	result += "</td>";

	result += "</tr>";
	result += "</table>";

	result += '<p Align="right" style="color:red;">';

	if( safety > 1.0 ){
	    result += "<b>-----OK</b>";
	}
	else{
	    result += "<b>-----NG</b>";
	}

    }



    result += "</p>";
    result += "<p></p>";


    document.getElementById('result').innerHTML = result;
    //    });
    DrawSec(inputform);
    //})();
}


// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------


function DrawSec (form) {

    ca1 = Number(form.ca1.value);
    ca2 = Number(form.ca2.value);
    ca3 = Number(form.ca3.value);
    s = Number(form.s.value);
    na = Number(form.na.value);

    dia = Number(form.da.value);
    //    var da = document.inputform.da.value;
    //    var result = dia;
    //    document.getElementById('result').innerHTML = result;

    var b;
    b = 2.0*ca1;
    var h;
    h = ca2 + s*(na-1) + ca3;

    var cover;
    cover = Number(form.ca1.value);

    var result = '<canvas width=\"260\" height=\"235\" id=\"picCanvas\"></canvas>';
    document.getElementById('picture').innerHTML = result;

    canvas = document.getElementById('picCanvas');
    ctx = canvas.getContext("2d");

    xcen = canvas.width / 2 - 35;
    ycen = canvas.height / 2 + 20;

    xscale = (canvas.width-110)/b;
    yscale = (canvas.height-80)/h;
    scale = (xscale < yscale) ? xscale : yscale;

    // Draw Beam Section
    ctx.beginPath();
    ctx.rect(xcen-b/2*scale,ycen-h/2*scale,100*b*scale,h*scale);        // Mod b -> 100*b
    ctx.fillStyle = "rgb(242,244,255)";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();

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
    ctx.moveTo(xcen,ycen-h/2*scale-10);
    ctx.lineTo(xcen,ycen-h/2*scale-30);
    ctx.stroke();
    drawLineArrow2(xcen-b/2*scale,ycen-h/2*scale-20,xcen,ycen-h/2*scale-20);
    ctx.fillText('Ca1='+ca1+' mm',xcen-b/4*scale,ycen-h/2*scale-40);

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

    drawLineArrow2(xcen+10, ycen-h/2*scale, xcen+10, ycen-h/2*scale+ca2*scale);
    /*
    if( na >= 2 ){
	for( var i = 2; i <= na; i++ )
	{
	    drawLineArrow2(xcen+10,ycen-h/2*scale+ca2*scale + s*(i-2)*scale , xcen+10, ycen-h/2*scale+ca2*scale + s*(i-1)*scale);
	}
    }
    */
    drawLineArrow2(xcen+10,ycen-h/2*scale+ca2*scale + s*(na-1)*scale , xcen+10, ycen-h/2*scale+ca2*scale + s*(na-1)*scale + ca3*scale);

    ctx.fillText('Ca2',xcen+b/4*scale,ycen-h/2*scale-10);
    ctx.fillText('Ca3',xcen+b/4*scale,ycen+h/2*scale+10);


      // Draw Rebar
    ctx.fillStyle = "blue";
    ctx.beginPath();
    //	ctx.arc(xcen+Steel[i].x*scale,ycen+Steel[i].y*scale,Steel[i].dia/2*scale,0,2*Math.PI,true);
    ctx.arc(xcen,ycen-h/2*scale+ca2*scale,dia/2*scale,0,2*Math.PI,true);

    if( na >= 2 ){
	for( var i = 1; i <= na; i++ ) {
	    ctx.arc(xcen,ycen-h/2*scale+ca2*scale+(i-1)*s*scale,dia/2*scale,0,2*Math.PI,true);
	}
    }
    ctx.fill();

    // Draw Failure Surface
    ctx.fillStyle = "rgba(155,187,889,0.3)";
    ctx.beginPath();
    ctx.moveTo(xcen,ycen-h/2*scale+ca2*scale);
    ctx.lineTo(xcen-b/2*scale,ycen-h/2*scale+ca2*scale+1.5*ca1*scale);
    ctx.lineTo(xcen-b/2*scale,ycen-h/2*scale+ca2*scale-1.5*ca1*scale);
    ctx.closePath();
    ctx.fill();
    if( na >= 2 ){
	for( var i = 1; i <= na; i++ ) {
	    ctx.beginPath();
	    ctx.moveTo(xcen,ycen-h/2*scale+ca2*scale+(i-1)*s*scale);
	    ctx.lineTo(xcen-b/2*scale,ycen-h/2*scale+ca2*scale+1.5*ca1*scale+(i-1)*s*scale);
	    ctx.lineTo(xcen-b/2*scale,ycen-h/2*scale+ca2*scale-1.5*ca1*scale+(i-1)*s*scale);
	    ctx.closePath();
	    ctx.fill();
	}
    }

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
