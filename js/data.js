(function(){

'use strict';

var places = [
  {
    "name": "New York city, New York",
    "population": 8336697,
    "location": [-74.0059731, 40.7143528]
  },
  {
    "name": "Los Angeles city, California",
    "population": 3857799,
    "location": [-118.2436849, 34.0522342]
  },
  {
    "name": "Chicago city, Illinois",
    "population": 2714856,
    "location": [-87.62979819999998, 41.8781136]
  },
  {
    "name": "Houston city, Texas",
    "population": 2160821,
    "location": [-95.36938959999998, 29.7601927]
  },
  {
    "name": "Philadelphia city, Pennsylvania",
    "population": 1547607,
    "location": [-75.16378900000001, 39.952335]
  },
  {
    "name": "Phoenix city, Arizona",
    "population": 1488750,
    "location": [-112.07403729999999, 33.4483771]
  },
  {
    "name": "San Antonio city, Texas",
    "population": 1382951,
    "location": [-98.49362819999999, 29.4241219]
  },
  {
    "name": "San Diego city, California",
    "population": 1338348,
    "location": [-117.15725509999999, 32.7153292]
  },
  {
    "name": "Dallas city, Texas",
    "population": 1241162,
    "location": [-96.80045109999998, 32.7801399]
  },
  {
    "name": "San Jose city, California",
    "population": 982765,
    "location": [-121.89495549999998, 37.3393857]
  },
  {
    "name": "Austin city, Texas",
    "population": 842592,
    "location": [-97.74306079999997, 30.267153]
  },
  {
    "name": "Jacksonville city, Florida",
    "population": 836507,
    "location": [-81.65565099999998, 30.3321838]
  },
  {
    "name": "Indianapolis city (balance), Indiana",
    "population": 834852,
    "location": [-86.07423310000001, 39.7704815]
  },
  {
    "name": "San Francisco city, California",
    "population": 825863,
    "location": [-122.41941550000001, 37.7749295]
  },
  {
    "name": "Columbus city, Ohio",
    "population": 809798,
    "location": [-82.99879420000002, 39.9611755]
  },
  {
    "name": "Fort Worth city, Texas",
    "population": 777992,
    "location": [-97.32084959999997, 32.725409]
  },
  {
    "name": "Charlotte city, North Carolina",
    "population": 775202,
    "location": [-80.84312669999997, 35.2270869]
  },
  {
    "name": "Detroit city, Michigan",
    "population": 701475,
    "location": [-83.0457538, 42.331427]
  },
  {
    "name": "El Paso city, Texas",
    "population": 672538,
    "location": [-106.4869314, 31.7587198]
  },
  {
    "name": "Memphis city, Tennessee",
    "population": 655155,
    "location": [-90.0489801, 35.1495343]
  },
  {
    "name": "Boston city, Massachusetts",
    "population": 636479,
    "location": [-71.0597732, 42.3584308]
  },
  {
    "name": "Seattle city, Washington",
    "population": 634535,
    "location": [-122.3320708, 47.6062095]
  },
  {
    "name": "Denver city, Colorado",
    "population": 634265,
    "location": [-104.98471790000002, 39.737567]
  },
  {
    "name": "Washington city, District of Columbia",
    "population": 632323,
    "location": [-77.0363658, 38.8951118]
  },
  {
    "name": "Nashville-Davidson metropolitan government (balance), Tennessee",
    "population": 624496,
    "location": [-86.78333329999998, 36.1666667]
  },
  {
    "name": "Baltimore city, Maryland",
    "population": 621342,
    "location": [-76.61218930000001, 39.2903848]
  },
  {
    "name": "Louisville/Jefferson County metro government (balance), Kentucky",
    "population": 605110,
    "location": [-85.75845570000001, 38.2526647]
  },
  {
    "name": "Portland city, Oregon",
    "population": 603106,
    "location": [-122.6762071, 45.5234515]
  },
  {
    "name": "Oklahoma City city, Oklahoma",
    "population": 599199,
    "location": [-97.51642759999999, 35.4675602]
  },
  {
    "name": "Milwaukee city, Wisconsin",
    "population": 598916,
    "location": [-87.90647360000003, 43.0389025]
  },
  {
    "name": "Las Vegas city, Nevada",
    "population": 596424,
    "location": [-115.17281600000001, 36.114646]
  },
  {
    "name": "Albuquerque city, New Mexico",
    "population": 555417,
    "location": [-106.60999099999998, 35.110703]
  },
  {
    "name": "Tucson city, Arizona",
    "population": 524295,
    "location": [-110.92647899999997, 32.2217429]
  },
  {
    "name": "Fresno city, California",
    "population": 505882,
    "location": [-119.7725868, 36.7468422]
  },
  {
    "name": "Sacramento city, California",
    "population": 475516,
    "location": [-121.49439960000001, 38.5815719]
  },
  {
    "name": "Long Beach city, California",
    "population": 467892,
    "location": [-118.19561679999998, 33.768321]
  },
  {
    "name": "Kansas City city, Missouri",
    "population": 464310,
    "location": [-94.57856670000001, 39.0997265]
  },
  {
    "name": "Mesa city, Arizona",
    "population": 452084,
    "location": [-111.8314724, 33.4151843]
  },
  {
    "name": "Virginia Beach city, Virginia",
    "population": 447021,
    "location": [-75.97798499999999, 36.8529263]
  },
  {
    "name": "Atlanta city, Georgia",
    "population": 443775,
    "location": [-84.3879824, 33.7489954]
  },
  {
    "name": "Colorado Springs city, Colorado",
    "population": 431834,
    "location": [-104.8213634, 38.8338816]
  },
  {
    "name": "Raleigh city, North Carolina",
    "population": 423179,
    "location": [-78.63817870000003, 35.7795897]
  },
  {
    "name": "Omaha city, Nebraska",
    "population": 421570,
    "location": [-95.99798829999997, 41.2523634]
  },
  {
    "name": "Miami city, Florida",
    "population": 413892,
    "location": [-80.22643929999998, 25.7889689]
  },
  {
    "name": "Oakland city, California",
    "population": 400740,
    "location": [-122.2711137, 37.8043637]
  },
  {
    "name": "Tulsa city, Oklahoma",
    "population": 393987,
    "location": [-95.992775, 36.1539816]
  },
  {
    "name": "Minneapolis city, Minnesota",
    "population": 392880,
    "location": [-93.26666999999998, 44.983334]
  },
  {
    "name": "Cleveland city, Ohio",
    "population": 390928,
    "location": [-81.6954088, 41.4994954]
  },
  {
    "name": "Wichita city, Kansas",
    "population": 385577,
    "location": [-97.33611109999998, 37.68888889999999]
  },
  {
    "name": "Arlington city, Texas",
    "population": 375600,
    "location": [-97.10806559999997, 32.735687]
  },
  {
    "name": "New Orleans city, Louisiana",
    "population": 369250,
    "location": [-90.0715323, 29.95106579999999]
  },
  {
    "name": "Bakersfield city, California",
    "population": 358597,
    "location": [-119.01871249999999, 35.3732921]
  },
  {
    "name": "Tampa city, Florida",
    "population": 347645,
    "location": [-82.45717760000002, 27.950575]
  },
  // {
  //   "name": "Urban Honolulu CDP, Hawaii",
  //   "population": 345610,
  //   "location": [-155.58278180000002, 19.8967662]
  // },
  {
    "name": "Anaheim city, California",
    "population": 343248,
    "location": [-117.91450359999999, 33.8352932]
  },
  {
    "name": "Aurora city, Colorado",
    "population": 339030,
    "location": [-104.83191950000003, 39.7294319]
  },
  {
    "name": "Santa Ana city, California",
    "population": 330920,
    "location": [-117.86783379999997, 33.7455731]
  },
  {
    "name": "St. Louis city, Missouri",
    "population": 318172,
    "location": [-90.1994042, 38.6270025]
  },
  {
    "name": "Riverside city, California",
    "population": 313673,
    "location": [-117.3961564, 33.9533487]
  },
  {
    "name": "Corpus Christi city, Texas",
    "population": 312195,
    "location": [-97.39638100000002, 27.8005828]
  },
  {
    "name": "Pittsburgh city, Pennsylvania",
    "population": 306211,
    "location": [-79.99588640000002, 40.44062479999999]
  },
  {
    "name": "Lexington-Fayette urban county, Kentucky",
    "population": 305489,
    "location": [-84.4955134, 38.0448294]
  },
  // {
  //   "name": "Anchorage municipality, Alaska",
  //   "population": 298610,
  //   "location": [-149.895036, 61.21639800000001]
  // },
  {
    "name": "Stockton city, California",
    "population": 297984,
    "location": [-121.29077960000001, 37.9577016]
  },
  {
    "name": "Cincinnati city, Ohio",
    "population": 296550,
    "location": [-84.51201960000003, 39.1031182]
  },
  {
    "name": "St. Paul city, Minnesota",
    "population": 290770,
    "location": [-93.08995779999998, 44.9537029]
  },
  {
    "name": "Toledo city, Ohio",
    "population": 284012,
    "location": [-83.55521199999998, 41.6639383]
  },
  {
    "name": "Newark city, New Jersey",
    "population": 277727,
    "location": [-74.1723667, 40.735657]
  },
  {
    "name": "Greensboro city, North Carolina",
    "population": 277080,
    "location": [-79.79197540000001, 36.0726354]
  },
  {
    "name": "Plano city, Texas",
    "population": 272068,
    "location": [-96.69888559999998, 33.0198431]
  },
  {
    "name": "Henderson city, Nevada",
    "population": 265679,
    "location": [-114.9817213, 36.0395247]
  },
  {
    "name": "Lincoln city, Nebraska",
    "population": 265404,
    "location": [-96.68167900000003, 40.806862]
  },
  {
    "name": "Buffalo city, New York",
    "population": 259384,
    "location": [-78.8783689, 42.88644679999999]
  },
  {
    "name": "Fort Wayne city, Indiana",
    "population": 254555,
    "location": [-85.13935129999999, 41.079273]
  },
  {
    "name": "Jersey City city, New Jersey",
    "population": 254441,
    "location": [-74.07764170000002, 40.72815749999999]
  },
  {
    "name": "Chula Vista city, California",
    "population": 252422,
    "location": [-117.08419550000002, 32.6400541]
  },
  {
    "name": "Orlando city, Florida",
    "population": 249562,
    "location": [-81.37923649999999, 28.5383355]
  },
  {
    "name": "St. Petersburg city, Florida",
    "population": 246541,
    "location": [-82.63999999999999, 27.7730556]
  },
  {
    "name": "Norfolk city, Virginia",
    "population": 245782,
    "location": [-76.2858726, 36.8507689]
  },
  {
    "name": "Chandler city, Arizona",
    "population": 245628,
    "location": [-111.84125019999999, 33.3061605]
  },
  {
    "name": "Laredo city, Texas",
    "population": 244731,
    "location": [-99.50754210000002, 27.506407]
  },
  {
    "name": "Madison city, Wisconsin",
    "population": 240323,
    "location": [-89.40123019999999, 43.0730517]
  },
  {
    "name": "Durham city, North Carolina",
    "population": 239358,
    "location": [-78.898619, 35.9940329]
  },
  {
    "name": "Lubbock city, Texas",
    "population": 236065,
    "location": [-101.8551665, 33.5778631]
  },
  {
    "name": "Winston-Salem city, North Carolina",
    "population": 234349,
    "location": [-80.244216, 36.09985959999999]
  },
  {
    "name": "Garland city, Texas",
    "population": 233564,
    "location": [-96.63888329999997, 32.912624]
  },
  {
    "name": "Glendale city, Arizona",
    "population": 232143,
    "location": [-112.18598659999998, 33.5386523]
  },
  {
    "name": "Hialeah city, Florida",
    "population": 231941,
    "location": [-80.27810569999997, 25.8575963]
  },
  {
    "name": "Reno city, Nevada",
    "population": 231027,
    "location": [-119.8138027, 39.5296329]
  },
  {
    "name": "Baton Rouge city, Louisiana",
    "population": 230058,
    "location": [-91.1403196, 30.4582829]
  },
  {
    "name": "Irvine city, California",
    "population": 229985,
    "location": [-117.79469419999998, 33.6839473]
  },
  {
    "name": "Chesapeake city, Virginia",
    "population": 228417,
    "location": [-76.28749270000003, 36.7682088]
  },
  {
    "name": "Irving city, Texas",
    "population": 225427,
    "location": [-96.9488945, 32.8140177]
  },
  {
    "name": "Scottsdale city, Arizona",
    "population": 223514,
    "location": [-111.9260519, 33.4941704]
  },
  {
    "name": "North Las Vegas city, Nevada",
    "population": 223491,
    "location": [-115.11750130000001, 36.1988592]
  },
  {
    "name": "Fremont city, California",
    "population": 221986,
    "location": [-121.98857190000001, 37.5482697]
  },
  {
    "name": "Gilbert town, Arizona",
    "population": 221140,
    "location": [-111.78902700000003, 33.3528264]
  },
  {
    "name": "San Bernardino city, California",
    "population": 213295,
    "location": [-117.28976520000003, 34.1083449]
  },
  {
    "name": "Boise City city, Idaho",
    "population": 212303,
    "location": [-116.21460680000001, 43.6187102]
  },
  {
    "name": "Birmingham city, Alabama",
    "population": 212038,
    "location": [-86.80248999999998, 33.5206608]
  },
  {
    "name": "Rochester city, New York",
    "population": 210532,
    "location": [-77.6109219, 43.16103]
  },
  {
    "name": "Richmond city, Virginia",
    "population": 210309,
    "location": [-77.4360481, 37.5407246]
  },
  {
    "name": "Spokane city, Washington",
    "population": 209525,
    "location": [-117.4260466, 47.6587802]
  },
  {
    "name": "Des Moines city, Iowa",
    "population": 206688,
    "location": [-93.60910639999997, 41.6005448]
  },
  {
    "name": "Montgomery city, Alabama",
    "population": 205293,
    "location": [-86.29996890000001, 32.3668052]
  },
  {
    "name": "Modesto city, California",
    "population": 203547,
    "location": [-120.99687819999997, 37.63909719999999]
  },
  {
    "name": "Fayetteville city, North Carolina",
    "population": 202103,
    "location": [-78.87835849999999, 35.0526641]
  },
  {
    "name": "Tacoma city, Washington",
    "population": 202010,
    "location": [-122.44429059999999, 47.2528768]
  },
  {
    "name": "Shreveport city, Louisiana",
    "population": 201867,
    "location": [-93.75017889999998, 32.5251516]
  },
  {
    "name": "Fontana city, California",
    "population": 201812,
    "location": [-117.435048, 34.0922335]
  },
  {
    "name": "Oxnard city, California",
    "population": 201555,
    "location": [-119.17705160000003, 34.1975048]
  },
  {
    "name": "Aurora city, Illinois",
    "population": 199932,
    "location": [-88.32007150000004, 41.7605849]
  },
  {
    "name": "Moreno Valley city, California",
    "population": 199552,
    "location": [-117.22967169999998, 33.9424658]
  },
  {
    "name": "Akron city, Ohio",
    "population": 198549,
    "location": [-81.5190053, 41.0814447]
  },
  {
    "name": "Yonkers city, New York",
    "population": 198449,
    "location": [-73.89874689999999, 40.9312099]
  },
  {
    "name": "Columbus city, Georgia",
    "population": 198413,
    "location": [-84.98770939999997, 32.4609764]
  },
  {
    "name": "Augusta-Richmond County consolidated government (balance), Georgia",
    "population": 197872,
    "location": [-82.01051480000001, 33.4734978]
  },
  {
    "name": "Little Rock city, Arkansas",
    "population": 196537,
    "location": [-92.28959479999997, 34.7464809]
  },
  {
    "name": "Amarillo city, Texas",
    "population": 195250,
    "location": [-101.83129689999998, 35.2219971]
  },
  {
    "name": "Mobile city, Alabama",
    "population": 194822,
    "location": [-88.0430541, 30.6943566]
  },
  {
    "name": "Huntington Beach city, California",
    "population": 194708,
    "location": [-117.99922650000002, 33.660297]
  },
  {
    "name": "Glendale city, California",
    "population": 194478,
    "location": [-118.25507500000003, 34.1425078]
  },
  {
    "name": "Grand Rapids city, Michigan",
    "population": 190411,
    "location": [-85.66808630000003, 42.9633599]
  },
  {
    "name": "Salt Lake City city, Utah",
    "population": 189314,
    "location": [-111.89104739999999, 40.7607793]
  },
  {
    "name": "Tallahassee city, Florida",
    "population": 186971,
    "location": [-84.28073289999998, 30.4382559]
  },
  {
    "name": "Huntsville city, Alabama",
    "population": 183739,
    "location": [-86.58610369999997, 34.7303688]
  },
  {
    "name": "Worcester city, Massachusetts",
    "population": 182669,
    "location": [-71.8022934, 42.2625932]
  },
  {
    "name": "Knoxville city, Tennessee",
    "population": 182200,
    "location": [-83.92073920000001, 35.9606384]
  },
  {
    "name": "Grand Prairie city, Texas",
    "population": 181824,
    "location": [-96.99778459999999, 32.7459645]
  },
  {
    "name": "Newport News city, Virginia",
    "population": 180726,
    "location": [-76.47301219999997, 37.0870821]
  },
  {
    "name": "Brownsville city, Texas",
    "population": 180097,
    "location": [-97.4974838, 25.9017472]
  },
  {
    "name": "Santa Clarita city, California",
    "population": 179013,
    "location": [-118.54258600000003, 34.3916641]
  },
  {
    "name": "Overland Park city, Kansas",
    "population": 178919,
    "location": [-94.6707917, 38.9822282]
  },
  {
    "name": "Providence city, Rhode Island",
    "population": 178432,
    "location": [-71.41283429999999, 41.8239891]
  },
  {
    "name": "Jackson city, Mississippi",
    "population": 175437,
    "location": [-90.18481029999998, 32.2987573]
  },
  {
    "name": "Garden Grove city, California",
    "population": 174389,
    "location": [-117.94144770000003, 33.7739053]
  },
  {
    "name": "Oceanside city, California",
    "population": 171293,
    "location": [-117.37948340000003, 33.1958696]
  },
  {
    "name": "Chattanooga city, Tennessee",
    "population": 171279,
    "location": [-85.30968009999998, 35.0456297]
  },
  {
    "name": "Fort Lauderdale city, Florida",
    "population": 170747,
    "location": [-80.1433786, 26.1223084]
  },
  {
    "name": "Rancho Cucamonga city, California",
    "population": 170746,
    "location": [-117.5931084, 34.10639889999999]
  },
  {
    "name": "Santa Rosa city, California",
    "population": 170685,
    "location": [-122.71443139999997, 38.4404674]
  },
  {
    "name": "Port St. Lucie city, Florida",
    "population": 168716,
    "location": [-80.35500000000002, 27.2758333]
  },
  {
    "name": "Ontario city, California",
    "population": 167211,
    "location": [-117.65088760000003, 34.0633443]
  },
  {
    "name": "Tempe city, Arizona",
    "population": 166842,
    "location": [-111.94000540000002, 33.4255104]
  },
  {
    "name": "Vancouver city, Washington",
    "population": 165489,
    "location": [-122.66148609999999, 45.6387281]
  },
  {
    "name": "Springfield city, Missouri",
    "population": 162191,
    "location": [-93.29229889999999, 37.2089572]
  },
  {
    "name": "Cape Coral city, Florida",
    "population": 161248,
    "location": [-81.9495331, 26.5628537]
  },
  {
    "name": "Pembroke Pines city, Florida",
    "population": 160306,
    "location": [-80.31522330000001, 26.0122378]
  },
  {
    "name": "Sioux Falls city, South Dakota",
    "population": 159908,
    "location": [-96.70032700000002, 43.5499749]
  },
  {
    "name": "Peoria city, Arizona",
    "population": 159789,
    "location": [-112.23737790000001, 33.5805955]
  },
  {
    "name": "Lancaster city, California",
    "population": 159055,
    "location": [-118.15416319999997, 34.6867846]
  },
  {
    "name": "Elk Grove city, California",
    "population": 159038,
    "location": [-121.37161779999997, 38.4087993]
  },
  {
    "name": "Corona city, California",
    "population": 158391,
    "location": [-117.56643839999998, 33.8752935]
  },
  {
    "name": "Eugene city, Oregon",
    "population": 157986,
    "location": [-123.08675360000001, 44.0520691]
  },
  {
    "name": "Salem city, Oregon",
    "population": 157429,
    "location": [-123.03509630000002, 44.9428975]
  },
  {
    "name": "Palmdale city, California",
    "population": 155650,
    "location": [-118.11646129999997, 34.5794343]
  },
  {
    "name": "Salinas city, California",
    "population": 154484,
    "location": [-121.65550129999997, 36.6777372]
  },
  {
    "name": "Springfield city, Massachusetts",
    "population": 153552,
    "location": [-72.589811, 42.1014831]
  },
  {
    "name": "Pasadena city, Texas",
    "population": 152272,
    "location": [-95.2091006, 29.6910625]
  },
  {
    "name": "Rockford city, Illinois",
    "population": 150843,
    "location": [-89.0939952, 42.2711311]
  },
  {
    "name": "Pomona city, California",
    "population": 150812,
    "location": [-117.75230479999999, 34.0552267]
  },
  {
    "name": "Hayward city, California",
    "population": 149392,
    "location": [-122.0807964, 37.6688205]
  },
  {
    "name": "Fort Collins city, Colorado",
    "population": 148612,
    "location": [-105.08442300000002, 40.5852602]
  },
  {
    "name": "Joliet city, Illinois",
    "population": 148268,
    "location": [-88.08172509999997, 41.525031]
  },
  {
    "name": "Escondido city, California",
    "population": 147575,
    "location": [-117.08642099999997, 33.1192068]
  },
  {
    "name": "Kansas City city, Kansas",
    "population": 147268,
    "location": [-94.6274636, 39.114053]
  },
  {
    "name": "Torrance city, California",
    "population": 147027,
    "location": [-118.34062879999999, 33.8358492]
  },
  {
    "name": "Bridgeport city, Connecticut",
    "population": 146425,
    "location": [-73.19517669999999, 41.1865478]
  },
  {
    "name": "Alexandria city, Virginia",
    "population": 146294,
    "location": [-77.04692139999997, 38.8048355]
  },
  {
    "name": "Sunnyvale city, California",
    "population": 146197,
    "location": [-122.0363496, 37.36883]
  },
  {
    "name": "Cary town, North Carolina",
    "population": 145693,
    "location": [-78.78111690000003, 35.79154]
  },
  {
    "name": "Lakewood city, Colorado",
    "population": 145516,
    "location": [-105.08137340000002, 39.7047095]
  },
  {
    "name": "Hollywood city, Florida",
    "population": 145236,
    "location": [-80.14949009999998, 26.0112014]
  },
  {
    "name": "Paterson city, New Jersey",
    "population": 145219,
    "location": [-74.17181099999999, 40.9167654]
  },
  {
    "name": "Syracuse city, New York",
    "population": 144170,
    "location": [-76.14742439999998, 43.0481221]
  },
  {
    "name": "Naperville city, Illinois",
    "population": 143684,
    "location": [-88.14728930000001, 41.7858629]
  },
  {
    "name": "McKinney city, Texas",
    "population": 143223,
    "location": [-96.63978220000001, 33.1972465]
  },
  {
    "name": "Mesquite city, Texas",
    "population": 143195,
    "location": [-96.5991593, 32.76679550000001]
  },
  {
    "name": "Clarksville city, Tennessee",
    "population": 142519,
    "location": [-87.35945279999999, 36.5297706]
  },
  {
    "name": "Savannah city, Georgia",
    "population": 142022,
    "location": [-81.09983419999998, 32.0835407]
  },
  {
    "name": "Dayton city, Ohio",
    "population": 141359,
    "location": [-84.19160690000001, 39.7589478]
  },
  {
    "name": "Orange city, California",
    "population": 139419,
    "location": [-117.85311189999999, 33.7877944]
  },
  {
    "name": "Fullerton city, California",
    "population": 138574,
    "location": [-117.92533800000001, 33.8702923]
  },
  {
    "name": "Pasadena city, California",
    "population": 138547,
    "location": [-118.14451550000001, 34.1477849]
  },
  {
    "name": "Hampton city, Virginia",
    "population": 136836,
    "location": [-76.34522179999999, 37.0298687]
  },
  {
    "name": "McAllen city, Texas",
    "population": 134719,
    "location": [-98.23001239999996, 26.2034071]
  },
  {
    "name": "Killeen city, Texas",
    "population": 134654,
    "location": [-97.72779589999999, 31.1171194]
  },
  {
    "name": "Warren city, Michigan",
    "population": 134141,
    "location": [-83.02819699999998, 42.49299999999999]
  },
  {
    "name": "West Valley City city, Utah",
    "population": 132434,
    "location": [-112.00105009999999, 40.6916132]
  },
  {
    "name": "Columbia city, South Carolina",
    "population": 131686,
    "location": [-81.03481440000002, 34.0007104]
  },
  {
    "name": "New Haven city, Connecticut",
    "population": 130741,
    "location": [-72.92788350000001, 41.308274]
  },
  {
    "name": "Sterling Heights city, Michigan",
    "population": 130410,
    "location": [-83.03020329999998, 42.5803122]
  },
  {
    "name": "Olathe city, Kansas",
    "population": 130045,
    "location": [-94.81912849999998, 38.8813958]
  },
  {
    "name": "Miramar city, Florida",
    "population": 128729,
    "location": [-80.2867501, 25.9756704]
  },
  {
    "name": "Thousand Oaks city, California",
    "population": 128412,
    "location": [-118.83759370000001, 34.1705609]
  },
  {
    "name": "Frisco city, Texas",
    "population": 128176,
    "location": [-96.82361159999999, 33.1506744]
  },
  {
    "name": "Cedar Rapids city, Iowa",
    "population": 128119,
    "location": [-91.66562320000003, 41.9778795]
  },
  {
    "name": "Topeka city, Kansas",
    "population": 127939,
    "location": [-95.68901849999997, 39.0558235]
  },
  {
    "name": "Visalia city, California",
    "population": 127081,
    "location": [-119.2920585, 36.3302284]
  },
  {
    "name": "Waco city, Texas",
    "population": 127018,
    "location": [-97.14666950000003, 31.549333]
  },
  {
    "name": "Elizabeth city, New Jersey",
    "population": 126458,
    "location": [-74.2107006, 40.6639916]
  },
  {
    "name": "Bellevue city, Washington",
    "population": 126439,
    "location": [-122.2006786, 47.610377]
  },
  {
    "name": "Gainesville city, Florida",
    "population": 126047,
    "location": [-82.32482619999996, 29.6516344]
  },
  {
    "name": "Simi Valley city, California",
    "population": 125793,
    "location": [-118.78148199999998, 34.2694474]
  },
  {
    "name": "Charleston city, South Carolina",
    "population": 125583,
    "location": [-79.93092159999998, 32.7765656]
  },
  {
    "name": "Carrollton city, Texas",
    "population": 125409,
    "location": [-96.88996359999999, 32.9756415]
  },
  {
    "name": "Coral Springs city, Florida",
    "population": 125287,
    "location": [-80.27060440000002, 26.271192]
  },
  {
    "name": "Stamford city, Connecticut",
    "population": 125109,
    "location": [-73.5387341, 41.0534302]
  },
  {
    "name": "Hartford city, Connecticut",
    "population": 124893,
    "location": [-72.68509319999998, 41.76371109999999]
  },
  {
    "name": "Concord city, California",
    "population": 124711,
    "location": [-122.0310733, 37.9779776]
  },
  {
    "name": "Roseville city, California",
    "population": 124519,
    "location": [-121.28800590000003, 38.7521235]
  },
  {
    "name": "Thornton city, Colorado",
    "population": 124140,
    "location": [-104.97192430000001, 39.8680412]
  },
  {
    "name": "Kent city, Washington",
    "population": 122999,
    "location": [-122.23484310000003, 47.3809335]
  },
  {
    "name": "Lafayette city, Louisiana",
    "population": 122761,
    "location": [-92.01984270000003, 30.2240897]
  },
  {
    "name": "Surprise city, Arizona",
    "population": 121287,
    "location": [-112.39575760000002, 33.639099]
  },
  {
    "name": "Denton city, Texas",
    "population": 121123,
    "location": [-97.13306829999999, 33.2148412]
  },
  {
    "name": "Victorville city, California",
    "population": 120336,
    "location": [-117.2911565, 34.5361067]
  },
  {
    "name": "Evansville city, Indiana",
    "population": 120235,
    "location": [-87.57108979999998, 37.9715592]
  },
  {
    "name": "Midland city, Texas",
    "population": 119385,
    "location": [-102.07791459999999, 31.9973456]
  },
  {
    "name": "Santa Clara city, California",
    "population": 119311,
    "location": [-121.95523559999998, 37.3541079]
  },
  {
    "name": "Athens-Clarke County unified government (balance), Georgia",
    "population": 118999,
    "location": [-82.90712300000001, 32.1574351]
  },
  {
    "name": "Allentown city, Pennsylvania",
    "population": 118974,
    "location": [-75.49018330000001, 40.6084305]
  },
  {
    "name": "Abilene city, Texas",
    "population": 118887,
    "location": [-99.73314390000002, 32.4487364]
  },
  {
    "name": "Beaumont city, Texas",
    "population": 118228,
    "location": [-94.12655619999998, 30.080174]
  },
  {
    "name": "Vallejo city, California",
    "population": 117796,
    "location": [-122.2566367, 38.1040864]
  },
  {
    "name": "Independence city, Missouri",
    "population": 117270,
    "location": [-94.4155068, 39.0911161]
  },
  {
    "name": "Springfield city, Illinois",
    "population": 117126,
    "location": [-89.65014810000002, 39.78172130000001]
  },
  {
    "name": "Ann Arbor city, Michigan",
    "population": 116121,
    "location": [-83.74303780000002, 42.2808256]
  },
  {
    "name": "Provo city, Utah",
    "population": 115919,
    "location": [-111.65853370000002, 40.2338438]
  },
  {
    "name": "Peoria city, Illinois",
    "population": 115687,
    "location": [-89.58898640000001, 40.6936488]
  },
  {
    "name": "Norman city, Oklahoma",
    "population": 115562,
    "location": [-97.4394777, 35.2225668]
  },
  {
    "name": "Berkeley city, California",
    "population": 115403,
    "location": [-122.27274699999998, 37.8715926]
  },
  {
    "name": "El Monte city, California",
    "population": 115111,
    "location": [-118.02756669999997, 34.0686206]
  },
  {
    "name": "Murfreesboro city, Tennessee",
    "population": 114038,
    "location": [-86.39026999999999, 35.8456213]
  },
  {
    "name": "Lansing city, Michigan",
    "population": 113996,
    "location": [-84.55553470000001, 42.732535]
  },
  {
    "name": "Columbia city, Missouri",
    "population": 113225,
    "location": [-92.33407239999997, 38.9517053]
  },
  {
    "name": "Downey city, California",
    "population": 112873,
    "location": [-118.1325688, 33.94001430000001]
  },
  {
    "name": "Costa Mesa city, California",
    "population": 111918,
    "location": [-117.9186689, 33.6411316]
  },
  {
    "name": "Inglewood city, California",
    "population": 111182,
    "location": [-118.35313109999998, 33.9616801]
  },
  {
    "name": "Miami Gardens city, Florida",
    "population": 110754,
    "location": [-80.24560450000001, 25.9420377]
  },
  {
    "name": "Manchester city, New Hampshire",
    "population": 110209,
    "location": [-71.45478909999997, 42.9956397]
  },
  {
    "name": "Elgin city, Illinois",
    "population": 109927,
    "location": [-88.28118949999998, 42.0372487]
  },
  {
    "name": "Wilmington city, North Carolina",
    "population": 109922,
    "location": [-77.94471020000003, 34.2257255]
  },
  {
    "name": "Waterbury city, Connecticut",
    "population": 109915,
    "location": [-73.05149649999998, 41.5581525]
  },
  {
    "name": "Fargo city, North Dakota",
    "population": 109779,
    "location": [-96.78980339999998, 46.8771863]
  },
  {
    "name": "Arvada city, Colorado",
    "population": 109745,
    "location": [-105.0874842, 39.8027644]
  },
  {
    "name": "Carlsbad city, California",
    "population": 109318,
    "location": [-117.35059390000004, 33.1580933]
  },
  {
    "name": "Westminster city, Colorado",
    "population": 109169,
    "location": [-105.0372046, 39.8366528]
  },
  {
    "name": "Rochester city, Minnesota",
    "population": 108992,
    "location": [-92.46294999999998, 44.0234]
  },
  {
    "name": "Gresham city, Oregon",
    "population": 108956,
    "location": [-122.43020130000002, 45.5001357]
  },
  {
    "name": "Clearwater city, Florida",
    "population": 108732,
    "location": [-82.8001026, 27.9658533]
  },
  {
    "name": "Lowell city, Massachusetts",
    "population": 108522,
    "location": [-71.3161718, 42.6334247]
  },
  {
    "name": "West Jordan city, Utah",
    "population": 108383,
    "location": [-111.93910310000001, 40.6096698]
  },
  {
    "name": "Pueblo city, Colorado",
    "population": 107772,
    "location": [-104.6091409, 38.2544472]
  },
  {
    "name": "San Buenaventura (Ventura) city, California",
    "population": 107734,
    "location": [-119.22900529999998, 34.2746405]
  },
  {
    "name": "Fairfield city, California",
    "population": 107684,
    "location": [-122.0399663, 38.24935809999999]
  },
  {
    "name": "West Covina city, California",
    "population": 107440,
    "location": [-117.9389526, 34.0686208]
  },
  {
    "name": "Billings city, Montana",
    "population": 106954,
    "location": [-108.5006904, 45.7832856]
  },
  {
    "name": "Murrieta city, California",
    "population": 106810,
    "location": [-117.21392320000001, 33.5539143]
  },
  {
    "name": "High Point city, North Carolina",
    "population": 106586,
    "location": [-80.00531760000001, 35.9556923]
  },
  {
    "name": "Round Rock city, Texas",
    "population": 106573,
    "location": [-97.67889600000001, 30.5082551]
  },
  {
    "name": "Richmond city, California",
    "population": 106516,
    "location": [-122.34774859999999, 37.9357576]
  },
  {
    "name": "Cambridge city, Massachusetts",
    "population": 106471,
    "location": [-71.1097335, 42.3736158]
  },
  {
    "name": "Norwalk city, California",
    "population": 106278,
    "location": [-118.08173299999999, 33.9022367]
  },
  {
    "name": "Odessa city, Texas",
    "population": 106102,
    "location": [-102.36764310000001, 31.8456816]
  },
  {
    "name": "Antioch city, California",
    "population": 105508,
    "location": [-121.805789, 38.0049214]
  },
  {
    "name": "Temecula city, California",
    "population": 105208,
    "location": [-117.14836479999997, 33.4936391]
  },
  {
    "name": "Green Bay city, Wisconsin",
    "population": 104868,
    "location": [-88.01982599999997, 44.51915899999999]
  },
  {
    "name": "Everett city, Washington",
    "population": 104655,
    "location": [-122.2020794, 47.9789848]
  },
  {
    "name": "Wichita Falls city, Texas",
    "population": 104552,
    "location": [-98.4933873, 33.9137085]
  },
  {
    "name": "Burbank city, California",
    "population": 104391,
    "location": [-118.30896610000002, 34.1808392]
  },
  {
    "name": "Palm Bay city, Florida",
    "population": 104124,
    "location": [-80.58866460000002, 28.0344621]
  },
  {
    "name": "Centennial city, Colorado",
    "population": 103743,
    "location": [-104.8771726, 39.5807452]
  },
  {
    "name": "Daly City city, California",
    "population": 103690,
    "location": [-122.47020789999999, 37.6879241]
  },
  {
    "name": "Richardson city, Texas",
    "population": 103297,
    "location": [-96.72972049999998, 32.9481789]
  },
  {
    "name": "Pompano Beach city, Florida",
    "population": 102984,
    "location": [-80.12476670000001, 26.2378597]
  },
  {
    "name": "Broken Arrow city, Oklahoma",
    "population": 102019,
    "location": [-95.78351939999999, 36.0565606]
  },
  {
    "name": "North Charleston city, South Carolina",
    "population": 101989,
    "location": [-79.9748103, 32.8546197]
  },
  {
    "name": "West Palm Beach city, Florida",
    "population": 101903,
    "location": [-80.05337459999998, 26.7153424]
  },
  {
    "name": "Boulder city, Colorado",
    "population": 101808,
    "location": [-105.27054559999999, 40.0149856]
  },
  {
    "name": "Rialto city, California",
    "population": 101740,
    "location": [-117.37032349999998, 34.1064001]
  },
  {
    "name": "Santa Maria city, California",
    "population": 101459,
    "location": [-120.43571910000003, 34.9530337]
  },
  {
    "name": "El Cajon city, California",
    "population": 101435,
    "location": [-116.9625269, 32.7947731]
  },
  {
    "name": "Davenport city, Iowa",
    "population": 101363,
    "location": [-90.57763669999997, 41.5236437]
  },
  {
    "name": "Las Cruces city, New Mexico",
    "population": 101047,
    "location": [-106.76365379999999, 32.3199396]
  },
  {
    "name": "Erie city, Pennsylvania",
    "population": 101047,
    "location": [-80.085059, 42.12922409999999]
  },
  {
    "name": "South Bend city, Indiana",
    "population": 100800,
    "location": [-86.25198979999999, 41.6763545]
  },
  {
    "name": "Flint city, Michigan",
    "population": 100515,
    "location": [-83.68745619999999, 43.0125274]
  },
  {
    "name": "Kenosha city, Wisconsin",
    "population": 100150,
    "location": [-87.82118539999999, 42.5847425]
  },
  {
    "name": "Lakeland city, Florida",
    "population": 99999,
    "location": [-81.94980420000002, 28.0394654]
  },
  {
    "name": "San Mateo city, California",
    "population": 99670,
    "location": [-122.3255254, 37.5629917]
  },
  {
    "name": "Lewisville city, Texas",
    "population": 99453,
    "location": [-96.99417399999999, 33.046233]
  },
  {
    "name": "Sandy Springs city, Georgia",
    "population": 99419,
    "location": [-84.37331469999998, 33.9304352]
  },
  {
    "name": "Tyler city, Texas",
    "population": 99323,
    "location": [-95.30106239999998, 32.3512601]
  },
  {
    "name": "Clovis city, California",
    "population": 98632,
    "location": [-119.70291939999998, 36.8252277]
  },
  {
    "name": "Lawton city, Oklahoma",
    "population": 98376,
    "location": [-98.39592909999999, 34.6035669]
  },
  {
    "name": "Albany city, New York",
    "population": 97904,
    "location": [-73.7562317, 42.6525793]
  },
  {
    "name": "College Station city, Texas",
    "population": 97801,
    "location": [-96.33440680000001, 30.627977]
  },
  {
    "name": "Compton city, California",
    "population": 97559,
    "location": [-118.2200712, 33.8958492]
  },
  {
    "name": "Roanoke city, Virginia",
    "population": 97469,
    "location": [-79.9414266, 37.2709704]
  },
  {
    "name": "Jurupa Valley city, California",
    "population": 97426
  },
  {
    "name": "Dearborn city, Michigan",
    "population": 96474
  },
  {
    "name": "Portsmouth city, Virginia",
    "population": 96470
  },
  {
    "name": "Pearland city, Texas",
    "population": 96294
  },
  {
    "name": "Vista city, California",
    "population": 96047
  },
  {
    "name": "San Angelo city, Texas",
    "population": 95887
  },
  {
    "name": "Livonia city, Michigan",
    "population": 95586
  },
  {
    "name": "Davie town, Florida",
    "population": 95489
  },
  {
    "name": "Renton city, Washington",
    "population": 95448
  },
  {
    "name": "Yuma city, Arizona",
    "population": 95429
  },
  {
    "name": "Greeley city, Colorado",
    "population": 95357
  },
  {
    "name": "Hillsboro city, Oregon",
    "population": 95327
  },
  {
    "name": "South Gate city, California",
    "population": 95304
  },
  {
    "name": "Mission Viejo city, California",
    "population": 95290
  },
  {
    "name": "New Bedford city, Massachusetts",
    "population": 94929
  },
  {
    "name": "Brockton city, Massachusetts",
    "population": 94094
  },
  {
    "name": "Vacaville city, California",
    "population": 93899
  },
  {
    "name": "Roswell city, Georgia",
    "population": 93692
  },
  {
    "name": "Tuscaloosa city, Alabama",
    "population": 93357
  },
  {
    "name": "Yakima city, Washington",
    "population": 93101
  },
  {
    "name": "Quincy city, Massachusetts",
    "population": 93027
  },
  {
    "name": "Carson city, California",
    "population": 93002
  },
  {
    "name": "Beaverton city, Oregon",
    "population": 92680
  },
  {
    "name": "Lee\'s Summit city, Missouri",
    "population": 92468
  },
  {
    "name": "Sparks city, Nevada",
    "population": 92183
  },
  {
    "name": "Hesperia city, California",
    "population": 92062
  },
  {
    "name": "Federal Way city, Washington",
    "population": 91933
  },
  {
    "name": "Santa Monica city, California",
    "population": 91812
  },
  {
    "name": "Westminster city, California",
    "population": 91377
  },
  {
    "name": "Lynn city, Massachusetts",
    "population": 91253
  },
  {
    "name": "Macon city, Georgia",
    "population": 91234
  },
  {
    "name": "Rio Rancho city, New Mexico",
    "population": 90818
  },
  {
    "name": "Redding city, California",
    "population": 90755
  },
  {
    "name": "Orem city, Utah",
    "population": 90749
  },
  {
    "name": "Spokane Valley city, Washington",
    "population": 90641
  },
  {
    "name": "Miami Beach city, Florida",
    "population": 90588
  },
  {
    "name": "Allen city, Texas",
    "population": 89640
  },
  {
    "name": "Santa Barbara city, California",
    "population": 89639
  },
  {
    "name": "Lawrence city, Kansas",
    "population": 89512
  },
  {
    "name": "Sandy city, Utah",
    "population": 89344
  },
  {
    "name": "Fall River city, Massachusetts",
    "population": 88945
  },
  {
    "name": "Waukegan city, Illinois",
    "population": 88862
  },
  {
    "name": "Sunrise city, Florida",
    "population": 88843
  },
  {
    "name": "Longmont city, Colorado",
    "population": 88669
  },
  {
    "name": "League City city, Texas",
    "population": 88188
  },
  {
    "name": "Reading city, Pennsylvania",
    "population": 88102
  },
  {
    "name": "Plantation city, Florida",
    "population": 88016
  },
  {
    "name": "Boca Raton city, Florida",
    "population": 87836
  },
  {
    "name": "Chico city, California",
    "population": 87714
  },
  {
    "name": "Fort Smith city, Arkansas",
    "population": 87443
  },
  {
    "name": "Greenville city, North Carolina",
    "population": 87242
  },
  {
    "name": "Norwalk city, Connecticut",
    "population": 87190
  },
  {
    "name": "Newport Beach city, California",
    "population": 87068
  },
  {
    "name": "Nashua city, New Hampshire",
    "population": 86933
  },
  {
    "name": "San Leandro city, California",
    "population": 86890
  },
  {
    "name": "San Marcos city, California",
    "population": 86752
  },
  {
    "name": "Newton city, Massachusetts",
    "population": 86307
  },
  {
    "name": "Duluth city, Minnesota",
    "population": 86211
  },
  {
    "name": "Whittier city, California",
    "population": 86177
  },
  {
    "name": "Bloomington city, Minnesota",
    "population": 86033
  },
  {
    "name": "Asheville city, North Carolina",
    "population": 85712
  },
  {
    "name": "Hawthorne city, California",
    "population": 85681
  },
  {
    "name": "Deltona city, Florida",
    "population": 85442
  },
  {
    "name": "Suffolk city, Virginia",
    "population": 85181
  },
  {
    "name": "Edmond city, Oklahoma",
    "population": 84885
  },
  {
    "name": "Citrus Heights city, California",
    "population": 84870
  },
  {
    "name": "Clifton city, New Jersey",
    "population": 84722
  },
  {
    "name": "Tracy city, California",
    "population": 84669
  },
  {
    "name": "Trenton city, New Jersey",
    "population": 84477
  },
  {
    "name": "Alhambra city, California",
    "population": 84322
  },
  {
    "name": "Cicero town, Illinois",
    "population": 84137
  },
  {
    "name": "Nampa city, Idaho",
    "population": 83930
  },
  {
    "name": "Ogden city, Utah",
    "population": 83793
  },
  {
    "name": "Carmel city, Indiana",
    "population": 83565
  },
  {
    "name": "Livermore city, California",
    "population": 83547
  },
  {
    "name": "Hoover city, Alabama",
    "population": 83412
  },
  {
    "name": "Westland city, Michigan",
    "population": 82883
  },
  {
    "name": "Danbury city, Connecticut",
    "population": 82807
  },
  {
    "name": "Sioux City city, Iowa",
    "population": 82719
  },
  {
    "name": "Champaign city, Illinois",
    "population": 82517
  },
  {
    "name": "Sugar Land city, Texas",
    "population": 82480
  },
  {
    "name": "Johns Creek city, Georgia",
    "population": 82306
  },
  {
    "name": "Bellingham city, Washington",
    "population": 82234
  },
  {
    "name": "Troy city, Michigan",
    "population": 82212
  },
  {
    "name": "Buena Park city, California",
    "population": 82155
  },
  {
    "name": "Concord city, North Carolina",
    "population": 81981
  },
  {
    "name": "O\'Fallon city, Missouri",
    "population": 81979
  },
  {
    "name": "Bloomington city, Indiana",
    "population": 81963
  },
  {
    "name": "Warwick city, Rhode Island",
    "population": 81873
  },
  {
    "name": "Fishers town, Indiana",
    "population": 81833
  },
  {
    "name": "Menifee city, California",
    "population": 81474
  },
  {
    "name": "Longview city, Texas",
    "population": 81092
  },
  {
    "name": "Hemet city, California",
    "population": 81046
  },
  {
    "name": "Edinburg city, Texas",
    "population": 81029
  },
  {
    "name": "Lakewood city, California",
    "population": 80833
  },
  {
    "name": "Merced city, California",
    "population": 80793
  },
  {
    "name": "Farmington Hills city, Michigan",
    "population": 80756
  },
  {
    "name": "Parma city, Ohio",
    "population": 80597
  },
  {
    "name": "Cranston city, Rhode Island",
    "population": 80529
  },
  {
    "name": "Mission city, Texas",
    "population": 80452
  },
  {
    "name": "Meridian city, Idaho",
    "population": 80386
  },
  {
    "name": "Chino city, California",
    "population": 80164
  },
  {
    "name": "Hammond city, Indiana",
    "population": 79686
  },
  {
    "name": "Indio city, California",
    "population": 79302
  },
  {
    "name": "Gary city, Indiana",
    "population": 79170
  },
  {
    "name": "Bend city, Oregon",
    "population": 79109
  },
  {
    "name": "Redwood City city, California",
    "population": 79009
  },
  {
    "name": "Lake Forest city, California",
    "population": 78853
  },
  {
    "name": "New Rochelle city, New York",
    "population": 78388
  },
  {
    "name": "Napa city, California",
    "population": 78340
  },
  {
    "name": "Racine city, Wisconsin",
    "population": 78303
  },
  {
    "name": "Avondale city, Arizona",
    "population": 78256
  },
  {
    "name": "Bryan city, Texas",
    "population": 78061
  },
  {
    "name": "Tustin city, California",
    "population": 78049
  },
  {
    "name": "Largo city, Florida",
    "population": 77878
  },
  {
    "name": "Brooklyn Park city, Minnesota",
    "population": 77752
  },
  {
    "name": "Bloomington city, Illinois",
    "population": 77733
  },
  {
    "name": "Deerfield Beach city, Florida",
    "population": 77439
  },
  {
    "name": "Albany city, Georgia",
    "population": 77431
  },
  {
    "name": "Palm Coast city, Florida",
    "population": 77374
  },
  {
    "name": "Bellflower city, California",
    "population": 77356
  },
  {
    "name": "Lawrence city, Massachusetts",
    "population": 77326
  },
  {
    "name": "Camden city, New Jersey",
    "population": 77250
  },
  {
    "name": "St. Joseph city, Missouri",
    "population": 77176
  },
  {
    "name": "Lynchburg city, Virginia",
    "population": 77113
  },
  {
    "name": "Somerville city, Massachusetts",
    "population": 77104
  },
  {
    "name": "Melbourne city, Florida",
    "population": 77048
  },
  {
    "name": "Fayetteville city, Arkansas",
    "population": 76899
  },
  {
    "name": "Mountain View city, California",
    "population": 76621
  },
  {
    "name": "Medford city, Oregon",
    "population": 76462
  },
  {
    "name": "Chino Hills city, California",
    "population": 76457
  },
  {
    "name": "Baldwin Park city, California",
    "population": 76419
  },
  {
    "name": "Kennewick city, Washington",
    "population": 75971
  },
  {
    "name": "Scranton city, Pennsylvania",
    "population": 75809
  },
  {
    "name": "Arlington Heights village, Illinois",
    "population": 75777
  },
  {
    "name": "Alameda city, California",
    "population": 75641
  },
  {
    "name": "St. George city, Utah",
    "population": 75561
  },
  {
    "name": "Evanston city, Illinois",
    "population": 75430
  },
  {
    "name": "Decatur city, Illinois",
    "population": 75407
  },
  {
    "name": "Upland city, California",
    "population": 75209
  },
  {
    "name": "Bethlehem city, Pennsylvania",
    "population": 75103
  },
  {
    "name": "Kalamazoo city, Michigan",
    "population": 75092
  },
  {
    "name": "Schaumburg village, Illinois",
    "population": 74781
  },
  {
    "name": "Bolingbrook village, Illinois",
    "population": 74039
  },
  {
    "name": "San Ramon city, California",
    "population": 73927
  },
  {
    "name": "Auburn city, Washington",
    "population": 73505
  },
  {
    "name": "Lake Charles city, Louisiana",
    "population": 73474
  },
  {
    "name": "Folsom city, California",
    "population": 73384
  },
  {
    "name": "Wyoming city, Michigan",
    "population": 73371
  },
  {
    "name": "Baytown city, Texas",
    "population": 73238
  },
  {
    "name": "New Britain city, Connecticut",
    "population": 73153
  },
  {
    "name": "Pharr city, Texas",
    "population": 73138
  },
  {
    "name": "Springdale city, Arkansas",
    "population": 73123
  },
  {
    "name": "Appleton city, Wisconsin",
    "population": 73016
  },
  {
    "name": "Plymouth city, Minnesota",
    "population": 72928
  },
  {
    "name": "Gastonia city, North Carolina",
    "population": 72723
  },
  {
    "name": "Canton city, Ohio",
    "population": 72683
  },
  {
    "name": "Southfield city, Michigan",
    "population": 72507
  },
  {
    "name": "Pleasanton city, California",
    "population": 72338
  },
  {
    "name": "Rochester Hills city, Michigan",
    "population": 72283
  },
  {
    "name": "Mount Pleasant town, South Carolina",
    "population": 71875
  },
  {
    "name": "Union City city, California",
    "population": 71763
  },
  {
    "name": "Perris city, California",
    "population": 71326
  },
  {
    "name": "Wilmington city, Delaware",
    "population": 71292
  },
  {
    "name": "Pawtucket city, Rhode Island",
    "population": 71170
  },
  {
    "name": "Manteca city, California",
    "population": 71067
  },
  {
    "name": "Waukesha city, Wisconsin",
    "population": 70920
  },
  {
    "name": "Warner Robins city, Georgia",
    "population": 70712
  },
  {
    "name": "Lynwood city, California",
    "population": 70709
  },
  {
    "name": "Apple Valley town, California",
    "population": 70700
  },
  {
    "name": "Loveland city, Colorado",
    "population": 70223
  },
  {
    "name": "Passaic city, New Jersey",
    "population": 70218
  },
  {
    "name": "Jonesboro city, Arkansas",
    "population": 70187
  },
  {
    "name": "Iowa City city, Iowa",
    "population": 70133
  },
  {
    "name": "Gulfport city, Mississippi",
    "population": 70113
  },
  {
    "name": "Boynton Beach city, Florida",
    "population": 70101
  },
  {
    "name": "Muncie city, Indiana",
    "population": 70087
  },
  {
    "name": "Redlands city, California",
    "population": 69916
  },
  {
    "name": "Rapid City city, South Dakota",
    "population": 69854
  },
  {
    "name": "Turlock city, California",
    "population": 69733
  },
  {
    "name": "Goodyear city, Arizona",
    "population": 69648
  },
  {
    "name": "Jacksonville city, North Carolina",
    "population": 69220
  },
  {
    "name": "Santa Fe city, New Mexico",
    "population": 69204
  },
  {
    "name": "Temple city, Texas",
    "population": 69148
  },
  {
    "name": "Palatine village, Illinois",
    "population": 69144
  },
  {
    "name": "Lauderhill city, Florida",
    "population": 69100
  },
  {
    "name": "Missouri City city, Texas",
    "population": 69020
  },
  {
    "name": "Milpitas city, California",
    "population": 68800
  },
  {
    "name": "Layton city, Utah",
    "population": 68677
  },
  {
    "name": "Missoula city, Montana",
    "population": 68394
  },
  {
    "name": "Waterloo city, Iowa",
    "population": 68297
  },
  {
    "name": "Rock Hill city, South Carolina",
    "population": 68094
  },
  {
    "name": "Lafayette city, Indiana",
    "population": 67925
  },
  {
    "name": "Mount Vernon city, New York",
    "population": 67896
  },
  {
    "name": "Flower Mound town, Texas",
    "population": 67825
  },
  {
    "name": "Union City city, New Jersey",
    "population": 67744
  },
  {
    "name": "Redondo Beach city, California",
    "population": 67693
  },
  {
    "name": "Weston city, Florida",
    "population": 67641
  },
  {
    "name": "Flagstaff city, Arizona",
    "population": 67468
  },
  {
    "name": "Dothan city, Alabama",
    "population": 67382
  },
  {
    "name": "Jackson city, Tennessee",
    "population": 67265
  },
  {
    "name": "Rancho Cordova city, California",
    "population": 66997
  },
  {
    "name": "Eau Claire city, Wisconsin",
    "population": 66966
  },
  {
    "name": "Kenner city, Louisiana",
    "population": 66820
  },
  {
    "name": "Yorba Linda city, California",
    "population": 66735
  },
  {
    "name": "Oshkosh city, Wisconsin",
    "population": 66653
  },
  {
    "name": "St. Charles city, Missouri",
    "population": 66463
  },
  {
    "name": "Frederick city, Maryland",
    "population": 66382
  },
  {
    "name": "Palo Alto city, California",
    "population": 66363
  },
  {
    "name": "Franklin city, Tennessee",
    "population": 66280
  },
  {
    "name": "Portland city, Maine",
    "population": 66214
  },
  {
    "name": "Schenectady city, New York",
    "population": 66078
  },
  {
    "name": "Davis city, California",
    "population": 65993
  },
  {
    "name": "St. Cloud city, Minnesota",
    "population": 65986
  },
  {
    "name": "Camarillo city, California",
    "population": 65968
  },
  {
    "name": "Fort Myers city, Florida",
    "population": 65725
  },
  {
    "name": "Walnut Creek city, California",
    "population": 65695
  },
  {
    "name": "Harlingen city, Texas",
    "population": 65679
  },
  {
    "name": "Pittsburg city, California",
    "population": 65664
  },
  {
    "name": "South San Francisco city, California",
    "population": 65547
  },
  {
    "name": "Youngstown city, Ohio",
    "population": 65405
  },
  {
    "name": "Pasco city, Washington",
    "population": 65398
  },
  {
    "name": "North Richland Hills city, Texas",
    "population": 65290
  },
  {
    "name": "Yuba City city, California",
    "population": 65105
  },
  {
    "name": "Skokie village, Illinois",
    "population": 65074
  },
  {
    "name": "San Clemente city, California",
    "population": 64882
  },
  {
    "name": "Eagan city, Minnesota",
    "population": 64854
  },
  {
    "name": "Bismarck city, North Dakota",
    "population": 64751
  },
  {
    "name": "Bossier City city, Louisiana",
    "population": 64655
  },
  {
    "name": "North Little Rock city, Arkansas",
    "population": 64633
  },
  {
    "name": "Johnson City city, Tennessee",
    "population": 64528
  },
  {
    "name": "Woodbury city, Minnesota",
    "population": 64496
  },
  {
    "name": "Laguna Niguel city, California",
    "population": 64452
  },
  {
    "name": "Maple Grove city, Minnesota",
    "population": 64420
  },
  {
    "name": "Bayonne city, New Jersey",
    "population": 64416
  },
  {
    "name": "Victoria city, Texas",
    "population": 64376
  },
  {
    "name": "East Orange city, New Jersey",
    "population": 64268
  },
  {
    "name": "Lorain city, Ohio",
    "population": 63707
  },
  {
    "name": "Shawnee city, Kansas",
    "population": 63622
  },
  {
    "name": "Janesville city, Wisconsin",
    "population": 63588
  },
  {
    "name": "Pico Rivera city, California",
    "population": 63522
  },
  {
    "name": "Kissimmee city, Florida",
    "population": 63369
  },
  {
    "name": "Montebello city, California",
    "population": 63305
  },
  {
    "name": "Lodi city, California",
    "population": 63301
  },
  {
    "name": "Rockville city, Maryland",
    "population": 63244
  },
  {
    "name": "Homestead city, Florida",
    "population": 63190
  },
  {
    "name": "Conway city, Arkansas",
    "population": 62939
  },
  {
    "name": "Gaithersburg city, Maryland",
    "population": 62794
  },
  {
    "name": "Madera city, California",
    "population": 62624
  },
  {
    "name": "Tamarac city, Florida",
    "population": 62557
  },
  {
    "name": "Marysville city, Washington",
    "population": 62402
  },
  {
    "name": "Delray Beach city, Florida",
    "population": 62357
  },
  {
    "name": "Hamilton city, Ohio",
    "population": 62295
  },
  {
    "name": "Eden Prairie city, Minnesota",
    "population": 62258
  },
  {
    "name": "Council Bluffs city, Iowa",
    "population": 62115
  },
  {
    "name": "Taylor city, Michigan",
    "population": 62114
  },
  {
    "name": "Santa Cruz city, California",
    "population": 62041
  },
  {
    "name": "Daytona Beach city, Florida",
    "population": 62035
  },
  {
    "name": "Alpharetta city, Georgia",
    "population": 61981
  },
  {
    "name": "Coon Rapids city, Minnesota",
    "population": 61931
  },
  {
    "name": "Waltham city, Massachusetts",
    "population": 61918
  },
  {
    "name": "Utica city, New York",
    "population": 61822
  },
  {
    "name": "Haverhill city, Massachusetts",
    "population": 61797
  },
  {
    "name": "Cheyenne city, Wyoming",
    "population": 61537
  },
  {
    "name": "Conroe city, Texas",
    "population": 61533
  },
  {
    "name": "La Habra city, California",
    "population": 61392
  },
  {
    "name": "Burnsville city, Minnesota",
    "population": 61130
  },
  {
    "name": "Terre Haute city, Indiana",
    "population": 61112
  },
  {
    "name": "Encinitas city, California",
    "population": 60994
  },
  {
    "name": "Monterey Park city, California",
    "population": 60937
  },
  {
    "name": "Tulare city, California",
    "population": 60933
  },
  {
    "name": "Vineland city, New Jersey",
    "population": 60854
  },
  {
    "name": "New Braunfels city, Texas",
    "population": 60761
  },
  {
    "name": "West Allis city, Wisconsin",
    "population": 60732
  },
  {
    "name": "Greenville city, South Carolina",
    "population": 60709
  },
  {
    "name": "Meriden city, Connecticut",
    "population": 60638
  },
  {
    "name": "Ames city, Iowa",
    "population": 60634
  },
  {
    "name": "Bristol city, Connecticut",
    "population": 60603
  },
  {
    "name": "Bowling Green city, Kentucky",
    "population": 60600
  },
  {
    "name": "North Miami city, Florida",
    "population": 60565
  },
  {
    "name": "Malden city, Massachusetts",
    "population": 60374
  },
  {
    "name": "Taylorsville city, Utah",
    "population": 60227
  },
  {
    "name": "Pontiac city, Michigan",
    "population": 60175
  },
  {
    "name": "Springfield city, Ohio",
    "population": 60147
  },
  {
    "name": "Cupertino city, California",
    "population": 60009
  },
  {
    "name": "Grand Junction city, Colorado",
    "population": 59899
  },
  {
    "name": "Springfield city, Oregon",
    "population": 59869
  },
  {
    "name": "St. Clair Shores city, Michigan",
    "population": 59749
  },
  {
    "name": "Gardena city, California",
    "population": 59490
  },
  {
    "name": "Blaine city, Minnesota",
    "population": 59412
  },
  {
    "name": "National City city, California",
    "population": 59387
  },
  {
    "name": "Lancaster city, Pennsylvania",
    "population": 59360
  },
  {
    "name": "Mansfield city, Texas",
    "population": 59317
  },
  {
    "name": "West Des Moines city, Iowa",
    "population": 59296
  },
  {
    "name": "Rocklin city, California",
    "population": 59030
  },
  {
    "name": "Petaluma city, California",
    "population": 58921
  },
  {
    "name": "Rogers city, Arkansas",
    "population": 58895
  },
  {
    "name": "Great Falls city, Montana",
    "population": 58893
  },
  {
    "name": "Lakewood city, Washington",
    "population": 58852
  },
  {
    "name": "Des Plaines city, Illinois",
    "population": 58840
  },
  {
    "name": "Wellington village, Florida",
    "population": 58679
  },
  {
    "name": "Huntington Park city, California",
    "population": 58673
  },
  {
    "name": "San Rafael city, California",
    "population": 58502
  },
  {
    "name": "Chapel Hill town, North Carolina",
    "population": 58424
  },
  {
    "name": "Royal Oak city, Michigan",
    "population": 58410
  },
  {
    "name": "North Port city, Florida",
    "population": 58378
  },
  {
    "name": "Marietta city, Georgia",
    "population": 58359
  },
  {
    "name": "Broomfield city, Colorado",
    "population": 58298
  },
  {
    "name": "La Mesa city, California",
    "population": 58160
  },
  {
    "name": "Dubuque city, Iowa",
    "population": 58155
  },
  {
    "name": "Owensboro city, Kentucky",
    "population": 58083
  },
  {
    "name": "Cedar Park city, Texas",
    "population": 57957
  },
  {
    "name": "Idaho Falls city, Idaho",
    "population": 57899
  },
  {
    "name": "Casper city, Wyoming",
    "population": 57813
  },
  {
    "name": "Moore city, Oklahoma",
    "population": 57810
  },
  {
    "name": "Rowlett city, Texas",
    "population": 57703
  },
  {
    "name": "Valdosta city, Georgia",
    "population": 57597
  },
  {
    "name": "Arcadia city, California",
    "population": 57497
  },
  {
    "name": "White Plains city, New York",
    "population": 57403
  },
  {
    "name": "Orland Park village, Illinois",
    "population": 57392
  },
  {
    "name": "Lakeville city, Minnesota",
    "population": 57342
  },
  {
    "name": "Jupiter town, Florida",
    "population": 57221
  },
  {
    "name": "Tinley Park village, Illinois",
    "population": 57144
  },
  {
    "name": "Rocky Mount city, North Carolina",
    "population": 57136
  },
  {
    "name": "Medford city, Massachusetts",
    "population": 57033
  },
  {
    "name": "Oak Lawn village, Illinois",
    "population": 56995
  },
  {
    "name": "Ocala city, Florida",
    "population": 56945
  },
  {
    "name": "Novi city, Michigan",
    "population": 56912
  },
  {
    "name": "Auburn city, Alabama",
    "population": 56908
  },
  {
    "name": "Kokomo city, Indiana",
    "population": 56866
  },
  {
    "name": "Dearborn Heights city, Michigan",
    "population": 56838
  },
  {
    "name": "Berwyn city, Illinois",
    "population": 56800
  },
  {
    "name": "Port Orange city, Florida",
    "population": 56766
  },
  {
    "name": "Redmond city, Washington",
    "population": 56561
  },
  {
    "name": "Fountain Valley city, California",
    "population": 56464
  },
  {
    "name": "Diamond Bar city, California",
    "population": 56363
  },
  {
    "name": "Woodland city, California",
    "population": 56271
  },
  {
    "name": "New Brunswick city, New Jersey",
    "population": 56160
  },
  {
    "name": "Bowie city, Maryland",
    "population": 56129
  },
  {
    "name": "Midwest City city, Oklahoma",
    "population": 56080
  },
  {
    "name": "Manhattan city, Kansas",
    "population": 56069
  },
  {
    "name": "Taunton city, Massachusetts",
    "population": 56055
  },
  {
    "name": "Decatur city, Alabama",
    "population": 55996
  },
  {
    "name": "Kettering city, Ohio",
    "population": 55990
  },
  {
    "name": "Bartlett city, Tennessee",
    "population": 55945
  },
  {
    "name": "South Jordan city, Utah",
    "population": 55934
  },
  {
    "name": "Anderson city, Indiana",
    "population": 55554
  },
  {
    "name": "Chicopee city, Massachusetts",
    "population": 55490
  },
  {
    "name": "West Haven city, Connecticut",
    "population": 55404
  },
  {
    "name": "Santee city, California",
    "population": 55343
  },
  {
    "name": "Lake Elsinore city, California",
    "population": 55288
  },
  {
    "name": "Noblesville city, Indiana",
    "population": 55075
  },
  {
    "name": "Margate city, Florida",
    "population": 55026
  },
  {
    "name": "Porterville city, California",
    "population": 55023
  },
  {
    "name": "Coconut Creek city, Florida",
    "population": 55001
  },
  {
    "name": "Corvallis city, Oregon",
    "population": 54998
  },
  {
    "name": "Weymouth Town city, Massachusetts",
    "population": 54906
  },
  {
    "name": "Hempstead village, New York",
    "population": 54883
  },
  {
    "name": "Carson City, Nevada",
    "population": 54838
  },
  {
    "name": "Pocatello city, Idaho",
    "population": 54777
  },
  {
    "name": "Paramount city, California",
    "population": 54680
  },
  {
    "name": "Sanford city, Florida",
    "population": 54651
  },
  {
    "name": "Eastvale city, California",
    "population": 54635
  },
  {
    "name": "Buckeye town, Arizona",
    "population": 54542
  },
  {
    "name": "Mount Prospect village, Illinois",
    "population": 54505
  },
  {
    "name": "Rosemead city, California",
    "population": 54393
  },
  {
    "name": "Shoreline city, Washington",
    "population": 54352
  },
  {
    "name": "Hanford city, California",
    "population": 54324
  },
  {
    "name": "Highland city, California",
    "population": 54154
  },
  {
    "name": "Elyria city, Ohio",
    "population": 54086
  },
  {
    "name": "St. Peters city, Missouri",
    "population": 54078
  },
  {
    "name": "Port Arthur city, Texas",
    "population": 54010
  },
  {
    "name": "Normal town, Illinois",
    "population": 53837
  },
  {
    "name": "Brentwood city, California",
    "population": 53673
  },
  {
    "name": "Wheaton city, Illinois",
    "population": 53469
  },
  {
    "name": "Grand Forks city, North Dakota",
    "population": 53456
  },
  {
    "name": "Novato city, California",
    "population": 53301
  },
  {
    "name": "Revere city, Massachusetts",
    "population": 53179
  },
  {
    "name": "Colton city, California",
    "population": 53123
  },
  {
    "name": "Hendersonville city, Tennessee",
    "population": 53080
  },
  {
    "name": "Blue Springs city, Missouri",
    "population": 53014
  },
  {
    "name": "Lake Havasu City city, Arizona",
    "population": 52819
  },
  {
    "name": "Sarasota city, Florida",
    "population": 52811
  },
  {
    "name": "Euless city, Texas",
    "population": 52780
  },
  {
    "name": "Cathedral City city, California",
    "population": 52655
  },
  {
    "name": "Greenwood city, Indiana",
    "population": 52652
  },
  {
    "name": "Smyrna city, Georgia",
    "population": 52650
  },
  {
    "name": "Bellevue city, Nebraska",
    "population": 52604
  },
  {
    "name": "Delano city, California",
    "population": 52426
  },
  {
    "name": "Pensacola city, Florida",
    "population": 52340
  },
  {
    "name": "Hoffman Estates village, Illinois",
    "population": 52305
  },
  {
    "name": "Georgetown city, Texas",
    "population": 52303
  },
  {
    "name": "Yucaipa city, California",
    "population": 52265
  },
  {
    "name": "Florissant city, Missouri",
    "population": 52252
  },
  {
    "name": "Hoboken city, New Jersey",
    "population": 52034
  },
  {
    "name": "Oak Park village, Illinois",
    "population": 52015
  },
  {
    "name": "Battle Creek city, Michigan",
    "population": 51911
  },
  {
    "name": "Pflugerville city, Texas",
    "population": 51894
  },
  {
    "name": "Watsonville city, California",
    "population": 51881
  },
  {
    "name": "Peabody city, Massachusetts",
    "population": 51867
  },
  {
    "name": "Perth Amboy city, New Jersey",
    "population": 51744
  },
  {
    "name": "Placentia city, California",
    "population": 51673
  },
  {
    "name": "La Crosse city, Wisconsin",
    "population": 51647
  },
  {
    "name": "Kingsport city, Tennessee",
    "population": 51501
  },
  {
    "name": "Milford city (balance), Connecticut",
    "population": 51488
  },
  {
    "name": "West New York town, New Jersey",
    "population": 51464
  },
  {
    "name": "Richland city, Washington",
    "population": 51440
  },
  {
    "name": "Lakewood city, Ohio",
    "population": 51385
  },
  {
    "name": "Castle Rock town, Colorado",
    "population": 51348
  },
  {
    "name": "Albany city, Oregon",
    "population": 51322
  },
  {
    "name": "Burlington city, North Carolina",
    "population": 51306
  },
  {
    "name": "Lehi city, Utah",
    "population": 51173
  },
  {
    "name": "Elkhart city, Indiana",
    "population": 51152
  },
  {
    "name": "Minnetonka city, Minnesota",
    "population": 51123
  },
  {
    "name": "DeSoto city, Texas",
    "population": 51102
  },
  {
    "name": "Charleston city, West Virginia",
    "population": 51018
  },
  {
    "name": "Harrisonburg city, Virginia",
    "population": 50981
  },
  {
    "name": "Saginaw city, Michigan",
    "population": 50790
  },
  {
    "name": "Glendora city, California",
    "population": 50719
  },
  {
    "name": "Kirkland city, Washington",
    "population": 50697
  },
  {
    "name": "Bradenton city, Florida",
    "population": 50672
  },
  {
    "name": "Gilroy city, California",
    "population": 50660
  },
  {
    "name": "Southaven city, Mississippi",
    "population": 50374
  },
  {
    "name": "Plainfield city, New Jersey",
    "population": 50244
  },
  {
    "name": "Palm Desert city, California",
    "population": 50013
  },
  {
    "name": "San Marcos city, Texas",
    "population": 50001
  },
  {
    "name": "Troy city, New York",
    "population": 49946
  },
  {
    "name": "Niagara Falls city, New York",
    "population": 49722
  },
  {
    "name": "Joplin city, Missouri",
    "population": 49526
  }
];

places = _.first(places, 200);
// Merge places that are too close together.
var d, j, i = places.length;
while (--i > 0) {
  for (j = i; --j >= 0;) {
    d = d3.geo.distance(places[i].location, places[j].location);
    if (d < 0.03) {
      places[j].population += places[i].population;
      places.splice(i, 1);
      break;
    }
  }
}

angular.module('tracks.data', []).value('places', places);

}());
