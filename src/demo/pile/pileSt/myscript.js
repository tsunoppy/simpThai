window.onload = function (){

    document.getElementById('job').value = 'New Project';

    var fc = 36;
    var bb = 250;
//    var fy = 400;
    var an = 15;
    var sti = 0;
    var idShape = 1;
    var phi = 1.0;
    var idBoun = 0;

    document.getElementById('fc').value = fc;
    document.getElementById('bb').value = bb;
    document.getElementById('bbInt').value = 0;
    //document.getElementById('fy').value = fy;
    document.getElementById('Bound').selectedIndex = idBoun;
    document.getElementById('n').value = an;
    document.SoilForm.SoilName.selectedIndex = sti;
    document.TypeForm.TypeName.selectedIndex = idShape;
    document.getElementById('phi').value = phi.toFixed(2);

}

////////////////////////////////////////////////////////////////////////

var downloadAsFile = function(fileName, content) {

    var textArray = [];

    var npara = 9;
    textArray[0]    = document.title;
    textArray[1]    = document.getElementById('job').value;
    textArray[2]    = document.getElementById('fc').value ;
    textArray[3]    = document.getElementById('bb').value ;
    //textArray[4]    = document.getElementById('fy').value ;
    textArray[4]    = document.getElementById('Bound').selectedIndex ;
    textArray[5]    = document.getElementById('n').value ;
    textArray[6]    = document.SoilForm.SoilName.selectedIndex ;
    textArray[7]    = document.TypeForm.TypeName.selectedIndex ;
    textArray[8]    = document.getElementById('phi').value;
    textArray[9]    = document.getElementById('bbInt').value ;

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

	    document.getElementById('fc').value = textArray[2]    ;
	    document.getElementById('bb').value = textArray[3]    ;
	    //document.getElementById('fy').value = textArray[4]    ;
	    document.getElementById('Bound').selectedIndex = textArray[4]    ;
	    document.getElementById('n').value = textArray[5]    ;
	    document.SoilForm.SoilName.selectedIndex = textArray[6]    ;
	    document.TypeForm.TypeName.selectedIndex = textArray[7]    ;
	    document.getElementById('phi').value = textArray[8]    ;
	    document.getElementById('bbInt').value = textArray[9]    ;

	    OnButtonClick();

	}
    },false);

}

////////////////////////////////////////////////////////////////////////

function OnButtonClick(){

    // input
    // ------------------------------------------------------------

    var fc = Number(document.getElementById('fc').value);
    var bb = Number(document.getElementById('bb').value);
    var bbInt = Number(document.getElementById('bbInt').value);
    var an = Number(document.getElementById('n').value);
    var dia = Number(document.SoilForm.SoilName.value);
    var idShape = document.TypeForm.TypeName.selectedIndex;
    var phi = Number(document.getElementById('phi').value);


    //    var fy = Number(document.getElementById('fy').value);
    var idBound = document.getElementById('Bound').selectedIndex ;

    var ac = bb*bb;
    var iner;
    if( idShape == 0 ){
	iner = (bb/1000)*Math.pow(bb/1000,3)/12 - (bbInt/1000)*Math.pow(bbInt/1000,3)/12;
    } else {
	iner = Math.PI*Math.pow(bb/1000,4)/64 - Math.PI*Math.pow(bbInt/1000,4)/64;
    }
    iner = phi*iner;

    var e = 4700*Math.sqrt(fc);

    var e0 = 700*an;
    var kh = dia*e0*Math.pow(bb/10,-0.75);
    var beta = Math.pow(kh*(bb/1000)/(4.0*e*1000*iner),0.25);

    // Stress
    var hh = 1.0;

    var mtop,mmax,Lm,y0,L0;
    var limitLength = 2.25/beta;
    if( idBound == 0 ) {
	mtop = hh/(2*beta);
	mmax = -0.104*hh/beta;
	Lm = 1.571/beta;
	y0 = hh*beta/(kh*(bb/1000));
	L0 = 2.356/beta;
    } else {
	mtop = 0.0;
	mmax = -0.3324*hh/beta;
	Lm = 0.785/beta;
	y0 = 2.0*hh*beta/(kh*(bb/1000));
	L0 = 1.571/beta;
    }

    var result = "";
    result += '<p><h4> - Design Parameter </h4></p>';

    result += '<p>';
    result += '&nbsp;&nbsp;';
    result += 'Modulus of Concrete, E<sub>0</sub> = 4700 &radic;f<sub>c</sub> = ';
    result += e.toFixed(0);
    result += "N/mm<sup>2</sup> =";
    result += (e*1000).toFixed(0);
    result += "kN/m<sup>2</sup>";
    result += '</p>';

    result += '<p>';
    result += '&nbsp;&nbsp;';
    result += 'Inersia of Pile, &phi; x I = ';
    result += iner.toFixed(6);
    result += "m<sup>4</sup>";
    result += '</p>';

    result += '<p>';
    result += '&nbsp;&nbsp;';
    result += 'Modulus of Soil Reaction, E<sub>0</sub> = 700 N = ';
    result += " 700 x " + an.toFixed(0) + " = ";
    result += e0.toFixed(0);
    result += "kN/m<sup>2</sup>";
    result += '</p>';

    result += '<p>';
    result += '&nbsp;&nbsp;';
    result += 'Lateral Soil Reaction, k<sub>h</sub> =' + dia.toFixed(0) + ' x E<sub>0</sub> x B <sup>-3/4</sup> = ';
    result += kh.toFixed(0);
    result += "kN/m<sup>3</sup>";
    result += '</p>';

    result += '<p>';
    result += '&nbsp;&nbsp;';
    result += '&beta; =  ( k<sub>h</sub> B  / 4 E I ) <sup>1/4</sup> = ';
    result += beta.toFixed(3);
    result += '</p>';

    ////////////////////////////////////////////////////////////////////////
    result += '<p><h4> - Stress to pile due to V= 1.0 kN</h4></p>';
    result += '<p>';
    result += '<table>';
    result += '<tr><td>';
    //

    result += 'Moment to pile top,';
    result += '</td><td>';

    result += 'M<sub>top</sub> =';
    result += mtop.toFixed(2);
    result += 'kN.m';

    //
    result += '</td></tr>';
    result += '<tr><td>';
    //

    result += 'Maximum Moment to middle depth,';
    result += '</td><td>';

    result += 'M<sub>max</sub> = ';
    result += mmax.toFixed(2);
    result += 'kN.m';
    result += ' at,';
    result += Lm.toFixed(2);
    result += 'm';

    //
    result += '</td></tr>';
    result += '<tr><td>';
    //

    result += 'Lateral deflection at top pile,';
    result += '</td><td>';
    result += 'y<sub>0</sub> = ';
    result += (y0*100).toFixed(6);
    result += 'cm';

    //
    result += '</td></tr>';
    result += '<tr><td>';
    //

    result += 'Neutral Depth,';
    result += '</td><td>';
    result += 'L<sub>0</sub> = ';
    result += L0.toFixed(2);
    result += 'm';

    //
    result += '</td></tr>';
    result += '<tr><td>';
    //

    result += 'Lateral Stiffness,';
    result += '</td><td>';
    result += 'K = ';
    result += (1/(y0*100)).toFixed(2);
    result += 'kN/cm';

    //
    result += '</td></tr>';
    result += '</table>';
    result += '</p>';

    ////////////////////////////////////////////////////////////////////////
    result += '<p><h4> - Limitation to apply formular </h4></p>';
    //
    result += '<p>';
    result += '<table>';
    result += '<tr><td>';
    //

    result += 'Length of pile more than';
    result += '</td><td>';

    result += 'L<sub>min</sub> =';
    result += limitLength.toFixed(2);
    result += 'm';
    //
    result += '</td></tr>';
    result += '</table>';
    result += '</p>';
    //
    ////////////////////////////////////////////////////////////////////////
    document.getElementById('result').innerHTML = result;

    var fig = '';
    if( idBound == 0 ) {
	fig += '<p><img src="images/Fix.jpg" alt="Location" width="220px" /><br  /></p>';
    }
    if( idBound == 1 ) {
	fig += '<p><img src="images/Pin.jpg" alt="Location" width="220px" /><br  /></p>';
    }

    document.getElementById('figure').innerHTML = fig;

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
