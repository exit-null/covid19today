let iso3 = {"AF":1,"AL":1,"DZ":1,"AD":1,"AO":1,"AI":1,"AG":1,"AR":1,"AM":1,"AW":1,"AU":1,"AT":1,"AZ":1,"BS":1,"BH":1,"BD":1,"BB":1,"BY":1,"BE":1,"BZ":1,"BJ":1,"BM":1,
"BT":1,"BO":1,"BA":1,"BW":1,"BR":1,"VG":1,"BN":1,"BG":1,"BF":1,"BI":1,"CV":1,"KH":1,"CM":1,"CA":1,"BQ":1,"KY":1,"CF":1,"TD":1,"JE":1,"CL":1,"CN":1,"CO":1,"KM":1,"CG":1,
"CR":1,"HR":1,"CU":1,"CW":1,"CY":1,"CZ":1,"CI":1,"CD":1,"DK":1,"DJ":1,"DM":1,"DO":1,"EC":1,"EG":1,"SV":1,"GQ":1,"ER":1,"EE":1,"ET":1,"FK":1,"FO":1,"FJ":1,"FI":1,
"FR":1,"GF":1,"PF":1,"GA":1,"GM":1,"GE":1,"DE":1,"GH":1,"GI":1,"GR":1,"GL":1,"GD":1,"GP":1,"GT":1,"GN":1,"GW":1,"GY":1,"HT":1,"VA":1,"HN":1,"HK":1,"HU":1,"IS":1,"IN":1,"ID":1,
"IR":1,"IQ":1,"IE":1,"IM":1,"IL":1,"IT":1,"JM":1,"JP":1,"JO":1,"KZ":1,"KE":1,"KW":1,"KG":1,"LA":1,"LV":1,"LB":1,"LS":1,"LR":1,"LY":1,"LI":1,"LT":1,"LU":1,"MO":1,"MK":1,"MG":1,
"MW":1,"MY":1,"MV":1,"ML":1,"MT":1,"MQ":1,"MR":1,"MU":1,"YT":1,"MX":1,"MD":1,"MC":1,"MN":1,"ME":1,"MS":1,"MA":1,"MZ":1,"MM":1,"NA":1,"NP":1,"NL":1,"NC":1,"NZ":1,"NI":1,"NE":1,
"NG":1,"NO":1,"OM":1,"PK":1,"PS":1,"PA":1,"PG":1,"PY":1,"PE":1,"PH":1,"PL":1,"PT":1,"QA":1,"RO":1,"RU":1,"RW":1,"RE":1,"KR":1,"KN":1,"LC":1,"MF":1,"PM":1,"VC":1,"SM":1,"ST":1,
"SA":1,"SN":1,"RS":1,"SC":1,"SL":1,"SG":1,"SX":1,"SK":1,"SI":1,"SO":1,"ZA":1,"SS":1,"ES":1,"LK":1,"BL":1,"SD":1,"SR":1,"SZ":1,"SE":1,"CH":1,"SY":1,"TW":1,"TJ":1,"TZ":1,"TH":1,
"TL":1,"TG":1,"TT":1,"TN":1,"TR":1,"TC":1,"AE":1,"GB":1,"US":1,"UG":1,"UA":1,"UY":1,"UZ":1,"VE":1,"VN":1,"EH":1,"YE":1,"ZM":1,"ZW":1};

let isValid = (ele) => iso3[ele] != null;
export default isValid;