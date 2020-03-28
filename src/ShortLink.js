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
      .then(resData => setDisplay(resData.data))
    form.reset()
  }

  return (
    <div>
      <header>
        <div className="container">
          <div className="content">
            <h3 className="logo-text">Crowdly</h3>
            <p className="slogan">
              Simplify your life, wash your hands, and don't memorize links
            </p>
            <form
              method="POST"
              onSubmit={e => {
                e.preventDefault()
                handleOnSubmit(e.target)
              }}
            >
              <input
                className="shorten"
                type="url"
                placeholder="https://google.com"
                id="orgUrl"
              />
              <button className="shorten-action">Short</button>
            </form>
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          {display ? (
            <div className="information">
              <h4>Information</h4>
              <p className="full-url">{display.orgUrl}</p>
              <div className="info-content">
                <p className="shorted-url">{display.shortLink}</p>
                <button id="copy">Copy</button>

                {display.visited && (
                  <div className="visited">visited {display.visited}</div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </main>
      <div />
    </div>
  )
}

export default ShortLink
