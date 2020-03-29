import React from 'react'
import {copyToClipboard} from './helpers'
import * as api from './api'

function ShortLink() {
  const [display, setDisplay] = React.useState('')

  function copyShortToClip(text) {
    copyToClipboard(text)
  }

  function handleOnSubmit(form) {
    const {orgUrl, customCode} = form

    api
      .createShortLink(orgUrl.value, customCode.value)
      .then(resData => setDisplay(resData.data))
      .catch(err => {
        // TODO handle err with state
      })

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
                autoComplete="off"
                className="shorten"
                type="url"
                placeholder="https://google.com"
                id="orgUrl"
              />
              <input id="customCode" placeholder="goog" type="text" />
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
                <button
                  onClick={() => copyShortToClip(display.shortLink)}
                  id="copy"
                >
                  Copy
                </button>

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
