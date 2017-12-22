import React from 'react'
import codeicon from '../vendor/code.svg'
import downloadicon from '../vendor/download.svg'

const DownloadCode = () => {
  return (
    <div>
    <button onClick={this.showSVGCode} className="btn__code"><img src={codeicon} alt="Show code"/></button>
    <button onClick={this.downloadSVGFile} className="btn__download"><img src={downloadicon} alt="Download"/></button>
    </div>
  )
}

export default DownloadCode
