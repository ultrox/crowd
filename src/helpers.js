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

