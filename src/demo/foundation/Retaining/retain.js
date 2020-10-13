// Window Load
window.onload = function (){

    /*
    var nux,mux;
    var nuy,muy;
    nux = 405.0;
    nuy = 405.0;
    mux = 150.0;
    muy = 200.0;
     */

    var  w = 5.0;
    var  ka = 0.5;

    var l1 = 500;
    var l2 = 2000;
    var h1 = 2500;
    var h2 = 1500;

    var t1 = 500;
    var t2 = 300;

    var d1 = 500;
    var d2 = 350;
    var d3 = 500;

    var fc = 21;
    var fy = 170;
    var gamma = 18;
    var cover = 80;

    var beaCap = 150;
    var mu = 0.4;

    document.getElementById('job').value = 'New Project';
    document.getElementById('w').value = w.toFixed(2);
    document.getElementById('ka').value = ka.toFixed(2);
    document.getElementById('l1').value = l1;
    document.getElementById('l2').value = l2;
    document.getElementById('h1').value = h1;
    document.getElementById('h2').value = h2;
    document.getElementById('t1').value = t1;
    document.getElementById('t2').value = t2;
    document.getElementById('d1').value = d1;
    document.getElementById('d2').value = d2;
    document.getElementById('d3').value = d3;
    document.getElementById('fc').value = fc;
    document.getElementById('fy').value = fy;
    document.getElementById('gamma').value = gamma;
    document.getElementById('cover').value = cover;
    //
    document.getElementById('numX').value = 100;
    document.getElementById('rebarX').selectedIndex = 1;
    document.getElementById('numY').value = 200;
    document.getElementById('rebarY').selectedIndex = 1;
    //
    document.getElementById('height').value = 2000;
    //
    document.getElementById('numF').value=200;
    document.getElementById('rebarF').selectedIndex=1;
    document.getElementById('numR').value=100;
    document.getElementById('rebarR').selectedIndex=1;
    //
    document.getElementById('beaCap').value = beaCap;
    document.getElementById('mu').value = mu.toFixed(2);
    //
    document.getElementById('view').selectedIndex = 1;
    //
    DrawSec();

};

////////////////////////////////////////////////////////////////////////

var downloadAsFile = function(fileName, content) {

    var textArray = [];

    var npara = 28;
    textArray[0]    = document.title;
    textArray[1]   = document.getElementById('job').value ;
    textArray[2]   = document.getElementById('w').value ;
    textArray[3]   = document.getElementById('ka').value ;
    textArray[4]   = document.getElementById('l1').value ;
    textArray[5]   = document.getElementById('l2').value ;
    textArray[6]   = document.getElementById('h1').value ;
    textArray[7]   = document.getElementById('h2').value ;
    textArray[8]   = document.getElementById('t1').value ;
    textArray[9]   = document.getElementById('t2').value ;
    textArray[10]   = document.getElementById('d1').value ;
    textArray[11]   = document.getElementById('d2').value ;
    textArray[12]   = document.getElementById('d3').value ;
    textArray[13]   = document.getElementById('fc').value ;
    textArray[14]   = document.getElementById('fy').value ;
    textArray[15]   = document.getElementById('gamma').value ;
    textArray[16]   = document.getElementById('cover').value ;
    textArray[17]   = document.getElementById('numX').value ;
    textArray[18]   = document.getElementById('rebarX').selectedIndex ;
    textArray[19]   = document.getElementById('numY').value ;
    textArray[20]   = document.getElementById('rebarY').selectedIndex ;
    textArray[21]   = document.getElementById('height').value ;
    textArray[22]   = document.getElementById('numF').value;
    textArray[23]   = document.getElementById('rebarF').selectedIndex;
    textArray[24]   = document.getElementById('numR').value;
    textArray[25]   = document.getElementById('rebarR').selectedIndex;
    textArray[26]   = document.getElementById('beaCap').value ;
    textArray[27]   = document.getElementById('mu').value ;
    textArray[28]   = document.getElementById('view').selectedIndex ;

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

	    document.getElementById('job').value = textArray[1]   ;
	    document.getElementById('w').value = textArray[2]   ;
	    document.getElementById('ka').value = textArray[3]   ;
	    document.getElementById('l1').value = textArray[4]   ;
	    document.getElementById('l2').value = textArray[5]   ;
	    document.getElementById('h1').value = textArray[6]   ;
	    document.getElementById('h2').value = textArray[7]   ;
	    document.getElementById('t1').value = textArray[8]   ;
	    document.getElementById('t2').value = textArray[9]   ;
	    document.getElementById('d1').value = textArray[10]   ;
	    document.getElementById('d2').value = textArray[11]   ;
	    document.getElementById('d3').value = textArray[12]   ;
	    document.getElementById('fc').value = textArray[13]   ;
	    document.getElementById('fy').value = textArray[14]   ;
	    document.getElementById('gamma').value = textArray[15]   ;
	    document.getElementById('cover').value = textArray[16]   ;
	    document.getElementById('numX').value = textArray[17]   ;
	    document.getElementById('rebarX').selectedIndex = textArray[18]   ;
	    document.getElementById('numY').value = textArray[19]   ;
	    document.getElementById('rebarY').selectedIndex = textArray[20]   ;
	    document.getElementById('height').value = textArray[21]   ;
	    document.getElementById('numF').value= textArray[22]   ;
	    document.getElementById('rebarF').selectedIndex= textArray[23]   ;
	    document.getElementById('numR').value= textArray[24]   ;
	    document.getElementById('rebarR').selectedIndex= textArray[25]   ;
	    document.getElementById('beaCap').value = textArray[26]   ;
	    document.getElementById('mu').value = textArray[27]   ;
	    document.getElementById('view').selectedIndex = textArray[28]   ;

	    DrawSec();
	    OnButtonClick();

	};
    },false);

}

////////////////////////////////////////////////////////////////////////

function OnButtonClick(){


    // input
    // ------------------------------------------------------------

    //
    var w  = Number( document.getElementById('w').value );
    var ka = Number( document.getElementById('ka').value );
    var l1 = Number( document.getElementById('l1').value );
    var l2 = Number( document.getElementById('l2').value );
    var h1 = Number( document.getElementById('h1').value );
    var h2 = Number( document.getElementById('h2').value );
    var t1 = Number( document.getElementById('t1').value );
    var t2 = Number( document.getElementById('t2').value );
    var d1 = Number( document.getElementById('d1').value );
    var d2 = Number( document.getElementById('d2').value );
    var d3 = Number( document.getElementById('d3').value );
    var fc = Number( document.getElementById('fc').value );
    var fy = Number( document.getElementById('fy').value );
    var gamma = Number( document.getElementById('gamma').value );
    var dt = Number( document.getElementById('cover').value );
    var d = d1-dt;
    //
    var numX = document.getElementById('numX').value;
    var stiX = document.getElementById('rebarX').selectedIndex;
    var numY = document.getElementById('numY').value;
    var stiY = document.getElementById('rebarY').selectedIndex;
    var height = document.getElementById('height').value;
    //
    var numF = document.getElementById('numF').value;
    var stiF = document.getElementById('rebarF').selectedIndex;
    var numR = document.getElementById('numR').value;
    var stiR = document.getElementById('rebarR').selectedIndex;
    //
    var beaCap = document.getElementById('beaCap').value;
    var mu = document.getElementById('mu').value;

    // --------------------------------------------------
    // CALCULATION
    // --------------------------------------------------

    var atBase = 1000/numX*Rebar[stiX].As*100;
    var atMid  = 1000/numY*Rebar[stiY].As*100;
    var atF    = 1000/numF*Rebar[stiF].As*100;
    var atR    = 1000/numR*Rebar[stiR].As*100;

    DrawSec();


    // Grobal Parameter
    var t3 = t1-t2;
    var gCon = 25.0;
    var ww,a,x;
    var w1,w2,w3,w4;
    var m1,m2,m3,m4;
    var mc1,mc2,mc3,mc4;

    // Local Parameter
    var a1,a2,a3,a4;
    var x1,x2,x3,x4;

    // Count W1 For Wall
    a1 =   t2 * ( h1+h2-d2 );
    a2 =   t3 * (h1+h2-d2)/2.0;
    a1 = a1/Math.pow(10,6); // mm2 - > m2
    a2 = a2/Math.pow(10,6); // mm2 - > m2
    //
    a = a1 + a2;
    w1 = gCon * a; // kN/m
    //
    x1 = l1 + t2/2.0;
    x2 = l1 + t2 + t3/3.0;
    x = (a1*x1+a2*x2)/a/1000; // m
    m1 = w1*x; // kN.m/m
    mc1 = w1*(x-(l1+t1+l2)/2000.0); // kN.m/m

    console.log('-- Process of calculation --');
    console.log('W1: w1= ',w1.toFixed(1),
		'kN/m2, x= ',x.toFixed(2),
		'm, M1= ',m1.toFixed(2),
		'kN.m/m'
	       );

    // Count W2 For Base
    a1 = (l1+t1+l2)*d2;
    a2 = l1*(d1-d3)/2.0;
    a3 = t1*(d1-d2);
    a4 = l2*(d1-d2)/2.0;
    a1 = a1/Math.pow(10,6); // mm2 - > m2
    a2 = a2/Math.pow(10,6); // mm2 - > m2
    a3 = a3/Math.pow(10,6); // mm2 - > m2
    a4 = a4/Math.pow(10,6); // mm2 - > m2
    //
    a = a1 + a2 + a3 + a4;
    w2 = gCon * a; // kN/m
    //
    x1 = ( l1 + t1 + l2 )/2.0;
    x2 = l1 * 2.0/3.0;
    x3 = l1 + t1/2.0;
    x4 = l1 + t1 + l2/3.0;
    x = (a1*x1+a2*x2+a3*x3+a4*x4)/a/1000; // m
    m2 = w2*x; // kN.m/m
    mc2 = w2*(x-(l1+t1+l2)/2000.0); // kN.m/m

    console.log('W2: w2= ',w2.toFixed(1),
		'kN/m2, x= ',x.toFixed(2),
		'm, M2= ',m2.toFixed(2),
		'kN.m/m'
	       );

    // Count W3 For Rear Fill
    a1 = l2 * ( h1+h2-d1 );
    a2 = t3 * ( h1+h2-d1 )/2.0;
    a3 = l2 * ( d1-d2 )/2.0;
    a1 = a1/Math.pow(10,6); // mm2 - > m2
    a2 = a2/Math.pow(10,6); // mm2 - > m2
    a3 = a3/Math.pow(10,6); // mm2 - > m2
    //
    a = a1 + a2 + a3;
    w3 = gamma * a;
    //
    x1 = l1 + t1 + l2/2.0;
    x2 = l1 + t2 + t3 * 2.0/3.0;
    x3 = l1 + t1 + l2 * 2.0/3.0;
    x = (a1*x1+a2*x2+a3*x3)/a/1000; // m
    m3 = w3*x; // kN.m/m
    mc3 = w3*(x-(l1+t1+l2)/2000.0); // kN.m/m

    console.log('W3: w3= ',w3.toFixed(1),
		'kN/m2, x= ',x.toFixed(2),
		'm, M3= ',m3.toFixed(2),
		'kN.m/m'
	       );

    // Count W4 For Front Fill
    if(l1 > 0.0){
    a1 = l1 * ( h2-d1 );
    a2 = l1 * ( d1-d3 )/2.0;
    //
    a1 = a1/Math.pow(10,6); // mm2 - > m2
    a2 = a2/Math.pow(10,6); // mm2 - > m2
    //
    a = a1 + a2;
    w4 = gamma * a;
    //
    x1 = l1 / 2.0;
    x2 = l1 / 3.0;
    x = (a1*x1+a2*x2)/a/1000; // m
    m4 = w4*x;
    mc4 = w4*(x-(l1+t1+l2)/2000.0); // kN.m/m
    }else{
	w4 = 0.0;
	m4 = 0.0;
	mc4 = 0.0;
    }

    console.log('W4: w4= ',w4.toFixed(1),
		'kN/m2, x= ',x.toFixed(2),
		'm, M4= ',m4.toFixed(2),
		'kN.m/m'
	       );

    // Cal Total
    var pv;
    var mr;
    pv = w1 + w2 + w3 + w4;
    mr = m1 + m2 + m3 + m4;


    // Earth Pressure For Rear backfill
    var mt;
    var h = h1 + h2;
    var ll;
    ll = (l1 + t1 + l2)/1000.0;
    var ph;
    mt = 1.0/2.0 * w * Math.pow(h/1000,2) / 2.0;
    mt = mt + 1.0/6.0 * ka * gamma * Math.pow( h/1000, 3 );
    ph = w * h/1000;
    ph = ph + 1.0/2.0 * ka * gamma;
    var mub = ph/pv;
    var SFM = mr/mt;
    var mc;
    mc = mc1 + mc2 + mc3 + mc4 - mt;
    var e,eBl;
    e = mc/pv;
    eBl = e/ll;

    console.log('M = ',
		mc.toFixed(1),
		'kN.m/m'
	       );

    // Soil Pressure
    var sig0,sigmax,sigmin;
    sig0 = pv/ll;
    console.log('PV/L=',sig0.toFixed(0),'kN/m2');
    //
    var alphaL, alphaR;
    var xnSoil;
    if( Math.abs( eBl ) <= 1.0/6.0){
	alphaR = 1.0 + 6.0 * eBl;
	alphaL = 1.0 - 6.0 * eBl;
	sigmax = sig0*Math.max(alphaR,alphaL);
	sigmin = sig0*Math.min(alphaR,alphaL);
	document.getElementById('Judge').innerHTML = '< 1/6';
    }else{
	alphaR = 2.0/( 3.0*(0.5+eBl) );
	xnSoil = 3.0*ll*(0.5+eBl);
	alphaL = 0.0;
	sigmax = sig0*alphaR;
	sigmin = 0.0;
	document.getElementById('Judge').innerHTML = '->Uplift';
    }

    // Stress to the wall
    var mm,mb; // Moment
    var vm,vb; // Shear
    var xc;
    x = (h1+h2-d1)/Math.pow(10,3);
    xc = h1+h2-d1-height;
    xc = xc/Math.pow(10,3);
    // Base
    mb = 1.0/2.0*w*Math.pow(x,2) + 1.0/6.0*ka*gamma*Math.pow(x,3);
    vb = w*x + 1.0/2.0*ka*gamma*Math.pow(x,2);
    // Middle
    mm = 1.0/2.0*w*Math.pow(xc,2) + 1.0/6.0*ka*gamma*Math.pow(xc,3);
    vm = w*xc + 1.0/2.0*ka*gamma*Math.pow(xc,2);
    var dm;
    dm = xc/x*(t1-t2)+t2 - dt;
    // Req. at
    var ReqAt1,ReqAt2;
    ReqAt1 = mb*Math.pow(10,6)/(fy*d*7/8);
    ReqAt2 = mm*Math.pow(10,6)/(fy*dm*7/8);
    var tauMaxWall;
    tauMaxWall = vb/t1;

    // Stress to the Base
    var sigh1,sigh2;
    var vFront,vRear,mFront,mRear;

    if( Math.abs( eBl ) <= 1.0/6.0){ // Case-1
	sigh1 = sigmin + ( sigmax-sigmin )*( ll - l1/1000 )/ll;
	sigh2 = sigmin + ( sigmax-sigmin )*( ll - l1/1000 - t1/1000 )/ll;
	vRear  = sigmin*l2/1000
	    + (sigh2-sigmin)*(ll-l1/1000)/ll;
	mRear  = 1.0/2.0*sigmin*Math.pow(l2/1000,2)
	    + 1.0/6.0*(sigh2-sigmin)*Math.pow(l2/1000,2);
	vFront = sigh1*l1/1000
	    + (sigmax-sigh1)*l1/1000/2.0;
	mFront = 1.0/2.0*sigh1*Math.pow(l1/1000,2)
	    + 1.0/3.0*(sigmax-sigh1)*Math.pow(l1/1000,2);
	/*
	console.log(sigh1.toFixed(0),sigh2.toFixed(0));
	*/
	console.log('Case-1');
    }else{
	xnSoil = xnSoil*1000;
	if( xnSoil < l1 ){ // Case-2
	    vFront  = sigmax*xnSoil/1000/2.0;
	    mFront  = vFront*(l1-1.0/3.0*xnSoil)/1000;
	    vRear = 0.0;
	    mRear = 0.0;
	    console.log('Case-2','xn=',xnSoil.toFixed(0));
	}else if( l1 <= xnSoil && xnSoil < l1+t1 ){ // Case-3
	    sigh1 = sigmax * ( xnSoil-l1 )/xnSoil;
	    vFront  = sigh1*l1/1000
		+ (sigmax-sigh1)*l1/1000/2.0;
	    mFront  = 1.0/2.0*sigh1*Math.pow(l1/1000,2)
		+ 1.0/3.0*(sigmax-sigh1)*Math.pow(l1/1000,2);
	    vRear = 0.0;
	    mRear = 0.0;
	    console.log('Case-3','xn=',xnSoil.toFixed(0));
	}else if( l1+t1 <= xnSoil ){ // Case-4
	    sigh1 = sigmax * ( xnSoil-l1 )/xnSoil;
	    vFront  = sigh1*l1/1000
		+ (sigmax-sigh1)*l1/1000/2.0;
	    mFront  = 1.0/2.0*sigh1*Math.pow(l1/1000,2)
		+ 1.0/3.0*(sigmax-sigh1)*Math.pow(l1/1000,2);
	    sigh2 = sigmax * ( xnSoil-l1-t1 )/xnSoil;
	    vRear = 1.0/2.0*sigh2*(xnSoil-l1-t1)/1000;
	    mRear = 1.0/6.0*sigh2*Math.pow((xnSoil-l1-t1)/1000,2);
	    console.log('Case-4','xn=',xnSoil.toFixed(0));
	}
    }

    // Resistance for Rear Base
    ////////////////////////////////////////////////////////////////////////

    // Count For Rear Fill
    //////////////////////
    a1 = l2 * ( h1+h2-d1 );
    a2 = l2 * ( d1-d2 )/2.0;
    a1 = a1/Math.pow(10,6); // mm2 - > m2
    a2 = a2/Math.pow(10,6); // mm2 - > m2
    //
    a = a1 + a2;
    w3 = gamma * a;
    //
    x1 = l2 * 1.0/2.0;
    x2 = l2 * 2.0/3.0;
    x = (a1*x1+a2*x2)/a/1000; // m
    var MRearR = w3*x; // kN.m/m
    var VRearR = w3; //kN/m
    // Count For Base
    //////////////////////
    a1 = l2 * d2;
    a2 = l2 * ( d1-d2 )/2.0;
    a1 = a1/Math.pow(10,6); // mm2 - > m2
    a2 = a2/Math.pow(10,6); // mm2 - > m2
    //
    a = a1 + a2;
    w3 = 25.0 * a;
    //
    x1 = l2 * 1.0/2.0;
    x2 = l2 * 1.0/3.0;
    x = (a1*x1+a2*x2)/a/1000; // m
    MRearR = MRearR + w3*x; // kN.m/m
    VRearR = VRearR + w3; //kN/m
    mRear = mRear-MRearR;
    vRear = vRear-VRearR;

    // Resistance for Front Base
    ////////////////////////////////////////////////////////////////////////

    // Count For Front Fill
    //////////////////////
    a1 = l1 * ( h2-d1 );
    a2 = l1 * ( d1-d3 )/2.0;
    a1 = a1/Math.pow(10,6); // mm2 - > m2
    a2 = a2/Math.pow(10,6); // mm2 - > m2
    //
    a = a1 + a2;
    w3 = gamma * a;
    //
    x1 = l1 * 1.0/2.0;
    x2 = l1 * 2.0/3.0;
    x = (a1*x1+a2*x2)/a/1000; // m
    var MFrontR = w3*x; // kN.m/m
    var VFrontR = w3; //kN/m
    // Count For Base
    //////////////////////
    a1 = l1 * d2;
    a2 = l1 * ( d1-d3 )/2.0;
    a1 = a1/Math.pow(10,6); // mm2 - > m2
    a2 = a2/Math.pow(10,6); // mm2 - > m2
    //
    a = a1 + a2;
    w3 = 25.0 * a;
    //
    x1 = l1 * 1.0/2.0;
    x2 = l1 * 1.0/3.0;
    x = (a1*x1+a2*x2)/a/1000; // m
    MFrontR = MFrontR + w3*x; // kN.m/m
    VFrontR = VFrontR + w3; //kN/m
    mFront = mFront-MFrontR;
    vFront = vFront-VFrontR;

    // Req. at
    ////////////////////////////////////////////////////////////////////////
    var ReqAt3,ReqAt4;
    ReqAt3 = mFront*Math.pow(10,6)/(fy*(d1-dt)*7/8);
    ReqAt4 = mRear*Math.pow(10,6)/(fy*(d1-dt)*7/8);
    var tauMaxBase;
    tauMaxBase = Number(Math.max(Math.abs(vFront),Math.abs(vRear))) / (d1-dt);

    // Output Process
    /*
     console.log(vRear.toFixed(0),mRear.toFixed(0),
     vFront.toFixed(0),mFront.toFixed(0));
    */

    // Output
    ////////////////////////////////////////////////////////////////////////
    document.getElementById('w1').innerHTML = w1.toFixed(1);
    document.getElementById('w2').innerHTML = w2.toFixed(1);
    document.getElementById('w3').innerHTML = w3.toFixed(1);
    document.getElementById('w4').innerHTML = w4.toFixed(1);
    //
    document.getElementById('PV').innerHTML = pv.toFixed(1);
    document.getElementById('PH').innerHTML = ph.toFixed(1);
    //
    document.getElementById('kaO').innerHTML = ka.toFixed(2);
    document.getElementById('Mt').innerHTML = mt.toFixed(1);
    document.getElementById('Mr').innerHTML = mr.toFixed(1);
    document.getElementById('d').innerHTML = d.toFixed(0);
    document.getElementById('e').innerHTML = e.toFixed(2);
    document.getElementById('eBl').innerHTML = eBl.toFixed(2);
    //
    document.getElementById('sigmax').innerHTML = sigmax.toFixed(0);
    document.getElementById('SFM').innerHTML = SFM.toFixed(2);
    document.getElementById('mub').innerHTML = mub.toFixed(2);
    //
    document.getElementById('m1').innerHTML = mb.toFixed(1);
    document.getElementById('v1').innerHTML = vb.toFixed(1);
    //
    document.getElementById('sf1').innerHTML = ReqAt1.toFixed(0)+'/';
    document.getElementById('sf1').innerHTML += atBase.toFixed(0);
    document.getElementById('sf1').innerHTML += '<br> (';
    document.getElementById('sf1').innerHTML += (ReqAt1/atBase).toFixed(2);
    if( ReqAt1/atBase < 1 ){
	document.getElementById('sf1').innerHTML += '< 1.0 OK';
    }else{
	document.getElementById('sf1').innerHTML += '> 1.0 NG';
    }
    document.getElementById('sf1').innerHTML += ')';
    //
    document.getElementById('m2').innerHTML = mm.toFixed(2);
    document.getElementById('v2').innerHTML = vm.toFixed(2);
    //
    document.getElementById('sf2').innerHTML = ReqAt2.toFixed(0)+'/';
    document.getElementById('sf2').innerHTML += atMid.toFixed(0);
    document.getElementById('sf2').innerHTML += '<br> (';
    document.getElementById('sf2').innerHTML += (ReqAt2/atMid).toFixed(2);
    if( ReqAt2/atMid < 1 ){
	document.getElementById('sf2').innerHTML += '< 1.0 OK';
    }else{
	document.getElementById('sf2').innerHTML += '> 1.0 NG';
    }
    document.getElementById('sf2').innerHTML += ')';
    // Front
    //
    document.getElementById('m3').innerHTML = mFront.toFixed(1);
    document.getElementById('v3').innerHTML = vFront.toFixed(1);
    //
    document.getElementById('sf3').innerHTML = ReqAt3.toFixed(0)+'/';
    document.getElementById('sf3').innerHTML += atF.toFixed(0);
    document.getElementById('sf3').innerHTML += '<br> (';
    document.getElementById('sf3').innerHTML += (ReqAt3/atF).toFixed(2);
    if( ReqAt3/atF < 1 ){
	document.getElementById('sf3').innerHTML += '< 1.0 OK';
    }else{
	document.getElementById('sf3').innerHTML += '> 1.0 NG';
    }
    document.getElementById('sf3').innerHTML += ')';
    //
    document.getElementById('m4').innerHTML = mRear.toFixed(1);
    document.getElementById('v4').innerHTML = vRear.toFixed(1);
    //
    document.getElementById('sf4').innerHTML = -ReqAt4.toFixed(0)+'/';
    document.getElementById('sf4').innerHTML += atR.toFixed(0);
    document.getElementById('sf4').innerHTML += '<br> (';
    document.getElementById('sf4').innerHTML += (-ReqAt4/atR).toFixed(2);
    if( Math.abs(ReqAt4/atR) < 1 ){
	document.getElementById('sf4').innerHTML += '< 1.0 OK';
    }else{
	document.getElementById('sf4').innerHTML += '> 1.0 NG';
    }
    document.getElementById('sf4').innerHTML += ')';

    //
    document.getElementById('tauMaxWall').innerHTML = tauMaxWall.toFixed(2);
    document.getElementById('tauMaxBase').innerHTML = tauMaxBase.toFixed(2);

}


// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------

var canvas,ctx;
var xcen,ycen;
var xscale,yscale,scale;

function DrawSec() {

    var view = document.getElementById('view').selectedIndex;

    // In case of Legend View
    var result = '';
    if(view ==0){
	result += '<p><img src="images/Retaining.jpg" width="300px" /><br  /></p>';
	document.getElementById('picture').innerHTML = result;
return;
    }

    // Input for Profile sketch
    var l1 = Number( document.getElementById('l1').value ) ;
    var l2 = Number( document.getElementById('l2').value ) ;
    //
    var h1 = Number( document.getElementById('h1').value ) ;
    var h2 = Number( document.getElementById('h2').value ) ;
    var df = h1+h2;
    var t1 = Number( document.getElementById('t1').value ) ;
    var t2 = Number( document.getElementById('t2').value ) ;
    var t3 = t1-t2;
    var cx = t1;
    var lx = l1+l2+cx;
    var lx1 = l1+t1/2.0;
    var d1 = Number( document.getElementById('d1').value ) ;
    var d2 = Number( document.getElementById('d2').value ) ;
    var d3 = Number( document.getElementById('d3').value ) ;

    //
    //var gapx = Math.min(lx,ly)/4;
    //var gapy = Math.min(lx,ly)/4;
    //
    /*
    var b = lx + gapx + df;
    var h = ly + gapy + df;
     */
    var b = lx+4000;
    //var b = lx;
    var h = df;
    //
    /*
    var numX = document.getElementById('numX').value;
    var stiX = document.getElementById('rebarX').selectedIndex;
    var numY = document.getElementById('numY').value;
    var stiY = document.getElementById('rebarY').selectedIndex;
     */
    //

    result = '<canvas width=\"420\" height=\"300\" id=\"picCanvas\"></canvas>';
    document.getElementById('picture').innerHTML = result;


    canvas = document.getElementById('picCanvas');
    ctx = canvas.getContext("2d");
    xcen = canvas.width / 2 + 35;
    ycen = canvas.height / 2 - 20;

    xscale = (canvas.width-110)/b;
    yscale = (canvas.height-80)/h;
    scale = (xscale < yscale) ? xscale : yscale;

    /*
    // Draw Footing Plan
    ctx.beginPath();
    ctx.rect(xcen-b/2*scale, ycen+h/2*scale-ly*scale,
	     lx*scale, ly*scale);
    ctx.fillStyle = "rgb(242,244,255)";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();
     */

    ctx.fillStyle = "rgb(242,244,255)";
    ctx.lineWidth = 1;
    // Draw Footing Section X
    ctx.beginPath();

    ctx.moveTo(xcen-b/2*scale,
               ycen+h/2*scale); // lower left
    ctx.lineTo(xcen-b/2*scale+lx*scale,
	       ycen+h/2*scale);

    ctx.lineTo(xcen-b/2*scale+lx*scale,
	       ycen+h/2*scale-d2*scale);
    ctx.lineTo(xcen-b/2*scale+lx1*scale+cx/2*scale,
	       ycen+h/2*scale-d1*scale);

    ctx.lineTo(xcen-b/2*scale+lx1*scale+cx/2*scale-t3*scale,
	       ycen+h/2*scale-df*scale);
    ctx.lineTo(xcen-b/2*scale+lx1*scale-cx/2*scale,
	       ycen+h/2*scale-df*scale);

    ctx.lineTo(xcen-b/2*scale+lx1*scale-cx/2*scale,
	       ycen+h/2*scale-d1*scale);
    ctx.lineTo(xcen-b/2*scale,
	       ycen+h/2*scale-d3*scale);

    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();

    /*
    // Draw Footing Section X
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+lx*scale+gapx*scale,
               ycen+h/2*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale+d2*scale,
	       ycen+h/2*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale+d1*scale,
	       ycen+h/2*scale-ly1*scale+cy/2*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale+df*scale,
	       ycen+h/2*scale-ly1*scale+cy/2*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale+df*scale,
	       ycen+h/2*scale-ly1*scale-cy/2*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale+d1*scale,
	       ycen+h/2*scale-ly1*scale-cy/2*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale+d2*scale,
	       ycen+h/2*scale-ly*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale,
	       ycen+h/2*scale-ly*scale);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();
     */

    /*
    // Draw Column Plan
    ctx.beginPath();
    ctx.rect(xcen-b/2*scale+lx1*scale-cx/2*scale,
	     ycen+h/2*scale-ly1*scale-cy/2*scale,
	     cx*scale, cy*scale);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();
     */


    // Draw Dimension Lines
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.font = "12pt sans-serif";
    ctx.textAlign = "center";

    /*
    // Draw Load
    drawLineArrow (xcen+(-b/2+lx/2)*scale,
		   ycen+(h/2-ly-gapy-df)*scale-20,
		   xcen+(-b/2+lx/2)*scale,
		   ycen+(h/2-ly-gapy-df)*scale+30);
    ctx.fillText(  "Nux",
		   xcen+(-b/2+lx/2)*scale+40,
		   ycen+(h/2-ly-gapy-df)*scale+20);
    drawLineArrow (xcen+(-b/2+lx/2)*scale-40,
		   ycen+(h/2-ly-gapy-d1)*scale-10,
		   xcen+(-b/2+lx/2)*scale+40,
		   ycen+(h/2-ly-gapy-d1)*scale-10);
    ctx.fillText(  "Mux",
		   xcen+(-b/2+lx/2)*scale+70,
		   ycen+(h/2-ly-gapy-d1)*scale-10);

    drawLineArrow (xcen+(-b/2+lx+gapx+df)*scale+30,
		   ycen+(h/2-ly/2)*scale,
		   xcen+(-b/2+lx+gapx+df)*scale-20,
		   ycen+(h/2-ly/2)*scale);
    ctx.fillText(  "Nuy",
		   xcen+(-b/2+lx+gapx+df)*scale-20,
		   ycen+(h/2-ly/2)*scale+50);
    drawLineArrow (xcen+(-b/2+lx+gapx+d1)*scale+20,
		   ycen+(h/2-ly/2)*scale+30,
		   xcen+(-b/2+lx+gapx+d1)*scale+20,
		   ycen+(h/2-ly/2)*scale-30);
    ctx.fillText(  "Muy",
		   xcen+(-b/2+lx+gapx+d1)*scale+20,
		   ycen+(h/2-ly/2)*scale-50);
     */

    // Draw Rc width
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale,ycen+h/2*scale+10);
    ctx.lineTo(xcen-b/2*scale,ycen+h/2*scale+30);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+lx*scale,ycen+h/2*scale+10);
    ctx.lineTo(xcen-b/2*scale+lx*scale,ycen+h/2*scale+30);
    ctx.stroke();
    drawLineArrow2(xcen-b/2*scale,ycen+h/2*scale+20,
		   xcen-b/2*scale+lx*scale,ycen+h/2*scale+20);
    ctx.fillText(lx,xcen-b/2*scale+lx/2*scale,ycen+h/2*scale+40);


    /*
    // GL line for Y
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+lx*scale+gapx*scale,
	       ycen+h/2*scale+10);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale,
	       ycen+h/2*scale+30);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+lx*scale+gapx*scale+df*scale,
	       ycen+h/2*scale+10);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale+df*scale,
	       ycen+h/2*scale+30);
    ctx.stroke();

    drawLineArrow2(xcen-b/2*scale+lx*scale+gapx*scale,
		   ycen+h/2*scale+20,
		   xcen-b/2*scale+lx*scale+gapx*scale+df*scale,
		   ycen+h/2*scale+20);
    ctx.fillText(df,
		 xcen-b/2*scale+lx*scale+gapx*scale+df/2*scale,
		 ycen+h/2*scale+40);
     */

    // Footing Depth
    /*
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale-30,ycen+h/2*scale-ly*scale);
    ctx.lineTo(xcen-b/2*scale-10,ycen+h/2*scale-ly*scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale-30,ycen+h/2*scale);
    ctx.lineTo(xcen-b/2*scale-10,ycen+h/2*scale);
    ctx.stroke();

    drawLineArrow2(xcen-b/2*scale-20,ycen+h/2*scale,
		   xcen-b/2*scale-20,ycen+h/2*scale-ly*scale);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(ly,xcen-b/2*scale-70,ycen+h/2*scale-ly/2*scale);
     */

    // Soil Depth
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale-30,
	       ycen+h/2*scale-df*scale);
    ctx.lineTo(xcen-b/2*scale-10,
	       ycen+h/2*scale-df*scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale-30,
	       ycen+h/2*scale);
    ctx.lineTo(xcen-b/2*scale-10,
	       ycen+h/2*scale);
    ctx.stroke();

    drawLineArrow2(xcen-b/2*scale-20,
		   ycen+h/2*scale,
		   xcen-b/2*scale-20,
		   ycen+h/2*scale-df*scale);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(df,xcen-b/2*scale-70,
		 ycen+h/2*scale-df/2*scale);

    // Footing Thickness
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+30+lx*scale,
	       ycen+h/2*scale-d2*scale);
    ctx.lineTo(xcen-b/2*scale+10+lx*scale,
	       ycen+h/2*scale-d2*scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+30+lx*scale,
	       ycen+h/2*scale);
    ctx.lineTo(xcen-b/2*scale+10+lx*scale,
	       ycen+h/2*scale);
    ctx.stroke();

    drawLineArrow2(xcen-b/2*scale+20+lx*scale,
		   ycen+h/2*scale,
		   xcen-b/2*scale+20+lx*scale,
		   ycen+h/2*scale-d2*scale);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(d2,xcen-b/2*scale+30+lx*scale,
		 ycen+h/2*scale-d2/2*scale);

    // Footing Thickness
    var alpha = 50;
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+30+lx*scale+alpha,
	       ycen+h/2*scale-d1*scale);
    ctx.lineTo(xcen-b/2*scale+10+lx*scale+alpha,
	       ycen+h/2*scale-d1*scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+30+lx*scale+alpha,
	       ycen+h/2*scale);
    ctx.lineTo(xcen-b/2*scale+10+lx*scale+alpha,
	       ycen+h/2*scale);
    ctx.stroke();

    drawLineArrow2(xcen-b/2*scale+20+lx*scale+alpha,
		   ycen+h/2*scale,
		   xcen-b/2*scale+20+lx*scale+alpha,
		   ycen+h/2*scale-d1*scale);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(d1,xcen-b/2*scale+30+lx*scale+alpha,
		 ycen+h/2*scale-d1/2*scale);

    // GL line for X
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+lx1*scale,
	       ycen+h/2*scale-df*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale,
	       ycen+h/2*scale-df*scale);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "gray";
    ctx.stroke();

    ctx.fillText('GL',xcen-b/2*scale+10+lx*scale,
		 ycen+h/2*scale-df*scale);

    // Under GL
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale,
	       ycen+h/2*scale-h2*scale);
    ctx.lineTo(xcen-b/2*scale+l1*scale,
	       ycen+h/2*scale-h2*scale);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "gray";
    ctx.stroke();

    /*
    ctx.fillText('GL',xcen-b/2*scale+10+lx*scale,
		 ycen+h/2*scale-df*scale);
     */

    /*
    // GL line for Y
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+lx*scale+gapx*scale+df*scale,
	       ycen+h/2*scale);
    ctx.lineTo(xcen-b/2*scale+lx*scale+gapx*scale+df*scale,
	       ycen+h/2*scale-ly*scale);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "gray";
    ctx.stroke();
     */

    /*
    // Draw Rebar
    var i = 1;
    var del = (ly-180)/(numX-1);
    ctx.lineWidth = 1
    ctx.strokeStyle = "blue";

    for ( i = 1; i <=numX; i++ ){
	ctx.beginPath();
	ctx.moveTo(xcen-b/2*scale+90*scale,
		   ycen+h/2*scale-90*scale-del*scale*(i-1));
	ctx.lineTo(xcen-b/2*scale-90*scale+lx*scale,
		   ycen+h/2*scale-90*scale-del*scale*(i-1));
	ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+90*scale,
	       ycen+h/2*scale-90*scale-gapy*scale-ly*scale);
    ctx.lineTo(xcen-b/2*scale-90*scale+lx*scale,
	       ycen+h/2*scale-90*scale-gapy*scale-ly*scale);
    ctx.stroke();


    var del = (lx-180)/(numY-1);
    for ( i = 1; i <=numY; i++ ){
	ctx.beginPath();
	ctx.moveTo(xcen-b/2*scale+90*scale+del*scale*(i-1),
		   ycen+h/2*scale-90*scale);
	ctx.lineTo(xcen-b/2*scale+90*scale+del*scale*(i-1),
		   ycen+h/2*scale+90*scale-ly*scale);
	ctx.lineWidth = 1
	ctx.setLineDash([2]);
	ctx.strokeStyle = "blue";
	ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+90*scale+lx*scale+gapx*scale,
	       ycen+h/2*scale-90*scale);
    ctx.lineTo(xcen-b/2*scale+90*scale+lx*scale+gapx*scale,
	       ycen+h/2*scale+90*scale-ly*scale);
    ctx.lineWidth = 1
    ctx.setLineDash([2]);
    ctx.strokeStyle = "blue";
    ctx.stroke();

    */
    /*
    ctx.arc(xcen-b/2*scale+lx*scale,
	    ycen+h/2*scale-ly*scale,
	    dia/2*scale,0,2*Math.PI,true);
    */


    /*
    result = '';
    result += '<h3>';
    result += 'X-Direction; &nbsp;' + numX + '- DB' + Rebar[stiX].dia*10;
    result += '</h3></p>';
    result += '<p><h3>';
    result += 'Y-Direction; &nbsp;' + numY + '- DB' + Rebar[stiY].dia*10;
    result += '</h3></p>';

    document.getElementById('addRebar').innerHTML = result;
     */
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

Rebar[0] = new STobj("DB12",1.2,1.13,3.77);
Rebar[1] = new STobj("DB16",1.6,2.01,5.03);
Rebar[2] = new STobj("DB20",2.0,3.14,6.28);
Rebar[3] = new STobj("DB25",2.5,4.91,7.85);
Rebar[4] = new STobj("DB28",2.8,6.16,8.80);
Rebar[5] = new STobj("DB32",3.2,8.04,10.05);

var Vbar = new Array();

Vbar[0] = new STobj("RB9",0.9,0.636,2.82);
Vbar[1] = new STobj("DB10",1.0,0.785,3.14);
Vbar[2] = new STobj("DB12",1.2,1.13,3.77);

function changeFooting(){
    var lx = document.getElementById('lx').value ;
    var ly = document.getElementById('ly').value ;
    document.getElementById('lx1').value = lx/2;
    document.getElementById('ly1').value = ly/2;
}

function Reset(){
    document.getElementById('result'+'X').innerHTML = '';
    document.getElementById('result'+'Y').innerHTML = '';
}
