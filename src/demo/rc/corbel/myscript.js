/*
 Start to run JavaScript
 */
//function OnButtonClick() {
//    target = document.getElementById("output");
//    target.innerHTML = "Penguin";
//}
window.onload = function (){

    document.getElementById('job').value = 'New Project';
    document.getElementById('vu').value = 160.0;
    document.getElementById('vnuc').value = 32.0;
    document.getElementById('av').value = 500.0;
    document.getElementById('bw').value = 500.0;
    document.getElementById('h').value = 800;
    document.getElementById('cover').value = 40;
    document.getElementById('fc').value = 21.0;
    document.getElementById('phi').value = 0.75;
    document.getElementById('fy1').value = 390;
    document.getElementById('fy2').value = 390;
    document.muForm.muName.selectedIndex = 0;

    document.getElementById('n1').value = 2;
    document.sample.dia1.selectedIndex = 3;
    document.getElementById('n2').value = 4;
    document.sample1.dia2.selectedIndex = 2;


}

////////////////////////////////////////////////////////////////////////

var downloadAsFile = function(fileName, content) {

    var textArray = [];

    var npara = 16;
    textArray[0]    = document.title;
    textArray[1]    = document.getElementById('job').value;
    textArray[2]    = document.getElementById('vu').value;
    textArray[3]    = document.getElementById('vnuc').value;
    textArray[4]    = document.getElementById('av').value;
    textArray[5]    = document.getElementById('bw').value;
    textArray[6]    = document.getElementById('h').value;
    textArray[7]    = document.getElementById('cover').value;
    textArray[8]    = document.getElementById('fc').value;
    textArray[9]    = document.getElementById('phi').value;
    textArray[10]    = document.getElementById('fy1').value;
    textArray[11]    = document.getElementById('fy2').value;
    textArray[12]    = document.muForm.muName.selectedIndex;
    textArray[13]    = document.getElementById('n1').value;
    textArray[14]    = document.sample.dia1.selectedIndex;
    textArray[15]    = document.getElementById('n2').value;
    textArray[16]    = document.sample1.dia2.selectedIndex;


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

	    document.getElementById('job').value = textArray[1]    ;
	    document.getElementById('vu').value = textArray[2]    ;
	    document.getElementById('vnuc').value = textArray[3]    ;
	    document.getElementById('av').value = textArray[4]    ;
	    document.getElementById('bw').value = textArray[5]    ;
	    document.getElementById('h').value = textArray[6]    ;
	    document.getElementById('cover').value = textArray[7]    ;
	    document.getElementById('fc').value = textArray[8]    ;
	    document.getElementById('phi').value = textArray[9]    ;
	    document.getElementById('fy1').value = textArray[10]    ;
	    document.getElementById('fy2').value = textArray[11]    ;
	    document.muForm.muName.selectedIndex = textArray[12]    ;
	    document.getElementById('n1').value = textArray[13]    ;
	    document.sample.dia1.selectedIndex = textArray[14]    ;
	    document.getElementById('n2').value = textArray[15]    ;
	    document.sample1.dia2.selectedIndex = textArray[16]    ;

	    OnButtonClick();

	}
    },false);

}

////////////////////////////////////////////////////////////////////////

function OnButtonClick(){

    // input
    // ------------------------------------------------------------

    //    var btn = document.getElementById('btn');

    var vuForm = document.getElementById('vu');
    var vnucForm = document.getElementById('vnuc');
    var avForm = document.getElementById('av');
    var bwForm = document.getElementById('bw');
    var hForm = document.getElementById('h');
    var fcForm = document.getElementById('fc');
    var phiForm = document.getElementById('phi');
    var fy1Form = document.getElementById('fy1');
    var fy2Form = document.getElementById('fy2');


    var rebar1 = document.sample.dia1.selectedIndex;
    var rebar2 = document.sample1.dia2.selectedIndex;

    var dia1 = Number(document.sample.dia1.value);
    var pn1 = Number(document.getElementById('n1').value);
    var dia2 = Number(document.sample1.dia2.value);
    var pn2 = Number(document.getElementById('n2').value);

    var newasc = pn1*Rebar[rebar1].As;
    var newah = pn2*Vbar[rebar2].As;

    // Start calculation
    // ------------------------------------------------------------

    //    btn.addEventListener('click', function() {

    var vu = Number(vuForm.value);
    var vnuc = Number(vnucForm.value);
    var av = Number(avForm.value);
    var bw = Number(bwForm.value);
    var h = Number(hForm.value);
    var fc = Number(fcForm.value);
    var phi = Number(phiForm.value);
    var fy1 = Number(fy1Form.value);
    var fy2 = Number(fy2Form.value);

    var cover = Number(document.getElementById('cover').value);

    var d = h - cover - dia1*1.2/2.0;
    var vn1 = phi*0.2*fc*bw*d/1000.0;
    var vn2 = phi*(3.3+0.08*fc)*bw*d/1000.0;
    var vn3 = phi*11.0*bw*d/1000.0;

    if( vn1 > vn2 ) {
	var vn = vn2;
    }
    else {
	var vn = vn1;
    }
    if( vn > vn3 ) {
	vn = vn3;
    }

    // Output

    var result = '<p><h4> - Limiting shear-transfer strength V<sub>n</sub> </h4> </p>';

    result += '<table><tbody>';

    result += '<tr><td>';
    result += 'd = h - covering - ' + dia1.toFixed(0) + ' x 1.2 / 2 = ';
    result += '</td><td>';
    result += d.toFixed(0);
    result += '</td><td>';
    result += 'mm';
    result += '</td></tr>';

    result += '<tr><td>';
    result += 'φ V<sub>n1</sub> = φ 0.2 f<sub>c</sub> b</sub>w d =';
    result += '</td><td>';
    result += vn1.toFixed(0);
    result += '</td><td>';
    result += 'kN';
    result += '</td></tr>';

    result += '<tr><td>';
    result += 'φ V<sub>n2</sub> = φ (3.3 + 0.08 fc) b</sub>w d =';
    result += '</td><td>';
    result += vn2.toFixed(0);
    result += '</td><td>';
    result += 'kN';
    result += '</td></tr>';

    result += '<tr><td>';
    result += 'φ V<sub>n3</sub> = φ 11.0 b</sub>w d =';
    result += '</td><td>';
    result += vn3.toFixed(0);
    result += '</td><td>';
    result += 'kN';
    result += '</td></tr>';

    result += '</tbody></table>';

    //--------------------------------------------------
    result += '<table><tbody>';

    result += '<tr><td>';
    result += 'φ V<sub>n</sub> = φ Min{ V<sub>n1</sub>,V<sub>n2</sub>,V<sub>n3</sub> } = ';
    result += vn.toFixed(0);
    result += '</td><td>';
    result += 'kN, ----->';
    result += ' φ V<sub>n</sub> / V<sub>u</sub> = ';
    result += '</td><td>';
    result += (vn/vu).toFixed(2);
    result += '</td></tr>';
    result += '</tbody></table>';

    result += '<p Align="right">';
    if(vn/vu >1.0 ) {
	result += '------ OK';
    }
    else{
	result += '------ NG!!!!';
    }
    result += '</p>';

    //--------------------------------------------------
    result += '<p><h4> - Shear-friction reinforcement A<sub>vf</sub> </h4></p>';

    result += '<table><tbody>';
    result += '<tr><td>';

    var mu = Number(document.muForm.muName.value);
    var myu = mu;
    var avf = vu/(phi*fy2*myu)*1000.0;

    result += 'A<sub>vf</sub> = V<sub>u</sub> / ( Φ f<sub>y2</sub> &mu; ) = ';
    result += '</td><td>';
    result += (vu*1000.0).toFixed(0) + ' / ( ' + phi + ' x ' + fy2 + ' x ' + mu.toFixed(2) + ') = ';
    result += '</td><td>';
    result += avf.toFixed(0);
    result += '</td><td>';
    result += 'mm<sup>2</sup>';

    result += '</td></tr>';
    result += '</tbody></table>';

    //--------------------------------------------------
    result += '<p><h4> - Direct tension reinforcement A<sub>n</sub> </h4></p>';

    result += '<table><tbody>';
    result += '<tr><td>';

    result += 'A<sub>n</sub> = N<sub>uc</sub> / ( Φ f<sub>y1</sub> ) = ';
    result += '</td><td>';
    result += (vnuc*1000.0).toFixed(0) + ' / ( ' + phi + ' x ' + fy1 + ' ) = ';
    result += '</td><td>';
    var an = vnuc*1000.0/(phi*fy1);
    result += an.toFixed(0);
    result += '</td><td>';
    result += 'mm<sup>2</sup>';

    result += '</td></tr>';
    result += '</tbody></table>';

    //--------------------------------------------------
    result += '<p><h4> - Flexural reinforcement A<sub>f</sub> </h4></p>';

    result += '<table><tbody>';
    result += '<tr><td>';

    result += 'M<sub>u</sub> = V<sub>u</sub> a<sub>v</sub> + N<sub>uc</sub> ( h - d ) = ';
    result += '</td><td>';
    result += vu + ' ( ' + av + ' ) + ' + vnuc + ' ( ' + h + ' - ' + d + ' ) = ';
    result += '</td><td>';
    var mu = (vu*av+vnuc*(h-d))/1000.0;
    result += mu.toFixed(0);
    result += '</td><td>';
    result += 'kN.m';

    result += '</td></tr>';
    result += '<tr><td>';

    result += 'A<sub>f</sub> = M<sub>u</sub> / ( Φ f<sub>y1</sub> 0.9 d ) = ';
    result += '</td><td>';
    result += mu.toFixed(0) + ' x 10<sup>6</sup> / ( ' + phi + ' x ' + fy1 + ' x 0.9 x ' + d + ' ) = ';
    result += '</td><td>';
    var af = mu*Math.pow(10,6)/(phi*fy1*0.9*d);
    result += af.toFixed(0);
    result += '</td><td>';
    result += 'mm<sup>2</sup>';

    result += '</td></tr>';
    result += '</tbody></table>';

    //--------------------------------------------------
    result += '<p><h4> - Primary tension reinforcement A<sub>s</sub> </h4></p>';

    result += '<table><tbody>';
    result += '<tr><td>';

    result += '2/3 A<sub>vf</sub> = ';
    result += '</td><td>';
    result += '2/3 x ' + avf.toFixed(0) + ' = ';
    result += '</td><td>';
    result += ((2.0/3.0)*avf).toFixed(0);
    result += '</td><td>';
    result += 'mm<sup>2</sup> ';
    result += '</td><td>';

    if( avf*2.0/3.0 > af ){
	result += ' &gt A<sub>f</sub> = '+ af.toFixed(0) +  'mm<sup>2</sup>; Therefore, 2/3 A<sub>vf</sub> controls design';

	result += '</td></tr>';
	result += '<tr><td>';

	result += 'A<sub>sc</sub> = ';
	result += '</td><td>';
	result += '2/3 A<sub>vf</sub> + A<sub>n</sub> = ';
	result += '</td><td>';
	result += (avf*2.0/3.0+an).toFixed(0);
	var asc = (avf*2.0/3.0+an);
	result += '</td><td>';
	result += 'mm<sup>2</sup>';

    }
    else{
	result += ' &lt A<sub>f</sub> = '+ af.toFixed(0) +  'mm<sup>2</sup>; Therefore, A<sub>f</sub> controls design';

	result += '</td></tr>';
	result += '<tr><td>';

	result += 'A<sub>sc</sub> = ';
	result += '</td><td>';
	result += 'A<sub>f</sub> + A<sub>n</sub> = ';
	result += '</td><td>';
	result += (af+an).toFixed(0);
	var asc = (af+an);
	result += '</td><td>';
	result += 'mm<sup>2</sup>';
    }

    result += '</td></tr>';
    result += '</tbody></table>';


    result += '<table><tbody>';
    result += '<tr><td>';
    result += '--> Use ' + pn1 + ' - DB' + dia1;
    result += '</td><td>';
    result += ', A<sub>sc</sub> = ' + newasc.toFixed(0) + 'mm<sup>2</sup>';

    result += '</td></tr>';
    result += '</tbody></table>';

    result += '<p Align="right">';
    if ( asc > newasc ) {
	result += '----- NG';
    }
    else {
	result += '----- OK';
    }
    result += '</p>';

    //--------------------------------------------------
    result += '<p><h4> - Shear reinforcement A<sub>h</sub> </h4></p>';

    result += '<table><tbody>';
    result += '<tr><td>';

    result += 'A<sub>h</sub> = 0.5 ( A<sub>sc</sub> - A<sub>n</sub> ) = ';
    result += '</td><td>';
    result += '0.5 x (' + asc.toFixed(0) + ' - ' + an.toFixed(0) + ' ) = ';
    var ah = 0.5 * ( asc - an );
    result += '</td><td>';
    result += ah.toFixed(0);
    result += '</td><td>';
    result += 'mm<sup>2</sup>';


    result += '</td></tr>';
    result += '</tbody></table>';
    result += '<table><tbody>';
    result += '<tr><td>';
    result += '--> Use ' + pn2 + ' - DB' + dia2;
    result += '</td><td>';

    result += ', A<sub>h</sub> = ' + newah.toFixed(0) + 'mm<sup>2</sup>';
    result += '</td><td>';
    result += '( Distribute stirrups in two thirds of effective corbel depth adjacent to A<sub>sc</sub>)';

    result += '</td></tr>';
    result += '</tbody></table>';


    result += '<p Align="right">';
    if ( ah > newah ) {
	result += '----- NG';
    }
    else {
	result += '----- OK';
    }
    result += '</p>';

    /*
    result += '<table><tbody>'
    result += '<tr><td>'
    result += '( Distribute stirrups in two thirds of effective corbel depth adjacent to A<sub>sc</sub>)'
    result += '</td></tr>'
    result += '</tbody></table>'
     */


    document.getElementById('result').innerHTML = result;
    //    });

    //})();
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
Vbar[3] = new STobj("DB16",16,201,50.3);
