import React from 'react'

function ShortLink() {
  const [display, setDisplay] = React.useState('')

  function handleOnSubmit(form) {
    const {orgUrl} = form
    fetch('https://crowd112.herokuapp.com/api' + `/createShortLink/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({orgUrl: orgUrl.value}),
    })
      .then(res => res.json())
      .then(data => setDisplay(data))
    form.reset()
  }

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleOnSubmit(e.target)
        }}
      >
        <input type="url" placeholder="https://google.com" id="orgUrl" />
        <button>Short me</button>
      </form>
      <div></div>
      <pre style={{backgroundColor: 'white'}}>
        {JSON.stringify(display, null, 2)}
      </pre>
    </div>
  )
  return <input />
}
export default ShortLink
