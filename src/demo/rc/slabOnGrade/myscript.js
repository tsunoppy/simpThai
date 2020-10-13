/*
 Start to run JavaScript
 */


window.onload = function (){

    var pp = 49.0;
    var h = 200;
    var fc = 28.0;
    var nu = 0.15;
    var k30 = 20.0;
    var phi = 1.00;
    var fs = 2.00;

    document.getElementById('job').value = 'New Project';
    document.getElementById('pp').value = pp.toFixed(1);
    document.getElementById('h').value = h.toFixed(0);
    document.getElementById('fc').value = fc.toFixed(0);
    document.getElementById('nu').value = nu.toFixed(2);
    document.getElementById('k30').value = k30.toFixed(1);
    document.getElementById('phi').value = phi.toFixed(2);
    document.getElementById('fs').value = fs.toFixed(2);

}

////////////////////////////////////////////////////////////////////////

var downloadAsFile = function(fileName, content) {

    var textArray = [];

    var npara = 8;
    textArray[0]    = document.title;
    textArray[1]    = document.getElementById('job').value;
    textArray[2]    = document.getElementById('pp').value ;
    textArray[3]    = document.getElementById('h').value ;
    textArray[4]    = document.getElementById('fc').value ;
    textArray[5]    = document.getElementById('nu').value ;
    textArray[6]    = document.getElementById('k30').value ;
    textArray[7]    = document.getElementById('phi').value ;
    textArray[8]    = document.getElementById('fs').value ;


    var content ='';
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
	    document.getElementById('pp').value  = textArray[2]    ;
	    document.getElementById('h').value  = textArray[3]    ;
	    document.getElementById('fc').value  = textArray[4]    ;
	    document.getElementById('nu').value  = textArray[5]    ;
	    document.getElementById('k30').value  = textArray[6]    ;
	    document.getElementById('phi').value  = textArray[7]    ;
	    document.getElementById('fs').value  = textArray[8]    ;

	    OnButtonClick();

	}
    },false);

}

function OnButtonClick() {

    ////////////////////////////////////////////////////////////////////////

    // input
    // ------------------------------------------------------------

    var ppForm = document.getElementById('pp');
    var hForm = document.getElementById('h');
    var fcForm = document.getElementById('fc');
    var nuForm = document.getElementById('nu');
    var k30Form = document.getElementById('k30');
    var fsForm = document.getElementById('fs');
    var phiForm = document.getElementById('phi');

    var btn = document.getElementById('btn');

    // Start calculation
    // ------------------------------------------------------------

    var pp = ppForm.value;
    var h = hForm.value;
    var fc = fcForm.value;
    var nu = nuForm.value;
    var k30 = k30Form.value;
    var fs  = fsForm.value;
    var phi = phiForm.value;

    var a = 120 + pp / 9.807 *10 ;

    if( a < 1.724*h ) {
	var b = Math.sqrt( 1.6*Math.pow(a,2) + Math.pow(h,2) ) - 0.675*h;
    }
    if( a >= 1.724*h) {
	var b = a;
    }

    var kk = k30/2.2* (9.8/1000) ;
    var ee = 4700 * Math.sqrt(fc) * phi;
    var dd = ee * Math.pow(h,3) / ( 12.0* ( 1-Math.pow(nu,2) ));
    var lk = Math.pow((dd/kk),(1/4))
    var ak = a / lk ;
    var sigc = 3.00 * pp*1000.0 / Math.pow(h,2);
    var sigc = sigc * ( 1 - Math.pow(( Math.sqrt(2) * ak ),0.6) );

    var sige = 0.497*(1.0+nu*1.0)* pp*1000.0 / Math.pow(h,2.0);
    sige = sige * ( 4.0* Math.log(lk/b) / Math.log(10) + 0.359 );

    var    sigipara = 0.275 * ( 1+nu*1.0 ) * pp*1000.0 / Math.pow(h,2);
    var    sigi = sigipara * ( 4.0* Math.log(lk/b) / Math.log(10) + 1.069 );

    var    sigsoil = 1.0/8.0 * pp / Math.pow((lk/1000.0),2)
    var    sigmaa = 0.5 * Math.sqrt(fc);
    var    mrpara = 0.00689476;
    var    sigmaa = mrpara* 9.0 * Math.sqrt(fc/mrpara);

    // Output
    var result = '<p><h4> - Preparation Cal</h4></p>'

    result += '<table><tbody>'

    result += '<tr><td>'
    result += 'Modulus of Concrete'
    result += '</td><td>'
    result += 'E = '
    result += '</td><td>'
    result += ee.toFixed(0)
    result += '</td><td>'
    result += 'N/mm<sup>2</sup>'
    result += '</td></tr>'

    result += '<tr><td>'
    result += 'Modulus of Soil Reaction for 75cm Diameter&nbsp;&nbsp;'
    result += '</td><td>'
    result += 'k<sub>75</sub> = '
    result += '</td><td>'
    result += kk.toFixed(4)
    result += '</td><td>'
    result += 'N/mm<sup>3</sup>'
    result += '</td></tr>'

    result += '<tr><td>'
    result += 'Radius of Contact Pressure'
    result += '</td><td>'
    result += 'a ='
    result += '</td><td>'
    result += a.toFixed(0)
    result += '</td><td>'
    result += 'mm'
    result += '</td></tr>'

    result += '<tr><td>'
    result += '</td><td>'
    result += 'b ='
    result += '</td><td>'
    result += b.toFixed(0)
    result += '</td><td>'
    result += 'mm'
    result += '</td></tr>'

    result += '<tr><td>'
    result += 'Radius of relative stiffness'
    result += '</td><td>'
    result += 'D = '
    result += '</td><td>'
    result +=  dd.toFixed(0)
    result += '</td><td>'
    result += 'mm<sup>4</sup>'
    result += '</td></tr>'

    result += '<tr><td>'
    result += ''
    result += '</td><td>'
    result += 'lk = '
    result += '</td><td>'
    result +=  lk.toFixed(0)
    result += '</td><td>'
    result += 'mm'
    result += '</td></tr>'

    result += '<tr><td>'
    result += ''
    result += '</td><td>'
    result += 'a/lk = '
    result += '</td><td>'
    result +=  ak.toFixed(2)
    result += '</td><td>'
    result += '-'
    result += '</td></tr>'


    result += '</table>'
    result += '<p><h4> - Stress by Westergaard</h4></p>'
    result += '<p><img src="images/Location.jpg" alt="Stress Location" width="300px" /><br  /></p>'


    result += '<table>'

    result += '<tr><td>'
    result += 'For Coner, Negative Moment  ;'
    result += '</td><td>'
    result += 'σ<sub>c</sub> = '
    result += '</td><td>'
    result += sigc.toFixed(2)
    result += '</td><td>'
    result += 'N/mm<sup>2</sup>,'

    result += '</td><td>'
    result += 'M<sub>c</sub>='
    result += '</td><td>'
    result += (sigc*Math.pow(h,2)/6000.0).toFixed(2)
    result += '</td><td>'
    result += 'kN.m'

    result += '</td></tr>'


    result += '<tr><td>'
    result += 'For Center, Positive Moment  ;'
    result += '</td><td>'
    result += 'σ<sub>i</sub> = '
    result += '</td><td>'
    result += sigi.toFixed(2)
    result += '</td><td>'
    result += 'N/mm<sup>2</sup>'

    result += '</td><td>'
    result += 'M<sub>i</sub>='
    result += '</td><td>'
    result += (sigi*Math.pow(h,2)/6000.0).toFixed(2)
    result += '</td><td>'
    result += 'kN.m'

    result += '</td></tr>'


    result += '<tr><td>'
    result += 'For Eadge, Positive Moment  ;'
    result += '</td><td>'
    result += 'σ<sub>e</sub> = '
    result += '</td><td>'
    result += sige.toFixed(2)
    result += '</td><td>'
    result += 'N/mm<sup>2</sup>'

    result += '</td><td>'
    result += 'M<sub>e</sub>='
    result += '</td><td>'
    result += (sige*Math.pow(h,2)/6000.0).toFixed(2)
    result += '</td><td>'
    result += 'kN.m'

    result += '</td></tr>'

    result += '</table>'
    result += '<p><h4> - Check Capacity</h4></p>'
    result += '<table>'

    result += '<tr><td>'
    result += 'Modulus of Rupture;'
    result += '</td><td>'
    result += 'σ<sub>t</sub> = '
    result += '</td><td>'
    result += sigmaa.toFixed(2)
    result += '</td><td>'
    result += 'N/mm<sup>2</sup>,'

    result += '</td><td>'
    result += 'MR = '
    result += '</td><td>'
    result += (sigmaa*Math.pow(h,2)/6000.0).toFixed(2)
    result += '</td><td>'
    result += 'kN.m'

    result += '</td><td>'
    result += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;By ASTM, 0.74x√(fc)'
    result += '</td><td>'
    result += '</td></tr>'

    result += '</table>'
    result += '<table>'

    result += '<tr><td>'
    result += 'Judgement;'
    result += '</td><td>'
    result += 'σ<sub>t</sub>/σ<sub>c</sub> = MR/M<sub>c</sub> ='
    result += '</td><td>'
    result += (sigmaa/sigc).toFixed(2)
    if (sigmaa/sigc > fs){
	result += '</td><td>'
	result += '&nbsp;>&nbsp;'
	result += fs
	result += '&nbsp;---OK'
	result += '</td><td>'
    }
    if (sigmaa/sigc <= fs){
	result += '</td><td>'
	result += '&nbsp;<&nbsp;'
	result += fs
	result += '&nbsp;---NG'
	result += '</td><td>'
    }
    result += '</td></tr>'


    result += '<tr><td>'
    result += ''
    result += '</td><td>'
    result += 'σ<sub>t</sub>/σ<sub>i</sub>  = MR/M<sub>i</sub> ='
    result += '</td><td>'
    result += (sigmaa/sigi).toFixed(2)
    if (sigmaa/sigi > fs){
	result += '</td><td>'
	result += '&nbsp;>&nbsp;'
	result += fs
	result += '&nbsp;---OK'
	result += '</td><td>'
    }
    if (sigmaa/sigi <= fs){
	result += '</td><td>'
	result += '&nbsp;<&nbsp;'
	result += fs
	result += '&nbsp;---NG'
	result += '</td><td>'
    }
    result += '</td></tr>'

    result += '<tr><td>'
    result += ''
    result += '</td><td>'
    result += 'σ<sub>t</sub>/σ<sub>e</sub> =  MR/M<sub>e</sub> ='
    result += '</td><td>'
    result += (sigmaa/sige).toFixed(2)
    if (sigmaa/sige > fs){
	result += '</td><td>'
	result += '&nbsp;>&nbsp;'
	result += fs
	result += '&nbsp;---OK'
	result += '</td><td>'
    }
    if (sigmaa/sige <= fs){
	result += '</td><td>'
	result += '&nbsp;<&nbsp;'
	result += fs
	result += '&nbsp;---NG'
	result += '</td><td>'
    }
    result += '</td></tr>'

    result += '</tbody></<table>'
    result += '</p>'

    //	var result2 = '<p><img src="images/Single.jpg" alt="Single.png" width="700px" /><br  /></p>'

    //	result += mr.toFixed(2)

    document.getElementById('result').innerHTML = result;
    //	document.getElementById('graph').innerHTML = result2;


}
