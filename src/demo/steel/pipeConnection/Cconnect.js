/*
 Start to run JavaScript
 */
window.onload = function (){

    var pr = 160;
    var pu = 100;
    var fy = 236;
    var theta = 45.0;

    document.getElementById('job').value = 'New Project';
    document.getElementById('Chord').selectedIndex = 17;
    document.getElementById('pr').value = pr;
    document.getElementById('ddcomp').selectedIndex = 5;
    document.getElementById('prcomp').value = pu;
    document.getElementById('fy').value = fy;
    document.getElementById('theta').value = theta;
    document.getElementById('method').selectedIndex = 1;

}

////////////////////////////////////////////////////////////////////////

var downloadAsFile = function(fileName, content) {

    var textArray = [];

    var npara = 8;
    textArray[0]    = document.title;
    textArray[1]    = document.getElementById('job').value;
    textArray[2]    = document.getElementById('Chord').selectedIndex ;
    textArray[3]    = document.getElementById('pr').value ;
    textArray[4]    = document.getElementById('ddcomp').selectedIndex ;
    textArray[5]    = document.getElementById('prcomp').value ;
    textArray[6]    = document.getElementById('fy').value ;
    textArray[7]    = document.getElementById('theta').value ;
    textArray[8]    = document.getElementById('method').selectedIndex ;

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
	    document.getElementById('job').value = textArray[1]    ;
	    document.getElementById('Chord').selectedIndex  = textArray[2]    ;
	    document.getElementById('pr').value  = textArray[3]    ;
	    document.getElementById('ddcomp').selectedIndex  = textArray[4]    ;
	    document.getElementById('prcomp').value  = textArray[5]    ;
	    document.getElementById('fy').value  = textArray[6]    ;
	    document.getElementById('theta').value  = textArray[7]    ;
	    document.getElementById('method').selectedIndex  = textArray[8]   ;

	    OnButtonClick();

	}
    },false);

}

////////////////////////////////////////////////////////////////////////


function OnButtonClick(){

    // input
    // ------------------------------------------------------------

    var chordName = document.getElementById('Chord').value;
    var ddcompName = document.getElementById('ddcomp').value;
    var fy = document.getElementById('fy').value;
    var theta = document.getElementById('theta').value;
    var method = document.getElementById('method').value;

    var pr = document.getElementById('pr').value;
    var pu = document.getElementById('prcomp').value;

    // Preparation

    var dd = pipeSec(chordName)[0];
    var t = pipeSec(chordName)[1];
    var ddcomp = pipeSec(ddcompName)[0];
    var sinT = Math.sin( theta * Math.PI/180);

    var ddb = ddcomp;

    // Output
    // ------------------------------------------------------------

    var result = "";

    result += "<p>";
    result += "<h4>- General Check, Punching</h4>";
    result += "</p>";

    // ------------------------------------------------------------
    result += "<p> &nbsp;&nbsp;";
    result += " D - 2 t = ";
    result += dd + " - " + t + " = ";
    result += (dd-2.0*t).toFixed(2)
    result += " mm ";

    // ------------------------------------------------------------
    result += "<p> &nbsp;&nbsp;";
    result += " D<sub>b comp</sub> = ";
    result += ddcomp;
    result += " mm ";
    if ( ddcomp < dd-2.0*t ) {
	result += " -> D<sub>b comp</sub> < D - 2 t ( OK ) ";
    }
    else {
	result += " -> D<sub>b comp</sub> > D - 2 t ( NG ) ";
    }
    result += "</p>";

    // ------------------------------------------------------------
    var pn1 = 0.6*fy*t*Math.PI*ddb;
    pn1 = pn1*(1.0+sinT)/(2.0*Math.pow(sinT,2.0));
    pn1 = pn1/1000.0;

    result += "<p> &nbsp;&nbsp;";
    result += " P<sub>n</sub> = 0.6 F<sub>y</sub> &pi; D<sub>b</sub> [ (1 + sin&theta; )/ ( 2 sin<sup>2</sup>&theta; ) ] =";
    result += pn1.toFixed(2);
    result += " kN  &nbsp;&nbsp;&nbsp;&nbsp; --> ";

    // ------------------------------------------------------------
    switch( method ){
    case "LRFD":
	var phi1 = 0.95;
	result += "&phi; P<sub>n</sub> = ";
	result += phi1 + " x " + pn1.toFixed(2) + " = ";
	result += (phi1*pn1).toFixed(2);
	result += " kN";
	result += "</p>";
	// ------------------------------------------------------------
	result += "<p> &nbsp;&nbsp;";
	result += " P<sub>u</sub> / &phi; P<sub>n</sub> = ";
	result += (pu/(phi1*pn1)).toFixed(2);
	result += "</p>";
	// ------------------------------------------------------------

	result += '<p Align="right">';
	if( pu/(phi1*pn1) <1.0 ) {
	    result += '------ OK';
	}
	else{
	    result += '------ NG!!!!';
	}
	result += '</p>';


	break;
    case "ASD":
	var omega1 = 1.58;
	result += "P<sub>n</sub> / &Omega; = ";
	result += pn1.toFixed(2) + " / " + omega1 + " = ";
	result += (pn1/omega1).toFixed(2);
	result += " kN";
	result += "</p>";
	// ------------------------------------------------------------
	result += "<p> &nbsp;&nbsp;";
	result += " &Omega; P<sub>u</sub> / P<sub>n</sub> = "
	result += (omega1*pu/pn1).toFixed(2);
	result += "</p>"
	// ------------------------------------------------------------

	result += '<p Align="right">';
	if( (omega1*pu/pn1) <1.0 ) {
	    result += '------ OK';
	}
	else{
	    result += '------ NG!!!!';
	}
	result += '</p>';

	break;
    }



    // ------------------------------------------------------------
    result += "<p>"
    result += "<h4>- For Q<sub>f</sub> </h4>";
    result += "</p>"

    result += "<p> &nbsp;&nbsp;"

    var chordArea = pipeSec(chordName)[2];
    var pr = document.getElementById('pr').value


    switch (method){
    case "LRFD":
	var fc = fy;
	break;
    case "ASD":
	var fc = 0.6*fy;
	break;
    }

    result += " Area =";
    result += chordArea;
    result += " mm<sup>2</sup>,";
    result += " F<sub>c</sub> = ";
    result +=  fc;
    result += " N/mm<sup>2</sup>, &nbsp; P<sub>r</sub> = ";
    result +=  pr;
    result += " kN";
    result += "</p>";

    if (pr > 0.0 ) {

	var u = pr*1000.0/(chordArea*fc);
	result += "<p> &nbsp;&nbsp;"
	result += " For Compression, &nbsp;&nbsp;";
	result += "U = P<sub>r</sub> / ( A F<sub>c</sub> ) = ";
	result += (pr*1000.0).toFixed(0) + " N / ( " + chordArea + " x " + fc + " ) = "
	result += u.toFixed(2);
	result += "</p>";

	var qf = 1.0 - 0.3*u*(1.0+u*1.0);
	result += "<p> &nbsp;&nbsp;";
	result += " Q<sub>f</sub> = 1.0 - 0.3 U ( 1 + U ) = ";
	result += qf.toFixed(2);
	result += "</p>";

    }
    else{

	result += "<p> &nbsp;&nbsp;";
	result += " For Tension, ";
	var qf = 1.0;
	result += " Q<sub>f</sub> = ";
	result += qf.toFixed(2);
	result += "</p>";

    }


    ////////////////////////////////////////////////////////////////////////

    var gamma = dd/(2.0*t);

    ////////////////////////////////////////////////////////////////////////
    result += "<p>"
    result += "<h4>- Connection Capacity </h4>";
    result += "</p>"

    var qn;
    var beta = ddcomp/dd;

    qn = fy*Math.pow(t,2.0);
    qn = qn * 5.7/ ( 1.0 - 0.81 * beta );
    qn = qn* qf /1000.0;

    result += "<p> &nbsp;&nbsp;";
    result += " &gamma; = D / ( 2 t ) = ";
    result += dd + " /  ( 2 x " + t.toFixed(1) + " ) = "
    result += gamma.toFixed(2);
    result += ",&nbsp;&nbsp; &beta; = D<sub>b</sub> / D = "
    result += beta.toFixed(2);
    result += "</p>";

    result += "<p> &nbsp;&nbsp;";
    result += "Q<sub>n</sub> = ( P<sub>n</sub> sin&theta; ) = F<sub>y</sub> t<sup>2</sup> [ 5.7 / ( 1 - 0.81 &beta; ) ] Q<sub>f</sub>= ";
    result += qn.toFixed(2);
    result += " kN";
    result += "</p>";

    switch (method) {
    case "LRFD":

	var phi = 0.90;
	var pa = phi*qn/sinT;

	result += "<p> &nbsp;&nbsp;";
	result += "&phi; Q<sub>n</sub> = ";
	result += phi + " x " + qn.toFixed(2) + " = ";
	result += (phi*qn).toFixed(2);
	result += " kN,";
	result += " &nbsp;&nbsp;";
	result += " &phi; P<sub>n</sub> = &phi; Q<sub>n</sub> / sin(&theta;) = ";
	result += pa.toFixed(2);
	result += " kN";
	result += "</p>";

	// ------------------------------------------------------------
	result += "<p> &nbsp;&nbsp;";
	result += " P<sub>u</sub> / &phi; P<sub>n</sub> = ";
	result += (pu/pa).toFixed(2);
	result += "</p>";
	// ------------------------------------------------------------

	result += '<p Align="right">';
	if( pu/pa <1.0 ) {
	    result += '------ OK';
	}
	else{
	    result += '------ NG!!!!';
	}
	result += '</p>';

	break;

    case "ASD":

	var omega = 1.67;
	var pa = qn/(omega*sinT);

	result += "<p> &nbsp;&nbsp;";
	result += " Q<sub>n</sub> / &Omega; = ";
	result += qn.toFixed(2) + " / " + omega + " = ";
	result += (qn/omega).toFixed(2);
	result += " kN,";
	result += " &nbsp;&nbsp;";
	result += " P<sub>n</sub> / &Omega; = Q<sub>n</sub> / ( &Omega; sin(&theta; ) = ";
	result += pa.toFixed(2);
	result += " kN";
	result += "</p>";

	// ------------------------------------------------------------
	result += "<p> &nbsp;&nbsp;";
	result += " &Omega; P<sub>u</sub> / P<sub>n</sub> = ";
	result += (pu/pa).toFixed(2);
	result += "</p>";
	// ------------------------------------------------------------

	result += '<p Align="right">';

	if( pu/pa <1.0 ) {
	    result += '------ OK';
	}
	else{
	    result += '------ NG!!!!';
	}
	result += '</p>';

	break;
    }

    document.getElementById('result').innerHTML = result;


}


////////////////////////////////////////////////////////////////////////
// Pipe Property Function

function pipeSec(name){


    // Dia,Thickness,Area,Inertia,Radius,300*i
    switch (name){
    case "p-48.6x2.3":
	return Array( 48.6, 2.3, 335, 89867, 16.4, 4917);
	break;
    case "p-48.6x3.2":
	return Array( 48.6, 3.2, 456, 118176 , 16.1, 4827);
	break;
    case "p-60.5x3.2":
	return Array( 60.5, 3.2, 576, 237152, 20.3, 6087);
	break;
    case "p-60.5x4.0":
	return Array( 60.5, 4.0, 710, 284732, 20.0, 6008);
	break;
    case "p-76.3x3.2":
	return Array( 76.3, 3.2,  735, 491806, 25.9, 7761);
	break;
    case "p-89.1x3.2":
	return Array( 89.1, 3.2,  864, 797612, 30.4, 9117);
	break;
    case "p-76.3x4.0":
	return Array( 76.3, 4.0,  909, 595473, 25.6, 7680);
	break;
    case "p-101.6x3.2":
	return Array( 101.6, 3.2, 989, 1198545, 34.8, 10442);
	break;
    case "p-89.1x4.0":
	return Array( 89.1, 4.0, 1069, 970213, 30.1, 9036);
	break;
    case "p-114.3x3.2":
	return Array(114.3, 3.2, 1117, 1724695, 39.3, 11789);
	break;
    case "p-101.6x4.0":
	return Array( 101.6, 4.0, 1226, 1462845, 34.5, 10361);
	break;
    case "p-114.3x4.5":
	return Array( 114.3, 4.5, 1552, 2343194, 38.9, 11656);
	break;
    case "p-114.3x5.6":
	return Array( 114.3, 5.6, 1912, 2831964, 38.5, 11545);
	break;
    case "p-139.8x4.5":
	return Array( 139.8, 4.5, 1913, 4381733, 47.9, 14359);
	break;
    case "p-165.2x4.5":
	return Array( 165.2, 4.5, 2272, 7339398, 56.8, 17051);
	break;
    case "p-139.8x6.0":
	return Array( 139.8, 6.0, 2522, 5655251, 47.4, 14206);
	break;
    case "p-165.2x6.0":
	return Array( 165.2, 6.0, 3001,  9520434,  56.3, 16898);
	break;
    case "p-216.3x6.0":
	return Array( 216.3, 6.0, 3964, 21932206,  74.4,  22315);
	break;
    case "p-216.3x8.0":
	return Array( 216.3, 8.0, 5235, 28435300,  73.7,  22110);
	break;
    default:
	return Array(9999,9999,9999,9999,9999,9999,9999,9999);
    }
}
