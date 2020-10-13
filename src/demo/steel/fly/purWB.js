/*
 Start to run JavaScript
 */
window.onload = function (){

    var wroof = 0.15 ;
    var wother = 0.30 ;
    var wlive = 0.30;
    var area = 2.2;
    var span = 9.0;
    var slope = 0.03;
    var fy = 236;
    var reqdv = 150;

    var l1 = 1.3;
    var h  = 1.5;

    document.getElementById('job').value = 'New Project';
    document.getElementById('Memb').selectedIndex = 5;
    document.getElementById('wroof').value = wroof.toFixed(3);
    document.getElementById('wother').value = wother.toFixed(3);
    document.getElementById('wlive').value = wlive.toFixed(3);
    document.getElementById('area').value = area.toFixed(3);
    document.getElementById('span').value = span.toFixed(3);
    document.getElementById('slope').value = slope.toFixed(2);
    document.getElementById('fy').value = fy;
    document.getElementById('reqdv').value = reqdv;

    document.getElementById('l1').value = l1.toFixed(3);
    document.getElementById('h').value = h.toFixed(3);


}

////////////////////////////////////////////////////////////////////////

var downloadAsFile = function(fileName, content) {

    var textArray = [];

    var npara = 12;
    textArray[0]    = document.title;
    textArray[1]    = document.getElementById('job').value;
    textArray[2]    = document.getElementById('Memb').selectedIndex ;
    textArray[3]    = document.getElementById('wroof').value ;
    textArray[4]    = document.getElementById('wother').value ;
    textArray[5]    = document.getElementById('wlive').value ;
    textArray[6]    = document.getElementById('area').value ;
    textArray[7]    = document.getElementById('span').value ;
    textArray[8]    = document.getElementById('slope').value ;
    textArray[9]    = document.getElementById('fy').value ;
    textArray[10]    = document.getElementById('reqdv').value ;
    textArray[11]    = document.getElementById('l1').value ;
    textArray[12]    = document.getElementById('h').value ;

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
	    document.getElementById('Memb').selectedIndex = textArray[2]    ;
	    document.getElementById('wroof').value = Number(textArray[3]).toFixed(3)    ;
	    document.getElementById('wother').value = Number( textArray[4] ).toFixed(3)    ;
	    document.getElementById('wlive').value = Number(textArray[5]).toFixed(3)    ;
	    document.getElementById('area').value = Number(textArray[6]).toFixed(3)    ;
	    document.getElementById('span').value = Number(textArray[7]).toFixed(3)    ;
	    document.getElementById('slope').value = Number(textArray[8]).toFixed(2)    ;
	    document.getElementById('fy').value = textArray[9]   ;
	    document.getElementById('reqdv').value = textArray[10]   ;
	    document.getElementById('l1').value = Number(textArray[11]).toFixed(3)   ;
	    document.getElementById('h').value = Number(textArray[12]).toFixed(3)   ;

	    OnButtonClick();

	}
    },false);

}

////////////////////////////////////////////////////////////////////////


function OnButtonClick(){

    // input
    // ------------------------------------------------------------

    var IndMemb   = document.getElementById('Memb').selectedIndex ;
    var Memb      = document.getElementById('Memb').value ;
    var wroof     = Number( document.getElementById('wroof').value );
    var wother    = Number( document.getElementById('wother').value );
    var wlive     = Number( document.getElementById('wlive').value );
    var area      = Number( document.getElementById('area').value );
    var span      = Number( document.getElementById('span').value );
    var slope     = Number( document.getElementById('slope').value );
    var fy        = Number( document.getElementById('fy').value );
    var reqdv     = Number( document.getElementById('reqdv').value );

    var l1        = Number( document.getElementById('l1').value );
    var h         = Number( document.getElementById('h').value );
    //var IndMethod = document.getElementById('method').selectedIndex ;

    var wsteel    = CSec(Memb)[5]/area*9.8/1000*1.2;
    document.getElementById('wsteel').innerHTML = wsteel.toFixed(3);

    // Preparation

    var wd = wroof + wsteel + wother;
    var wl = wd + wlive;

    var wwl = area * wl;

    var costh = 1.0/( Math.sqrt(1+Math.pow(slope,2)) );
    var sinth = Math.sqrt( 1.0 - Math.pow(costh,2) );

    var wwlx = wwl * costh;
    var wwly = wwl * sinth;

    // For Knee Brace
    var l2 = (span-2*l1)/2.0;
    var x  = Math.sqrt( l1*l1 + h*h );
    var k  = l1/(2.0*l2);

    var mc = 3.0*wwlx*( Math.pow(l2,2)/3 - Math.pow(l1,2)/8 )/ ( 3+2*k) + wwlx*Math.pow(l1,2)/8.0;
    var m0 = wwlx*Math.pow(l2,2)/2 - mc;
    var ra = mc/l1 - wwlx*l1/2.0;
    var re = wwlx*span/2.0;
    var hh = (mc+wwlx*l1*l2+wwlx*Math.pow(l1,2)/2.0)/h;
    var nn = hh*x/l1;
    var dc = 5.0 * wwlx * (2*l2) * Math.pow(2*l2*100,3) / ( 384.0 * 20500 * CSec(Memb)[6] );
    dc = dc - mc * 100 * Math.pow(2*l2*100,2)/ ( 8.0 * 20500 * CSec(Memb)[6] );

    // For Stress
    //var mdx = wwlx * Math.pow(span,2) / 8.0;
    var mdx = m0;
    var mdy = wwly * Math.pow(span,2) / 8.0;
    var mdyN = wwly*span/2.0 * l1 - wwly*l1*l1/2;
    var vv  = wwl * span / 2.0;

    // pfy: Permissible Tensile Strength
    var pfy = 0.6*fy;

    var sigxN = mc*1000/CSec(Memb)[10];
    var sigx = mdx*1000/CSec(Memb)[10];
    var sigy = mdy*1000/CSec(Memb)[11];
    var sigyN = mdyN*1000/CSec(Memb)[11];

    var sig  = sigx + sigy;
    var sigN  = sigxN + sigyN;

    var demx = sigx/pfy;
    var demxN = sigxN/pfy;
    var demy = sigy/pfy;
    var demyN = sigyN/pfy;
    var dem  = demx + demy;
    var demN  = demxN + demyN;

    //var dvx  = 5.0 * wwlx * span * Math.pow(span*100,3) / ( 384.0 * 20500 * CSec(Memb)[6] );
    var dvx  = dc;
    var dvy  = 5.0 * wwly * span * Math.pow(span*100,3) / ( 384.0 * 20500 * CSec(Memb)[7] );
    var dv   = Math.sqrt( Math.pow(dvx,2) + Math.pow(dvy,2) );

    // Output
    // ------------------------------------------------------------

    var result = "";

    // ------------------------------------------------------------
    result += "<p>";
    result += "<h4>- Loading</h4>";
    result += "</p>";

    // ------------------------------------------------------------
    result += '<table>';
    result += '<tbody>';

    result += '<tr><td>';
    result += " Dead Load = ";
    result += '</td><td>';
    result += wd.toFixed(3);
    result += " kN/m<sup>2</sup> ";
    result += '</td></tr>';

    result += '<tr><td>';
    result += " Live Load = ";
    result += '</td><td>';
    result += wlive.toFixed(3);
    result += " kN/m<sup>2</sup> ";
    result += '</td></tr>';

    result += '<tr><td>';
    result += " Total Load = ";
    result += '</td><td>';
    result += wl.toFixed(3);
    result += " kN/m<sup>2</sup> ";
    result += '</td></tr>';

    result += '<tr><td>';
    result += " -> &omega; = ";
    result += '</td><td>';
    result +=  wl.toFixed(3);
    result += 'kN/m<sup>2</sup> x';
    result +=  area.toFixed(3);
    result += 'm = ';
    result +=  wwl.toFixed(3);
    result += '</td><td>';
    result += " kN/m";
    result += '</td></tr>';

    result += '</tbody>';
    result += '</table>';

    // ------------------------------------------------------------
    result += "<p>";
    result += "<h4>- Stress</h4>";
    result += "</p>";

    // ------------------------------------------------------------
    result += '<table>';
    result += '<tbody>';

    result += '<tr><td>';
    result += " l<sub>2</sub> = ";
    result += '</td><td>';
    result += l2.toFixed(2);
    result += "m, k=";
    result += '</td><td>';
    result += k.toFixed(2);
    result += " -";
    result += '</td></tr>';

    result += '<tr><td>';
    result += " M<sub>x</sub> = ";
    result += '</td><td>';
    result += mdx.toFixed(2);
    result += " kN.m, ";
    result += '</td><td>';
    result += " M<sub>x,Negative</sub> = ";
    result += '</td><td>';
    result += mc.toFixed(2);
    result += " kN.m";
    result += '</td></tr>';

    result += '<tr><td>';
    result += " M<sub>y</sub> = ";
    result += '</td><td>';
    result += mdy.toFixed(2);
    result += " kN.m, ";
    result += '</td><td>';
    result += " M<sub>y,Negative</sub> = ";
    result += '</td><td>';
    result += mdyN.toFixed(2);
    result += " kN.m";
    result += '</td></tr>';

    result += '<tr><td>';
    result += " V = ";
    result += '</td><td>';
    result += vv.toFixed(2);
    result += " kN";
    result += '</td></tr>';

    result += '</tbody>';
    result += '</table>';

    // ------------------------------------------------------------
    result += "<p>";
    result += "<h4>- Section Check</h4>";
    result += "</p>";

    // ------------------------------------------------------------
    result += "<div class=\"box3\">";

    result += "<p>";
    result += "<h3>-- Member </h3>";
    result += "</p>";
    // ------------------------------------------------------------

    result += '<table>';
    result += '<tbody>';

    //
    result += '<tr><td>';

    result += " A = ";
    result += '</td><td>';
    result += (CSec(Memb)[4]).toFixed(2);
    result += " cm<sup>2</sup>, ";

    result += '</td><td>';

    result += " I<sub>x</sub> = ";
    result += '</td><td>';
    result += (CSec(Memb)[6]).toFixed(2);
    result += " cm<sup>4</sup>";

    result += '</td><td>';

    result += " I<sub>y</sub> = ";
    result += '</td><td>';
    result += (CSec(Memb)[7]).toFixed(2);
    result += " cm<sup>4</sup>";

    result += '</td></tr>';

    //
    result += '<tr><td>';

    result += '</td><td>';
    result += '</td><td>';

    result += " S<sub>x</sub> = ";
    result += '</td><td>';
    result += (CSec(Memb)[10]).toFixed(2);
    result += " cm<sup>3</sup>";

    result += '</td><td>';

    result += " S<sub>y</sub> = ";
    result += '</td><td>';
    result += (CSec(Memb)[11]).toFixed(2);
    result += " cm<sup>3</sup>";

    //
    result += '<tr><td>';

    result += '</td><td>';
    result += '</td><td>';

    result += " f<sub>y</sub> = ";
    result += '</td><td>';
    result += fy.toFixed(0);
    result += " N/mm<sup>2</sup>";

    result += '</td><td>';

    result += " f<sub>y</sub>' = ";
    result += '</td><td>';
    result += (0.6*fy).toFixed(0);
    result += " N/mm<sup>2</sup>";

    result += '</td></tr>';

    result += '</tbody>';
    result += '</table>';

    //
    result += '</div>';
    result += "<div class=\"box3\">";
    //
    // ------------------------------------------------------------
    result += "<p>";
    result += "<h3>-- Design Stress and Section Check </h3>";
    result += "</p>";
    // ------------------------------------------------------------

    result += '<table>';
    result += '<tbody>';

    //
    result += '<tr><td>';

    result += " &sigma; = &sigma;<sub>x</sub> + &sigma;<sub>y</sub> = ";
    result += '</td><td>';
    result += sigx.toFixed(0);
    result += ' + ';
    result += sigy.toFixed(0);
    result += ' = ';
    result += sig.toFixed(0);
    result += ' N/mm<sup>2</sup> ';

    result += '</td></tr>';
    result += '<tr><td>';

    result += " &sigma;/f<sub>y</sub> = ";
    result += '</td><td>';
    result += demx.toFixed(2);
    result += ' + ';
    result += demy.toFixed(2);
    result += ' = ';
    result += dem.toFixed(2);

    result += '</td></tr>';
    result += '</tbody>';
    result += '</table>';

    result += '<p Align="right" style="color:red;">';
    if( dem <= 1.0 ) {
	result += '------ OK';
    }
    else{
	result += '------ NG!!!!';
    }
    result += '</p>';

    //
    result += '<table>';
    result += '<tbody>';

    //
    result += '<tr><td>';

    result += " &sigma; = &sigma;<sub>x</sub> + &sigma;<sub>y</sub> = ";
    result += '</td><td>';
    result += sigxN.toFixed(0);
    result += ' + ';
    result += sigyN.toFixed(0);
    result += ' = ';
    result += sigN.toFixed(0);
    result += ' N/mm<sup>2</sup> ';

    result += '</td></tr>';
    result += '<tr><td>';

    result += " &sigma;/f<sub>y</sub> = ";
    result += '</td><td>';
    result += demxN.toFixed(2);
    result += ' + ';
    result += demyN.toFixed(2);
    result += ' = ';
    result += demN.toFixed(2);

    result += '</td></tr>';
    result += '</tbody>';
    result += '</table>';

    result += '<p Align="right" style="color:red;">';
    if( demN <= 1.0 ) {
	result += '------ OK';
    }
    else{
	result += '------ NG!!!!';
    }
    result += '</p>';

    //
    result += '<table>';
    result += '<tbody>';
    result += '<tr><td>';

    result += " &delta; = ( &delta;<sub>x</sub><sup>2</sup> + &delta;<sub>y</sub><sup>2</sup> )<sup>0.5</sup> = ";
    result += '</td><td>';
    result += ' (';
    result += dvx.toFixed(2);
    result += '<sup>2</sup> + ';
    result += dvy.toFixed(2);
    result += '<sup>2</sup> )<sup>0.5</sup> = ';
    result += dv.toFixed(2);
    result += 'cm';


    result += '</td><td>';
    result += '= L/';
    result += (span*100/dv).toFixed(0);

    result += '</td></tr>';
    result += '</tbody>';
    result += '</table>';

    result += '<p Align="right" style="color:red;">';
    if( (span*100/dv) > reqdv ) {
	result += '------ OK';
    }
    else{
	result += '------ NG!!!!';
    }
    result += '</p>';

    result += '</div>';

    // ------------------------------------------------------------
    result += "<p>";
    result += "<h4>- To Fly Brace </h4>";
    result += "</p>";
    // ------------------------------------------------------------

    result += '<table>';
    result += '<tbody>';

    //
    result += '<tr><td>';

    result += " R<sub>A</sub> = R<sub>B</sub> = ";
    result += '</td><td>';
    result += ra.toFixed(2);
    result += " kN";

    result += '</td><td>';

    result += " R<sub>E</sub> = R<sub>F</sub> = ";
    result += '</td><td>';
    result += re.toFixed(2);
    result += " kN";

    result += '</td></tr>';

    //
    result += '<tr><td>';

    result += " H = ";
    result += '</td><td>';
    result += hh.toFixed(2);
    result += " kN,&nbsp;&nbsp;";

    result += '</td><td>';

    result += " N = ";
    result += '</td><td>';
    result += nn.toFixed(2);
    result += " kN";

    //
    result += '</td></tr>';

    result += '</tbody>';
    result += '</table>';


    // ------------------------------------------------------------------------

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

////////////////////////////////////////////////////////////////////////
// C-Channel Property Function

function CSec(name){

    // Dia,Thickness,Area,Inertia,Radius,300*i
    //Member, , A, B, B1, t, A, W, Ix, Iy, ix, iy, Zx, Zy
    //-, , , mm, mm, mm, mm, cm2, kg/m, cm4, cm4, cm, cm, cm3, cm3

    switch (name){
    case "C-100x50x20x2.3":
	return Array(100, 50, 20, 2.3, 5.172, 4.06, 80.7, 19, 3.95, 1.92, 16.1, 6.06);
	break;
    case "C-125x50x20x2.3":
	return Array(125, 50, 20, 2.3, 5.747, 4.51, 137, 20.6, 4.88, 1.89, 21.9, 6.22);
	break;
    case "C-150x50x20x2.3":
	return Array(150, 50, 20, 2.3, 6.322, 4.96, 210, 21.9, 5.77, 1.86, 28, 6.33);
	break;
    case "C-125x50x20x3.2":
	return Array(125, 50, 20, 3.2, 7.807, 6.13, 181, 26.6, 4.82, 1.85, 29, 8.02);
	break;
    case "C-150x50x20x3.2":
	return Array(150, 50, 20, 3.2, 8.607, 6.76, 280, 28.3, 5.71, 1.81, 37.4, 8.19);
	break;
    case "C-150x75x20x3.2":
	return Array(150, 75, 20, 3.2, 10.21, 8.01, 366, 76.4, 5.99, 2.74, 48.9, 15.3);
	break;
    case "C-200x75x20x3.2":
	return Array(200, 75, 20, 3.2, 11.81, 9.27, 716, 84.1, 7.79, 2.67, 71.6, 15.8);
	break;
    case "C-200x75x25x3.2":
	return Array(200, 75, 25, 3.2, 12.13, 9.52, 736, 92.3, 7.7, 2.76, 73.6, 17.8);
	break;
    case "C-200x75x25x4.5":
	return Array(200, 75, 25, 4.5, 16.67, 13.1, 990, 121, 7.61, 2.69, 99, 23.3);
	break;
    case "2C-200x75x25x3.2":
	return Array(200, 75, 25, 3.2, 24.26, 19.04, 1472, 184.6, 15.4, 5.52, 147.2, 35.6);
	break;
    default:
	return Array(9999,9999,9999,9999,9999,9999,9999,9999,9999,9999,9999,9999);
    }
}
