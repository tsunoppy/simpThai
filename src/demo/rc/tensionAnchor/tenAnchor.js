// Window Load
window.onload = function (){

    document.getElementById('job').value = 'New Project';
    document.getElementById('nu').value = 30.0;
    document.getElementById('phi').value = 0.70;
    document.getElementById('fc').value = 21.0;
    document.inputform.da.selectedIndex = 3;
    document.getElementById('hef').value = 500;
    document.getElementById('na').value = 2;
    document.getElementById('ma').value = 1;
    document.getElementById('ca1').value = 150;
    document.getElementById('ca2').value = 180;
    document.getElementById('ca3').value = 120;
    document.getElementById('ca4').value = 150;
    document.getElementById('s').value = 200;
    document.getElementById('sm').value = 200;
    document.getElementById('ha').value = 1000;
    document.getElementById('ev').value = 0.0;
    document.inputform.psicn.selectedIndex = 1;
    document.getElementById('eh').value = 192;

    DrawSec(inputform);
    ModByRF(inputform);
}

////////////////////////////////////////////////////////////////////////

var downloadAsFile = function(fileName, content) {

    var textArray = [];

    var npara = 18;
    textArray[0]    = document.title;
    textArray[1]    = document.getElementById('job').value;
    textArray[2]    = document.getElementById('nu').value;
    textArray[3]    = document.getElementById('phi').value;
    textArray[4]    = document.getElementById('fc').value;
    textArray[5]    = document.inputform.da.selectedIndex;
    textArray[6]    = document.getElementById('hef').value;
    textArray[7]    = document.getElementById('na').value;
    textArray[8]    = document.getElementById('ma').value;
    textArray[9]    = document.getElementById('ca1').value;
    textArray[10]    = document.getElementById('ca2').value;
    textArray[11]    = document.getElementById('ca3').value;
    textArray[12]    = document.getElementById('ca4').value;
    textArray[13]    = document.getElementById('s').value;
    textArray[14]    = document.getElementById('sm').value;
    textArray[15]    = document.getElementById('ha').value;
    textArray[16]    = document.getElementById('ev').value;
    textArray[17]    = document.inputform.psicn.selectedIndex;
    textArray[18]    = document.getElementById('eh').value;

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
	    document.getElementById('nu').value = textArray[2]    ;
	    document.getElementById('phi').value = textArray[3]    ;
	    document.getElementById('fc').value = textArray[4]    ;
	    document.inputform.da.selectedIndex = textArray[5]    ;
	    document.getElementById('hef').value = textArray[6]    ;
	    document.getElementById('na').value = textArray[7]    ;
	    document.getElementById('ma').value = textArray[8]    ;
	    document.getElementById('ca1').value = textArray[9]    ;
	    document.getElementById('ca2').value = textArray[10]    ;
	    document.getElementById('ca3').value = textArray[11]    ;
	    document.getElementById('ca4').value = textArray[12]    ;
	    document.getElementById('s').value = textArray[13]    ;
	    document.getElementById('sm').value = textArray[14]    ;
	    document.getElementById('ha').value = textArray[15]    ;
	    document.getElementById('ev').value = textArray[16]    ;
	    document.inputform.psicn.selectedIndex = textArray[17]    ;
	    document.getElementById('eh').value = textArray[18]    ;

	    DrawSec(inputform);
	    ModByRF(inputform);
	    OnButtonClick();

	}
    },false);

}

////////////////////////////////////////////////////////////////////////


function ModByRF(obj){

    var result = "";
    result += "Note: ";
    var idx = obj.psicn.selectedIndex;

    if ( idx == 0 ){
	result += "No cracking at service loads";
    }
    if ( idx == 1 ){
	result += "cracking at service load levels";
    }

    document.getElementById('addMod').innerHTML = result;
}


function OnButtonClick(){


    // input
    // ------------------------------------------------------------
    //    var btn = document.getElementById('btn');

    var vuForm = document.getElementById('nu');
    var fcForm = document.getElementById('fc');
    var da = document.inputform.da.value;
    var hefForm = document.getElementById('hef');
    var naForm = document.getElementById('na');
    var maForm = document.getElementById('ma');
    var ca1Form = document.getElementById('ca1');
    var ca2Form = document.getElementById('ca2');
    var ca3Form = document.getElementById('ca3');
    var ca4Form = document.getElementById('ca4');
    var sForm = document.getElementById('s');
    var smForm = document.getElementById('sm');
    var phiForm = document.getElementById('phi');
    var haForm = document.getElementById('ha');
    var evForm = document.getElementById('ev');
    var psicn = document.inputform.psicn.value;

    var eh = Number(document.getElementById('eh').value);

    // Start calculation
    // ------------------------------------------------------------

    //    btn.addEventListener('click', function() {

    var vu = vuForm.value;
//    var vnuc = vnucForm.value;
    var fc = fcForm.value;
//    var fy = fyForm.value;

    var hef = hefForm.value;
    var na  = naForm.value;
    var ma  = maForm.value;

    var ca1 = ca1Form.value;
    var ca2 = ca2Form.value;
    var ca3 = ca3Form.value;
    var ca4 = ca4Form.value;

    var s   = sForm.value;
    var sm   = smForm.value;
    var phi = phiForm.value;

    var ha  = haForm.value;
    var ev  = evForm.value;
    var lamda = 1.0;
    // --------------------------------------------------
    // CALCULATION
    // --------------------------------------------------
    // Output

    var result = '';

    result += "<p>";
    result += "<h3> - Concrete breakout strength of anchor in tension</h3>";

    //--------------------------------------------------
    // Evaluation of the anchor height.

    var hefacc = Math.min( ca1, ca2, ca3, ca4 );
    var spaacc = Math.min( s, sm);

    if( ca1 < 1.5*hef ){
	if( ca1 > hefacc ){
	    hefacc = ca1;
	}
    }
    if( ca2 < 1.5*hef ){
	if( ca2 > hefacc ){
	    hefacc = ca2;
	}
    }
    if( ca3 < 1.5*hef ){
	if( ca3 > hefacc ){
	    hefacc = ca3;
	}
    }
    if( ca4 < 1.5*hef ){
	if( ca4 > hefacc ){
	    hefacc = ca4;
	}
    }

    var camax = hefacc;

    result += "<h4> -- Evaluation of the anchor depth.;";
    result += " h<sub>ef</sub></h4>";
    result += "<table><tr>";
    result += "<td>";
    result += " C<sub>a,max</sub> = ";
    result += "</td>";
    result += "<td>";
    result += (1.0*hefacc).toFixed(0);
    result += "</td>";
    result += "<td>";
    result += " mm";
    result += "</td>";
    result += "<td>";
    result += " &nbsp; Minimum Spacing = ";
    result += "</td>";
    result += "<td>";
    result += (1.0*spaacc).toFixed(0);
    result += "</td>";
    result += "<td>";
    result += " mm";
    result += "</td>";
    result += "<td>";
    result += " -> h<sub>ef</sub> = Max [ C<sub>a,max</sub>/1.5, Spacing/3.0 ] = ";
    result += "</td>";
    result += "<td>";
    hefacc = Math.max(hefacc/1.5,spaacc/3.0);
    result += (1.0*hefacc).toFixed(0);
    result += "</td>";
    result += "<td>";
    result += " mm";
    result += "</td>";
    result += "</tr></table>";

    hef = hefacc;
//    hef = 202
    //--------------------------------------------------
    // Concrete break strength


    var avco = 4.5* Math.pow(ca1,2);
    var anco = 9.0* Math.pow(hef,2);

    result += "<h4> -- Projected area for a single anchor;";
    result += " A<sub>Nco</sub></h4>";
    result += "<table><tr>";
    result += "<td>";
    result += " A<sub>Nco</sub> = 9.0 h<sub>ef</sub><sup>2</sup> = ";
    result += "</td>";
    result += "<td>";
    result += anco.toFixed(0);
    result += "</td>";
    result += "<td>";
    result += " mm<sup>2</sup>";
    result += "</td>";
    result += "</tr></table>";

    var xx,yy;


    if( 1.5 * hef < ca1 ){
	xx = 1.5 * hef;
    }
    else{
	xx = 1.0*ca1;
    }

    xx = 1.0*xx + 1.0*sm*(ma-1);

    if( 1.5 * hef < ca4 ){
	xx = 1.0*xx + 1.5*hef;
    }
    else{
	xx = 1.0*xx + 1.0*ca4;
    }

    result += "<h4> -- Projected area of the failure surface;";
    result += " A<sub>Nc</sub></h4>";

    result += "<table><tr>";

    result += "<td>";
    result += "Failure width; ";
    result += "</td>";
    result += "<td>";
    result += " x = Min{ 1.5 h<sub>ef</sub>, C<sub>a1</sub> } + sm ( m<sub>a</sub> -1 ) + Min{ 1.5h<sub>ef</sub>, C<sub>a4</sub> } = ";
    if( ma >= 2 ){
	if ( sm > 3.0*hef ){
	    result += "sm > 3.0 h<sub>ef</sub>, so, re-Check the data again!!";
	}
    }
    result += "</td>";
    result += "<td>";
    result += (1.0*xx).toFixed(0);
    result += "</td>";
    result += "<td>";
    result += " mm,";
    result += "</td>";

    result += "</tr></table>";
    result += "<table><tr>";

    result += "<td>";
    result += "Failure depth; ";
    result += "</td>";
    result += "<td>";
    result += " y = Min{ 1.5 h<sub>ef</sub>, C<sub>a2</sub> } + s ( n<sub>a</sub> -1 ) + Min{ 1.5h<sub>ef</sub>, C<sub>a3</sub> } = ";
    result += "</td>";

    if( 1.5 * hef < ca3 ) {
	yy = 1.5*hef;
    }
    else{
	yy = 1.0*ca3;
    }

    yy = 1.0*yy + 1.0*s*(na-1);

    if( 1.5 * hef < ca2 ){
	yy = 1.0*yy + 1.5*hef;
    }
    else{
	yy = 1.0*yy + 1.0*ca2;
    }
    result += "</td>";
    result += "<td>";
    result += (1.0*yy).toFixed(0) + " mm";
    result += "</td>";

    result += "</tr>";
    result += "</table>";

    result += "<table>";
    result += "<tr>";
    result += "<td>";
    result += " A<sub>Nc</sub></sub> = x y = ";
    result += "</td>";
    result += "<td>";
    var anc;
    var avc;
    avc = xx*yy;
    anc = xx*yy;
    result += anc.toFixed(0);
    result += "</td>";
    result += "<td>";
    result += " mm<sup>2</sup>";
    result += "</td>";

    result += "</tr>";
    result += "</table>";

    // ------------------------------------------------------------------------
    result += "<h4> -- Basic concrete breakout strength;";
    result += " N<sub>b<sub></h4>";

    var nb;
    var kc = 10.0;

    nb = kc*lamda*Math.sqrt(fc)*Math.pow(hef,1.5);
    nb = nb/1000.0;

    result += "<table><tr>";

    result += "<td>";
    result += " N<sub>b</sub> = k<sub>c</sub> &lambda; &radic; f<sub>c</sub> h<sub>ef</sub><sup>1.5</sup> = ";
    result += "</td>";
    result += "<td>";
    result += kc.toFixed(2) + ' x ' + lamda + ' x &radic;' + fc + ' x ' + hef + '<sup>1.5</sup> = ';
    result += "</td>";
    result += "<td>";
    result += nb.toFixed(2);
    result += "</td>";
    result += "<td>";
    result += " kN";
    result += "</td>";
    result += "</tr></table>";


    // --------------------------------------------------
    result += "<h4> -- Modification factor for anchor grounps loaded eccentrically;";
    result += " &psi;<sub>ec,N</sub>, &psi;<sub>ed,N</sub></h4>";

    if ( na > 1 || ma > 1 ){
	result += "<table><tr>";
	result += "<td>";
	result += "  &psi;<sub>ec,V</sub> = 1 / ( 1 + ( 2 e<sup>'</sup><sub>V</sub> ) / ( 3 c<sub>a1</sub> ) ) = ";
	result += "</td>";
	result += "<td>";
	var psiecn = 1.0 / ( 1+ 2.0*ev /(3.0*ca1) );
	result += psiecn.toFixed(2);
	result += "</td>";
	result += "<td>";
	result += " --> ";
	result += "</td>";
	if ( psiecn > 1.0 ){
	    psiecn = 1.0;
	}
	result += "<td>";
	result += psiecn.toFixed(2);
	result += "</td>";
	result += "</tr></table>";
    }

    result += "<table><tr>";

    result += "<td>";
    result += " C<sub>a,min</sub> = Min{ C<sub>a1</sub>, C<sub>a2</sub>, C<sub>a3</sub>, C<sub>a4</sub> } = ";
    result += "</td>";

    var camin = Math.min( ca1, ca2, ca3, ca4);

    result += "<td>";
    result += camin;
    result += "</td>";
    result += "<td>";
    result += "mm  --> ";
    result += "</td>";

    var psiedn;

    if ( camin > 1.5 * hef ) {
	psiedn = 1.0;
	result += "<td>";
	result += " C<sub>a2</sub> &nt; 1.5 h<sub>ef</sub>,";
	result += "</td>";
	result += "</tr></table>";
	result += "<table><tr>";
	result += "<td>";
	result += "-> &psi;<sub>ed,V</sub> =" + psiedn.toFixed(2);
	result += "</td>";
    }
    else {
	psiedn = 0.7 + 0.3 * camin/(1.5*hef);
	result += "<td>";
	result += " C<sub>a,min</sub> &lt; 1.5 h<sub>ef</sub>,";
	result += "</td>";
	result += "</tr></table>";
	result += "<table><tr>";
	result += "<td>";
	result += "&psi;<sub>ed,N</sub> = 0.7 + 0.3 C<sub>a,min</sub> / ( 1.5 h<sub>ef</sub> ) = " + psiedn.toFixed(2);
	result += "</td>";
    }


    result += "</tr></table>";


    // --------------------------------------------------
    // Modification factor
    result += "<h4> -- Modification factor based on presence or absence of cracks in concrete and RF.;";
    result += " &psi;<sub>c,N</sub> = " + psicn;
    result += "</h4>";

    // --------------------------------------------------
    // Modification factor

    var cac = 4.0*hef;
    var pcpn;

    result += "<h4> -- Modification factor where c<sub>a,min</sub> &lt c<sub>ac</sub>;";
    result += " &psi;<sub>cp,N</sub></h4>";

    result += "<table><tr>";

    result += "<td>";
    result += 'c<sub>ac</sub> = 4 h<sub>ef</sub> (Displacement-controlled anchors ) = ';
    result += "</td>";
    result += "<td>";
    result += cac.toFixed(0) + 'mm, &nbsp;&nbsp;&nbsp;';
    result += "</td>";


    result += "<td>";
    result += "  &psi;<sub>cp,N</sub> =";
    result += "</td>";


    if ( camin >= cac ) {
	pcpn = 1.0;
	result += "<td>";
	result += pcpn.toFixed(2);
	result += "</td>";
	result += "<td>";
	result += " ( c<sub>a,min</sub> &gt c<sub>ac</sub> )";
	result += "</td>";
    }
    else{
	pcpn = 1.0;
	result += "<td>";
	result += pcpn.toFixed(2);
	result += "</td>";
	result += "<td>";
	result += " ( c<sub>a,min</sub> &lt c<sub>ac</sub> )";
	result += "</td>";
    }
    result += "<td>";

    if( pcpn < 1.5*hef/cac ){
	pcpn = 1.5*hef/cac;
    }
    result += " ---> " + pcpn.toFixed(2);
    result += "</td>";
    result += "</tr></table>";



    //--------------------------------------------------
    result += "<h4> -- Nominal concrete breakout strength;";
    result += " N<sub>cb</sub></h4>";

    result += "<table><tr>";
    result += "<td>";
    result += "A<sub>Nc</sub> / A<sub>Nco</sub> = ";
    result += "</td>";
    result += "<td>";
    result += (anc/anco).toFixed(2);
    result += "</td>";
    result += "</tr></table>";

    if( na == 1 && ma == 1){
	result += "<table><tr>";
	result += "<td>";
	result += "  N<sub>cb</sub> =  ( A<sub>Nc</sub> / A<sub>Nco</sub> ) &psi;<sub>ed,N</sub> &psi;<sub>c,N</sub> &psi;<sub>cp,N</sub> N<sub>b</sub> = ";
	result += (anc/anco).toFixed(2) + " x " + psiedn.toFixed(2) + " x " + (1.0*psicn).toFixed(2) + " x " + pcpn.toFixed(2) + " x " + nb.toFixed(2) + " = ";
	result += "</td>";
	result += "<td>";

	var ncb;
	ncb = (avc/avco) * psiedn * psicn * pcpn * nb;
	result += ncb.toFixed(2);
	result += "</td>";
	result += "<td>";
	result += " kN";
	result += "</td>";
	result += "</tr></table>";

    }

    // Group Anchor
    else{
	result += "<table><tr>";
	result += "<td>";
	result += "  N<sub>cb</sub> = ( A<sub>Nc</sub> / A<sub>Nco</sub> ) ";
	result += "&psi;<sub>ec,N</sub> &psi;<sub>ed,N</sub> &psi;<sub>c,N</sub> &psi;<sub>cp,N</sub> N<sub>b</sub> = ";
	result += (anc/anco).toFixed(2) + " x " + psiecn.toFixed(2) + " x " +psiedn.toFixed(2) + " x " + psicn + " x " + pcpn.toFixed(2) + " x " + nb.toFixed(2) + " = ";
	result += "</td>";
	result += "<td>";
	var ncb;
	ncb = (anc/anco) * psiecn * psiedn * psicn * pcpn * nb;
	result += ncb.toFixed(2);
	result += "</td>";
	result += "<td>";
	result += " kN";
	result += "</td>";
	result += "</tr></table>";

    }

    result += "</p>";

    //--------------------------------------------------
    result += "<p>";
    result += "<h3> - Pullout strength of anchor in tension</h3>";

    result += "<h4> -- Pullout strength in tension of a single hooked bolt; N<sub>p</sub></h4>";

    var np;
    var kkk;
    kkk = eh/da;
    if( eh > 4.5*da ){
	eh = 4.5*da;
	kkk = 4.5;
    }
    np = 0.9 * fc * eh * da;
    np = np/1000.0;

    result += "<table><tr>";
    result += "<td>";
    result += " N<sub>p</sub> = 0.9 f<sub>c</sub> e<sub>h</sub> d<sub>a</sub> =";
    result += "</td>";
    result += "<td>";
    result += (np).toFixed(2);
    result += "</td>";
    result += "<td>";
    if( kkk == 4.5 ){
	result += " kN ( where, e<sub>h</sub> = 4.5 d<sub>a</sub> control )";
    }else{
	result += " kN";
    }
    result += "</td>";
    result += "</tr>";
    result += "</table>";

    // --------------------------------------------------
    //
    result += "<h4> -- Nominal pullout strength of a single anchor in tension; N<sub>pn</sub> </h4>";

    var npn = np*na*ma;

    result += "<table><tr>";
    result += "<td>";
    result += " N<sub>pn</sub> = &psi;<sub>c,P</sub> N<sub>p</sub> m<sub>a</sub> n<sub>a</sub> =";
    result += "</td>";
    result += "<td>";
    result += (npn).toFixed(2);
    result += "</td>";
    result += "<td>";
    result += " kN (&psi;<sub>c,P</sub> = 1.0 - Cracking at service load levels )";
    result += "</td>";
    result += "</tr>";
    result += "</table>";

    //--------------------------------------------------
    /*
    result += "<p>";
    result += "<h3> - Concrete side-face blowout strength of  a headed anchor in tensiotn</h3>";

    result += "<h4> -- Nominal side-face blowout strength for a single anchor; N<sub>sb</sub> </h4>";

    var nsb;
    nsb = ( 13 * camin * Math.sqrt( 3.141592* Math.pow(da/2.0,2) ) ) * lamda * Math.sqrt(fc);
    nsb = nsb/1000.0;


    result += "<table><tr>";
    result += "<td>";
    result += " c<sub>a,max</sub> = ";
    result += "</td>";
    result += "<td>";
    result +=  (1.0*camax).toFixed(0);
    result += "</td>";
    result += "<td>";
    result += " mm";
    result += "</td>";

    result += "<td>";
    result += " c<sub>a,min</sub> = ";
    result += "</td>";
    result += "<td>";
    result +=  camin.toFixed(0);
    result += "</td>";
    result += "<td>";
    result += " mm";
    result += "</td>";

    var factor = 1.0;
    if ( camax < 3.0*camin ){
	factor = (1.0 + 1.0*camax/camin )/4.0;
	result += "<td>";
	result += " &nbsp; -> &alpha; = ( 1 + c<sub>a,max</sub> / c<sub>a,min</sub> ) / 4 = ";
	result += "</td>";
	result += "<td>";
	result +=  factor.toFixed(2);
	result += "</td>";
    }
    else{
	result += "<td>";
	result += " &nbsp; -> &alpha; = 1.0 ";
	result += "</td>";
    }

    nsb = factor*nsb;
    result += "</tr>";
    result += "</table>";

    result += "<table><tr>";
    result += "<td>";
    result += " N<sub>sb</sub> = &alpha; ( 13 c<sub>a,min</sub> &radic; A<sub>brg</sub> &lambda; &radic; f<sub>c</sub> = ";
    result += "</td>";
    result += "<td>";
    result += (nsb).toFixed(2);
    result += "</td>";
    result += "<td>";
    result += " kN ( where, A<sub>brg</sub> = &pi; ( d<sub>a</sub> / 2 )<sup>2</sup> )";
    result += "</td>";
    result += "</tr>";
    result += "</table>";

    // --------------------------------------------------

    if( na >=2 || ma >=2 ){
	result += "<h4> -- Nominal side-face blowout strength for multiple anchor; N<sub>sbg</sub> </h4>";
	var nsbg;
	nsbg = (1+spaacc/(6.0*camax))*nsb;

	result += "<table><tr>";
	result += "<td>";
	result += " N<sub>sbg</sub> = ( 1 + s / ( 6 c<sub>a1</sub> ) ) N<sub>sb</sub> = ";
	result += "</td>";
	result += "<td>";
	result += (nsbg).toFixed(2);
	result += "</td>";
	result += "<td>";
	result += " kN ";
	result += "</td>";
	result += "</tr>";
	result += "</table>";
    }
     */
    // --------------------------------------------------
    result += "<h3> - Capacity Check;</h3>";

    var nn;

    nn = Math.min(ncb,npn);

    result += "<table><tr>";
    result += "<td>";
    result += " N<sub>n</sub> = Min[ N<sub>cb</sub>, N<sub>pn</sub> ] = ";
    result += "</td>";
    result += "<td>";
    result +=  nn.toFixed(2);
    result += "</td>";
    result += "<td>";
    result += "kN";
    result += "</td>";
    result += "</tr>";
    result += "</table>";

    result += "<table><tr>";
    result += "<td>";
    result += " &phi; N<sub>n</sub> = ";
    result += "</td>";
    result += "<td>";
    result +=  phi + " x " + nn.toFixed(2) + " = ";
    result += "</td>";
    result += "<td>";
    result +=  (phi*nn).toFixed(2);
    result += "</td>";
    result += "<td>";
    result += "kN";
    result += "</td>";
    result += "</tr>";
    result += "</table>";

    result += "<table><tr>";
    result += "<td>";
    result += " &phi; N<sub>n</sub> / N<sub>u</sub> = ";
    result += "</td>";
    result += "<td>";
    result += (phi*nn).toFixed(2) + " / " + vu + " = ";
    result += "</td>";
    result += "<td>";
    var safety = phi*nn/vu;
    result +=  safety.toFixed(2);
    result += "</td>";
    result += "</tr>";
    result += "</table>";

    result += '<p Align="right" style="color:red;">';

    if( safety > 1.0 ){
	result += "<b>-----OK</b>";
    }
    else{
	result += "<b>-----NG</b>";
    }


    // --------------------------------------------------
    // --------------------------------------------------
    // END

    result += "</p>";


    document.getElementById('result').innerHTML = result;
    //    });
    DrawSec(inputform);
    //})();

}


// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------


function DrawSec (form) {

    ca1 = Number(form.ca1.value);
    ca2 = Number(form.ca2.value);
    ca3 = Number(form.ca3.value);
    ca4 = Number(form.ca4.value);

    hef = Number(form.hef.value);

    s = Number(form.s.value);
    sm = Number(form.sm.value);

    na = Number(form.na.value);
    ma = Number(form.ma.value);

    dia = Number(form.da.value);
    //    var da = document.inputform.da.value;
    //    var result = dia;
    //    document.getElementById('result').innerHTML = result;

    var b;
//    b = 2.0*ca1;
    b = ca1+ sm*(ma-1) + ca4;

    var h;
    h = ca2 + s*(na-1) + ca3;

    var cover;
    cover = Number(form.ca1.value);

    var result = '<canvas width=\"260\" height=\"235\" id=\"picCanvas\"></canvas>';
    document.getElementById('picture').innerHTML = result;

    canvas = document.getElementById('picCanvas');
    ctx = canvas.getContext("2d");

    xcen = canvas.width / 2 - 35;
    ycen = canvas.height / 2 + 20;

    xscale = (canvas.width-110)/b;
    yscale = (canvas.height-80)/h;
    scale = (xscale < yscale) ? xscale : yscale;

    // Draw Beam Section
    ctx.beginPath();
    ctx.rect(xcen-b/2*scale,ycen-h/2*scale,b*scale,h*scale);        // Mod b -> 100*b
    ctx.fillStyle = "rgb(242,244,255)";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Draw Dimension Lines
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.font = "12pt sans-serif";
    ctx.textAlign = "center";

    // Draw Beam Dimensions
    // Draw ca1
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale,ycen-h/2*scale-10);
    ctx.lineTo(xcen-b/2*scale,ycen-h/2*scale-30);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale+ca1*scale,ycen-h/2*scale-10);
    ctx.lineTo(xcen-b/2*scale+ca1*scale,ycen-h/2*scale-30);
    ctx.stroke();
    drawLineArrow2(xcen-b/2*scale,ycen-h/2*scale-20,xcen-b/2*scale+ca1*scale,ycen-h/2*scale-20);
    ctx.fillText('Ca1',xcen-b/4*scale-20,ycen-h/2*scale-40);

    // Draw ca4
    ctx.beginPath();
    ctx.moveTo(xcen+b/2*scale,ycen-h/2*scale-10);
    ctx.lineTo(xcen+b/2*scale,ycen-h/2*scale-30);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen+b/2*scale-ca4*scale,ycen-h/2*scale-10);
    ctx.lineTo(xcen+b/2*scale-ca4*scale,ycen-h/2*scale-30);
    ctx.stroke();
    drawLineArrow2(xcen+b/2*scale,ycen-h/2*scale-20,xcen+b/2*scale-ca4*scale,ycen-h/2*scale-20);
    ctx.fillText('Ca4',xcen+b/4*scale+20,ycen-h/2*scale-40);

    // Draw Rc width
    ctx.beginPath();
    ctx.moveTo(xcen-b/2*scale,ycen+h/2*scale+10);
    ctx.lineTo(xcen-b/2*scale,ycen+h/2*scale+30);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen+b/2*scale,ycen+h/2*scale+10);
    ctx.lineTo(xcen+b/2*scale,ycen+h/2*scale+30);
    ctx.stroke();
    drawLineArrow2(xcen-b/2*scale,ycen+h/2*scale+15,xcen+b/2*scale,ycen+h/2*scale+15);
    ctx.fillText(ca1+sm*(ma-1)+ca4,xcen+b/2*scale+30,ycen+h/2*scale+18);



    //
    ctx.beginPath();
    ctx.moveTo(xcen+b/2*scale+10,ycen-h/2*scale);
    ctx.lineTo(xcen+b/2*scale+30,ycen-h/2*scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xcen+b/2*scale+10,ycen+h/2*scale);
    ctx.lineTo(xcen+b/2*scale+30,ycen+h/2*scale);
    ctx.stroke();

    drawLineArrow2(xcen+b/2*scale+20,ycen-h/2*scale,xcen+b/2*scale+20,ycen+h/2*scale);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(h,xcen+b/2*scale+30,ycen);

    drawLineArrow2(xcen+10, ycen-h/2*scale, xcen+10, ycen-h/2*scale+ca2*scale);
    /*
    if( na >= 2 ){
	for( var i = 2; i <= na; i++ )
	{
	    drawLineArrow2(xcen+10,ycen-h/2*scale+ca2*scale + s*(i-2)*scale , xcen+10, ycen-h/2*scale+ca2*scale + s*(i-1)*scale);
	}
    }
    */
    drawLineArrow2(xcen+10,ycen-h/2*scale+ca2*scale + s*(na-1)*scale , xcen+10, ycen-h/2*scale+ca2*scale + s*(na-1)*scale + ca3*scale);

    ctx.fillText('Ca2',xcen+b/8*scale,ycen-h/2*scale+10);
    ctx.fillText('Ca3',xcen+b/8*scale,ycen+h/2*scale-10);


    // Draw Rebar
    ctx.fillStyle = "blue";
    ctx.beginPath();
    //	ctx.arc(xcen+Steel[i].x*scale,ycen+Steel[i].y*scale,Steel[i].dia/2*scale,0,2*Math.PI,true);
    ctx.arc(xcen-b/2*scale+ca1*scale,ycen-h/2*scale+ca2*scale,dia/2*scale,0,2*Math.PI,true);

    if( na >= 2 ){
	for( var i = 1; i <= na; i++ ) {
	    ctx.arc(xcen-b/2*scale+ca1*scale,ycen-h/2*scale+ca2*scale+(i-1)*s*scale,dia/2*scale,0,2*Math.PI,true);
	}
    }

    ctx.fill();

    if( ma >= 2 ){

	for( var j = 1; j<= ma; j++ ) {
	    ctx.beginPath();
	    ctx.arc(xcen-b/2*scale+ca1*scale+sm*(j-1)*scale,ycen-h/2*scale+ca2*scale,dia/2*scale,0,2*Math.PI,true);

	    if( na >= 2 ){
		for( i = 1; i <= na; i++ ) {
		    ctx.arc(xcen-b/2*scale+ca1*scale+sm*(j-1)*scale,ycen-h/2*scale+ca2*scale+(i-1)*s*scale,dia/2*scale,0,2*Math.PI,true);
		}
	    }
	    ctx.fill();
	}

    }



    /*
    // Draw Failure Surface
    ctx.fillStyle = "rgba(155,187,889,0.3)";
    ctx.beginPath();
    ctx.moveTo(xcen,ycen-h/2*scale+ca2*scale);
    ctx.lineTo(xcen-b/2*scale,ycen-h/2*scale+ca2*scale+1.5*ca1*scale);
    ctx.lineTo(xcen-b/2*scale,ycen-h/2*scale+ca2*scale-1.5*ca1*scale);
    ctx.closePath();
    ctx.fill();
    if( na >= 2 ){
	for( var i = 1; i <= na; i++ ) {
	    ctx.beginPath();
	    ctx.moveTo(xcen,ycen-h/2*scale+ca2*scale+(i-1)*s*scale);
	    ctx.lineTo(xcen-b/2*scale,ycen-h/2*scale+ca2*scale+1.5*ca1*scale+(i-1)*s*scale);
	    ctx.lineTo(xcen-b/2*scale,ycen-h/2*scale+ca2*scale-1.5*ca1*scale+(i-1)*s*scale);
	    ctx.closePath();
	    ctx.fill();
	}
    }
     */

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
