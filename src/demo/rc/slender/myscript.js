window.onload = function (){

    var psus = 900.0;
    var pu   = 1800.0;
    var lu   = 12000;
    var k    = 2.0;
    var bw   = 500;
    var h    = 500;
    var fc   = 21;
    var ast  = 5080;
    var vsus  = 50;
    var dr   = 120;

    document.getElementById('psus').value = psus.toFixed(0);
    document.getElementById('pu').value = pu.toFixed(0);
    document.getElementById('lu').value = lu.toFixed(0);
    document.getElementById('k').value = k.toFixed(2);
    document.getElementById('bw').value = bw.toFixed(0);
    document.getElementById('h').value = h.toFixed(0);
    document.getElementById('fc').value = fc.toFixed(0);
    document.getElementById('ast').value = ast.toFixed(0);
    document.getElementById('vsus').value = vsus.toFixed(0);
    document.getElementById('dr').value = dr.toFixed(0);
}

////////////////////////////////////////////////////////////////////////
var downloadAsFile = function(fileName, content) {

    var textArray = [];

    var npara = 11;
    textArray[0]    = document.title;
    textArray[1]    = document.getElementById('job').value ;
    //
    textArray[2]    = document.getElementById('psus').value ;
    textArray[3]    = document.getElementById('pu').value ;
    textArray[4]    = document.getElementById('lu').value ;
    textArray[5]    = document.getElementById('k').value ;
    textArray[6]    = document.getElementById('bw').value ;
    textArray[7]    = document.getElementById('h').value ;
    textArray[8]    = document.getElementById('fc').value ;
    textArray[9]    = document.getElementById('ast').value ;
    textArray[10]    = document.getElementById('vsus').value ;
    textArray[11]    = document.getElementById('dr').value ;

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
	    document.getElementById('psus').value = textArray[2]    ;
	    document.getElementById('pu').value  = textArray[3]    ;
	    document.getElementById('lu').value = textArray[4]    ;
	    document.getElementById('k').value  = textArray[5]    ;
	    document.getElementById('bw').value  = textArray[6]    ;
	    document.getElementById('h').value  = textArray[7]    ;
	    document.getElementById('fc').value  = textArray[8]    ;
	    document.getElementById('ast').value  = textArray[9]    ;
	    document.getElementById('vsus').value  = textArray[10]    ;
	    document.getElementById('dr').value  = textArray[11]    ;

	    OnButtonClick();

	}
    },false);

}

////////////////////////////////////////////////////////////////////////

function OnButtonClick(){

    // input
    // ------------------------------------------------------------

    var psus = Number( document.getElementById('psus').value ) ;
    var pu   = Number( document.getElementById('pu').value ) ;
    var lu   = Number( document.getElementById('lu').value ) ;
    var k    = Number( document.getElementById('k').value ) ;
    var bw   = Number( document.getElementById('bw').value ) ;
    var h    = Number( document.getElementById('h').value ) ;
    var fc   = Number( document.getElementById('fc').value ) ;
    var ast  = Number( document.getElementById('ast').value ) ;
    var vsus  = Number( document.getElementById('vsus').value ) ;
    var dr   = Number( document.getElementById('dr').value ) ;

    // Cal
    // ------------------------------------------------------------------------

    var r = 0.3*h;
    var beta = psus/pu;
    var ig = bw*Math.pow(h,3)/12.0;
    var d = h - 160;

    var ec = 4700*Math.sqrt(fc);
    var es = 2.05*Math.pow(10,5);
    var n  = es/ec;
    var pi = 3.141592;

    var ise = 0.25*ast*Math.pow(d,2);

    var ei  = 0.2*ec*ig + es*ise;
    ei = ei/(1.0+beta);

    var pc = Math.pow(pi,2) * ei / Math.pow(k*lu,2);
    pc = pc/1000.0;

    var dns = 1/( 1 - pu/(0.75*pc) );

    var m2min = pu*(0.6+0.03*h);
    m2min = m2min/Math.pow(10,3);

    var qq = pu/(vsus*dr);
    var dns2 = 1.0/(1.0-qq);

    // Output
    // ------------------------------------------------------------------------

    var result = '<p> <h4> - Properties </h4> </p>';


    result += '<table><tbody>';

    result += '<tr><td>';
    result += 'E<sub>c</sub> = 4700 &radic;(f<sub>c</sub>) = ';
    result += '</td><td>';
    result += ec.toFixed(0);
    result += '</td><td>';
    result += 'N/mm<sup>2</sup>, &nbsp;';
    result += '</td></tr>';

    result += '<tr><td>';
    result += 'n = E<sub>s</sub> / E<sub>c</sub> = ';
    result += '</td><td>';
    result += n.toFixed(2);
    result += '</td></tr>';

    result += '<tr><td>';
    result += 'd = h - 160.0 = ';
    result += '</td><td>';
    result += d.toFixed(0);
    result += '</td><td>';
    result += 'mm, &nbsp;';
    result += '</td></tr>';

    result += '<tr><td>';
    result += 'r = 0.3 h = ';
    result += '</td><td>';
    result += r.toFixed(0);
    result += '</td><td>';
    result += 'mm';
    result += '</td></tr>';

    result += '<tr><td>';
    result += '(k l<sub>u</sub> ) / r = ';
    result += '</td><td>';
    result +=  (k*lu/r).toFixed(1);
    result += '</td><td>';
    result += '> 22';
    result += '</td></tr>';

    result += '<tr><td>';
    result += '&beta;<sub>s</sub>= ';
    result += '</td><td>';
    result += beta.toFixed(2);
    result += '</td><td>';
    result += '- Factored sustained axial load / Total factored axial load ';
    result += '</td></tr>';

    result += '<tr><td>';
    result += 'EI = ( 0.2 E<sub>c</sub> I<sub>g</sub>  + E<sub>s</sub> I</sub>s</sub> ) / ( 1 + &beta;<sub>s</sub> ) =';
    result += '</td><td>';
    result += ei.toExponential(2);
    result += '</td><td>';
    result += 'N/mm<sup>2</sup>, &nbsp;';
    result += '</td></tr>'

    result += '<tr><td>';
    result += 'EI / ( E<sub>c</sub> I<sub>g</sub> ) = ';
    result += '</td><td>';
    result += (ei/(ec*ig)).toFixed(2);
    result += '</td></tr>';

    result += '</tbody></table>';

    //

    result += '<p> <h4> - Moment magnifier </h4> </p>';

    result += '<table><tbody>';


    result += '<tr><td>';
    result += 'M<sub>2,min</sub> =';
    result += '</td><td>';
    result += m2min.toFixed(2);
    result += '</td><td>';
    result += 'kN.m, Minimum Factored moment';
    result += '</td></tr>';

    result += '<tr><td>';
    result += 'Q = P<sub>u</sub> &delta;<sub>o</sub> / ( V<sub>us</sub> l<sub>c</sub> ) = ';
    result += '</td><td>';
    result += qq.toFixed(2);
    result += '</td><td>';
    result += 'if <0.05 -> Nonsway';
    result += '</td></tr>';

    result += '<tr><td>';
    result += '&delta;<sub>ns,2</sub> =';
    result += '</td><td>';
    result += dns2.toFixed(2);
    result += '</td><td>';
    result += 'Available if &delta;<sub>ns,2</sub> < 1.5';
    result += '</td></tr>';

    result += '</tbody></table>';


    //

    result += '<p> <h4> - Alternaltive Method </h4></p>';

    result += '<table><tbody>';

    result += '<tr><td>';
    result += 'P<sub>c</sub> = ( &pi;<sup>2</sup> E I ) / ( k l<sub>u</sub> )<sup>2</sup>';
    result += '</td><td>';
    result += pc.toFixed(0);
    result += '</td><td>';
    result += 'kN';
    result += '</td></tr>';

    result += '<tr><td>';
    result += '&delta;<sub>ns</sub> = 1/( 1-P<sub>u</sub>/ (0.75 P<sub>cr</sub>) ) =';
    result += '</td><td>';
    result += dns.toFixed(2);
    result += '</td><td>';
    result += '-';
    result += '</td></tr>';

    result += '</tbody></table>';

    document.getElementById('result').innerHTML = result;

}
