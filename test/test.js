import { AddressParser } from "../src/address";
import assert from "assert";

describe('Validate addresses',  () => {

  const ca_addresses = {
    "8483 San Pablo Street Gloucester, ON K1B 1L8": {
      unit_number: "8483",
      street: "San Pablo",
      type: "St",
      city: "Gloucester",
      state: "ON",
      fsa: "K1B",
      ldu: "1L8",
    },
    "19 Miller Rd. Keswick, ON L4P 1L1": {
      unit_number: "19",
      street: "Miller",
      type: "Rd",
      city: "Keswick",
      state: "ON",
      fsa: "L4P",
      ldu: "1L1"
    },
    "177 Corona Street Mont-Joli, QC G5H 2Y5": {
      unit_number: "177",
      street: "Corona",
      type: "St",
      city: "Mont-Joli",
      state: "QC",
      fsa: "G5H",
      ldu: "2Y5"
    },
    "68 N Gonzales Lane Vancouver, BC V5K 5A8": {
      unit_number: "68",
      prefix: "N",
      street: "Gonzales",
      type: "Lane",
      city: "Vancouver",
      state: "BC",
      fsa: "V5K",
      ldu: "5A8"
    },
    // Test apparent multiple street types
    // place + st
    "19 Errol place St. John's NL A1A 5H6": {
      unit_number: "19",
      street: "Errol",
      type: "Pl",
      city: "St. John's",
      state: "NL",
      fsa: "A1A",
      ldu: "5H6"
    },
    // station + rue
    "1325 Takahana station Rue Paris AB T5T 1E5": {
      unit_number: "1325",
      street: "Takahana",
      type: "Sta",
      city: "Rue Paris",
      state: "AB",
      fsa: "T5T",
      ldu: "1E5"
    },
    "14205 96 Ave NW NW Edmonton AB T5N 0C2": {
      unit_number: "14205",
      street: "96",
      type: "Ave",
      suffix: "NW",
      city: "Northwest Edmonton",
      state: "AB",
      fsa: "T5N",
      ldu: "0C2"
    },
    "1 Argyle St. L'Île-Des-Soeurs, QC H3E 5T5": {
      unit_number: "1",
      street: "Argyle",
      type: "St",
      city: "L'Île-Des-Soeurs",
      state: "QC",
      fsa: "H3E",
      ldu: "5T5"
    },
    "10-123 1/2 main st nw Montréal, QC H3Z 2Y7": {
      unit_number: "10-123",
      civic_number_suffix: "1/2",
      street: "main",
      type: "St",
      suffix: "nw",
      city: "Montréal",
      state: "QC",
      fsa: "H3Z",
      ldu: "2Y7"
    },
    "64 Cumberland Cres St. John's NL A1B 3M5": {
      unit_number: "64",
      street: "Cumberland",
      type: "Cres",
      city: "St. John's",
      state: "NL",
      fsa: "A1B",
      ldu: "3M5"
    }
  };

  const us_addresses = {
    '1005 Gravenstein Hwy 95472': {
      number: '1005',
      street: 'Gravenstein',
      type: 'Hwy',
      zip: '95472'
    },
    '1005 Gravenstein Hwy, 95472': {
      number: '1005',
      street: 'Gravenstein',
      type: 'Hwy',
      zip: '95472'
    },
    '1005 Gravenstein Hwy N, 95472': {
      number: '1005',
      street: 'Gravenstein',
      type: 'Hwy',
      suffix: 'N',
      zip: '95472'
    },
    '1005 Gravenstein Highway North, 95472': {
      number: '1005',
      street: 'Gravenstein',
      type: 'Hwy',
      suffix: 'N',
      zip: '95472'
    },
    '1005 N Gravenstein Highway, Sebastopol, CA': {
      number: '1005',
      prefix: 'N',
      street: 'Gravenstein',
      type: 'Hwy',
      city: 'Sebastopol',
      state: 'CA'
    },
    '1005 N Gravenstein Highway, Suite 500, Sebastopol, CA': {
      number: '1005',
      prefix: 'N',
      street: 'Gravenstein',
      type: 'Hwy',
      sec_unit_type: 'Suite',
      sec_unit_num: '500',
      city: 'Sebastopol',
      state: 'CA'
    },
    '1005 N Gravenstein Hwy Suite 500 Sebastopol, CA': {
      number: '1005',
      prefix: 'N',
      street: 'Gravenstein',
      type: 'Hwy',
      sec_unit_type: 'Suite',
      sec_unit_num: '500',
      city: 'Sebastopol',
      state: 'CA'
    },
    '1005 N Gravenstein Highway, Sebastopol, CA, 95472': {
      number: '1005',
      prefix: 'N',
      street: 'Gravenstein',
      type: 'Hwy',
      city: 'Sebastopol',
      state: 'CA',
      zip: '95472'
    },
    '1005 N Gravenstein Highway Sebastopol CA 95472': {
      number: '1005',
      prefix: 'N',
      street: 'Gravenstein',
      type: 'Hwy',
      city: 'Sebastopol',
      state: 'CA',
      zip: '95472'
    },
    '1005 Gravenstein Hwy N Sebastopol CA': {
      number: '1005',
      street: 'Gravenstein',
      type: 'Hwy',
      suffix: 'N',
      city: 'Sebastopol',
      state: 'CA'
    },
    '1005 Gravenstein Hwy N, Sebastopol CA': {
      number: '1005',
      street: 'Gravenstein',
      type: 'Hwy',
      suffix: 'N',
      city: 'Sebastopol',
      state: 'CA'
    },
    '1005 Gravenstein Hwy, N Sebastopol CA': {
      number: '1005',
      street: 'Gravenstein',
      type: 'Hwy',
      city: 'North Sebastopol',
      state: 'CA'
    },
    '1005 Gravenstein Hwy, North Sebastopol CA': {
      number: '1005',
      street: 'Gravenstein',
      type: 'Hwy',
      city: 'North Sebastopol',
      state: 'CA'
    },
    '1005 Gravenstein Hwy Sebastopol CA': {
      number: '1005',
      street: 'Gravenstein',
      type: 'Hwy',
      city: 'Sebastopol',
      state: 'CA'
    },
    '115 Broadway San Francisco CA': {
      number: '115',
      street: 'Broadway',
      city: 'San Francisco',
      state: 'CA'
    },
    '7800 Mill Station Rd, Sebastopol, CA 95472': {
      number: '7800',
      street: 'Mill Station',
      type: 'Rd',
      city: 'Sebastopol',
      state: 'CA',
      zip: '95472'
    },
    '7800 Mill Station Rd Sebastopol CA 95472': {
      number: '7800',
      street: 'Mill Station',
      type: 'Rd',
      city: 'Sebastopol',
      state: 'CA',
      zip: '95472'
    },
    '1005 State Highway 116 Sebastopol CA 95472': {
      number: '1005',
      street: 'State Highway 116',
      city: 'Sebastopol',
      state: 'CA',
      zip: '95472'
    },
    '1600 Pennsylvania Ave. Washington DC': {
      number: '1600',
      street: 'Pennsylvania',
      type: 'Ave',
      city: 'Washington',
      state: 'DC'
    },
    '1600 Pennsylvania Avenue Washington DC': {
      number: '1600',
      street: 'Pennsylvania',
      type: 'Ave',
      city: 'Washington',
      state: 'DC'
    },
    '48S 400E, Salt Lake City UT': {
      number: '48',
      prefix: 'S',
      street: '400',
      suffix: 'E',
      city: 'Salt Lake City',
      state: 'UT'
    },
    '550 S 400 E #3206, Salt Lake City UT 84111': {
      number: '550',
      prefix: 'S',
      street: '400',
      suffix: 'E',
      sec_unit_type: '#',
      sec_unit_num: '3206',
      city: 'Salt Lake City',
      state: 'UT',
      zip: '84111'
    },
    '6641 N 2200 W Apt D304 Park City, UT 84098': {
      number: '6641',
      prefix: 'N',
      street: '2200',
      suffix: 'W',
      sec_unit_type: 'Apt',
      sec_unit_num: 'D304',
      city: 'Park City',
      state: 'UT',
      zip: '84098'
    },
    '100 South St, Philadelphia, PA': {
      number: '100',
      street: 'South',
      type: 'St',
      city: 'Philadelphia',
      state: 'PA'
    },
    '100 S.E. Washington Ave, Minneapolis, MN': {
      number: '100',
      prefix: 'SE',
      street: 'Washington',
      type: 'Ave',
      city: 'Minneapolis',
      state: 'MN'
    },
    '3813 1/2 Some Road, Los Angeles, CA': {
      number: '3813',
      street: 'Some',
      type: 'Rd',
      city: 'Los Angeles',
      state: 'CA'
    },
    'Mission & Valencia San Francisco CA': {
      street1: 'Mission',
      street2: 'Valencia',
      city: 'San Francisco',
      state: 'CA',
      type2: '',
      type1: ''
    },
    'Mission & Valencia, San Francisco CA': {
      street1: 'Mission',
      street2: 'Valencia',
      city: 'San Francisco',
      state: 'CA',
      type2: '',
      type1: ''
    },
    'Mission St and Valencia St San Francisco CA': {
      street1: 'Mission',
      type1: 'St',
      street2: 'Valencia',
      type2: 'St',
      city: 'San Francisco',
      state: 'CA'
    },
    'Mission St and Valencia St': {
      street1: 'Mission',
      type1: 'St',
      street2: 'Valencia',
      type2: 'St'
    },
    'Mission St & Valencia St San Francisco CA': {
      street1: 'Mission',
      type1: 'St',
      street2: 'Valencia',
      type2: 'St',
      city: 'San Francisco',
      state: 'CA'
    },
    'Mission and Valencia Sts San Francisco CA': {
      street1: 'Mission',
      street2: 'Valencia',
      type2: 'St',
      city: 'San Francisco',
      state: 'CA',
      type1: 'St'
    },
    'Mission & Valencia Sts. San Francisco CA': {
      street1: 'Mission',
      street2: 'Valencia',
      type2: 'St',
      city: 'San Francisco',
      state: 'CA',
      type1: 'St'
    },
    'Mission and Valencia Sts.': {
      street1: 'Mission',
      type1: 'St',
      street2: 'Valencia',
      type2: 'St'
    },
    'Mission & Valencia Streets San Francisco CA': {
      street1: 'Mission',
      street2: 'Valencia',
      type2: 'St',
      city: 'San Francisco',
      state: 'CA',
      type1: 'St'
    },
    'Mission Avenue and Valencia Street San Francisco CA': {
      street1: 'Mission',
      type1: 'Ave',
      street2: 'Valencia',
      type2: 'St',
      city: 'San Francisco',
      state: 'CA'
    },
    '1 First St, e San Jose CA': {
      number: '1',
      street: 'First',
      type: 'St',
      city: 'East San Jose',
      state: 'CA'
    },
    '123 Maple Rochester, New York': {
      number: '123',
      street: 'Maple',
      city: 'Rochester',
      state: 'NY'
    },
    '233 S Wacker Dr 60606-6306': {
      number: '233',
      prefix: 'S',
      street: 'Wacker',
      type: 'Dr',
      zip: '60606',
      plus4: '6306'
    },
    '233 S Wacker Dr 606066306': {
      number: '233',
      prefix: 'S',
      street: 'Wacker',
      type: 'Dr',
      zip: '60606',
      plus4: '6306'
    },
    '233 S Wacker Dr 60606 6306': {
      number: '233',
      prefix: 'S',
      street: 'Wacker',
      type: 'Dr',
      zip: '60606',
      plus4: '6306'
    },
    'S Wacker Dr 60606 6306': {
      prefix: 'S',
      street: 'Wacker',
      type: 'Dr',
      zip: '60606',
      plus4: '6306'
    },
    '233 S Wacker Dr lobby 60606': {
      number: '233',
      prefix: 'S',
      street: 'Wacker',
      type: 'Dr',
      sec_unit_type: 'lobby',
      zip: '60606'
    },
    '(233 S Wacker Dr lobby 60606)': {
      number: '233',
      prefix: 'S',
      street: 'Wacker',
      type: 'Dr',
      sec_unit_type: 'lobby',
      zip: '60606'
    },
    '#42 233 S Wacker Dr 60606': {
      sec_unit_type: '#',
      sec_unit_num: '42',
      number: '233',
      prefix: 'S',
      street: 'Wacker',
      type: 'Dr',
      zip: '60606'
    },
    'lt42 99 Some Road, Some City LA': {
      sec_unit_type: 'lt',
      sec_unit_num: '42',
      number: '99',
      street: 'Some',
      type: 'Rd',
      city: 'Some City',
      state: 'LA'
    },
    '36401 County Road 43, Eaton, CO 80615': {
      number: '36401',
      street: 'County Road 43',
      city: 'Eaton',
      state: 'CO',
      zip: '80615'
    },
    '1234 COUNTY HWY 60E, Town, CO 12345': {
      number: '1234',
      street: 'COUNTY HWY 60',
      suffix: 'E',
      city: 'Town',
      state: 'CO',
      zip: '12345'
    },
    '321 S. Washington': {
      number: '321',
      prefix: 'S',
      street: 'Washington'
    },
    '\'45 Quaker Ave, Ste 105\'': {
      number: '45',
      street: 'Quaker',
      type: 'Ave',
      sec_unit_type: 'Ste',
      sec_unit_num: '105'
    },
    '2672 Industrial Row Troy, MI 48084': {
      number: '2672',
      street: 'Industrial',
      type: 'Row',
      city: 'Troy',
      state: 'MI',
      zip: '48084'
    },
    'Post office Box 3094 Collierville TN 38027': {
      sec_unit_type: 'Post office Box',
      sec_unit_num: '3094',
      city: 'Collierville',
      state: 'TN',
      zip: '38027'
    },
    'P.O. box 3094 Collierville TN 38027': {
      sec_unit_type: 'PO box',
      sec_unit_num: '3094',
      city: 'Collierville',
      state: 'TN',
      zip: '38027'
    },
    'POBox 3094 Collierville TN 38027': {
      sec_unit_type: 'POBox',
      sec_unit_num: '3094',
      city: 'Collierville',
      state: 'TN',
      zip: '38027'
    },
    'N95W18855 Jay Dr, Menomonee Falls, WI 53051': {
      number: 'N95W18855',
      street: 'Jay',
      type: 'Dr',
      city: 'Menomonee Falls',
      state: 'WI',
      zip: '53051'
    },
    'N95W18855 Jay Dr Menomonee Falls WI 53051': {
      number: 'N95W18855',
      street: 'Jay',
      type: 'Dr',
      city: 'Menomonee Falls',
      state: 'WI',
      zip: '53051'
    },
    'n95w18855 Jay Dr Menomonee Falls WI 53051': {
      number: 'n95w18855',
      street: 'Jay',
      type: 'Dr',
      city: 'Menomonee Falls',
      state: 'WI',
      zip: '53051'
    },
    '10144 Potters Hatch Cmn Cupertino CA 95014': {
      number: '10144',
      street: 'Potters Hatch',
      type: 'Cmn',
      city: 'Cupertino',
      state: 'CA',
      zip: '95014'
    },
    '10144 Potters Hatch Common Cupertino CA 95014': {
      number: '10144',
      street: 'Potters Hatch',
      type: 'Cmn',
      city: 'Cupertino',
      state: 'CA',
      zip: '95014'
    },
    '36 Hathway Commons Lebanon OH 45036': {
      number: '36',
      street: 'Hathway',
      type: 'Cmns',
      city: 'Lebanon',
      state: 'OH',
      zip: '45036'
    },
    '36 Hathway Cmns Lebanon OH 45036': {
      number: '36',
      street: 'Hathway',
      type: 'Cmns',
      city: 'Lebanon',
      state: 'OH',
      zip: '45036'
    },
    '174 Sunset Crossroad Deer Isle ME 04627': {
      number: '174',
      street: 'Sunset',
      type: 'Xrd',
      city: 'Deer Isle',
      state: 'ME',
      zip: '04627'
    },
    '174 Sunset Xrd Deer Isle ME 04627': {
      number: '174',
      street: 'Sunset',
      type: 'Xrd',
      city: 'Deer Isle',
      state: 'ME',
      zip: '04627'
    },
    '905 Laing Crossroads Dawson GA 39842': {
      number: '905',
      street: 'Laing',
      type: 'Xrds',
      city: 'Dawson',
      state: 'GA',
      zip: '39842'
    },
    '905 Laing Xrds Dawson GA 39842': {
      number: '905',
      street: 'Laing',
      type: 'Xrds',
      city: 'Dawson',
      state: 'GA',
      zip: '39842'
    },
    '9402 Sequoia Fall San Antonio TX 78251': {
      number: '9402',
      street: 'Sequoia',
      type: 'Fall',
      city: 'San Antonio',
      state: 'TX',
      zip: '78251'
    },
    '24411 Alamosa Fls San Antonio TX 78255': {
      number: '24411',
      street: 'Alamosa',
      type: 'Fls',
      city: 'San Antonio',
      state: 'TX',
      zip: '78255'
    },
    '24411 Alamosa Falls San Antonio TX 78255': {
      number: '24411',
      street: 'Alamosa',
      type: 'Fls',
      city: 'San Antonio',
      state: 'TX',
      zip: '78255'
    },
    '15235 Spring Land San Antonio TX 78247': {
      number: '15235',
      street: 'Spring',
      type: 'Land',
      city: 'San Antonio',
      state: 'TX',
      zip: '78247'
    },
    '2146 University Square Mall Tampa FL 33612': {
      number: '2146',
      street: 'University Square',
      type: 'Mall',
      city: 'Tampa',
      state: 'FL',
      zip: '33612'
    },
    '415 Van Wyck Mews Norfolk VA 23517': {
      number: '415',
      street: 'Van Wyck',
      type: 'Mews',
      city: 'Norfolk',
      state: 'VA',
      zip: '23517'
    },
    '22 Cumbres Pass Santa Fe New Mexico 87508': {
      number: '22',
      street: 'Cumbres',
      type: 'Pass',
      city: 'Santa Fe',
      state: 'NM',
      zip: '87508'
    },
    '6 Maison Rue Hattiesburg MS 39402': {
      number: '6',
      street: 'Maison',
      type: 'Rue',
      city: 'Hattiesburg',
      state: 'MS',
      zip: '39402'
    },
    '12921 Coyote Run Fishers IN 46038': {
      number: '12921',
      street: 'Coyote',
      type: 'Run',
      city: 'Fishers',
      state: 'IN',
      zip: '46038'
    },
    '2974 London Wall Bloomfield Hills MI 48304': {
      number: '2974',
      street: 'London',
      type: 'Wall',
      city: 'Bloomfield Hills',
      state: 'MI',
      zip: '48304'
    }
  };

  it('should get same result from canadian address_scenarios when parsing strings', done => {
    const parser = new AddressParser("ca");
    Object.keys(ca_addresses).forEach(function (k) {
      var parsed = parser.parseLocation(k);
      assert.deepEqual(
        ca_addresses[k],
        parsed,
        k +
          " was not correctly applied. " +
          " Expected: " +
          JSON.stringify(ca_addresses[k], null, 4) +
          " Result: " +
          JSON.stringify(parsed, null, 4)
      );
    });
    done();
  });

  it('should parse address only with street city and province', done => {
    const parser = new AddressParser("ca");
    const small_address = 'Pascoe Road Sooke BC';
    var parsed = parser.parseLocation(small_address);
    const expected_parsed = {
      street: "Pascoe",
      type: "Rd",
      city: "Sooke",
      state: "BC"
    };
    assert.deepEqual(
      parsed,
      expected_parsed,
      small_address +
        " was not correctly applied. " +
        " Expected: " +
        JSON.stringify(parsed, null, 4) +
        " Result: " +
        JSON.stringify(expected_parsed, null, 4)
    );
    done();
  });

  it('should parse address with civic number suffix', done => {
    const parser = new AddressParser("ca");
    const small_address = '10-123 1/2 main st nw Montréal, QC H3Z 2Y7';
    var parsed = parser.parseLocation(small_address);
    const expected_parsed = {
      unit_number: "10-123",
      civic_number_suffix: "1/2",
      street: "main",
      type: "St",
      suffix: "nw",
      city: "Montréal",
      state: "QC",
      fsa: "H3Z",
      ldu: "2Y7"
    };
    assert.deepEqual(
      parsed,
      expected_parsed,
      small_address +
        " was not correctly applied. " +
        " Expected: " +
        JSON.stringify(parsed, null, 4) +
        " Result: " +
        JSON.stringify(expected_parsed, null, 4)
    );
    done();
  });

  it('should parse address with a letter as civic number suffix', done => {
    const parser = new AddressParser("ca");
    const small_address = '10-123A main st nw Montréal, QC H3Z 2Y7';
    var parsed = parser.parseLocation(small_address);
    const expected_parsed = {
      unit_number: "10-123",
      civic_number_suffix: "A",
      street: "main",
      type: "St",
      suffix: "nw",
      city: "Montréal",
      state: "QC",
      fsa: "H3Z",
      ldu: "2Y7"
    };
    assert.deepEqual(
      parsed,
      expected_parsed,
      small_address +
        " was not correctly applied. " +
        " Expected: " +
        JSON.stringify(expected_parsed, null, 4) +
        " Result: " +
        JSON.stringify(parsed, null, 4)
    );
    done();
  });

  it('should parse address with sec unit basement', done => {
    const parser = new AddressParser("ca");
    const small_address = 'BSMT 12 Eastwood place st albert, AB';
    var parsed = parser.parseLocation(small_address);
    const expected_parsed = {
      unit_number: "12",
      sec_unit_type: "BSMT",
      street: "Eastwood",
      type: "Pl",
      city: "st albert",
      state: "AB"
    };
    assert.deepEqual(
      parsed,
      expected_parsed,
      small_address +
        " was not correctly applied. " +
        " Expected: " +
        JSON.stringify(expected_parsed, null, 4) +
        " Result: " +
        JSON.stringify(parsed, null, 4)
    );
    done();
  });

  it('should parse address with numeric street', done => {
    const parser = new AddressParser("ca");
    const small_address = '10-123 36A st montreal, QC H3Z 2Y7';
    var parsed = parser.parseLocation(small_address);
    const expected_parsed = {
      unit_number: "10-123",
      street: "36A",
      type: "St",
      city: "montreal",
      state: "QC",
      fsa: 'H3Z',
      ldu: '2Y7'
    };
    assert.deepEqual(
      parsed,
      expected_parsed,
      small_address +
        " was not correctly applied. " +
        " Expected: " +
        JSON.stringify(parsed, null, 4) +
        " Result: " +
        JSON.stringify(expected_parsed, null, 4)
    );
    done();
  });

  it('should get same result from us address_scenarios when parsing strings', done => {
    const parser = new AddressParser("us");
    Object.keys(us_addresses).forEach(function (k) {
      var parsed = parser.parseLocation(k);
      assert.deepEqual(
        us_addresses[k],
        parsed,
        k +
          " was not correctly applied. " +
          " Expected: " +
          JSON.stringify(us_addresses[k], null, 4) +
          " Result: " +
          JSON.stringify(parsed, null, 4)
      );
    });
    done();
  });
});
