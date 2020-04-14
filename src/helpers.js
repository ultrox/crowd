export function copyToClipboard(text) {
  let input = document.createElement('input')
  document.body.appendChild(input)
  input.value = text
  input.style.position = 'absolute'
  input.style.top = '-2000px'
  input.select()
  document.execCommand('copy')
  input.outerHTML = ''
}

export function isUrlValid(url) {
  // regxp code from https://www.regextester.com/96928
  const regxp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/

  return regxp.test(url)
}
