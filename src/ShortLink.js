import React from 'react'
import {copyToClipboard, isUrlValid} from './helpers'
import * as api from './api'
import {FlipIcon, WarnIcon, CompressIcon} from 'src/styles/Icons'
import text from './text'

function ShortLink() {
  const [display, setDisplay] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [shortUrl, setUrlToShort] = React.useState('')
  const [customCode, setCustomCode] = React.useState('')
  const [error, setError] = React.useState(null)
  const [urlStatus, setUrlStatusTo] = React.useState(true)
  const [mode, setNewMode] = React.useState(false)

  function copyShortToClip(text) {
    copyToClipboard(text)
  }

  function handleOnURLShort() {
    if (isUrlValid(shortUrl)) {
      setUrlStatusTo(true)
      setLoading(true)
      api
        .createShortLink(shortUrl, customCode)
        .then(resData => {
          setDisplay(resData.data)
          setCustomCode('')
          setUrlToShort('')
          setNewMode(false)
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
          setError(text.errors.apiFail)
        })
    } else {
      // url not valid
      setUrlStatusTo(false)
      setError(text.errors.urlInvalid)
    }
  }

  return (
    <div>
      <header>
        <div className="container">
          <div className="content">
            <Loading status={loading} />
            <h3 className="logo-text">Crowdly</h3>
            <p className="slogan">{text.slogan}</p>
            <ShortingForm onShort={handleOnURLShort}>
              <div className="short-input">
                <FlipButton onFlip={e => setNewMode(m => !m)} />
                {mode ? (
                  <input
                    onChange={e => setCustomCode(e.target.value)}
                    value={customCode}
                    className="shorten"
                    autoComplete="off"
                    placeholder={text.customCode.placeholder}
                  />
                ) : (
                  <input
                    onChange={e => setUrlToShort(e.target.value)}
                    value={shortUrl}
                    className="shorten"
                    autoComplete="off"
                    type="url"
                    placeholder={text.shortUrl.placeholder}
                    id="orgUrl"
                  />
                )}
                <button className="shorten-action">
                  <CompressIcon className="compress-icon" />
                </button>
              </div>
              {urlStatus ? null : <Error msg={error} />}
            </ShortingForm>
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


function FlipButton({onFlip}) {
  return (
    <button onClick={onFlip} type="button" className="flip-button">
      <FlipIcon />
    </button>
  )
}

function ShortingForm({onShort, children}) {
  return (
    <form
      method="POST"
      onSubmit={e => {
        e.preventDefault()
        onShort(e.target)
      }}
    >
      {children}
    </form>
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
