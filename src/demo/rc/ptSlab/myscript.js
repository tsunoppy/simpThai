/*
 Start to run JavaScript
 */

window.onload = function (){

    OnDrop();

    document.getElementById('job').value = 'New Project';

    var fc = 35;
    var fy =  390;
    var idxSys = 3;
    var phi = 0.90;
    //
    var ly = 9000;
    var lx = 9000;
    var t = 180;
    var dt = 30;
    //
    var ta = 150;
    //
    var wp = 0.50;
    var gu = 1.0;
    var qu = 1.0;
    var wl = 2.90;
    //
    var postU = 1.0;
    var per = 0.75;
    //
    var fci = 0.6*fc;
    var ptA = 98.7;
    var MemoTendon = '12.7mm, 7-wire strands';
    var fpu = 1860;
    var floss = 100;
    var fse = 0.7*fpu-floss;
    var peff = fse*ptA/1000;
    //
    var ptTop = 60;
    var ptBot = 60;

    /////////////////////////////////////////////////////////////////////////
    document.getElementById('fc').value = fc;
    document.getElementById('fy').value = fy;
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
    document.getElementById('LRFg').value = gu.toFixed(2);
    document.getElementById('LRFq').value = qu.toFixed(2);
    document.getElementById('LRFpost').value = postU.toFixed(2);
    document.getElementById('wl').value = wl.toFixed(2);

    document.getElementById('fci').value = fci ;
    document.getElementById('ptA').value = ptA ;
    document.getElementById('MemoTendon').value = MemoTendon ;
    document.getElementById('fpu').value = fpu ;
    document.getElementById('floss').value = floss ;
    document.getElementById('fse').value = fse ;
    document.getElementById('peff').value = peff.toFixed(0) ;
    document.getElementById('ptTop').value = ptTop ;
    document.getElementById('ptBot').value = ptBot ;
    document.getElementById('per').value = per;
}

////////////////////////////////////////////////////////////////////////

var downloadAsFile = function(fileName, content) {

    var textArray = [];
    var npara = 26;
    //
    textArray[0]    = document.title;
    textArray[1]    = document.getElementById('job').value;
    textArray[2]    = document.getElementById('fc').value ;
    textArray[3]    = document.getElementById('fy').value ;
    textArray[4]    = 'None';
    textArray[5]    = document.getElementById('phi').value ;
    textArray[6]    = document.getElementById('ly').value ;
    textArray[7]    = document.getElementById('lx').value ;
    textArray[8]    = document.getElementById('t').value ;
    textArray[9]    = document.getElementById('dt').value ;
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
    textArray[15]    = document.getElementById('LRFpost').value ;
    textArray[16] = document.getElementById('wl').value ;
    textArray[17] = document.getElementById('fci').value ;
    textArray[18] = document.getElementById('ptA').value ;
    textArray[19] = document.getElementById('MemoTendon').value ;
    textArray[20] = document.getElementById('fpu').value ;
    textArray[21] = document.getElementById('floss').value ;
    textArray[22] = document.getElementById('fse').value ;
    textArray[23] = document.getElementById('peff').value ;
    textArray[24] = document.getElementById('ptTop').value ;
    textArray[25] = document.getElementById('ptBot').value ;
    textArray[26] = document.getElementById('per').value ;

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
	    document.getElementById('fc').value  = textArray[2]    ;
	    document.getElementById('fy').value  = textArray[3]    ;
	    document.getElementById('phi').value  = textArray[5]    ;
	    document.getElementById('ly').value  = textArray[6]    ;
	    document.getElementById('lx').value  = textArray[7]    ;
	    document.getElementById('t').value  = textArray[8]    ;
	    document.getElementById('dt').value  = textArray[9]    ;
	    document.DropForm.DropName.selectedIndex  = textArray[10]    ;
	    OnDrop();
	    if( document.DropForm.DropName.selectedIndex == 0 ){
		document.getElementById('ta').value  = textArray[11]    ;
	    }
	    //
	    document.getElementById('wp').value  = textArray[12]    ;
	    document.getElementById('LRFg').value  = textArray[13]    ;
	    document.getElementById('LRFq').value  = textArray[14]    ;
	    document.getElementById('LRFpost').value  = textArray[15]    ;
	    document.getElementById('wl').value  = textArray[16] ;
	    document.getElementById('fci').value  = textArray[17] ;
	    document.getElementById('ptA').value  = textArray[18] ;
	    document.getElementById('MemoTendon').value  = textArray[19] ;
	    document.getElementById('fpu').value  = textArray[20] ;
	    document.getElementById('floss').value  = textArray[21] ;
	    document.getElementById('fse').value  = textArray[22] ;
	    document.getElementById('peff').value  = textArray[23] ;
	    document.getElementById('ptTop').value  = textArray[24] ;
	    document.getElementById('ptBot').value  = textArray[25] ;
	    document.getElementById('per').value  = textArray[26] ;
	    //
	    OnExeClick();
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
    var per = Number( document.getElementById('per').value);
    var wpost = per*ws;
    document.getElementById('wpost').innerHTML = wpost.toFixed(2);

    var wl = Number(document.getElementById('wl').value);

    var gg = 1.0*wp + 1.0*ws;
    var qq = 1.0*wl;
    var pp = 1.0*wpost;

    var gu = Number(document.getElementById('LRFg').value);
    var qu = Number(document.getElementById('LRFq').value);
    var pu = Number(document.getElementById('LRFpost').value);

    gu = gu*gg;
    qu = qu*qq;
    pu = pu*pp;

    var wtl = gu + qu - pu;

    document.getElementById('g').innerHTML = gg.toFixed(2);
    document.getElementById('q').innerHTML = qq.toFixed(2);
    document.getElementById('p').innerHTML = pp.toFixed(2);
    document.getElementById('gu').innerHTML = gu.toFixed(2);
    document.getElementById('qu').innerHTML = qu.toFixed(2);
    document.getElementById('pu').innerHTML = pu.toFixed(2);
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

    var gg = Number(document.getElementById('g').innerHTML) ;
    var per = Number( document.getElementById('per').value);
    var wdx = per*gg*(ly/1000.0);
    var wdy = per*gg*(lx/1000.0);

    var fc = Number( document.getElementById('fc').value );
    var fy = Number( document.getElementById('fy').value );
    var phi = Number( document.getElementById('phi').value );
    //
    var t = Number( document.getElementById('t').value );
    var dt = Number( document.getElementById('dt').value );
    //
    var idx = document.DropForm.DropName.selectedIndex ;
    if( idx ==0 ){
	var ta = Number( document.getElementById('ta').value );
    }
    //
    var fci  = Number( document.getElementById('fci').value );
    var ptA  = Number( document.getElementById('ptA').value );
    var MemoTendon  = document.getElementById('MemoTendon').value ;
    var fpu  = Number( document.getElementById('fpu').value );
    var floss  = Number( document.getElementById('floss').value );
    var fse  = Number( document.getElementById('fse').value );
    var peff = Number( document.getElementById('peff').value );
    //
    var ptTop  = Number( document.getElementById('ptTop').value );
    var ptBot = Number( document.getElementById('ptBot').value );
    //

    //
    // OUTPUT
    var result = '';

    /*
    result += '<p>';
    result += '<h4> - Calculate Section Properties </h4>';
    result += '</p>';

    result += '<p>';
    result += 'Two-way slab must be designed as Class U, Gross cross-sectional properties allowd.';
    result += '</p>';


    result += '<table><tbody>';
    result += '<tr><td>';

    result += 'A = b h =';
    result += '</td><td>';
    result += 'mm<sup>2</sup>, &nbsp;';
    result += '</td><td>';
    result += 'S = b h<sup>2</sup> / 6 = ';
    result += '</td><td>';
    result += 'mm<sup>3</sup>, &nbsp;';

    result += '</td><tr>';
    result += '</tbody></table>';
     */
    ////////////////////////////////////////////////////////////////////////

    result += '<p>';
    result += '<h4> - Set Design Parameters </h4>';
    result += '</p>';

    result += '<p>Allowable stresses: Class U</p>';

    result += '<table><tbody>';

    result += '<tr><td>';
    result += 'At time of jacking';
    result += '</td><tr>';

    result += trGenerate( 'f\'<sub>ci</sub>',
			  fci,
			  'N/mm<sup>2</sup>');
    result += trGenerate( 'Compression, 0.6 f\'<sub>ci</sub>',
			  (0.6*fci).toFixed(2),
			  'N/mm<sup>2</sup>');
    result += trGenerate( 'Tension, 0.25 &radic; f\'<sub>ci</sub>',
			  (0.25*Math.sqrt(fci)).toFixed(2),
			  'N/mm<sup>2</sup>');

    result += '<tr><td>';
    result += 'At service loads';
    result += '</td><tr>';

    var fa = 0.45*fc;
    var fya = 0.5*Math.sqrt(fc);
    var fya2 = 0.25*Math.sqrt(fc);

    result += trGenerate( 'f<sub>c</sub>',
			  fc,
			  'N/mm<sup>2</sup>');
    result += trGenerate( 'Compression, 0.45f f<sub>c</sub>',
			  (0.45*fc).toFixed(2),
			  'N/mm<sup>2</sup>');
    result += trGenerate( 'Tension, 0.50 &radic; f<sub></sub>',
			  (0.50*Math.sqrt(fc)).toFixed(2),
			  'N/mm<sup>2</sup>');

    result += '</tbody></table>';

    //

    result += '<p> Average precompression limits:</p>';

    result += '<table><tbody>';

    result += trGenerate( 'Min, P/A ',
			  (0.86).toFixed(2),
			  'N/mm<sup>2</sup>');
    result += trGenerate( 'Max, P/A ',
			  (3.50).toFixed(2),
			  'N/mm<sup>2</sup>');

    result += '</tbody></table>';

    ////////////////////////////////////////////////////////////////////////

    result += '<p>';
    result += '<h4> - Tendon Profile </h4>';
    result += '</p>';

    result += '<p>';
    result += 'Parabolick shape;';
    result += '</p>';

    result += '<p>';
    result += 'For a layout with spans of similar  length, the tendons will be typically be located at the highest allowable point at the interior columns, the lowest possible point at the midspans, and the neutral axis at the anchor locations. This provides the maximum drape for load-balancing.';
    result += '</p>';

    result += '<p><img src="images/Figure.jpg" alt="Stress Location" width="500px" /><br  /></p>';

    result += '<table><tbody>';

    var aint = t-ptTop-ptBot;
    var aext = (t-ptTop+t/2)/2-ptBot-20;

    result += trGenerate( 'Interior support-top',
			  (t-ptTop).toFixed(0),
			  'mm');
    result += trGenerate( 'Interior span-bottom',
			  ptBot.toFixed(0),
			  'mm');
    result += trGenerate( 'a<sub>INT</sub> ',
			  aint.toFixed(0),
			  'mm');
    result += trGenerate( 'a<sub>EXT</sub> ',
			  aext.toFixed(0),
			  'mm');
    result += trGenerate( 'eccentricity, e ',
			  ' ',
			  'the distance from the center to  tendon to the neutral axis; varies along the span ');

    result += '</tbody></table>';

    ////////////////////////////////////////////////////////////////////////

    result += '<p>';
    result += '<h4> - Loading for Frame </h4>';
    result += '</p>';

    //
    result += '<table><tbody>';
    result += '<tr><td>';
    result += 'For Shoter Span, &nbsp; W<sub>u,S</sub> = &omega;<sub>u</sub> l<sub>L</sub> = ';
    result += '</td><td>';
    result += wux.toFixed(2) + "kN/m";

    result += '</td></tr>';
    result += '<tr><td>';

    result += 'For Longer Span, &nbsp; W<sub>u,L</sub> = &omega;<sub>u</sub> l<sub>S</sub> = ';
    result += '</td><td>';
    result += wuy.toFixed(2) + "kN/m";
    result += '</td><tr>';
    result += '</tbody></table>';

    //
    result += '<table><tbody>';
    result += trGenerate( 'For Dead Load, Shorter Span, W<sub>d,S</sub>',
			  wdx.toFixed(2),
			  'kN/m');
    result += trGenerate( 'For Dead Load, Longer Span, W<sub>d,L</sub>',
			  wdy.toFixed(2),
			  'kN/m');
    result += '</tbody></table>';


    ////////////////////////////////////////////////////////////////////////

    result += '<p>';
    result += '<h4> - Prestress Force Required to Balance '+ (per*100).toFixed(0) +'% of selfweight DL </h4>';
    result += '</p>';


    result += '<table><tbody>';

    var reqFx = wdx * Math.pow(lx/1000,2) / ( 8*(aint/1000))*0.5;
    var reqFy = wdy * Math.pow(ly/1000,2) / ( 8*(aint/1000))*0.5;
    result += trGenerate( 'F = 0.5 x W<sub>d,S</sub> l<sup>2</sup><sub>S</sub> / ( 8 a<sub>INT</sub> )',
			  reqFx.toFixed(0),
			  'kN');
    result += trGenerate( 'F = 0.5 x W<sub>d,L</sub> l<sup>2</sup><sub>L</sub> / ( 8 a<sub>INT</sub> )',
			  reqFy.toFixed(0),
			  'kN');

    result += '</tbody></table>';

    //
    result += '<p>';
    result += 'Assuming a requied force above, leads to the following number of strands; ';
    result += '</p>';

    //
    result += '<p> For Shorter Span,</p>';
    //
    var reqNx = reqFx/peff;
    var reqNy = reqFy/peff;

    var Nx = Math.round(reqNx,0);
    var NxColumn = Math.round(0.60*Nx,0);
    var NxMiddle = Nx-NxColumn;
    var sigXgC = peff*1000*NxColumn/(t*ly/2);
    var sigXgM = peff*1000*NxMiddle/(t*ly/2);
    var sigXgAve = peff*1000*Nx/(t*ly);

    var Ny = Math.round(reqNy,0);
    var NyColumn = Math.round(0.60*Ny,0);
    var NyMiddle = Ny-NyColumn;
    var sigYgC = peff*1000*NyColumn/(t*lx/2);
    var sigYgM = peff*1000*NyMiddle/(t*lx/2);
    var sigYgAve = peff*1000*Ny/(t*lx);

    result += '<table><tbody>';
    result += trGenerate2( 'Nx = Fx / P<sub>eff</sub> ='+ reqNx.toFixed(1),
			   Nx,
			   '&nbsp; strands',
			   '&nbsp; &sigma;<sub>g</sub>',
			   (sigXgAve).toFixed(2),
			   '&nbsp; N/mm<sup>2</sup> -- ( from 0.86 N/mm<sup>2</sup> to 3.5 N/mm<sup>2</sup>)');
    result += trGenerate2( 'For Column Strip 60% ',
			   NxColumn,
			   '&nbsp; strands',
			   '&nbsp; &sigma;<sub>g,c</sub>',
			   (sigXgC).toFixed(2),
			   '&nbsp; N/mm<sup>2</sup>');
    result += trGenerate2( 'For Middle Strip 40% ',
			   NxMiddle,
			   '&nbsp; strands',
			   '&nbsp; &sigma;<sub>g,m</sub>',
			   (sigXgM).toFixed(2),
			   '&nbsp; N/mm<sup>2</sup>');
    result += '</tbody></table>';
    //
    result += '<p> For Longer Span,</p>';

    result += '<table><tbody>';
    result += trGenerate2( 'Ny = Fy / P<sub>eff</sub> ='+ reqNy.toFixed(1),
			   Ny,
			   '&nbsp; strands',
			   '&nbsp; &sigma;<sub>g</sub>',
			   (sigYgAve).toFixed(2),
			   '&nbsp; N/mm<sup>2</sup> -- ( from 0.86 N/mm<sup>2</sup> to 3.5 N/mm<sup>2</sup>)');
    result += trGenerate2( 'For Column Strip 60% ',
			   NyColumn,
			   '&nbsp; strands',
			   '&nbsp; &sigma;<sub>g,c</sub>',
			   (sigYgC).toFixed(2),
			   '&nbsp; N/mm<sup>2</sup>');
    result += trGenerate2( 'For Middle Strip 40% ',
			   NyMiddle,
			   '&nbsp; strands',
			   '&nbsp; &sigma;<sub>g,m</sub>',
			   (sigYgM).toFixed(2),
			   '&nbsp; N/mm<sup>2</sup>');
    result += '</tbody></table>';

    ////////////////////////////////////////////////////////////////////////
    result += '<p>';
    result += '<h4> - Service Stresses </h4>';
    result += '</p>';

    var ptAx = (ly/2)*t;
    var ptZx = (ly/2)*t*t/6;
    var ptAy = (lx/2)*t;
    var ptZy = (lx/2)*t*t/6;

    result += '<table><tbody>';
    result += trGenerate2( 'For Shorter Span, Ax',
			   ptAx.toFixed(0),
			   '&nbsp; mm<sup>2</sup>',
			   '&nbsp; Zx',
			   ptZx.toFixed(0),
			   '&nbsp; mm<sup>3</sup>');
    result += trGenerate2( 'For Longer Span, Ay',
			   ptAy.toFixed(0),
			   '&nbsp; mm<sup>2</sup>',
			   '&nbsp; Zy',
			   ptZy.toFixed(0),
			   '&nbsp; mm<sup>3</sup>');
    result += '</tbody></table>';

    var ptAx2 = ptAx;
    var ptZx2 = ptZx;
    var ptAy2 = ptAy;
    var ptZy2 = ptZy;


    if ( idx == 0 ){
	ptAx2 = (ly/2)*(t+ta);
	ptZx2 = (ly/2)*(t+ta)*(t+ta)/6;
	ptAy2 = (lx/2)*(t+ta);
	ptZy2 = (lx/2)*(t+ta)*(t+ta)/6;

	result += '<p> For Drop Panel </p>';
	result += '<table><tbody>';
	result += trGenerate2( 'For Shorter Span, Ax',
			       ptAx2.toFixed(0),
			       '&nbsp; mm<sup>2</sup>',
			       '&nbsp; Zx',
			       ptZx2.toFixed(0),
			       '&nbsp; mm<sup>3</sup>');
	result += trGenerate2( 'For Longer Span, Ay',
			       ptAy2.toFixed(0),
			       '&nbsp; mm<sup>2</sup>',
			       '&nbsp; Zy',
			       ptZy2.toFixed(0),
			       '&nbsp; mm<sup>3</sup>');
	result += '</tbody></table>';
    }
    ////////////////////////////////////////////////////////////////////////

    result += '<p>';
    result += '<h4> - Moment Distribution &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    result +='<input type="button" value="ReCal" onclick="OnCalClick();"> </h4>';
    result += '</p>';

    result += '<table><tbody>';
    result += '<tr><td>';

    result += '<u>Shorter Span</u> ';
    result += ' ( l<sub>l</sub> / 2 = ' + (ly/2000).toFixed(2) + 'm )&nbsp;&nbsp;:';

    /*
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
     */
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

	for ( j = 6; j<7; j++ ){
	    result += fac[i][j];
	    result += '</td><td>';
	}

	result += '</td></tr>';

    }
    result += '</tbody></table>';

    ////////////////////////////////////////////////////////////////////////
    result += '<table><tbody>';

    for ( i = 0; i < 9; i++ ){

	result += '<tr><td>';

	result += fac[i][0];
	result += '</td><td>';
	result += fac[i][1];
	result += '</td><td>';
	result += fac[i][2];
	result += '</td><td>';

    	// For Post Tension
	if( i==0 || i==1 || i==4 || i==5 ){
	    result += '&sigma;<sub>t</sub> = &sigma;<sub>g,c</sub>+M/Z =';
	    result += '</td><td>';
	    if( i == 0 || i==4 ){
		var sigt = sigXgC*ptAx/ptAx2+mux[i]*Math.pow(10,6)/ptZx2;
	    }else{
		var sigt = sigXgC+mux[i]*Math.pow(10,6)/ptZx;
	    }
	    result += sigt.toFixed(1);
	    result += '</td><td>';
	    result += '&nbsp; < ' + fa.toFixed(2) + 'N/mm<sup>2</sup>';
	    result += '</td><td>';
	    if(  sigt < fa ){
		result += '-OK';
	    }else {
		result += '-NG';
	    }
	    result += '</td><td>';
	    result += '&nbsp; &sigma;<sub>b</sub> = &sigma;<sub>g,c</sub>-M/Z =';
	    result += '</td><td>';
	    if( i == 0 || i==4 ){
		var sigb = sigXgC*ptAx/ptAx2-mux[i]*Math.pow(10,6)/ptZx2;
	    }else{
		var sigb = sigXgC-mux[i]*Math.pow(10,6)/ptZx;
	    }
	    result += sigb.toFixed(1);
	    result += '</td><td>';
	    result += '&nbsp; > -' + fya.toFixed(2) + 'N/mm<sup>2</sup>';
	    result += '</td><td>';
	    if(  sigb > -fya ){
		result += '-OK';
	    }else {
		result += '-NG';
	    }

	} else if( i==2 || i==3 || i==6 || i==7 || i==8 ){
	    result += '&sigma;<sub>t</sub> = &sigma;<sub>g,m</sub>+M/Z =';
	    result += '</td><td>';
	    var sigt = sigXgM+mux[i]*Math.pow(10,6)/ptZx;
	    result += sigb.toFixed(1);
	    result += '</td><td>';
	    result += '&nbsp; < ' + fa.toFixed(2) + 'N/mm<sup>2</sup>';
	    result += '</td><td>';
	    if(  sigt < fa ){
		result += '-OK';
	    }else {
		result += '-NG';
	    }
	    result += '</td><td>';
	    result += '&nbsp; &sigma;<sub>b</sub> = &sigma;<sub>g,m</sub>-M/Z =';
	    result += '</td><td>';
	    var sigb = sigXgM-mux[i]*Math.pow(10,6)/ptZx;
	    result += sigb.toFixed(1);
	    result += '</td><td>';
	    result += '&nbsp; > -' + fya.toFixed(2) + 'N/mm<sup>2</sup>';
	    result += '</td><td>';
	    if(  sigb > -fya ){
		result += '-OK';
	    }else {
		result += '-NG';
	    }
	}
	//
	result += '</td><td>';
	if( i==0 || i==2 || i==4 || i==6 || i==7 ){
	    result += 'A<sub>s,min</sub> Req';
	} else if( i==1 || i==3 || i==5 || i==8 ){
	    if( sigb < -fya2 ){
		result += 'A<sub>s,min</sub> Req';
	    }else {
		result += 'No RF Req';
	    }
	}
	//
	result += '</td><tr>';
    }
	var fya = 0.5*Math.sqrt(fc);

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

    /*
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

     */
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

	for ( j = 6; j<7; j++ ){
	    result += fac2[i][j];
	    result += '</td><td>';
	}

	result += '</td></tr>';
    }

    result += '</tbody></table>';

        ////////////////////////////////////////////////////////////////////////
    result += '<table><tbody>';

    for ( i = 0; i < 9; i++ ){

	result += '<tr><td>';

	result += fac[i][0];
	result += '</td><td>';
	result += fac[i][1];
	result += '</td><td>';
	result += fac[i][2];
	result += '</td><td>';

    	// For Post Tension
	if( i==0 || i==1 || i==4 || i==5 ){
	    result += '&sigma;<sub>t</sub> = &sigma;<sub>g,c</sub>+M/Z =';
	    result += '</td><td>';
	    if( i == 0 || i==4 ){
		var sigt = sigXgC*ptAy/ptAy2+muy[i]*Math.pow(10,6)/ptZy2;
	    }else{
		var sigt = sigXgC+muy[i]*Math.pow(10,6)/ptZy;
	    }
	    result += sigt.toFixed(1);
	    result += '</td><td>';
	    result += '&nbsp; < ' + fa.toFixed(2) + 'N/mm<sup>2</sup>';
	    result += '</td><td>';
	    if(  sigt < fa ){
		result += '-OK';
	    }else {
		result += '-NG';
	    }
	    result += '</td><td>';
	    result += '&nbsp; &sigma;<sub>b</sub> = &sigma;<sub>g,c</sub>-M/Z =';
	    result += '</td><td>';
	    if( i == 0 || i==4 ){
		var sigb = sigXgC*ptAy/ptAy2-muy[i]*Math.pow(10,6)/ptZy2;
	    }else{
		var sigb = sigXgC-muy[i]*Math.pow(10,6)/ptZy;
	    }
	    result += sigb.toFixed(1);
	    result += '</td><td>';
	    result += '&nbsp; > -' + fya.toFixed(2) + 'N/mm<sup>2</sup>';
	    result += '</td><td>';
	    if(  sigb > -fya ){
		result += '-OK';
	    }else {
		result += '-NG';
	    }

	} else if( i==2 || i==3 || i==6 || i==7 || i==8 ){
	    result += '&sigma;<sub>t</sub> = &sigma;<sub>g,m</sub>+M/Z =';
	    result += '</td><td>';
	    var sigt = sigXgM+muy[i]*Math.pow(10,6)/ptZy;
	    result += sigb.toFixed(1);
	    result += '</td><td>';
	    result += '&nbsp; < ' + fa.toFixed(2) + 'N/mm<sup>2</sup>';
	    result += '</td><td>';
	    if(  sigt < fa ){
		result += '-OK';
	    }else {
		result += '-NG';
	    }
	    result += '</td><td>';
	    result += '&nbsp; &sigma;<sub>b</sub> = &sigma;<sub>g,m</sub>-M/Z =';
	    result += '</td><td>';
	    var sigb = sigXgM-muy[i]*Math.pow(10,6)/ptZy;
	    result += sigb.toFixed(1);
	    result += '</td><td>';
	    result += '&nbsp; > -' + fya.toFixed(2) + 'N/mm<sup>2</sup>';
	    result += '</td><td>';
	    if(  sigb > -fya ){
		result += '-OK';
	    }else {
		result += '-NG';
	    }

	}
	//
	result += '</td><td>';
	if( i==0 || i==2 || i==4 || i==6 || i==7 ){
	    result += 'A<sub>s,min</sub> Req';
	} else if( i==1 || i==3 || i==5 || i==8 ){
	    if( sigb < -fya2 ){
		result += 'A<sub>s,min</sub> Req';
	    }else {
		result += 'No RF Req';
	    }
	}
	//
	result += '</td><tr>';
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

    /*
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

    //    for ( i = 0; i < 9; i++ ){
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
     */
    // Cal, Long Span

    var muy = [];
    var dia2 = [];
    var idName2;

    /*
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
     */
    var addresult = '';
    /*
    // Limitation
    var rhoTop = Rebar[idTopStan].As/pStanTop/t*100.0;
    var rhoBot = Rebar[idBotStan].As/pStanBot/t*100.0;
    var rhoTop2 = Rebar[idTopStan2].As/pStanTop2/t*100.0;
    var rhoBot2 = Rebar[idBotStan2].As/pStanBot2/t*100.0;

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

    */
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
	addresult += ' &gt l<sub>L</sub> / ( 50 with Drop Panel or 40 without Drop Panel )';
    }

    addresult += '</td></tr>';
    addresult += '</tbody></table>';


    //////////////////////////////////////////////////
    //////////////////////////////////////////////////

    addresult += '<p>';
    addresult += '<h4> - Deflection </h4>';
    addresult += '</p>';
    var ec = 4700.0*Math.sqrt(fc);
    var kd = 0.11*(1.5-0.5*ly/lx);
    var wu = Number( document.getElementById('wtl').innerHTML) ;
    var def = kd*(wu*Math.pow(10,-3))*Math.pow(ly,4)/ec/Math.pow(t,3);
    addresult += '<table><tbody>';

    addresult += trGenerate2( 'Ec = 4700 &radic; f<sub>c</sub>',
			   ec.toFixed(0),
			   '&nbsp; N/mm<sup>2</sup>',
			   '&nbsp; kd = 0.11 (1.5-0.5 l<sub>L</sub> / l<sub>S</sub> )',
			   kd.toFixed(2),
			   '&nbsp; ');
    addresult += trGenerate2( 'dev = k wu l<sub>L</sub><sup>4</sup> / ( Ec h<sup>3</sup> )',
			   def.toFixed(0),
			   '&nbsp; mm',
			   '&nbsp; dev/l<sub>S</sub>'  ,
			   '1/' + (lx/def).toFixed(0),
			   '&nbsp; ');

    addresult += '</tbody></table>';

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

function trGenerate( eq, figure, unit){

    // output function

    var result = '';

    result += '<tr><td>';
    result += eq + ' = ';
    result += '</td><td>';
    result += figure;
    result += '</td><td>';
    result += unit;

    return result;
}

function trGenerate2( eq, figure, unit, eq2, figure2, unit2){

    // output function

    var result = '';

    result += '<tr><td>';
    result += eq + ' = ';
    result += '</td><td>';
    result += figure;
    result += '</td><td>';
    result += unit;
    result += '</td><td>';
    result += eq2 + ' = ';
    result += '</td><td>';
    result += figure2;
    result += '</td><td>';
    result += unit2;

    return result;
}
