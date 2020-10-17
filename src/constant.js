const STATE_NAMES = {
    AP: 'Andhra Pradesh',
    AR: 'Arunachal Pradesh',
    AS: 'Assam',
    BR: 'Bihar',
    CT: 'Chhattisgarh',
    GA: 'Goa',
    GJ: 'Gujarat',
    HR: 'Haryana',
    HP: 'Himachal Pradesh',
    JH: 'Jharkhand',
    KA: 'Karnataka',
    KL: 'Kerala',
    MP: 'Madhya Pradesh',
    MH: 'Maharashtra',
    MN: 'Manipur',
    ML: 'Meghalaya',
    MZ: 'Mizoram',
    NL: 'Nagaland',
    OR: 'Odisha',
    PB: 'Punjab',
    RJ: 'Rajasthan',
    SK: 'Sikkim',
    TN: 'Tamil Nadu',
    TG: 'Telangana',
    TR: 'Tripura',
    UT: 'Uttarakhand',
    UP: 'Uttar Pradesh',
    WB: 'West Bengal',
    AN: 'Andaman and Nicobar Islands',
    CH: 'Chandigarh',
    DN: 'Dadra and Nagar Haveli and Daman and Diu',
    DL: 'Delhi',
    JK: 'Jammu and Kashmir',
    LA: 'Ladakh',
    LD: 'Lakshadweep',
    PY: 'Puducherry',
    TT: 'Total',
    UN: 'Unassigned',
  };

  const STATE_NAMES_MAP = {
    AP: 'Andhra Pradesh',
    AR: 'Arunanchal Pradesh',
    AS: 'Assam',
    BR: 'Bihar',
    CT: 'Chhattisgarh',
    GA: 'Goa',
    GJ: 'Gujarat',
    HR: 'Haryana',
    HP: 'Himachal Pradesh',
    JH: 'Jharkhand',
    KA: 'Karnataka',
    KL: 'Kerala',
    MP: 'Madhya Pradesh',
    MH: 'Maharashtra',
    MN: 'Manipur',
    ML: 'Meghalaya',
    MZ: 'Mizoram',
    NL: 'Nagaland',
    OR: 'Odisha',
    PB: 'Punjab',
    RJ: 'Rajasthan',
    SK: 'Sikkim',
    TN: 'Tamil Nadu',
    TG: 'Telangana',
    TR: 'Tripura',
    UT: 'Uttarakhand',
    UP: 'Uttar Pradesh',
    WB: 'West Bengal',
    AN: 'Andaman and Nicobar',
    CH: 'Chandigarh',
    DN: 'Dadra and Nagar Haveli',
    DL: 'NCT of Delhi',
    JK: 'Jammu and Kashmir',
    LA: 'Ladakh',
    LD: 'Lakshadweep',
    PY: 'Puducherry',
    TT: 'Total',
    UN: 'Unassigned',
  };
  
const stateCodes = [];
const stateCodesMap = {};

Object.keys(STATE_NAMES).map((key, index) => {
  stateCodesMap[STATE_NAMES[key]] = key;
  stateCodes.push({code: key, name: STATE_NAMES[key]});
  return null;
});
const STATE_CODES = stateCodesMap;
const STATE_CODES_ARRAY = stateCodes;

// Source: Projected Populations (2019)
// National Commission on Population, "Population Projections for India and
// States (2011-2036)", Table-8 (p43), November 2019
// https://nhm.gov.in/New_Updates_2018/Report_Population_Projection_2019.pdf
const STATE_POPULATIONS = {
  AP: 52221000,
  AR: 1504000,
  AS: 34293000,
  BR: 119520000,
  CT: 28724000,
  GA: 1540000,
  GJ: 67936000,
  HR: 28672000,
  HP: 7300000,
  JH: 37403000,
  KA: 65798000,
  KL: 35125000,
  MP: 82232000,
  MH: 122153000,
  MN: 3103000,
  ML: 3224000,
  MZ: 1192000,
  NL: 2150000,
  OR: 43671000,
  PB: 29859000,
  RJ: 77264000,
  SK: 664000,
  TN: 75695000,
  TG: 37220000,
  TR: 3992000,
  UP: 224979000,
  UT: 11141000,
  WB: 96906000,
  AN: 397000,
  CH: 1179000,
  DN: 959000,
  DL: 19814000,
  JK: 13203000,
  LA: 293000,
  LD: 68000,
  PY: 1504000,
  TT: 1332900000,
};

const STATE_POPULATIONS_MIL = Object.keys(STATE_POPULATIONS).reduce(
  (res, stateCode) => {
    res[stateCode] = 1e-6 * STATE_POPULATIONS[stateCode];
    return res;
  },
  {}
);

const isValidStateId = (state) => STATE_NAMES_MAP[state] !== undefined;

module.exports = {
    STATE_CODES,
    STATE_CODES_ARRAY,
    STATE_POPULATIONS,
    STATE_POPULATIONS_MIL,
    STATE_NAMES,
    STATE_NAMES_MAP,
    isValidStateId
};