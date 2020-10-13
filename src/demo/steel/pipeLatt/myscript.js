/*
 Start to run JavaScript
 */

window.onload = function (){

    // input data
    var span = 20.0;
    var number = 7;
    var pv = 10.5;
    var idx = 0;
    var dp = 1800.0;
    var m = 4;
    var fy = 236.0;
    var lcBot = 5.00;

    document.getElementById('job').value = 'New Project';
    document.getElementById('span').value = span.toFixed(1);
    document.getElementById('number').value = number;
    document.getElementById('pv').value = pv;
    document.BounForm.BounName.selectedIndex = idx;
    document.getElementById('dp').value = dp;
    document.getElementById('TopChord').selectedIndex = 11;
    document.getElementById('BotomChord').selectedIndex = 11;
    document.getElementById('Dig1').selectedIndex = 5;
    document.getElementById('Dig2').selectedIndex = 3;
    document.getElementById('Post').selectedIndex = 1;
    document.getElementById('numPost').value = 3;
    document.getElementById('m').value = m;
    document.getElementById('lcBot').value = lcBot.toFixed(2);
    document.getElementById('fy').value = fy;
    document.getElementById('numMember').value = 16;
    document.getElementById('Divide').selectedIndex = 0;
    document.getElementById('loadMemo').value = 'P= 0.7kN/m x 2.5m x 6.0m = 10.5 kN';

    DrawSec();
}

////////////////////////////////////////////////////////////////////////
var downloadAsFile = function(fileName, content) {

    var textArray = [];
    textArray[0]    = document.title;
    textArray[1]    = document.getElementById('job').value;
    textArray[2]    = document.getElementById('span').value;
    textArray[3]    = document.getElementById('number').value;
    textArray[4]    = document.getElementById('pv').value;
    textArray[5]    = document.BounForm.BounName.selectedIndex;
    textArray[6]    = document.getElementById('dp').value;
    textArray[7]    = document.getElementById('TopChord').selectedIndex;
    textArray[8]    = document.getElementById('BotomChord').selectedIndex;
    textArray[9]    = document.getElementById('Dig1').selectedIndex;
    textArray[10]    = document.getElementById('Dig2').selectedIndex;
    textArray[11]    = document.getElementById('Post').selectedIndex;
    textArray[12]    = document.getElementById('numPost').value;
    textArray[13]    = document.getElementById('m').value;
    textArray[14]    = document.getElementById('lcBot').value;
    textArray[15]    = document.getElementById('fy').value;
    textArray[16]    = document.getElementById('numMember').value;
    textArray[17]    = document.getElementById('Divide').selectedIndex;
    textArray[18]    = document.getElementById('loadMemo').value;

    var n = 18;
    var content ='';
    var i;
    for( i = 0; i<=n; i++){
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

	    window.title = textArray[0]    ;
	    document.getElementById('job').value = textArray[1]    ;
	    document.getElementById('span').value = textArray[2]    ;
	    document.getElementById('number').value = textArray[3]    ;
	    document.getElementById('pv').value = textArray[4]    ;
	    document.BounForm.BounName.selectedIndex = textArray[5]    ;
	    document.getElementById('dp').value = textArray[6]    ;
	    document.getElementById('TopChord').selectedIndex = textArray[7]    ;
	    document.getElementById('BotomChord').selectedIndex = textArray[8]    ;
	    document.getElementById('Dig1').selectedIndex = textArray[9]    ;
	    document.getElementById('Dig2').selectedIndex = textArray[10]    ;
	    document.getElementById('Post').selectedIndex = textArray[11]    ;
	    document.getElementById('numPost').value = textArray[12]    ;
	    document.getElementById('m').value = textArray[13]    ;
	    document.getElementById('lcBot').value = textArray[14]    ;
	    document.getElementById('fy').value = textArray[15]    ;
	    document.getElementById('numMember').value = textArray[16]    ;
	    document.getElementById('Divide').selectedIndex = textArray[17]   ;
	    document.getElementById('loadMemo').value = textArray[18]    ;

	    DrawSec();
	    OnButtonClick();

	}
    },false);

}

////////////////////////////////////////////////////////////////////////

function OnButtonClick(){

    DrawSec();
    // Input
    ////////////////////////////////////////////////////////////////////////
    var span = Number( document.getElementById('span').value );
    var number = Number( document.getElementById('number').value );
    var pv = Number( document.getElementById('pv').value );
    var idx = document.BounForm.BounName.selectedIndex;
    var dp = Number( document.getElementById('dp').value );
    var m = Number( document.getElementById('m').value );

    var TopChord = document.getElementById('TopChord').value;
    var BotChord = document.getElementById('BotomChord').value;
    var Dig1 = document.getElementById('Dig1').value;
    var Dig2 = document.getElementById('Dig2').value;
    var Post = document.getElementById('Post').value;

    var fy  = document.getElementById('fy').value;
    var lcBot  = document.getElementById('lcBot').value;
    var numMember = Number( document.getElementById('numMember').value );
    var numPost = Number( document.getElementById('numPost').value);
    // Initial Setting
    ////////////////////////////////////////////////////////////////////////
    var topArea = Number( pipeSec(TopChord)[2] );
    var botArea = Number( pipeSec(BotChord)[2] );
    var dig1Area = Number( pipeSec(Dig1)[2] );
    var dig2Area = Number( pipeSec(Dig2)[2] );
    var postArea = Number( pipeSec(Post)[2] );

    var topI = Number( pipeSec(TopChord)[3] );
    var botI = Number( pipeSec(BotChord)[3] );

    var topDia = Number( pipeSec(TopChord)[0] );
    var botDia = Number( pipeSec(BotChord)[0] );
    var dig1Dia = Number( pipeSec(Dig1)[0] );
    var dig2Dia = Number( pipeSec(Dig2)[0] );

    var topRad = Number( pipeSec(TopChord)[4] );
    var botRad = Number( pipeSec(BotChord)[4] );
    var dig1Rad = Number( pipeSec(Dig1)[4] );
    var dig2Rad = Number( pipeSec(Dig2)[4] );

    var ly = dp - ( topDia + botDia ) /2.0 ;
    var lx = span*1000.0/(number+1)/2.0;
    var digLc = Math.sqrt( Math.pow(lx,2) + Math.pow(ly,2) );

    var numDig1 = m*2.0; // dig1
    var numDig2 = numMember - numDig1; //dig2

    var weight=0.0;

    var wChord = (topArea+botArea)*7.85/1000*span*9.8;
    var wDig = numDig1*digLc*dig1Area*7.85/1000000*9.8;
    wDig = wDig + numDig2*digLc*dig2Area*7.85/1000000*9.8;
    var wPost = numPost*ly*postArea*7.850/1000000*9.8;

    var wTotal = ( wChord + wDig + wPost)/span;
    wChord = wChord/1000.0;
    wDig = wDig/1000.0;
    wPost = wPost/1000.0;
    wTotal = wTotal/1000.0;
    var wd = wTotal*1.20;

    // Calculation Stress
    ////////////////////////////////////////////////////////////////////////
    var mndiv = number;

    var mNegative,mPositive;
    var mNegativeSelf,mPositiveSelf;

    var vv,vv2;
    var vvSelf,vvSelf2;

    vv  = pv*number/2.0;
    vvSelf = wd*span/2.0;

    //    vv2 = vv*(2.0*m/(2*number+2));
    vv2 = shearForce( numMember, number, pv, span, m+1);
    if( m+1 >= numMember/2){
	vv2 = shearForce( numMember, number, pv, span, m);
    }
    vvSelf2 = vvSelf*(m-numMember/2)/(1-numMember/2);

    if( idx == 1 ){
	// Pin
	mNegative = 0.0;
	mNegativeSelf = 0.0;
    }
    if( idx == 0 ){
	// Fix
	mNegative = mmc( mndiv, pv, span);
	mNegativeSelf = Number(wd*span*span/12.0);
    }

    mPositive = mmd( mndiv, pv, span) - mNegative;
    mPositiveSelf = wd*span*span/8.0 - mNegativeSelf;

    var mN,mP; // Total Moment
    mP = mPositive + mPositiveSelf
    mN = mNegative + mNegativeSelf
    var v1,v2;
    v1 = vv + vvSelf;
    v2 = vv2 + vvSelf2;

    // Transportation to Member Stress
    ////////////////////////////////////////////////////////////////////////
    var pChordNega, pChordPosi;
    var pDig1,pDig2;
    pChordNega = mN/(ly/1000.0);
    pChordPosi = mP/(ly/1000.0);
    pDig1 = v1 * digLc/ly;
    pDig2 = v2 * digLc/ly;

    // Output
    ////////////////////////////////////////////////////////////////////////

    var result = '';

    result += '<p><h4> - Self Weight</h4> </p>';

    result += '<table><tbody>';

    result += '<tr><td>';
    result += 'Top and Bottom Chord: ';
    result += '</td><td>';
    result += wChord.toFixed(3);
    result += '</td><td>';
    result += 'kN - > ';
    result += '</td><td>';
    result += (wChord/span).toFixed(3);
    result += '</td><td>';
    result += 'kN/m';
    result += '</td></tr>';

    result += '<tr><td>';
    result += 'Digonal: ';
    result += '</td><td>';
    result += wDig.toFixed(3);
    result += '</td><td>';
    result += 'kN - > ';
    result += '</td><td>';
    result += (wDig/span).toFixed(3);
    result += '</td><td>';
    result += 'kN/m';
    result += '</td></tr>';

    result += '<tr><td>';
    result += 'Post: ';
    result += '</td><td>';
    result += wPost.toFixed(3);
    result += '</td><td>';
    result += 'kN - > ';
    result += '</td><td>';
    result += (wPost/span).toFixed(3);
    result += '</td><td>';
    result += 'kN/m';
    result += '</td></tr>';

    result += '<tr><td>';
    result += 'Self Weight ws = ';
    result += '</td><td>';
    result += '</td><td>';
    result += '</td><td>';
    result += wTotal.toFixed(3);
    result += '</td><td>';
    result += 'kN/m -> ';
    result += '</td><td>';
    result += 'wd = 1.20 x ws = ';
    result += '</td><td>';
    result += wd.toFixed(3);
    result += '</td><td>';
    result += 'kN/m (';
    result += '</td><td>';
    result += (wd*1000/9.8).toFixed(0);
    result += '</td><td>';
    result += 'kg/m )';
    result += '</td></tr>';


    result += '</tbody></table>';

    ////////////////////////////////////////////////////////////////////////
    result += '<p><h4> - Stress to Truss</h4> </p>';

    result += '<table><tbody>';

    result += '<tr><td>';
    result += 'M<sup>-</sup> = ';
    result += '</td><td>';
    result += mNegative.toFixed(2);
    result += '</td><td>';
    result += '+' + mNegativeSelf.toFixed(2);
    result += '</td><td>';
    result += '=' + mN.toFixed(2);
    result += '</td><td>';
    result += 'kN.m -- Max. Negative Moment';

    result += '</td></tr>';

    result += '<tr><td>';
    result += 'M<sup>+</sup> = ';
    result += '</td><td>';
    result += mPositive.toFixed(2);
    result += '</td><td>';
    result += '+' + mPositiveSelf.toFixed(2);
    result += '</td><td>';
    result += '=' + mP.toFixed(2);
    result += '</td><td>';
    result += 'kN.m -- Max. Positive Moment';
    result += '</td></tr>';

    result += '<tr><td>';
    result += 'V<sub>ext</sub> = ';
    result += '</td><td>';
    result += vv.toFixed(2);
    result += '</td><td>';
    result += '+' + vvSelf.toFixed(2);
    result += '</td><td>';
    result += '=' + v1.toFixed(2);
    result += '</td><td>';
    result += 'kN -- Max. Shear force';
    result += '</td></tr>';

    result += '<tr><td>';
    result += 'V<sub>int</sub> = ';
    result += '</td><td>';
    result += vv2.toFixed(2);
    result += '</td><td>';
    result += '+' + vvSelf2.toFixed(2);
    result += '</td><td>';
    result += '=' + v2.toFixed(2);
    result += '</td><td>';
    result += 'kN -- Shear Force at digonal member switching';
    result += '</td></tr>';

    result += '<tr><td>';
    result += '</td><td>';
//    result += 'Point Load &nbsp;&nbsp;'
    result += '</td><td>';
    result += '( Self Load )';
    result += '</td></tr>';

    result += '</tbody></table>';

    ////////////////////////////////////////////////////////////////////////
    result += '<p><h4> - Stress to Member</h4> </p>';

    result += '<table><tbody>';

    result += '<tr><td>';
    result += 'D<sub>c</sub> = D<sub>p</sub> - ( Dia. of Top Chord + Dia. of Bottom Chord ) / 2 = ';
    result += '</td><td>';
    result += ly.toFixed(0);
    result += '</td><td>';
    result += 'mm // Distance from center to center of the chord';
    result += '</td></tr>';

    result += '<tr><td>';
    result += 'L<sub>dig</sub> = ';
    result += '</td><td>';
    result += digLc.toFixed(0);
    result += '</td><td>';
    result += 'mm // Length of Digonal';
    result += '</td></tr>';

    result += '</tbody></table>';

    result += '<table><tbody>';

    result += '<tr><td>';
    result += 'N<sup>+</sup> = M<sup>+</sup> / D<sub>c</sub> = ';
    result += '</td><td>';
    result += pChordNega.toFixed(2);
    result += '</td><td>';
    result += 'kN';
    result += '</td></tr>';

    result += '<tr><td>';
    result += 'N<sup>-</sup> = M<sup>-</sup> / D<sub>c</sub> = ';
    result += '</td><td>';
    result += pChordPosi.toFixed(2);
    result += '</td><td>';
    result += 'kN';
    result += '</td></tr>';

    result += '<tr><td>';
    result += 'P<sub>ext</sub> = V<sub>ext</sub> x L<sub>dig</sub> /  D<sub>c</sub> = ';
    result += '</td><td>';
    result += pDig1.toFixed(2);
    result += '</td><td>';
    result += 'kN';
    result += '</td></tr>';

    result += '<tr><td>';
    result += 'P<sub>int</sub> = V<sub>int</sub> x L<sub>dig</sub> /  D<sub>c</sub> = ';
    result += '</td><td>';
    result += pDig2.toFixed(2);
    result += '</td><td>';
    result += 'kN';
    result += '</td></tr>';

    result += '</tbody></table>';

    ////////////////////////////////////////////////////////////////////////
    // Chord
    var sigt,sigc; // Tension, Compression
    var lamda, ffa; // Srenderness Ratio, Permissible compression stress
    var sf1,sf2; // safety factor for tension and compression respectively

    // Top Chord

    sigt = pChordNega*1000.0/topArea;
    sigc = pChordPosi*1000.0/topArea;
    lamda = (2.0*lx)/topRad;
    ffa = fa(lamda, fy);
    sf1 = sigt/(0.6*fy);
    sf2 = sigc/ffa;

    //

    result += '<p><h4> - Top Chord, &nbsp;' + TopChord + '</h4> </p>';

    result += '<table><tbody>';
    result += '<tr><td>';

    result += '</td><td>';
    result += 'As = ';
    result += '</td><td>';
    result += topArea.toFixed(0);
    result += '</td><td>';
    result += 'mm<sup>2</sup>, &nbsp;&nbsp;';

    result += '</td><td>';
    result += '0.6 Fy = ';
    result += '</td><td>';
    result += (0.6*fy).toFixed(0);
    result += '</td><td>';
    result += 'N/mm<sup>2</sup>, &nbsp;&nbsp;';

    result += '</td><td>';
    result += 'r = ';
    result += '</td><td>';
    result += topRad.toFixed(0);
    result += '</td><td>';
    result += 'mm, &nbsp;&nbsp;';

    result += '</td><td>';
    result += 'lc = ';
    result += '</td><td>';
    result += (lx*2.0).toFixed(0);
    result += '</td><td>';
    result += 'mm, &nbsp;&nbsp;';

    result += '</td><td>';
    result += '&lambda; = ';
    result += '</td><td>';
    result += lamda.toFixed(0);
    result += '</td><td>';
    result += '&nbsp; -> &nbsp;';

    result += '</td><td>';
    result += 'f<sub>a</sub> = ';
    result += '</td><td>';
    result += ffa.toFixed(0);
    result += '</td><td>';
    result += 'N/mm<sup>2</sup>';

    result += '</td></tr>';
    result += '</tbody></table>';

    //

    result += '<table><tbody>';
    result += '<tr><td>';

    result += 'For Tension at the end,';
    result += '</td><td>';
    result += '; &nbsp; -> &nbsp;';

    result += '</td><td>';
    result += '&sigma;<sub>t</sub> = N<sup>-</sup>/As = ';
    result += '</td><td>';
    result += sigt.toFixed(0);
    result += '</td><td>';
    result += 'N/mm<sup>2</sup>, &nbsp;';

    result += '</td><td>';
    result += '&sigma;<sub>t</sub> / ( 0.6 F<sub>y</sub> ) = ';
    result += '</td><td style="color:red">';
    result += sf1.toFixed(3);

    result += '</td></tr>';

    //

    result += '<tr><td>';

    result += 'For Compression at the center,';
    result += '</td><td>';
    result += '; &nbsp; -> &nbsp;';

    result += '</td><td>';
    result += '&sigma;<sub>c</sub> = N<sup>+</sup>/As = ';
    result += '</td><td>';
    result += sigc.toFixed(0);
    result += '</td><td>';
    result += 'N/mm<sup>2</sup>, &nbsp;';

    result += '</td><td>';
    result += '&sigma;<sub>c</sub> / f<sub>a</sub>= ';
    result += '</td><td style="color:red">';
    result += sf2.toFixed(3);

    result += '</td></tr>';
    result += '</tbody></table>';

    ////////////////////////////////////////////////////////////////////////
    // Bot Chord

    sigt = pChordPosi*1000.0/botArea;
    sigc = pChordNega*1000.0/botArea;
    lamda = lcBot*1000.0/botRad;
    ffa = fa(lamda, fy);
    sf1 = sigt/(0.6*fy);
    sf2 = sigc/ffa;

    //

    result += '<p><h4> - Bottom Chord, &nbsp;' + BotChord + '</h4> </p>';

    result += '<table><tbody>';
    result += '<tr><td>';

    result += '</td><td>';
    result += 'As = ';
    result += '</td><td>';
    result += botArea.toFixed(0);
    result += '</td><td>';
    result += 'mm<sup>2</sup>, &nbsp;&nbsp;';

    result += '</td><td>';
    result += '0.6 Fy = ';
    result += '</td><td>';
    result += (0.6*fy).toFixed(0);
    result += '</td><td>';
    result += 'N/mm<sup>2</sup>, &nbsp;&nbsp;';

    result += '</td><td>';
    result += 'r = ';
    result += '</td><td>';
    result += botRad.toFixed(0);
    result += '</td><td>';
    result += 'mm, &nbsp;&nbsp;';

    result += '</td><td>';
    result += 'lc = ';
    result += '</td><td>';
    result += (lcBot*1000).toFixed(0);
    result += '</td><td>';
    result += 'mm, &nbsp;&nbsp;';

    result += '</td><td>';
    result += '&lambda; = ';
    result += '</td><td>';
    result += lamda.toFixed(0);
    result += '</td><td>';
    result += '&nbsp; -> &nbsp;';

    result += '</td><td>';
    result += 'f<sub>a</sub> = ';
    result += '</td><td>';
    result += ffa.toFixed(0);
    result += '</td><td>';
    result += 'N/mm<sup>2</sup>';

    result += '</td></tr>';
    result += '</tbody></table>';

    //

    result += '<table><tbody>';
    result += '<tr><td>';

    result += 'For Tension at the end,';
    result += '</td><td>';
    result += '; &nbsp; -> &nbsp;';

    result += '</td><td>';
    result += '&sigma;<sub>t</sub> = N<sup>+</sup>/As = ';
    result += '</td><td>';
    result += sigt.toFixed(0);
    result += '</td><td>';
    result += 'N/mm<sup>2</sup>, &nbsp;';

    result += '</td><td>';
    result += '&sigma;<sub>t</sub> / ( 0.6 F<sub>y</sub> ) = ';
    result += '</td><td style="color:red">';
    result += sf1.toFixed(3);

    result += '</td></tr>';

    //

    result += '<tr><td>';

    result += 'For Compression at the center,';
    result += '</td><td>';
    result += '; &nbsp; -> &nbsp;';

    result += '</td><td>';
    result += '&sigma;<sub>c</sub> = N<sup>-</sup>/As = ';
    result += '</td><td>';
    result += sigc.toFixed(0);
    result += '</td><td>';
    result += 'N/mm<sup>2</sup>, &nbsp;';

    result += '</td><td>';
    result += '&sigma;<sub>c</sub> / f<sub>a</sub>= ';
    result += '</td><td style="color:red">';
    result += sf2.toFixed(3);

    result += '</td></tr>';
    result += '</tbody></table>';

    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    // Digonal Chord for External End

    sigc = pDig1*1000/dig1Area;
    lamda = digLc/dig1Rad;
    ffa = fa(lamda, fy);
    sf2 = sigc/ffa;

    //
    result += '<p><h4> - Digonal, &nbsp;' + Dig1 + '</h4> </p>';

    result += '<table><tbody>';
    result += '<tr><td>';

    result += '</td><td>';
    result += 'As = ';
    result += '</td><td>';
    result += dig1Area.toFixed(0);
    result += '</td><td>';
    result += 'mm<sup>2</sup>, &nbsp;&nbsp;';

    result += '</td><td>';
    result += '0.6 Fy = ';
    result += '</td><td>';
    result += (0.6*fy).toFixed(0);
    result += '</td><td>';
    result += 'N/mm<sup>2</sup>, &nbsp;&nbsp;';

    result += '</td><td>';
    result += 'r = ';
    result += '</td><td>';
    result += dig1Rad.toFixed(0);
    result += '</td><td>';
    result += 'mm, &nbsp;&nbsp;';

    result += '</td><td>';
    result += 'lc = ';
    result += '</td><td>';
    result += (digLc).toFixed(0);
    result += '</td><td>';
    result += 'mm, &nbsp;&nbsp;';

    result += '</td><td>';
    result += '&lambda; = ';
    result += '</td><td>';
    result += lamda.toFixed(0);
    result += '</td><td>';
    result += '&nbsp; -> &nbsp;';

    result += '</td><td>';
    result += 'f<sub>a</sub> = ';
    result += '</td><td>';
    result += ffa.toFixed(0);
    result += '</td><td>';
    result += 'N/mm<sup>2</sup>';

    result += '</td></tr>';
    result += '</tbody></table>';

    //

    result += '<table><tbody>';
    result += '<tr><td>';

    result += 'For Compression (as safety evaluation ),';
    result += '</td><td>';
    result += '; &nbsp; -> &nbsp;';

    result += '</td><td>';
    result += '&sigma;<sub>c</sub> = P<sub>ext</sub> / As = ';
    result += '</td><td>';
    result += sigc.toFixed(0);
    result += '</td><td>';
    result += 'N/mm<sup>2</sup>, &nbsp;';

    result += '</td><td>';
    result += '&sigma;<sub>c</sub> / f<sub>a</sub>= ';
    result += '</td><td style="color:red">';
    result += sf2.toFixed(3);

    result += '</td></tr>';
    result += '</tbody></table>';

    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    // Digonal Chord for Internal

    sigc = pDig2*1000/dig2Area;
    lamda = digLc/dig2Rad;
    ffa = fa(lamda, fy);
    sf2 = sigc/ffa;

    //
    result += '<p><h4> - Digonal, &nbsp;' + Dig2;
    result += ' -- D<sub>digonal</sub> / D<sub>chord</sub> = ';
    result += (dig2Dia/Math.max(topDia,botDia)).toFixed(3);
    result += ' ( > 0.4 Limit) </h4> </p>';

    if ( dig2Dia/Math.max(topDia,botDia)  < 0.4 ){
	alert( 'Db (Digonal Dia.) / D (Chord Dia.) < 0.4 !!! ' );
    }


    result += '<table><tbody>';
    result += '<tr><td>';

    result += '</td><td>';
    result += 'As = ';
    result += '</td><td>';
    result += dig2Area.toFixed(0);
    result += '</td><td>';
    result += 'mm<sup>2</sup>, &nbsp;&nbsp;';

    result += '</td><td>';
    result += '0.6 Fy = ';
    result += '</td><td>';
    result += (0.6*fy).toFixed(0);
    result += '</td><td>';
    result += 'N/mm<sup>2</sup>, &nbsp;&nbsp;';

    result += '</td><td>';
    result += 'r = ';
    result += '</td><td>';
    result += dig2Rad.toFixed(0);
    result += '</td><td>';
    result += 'mm, &nbsp;&nbsp;';

    result += '</td><td>';
    result += 'lc = ';
    result += '</td><td>';
    result += (digLc).toFixed(0);
    result += '</td><td>';
    result += 'mm, &nbsp;&nbsp;';

    result += '</td><td>';
    result += '&lambda; = ';
    result += '</td><td>';
    result += lamda.toFixed(0);
    result += '</td><td>';
    result += '&nbsp; -> &nbsp;';

    result += '</td><td>';
    result += 'f<sub>a</sub> = ';
    result += '</td><td>';
    result += ffa.toFixed(0);
    result += '</td><td>';
    result += 'N/mm<sup>2</sup>';

    result += '</td></tr>';
    result += '</tbody></table>';

    //

    result += '<table><tbody>';
    result += '<tr><td>';

    result += 'For Compression (as safety evaluation ),';
    result += '</td><td>';
    result += '; &nbsp; -> &nbsp;';

    result += '</td><td>';
    result += '&sigma;<sub>c</sub> = P<sub>int</sub> / As = ';
    result += '</td><td>';
    result += sigc.toFixed(0);
    result += '</td><td>';
    result += 'N/mm<sup>2</sup>, &nbsp;';

    result += '</td><td>';
    result += '&sigma;<sub>c</sub> / f<sub>a</sub>= ';
    result += '</td><td style="color:red">';
    result += sf2.toFixed(3);

    result += '</td></tr>';
    result += '</tbody></table>';


    ////////////////////////////////////////////////////////////////////////
    // Deflection

    var costh = dp/digLc;
    var sinth = lx/digLc;
    var ase   = dig2Area/0.2*sinth*Math.pow(costh,2);
    var delv = delShear(number, pv, span, ase);

    var trusI = psi( topDia, topArea, topI, botDia, botArea, botI, dp)/10000;
    var delb = delvmain(number, pv, span, trusI);
    var dv = delb + delv;

    result += '<p><h4> - Deflection </h4> </p>';

    result += '<table><tbody>';
    result += '<tr><td>';

    result += 'I<sub>truss</sub> = ';
    result += '</td><td>';
    result += (trusI).toFixed(0);
    result += '</td><td>';
    result += 'cm<sup>4</sup> (By Chord),&nbsp;';

    result += '</td><td>';
    result += 'A<sub>se</sub> = ';
    result += '</td><td>';
    result += ase.toFixed(0);
    result += '</td><td>';
    result += 'mm<sup>2</sup> (From Internal Digonal for Safety)';

    result += '</td></tr>';
    result += '</tbody></table>';
    result += '<table><tbody>';
    result += '<tr><td>';

    result += '</td><td>';
    result += 'd<sub>v</sub> = ';
    result += '</td><td>';
    result += delb.toFixed(3);
    result += '</td><td>';
    result += '( Bending ) + ';
    result += '</td><td>';
    result += delv.toFixed(3);
    result += '</td><td>';
    result += ' ( Shear ) = ';
    result += '</td><td>';
    result += dv.toFixed(3);
    result += '</td><td>';
    result += 'cm  ( ';
    result += '</td><td style="color:red">';
    result += 'L / ' + (span*100/dv).toFixed(0);
    result += '</td><td style="color:red">';
    result += '  < L / 350 ) ';

    result += '</td></tr>';
    result += '</tbody></table>';

    ////////////////////////////////////////////////////////////////////////

    document.getElementById('result').innerHTML = result;

}

////////////////////////////////////////////////////////////////////////
//# Calculation of design moment for main truss
function mmd(n1, p, span){
    //    # n1: Point Number
    var aaa = 0.0;
    var a,b;
    var i;

    for( i = 1 ; i<= n1; i++){
	a = span / (n1 + 1) * i;
	b = span - a;

	if( a <= span/2.0 ){
	    aaa = aaa + a * p / 2.0;
	}
	else{
	    aaa = aaa + b * p / 2.0;
	}
    }
    return aaa;
}

function mmc(n1, p, span){

    var aaa = 0.0;
    var a,b;
    var i;

    for( i = 1 ; i<= n1; i++){
	a = span / (n1 + 1) * i;
	b = span - a;
	aaa = aaa + p * a * Math.pow(b , 2) / Math.pow( span , 2);
    }

    return aaa;
}

//# Calculation of vertical deflection for main truss
function delvmain(n1, p, span, si){
    // Load Number
    // p, kN
    // span, m
    //#'si inertia cm4
    // delv cm
    var delv = 0.0;

    /*
    if( n1 == 1 ){
	a = span / 2.0;
	b = a;
	delv = p * b * 100.0 / 3.0 / 20500.0 / si * Math.pow( ( Math.pow(a , 2) + 2.0 * a * b) , 1.5 ) / Math.pow( 3 , 1.5) * Math.pow(100.0, 1.5);
    }

    else {
*/
    for(i = 1; i <= n1; i++){
	a = span / (n1 + 1) * i;
	b = span - a;
	if( a < b ){
	    delv = delv + p * b / span / 3.0 / 20500.0 / si * Math.pow( ( Math.pow(a*100 , 2) + 2.0 * a * b*10000)/3 , 1.5 );
	} else {
	    delv = delv + p * a / span / 3.0 / 20500.0 / si * Math.pow( ( Math.pow(b*100 , 2) + 2.0 * a * b*10000)/3 , 1.5 );
	}
	console.log(n1, b.toFixed(2), a.toFixed(2),delv.toFixed(2));
    }
    /*
      }
    */
    return delv;
}

function psi( ph1, sa1, si1, ph2, sa2, si2, dp){
    //# calculate the Fv factor based on site class and Ss value.
    //# Notation
    //#   sa1: Area of Top chord     //mm2
    //#   si1: Inertia of Top Chord  //mm4
    //#   ph1: Depth of Top Chord    //mm
    //#   sa2: Area of Bot. chord    //mm2
    //#   si2: Inertia of Bot. Chord //mm4
    //#   ph2: Depth of Bot. Chord   //mm
    //#   dp : Depth of truss        //mm
    //# -> psi mm4
    s = sa1*(dp-ph1/2.0) + sa2*(ph2/2.0);
    yg = s/ (sa1+sa2);
    ppsi = sa1*Math.pow(dp-ph1/2.0-yg,2) + sa2 * Math.pow(ph2/2.0-yg,2)
    ppsi = ppsi + si1 + si2;
    return ppsi;
}

function fa(i, fy){
    //    #' allowable compression unit stress
    //    # i : srenderness ratio
    //    # fy: permissible tensile strength / N/mm2
    cc = 131;
    fa1 = 5.0 / 3.0 + 3.0 / 8.0 * i / cc - 1.0 / 8.0 * Math.pow( i / cc , 3);
    fa1 = (1.0 - Math.pow(i / cc, 2 )/ 2.0) / fa1 * fy;
    fa2 = 12.0 * Math.pow(3.141592 , 2) * 2.05 * Math.pow(10 , 6) / 23.0 / Math.pow(i , 2);
    if( i < 130.0){
	return fa1;
    }
    if( i >= 130.0){
	return fa2 / 9.8;
    }
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

////////////////////////////////////////////////////////////////////////
// Draw Beam Section Per Input Data
var canvas, ctx;
var scale, xscale, yscale, xcen, ycen;

function DrawSec () {

    var span = Number( document.getElementById('span').value );
    var h = Number( document.getElementById('dp').value )/1000;

    var TopChord = document.getElementById('TopChord').value;
    var BotChord = document.getElementById('BotomChord').value;
    var Dig1 = document.getElementById('Dig1').value;
    var Dig2 = document.getElementById('Dig2').value;
    var Post = document.getElementById('Post').value;

    var topDia = Number( pipeSec(TopChord)[0] )/1000;
    var botDia = Number( pipeSec(BotChord)[0] )/1000;
    var dig1Dia = Number( pipeSec(Dig1)[0] )/1000;
    var dig2Dia = Number( pipeSec(Dig2)[0] )/1000;
    var postDia = Number( pipeSec(Post)[0] )/1000;

    var number = Number( document.getElementById('number').value );
    //number = 3;
    var numMember = Number( document.getElementById('numMember').value );
    // numMember = 16;
    var m = Number( document.getElementById('m').value );
    var numPost = Number( document.getElementById('numPost').value );

    var Divide = document.getElementById('Divide').selectedIndex;

    ////////////////////////////////////////////////////////////////////////
    var xpoint = span/(number+1);
    var lx = span/numMember;

    ////////////////////////////////////////////////////////////////////////

    /*
    nTLay = 1;
    nLay = 1;
    var cvh = 355+(nLay-1)*30+(nTLay-1)*30;
    var result = '<canvas width=\"600\" height=\"'+cvh+'\" id=\"picCanvas\"></canvas>';
     */

    var result = '<canvas width=\"700\" id=\"picCanvas\"></canvas>';
    document.getElementById('picture').innerHTML = result;

    canvas = document.getElementById('picCanvas');
    ctx = canvas.getContext("2d");

    xcen = canvas.width / 2 - 45;
    ycen = canvas.height / 2 - 5;

    xscale = (canvas.width-120)/span;
    yscale = (canvas.height-70)/h;
    scale = (xscale < yscale) ? xscale : yscale;

    // Draw Dimension Lines
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.font = "12pt sans-serif";
    ctx.textAlign = "center";


    // Draw Beam Dimensions
    ctx.beginPath();
    ctx.moveTo(xcen-span/2*scale,ycen+h/2*scale+10);
    ctx.lineTo(xcen-span/2*scale,ycen+h/2*scale+30);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen+span/2*scale,ycen+h/2*scale+10);
    ctx.lineTo(xcen+span/2*scale,ycen+h/2*scale+30);
    ctx.stroke();
    drawLineArrow2(xcen-span/2*scale,ycen+h/2*scale+20,xcen+span/2*scale,ycen+h/2*scale+20);
    ctx.fillText(span.toFixed(2)+' m',xcen,ycen+h/2*scale+40);

    ctx.beginPath();
    ctx.moveTo(xcen+span/2*scale+10,ycen-h/2*scale);
    ctx.lineTo(xcen+span/2*scale+30,ycen-h/2*scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen+span/2*scale+10,ycen+h/2*scale);
    ctx.lineTo(xcen+span/2*scale+30,ycen+h/2*scale);
    ctx.stroke();
    drawLineArrow2(xcen+span/2*scale+20,ycen-h/2*scale,xcen+span/2*scale+20,ycen+h/2*scale);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(h.toFixed(2)+' m',xcen+span/2*scale+30,ycen);

    ////////////////////////////////////////////////////////////////////////
    // Draw Dimension Lines
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.font = "12pt sans-serif";
    ctx.textAlign = "center";

    // Draw Top Chord
    ctx.beginPath();
    ctx.moveTo(xcen-span/2*scale,ycen-h/2*scale);
    ctx.lineTo(xcen+span/2*scale,ycen-h/2*scale);
    ctx.lineWidth = topDia*scale;
    ctx.stroke();

    // Draw Bot Chord
    ctx.beginPath();
    ctx.moveTo(xcen-span/2*scale,ycen+h/2*scale);
    ctx.lineTo(xcen+span/2*scale,ycen+h/2*scale);
    ctx.lineWidth = botDia*scale;
    ctx.stroke();

    // Draw Digonal
    ctx.fillStyle = "gray";
    ctx.strokeStyle = "gray";
    ctx.font = "12pt sans-serif";
    ctx.textAlign = "center";
    ctx.setLineDash([5, 15]);

    var Judge = 'Odd';
    for( i = 1; i <= numMember; i++){

	x = lx*(i-1);
	xnxt = lx*i;

	if( Judge == 'Even' ){
	    Judge = 'Odd';
	    // Draw
	    ctx.beginPath();
	    ctx.moveTo(xcen-span/2*scale+x*scale,ycen+h/2*scale);
	    ctx.lineTo(xcen-span/2*scale+xnxt*scale,ycen-h/2*scale);
	    if( m < i && i <= numMember - m ){
		ctx.lineWidth = dig2Dia*scale;
		ctx.setLineDash([5]);
	    }else{
		ctx.lineWidth = dig1Dia*scale;
		ctx.setLineDash([0]);
	    }
	    ctx.stroke();

	}else{
	    Judge = 'Even';
	    // Draw
	    ctx.beginPath();
	    ctx.moveTo(xcen-span/2*scale+x*scale,ycen-h/2*scale);
	    ctx.lineTo(xcen-span/2*scale+xnxt*scale,ycen+h/2*scale);
	    ctx.lineWidth = dig1Dia*scale;
	    if( m < i && i <= numMember - m ){
		ctx.lineWidth = dig2Dia*scale;
		ctx.setLineDash([5]);
	    }else{
		ctx.lineWidth = dig1Dia*scale;
		ctx.setLineDash([0]);
	    }

	    ctx.stroke();
	}

    }


    // Draw Pitch Dimensions
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.font = "12pt sans-serif";
    ctx.textAlign = "center";
    ctx.lineWidth = 1;
    ctx.setLineDash([]);

    drawLineArrow2(xcen-span/2*scale,
		   ycen-10,
		   xcen-span/2*scale+xpoint*scale,
		   ycen-10);
    ctx.fillText((xpoint).toFixed(2)+' m',
		 xcen-span/2*scale+xpoint/2*scale,
		 ycen-h/2*scale-10);

    for( i = 1; i<=number; i++){
	drawLineArrow(xcen-span/2*scale+xpoint*scale*(i),
		      ycen-h/2*scale-30,
		      xcen-span/2*scale+xpoint*scale*(i),
		      ycen-h/2*scale-5);
    }

    // Draw Post
    var xpos;
    var dxpos;

    if( Divide == 1 ){
	xpos = -span/(numPost)/2;
	dxpos = span/(numPost);
    }
    else {
	xpos = 0;
    	dxpos = span/(numPost+1);
    }

    if( i >=1 ){
	for( i = 1; i <= numPost; i++ ){

	    xpos = xpos + dxpos;

	    ctx.beginPath();
	    ctx.moveTo(xcen-span/2*scale+xpos*scale,ycen-h/2*scale);
	    ctx.lineTo(xcen-span/2*scale+xpos*scale,ycen+h/2*scale);
	    ctx.lineWidth = postDia*scale;
	    ctx.setLineDash([2]);
	    ctx.stroke();
	}
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

function shearForce(numMember, number, pv, span, idx ){
    // numMember : number of digonal
    // number  : number of point loading
    // pv, kN  : point load
    // span, m : truss span
    // idx,    : integer for the number of truss evaluated

    var i;
    var x;
    var xload;

    var v = pv*number/2.0; // reaction force.

    for( i=1; i <= number; i++) {

	x = span/numMember * idx;
	xload = span/(number+1) * i;

	if( xload < x ){
	    v = v - pv;
	}

    }

    return v;
}

function delShear(n1, p, span, ase){
    // delShear cm
    // p kN
    // span m
    // ase mm2

    var delv = 0.0;

    for(i = 1; i <= n1; i++){
	a = span / (n1 + 1) * i;
	b = span - a;
	if( a < b ){
	    delv = delv + p*1000.0 * a*1000 / ( 2.0 * 41000.0 * ase );
	} else {
	    delv = delv + p*1000.0 * b*1000 / ( 2.0 * 41000.0 * ase );
	}
	console.log( "shear Def", n1, b.toFixed(2), a.toFixed(2),delv.toFixed(2)/10);
    }

    return delv/10.0;

}
