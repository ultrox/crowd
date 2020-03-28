export function createShortLink(url, code = '') {
  return postData({orgUrl: url, code}, '/createShortLink')
}


function postData(data, endopoint) {
  return fetch(`${process.env.REACT_APP_API}${endopoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => res.json())
}
