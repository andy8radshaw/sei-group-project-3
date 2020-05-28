import React from 'react'
import axios from 'axios'
import { getToken } from '../../lib/auth'
import Select from 'react-select'
class GroupEventNew extends React.Component {
  state = {
    formData : {
      eventName: '', 
      startDate: '',
      endDate: '',
      description: '',
      hike: ''
    },
    errors: {},
    hikes: ['']
  }
  async componentDidMount() {
    try {
      const hikes = await axios.get('/api/hikes')
      this.setState({ hikes: hikes.data })
    } catch (err) {
      this.props.history.push('/notfound')
      this.setState({ errors: err })
    }
  }
  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData })
  }
  handleHikeOptions = () => {
    let options = []
    this.state.hikes.map(hike => {
      let obj = {value: '', label: ''}
      obj.value = hike._id
      obj.label = hike.name
      return options.push(obj)
    })
    return options
  }
  handleHikeChange = selected => {
    // const selectedItems = selected ? selected.map(item => item.value) : []
    const formData = { ...this.state.formData, hike: selected.value }
    this.setState({ formData })
  }
  handleClear = () => {
    const formData = {
      eventName: '', 
      startDate: '',
      endDate: '',
      description: '',
      hike: ''
    }
    this.setState({ formData })
  }
  handleSubmit = async event => {
    event.preventDefault()
    const groupId = this.props.match.params.id
    const formData = { ...this.state.formData }
    this.setState({ formData })
    try {
      await axios.post(`/api/groups/${groupId}/events`, formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      await axios.get(`/api/groups/${groupId}`)
      this.props.history.push(`/groups/${groupId}`)
    } catch (err) {
      this.setState({ errors: err })
    }
  }
  render() {
    console.log(this.props)
    console.log(this.state)
    return (
      <section className="EventNew section">
        <div className="container">
        <div className="columns">
          <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box" style={{ margin: "5vh auto", height: '75vh'}}>
            <h1 className="title">
              <i className="fas fa-mountain mountain" style={{ height: 20}}></i>
                Create Your Event
              <i className="fas fa-mountain mountain" style={{ height: 20}}></i>
            </h1>   
            <hr />
            <div className="Event-entire-field" style={{ height: "55vh", 
      overflow: "auto" }}>
              <div className="field field-margin">
                <label className="label">Event Name:</label>
                  <div className="control">
                    <input
                      className={`input ${!this.state.errors.eventName ?  '' : 'is-danger'}`}
                      type="text"
                      placeholder="Event Name"
                      value={this.state.formData.eventName}
                      name="eventName"
                      onChange={this.handleChange}  
                    />
                 </div>
              </div>
                <div className="field field-margin">
                <label className="label">From:</label>
                  <div className="control">
                    <input
                      className={`input ${!this.state.errors.startDate ?  '' : 'is-danger'}`}
                      type="date"
                      placeholder="From"
                      value={this.state.formData.startDate.slice(0, 10)}
                      name="startDate"
                      onChange={this.handleChange}  
                    />
                  </div>
                </div>
                <div className="field field-margin">
                  <label className="label">To:</label>
                  <div className="control">
                    <input
                      className={`input ${!this.state.errors.startDate ?  '' : 'is-danger'}`}
                      type="date"
                      placeholder="To"
                      value={this.state.formData.endDate.slice(0, 10)}
                      name="endDate"
                      onChange={this.handleChange}  
                    />
                  </div>
                </div>
                <div className="field field-margin">
                <label className="label">Description:</label>
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
                <div className="field">
                <label className="label">Hike:</label>
                  <div className="control">
                    <Select
                      className={`column is-8 ${!this.state.errors.Hike ?  '' : 'is-danger'}`}
                      onChange={this.handleHikeChange}  
                      options={this.handleHikeOptions()}
                      style={{minWidth: 200}}
                    />
                  </div>
                </div>
                <div className="buttons is-right">
                  <button 
                    type='submit'
                    className="Submit button is-light"
                    style={{ minWidth: 100 }}
                  >
                    Create Event
                  </button>
                  <button className="button is-light" onClick={this.handleClear} style={{ minWidth: 70 }}>
                    Clear
                  </button>
                </div>
                </div>
          </form>
        </div>
        </div>
      </section>
    )
  }
}
export default GroupEventNew