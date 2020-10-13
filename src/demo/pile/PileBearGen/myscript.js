window.onload = function (){

    document.getElementById('job').value = 'New Project';

    var Dia = 400;
    var SFtip = 1.75;
    var SFfric = 1.75;
    var LayerNum = 1;
    var IdpileType = 0;
    //
    var TipSand =  1;
    var TipClay =  0;
    var FricSand = 1;
    var FricClay = 1;
    //
    //
    document.getElementById('Dia').value = Dia;
    document.getElementById('type').selectedIndex = IdpileType;
    document.getElementById('SFtip').value = SFtip;
    document.getElementById('TipSand').selectedIndex = TipSand ;
    document.getElementById('TipClay').selectedIndex = TipClay ;
    document.getElementById('FricSand').selectedIndex = FricSand ;
    document.getElementById('FricClay').selectedIndex = FricClay ;
    //
    document.getElementById('SFfric').value = SFfric;
    document.getElementById('LayerNum').value = LayerNum;
    //
    //
    var TipLimitSand = 18000;
    var TipLimitClay = 10000;
    var FricLimitSand = 100;
    var FricLimitClay = 100;
    //
    document.getElementById('TipLimitSand').value = TipLimitSand;
    document.getElementById('TipLimitClay').value = TipLimitClay;
    document.getElementById('FricLimitSand').value = FricLimitSand;
    document.getElementById('FricLimitClay').value = FricLimitClay;
    //
    paraAdd(1);
}

////////////////////////////////////////////////////////////////////////

var downloadAsFile = function(fileName, content) {

    var textArray = [];

    var npara = 11;
    textArray[0]    = document.title;
    textArray[1]    = document.getElementById('job').value;
    textArray[2]     = document.getElementById('Dia').value ;
    textArray[3]     = document.getElementById('type').selectedIndex ;
    textArray[4]     = document.getElementById('SFtip').value ;
    textArray[5]     = document.getElementById('TipSand').selectedIndex ;
    textArray[6]     = document.getElementById('TipClay').selectedIndex ;
    textArray[7]     = document.getElementById('FricSand').selectedIndex ;
    textArray[8]     = document.getElementById('FricClay').selectedIndex ;
    textArray[9]     = document.getElementById('SFfric').value ;
    textArray[10]    = document.getElementById('LayerNum').value ;
    //
    textArray[11]    = document.getElementById('TipLimitSand').value ;
    textArray[12]    = document.getElementById('TipLimitClay').value ;
    textArray[13]    = document.getElementById('FricLimitSand').value ;
    textArray[14]    = document.getElementById('FricLimitClay').value ;
    //
    var num = textArray[10];
    for(i=1;i<=num;i++){
	textArray[15+ 6*(i-1)] = Number(document.getElementById('Nf'+i).value);
	textArray[16+ 6*(i-1)] = document.getElementById('Prop'+i).selectedIndex;
	textArray[17+ 6*(i-1)] = Number(document.getElementById('g'+i).value);
	textArray[18+6*(i-1)] = Number(document.getElementById('Level'+i).value);
	textArray[19+6*(i-1)] = Number(document.getElementById('LevelTo'+i).value);
	textArray[20+6*(i-1)] = document.getElementById('Fric'+i).selectedIndex;
    }
    npara = 20 + 6*(num-1);

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
	    document.getElementById('Dia').value  = textArray[2]     ;
	    document.getElementById('type').selectedIndex  = textArray[3]     ;
	    document.getElementById('SFtip').value  = textArray[4]     ;
	    document.getElementById('TipSand').selectedIndex  = textArray[5]     ;
	    document.getElementById('TipClay').selectedIndex  = textArray[6]     ;
	    document.getElementById('FricSand').selectedIndex  = textArray[7]     ;
	    document.getElementById('FricClay').selectedIndex  = textArray[8]     ;
	    document.getElementById('SFfric').value  = textArray[9]     ;
	    //    document.getElementById('LayerNum').value  = textArray[10]    ;
	    document.getElementById('TipLimitSand').value = textArray[11]    ;
	    document.getElementById('TipLimitClay').value = textArray[12]    ;
	    document.getElementById('FricLimitSand').value = textArray[13]    ;
	    document.getElementById('FricLimitClay').value = textArray[14]    ;
	    //
	    var num = textArray[10];
	    var i;
	    for(i=1;i<=num;i++){
		if(i>1){
		    addLoad();
		}
		document.getElementById('Nf'+i).value           = textArray[15+ 6*(i-1)] ;
		document.getElementById('Prop'+i).selectedIndex = textArray[16+ 6*(i-1)] ;
		document.getElementById('g'+i).value            = textArray[17+ 6*(i-1)] ;
		document.getElementById('Level'+i).value        = Number(textArray[18+6*(i-1)]).toFixed(2) ;
		document.getElementById('LevelTo'+i).value      = Number(textArray[19+6*(i-1)]).toFixed(2) ;
		document.getElementById('Fric'+i).selectedIndex = textArray[20+6*(i-1)] ;
	    }
	    npara = 20 + 6*(num-1);

	    OnButtonClick();

	}
    },false);

}

////////////////////////////////////////////////////////////////////////

function OnButtonClick(){

    // input
    // ------------------------------------------------------------------------
    var dia = Number( document.getElementById('Dia').value );
    //
    var IdpileType = document.getElementById('type').selectedIndex;
    var TipSand = document.getElementById('TipSand').selectedIndex;
    var TipClay = document.getElementById('TipClay').selectedIndex;
    var FricSand = document.getElementById('FricSand').selectedIndex;
    var FricClay = document.getElementById('FricClay').selectedIndex;
    //
    var SFtip = Number( document.getElementById('SFtip').value );
    var SFfric = Number( document.getElementById('SFfric').value );
    var NumLayer = document.getElementById('LayerNum').value;
    //
    var TipLimitSand  = Number( document.getElementById('TipLimitSand').value );
    var TipLimitClay  = Number( document.getElementById('TipLimitClay').value );
    var FricLimitSand = Number( document.getElementById('FricLimitSand').value );
    var FricLimitClay = Number( document.getElementById('FricLimitClay').value );
    //
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
	gamma[i] = Number(document.getElementById('g'+i).value);
	Level[i] = Number(document.getElementById('Level'+i).value);
	LevelTo[i] = Number(document.getElementById('LevelTo'+i).value);
	Lf[i] = LevelTo[i]-Level[i];
	IdFric[i] = document.getElementById('Fric'+i).selectedIndex;
    }
    //
    var ap;
    var p;
    if( IdpileType == 0 ){ //SQ.
	ap = Math.pow(dia/1000,2);
	p = 4.0*dia/1000;
    }
    else{ //Round
	ap = 3.141592*Math.pow(dia/2000,2);
	p  = 3.141592*dia/1000;
    }
    // calculation
    // ------------------------------------------------------------------------
    var wp;
    //
    // For Frcition
    var phiF; // Friction angle for Sand
    var cc;   // Cohesion for Clay
    var k;
    var fr=0;
    var al;
    //
    var LfCon = 0.0;
    var frSum = 0.0;
    var L     = 0.0;
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
		if( FricSand == 0){
		    fr = k*qq*Math.tan(3.0/4.0*phiF *(2*3.141592/360) )*Lf[i];
		}else if( FricSand ==1 ){
		    fr = 2.0*Nf[i]*Lf[i];
		}else{
		    fr = 10/3*Nf[i]*Lf[i];
		}
		if( fr/Lf[i] > FricLimitSand){
		    fr = FricLimitSand*Lf[i];
		}
		middle += '&phi;=';
		middle += phiF.toFixed(1);
		middle += '&nbsp;';
		//
		//document.getElementById('Para'+i).innerHTML = middle;
	    }else{
		//Clay
		cc   = 6.25*Nf[i];
		if( cc>100){
		    cc = 100;
		}
		//
		al   = Number(alp(cc/9.8));
		//
		if( FricClay == 0 ){
		    fr = al*cc*Lf[i];
		}else{
		    fr = cc*Lf[i];
		}
		if( fr/Lf[i] > FricLimitClay){
		    fr = FricLimitClay*Lf[i];
		}
		//
		middle += 'C=';
		middle += cc.toFixed(1);
		if( FricClay == 0 ){
		    middle += '&nbsp;';
		    middle += '(';
		    middle += al.toFixed(2);
		    middle += ')&nbsp;';
		}
		//
	    }
	    frSum = frSum + fr;
	    LfCon = LfCon + Lf[i];
	    L     = L + Lf[i];
	}
	else{
	    middle='';
	}

	//
	// Total Bearing
	// For Tips
	var que;
	var Qe;
	var Qu;
	var Qf;
	var Qa;


	if(i < NumLayer ){
	    if( PropId[i+1] == 0){
		if( TipSand == 0){
		    if( Nf[i+1] >15){
			que = 240*( 15 + 0.5*(Nf[i+1]-15));
		    }else{
			que = 240*Nf[i+1];
		    }
		}
		else{
		    que = 300*Nf[i+1];
		}
		if( que > TipLimitSand ){
		    que = TipLimitSand;
		}
	    }
	    else{
		if( TipClay == 0){
		    que = 9.0*6.25*Nf[i+1];
		}
		else if( TipClay == 1 ){
		    que = 6.0*6.25*Nf[i+1];
		}
		else{
		    que = 240*( 15 + 0.5*(Nf[i+1]-15));
		}
		if( que > TipLimitClay ){
		    que = TipLimitClay;
		}
	    }
	    //
	    Qe = que*ap;
	    //
	    wp = ap*L*25;
	    Qe = que*ap;
	    Qf = frSum*p;
	    Qu = Qe + Qf - wp;
	    Qa = Qe/SFtip + Qf/SFfric - wp;
	    //
	    var middle2 = '';
	    document.getElementById('Qe'+i).innerHTML = Qe.toFixed(0);
	    document.getElementById('Qf'+i).innerHTML = Qf.toFixed(0);
	    document.getElementById('Qu'+i).innerHTML = Qu.toFixed(0);
	    document.getElementById('Qa'+i).innerHTML = Qa.toFixed(0);
	}
	//
	document.getElementById('fr'+i).innerHTML = (fr/Lf[i]).toFixed(1) + ',' + que.toFixed(0) +'&nbsp;';
	document.getElementById('Para'+i).innerHTML = middle;
	//
    }
    //
    fr = frSum/LfCon;
    //
    // output
    // ------------------------------------------------------------------------
    var result = "";
    result += '<p><h4> - Bearing Capacity </h4></p>';

    result += '<table>';
    result += '<tbody>';

    result += '<tr><td>';
    result += 'A<sub>p</sub> =';
    result += '</td><td>';
    result += ap.toFixed(2);
    result += '</td><td>';
    result += 'm<sup>2</sup>, &nbsp;&nbsp;';
    result += '</td><td>';
    result += '&phi; = ';
    result += '</td><td>';
    result += p.toFixed(2);
    result += '</td><td>';
    result += 'm, &nbsp;&nbsp;';
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
    result += '<td id="fr'+i+'"></td>';
    result += '<td id="Qe'+i+'"></td>';
    result += '<td id="Qf'+i+'"></td>';
    result += '<td id="Qu'+i+'"></td>';
    result += '<td id="Qa'+i+'"></td>';

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
