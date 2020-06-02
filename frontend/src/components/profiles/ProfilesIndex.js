import React from 'react'
import { getAllUsers } from '../../lib/api'
import ProfilesList from './ProfilesList'

class ProfilesIndex extends React.Component {

  state = {
    profiles: [],
    search: '',
    defaultprofile: './defaultProfilePic.png'
  }

  async componentDidMount() {
    try {
      const res = await getAllUsers()
      this.setState({ profiles: res.data })
    } catch (err) {
      console.log(err.response)
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })

  }

  filteredNames = () => {
    const { profiles, search } = this.state
    const regexp = new RegExp(search, 'i')
    return profiles.filter(profile => {
      return regexp.test(profile.fullName || profile.username)
    })
  }


  render() {
    return (
      <>
        <section className="hero is-primary">
          <div className="hero-body profiles-index-hero">
            <div className="container has-text-centered">
              <h1 className="title profile-index-title">The Hikr Community</h1>
              <h1 className="subtitle profile-index-subtitle">find out more about your fellow hikrs</h1>
            </div>
          </div>
        </section>
        <section className="section ProfilesIndex">
          <div className="container">
            <div className="field">
              <div className="control">
                <input
                  className="input is-primary"
                  name="search"
                  type="text"
                  placeholder="Search for a Hikr"
                  onChange={this.handleChange}
                // value={this.state.searchTerm}
                />
              </div>
            </div>
            <div className="columns is-multiline">
              {this.filteredNames().map(profile => <ProfilesList key={profile._id} {...profile} />)}
            </div>
          </div>
        </section>
      </>
    )
  }

}

export default ProfilesIndex