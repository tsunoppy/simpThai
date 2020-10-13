/*
 Start to run JavaScript
 */

window.onload = function (){

    var bb = 1.00;
    var ll = 1.00;
    var df = 0.60;
    var cc = 0.0;
    var phi = 30.0;
    var nValue = 10;
    var gamma = 0.70;
    var gammab = 1.70;
    var sf = 3.0;

    document.getElementById('job').value = 'New Project';
    document.getElementById('bb').value = bb.toFixed(2);
    document.getElementById('ll').value = ll.toFixed(2);
    document.getElementById('df').value = df.toFixed(2);
    document.getElementById('cc').value = cc.toFixed(2);
    document.getElementById('nValue').value = nValue.toFixed(0);
    document.getElementById('gamma').value = gamma.toFixed(2);
    document.getElementById('gammab').value = gammab.toFixed(2);
    document.getElementById('sf').value = sf.toFixed(1);
    document.getElementById('phi').value = phi.toFixed(1);
}

////////////////////////////////////////////////////////////////////////

var downloadAsFile = function(fileName, content) {

    var textArray = [];

    var npara = 10;
    textArray[0]    = document.title;
    textArray[1]    = document.getElementById('job').value;
    textArray[2]    = document.getElementById('bb').value ;
    textArray[3]    = document.getElementById('ll').value ;
    textArray[4]    = document.getElementById('df').value ;
    textArray[5]    = document.getElementById('cc').value ;
    textArray[6]    = document.getElementById('nValue').value ;
    textArray[7]    = document.getElementById('gamma').value ;
    textArray[8]    = document.getElementById('gammab').value ;
    textArray[9]    = document.getElementById('sf').value ;
    textArray[10]    = document.getElementById('phi').value ;

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

	    //document.title = textArray[0]    ;
	    document.getElementById('job').value = textArray[1]    ;

	    document.getElementById('bb').value = textArray[2]     ;
	    document.getElementById('ll').value = textArray[3]     ;
	    document.getElementById('df').value = textArray[4]     ;
	    document.getElementById('cc').value = textArray[5]     ;
	    document.getElementById('nValue').value = textArray[6]     ;
	    document.getElementById('gamma').value = textArray[7]     ;
	    document.getElementById('gammab').value = textArray[8]     ;
	    document.getElementById('sf').value = textArray[9]     ;
	    document.getElementById('phi').value = textArray[10]    ;
	    OnButtonClick();
	}
    },false);

}

////////////////////////////////////////////////////////////////////////


function OnButtonClick(){


    // input
    // ------------------------------------------------------------
    var bb = Number(document.getElementById('bb').value);
    var ll = Number(document.getElementById('ll').value);
    var df = Number(document.getElementById('df').value);
    var cc = Number(document.getElementById('cc').value); // cohesion
    var nValue = Number(document.getElementById('nValue').value);
    var gamma = Number(document.getElementById('gamma').value);
    var gammab = Number(document.getElementById('gammab').value);
    var sf = Number(document.getElementById('sf').value);

    // Start Cal
    // ------------------------------------------------------------
    // friction angle estivated by Peck Formular
    var phi = Number( document.getElementById('phi').value ) ;

    var nnc = nc(phi);
    var nnq = nq(phi);
    var nnr = nr(phi);

    var bl = bb/ll;
    var sc = 1.0 + 0.3*bl;
    var sr = 1.0 - 0.2*bl;

    var gamma2 = gammab;
    var gamma1 = gamma;

    var qult1 = sc*cc*nnc;
    var qult2 = gamma2*df*nnq;
    var qult3 = sr*0.5*gamma1*bb*nnr;

    var qult = qult1 + qult2 + qult3;
    var qalt = qult/sf;

    // OutPut
    // ------------------------------------------------------------
    var result = '';

    result += '<p>';
    result += '<h4>- Estimation of soil bearing capacity;  </h4>';
    result += '</p>';

    //--------------------------------------------------
    result += '<table><tbody>';
    result += '<tr><td>';

    result += 'B / L = ';
    result += '</td><td>';
    result += bl.toFixed(2);
    result += '</td><td>';
    result += ', &nbsp;&nbsp;';
    result += '</td><td>';

    result += 'sc = 1.0 + 0.3 ( B / L ) = ';
    result += '</td><td>';
    result += sc.toFixed(2);
    result += '</td><td>';
    result += ', &nbsp;&nbsp;';
    result += '</td><td>';

    result += 'sr = 1.0 - 0.2 ( B / L ) = ';
    result += '</td><td>';
    result += sr.toFixed(2);
    result += '</td><td>';
    result += ', &nbsp;&nbsp;';

    result += '</td></tr>';
    result += '</tbody></table>';


    //--------------------------------------------------
    result += '<table><tbody>';
    result += '<tr><td>';

    result += 'Therefore, &nbsp;&nbsp; N<sub>c</sub> = ';
    result += '</td><td>';
    result += nnc.toFixed(1);
    result += '</td><td>';
    result += ', &nbsp;';
    result += '</td><td>';

    result += 'N<sub>q</sub> = ';
    result += '</td><td>';
    result += nnq.toFixed(1);
    result += '</td><td>';
    result += ', &nbsp;';
    result += '</td><td>';

    result += 'N<sub>r</sub> = ';
    result += '</td><td>';
    result += nnr.toFixed(1);
    result += '</td><td>';
    result += '.';

    result += '</td></tr>';
    result += '</tbody></table>';

    //--------------------------------------------------
    result += '<table><tbody>';
    result += '<tr><td>';

    result += '1. By Soil cohesion;';
    result += '</td><td>';
    result += 'sc C N<sub>c</sub> ';
    result += '</td><td>';
    result += '=' + qult1.toFixed(2);
    result += '</td><td>';
    result += 'ton/m<sup>2</sup>';

    result += '</td></tr>';
    result += '<tr><td>';

    result += '2. By Embeded  effect; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    result += '</td><td>';
    result += '&gamma;\' D<sub>f</sub> N<sub>q</sub> = ';
    result += '</td><td>';
    result += '=' + qult2.toFixed(2);
    result += '</td><td>';
    result += 'ton/m<sup>2</sup>';

    result += '</td></tr>';
    result += '<tr><td>';

    result += '3. By Footing width;';
    result += '</td><td>';
    result += '0.5 sr &gamma; B N<sub>r</sub> ';
    result += '</td><td>';
    result += '=' + qult3.toFixed(2);
    result += '</td><td>';
    result += 'ton/m<sup>2</sup>';

    result += '</td></tr>';
    result += '</tbody></table>';


    //--------------------------------------------------

    result += '<table><tbody>';
    result += '<tr><td>';

    result += 'Q<sub>ult</sub> = ';
    result += '</td><td>';
    result += qult.toFixed(2);
    result += '</td><td>';
    result += 'ton/m<sup>2</sup>';

    result += '</td></tr>';
    result += '<tr><td>';

    result += 'Q<sub>al</sub> = Q<sub>ult</sub> / '+ sf.toFixed(1) + ' (SAFETY FACTOR) = ';
    result += '</td><td>';
    result += qalt.toFixed(2);
    result += '</td><td>';
    result += 'ton/m<sup>2</sup>';

    result += '</td></tr>';
    result += '</tbody></table>';

    //--------------------------------------------------
    document.getElementById('result').innerHTML = result;

}

function nc(phai){
    //    'bearing capacity factor
    //    'phai:friction angle(deg)
    var i;
    var p = [13];
    var nnc = [13];
    //    'set parameter of friction angle
    p[0] = 0;
    p[1] = 0.000001;
    p[2] = 5;
    p[3] = 10;
    p[4] = 15;
    p[5] = 20;
    p[6] = 25;
    p[7] = 30;
    p[8] = 34;
    p[9] = 35;
    p[10] = 40;
    p[11] = 45;
    p[12] = 48;
    p[13] = 50;
    //'set parameter of nc
    nnc[0] = 5.7;
    nnc[1] = 5.7;
    nnc[2] = 7.3;
    nnc[3] = 9.6;
    nnc[4] = 12.9;
    nnc[5] = 17.7;
    nnc[6] = 25.1;
    nnc[7] = 37.2;
    nnc[8] = 52.8;
    nnc[9] = 57.8;
    nnc[10] = 95.7;
    nnc[11] = 172.3;
    nnc[12] = 258.3;
    nnc[13] = 347.5;

    //    'judge of nc
    for( i = 1; i <= 13; i++ ){
	if( phai <= p[i] ){
            return (nnc[i] - nnc[i - 1]) / (p[i] - p[i - 1]) * (phai - p[i - 1]) + nnc[i - 1];
            break;
	}
    }
}


function nq(phai) {
//'bearing capacity factor
//'phai:friction angle(deg)
    var i;
    var p=[13];
    var nnq=[13];
//'set parameter of friction angle
    p[0] = 0;
    p[1] = 0.000001;
    p[2] = 5;
    p[3] = 10;
    p[4] = 15;
    p[5] = 20;
    p[6] = 25;
    p[7] = 30;
    p[8] = 34;
    p[9] = 35;
    p[10] = 40;
    p[11] = 45;
    p[12] = 48;
    p[13] = 50;
    //'set parameter of nc
    nnq[0] = 1;
    nnq[1] = 1;
    nnq[2] = 1.6;
    nnq[3] = 2.7;
    nnq[4] = 4.4;
    nnq[5] = 7.4;
    nnq[6] = 12.7;
    nnq[7] = 22.5;
    nnq[8] = 36.5;
    nnq[9] = 41.4;
    nnq[10] = 81.3;
    nnq[11] = 173.3;
    nnq[12] = 287.9;
    nnq[13] = 415.1;
    //'judge of nc
    for( i = 1; i<=13; i++ ){
	if( phai <= p[i] ) {
            return (nnq[i] - nnq[i - 1]) / (p[i] - p[i - 1]) * (phai - p[i - 1]) + nnq[i - 1];
            break;
	}
    }
}

function nr(phai) {
    //'bearing capacity factor
    //'phai:friction angle(deg)
    var i;
    var p=[13];
    var nnr = [13];
    //'set parameter of friction angle
    p[0] = 0;
    p[1] = 0.000001;
    p[2] = 5;
    p[3] = 10;
    p[4] = 15;
    p[5] = 20;
    p[6] = 25;
    p[7] = 30;
    p[8] = 34;
    p[9] = 35;
    p[10] = 40;
    p[11] = 45;
    p[12] = 48;
    p[13] = 50;
    //'set parameter of nc
    nnr[0] = 0;
    nnr[1] = 0;
    nnr[2] = 0.5;
    nnr[3] = 1.2;
    nnr[4] = 2.5;
    nnr[5] = 5;
    nnr[6] = 9.7;
    nnr[7] = 19.7;
    nnr[8] = 36;
    nnr[9] = 42.4;
    nnr[10] = 100.4;
    nnr[11] = 297.5;
    nnr[12] = 780.1;
    nnr[13] = 1153.2;
    //'judge of nc
    for ( i = 1; i<=13; i++){
	if ( phai <= p[i] ) {
	    return (nnr[i] - nnr[i - 1]) / (p[i] - p[i - 1]) * (phai - p[i - 1]) + nnr[i - 1];
	    break;
	}
    }
}

function OnGetPhi(){

    // Input
    var nValue = Number(document.getElementById('nValue').value);

    //
    var cc = 0.625*nValue;
    var phi = 0.3*nValue + 27.0;

    if (nValue==0){
	phi = 0.0;
    }

    if (nValue<10){
	phi = Math.atan(0.67* Math.tan( 2*Math.PI*phi/360 ) ) *360/Math.PI/2;
    }

    document.getElementById('cc').value = cc.toFixed(2);
    document.getElementById('phi').value = phi.toFixed(1);

    var result = '';

    result += '<table><tbody>';
    result += '<tr><td>';

    if( nValue < 10 && 0 < nValue){
	result += '&phi; = 0.3 N + 27 , ';
	result += 'N<10, tan<sup>-1</sup> ( 0.67 tan(&phi;) ) = ';
    }
    else{
	result += '&phi; = 0.3 N + 27 = ';
    }
    result += '</td><td>';
    result += phi.toFixed(1);
    result += '</td><td>';
    result += 'deg. &nbsp;';

    result += '</td><td>';
    result += 'C = 0.625 x N = ';
    result += '</td><td>';
    result += cc.toFixed(2);
    result += '</td><td>';
    result += 'ton/m<sup>2</sup>';

    result += '</td></tr>';
    result += '</tbody></table>';

    document.getElementById('addPhi').innerHTML = result;

}
