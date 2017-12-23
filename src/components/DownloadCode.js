import React from 'react'
import codeicon from '../vendor/code.svg'
import downloadicon from '../vendor/download.svg'

const DownloadCode = (props) => {
  return (
    <div className="flex-row section__download">
      <button onClick={props.showSVGCode} className="btn btn__code"><img src={codeicon} alt="Show code" />Show code</button>
      <button onClick={props.downloadSVGFile} className="btn btn__download"><img src={downloadicon} alt="Download" />Download</button>
    </div>
  )
}

export default DownloadCode
