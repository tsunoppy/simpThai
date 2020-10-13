/*
 Start to run JavaScript
 */

window.onload = function (){

    OnDrop();

    document.getElementById('job').value = 'New Project';

    var fc = 21;
    var fy =  390;
    var idxSys = 3;
    var phi = 0.90;
    //
    var ly = 4500;
    var lx = 4200;
    var t = 200;
    var dt = 30;
    //
    var ta = 150;
    //
    var wp = 0.10;
    var gu = 1.2;
    var qu = 1.6;
    var wl = 20.00;

    /////////////////////////////////////////////////////////////////////////
    document.getElementById('fc').value = fc;
    document.getElementById('fy').value = fy;
    //document.SysForm.SysName.selectedIndex = idxSys;
    document.getElementById('phi').value = phi.toFixed(2);
    //
    document.getElementById('ly').value = ly;
    document.getElementById('lx').value = lx;
    document.getElementById('t').value = t;
    document.getElementById('dt').value = dt;
    //
    document.DropForm.DropName.selectedIndex = 0;
    OnDrop();
    document.getElementById('ta').value = ta;
    //
    document.getElementById('wp').value = wp.toFixed(2);
    document.getElementById('LRFg').value = gu;
    document.getElementById('LRFq').value = qu;
    document.getElementById('wl').value = wl.toFixed(2);

}

////////////////////////////////////////////////////////////////////////

var downloadAsFile = function(fileName, content) {

    var textArray = [];
    var npara = 41;
    //
    textArray[0]    = document.title;
    textArray[1]    = document.getElementById('job').value;

    textArray[2]    = document.getElementById('fc').value ;
    textArray[3]    = document.getElementById('fy').value ;
    //textArray[4]    = document.SysForm.SysName.selectedIndex ;
    textArray[4]    = 'None';
    textArray[5]    = document.getElementById('phi').value ;
    //
    textArray[6]    = document.getElementById('ly').value ;
    textArray[7]    = document.getElementById('lx').value ;
    textArray[8]    = document.getElementById('t').value ;
    textArray[9]    = document.getElementById('dt').value ;
    //
    textArray[10]    = document.DropForm.DropName.selectedIndex ;
    if( document.DropForm.DropName.selectedIndex == 0 ){
	textArray[11]    = document.getElementById('ta').value ;
    }else {
	textArray[11]    = 'None';
    }
    //
    textArray[12]    = document.getElementById('wp').value ;
    textArray[13]    = document.getElementById('LRFg').value ;
    textArray[14]    = document.getElementById('LRFq').value ;
    textArray[15]    = document.getElementById('wl').value ;
    //
    // Top Rebar
    textArray[16] = document.DiaStanTopForm.DiaStanTopName.selectedIndex;
    textArray[17] = document.DiaStanForm.DiaStanBotName.selectedIndex;
    textArray[18] = document.getElementById('pStanTop').value;
    textArray[19] = document.getElementById('pStanBot').value;
    //
    textArray[20] = document.DiaForm0.DiaName0.selectedIndex;
    textArray[21] = document.DiaForm1.DiaName1.selectedIndex;
    textArray[22] = document.DiaForm2.DiaName2.selectedIndex;
    textArray[23] = document.DiaForm3.DiaName3.selectedIndex;
    textArray[24] = document.DiaForm4.DiaName4.selectedIndex;
    textArray[25] = document.DiaForm5.DiaName5.selectedIndex;
    textArray[26] = document.DiaForm6.DiaName6.selectedIndex;
    textArray[27] = document.DiaForm7.DiaName7.selectedIndex;
    textArray[28] = document.DiaForm8.DiaName8.selectedIndex;
    //
    textArray[29] = document.DiaStanTopForm2.DiaStanTopName2.selectedIndex;
    textArray[30] = document.DiaStanForm2.DiaStanBotName2.selectedIndex;
    textArray[31] = document.getElementById('pStanTop2').value;
    textArray[32] = document.getElementById('pStanBot2').value;
    //
    textArray[33] = document.DiaForm20.DiaName20.selectedIndex;
    textArray[34] = document.DiaForm21.DiaName21.selectedIndex;
    textArray[35] = document.DiaForm22.DiaName22.selectedIndex;
    textArray[36] = document.DiaForm23.DiaName23.selectedIndex;
    textArray[37] = document.DiaForm24.DiaName24.selectedIndex;
    textArray[38] = document.DiaForm25.DiaName25.selectedIndex;
    textArray[39] = document.DiaForm26.DiaName26.selectedIndex;
    textArray[40] = document.DiaForm27.DiaName27.selectedIndex;
    textArray[41] = document.DiaForm28.DiaName28.selectedIndex;

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

	    //
	    document.title = textArray[0]     ;
	    document.getElementById('job').value = textArray[1]     ;
	    //
	    document.getElementById('fc').value  = textArray[2]     ;
	    document.getElementById('fy').value  = textArray[3]     ;
	    //document.SysForm.SysName.selectedIndex  = textArray[4]     ;
	    document.getElementById('phi').value  = textArray[5]     ;
	    //
	    document.getElementById('ly').value  = textArray[6]     ;
	    document.getElementById('lx').value  = textArray[7]     ;
	    document.getElementById('t').value  = textArray[8]     ;
	    document.getElementById('dt').value  = textArray[9]     ;
	    //
	    document.DropForm.DropName.selectedIndex  = textArray[10]     ;
	    OnDrop();
	    if( document.DropForm.DropName.selectedIndex == 0 ){
		document.getElementById('ta').value  = textArray[11]     ;
	    }
	    //
	    document.getElementById('wp').value  = textArray[12]     ;
	    document.getElementById('LRFg').value  = textArray[13]     ;
	    document.getElementById('LRFq').value  = textArray[14]     ;
	    document.getElementById('wl').value  = textArray[15]     ;
	    //
	    OnExeClick();
	    // Top Rebar
	    document.DiaStanTopForm.DiaStanTopName.selectedIndex = textArray[16]  ;
	    document.DiaStanForm.DiaStanBotName.selectedIndex = textArray[17]  ;
	    document.getElementById('pStanTop').value = textArray[18]  ;
	    document.getElementById('pStanBot').value = textArray[19]  ;
	    //
	    document.DiaForm0.DiaName0.selectedIndex = textArray[20]  ;
	    document.DiaForm1.DiaName1.selectedIndex = textArray[21]  ;
	    document.DiaForm2.DiaName2.selectedIndex = textArray[22]  ;
	    document.DiaForm3.DiaName3.selectedIndex = textArray[23]  ;
	    document.DiaForm4.DiaName4.selectedIndex = textArray[24]  ;
	    document.DiaForm5.DiaName5.selectedIndex = textArray[25]  ;
	    document.DiaForm6.DiaName6.selectedIndex = textArray[26]  ;
	    document.DiaForm7.DiaName7.selectedIndex = textArray[27]  ;
	    document.DiaForm8.DiaName8.selectedIndex = textArray[28]  ;
	    //
	    document.DiaStanTopForm2.DiaStanTopName2.selectedIndex = textArray[29]  ;
	    document.DiaStanForm2.DiaStanBotName2.selectedIndex = textArray[30]  ;
	    document.getElementById('pStanTop2').value = textArray[31]  ;
	    document.getElementById('pStanBot2').value = textArray[32]  ;
	    //
	    document.DiaForm20.DiaName20.selectedIndex = textArray[33]  ;
	    document.DiaForm21.DiaName21.selectedIndex = textArray[34]  ;
	    document.DiaForm22.DiaName22.selectedIndex = textArray[35]  ;
	    document.DiaForm23.DiaName23.selectedIndex = textArray[36]  ;
	    document.DiaForm24.DiaName24.selectedIndex = textArray[37]  ;
	    document.DiaForm25.DiaName25.selectedIndex = textArray[38]  ;
	    document.DiaForm26.DiaName26.selectedIndex = textArray[39]  ;
	    document.DiaForm27.DiaName27.selectedIndex = textArray[40]  ;
	    document.DiaForm28.DiaName28.selectedIndex = textArray[41]  ;
	    //
	    OnCalClick();

	}
    },false);

}

////////////////////////////////////////////////////////////////////////

function OnLoadClick(){

    var t = Number(document.getElementById('t').value);
    var wp = Number(document.getElementById('wp').value);
    /*
    var ws = document.getElementById('ws').value;
    */
    var ws = 24.0*t/1000.0;
    document.getElementById('ws').innerHTML = ws.toFixed(2);

    var wl = Number(document.getElementById('wl').value);

    var gg = 1.0*wp + 1.0*ws;
    var qq = 1.0*wl;

    var gu = Number(document.getElementById('LRFg').value);
    var qu = Number(document.getElementById('LRFq').value);

    gu = gu*gg;
    qu = qu*qq;

    var wtl = gu + qu;

    document.getElementById('g').innerHTML = gg.toFixed(2);
    document.getElementById('q').innerHTML = qq.toFixed(2);
    document.getElementById('gu').innerHTML = gu.toFixed(2);
    document.getElementById('qu').innerHTML = qu.toFixed(2);
    document.getElementById('wtl').innerHTML = wtl.toFixed(2);
    document.getElementById('wtl2').innerHTML = '&nbsp; L.L/D.L = ' + (qq/gg).toFixed(2) + '&lt; 4.0';

}

function OnExeClick() {

    OnLoadClick();

    // INPUT

    var wu = document.getElementById('wtl').innerHTML;
    var lx = Number(document.getElementById('lx').value);
    var ly = Number(document.getElementById('ly').value);
    var wux = wu*(ly/1000.0);
    var wuy = wu*(lx/1000.0);

    // OUTPUT
    var result = '';
    result += '<p>';
    result += '<h4> - Loading for Frame </h4>';
    result += '</p>';

    result += '<table><tbody>';
    result += '<tr><td>';
    result += 'For Shoter Span, &nbsp; W<sub>u,S</sub> = &omega;<sub>u</sub> l<sub>L</sub> = ';
    result += '</td><td>';
    result += wux.toFixed(2) + "kN/m";

    result += '</td></tr><tr><td>';

    result += 'For Longer Span, &nbsp; W<sub>u,L</sub> = &omega;<sub>u</sub> l<sub>S</sub> = ';
    result += '</td><td>';
    result += wuy.toFixed(2) + "kN/m";
    result += '</td><tr>';
    result += '</tbody></table>';

    result += '<p>';
    result += '<h4> - Moment Distribution &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    result +='<input type="button" value="ReCal" onclick="OnCalClick();"> </h4>';
    result += '</p>';

    result += '<table><tbody>';
    result += '<tr><td>';

    result += '<u>Shorter Span</u> ';
    result += ' ( l<sub>l</sub> / 2 = ' + (ly/2000).toFixed(2) + 'm )&nbsp;&nbsp;:';

    result += '</td><td>';
    result += 'Top R/F: ';
    result += '</td><td>';
    result += '<form name="DiaStanTopForm">';
    result += '<select name="DiaStanTopName" onChange="OnCalClick()">';
    result += '<option value="12" selected>DB12</option>';
    result += '<option value="16">DB16</option>';
    result += '<option value="20">DB20</option>';
    result += '</select>';
    result += '</form>';
    result += '</td><td>';
    result += ', @<input type="text" id="pStanTop" value="200" onChange="OnCalClick()">';


    result += '</td><td>';
    result += '&nbsp;&nbsp;&nbsp;Bot R/F: ';
    result += '</td><td>';
    result += '<form name="DiaStanForm">';
    result += '<select name="DiaStanBotName" onChange="OnCalClick()">';
    result += '<option value="12" selected>DB12</option>';
    result += '<option value="16">DB16</option>';
    result += '<option value="20">DB20</option>';
    result += '</select>';
    result += '</form>';
    result += '</td><td>';
    result += ', @<input type="text" id="pStanBot" value="200" onChange="OnCalClick()">';

    result += '</td><tr>';
    result += '</td><td>';
    result += '</td><td>';
    result += '</td><td>';
    result += '</td><td id=mnTop>';
    result += '</td><td>';
    result += '</td><td>';
    result += '</td><td id=mnBot>';
    result += '</tr></td>';

    result += '</tbody></table>';
    result += '';
    result += '';
    result += '';


    /*
    var idx = document.SysForm.SysName.selectedIndex;
    var ff = [];
    ff = factorEndSpan(idx);
    */

    var rebarForm = [], NosForm = [];
    for ( i = 0; i < 9; i++ ){

	rebarForm[i] = '';
	rebarForm[i] += '<form name="DiaForm' + i + '">';
	rebarForm[i] += '<select name="DiaName' + i + '" onChange="OnCalClick()">';
	rebarForm[i] += '<option value="12" selected>DB12</option>';
	rebarForm[i] += '<option value="16">DB16</option>';
	rebarForm[i] += '<option value="20">DB20</option>';
	rebarForm[i] += '</select>';
	rebarForm[i] += '</form>';

	NosForm[i] = '';
	NosForm[i] += ' <td id="atout' + i + '"></td>';
	NosForm[i] += ' <td id="nout' + i + '"></td>';

    }

    var fac = [
	[ "Interior, ", "N(+)" ,      "C/Strip, " , '1/11 x W<sub>u,S</sub> x l<sub>S</sub><sup>2</sup>' , 0.75, (1/11*0.75), NosForm[0], rebarForm[0] ],
	[ "Interior, ", "P(-)" ,      "C/Strip, " , '1/16 x W<sub>u,S</sub> x l<sub>S</sub><sup>2</sup>' , 0.60, (1/16*0.60), NosForm[1], rebarForm[1] ],
	[ "Interior, ", "N(+)" ,      "M/Strip, " , '1/11 x W<sub>u,S</sub> x l<sub>S</sub><sup>2</sup>' , 0.25, (1/11*0.25), NosForm[2], rebarForm[2] ],
	[ "Interior, ", "P(-)" ,      "M/Strip, " , '1/16 x W<sub>u,S</sub> x l<sub>S</sub><sup>2</sup>' , 0.40, (1/16*0.40), NosForm[3], rebarForm[3] ],
	[ "End span, ", "N(+)-Int." , "C/Strip, " , '1/10 x W<sub>u,S</sub> x l<sub>S</sub><sup>2</sup>' , 0.75, (1/10*0.75), NosForm[4], rebarForm[4] ],
	[ "End span, ", "P(-)" ,      "C/Strip, " , '1/11 x W<sub>u,S</sub> x l<sub>S</sub><sup>2</sup>' , 0.60, (1/11*0.60), NosForm[5], rebarForm[5] ],
	[ "End span, ", "N(+)-Ext." , "C/Strip, " , '1/24 x W<sub>u,S</sub> x l<sub>S</sub><sup>2</sup>' , 1.00, (1/24*1.00), NosForm[6], rebarForm[6] ],
	[ "End span, ", "N(+)-Int." , "M/Strip, " , '1/10 x W<sub>u,S</sub> x l<sub>S</sub><sup>2</sup>' , 0.25, (1/10*0.25), NosForm[7], rebarForm[7] ],
	[ "End span, ", "P(-)"      , "M/Strip, " , '1/11 x W<sub>u,S</sub> x l<sub>S</sub><sup>2</sup>' , 0.40, (1/11*0.40), NosForm[8], rebarForm[8] ]
    ];


    // Shot Span Calculation

    var mux = [];
    var i;

    for ( i = 0; i < 9; i++ ){
	mux[i] = wux*Math.pow(lx/1000.0,2.0)*fac[i][5];
    }

    result += '<table><tbody>';

    var j;
    for ( i = 0; i < 9; i++ ){

	result += '<tr><td>';

	for ( j = 0; j<5; j++ ){
	    result += fac[i][j];
	    if ( j == 3 ){
		result += ' x ';
	    }
	    if ( j == 4 ){
		result += ' = ';
	    }
	    if ( j == 5 ){
		result += ' , M<sub>u</sub> = ';
	    }
	    result += '</td><td>';
	}
	result += '</td><td id="mux' + i  +'">';
	result += mux[i].toFixed(1);
	result += '</td><td>';
	result += " kN.m, &nbsp;&nbsp";
	result += '</td><td>';

	for ( j = 6; j<8; j++ ){
	    result += fac[i][j];
	    result += '</td><td>';
	}

	result += '</td></tr>';
    }

    result += '</tbody></table>';


    // Longer Span calculation

    for ( i = 0; i < 9; i++ ){

	rebarForm[i] = '';
	rebarForm[i] += '<form name="DiaForm2' + i + '">';
	rebarForm[i] += '<select name="DiaName2' + i + '" onChange="OnCalClick()">';
	rebarForm[i] += '<option value="12" selected>DB12</option>';
	rebarForm[i] += '<option value="16">DB16</option>';
	rebarForm[i] += '<option value="20">DB20</option>';
	rebarForm[i] += '</select>';
	rebarForm[i] += '</form>';

	NosForm[i] = '';
	NosForm[i] += ' <td id="atout2' + i + '"></td>';
	NosForm[i] += ' <td id="nout2' + i + '"></td>';

    }

    var fac2 = [
	[ "Interior, ", "N(+)" ,      "C/Strip, " , '1/11 x W<sub>u,L</sub> x l<sub>L</sub><sup>2</sup>' , 0.75, (1/11*0.75), NosForm[0], rebarForm[0] ],
	[ "Interior, ", "P(-)" ,      "C/Strip, " , '1/16 x W<sub>u,L</sub> x l<sub>L</sub><sup>2</sup>' , 0.60, (1/16*0.60), NosForm[1], rebarForm[1] ],
	[ "Interior, ", "N(+)" ,      "M/Strip, " , '1/11 x W<sub>u,L</sub> x l<sub>L</sub><sup>2</sup>' , 0.25, (1/11*0.25), NosForm[2], rebarForm[2] ],
	[ "Interior, ", "P(-)" ,      "M/Strip, " , '1/16 x W<sub>u,L</sub> x l<sub>L</sub><sup>2</sup>' , 0.40, (1/16*0.40), NosForm[3], rebarForm[3] ],
	[ "End span, ", "N(+)-Int." , "C/Strip, " , '1/10 x W<sub>u,L</sub> x l<sub>L</sub><sup>2</sup>' , 0.75, (1/10*0.75), NosForm[4], rebarForm[4] ],
	[ "End span, ", "P(-)" ,      "C/Strip, " , '1/11 x W<sub>u,L</sub> x l<sub>L</sub><sup>2</sup>' , 0.60, (1/11*0.60), NosForm[5], rebarForm[5] ],
	[ "End span, ", "N(+)-Ext." , "C/Strip, " , '1/24 x W<sub>u,L</sub> x l<sub>L</sub><sup>2</sup>' , 1.00, (1/24*1.00), NosForm[6], rebarForm[6] ],
	[ "End span, ", "N(+)-Int." , "M/Strip, " , '1/10 x W<sub>u,L</sub> x l<sub>L</sub><sup>2</sup>' , 0.25, (1/10*0.25), NosForm[7], rebarForm[7] ],
	[ "End span, ", "P(-)"      , "M/Strip, " , '1/11 x W<sub>u,L</sub> x l<sub>L</sub><sup>2</sup>' , 0.40, (1/11*0.40), NosForm[8], rebarForm[8] ]
    ];

    result += '<table><tbody>';
    result += '<tr><td>';

    result += '<u>Longer Span</u> ';
    result += ' ( l<sub>s</sub> / 2 = ' + (lx/2000).toFixed(2) + 'm )&nbsp;&nbsp;:';

    result += '</td><td>';
    result += 'Top R/F: ';
    result += '</td><td>';
    result += '<form name="DiaStanTopForm2">';
    result += '<select name="DiaStanTopName2" onChange="OnCalClick()">';
    result += '<option value="12" selected>DB12</option>';
    result += '<option value="16">DB16</option>';
    result += '<option value="20">DB20</option>';
    result += '</select>';
    result += '</form>';
    result += '</td><td>';
    result += ', @<input type="text" id="pStanTop2" value="200" onChange="OnCalClick()">';


    result += '</td><td>';
    result += '&nbsp;&nbsp;&nbsp;Bot R/F: ';
    result += '</td><td>';
    result += '<form name="DiaStanForm2">';
    result += '<select name="DiaStanBotName2" onChange="OnCalClick()">';
    result += '<option value="12" selected>DB12</option>';
    result += '<option value="16">DB16</option>';
    result += '<option value="20">DB20</option>';
    result += '</select>';
    result += '</form>';
    result += '</td><td>';
    result += ', @<input type="text" id="pStanBot2" value="200" onChange="OnCalClick()">';

    result += '</td><tr>';
    result += '</td><td>';
    result += '</td><td>';
    result += '</td><td>';
    result += '</td><td id=mnTop2>';
    result += '</td><td>';
    result += '</td><td>';
    result += '</td><td id=mnBot2>';
    result += '</tr></td>';

    result += '</tbody></table>';

    var muy = [];

    for ( i = 0; i < 9; i++ ){
	muy[i] = wuy*Math.pow(ly/1000,2)*fac2[i][5];
    }

    result += '<table><tbody>';

    for ( i = 0; i < 9; i++ ){

	result += '<tr><td>';

	for ( j = 0; j<5; j++ ){
	    result += fac2[i][j];
	    if ( j == 3 ){
		result += ' x ';
	    }
	    if ( j == 4 ){
		result += ' = ';
	    }
	    if ( j == 5 ){
		result += ' , M<sub>u</sub> = ';
	    }
	    result += '</td><td>';
	}
	result += '</td><td id="muy' + i  +'">';
	result += muy[i].toFixed(1);
	result += '</td><td>';
	result += " kN.m, &nbsp;&nbsp";
	result += '</td><td>';

	for ( j = 6; j<8; j++ ){
	    result += fac2[i][j];
	    result += '</td><td>';
	}

	result += '</td></tr>';
    }

    result += '</tbody></table>';

    // Output


    document.getElementById('result').innerHTML = result;

    OnCalClick();
}

// Calculation
function OnCalClick(){

    var i;

    var phi = Number(document.getElementById('phi').value);
    var fc = Number(document.getElementById('fc').value);
    var fy = Number(document.getElementById('fy').value);
    var t = Number(document.getElementById('t').value);

    var idDrop = document.DropForm.DropName.selectedIndex;
    if ( idDrop == 0 ){
	var ta = Number(document.getElementById('ta').value);
    }
    else{
	ta = 0.0;
    }

    var dt = Number(document.getElementById('dt').value);

    var dneg = 1.0*t + 1.0*ta - dt;
    var dpos = 1.0*t - dt;
    var dneg2 = dpos;

    var lx = Number(document.getElementById('lx').value);
    var ly = Number(document.getElementById('ly').value);

    // Cal, Short Span

    var mux = [];
    var dia = [];
    var idName;

    dia[0] = document.DiaForm0.DiaName0.selectedIndex;
    dia[1] = document.DiaForm1.DiaName1.selectedIndex;
    dia[2] = document.DiaForm2.DiaName2.selectedIndex;
    dia[3] = document.DiaForm3.DiaName3.selectedIndex;
    dia[4] = document.DiaForm4.DiaName4.selectedIndex;
    dia[5] = document.DiaForm5.DiaName5.selectedIndex;
    dia[6] = document.DiaForm6.DiaName6.selectedIndex;
    dia[7] = document.DiaForm7.DiaName7.selectedIndex;
    dia[8] = document.DiaForm8.DiaName8.selectedIndex;

    var reqat;
    var at;

    var idTopStan = document.DiaStanTopForm.DiaStanTopName.selectedIndex;
    var idBotStan = document.DiaStanForm.DiaStanBotName.selectedIndex;
    var pStanTop =  Number(document.getElementById('pStanTop').value);
    var pStanBot =  Number(document.getElementById('pStanBot').value);

    var mnTop = (ly/2/pStanTop)*Rebar[idTopStan].As*fy*dneg/Math.pow(10,6);
    var mnBot = (ly/2/pStanBot)*Rebar[idBotStan].As*fy*dpos/Math.pow(10,6);

    var mnTopMid = (ly/2/pStanTop)*Rebar[idTopStan].As*fy*dneg2/Math.pow(10,6);

    document.getElementById('mnTop').innerHTML = '&phi; M<sub>n</sub> = ' + (phi*mnTop).toFixed(1) + '&nbsp;';
    document.getElementById('mnTop').innerHTML += '(' + (phi*mnTopMid).toFixed(1) + ') kN.m ';
    document.getElementById('mnBot').innerHTML = '&phi; M<sub>n</sub> = ' + (phi*mnBot).toFixed(1) + 'kN.m';

    var reqn;
    var nout;
    var atout;
    var result =[];
    var result1 =[];

    for ( i = 0; i < 9; i++ ){

	idName = "mux" + i;
	mux[i] = document.getElementById(idName).innerHTML;

	if( i == 0 || i == 4 ){
	    reqat = (mux[i]-phi*mnTop)*Math.pow(10,6) /( phi* 0.9 * fy * dneg );
	    if(reqat < 0) reqat=0.0;
	}
	else if( i == 2 || i==6 || i == 7){
	    reqat = (mux[i]-phi*mnTopMid)*Math.pow(10,6) /( phi* 0.9 * fy * dneg );
	    if(reqat < 0) reqat=0.0;
	}
	else{
	    reqat = (mux[i]-phi*mnBot)*Math.pow(10,6) /( phi* 0.9 * fy * dpos );
	    if(reqat < 0) reqat=0.0;
	}

	reqn = reqat/Rebar[dia[i]].As;

	result1[i] = '';
	result1[i] += 'ReqAs =' + reqat.toFixed(0) + 'mm<sup>2</sup>&nbsp;';

	atout = 'atout' + i;
	document.getElementById(atout).innerHTML = result1[i];

	result[i] = '';
	if( reqat <= 0.0 ){
	    result[i] += reqn.toFixed(1) + '(@ 0 )' + '&nbsp; - &nbsp;';
	}
	else{
	    result[i] += reqn.toFixed(1) + '(@' + ((ly/2.0)/reqn).toFixed(0)+ ')' + '&nbsp; - &nbsp;';
	}

	nout = 'nout' + i;
	document.getElementById(nout).innerHTML = result[i];

    }

    // Cal, Long Span

    var muy = [];
    var dia2 = [];
    var idName2;

    dia2[0] = document.DiaForm20.DiaName20.selectedIndex;
    dia2[1] = document.DiaForm21.DiaName21.selectedIndex;
    dia2[2] = document.DiaForm22.DiaName22.selectedIndex;
    dia2[3] = document.DiaForm23.DiaName23.selectedIndex;
    dia2[4] = document.DiaForm24.DiaName24.selectedIndex;
    dia2[5] = document.DiaForm25.DiaName25.selectedIndex;
    dia2[6] = document.DiaForm26.DiaName26.selectedIndex;
    dia2[7] = document.DiaForm27.DiaName27.selectedIndex;
    dia2[8] = document.DiaForm28.DiaName28.selectedIndex;

    var reqat2;
    var at2;

    var idTopStan2 = document.DiaStanTopForm2.DiaStanTopName2.selectedIndex;
    var idBotStan2 = document.DiaStanForm2.DiaStanBotName2.selectedIndex;
    var pStanTop2 =  Number(document.getElementById('pStanTop2').value);
    var pStanBot2 =  Number(document.getElementById('pStanBot2').value);

    var mnTop2 = (lx/2/pStanTop2)*Rebar[idTopStan2].As*fy*dneg/Math.pow(10,6);
    var mnBot2 = (lx/2/pStanBot2)*Rebar[idBotStan2].As*fy*dpos/Math.pow(10,6);

    var mnTopMid2 = (lx/2/pStanTop2)*Rebar[idTopStan2].As*fy*dneg2/Math.pow(10,6);

    document.getElementById('mnTop2').innerHTML = '&phi; M<sub>n</sub> = ' + (phi*mnTop2).toFixed(1) + '&nbsp;';
    document.getElementById('mnTop2').innerHTML += '(' + (phi*mnTopMid2).toFixed(1) + ') kN.m ';
    document.getElementById('mnBot2').innerHTML = '&phi; M<sub>n</sub> = ' + (phi*mnBot2).toFixed(1) + 'kN.m';

    var reqn2;
    var nout2;
    var atout2;
    var result02 =[];
    var result12 =[];

    for ( i = 0; i < 9; i++ ){

	idName2 = "muy" + i;
	muy[i] = document.getElementById(idName2).innerHTML;

	if( i == 0 || i == 4 ){
	    reqat2 = (muy[i]-phi*mnTop2)*Math.pow(10,6) /( phi* 0.9 * fy * dneg );
	    if(reqat2 < 0) reqat2=0.0;
	}
	else if( i == 2 || i == 6 || i == 7){
	    reqat2 = (muy[i]-phi*mnTopMid2)*Math.pow(10,6) /( phi* 0.9 * fy * dneg );
	    if(reqat2 < 0) reqat2=0.0;
	}
	else{
	    reqat2 = (muy[i]-phi*mnBot2)*Math.pow(10,6) /( phi* 0.9 * fy * dpos );
	    if(reqat2 < 0) reqat2=0.0;
	}

	reqn2 = reqat2/Rebar[dia2[i]].As;

	result12[i] = '';
	result12[i] += 'ReqAs =' + reqat2.toFixed(0) + 'mm<sup>2</sup>&nbsp;';

	atout2 = 'atout2' + i;
	document.getElementById(atout2).innerHTML = result12[i];

	result02[i] = '';
	if( reqat2 <= 0.0 ){
	    result02[i] += reqn2.toFixed(1) + '(@ 0 )' + '&nbsp; - &nbsp;';
	}
	else{
	    result02[i] += reqn2.toFixed(1) + '(@' + ((lx/2.0)/reqn2).toFixed(0)+ ')' + '&nbsp; - &nbsp;';
	}

	nout2 = 'nout2' + i;
	document.getElementById(nout2).innerHTML = result02[i];

    }


    // Limitation
    var rhoTop = Rebar[idTopStan].As/pStanTop/t*100.0;
    var rhoBot = Rebar[idBotStan].As/pStanBot/t*100.0;
    var rhoTop2 = Rebar[idTopStan2].As/pStanTop2/t*100.0;
    var rhoBot2 = Rebar[idBotStan2].As/pStanBot2/t*100.0;

    var addresult = '';
    addresult += '<p>';
    addresult += '<h4> - Ratios of the reinfrocemnet area to gross concrete area shall be more than 0.18 % </h4>';
    addresult += '</p>';

    addresult += '<table><tbody>';
    addresult += '<tr><td>';

    addresult += 'Short Span, Top Rebar: &rho; = ' + rhoTop.toFixed(2);
    addresult += '&nbsp;,Bot Rebar: &rho; = ' + rhoBot.toFixed(2);

    addresult += '</td></tr>';
    addresult += '<tr><td>';

    addresult += 'Long Span, Top Rebar: &rho; = ' + rhoTop2.toFixed(2);
    addresult += '&nbsp;,Bot Rebar: &rho; = ' + rhoBot2.toFixed(2);

    addresult += '</td></tr>';
    addresult += '</tbody></table>';

    //////////////////////////////////////////////////

    addresult += '<p>';
    addresult += '<h4> - Minimum Thickness of Slabs without interior beams</h4>';
    addresult += '</p>';

    addresult += '<table><tbody>';
    addresult += '<tr><td>';

    addresult += ' t = l<sub>L</sub> /' + (ly/t).toFixed(0);

    if( fy > 420 ){
	addresult += ' See ACI-08 Table 9.5(c) /';
    }
    else{
	addresult += ' &gt l<sub>L</sub> / 30';
    }

    addresult += '</td></tr>';
    addresult += '</tbody></table>';

    //////////////////////////////////////////////////
    document.getElementById('addResult').innerHTML = addresult;

}

function factorEndSpan(id){

    switch (id) {
    case 0:
	return [0.75,0.63,0.00];
	break;
    case 1:
	return [0.70,0.57,0.16];
	break;
    case 2:
	return [0.70,0.52,0.26];
	break;
    case 3:
	return [0.70,0.50,0.30];
	break;
    case 4:
	return [0.65,0.35,0.65];
	break;
    }
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

Vbar[0] = new STobj("RB9",9,6.36,28.2);
Vbar[1] = new STobj("DB10",10,7.85,31.4);
Vbar[2] = new STobj("DB12",12,11.3,37.7);
