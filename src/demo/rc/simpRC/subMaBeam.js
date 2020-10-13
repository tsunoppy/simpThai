////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
// Allowbale Moment Capacity
// 2017/10/06 Coded By Tsunoda
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
function subgma( fc, ft, n, dc1, gamma,
		 pt, b, d
	       )
{
    /* Function gmad(fc, ft, n, dc1, gamma, pt, b, d)  */
    /* fc   (N/mm2): Permissible Concrete Compressible Stress */
    /* ft   (N/mm2): Permissible Reinforcement Tensile Stress */
    /* n        (-): Yang Modulus Ratio (Steel/Concrete) */
    /* dc1      (-): Compressible Re-bar Location ---dc/d----*/
    /* γ        (-): Ratio of the Compressible to Tensile Re-bar (gamma 腹筋比 Ac/At)*/
    /* pt       (-): 引っ張り鉄筋比at/b/d*/
    /* b       (mm): Beam Width */
    /* d       (mm): Effective Beam Depth */
    /* judge       : 鉄筋orコンクリートのどちらで決まっているかを算定*/

    var xn1,c1,c2;
    var judge;
    var gma;

    var xn1 = Math.pow ( (n * (1.0 + gamma) - gamma) , 2.0) + 2.0 / pt * (n * (1.0 + gamma * dc1) - gamma * dc1);
    xn1 = pt * ( Math.pow( xn1 , 0.5) - (n * (1.0 + gamma) - gamma));
    var c1 = n * (1.0 - xn1) * (3.0 - xn1) - gamma * (n - 1) * (xn1 - dc1) * (3.0 * dc1 - xn1);
    c1 = c1 * pt * fc / (3.0 * xn1);
    var c2 = n * (1.0 - xn1) * (3.0 - xn1) - gamma * (n - 1) * (xn1 - dc1) * (3.0 * dc1 - xn1);
    c2 = c2 * pt * ft / (3.0 * n * (1.0 - xn1));

    if( c1 < c2 ){
	judge = 'C';
	gma = c1 * b * Math.pow( d , 2.0) / Math.pow( 10.0, 6.0);
    }
    if( c2 <= c1){
	judge = 'S';
	gma = c2 * b * Math.pow( d , 2.0) / Math.pow( 10.0, 6.0);
    }

    var x1 = gma;
    var j1 = judge;

    return [x1,j1];

}
