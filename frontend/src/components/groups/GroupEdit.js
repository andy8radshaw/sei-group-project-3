import React from 'react'
import axios from 'axios'
import { getToken } from '../../lib/auth'
import GroupHeaderImgNew from './GroupHeaderImgNew'

class GroupEdit extends React.Component {
  state = {
    formData: {
      name: '',
      headerImage: '',
      description: ''
    },
    errors: {}
  }

  async componentDidMount() {
    const groupId = this.props.match.params.id
    try {
      const content = await axios.get(`/api/groups/${groupId}`)
      this.setState({ formData: content.data })
    } catch (err) {
      console.log(err.response)
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    console.log(formData)
    this.setState({ formData })
  }

  handleClear = () => {
    const formData = {
      name: '',
      headerImage: '',
      description: ''
    }
    this.setState({ formData })
  }

  // added token auth
  handleSubmit = async event => {
    event.preventDefault()
    const groupId = this.props.match.params.id
    try {
      const group = await axios.put(`/api/groups/${groupId}`, this.state.formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      this.props.history.push(`/groups/${groupId}`)
      console.log(group)
    } catch (err) {
      this.setState({ errors: err })
    }
  }

  render() {
    console.log(this.state)
    console.log(this.props)

    return (
      <section className="ContentNew section background-group-edit">
        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">
              <h1 className="title"><i className="fas fa-mountain mountain"></i> Edit your Group <i className="fas fa-mountain mountain"></i></h1>
              <hr />
              <div>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                        <input
                          className={`input ${!this.state.errors.name ? '' : 'is-danger'}`}
                          type="text"
                          placeholder="Name"
                          value={this.state.formData.name}
                          name="name"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                <div className="field">
                <label className="label">Image</label>
                  <div className="control">
                        <div className={`control ${!this.state.errors.headerImage ? '' : 'is-danger'}`}>
                          <GroupHeaderImgNew
                            onChange={this.handleChange}
                            name="headerImage"
                          />
                        </div>
                        {/* <input
                            className={`input ${!this.state.errors.headerImage ?  '' : 'is-danger'}`}
                            type="text"
                            placeholder="Header image"
                            value={this.state.formData.headerImage}
                            name="headerImage"
                            onChange={this.handleChange}  
                          /> */}
                      </div>
                    </div>
                <div className="field">
                <label className="label">Description</label>
                  <div className="control">
                        <textarea
                          className="textarea"
                          placeholder="Description"
                          onChange={this.handleChange}
                          name='description'
                          value={this.state.formData.description}
                        />
                      </div>
                    </div>
                <div className="two-btns">
                    <button type='submit' className="button submit">Save Changes!</button>
                    <button className="button" onClick={this.handleClear}>Clear</button>
                  </div>

              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default GroupEdit
