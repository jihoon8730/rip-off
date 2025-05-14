// 축제 아이템
export interface FestivalItem {
  addr1: string;
  addr2: string;
  booktour: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contentid: string;
  contenttypeid: string;
  createdtime: string;
  eventstartdate: string;
  eventenddate: string;
  firstimage: string;
  firstimage2: string;
  cpyrhtDivCd: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  modifiedtime: string;
  areacode: string;
  sigungucode: string;
  tel: string;
  title: string;
}
// 축제 공통정보 아이템
export interface FestivalCommonItem {
  addr1: string;
  addr2: string;
  areacode: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contentid: string;
  contenttypeid: string;
  cpyrhtDivCd: string;
  createdtime: string;
  firstimage: string;
  firstimage2: string;
  homepage: string;
  lDongRegnCd: string;
  lDongSignguCd: string;
  lclsSystm1: string;
  lclsSystm2: string;
  lclsSystm3: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  modifiedtime: string;
  overview: string;
  sigungucode: string;
  tel: string;
  telname: string;
  title: string;
  zipcode: string;
}

// 축제 인트로정보 아이템
export interface FestivalIntroItem {
  ageLimit: string;
  bookingplace: string;
  contentid: string;
  contenttypeid: string;
  discountinfofesstival: string;
  eventenddate: string;
  eventstartdate: string;
  eventhomepage: string;
  eventplace: string;
  festivalgrade: string;
  festivaltype: string;
  placeinfo: string;
  playtime: string;
  program: string;
  progresstype: string;
  spendtimefestival: string;
  sponsor1: string;
  sponsor1tel: string;
  sponsor2: string;
  sponsor2tel: string;
  subevent: string;
  usetimefestival: string;
}

// items 래퍼 (배열)
export interface ItemsWrapper {
  item: FestivalItem[];
}

// body
export interface ResponseBody {
  items: ItemsWrapper;
  //   numOfRows: number;
  //   pageNo: number;
  //   totalCount: number;
}

// header
export interface ResponseHeader {
  resultCode: string;
  resultMsg: string;
}

// 최상위 응답 타입
export interface SearchFestivalResponse {
  response: {
    header: ResponseHeader;
    body: ResponseBody;
  };
}
