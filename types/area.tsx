export interface AreaItem {
  rnum: number;
  code: string;
  name: string;
}

// items 래퍼 (배열)
export interface ItemsWrapper {
  item: AreaItem[];
}

// body
export interface ResponseBody {
  items: ItemsWrapper;
  // 만약 numOfRows, pageNo, totalCount 등이 추가로 온다면 여기에 선언하세요.
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
