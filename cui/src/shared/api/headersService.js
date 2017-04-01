export const CONTENTTYPE = {
  json: 'application/json;charset=utf-8',
  urlencoded: 'application/x-www-form-urlencoded;charset=utf-8'
};

const defaultHeaderProps = {
  'Content-Type': (__STATIC__ ? CONTENTTYPE.json : CONTENTTYPE.urlencoded),
  'X-Requested-With': 'XMLHttpRequest',
  page_info: {
    page_number: 0,
    total_records_per_page: 20
  }
};

export default function processHeaders(headers) {
  const pageInfo = Object.assign({}, defaultHeaderProps.page_info, headers.page_info);
  const finalHeaders = Object.assign({}, defaultHeaderProps, headers, { page_info: pageInfo });

  Object.keys(finalHeaders).forEach((key) => {
    if (typeof finalHeaders[key] === 'object') {
      finalHeaders[key] = JSON.stringify(finalHeaders[key]);
    }
  });

  return finalHeaders;
}
