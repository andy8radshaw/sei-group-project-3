import React from 'react'
import axios from 'axios'
const uploadUrl = process.env.REACT_APP_IMAGE_UPLOAD_URL
const uploadPreset = process.env.REACT_APP_IMAGE_UPLOAD_PRESET

class GroupImgNew extends React.Component {
  state = {
    image: ''
  }

  handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    this.setState({
      image: res.data.url
    }, () => {
      this.props.onChange({ target: { name: this.props.name, value: this.state.image } })
    })
  }

  render() {
    return (
      <>
        <input
          className="input image-upload"
          type="file"
          onChange={this.handleUpload}
          style={{ fontSize: 15}}
        />
      </>
    )
  }
}

export default GroupImgNew