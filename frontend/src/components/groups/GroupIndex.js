import React from 'react'
import axios from 'axios'
import GroupCard from './GroupCard'

class GroupIndex extends React.Component {
  state = {
    groups: null
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/groups')
      this.setState({ groups: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }


  render() {
    const { groups } = this.state
    if (!groups) return null

    return (
      <div className="GroupIndex">
        <div className="hero is-medium">
          <div className="hero-body">
            <h1 className="title has-text-centered">The Hikr Groups</h1>
          </div>
        </div>
        <div>
          <section className="GroupCard section">
              <div className="columns is-multiline is-fullwidth">
                {groups.map( (group, index) => (
                  <GroupCard
                    key={index}
                    group={group}
                    members={group.members}
                  />
                ))}
              </div>
          </section>
        </div>
      </div>
    )
  }
}
export default GroupIndex