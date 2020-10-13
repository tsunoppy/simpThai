window.onload = function (){

    document.getElementById('job').value = 'New Project';

    var L = 35.0;
    var Ntip = 15;
    var SFtip = 2.5;
    var SFfric = 2.5;
    var LayerNum = 1;
    //
    document.getElementById('L').value = L;
    document.getElementById('Ntip').value = Ntip;
    document.getElementById('SFtip').value = SFtip;
    document.getElementById('SFfric').value = SFfric;
    document.getElementById('LayerNum').value = LayerNum;
    //
    paraAdd(1);
}

////////////////////////////////////////////////////////////////////////

var downloadAsFile = function(fileName, content) {

    var textArray = [];

    var npara = 11;
    textArray[0]    = document.title;
    textArray[1]    = document.getElementById('job').value;
    textArray[2]    = document.getElementById('L').value ;
    textArray[3]    = document.getElementById('Ntip').value ;
    textArray[4]    = document.getElementById('SFtip').value ;
    textArray[5]    = document.getElementById('SFfric').value ;
    textArray[6]    = document.getElementById('LayerNum').value ;

    var num = textArray[6];
    for(i=1;i<=num;i++){
	textArray[7+ 6*(i-1)] = Number(document.getElementById('Nf'+i).value);
	textArray[8+ 6*(i-1)] = document.getElementById('Prop'+i).selectedIndex;
	textArray[9+ 6*(i-1)] = Number(document.getElementById('g'+i).value);
	textArray[10+6*(i-1)] = Number(document.getElementById('Level'+i).value);
	textArray[11+6*(i-1)] = Number(document.getElementById('LevelTo'+i).value);
	textArray[12+6*(i-1)] = document.getElementById('Fric'+i).selectedIndex;
    }
    npara = 12 + 6*(num-1);

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

	    var npara = 11;

	    document.title = textArray[0]    ;
	    document.getElementById('job').value = textArray[1]    ;
	    document.getElementById('L').value = textArray[2]    ;
	    document.getElementById('Ntip').value = textArray[3]    ;
	    document.getElementById('SFtip').value = textArray[4]    ;
	    document.getElementById('SFfric').value = textArray[5]    ;
	    //document.getElementById('LayerNum').value = textArray[6]    ;

	    var num = textArray[6];
	    var i;
	    for(i=1;i<=num;i++){
		if(i>1){
		    addLoad();
		}
		document.getElementById('Nf'+i).value           = textArray[7+ 6*(i-1)] ;
		document.getElementById('Prop'+i).selectedIndex = textArray[8+ 6*(i-1)] ;
		document.getElementById('g'+i).value            = textArray[9+ 6*(i-1)] ;
		document.getElementById('Level'+i).value        = Number(textArray[10+6*(i-1)]).toFixed(2) ;
		document.getElementById('LevelTo'+i).value      = Number(textArray[11+6*(i-1)]).toFixed(2) ;
		document.getElementById('Fric'+i).selectedIndex = textArray[12+6*(i-1)] ;
	    }
	    npara = 12 + 6*(num-1);

	    OnButtonClick();

	}
    },false);

}

////////////////////////////////////////////////////////////////////////

function OnButtonClick(){

    // input
    // ------------------------------------------------------------------------
    var L = Number( document.getElementById('L').value );
    //
    var Ntip = Number( document.getElementById('Ntip').value );
    var SFtip = Number( document.getElementById('SFtip').value );
    //
    var SFfric = Number( document.getElementById('SFfric').value );
    //
    var IdProTip = document.getElementById('PropTip').selectedIndex;
    //
    //
    var NumLayer = document.getElementById('LayerNum').value;
    var Nf = [];
    var PropId = [];
    var Lf = [];
    var gamma = [];
    var Level = [];
    var LevelTo = [];
    var IdFric = [];
    var i;
    //
    for( i = 1; i <= NumLayer; i++ ){
	Nf[i] = Number(document.getElementById('Nf'+i).value);
	PropId[i] = document.getElementById('Prop'+i).selectedIndex;
	//Lf[i] = Number(document.getElementById('Lf'+i).value);
	gamma[i] = Number(document.getElementById('g'+i).value);
	Level[i] = Number(document.getElementById('Level'+i).value);
	LevelTo[i] = Number(document.getElementById('LevelTo'+i).value);
	Lf[i] = LevelTo[i]-Level[i];
	IdFric[i] = document.getElementById('Fric'+i).selectedIndex;
    }
    //
    // calculation
    // ------------------------------------------------------------------------
    var ap;
    var p;
    var wp;
    //var qu = 12.5*Nc;
    //
    // For Tips
    var que;
    if( IdProTip == 0){
	que = 240*( 15 + 0.5*(Ntip-15));
    }
    else{
	que = 9.0*12.5*Ntip;
    }
    var Qe = que*ap;
    // For Frcition
    var phiF; // Friction angle for Sand
    var cc;   // Cohesion for Clay
    var k;
    var fr=0;
    var al;
    //
    var LfCon = 0.0;
    var frSum = 0.0;
    var middle ='';
    var zz = LevelTo[1]/2.0;
    var qq = gamma[1]*zz;;
    //
    for( i = 1; i <= NumLayer; i++ ){

	if(i>1){
	    zz = zz + Lf[i-1]/2 + Lf[i]/2;
	    qq = qq + (gamma[i-1]*Lf[i-1]+gamma[i]*Lf[i])/2;
	}

	document.getElementById('z'+i).innerHTML = zz.toFixed(2);
	document.getElementById('Lf'+i).innerHTML = Lf[i].toFixed(2);
	document.getElementById('Lf'+i).innerHTML += '&nbsp;';
	document.getElementById('q'+i).innerHTML = qq.toFixed(0);

	middle = '';

	if( IdFric[i] == 0){
	    if( PropId[i] == 0){
		// Sand
		phiF = 0.3 * Nf[i] + 27.0;
		//		k = 1.0 - Math.sin( phiF * (2*3.141592/360) );
		k = kh(Nf[i]);
		fr = k*qq*Math.tan(3.0/4.0*phiF *(2*3.141592/360) )*Lf[i];
		middle += '&phi;=';
		middle += phiF.toFixed(0);
		middle += 'deg.,&nbsp;';
		middle += '&nbsp;';
		middle += 'f<sub>r</sub>=';
		middle += (fr/Lf[i]).toFixed(1);
		middle += 'kN/m<sup>2</sup>';

		document.getElementById('Para'+i).innerHTML = middle;
	    }else{
		//Clay
		cc   = 6.25*Nf[i];
		al   = Number(alp(cc/9.8));
		fr = al*cc*Lf[i];
		middle += 'C=';
		middle += cc.toFixed(1);
		middle += 'kN/m<sup>2</sup>';
		middle += ',&nbsp;';
		middle += '&alpha;=';
		middle += al.toFixed(2);
		middle += '';
		middle += ',&nbsp;';
		middle += 'f<sub>r</sub>=';
		middle += (fr/Lf[i]).toFixed(1);
		middle += 'kN/m<sup>2';
		document.getElementById('Para'+i).innerHTML = middle;
	    }
	    frSum = frSum + fr;
	    LfCon = LfCon + Lf[i];
	}
	else{
	    document.getElementById('Para'+i).innerHTML = '';
	}

    }
    //
    fr = frSum/LfCon;
    //
    //
    // Total Bearing

    var Qu;
    var Qf;
    var Qa;
    var dia = [];
    var IdpileType = [];
    for( i = 1; i <= 10; i++ ){
	dia[i]        = document.getElementById('Dia'+i).value;
	IdpileType[i] = document.getElementById('type'+i).selectedIndex;
	if( IdpileType[i] == 0 ){ //SQ.
	    ap = Math.pow(dia[i]/1000,2);
	    p = 4.0*dia[i]/1000;
	}
	else{ //Round
	    ap = 3.141592*Math.pow(dia[i]/2000,2);
	    p  = 3.141592*dia[i]/1000;
	}
	wp = ap*L*24;
	Qe = que*ap;
	Qf = fr*LfCon*p;
	Qu = Qe + Qf - wp;
	Qa = Qe/SFtip + Qf/SFfric - wp;

	document.getElementById('Qe'+i).innerHTML = Qe.toFixed(0);
	document.getElementById('Qf'+i).innerHTML = Qf.toFixed(0);
	document.getElementById('Wp'+i).innerHTML = wp.toFixed(0);
	document.getElementById('Qu'+i).innerHTML = Qu.toFixed(0);
	document.getElementById('Qa'+i).innerHTML = Qa.toFixed(0);
	document.getElementById('Ratio'+i).innerHTML = (Qf/Qu*100).toFixed(0);
    }
    //
    // output
    // ------------------------------------------------------------------------
    var result = "";
    result += '<p><h4> - Bearing Capacity </h4></p>';

    result += '<table>';
    result += '<tbody>';

    result += '<tr><td>';
    result += 'qe =';
    result += '</td><td>';
    result += que.toFixed(0);
    result += '</td><td>';
    result += 'kN/m<sup>2</sup>, &nbsp;&nbsp;';
    result += '</td><td>';
    result += 'f<sub>r</sub> (Average) = ';
    result += '</td><td>';
    result += fr.toFixed(1);
    result += '</td><td>';
    result += 'kN/m<sup>2</sup>, &nbsp;&nbsp;';
    result += '</td><td>';
    result += 'Lf (Consdiered Length for Friction) = ';
    result += '</td><td>';
    result += LfCon.toFixed(2);
    result += '</td><td>';
    result += 'm';
    result += '</td></tr>';

    result += '</tbody>';
    result += '</table>';

    ////////////////////////////////////////////////////////////////////////
    document.getElementById('result').innerHTML = result;

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

//------------------------------------------------------------------------
// Load ADD & Remove
//------------------------------------------------------------------------
function addLoad(){

    var Num = Number(document.getElementById('LayerNum').value);
    var i = Num+1;
    document.getElementById('LayerNum').value = i;

    var result = '';

    //    result += '<div class="box6">';
    //    result += '<table>';
    //    result += '<tbody>';
    //    result += '<tr>';
    //    result += '<td>';

    result += '<td>';
    result += i+': &nbsp;';
    result += '</td>';
    result += '<td>';
    result += '<input type="text" id="Level'+i+'" >';
    result += '</td>';

    result += '<td>';
    result += '<input type="text" id="LevelTo'+i+'" >';
    result += '</td>';

    result +='<td>';
    result +='<input class="w20" type="text" id="Nf'+i+'" >';
    result +='</td>';
    result +='<td>';
    result +='<select id="Prop'+i+'">';
    result +='<option>Sand</option>';
    result +='<option>Clay</option>';
    result +='</select>';
    result +='</td>';

    result += '<td>';
    result += '<input class="w20" type="text" id="g'+i+'" >';
    result += '</td>';

    result += '<td>';
    result += '<select id="Fric'+i+'">';
    result += '<option>Include</option>';
    result += '<option>Ignore</option>';
    result += '</select>';
    result += '</td>';

    result += '<td id="z'+i+'"></td>';
    result += '<td id="Lf'+i+'"</td>';
    result += '<td id="q'+i+'"></td>';
    result += '<td id="Para'+i+'"></td>';

    document.getElementById(i).innerHTML = result;

    paraAdd(i);
}

function removeLoad(){

    var Num = Number(document.getElementById('LayerNum').value);
    var i = Num-1;
    document.getElementById('LayerNum').value = i;

    var result = '';
    document.getElementById(Num).innerHTML = result;
}


function alp(cc){
    //'reduction factor for driven pile
    //'c:cohesion(ton/m2)

    var c = [];
    var alpind = [];
    //'set parameter of friction angle
    c[0] = 0;
    c[1] = 0.000001;
    c[2] = 2.5;
    c[3] = 5;
    c[4] = 7.5;
    c[5] = 10;
    c[6] = 12.5;
    c[7] = 15;
    c[8] = 17.5;
    c[9] = 20;
    c[10] = 22.5;
    c[11] = 25;
    c[12] = 27.5;
    c[13] = 30;
    c[14] = 32.5;
    c[15] = 35;
    c[16] = 37.5;
    c[17] = 40;
    c[18] = 42.5;
    c[19] = 45;
    c[20] = 47.5;
    c[21] = 50;
    //'set parameter of nc
    alpind[0] = 1;
    alpind[1] = 0.99999999999;
    alpind[2] = 0.98;
    alpind[3] = 0.94;
    alpind[4] = 0.87;
    alpind[5] = 0.81;
    alpind[6] = 0.75;
    alpind[7] = 0.675;
    alpind[8] = 0.61;
    alpind[9] = 0.55;
    alpind[10] = 0.5;
    alpind[11] = 0.47;
    alpind[12] = 0.43;
    alpind[13] = 0.42;
    alpind[14] = 0.42;
    alpind[15] = 0.42;
    alpind[16] = 0.42;
    alpind[17] = 0.42;
    alpind[18] = 0.42;
    alpind[19] = 0.42;
    alpind[20] = 0.42;
    alpind[21] = 0.42;
    //'judge of nc

    var i;
    var aaa;
    for( i=1; i<=21; i++){
	if( cc > c[i] ){
            aaa = (alpind[i] - alpind[i-1]) /( c[i] - c[i-1] );
	    aaa = aaa * ( cc - c[i-1] ) + alpind[i-1];
//	    console.log(cc,aaa);
	}
    }
    return aaa;
    //'end compute
}

function paraAdd(i){
    //    document.getElementById('Lf'+i).value = 1.0.toFixed(1);

    var next,pTo,pFr;
    var j = i-1;

    if(i==1){
	document.getElementById('Nf'+i).value = 10.0;
	document.getElementById('Prop'+i).selectedIndex = 0;
	document.getElementById('g'+i).value = 8.0;
	document.getElementById('Fric'+i).selectedIndex = 0;
	document.getElementById('Level'+i).value = (0).toFixed(2);
	document.getElementById('LevelTo'+i).value = (2).toFixed(2);
    }else{
	document.getElementById('Nf'+i).value = document.getElementById('Nf'+j).value ;
	document.getElementById('Prop'+i).selectedIndex = document.getElementById('Prop'+j).selectedIndex ;
	document.getElementById('g'+i).value = document.getElementById('g'+j).value;
	document.getElementById('Fric'+i).selectedIndex = document.getElementById('Fric'+j).selectedIndex;
	document.getElementById('Level'+i).value = (Number(document.getElementById('LevelTo'+j).value)).toFixed(2);
	//
	next = Number(document.getElementById('Level'+i).value);
	pTo = Number(document.getElementById('LevelTo'+j).value);
	pFr = Number(document.getElementById('Level'+j).value);
	next = next + (pTo-pFr);
	document.getElementById('LevelTo'+i).value = next.toFixed(2);
    }


}

////////////////////////////////////////////////////////////////////////
function kh(nn)
{
    if( nn <= 80 ){return 1.2;}
    if( nn <= 50 ){return 1.1;}
    if( nn <= 30 ){return 0.9;}
    if( nn <= 10 ){return 0.7;}
    if( nn <= 5  ){return 0.56;}
}
