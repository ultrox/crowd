import React from 'react'
import {copyToClipboard} from './helpers'
import * as api from './api'
import FlipIcon from 'src/styles/Flip'
import CompressIcon from 'src/styles/Compress'

function ShortLink() {
  const [display, setDisplay] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  function copyShortToClip(text) {
    copyToClipboard(text)
  }

  function handleOnSubmit(form) {
    const {orgUrl, customCode} = form

    setLoading(true)
    api
      .createShortLink(orgUrl.value, customCode.value)
      .then(resData => {
        setDisplay(resData.data)
        setLoading(false)})
      .catch(err => {
        // TODO handle err with state
        setLoading(false)
      })

    form.reset()
  }

  return (
    <div>
      <header>
        <div className="container">
          <div className="content">
            <Loading status={loading} />
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
              <div className="short-input">
                <button type="button" className="flip-button">
                  <FlipIcon />
                </button>
                <input
                  required
                  className="shorten"
                  autoComplete="off"
                  type="url"
                  placeholder="https://google.com"
                  id="orgUrl"
                />

                <button className="shorten-action">
                  <CompressIcon className="compress-icon" />
                </button>
              </div>
              {/* <input id="customCode" placeholder="goog" type="text" /> */}
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
function Loading({status}) {
  return status ? (
    <div className="loading">
      <p className="loader">Loading...</p>
    </div>
  ) : null
}

export default ShortLink
