// 축제 단일 아이템
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
