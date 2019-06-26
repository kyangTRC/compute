import React from 'react';
import ReactDataGrid from 'react-data-grid';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "ag-grid-enterprise";
import * as XLSX from 'xlsx';
import {LicenseManager} from "ag-grid-enterprise/main";
LicenseManager.setLicenseKey("S&B_Admin_Services_MultiApp_4Devs15_June_2019__MTU2MDU1MzIwMDAwMA==cc18a13e606c6b48fed932a64c83907a");

const data = [
  {  
    "group1": "-",
    "group2": "-",
    "group3": "-",
    "OWNER_NAME_1": "TULSA JEWISH COMM COUNCIL INC & TULSA JEWISH COMM RETIREMENT",
    "OWNER_NAME_2": "HEALTH CARE CENTER",
    "SITE_ADDR": "2021 E 71ST ST",
    "SITE_CITY": "TULSA",
    "SITE_ZIP": 74136,
    "SITE_PLUS_4": 5408,
    "SITE_UNIT_PREFIX": "",
    "SITE_UNIT_NUMBER": "",
    "SITE_HOUSE_NUMBER": 2021,
    "SITE_DIRECTION": "E",
    "SITE_STREET_NAME": "71ST",
    "SITE_MODE": "ST",
    "SITE_QUADRANT": "",
    "OBJECTID": 168445,
    "FIPS_CODE": 40143,
    "PARCEL_APN": "06332830635900",
    "TAXAPN": "06332-83-06-35900",
    "ALTERNATE_TAXAPN": "",
    "MULTI_TAXAPN_FLAG": "",
    "YCOORD": 36.062672,
    "XCOORD": -95.963437,
    "GEOMETRY_SOURCE": "Parcels",
    "ADDR_SCORE": 5,

    "MAIL_ADDR": "2021 E 71ST ST",
    "MAIL_HOUSE_NUMBER": 2021,
    "MAIL_DIRECTION": "E",
    "MAIL_STREET_NAME": "71ST",
    "MAIL_MODE": "ST",
    "MAIL_QUADRANT": "",
    "MAIL_CITY": "TULSA",
    "MAIL_STATE": "OK",
    "MAIL_ZIP": 74136,
    "MAIL_PLUS_4": 5408,
    "MAIL_UNIT_PREFIX": "",
    "MAIL_UNIT_NUMBER": "",
    "MAIL_CARE_OF_NAME": "",
    "USE_CODE_STD_LPS": 9106,
    "USE_CODE_STD_DESC_LPS": "HOMES (RETIRED; HANDICAP, REST; CONVALESCENT; NURSING)",
    "USE_CODE_STD_CTGR_DESC_LPS": "EXEMPT, GOVERNMENT AND HISTORICAL",
    "USE_CODE_STD_CTGR_LPS": 9,
    "LEGAL_FULL": "LOT:1       BLK:1       SUBD:CAMP SHALOM AMD II RSB L1B1 CAMP SHALOM SEC/TWN/RNG/MER:SEC 06 TWN 18N RNG 13E LT 1 BLK 1 MAP REF:MAP: 8306",
    "LEGAL_SEC_TWP_RNG": "SEC 06 TWN 18N RNG 13E",
    "VAL_MRKT_LAND": 4597100,
    "VAL_MARKET": 18856004,
    "ACREAGE": 19.19,
    "CAL_ACREAGE": 19.2925,
    "PRICE_PER_ACRE": "",
    "DOC_TYPE_DESC_LPS": "",
    "AVM_VALUE": "",
    "LOCATION_ID": "US_40_143_06332830635900",
    "PROPERTY_DMP_ID": "100660192_87573252",
    "PARCEL_DMP_ID": "507905277_177068"
  },
  {
    "OBJECTID": 168827,
    "FIPS_CODE": 40143,
    "PARCEL_APN": 50030830640280,
    "TAXAPN": "50030-83-06-40280",
    "ALTERNATE_TAXAPN": "",
    "MULTI_TAXAPN_FLAG": "",
    "SITE_ADDR": "2087 E 71ST ST",
    "SITE_CITY": "TULSA",
    "SITE_STATE": "OK",
    "SITE_ZIP": 74136,
    "SITE_PLUS_4": 5423,
    "SITE_UNIT_PREFIX": "",
    "SITE_UNIT_NUMBER": "",
    "SITE_HOUSE_NUMBER": 2087,
    "SITE_DIRECTION": "E",
    "SITE_STREET_NAME": "71ST",
    "SITE_MODE": "ST",
    "SITE_QUADRANT": "",
    "YCOORD": 36.061765,
    "XCOORD": -95.961462,
    "GEOMETRY_SOURCE": "Parcels",
    "ADDR_SCORE": 5,
    "OWNER_NAME_1": "ARCP OFC MESA PORTFOLIO LLC",
    "OWNER_NAME_2": "",
    "MAIL_ADDR": "2325 E CAMELBACK RD STE 1100",
    "MAIL_HOUSE_NUMBER": 2325,
    "MAIL_DIRECTION": "E",
    "MAIL_STREET_NAME": "CAMELBACK",
    "MAIL_MODE": "RD",
    "MAIL_QUADRANT": "",
    "MAIL_CITY": "PHOENIX",
    "MAIL_STATE": "AZ",
    "MAIL_ZIP": 85016,
    "MAIL_PLUS_4": 9078,
    "MAIL_UNIT_PREFIX": "STE",
    "MAIL_UNIT_NUMBER": 1100,
    "MAIL_CARE_OF_NAME": "AMERICAN REALTY CAPITAL PROP INC",
    "USE_CODE_STD_LPS": 3003,
    "USE_CODE_STD_DESC_LPS": "OFFICE BLDG (GENERAL)",
    "USE_CODE_STD_CTGR_DESC_LPS": "COMMERCIAL (OFFICE)",
    "USE_CODE_STD_CTGR_LPS": 3,
    "LEGAL_FULL": "LOT:1       BLK:1       CITY:TULSA CITY SUBD:YORKTOWN 71 SEC/TWN/RNG/MER:SEC 06 TWN 18N RNG 13E LT 1 LESS BEG SECR LT 1 TH W5 NE7.07 S5 POB BLK 1 MAP REF:MAP: 8306",
    "LEGAL_SEC_TWP_RNG": "SEC 06 TWN 18N RNG 13E",
    "VAL_MRKT_LAND": 1955600,
    "VAL_MARKET": 10061500,
    "ACREAGE": 6.91,
    "CAL_ACREAGE": 6.834,
    "PRICE_PER_ACRE": 1456078,
    "DOC_TYPE_DESC_LPS": "SPECIAL WARRANTY DEED",
    "AVM_VALUE": "",
    "LOCATION_ID": "US_40_143_50030830640280",
    "PROPERTY_DMP_ID": "100660192_87573524",
    "PARCEL_DMP_ID": "507905277_177070"
  },
  {
    "OBJECTID": 168374,
    "FIPS_CODE": 40143,
    "PARCEL_APN": 39445830630760,
    "TAXAPN": "39445-83-06-30760",
    "ALTERNATE_TAXAPN": "",
    "MULTI_TAXAPN_FLAG": "",
    "SITE_ADDR": "6630 S ZUNIS AVE",
    "SITE_CITY": "TULSA",
    "SITE_STATE": "OK",
    "SITE_ZIP": 74136,
    "SITE_PLUS_4": 1125,
    "SITE_UNIT_PREFIX": "",
    "SITE_UNIT_NUMBER": "",
    "SITE_HOUSE_NUMBER": 6630,
    "SITE_DIRECTION": "S",
    "SITE_STREET_NAME": "ZUNIS",
    "SITE_MODE": "AVE",
    "SITE_QUADRANT": "",
    "YCOORD": 36.065396,
    "XCOORD": -95.961403,
    "GEOMETRY_SOURCE": "Parcels",
    "ADDR_SCORE": 5,
    "OWNER_NAME_1": "ORO AII ARBORS SOUTHERN HILLS LLC",
    "OWNER_NAME_2": "METRIC WOODLEY ARBORS SOUTHERN HILLS LLC",
    "MAIL_ADDR": "11766 WILSHIRE BLVD STE 325",
    "MAIL_HOUSE_NUMBER": 11766,
    "MAIL_DIRECTION": "",
    "MAIL_STREET_NAME": "WILSHIRE",
    "MAIL_MODE": "BLVD",
    "MAIL_QUADRANT": "",
    "MAIL_CITY": "LOS ANGELES",
    "MAIL_STATE": "CA",
    "MAIL_ZIP": 90025,
    "MAIL_PLUS_4": 6584,
    "MAIL_UNIT_PREFIX": "STE",
    "MAIL_UNIT_NUMBER": 325,
    "MAIL_CARE_OF_NAME": "",
    "USE_CODE_STD_LPS": 4007,
    "USE_CODE_STD_DESC_LPS": "CLUBS, LODGES, PROFESSIONAL ASSOCIATIONS",
    "USE_CODE_STD_CTGR_DESC_LPS": "RECREATIONAL",
    "USE_CODE_STD_CTGR_LPS": 4,
    "LEGAL_FULL": "LOT:2       BLK:2       CITY:TULSA CITY SUBD:SOUTHERN CROSS ADDN B2-3 SEC/TWN/RNG/MER:SEC 06 TWN 18N RNG 13E PRT LT 2 BEG NWC BLK 1 SOUTHERN CROSS ADDN TH E625 N170.56 W610.31 TH ON CRV RT 384.85 NE78.06 NW126.97 SW132 NW19.60 MAP REF:MAP: 8306",
    "LEGAL_SEC_TWP_RNG": "SEC 06 TWN 18N RNG 13E",
    "VAL_MRKT_LAND": 1559900,
    "VAL_MARKET": 6699000,
    "ACREAGE": 11.94,
    "CAL_ACREAGE": 11.3446,
    "PRICE_PER_ACRE": 498325,
    "DOC_TYPE_DESC_LPS": "LIMITED WARRANTY DEED",
    "AVM_VALUE": "",
    "LOCATION_ID": "US_40_143_39445830630760",
    "PROPERTY_DMP_ID": "100660192_87573250",
    "PARCEL_DMP_ID": "507905277_176047"
  },
  {
    "OBJECTID": 168376,
    "FIPS_CODE": 40143,
    "PARCEL_APN": 39445830629870,
    "TAXAPN": "39445-83-06-29870",
    "ALTERNATE_TAXAPN": "",
    "MULTI_TAXAPN_FLAG": "",
    "SITE_ADDR": "",
    "SITE_CITY": "",
    "SITE_STATE": "",
    "SITE_ZIP": "",
    "SITE_PLUS_4": "",
    "SITE_UNIT_PREFIX": "",
    "SITE_UNIT_NUMBER": "",
    "SITE_HOUSE_NUMBER": "",
    "SITE_DIRECTION": "",
    "SITE_STREET_NAME": "",
    "SITE_MODE": "",
    "SITE_QUADRANT": "",
    "YCOORD": 36.064964,
    "XCOORD": -95.963749,
    "GEOMETRY_SOURCE": "Parcels",
    "ADDR_SCORE": 1,
    "OWNER_NAME_1": "JEWISH FEDERATION OF TULSA",
    "OWNER_NAME_2": "",
    "MAIL_ADDR": "2021 E 71ST ST",
    "MAIL_HOUSE_NUMBER": 2021,
    "MAIL_DIRECTION": "E",
    "MAIL_STREET_NAME": "71ST",
    "MAIL_MODE": "ST",
    "MAIL_QUADRANT": "",
    "MAIL_CITY": "TULSA",
    "MAIL_STATE": "OK",
    "MAIL_ZIP": 74136,
    "MAIL_PLUS_4": 5408,
    "MAIL_UNIT_PREFIX": "",
    "MAIL_UNIT_NUMBER": "",
    "MAIL_CARE_OF_NAME": "",
    "USE_CODE_STD_LPS": 2000,
    "USE_CODE_STD_DESC_LPS": "COMMERCIAL (GENERAL)",
    "USE_CODE_STD_CTGR_DESC_LPS": "COMMERCIAL (RETAIL)",
    "USE_CODE_STD_CTGR_LPS": 2,
    "LEGAL_FULL": "LOT:2       BLK:1       CITY:TULSA CITY SUBD:SOUTHERN CROSS ADDN B2-3 SEC/TWN/RNG/MER:SEC 06 TWN 18N RNG 13E PRT LT 2 BEG 611W SWC BLK 1 TH W644.98 NW88.99 NW37.07 NE767.60 CRV LF 26.86 S200.88 SE71.39 E107 S95.44 W132.80 S248 POB BLK MAP REF:MAP: 8306",
    "LEGAL_SEC_TWP_RNG": "SEC 06 TWN 18N RNG 13E",
    "VAL_MRKT_LAND": 174000,
    "VAL_MARKET": 356660,
    "ACREAGE": 5.62,
    "CAL_ACREAGE": 5.6615,
    "PRICE_PER_ACRE": 30961,
    "DOC_TYPE_DESC_LPS": "WARRANTY DEED",
    "AVM_VALUE": "",
    "LOCATION_ID": "US_40_143_39445830629870",
    "PROPERTY_DMP_ID": "100660192_87573239",
    "PARCEL_DMP_ID": "507905277_177054"
  },
  {
    "OBJECTID": 168537,
    "FIPS_CODE": 40143,
    "PARCEL_APN": 44974830646000,
    "TAXAPN": "44974-83-06-46000",
    "ALTERNATE_TAXAPN": "",
    "MULTI_TAXAPN_FLAG": "",
    "SITE_ADDR": "2025 E 71ST ST",
    "SITE_CITY": "TULSA",
    "SITE_STATE": "OK",
    "SITE_ZIP": 74136,
    "SITE_PLUS_4": 5407,
    "SITE_UNIT_PREFIX": "",
    "SITE_UNIT_NUMBER": "",
    "SITE_HOUSE_NUMBER": 2025,
    "SITE_DIRECTION": "E",
    "SITE_STREET_NAME": "71ST",
    "SITE_MODE": "ST",
    "SITE_QUADRANT": "",
    "YCOORD": 36.063313,
    "XCOORD": -95.965258,
    "GEOMETRY_SOURCE": "Parcels",
    "ADDR_SCORE": 5,
    "OWNER_NAME_1": "TULSA JEWISH COMMUNITY",
    "OWNER_NAME_2": "RETIREMENT & HEALTH CARE CENTER",
    "MAIL_ADDR": "2025 E 71ST ST",
    "MAIL_HOUSE_NUMBER": 2025,
    "MAIL_DIRECTION": "E",
    "MAIL_STREET_NAME": "71ST",
    "MAIL_MODE": "ST",
    "MAIL_QUADRANT": "",
    "MAIL_CITY": "TULSA",
    "MAIL_STATE": "OK",
    "MAIL_ZIP": 74136,
    "MAIL_PLUS_4": 5407,
    "MAIL_UNIT_PREFIX": "",
    "MAIL_UNIT_NUMBER": "",
    "MAIL_CARE_OF_NAME": "",
    "USE_CODE_STD_LPS": 9106,
    "USE_CODE_STD_DESC_LPS": "HOMES (RETIRED; HANDICAP, REST; CONVALESCENT; NURSING)",
    "USE_CODE_STD_CTGR_DESC_LPS": "EXEMPT, GOVERNMENT AND HISTORICAL",
    "USE_CODE_STD_CTGR_LPS": 9,
    "LEGAL_FULL": "LOT:1       BLK:1       SUBD:VILLAS AT ZARROW CAMPUS, THE RSB L7&8 & SEC/TWN/RNG/MER:SEC 06 TWN 18N RNG 13E LT 1 BLK 1 MAP REF:MAP: 8306",
    "LEGAL_SEC_TWP_RNG": "SEC 06 TWN 18N RNG 13E",
    "VAL_MRKT_LAND": 1254100,
    "VAL_MARKET": 7651312,
    "ACREAGE": 7.2,
    "CAL_ACREAGE": 7.267,
    "PRICE_PER_ACRE": 55556,
    "DOC_TYPE_DESC_LPS": "WARRANTY DEED",
    "AVM_VALUE": "",
    "LOCATION_ID": "US_40_143_44974830646000",
    "PROPERTY_DMP_ID": "100660192_87573251",
    "PARCEL_DMP_ID": "507905277_177071"
  },
  {
    "OBJECTID": 168483,
    "FIPS_CODE": 40143,
    "PARCEL_APN": 23015830637870,
    "TAXAPN": "23015-83-06-37870",
    "ALTERNATE_TAXAPN": "",
    "MULTI_TAXAPN_FLAG": "",
    "SITE_ADDR": "6914 S YORKTOWN AVE",
    "SITE_CITY": "TULSA",
    "SITE_STATE": "OK",
    "SITE_ZIP": 74136,
    "SITE_PLUS_4": 3931,
    "SITE_UNIT_PREFIX": "",
    "SITE_UNIT_NUMBER": "",
    "SITE_HOUSE_NUMBER": 6914,
    "SITE_DIRECTION": "S",
    "SITE_STREET_NAME": "YORKTOWN",
    "SITE_MODE": "AVE",
    "SITE_QUADRANT": "",
    "YCOORD": 36.062913,
    "XCOORD": -95.961684,
    "GEOMETRY_SOURCE": "Parcels",
    "ADDR_SCORE": 5,
    "OWNER_NAME_1": "YONCE VENTURES LLC",
    "OWNER_NAME_2": "",
    "MAIL_ADDR": "8260 E 146TH ST S",
    "MAIL_HOUSE_NUMBER": 8260,
    "MAIL_DIRECTION": "E",
    "MAIL_STREET_NAME": "146TH",
    "MAIL_MODE": "ST",
    "MAIL_QUADRANT": "S",
    "MAIL_CITY": "BIXBY",
    "MAIL_STATE": "OK",
    "MAIL_ZIP": 74008,
    "MAIL_PLUS_4": 3921,
    "MAIL_UNIT_PREFIX": "",
    "MAIL_UNIT_NUMBER": "",
    "MAIL_CARE_OF_NAME": "",
    "USE_CODE_STD_LPS": 3003,
    "USE_CODE_STD_DESC_LPS": "OFFICE BLDG (GENERAL)",
    "USE_CODE_STD_CTGR_DESC_LPS": "COMMERCIAL (OFFICE)",
    "USE_CODE_STD_CTGR_LPS": 3,
    "LEGAL_FULL": "LOT:8       BLK:1       CITY:TULSA CITY SUBD:LEWIS VILLAGE SEC/TWN/RNG/MER:SEC 06 TWN 18N RNG 13E S230 LT 8 BLK 1 MAP REF:MAP: 8306",
    "LEGAL_SEC_TWP_RNG": "SEC 06 TWN 18N RNG 13E",
    "VAL_MRKT_LAND": 517500,
    "VAL_MARKET": 2080400,
    "ACREAGE": 1.98,
    "CAL_ACREAGE": 1.9636,
    "PRICE_PER_ACRE": 1262626,
    "DOC_TYPE_DESC_LPS": "WARRANTY DEED",
    "AVM_VALUE": "",
    "LOCATION_ID": "US_40_143_23015830637870",
    "PROPERTY_DMP_ID": "100660192_87573255",
    "PARCEL_DMP_ID": "507905277_176325"
  }
];

function genLink(v){
 return Math.floor(Math.random() * v) + 1 
} 
function b64toBlob(b64Data, contentType) {
  var sliceSize = 512;
  var byteCharacters = atob(b64Data);
  var byteArrays = [];
  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
function download(params, content) {
  var fileNamePresent = params && params.fileName && params.fileName.length !== 0;
  var fileName = fileNamePresent ? params.fileName : "trc_parcel_Data-NYSERDA_Multifamily.xlsx";
  var blobObject = b64toBlob(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blobObject, fileName);
  } else {
    var downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blobObject);
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}

const dataLink = "https://raw.githubusercontent.com/kyangTRC/sample/master/python_gen_data/data";

let minRowHeight = 25;
let currentRowHeight = minRowHeight;

/////////test/////////
const testSlice = data[0];

// const API_main = "http://dc1.parcelstream.com/GetQuery.aspx?";
// const API_wkt = `#TBD#`;
// const API_GetQuery = API_main + API_wkt;

// const API_main_doc = "https://apps.spatialstream.com/AppUtils/Document Images/DocumentImagesListAvailable.ashx?";

// const API_sub_doc = `city=`+data[0].SITE_CITY+`
// &address=`+ data[0].SITE_ADDR+`,
// &state=`+ data[0].SITE_STATE+`, 
// &ZIP=`+ data[0].SITE_STATE+`,
// &County=`+ data[0].County`,
// &locId=`+ data[0].LOCATION_ID+`,
// &code=THD2`+ `,
// &SS_CANDY=v2_KMb_vdltZ0ox829sdeJucOwKslUBkq5xpxJHUic3Iw`+`,
// &dmpId=`+ data[0].PARCEL_DMP_ID+`,
// &APN=`+ data[0].PARCEL_APN+`,
// &uid=101400_570428348&obsId=window&obsSuccessMethod=S_1_373&obsErrorMethod=E_1_373&output=JSON`;

// const API_DocQuery = API_main_doc + API_sub_doc;
let r_header = new Headers({'Access-Control-Allow-Origin':'*'});
r_header.append('SS_KEY', '92D43B7E-C95C-4407-ADBA-98A0A4715965');
let datacenter = "dc2";
let wkt = "LINESTRING (-95.9621226483684 36.066442984799,-95.9630934684588 36.0657434232634,-95.9630934684588 36.0641015951692,-95.9621226483684 36.0641015951692,-95.9621226483684 36.0611463046)";
let url = "https://parcelstream.com/getquery.aspx?output=documentation/" + datacenter + "/GetQuery.aspx?";
            url += "&dataSource=" + wkt;
            url += "&maxRecords=1"; // ony take the first record. If you need to code for multiple records that works just need to return WKT seperated by a simi colon 
            //url += "&output=xml"; // for my example comment out and un comment json
            url += "&output=json";
            url += "&fields=GEOMETRY"; // only need the WKT
            //url += "&SS_CANDY=" + candy;
            url += "&showSchema=false"; // adds the schema to the result. In this case we do not need it
            url += "&_dmp_debug=true";  


//let convert = require('xml-js');
let _data = data.map((i)=>{i.DOCUMENT_TYPE_DESCRIPTION="DEED TRANSFER";i.DOCUMENT_PRICE=6;i.DOCUMENT_AVAILABLE="Available"; return i});

let columnDefs = Object.keys(_data[0]).map((i)=>{
            return {headerName: i, field: i, filter: "agTextColumnFilter"}
        });


class Basic extends React.Component {
    constructor(props) {
    super(props);
    let _columnDefs = {
          headerName: "City",
          width: 260,
          showRowGroup: "SITE_CITY",
          cellRenderer: "agGroupCellRenderer",
          filterValueGetter: function(params) {
            return params.data ? params.data.SITE_CITY : null;
          }
        };
    let city_columnDefs = {
          field: "SITE_CITY",
          rowGroup: true,
          hide: true
        };
    let zip_columnDefs = {
          field: "SITE_ZIP",
          rowGroup: true,
          hide: true
        };
    columnDefs[0]=_columnDefs;
    columnDefs[1]=city_columnDefs;
    columnDefs[2]=zip_columnDefs;
    this.state = {
          error: null,
          isLoaded: false,
          rowData: _data,
          getRowHeight: function() {
            return currentRowHeight;
          },
          rowGroupPanelShow: "always",
          defaultExportParams: { suppressTextAsCDATA: true },    
          columnDefs: columnDefs,
          defaultColDef: {
            sortable: true,
            resizable: true,
            filter: true,
            minWidth: 150
          },
          excelStyles: [
        {
          id: "defaultReport",
          interior: {
            color: "#ffffff",
            pattern: "Solid"
          }
        },
        {
          id: "borderSolid",
          borders: {
                borderLeft: {
                    color: "#999999", lineStyle: 'Continuous', weight: 1
                },
                borderRight: {
                    color: "#999999", lineStyle: 'Continuous', weight: 1
                },
                borderBottom: {
                    color: "#999999", lineStyle: 'Continuous', weight: 1
                },
                borderTop: {
                    color: "#999999", lineStyle: 'Continuous', weight: 1
                }
            }
          },
         {
          id: "header",
          interior: {
            color: "#d2d2d2",
            pattern: "Solid"
          },
          borders: {
                borderLeft: {
                    color: "#000000", lineStyle: 'Continuous', weight: 2
                },
                borderRight: {
                    color: "#000000", lineStyle: 'Continuous', weight: 2
                },
                borderBottom: {
                    color: "#000000", lineStyle: 'Continuous', weight: 2
                },
                borderTop: {
                    color: "#000000", lineStyle: 'Continuous', weight: 2
                }
            }
          }
        ]

        };
    }

    componentDidMount() {
        let dataAsJson = {};
        let url = "https://parcelstream.com/admin/getSIK.aspx?ACCOUNT=TRCSolutions&LOGIN=ActUser";
        fetch(url, r_header)
          .then(response => response.text()).then(str => {
            dataAsJson = JSON.parse(convert.xml2json(str));        
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
  }
  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    minRowHeight = 25;
    currentRowHeight = minRowHeight;
    params.api.sizeColumnsToFit();
    let datasource = dataLink + genLink(25) + ".json";    
    fetch(datasource)
       .then(result => result.json())
       .then(rowData => this.setState({rowData}));
  };

  onGridSizeChanged(params) {
    var gridHeight = document.getElementsByClassName("ag-body-viewport")[0].offsetHeight;
    var renderedRows = params.api.getRenderedNodes();
    if (renderedRows.length * minRowHeight >= gridHeight) {
      if (currentRowHeight !== minRowHeight) {
        currentRowHeight = minRowHeight;
        params.api.resetRowHeights();
      }
    } else {
      currentRowHeight = 25 || Math.floor(gridHeight / renderedRows.length);
      params.api.resetRowHeights();
    }
  }

  onCsvExport() {
    //csv
    var params = {
      skipHeader: false,
      columnGroups: false,
    };
    
    this.gridApi.exportDataAsCsv(params);
  }
  onBtExport() {
    //xls format
    var params = {
      skipHeader: false,
      columnGroups: true,
    };
    
    this.gridApi.exportDataAsExcel(params);
  }
  onBtExportNew() {
      //xlsx format
    var params = {
      skipHeader: false,
      columnGroups: true,
    };

    var content = this.gridApi.getDataAsExcel(params);
    var workbook = XLSX.read(content, { type: "binary" });
    var xlsxContent = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "base64"
    });
    download(params, xlsxContent);
  }
  onBtPrint() {
      window.print();    
  }
  render () {
    let price_rows = this.state.rowData.length * 6;
    return (
    <div style={{ width: "100%", height:"680px" }}>
    <div className="buttonGroup"><label className="exportButtons">
    <button type="button" className="btn" id="excelExportNew" onClick={this.onBtExportNew.bind(this)} >
    <div>x</div></button><button type="button" className="btn" id="pdfExport" onClick={this.onBtPrint.bind(this)} >PDF</button>
    <button type="button" className="btn" id="csvExport"  onClick={this.onCsvExport.bind(this)}>CSV</button>
    <button type="button" className="btn" id="printButton" onClick={this.onBtPrint.bind(this)}></button></label>
    </div>
       <div 
        className="ag-theme-balham"
        style={{ width: "100%", height:"600px" }}>
        <h3>Project Name: NYSERDA_Multifamily</h3>
        <h3>Project Id: 114810.0000.0000</h3>
        <AgGridReact
          columnDefs={this.state.columnDefs}
          defaultExportParams={this.state.defaultExportParams}
          rowGroupPanelShow={this.state.rowGroupPanelShow}
          defaultColDef={this.state.defaultColDef}
          enableRangeSelection={true}
          animateRows={true}
          groupUseEntireRow={true}
          rowData={this.state.rowData}
          groupDefaultExpanded={-1}
          getRowHeight={this.state.getRowHeight}
          autoGroupColumnDef={this.state.autoGroupColumnDef}
          groupSuppressAutoColumn={true}
          excelStyles={this.state.excelStyles}
          onGridReady={this.onGridReady}
          onGridSizeChanged={this.onGridSizeChanged.bind(this)}
          />

        <a download="#" href="#" title="all">
            Download all, Price: ${price_rows}
        </a>
        </div></div>
        );
  }

}

export default Basic;