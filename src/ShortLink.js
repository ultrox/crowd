import React from 'react'
import {copyToClipboard, isUrlValid} from './helpers'
import * as api from './api'
import FlipIcon from 'src/styles/Flip'
import CompressIcon from 'src/styles/Compress'

function ShortLink() {
  const [display, setDisplay] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [shortUrl, setUrlToShort] = React.useState('')
  const [error, setError] = React.useState(null)
  const [urlStatus, setUrlStatusTo] = React.useState(true)
  function copyShortToClip(text) {
    copyToClipboard(text)
  }

  function handleOnSubmit() {
    if (isUrlValid(shortUrl)) {
      setUrlStatusTo(true)
      setLoading(true)
      api
        .createShortLink(shortUrl, customCode)
        .then(resData => {
          setDisplay(resData.data)
          setCustomCode('')
          setUrlToShort('')
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
          setError('api faild')
        })
    } else {
      // url not valid
      setUrlStatusTo(false)
      setError('url invalid')
    }
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
                  onChange={e => setUrlToShort(e.target.value)}
                  value={shortUrl}
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
              {urlStatus ? null : <Error msg={error} />}
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

function Error({msg}) {
  return (
    <div className="error">
      <WarnIcon color="red" w="19" h="19" />
      <p>{msg}</p>
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
