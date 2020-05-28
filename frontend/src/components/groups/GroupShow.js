import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isAuthenticated, getUserId, getToken } from '../../lib/auth'
import GroupShowInformation from './GroupShowInformation'
import GroupShowMembers from './GroupShowMembers'
import GroupShowPictures from './GroupShowPictures'
import GroupShowEvents from './GroupShowEvents'
import GroupShowChat from './GroupShowChat'
import { getSingleGroup, joinGroup, leaveGroup, deleteEvent, deletePic, uploadPic, joinEvent, leaveEvent } from '../../lib/api'
class GroupShow extends React.Component {
  state = {
    group: null,
    currentlyDisplayed: 'information',
    member: false,
    admin: false,
    formData: {
      text: '',
      user: '',
      to: ''
    }
  }
  // fetch
  getData = async () => {
    try {
      const groupId = this.props.match.params.id
      const userId = getUserId()
      const res = await getSingleGroup(groupId)
      this.setState({
        group: res.data,
        member: res.data.members.some(member => member.user._id === userId),
        admin: res.data.createdMember._id === userId
      })
    } catch (err) {
      console.log(err)
    }
  }
  componentDidMount() {
    this.getData()
  }
  // join the group
  handleJoinGroup = async () => {
    try {
      const groupId = this.props.match.params.id
      const userId = getUserId()
      await joinGroup(groupId, userId)
      this.getData()
    } catch (err) {
      console.log(err.response)
    }
  }
  // leave the group
  handleUnsubscribe = async () => {
    try {
      const groupId = this.props.match.params.id
      const userId = getUserId()
      const memberToRemove = this.state.group.members.find(member => member.user._id === userId)
      if (!memberToRemove) return
      await leaveGroup(groupId, memberToRemove._id)
      this.getData()
    } catch (err) {
      console.log(err)
    }
  }
  // control views
  handleViewChange = event => {
    this.setState({ currentlyDisplayed: event.target.name })
  }
  // send email
  triggerOutlook = () => {
    const body = escape(window.document.title + String.fromCharCode(13) + window.location.href)
    const subject = "Take a look at this group from Hikr.com!"
    window.location.href = "mailto:?body=" + body + "&subject=" + subject
  }
  //events
  handleEventDelete = async e => {
    e.preventDefault()
    try {
      const groupId = this.props.match.params.id
      const eventId = e.target.value
      await deleteEvent(groupId, eventId)
      this.getData()
    } catch (err) {
      console.log(err)
    }
  }
  handleJoinEvent = async event => {
    try {
      const groupId = this.props.match.params.id
      const eventId = event.target.value
      await joinEvent(groupId, eventId)
      this.getData()
    } catch (err) {
      console.log(err)
    }
  }
  handleCancelEvent = async (eventId, parId) => {
    try {
      const groupId = this.props.match.params.id
      await leaveEvent(groupId, eventId, parId)
      this.getData()
    } catch (err) {
      console.log(err.response)
    }
  }
  // userAddedImages
  handleUploadPhoto = async event => {
    try {
      const groupId = this.props.match.params.id
      await uploadPic(groupId, { images: event.target.value, user: getUserId() })
      this.getData()
    } catch (err) {
      console.log(err)
    }
  }
  handleDeletePhoto = async event => {
    try {
      const groupId = this.props.match.params.id
      const imageId = event.target.value
      await deletePic(groupId, imageId)
      this.getData()
    } catch (err) {
      console.log(err)
    }
  }
  // messages
  handleMessageChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData })
  }
  handleMessageSubmit = async () => {
    try {
      const groupId = this.props.match.params.id
      await axios.post(`/api/groups/${groupId}/messages`, {
        text: this.state.formData.text,
        user: getUserId()
      }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      this.getData()
    } catch (err) {
      this.setState({ errors: err })
    }
  }
  sendEmail = async email => {
    // const groupId = this.props.match.params.id
    // const res = await axios.get(`/api/groups/${groupId}`)
    // const email = res.data.members.filter( member => member.user._id === event.target.value ).email
    const body = escape(window.document.title + String.fromCharCode(13) + window.location.href)
    const subject = "Hi from Hikr.com!"
    window.location.href = "mailto:" + email + "?body=" + body + "&subject=" + subject
  }
  handleMessageDelete = async (groupId, messageId) => {
    try {
      await axios.delete(`/api/groups/${groupId}/messages/${messageId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      this.getData()
    } catch (err) {
      console.log(err.response)
    }
  }
  handleLikes = async (groupId, messageId, likes) => {
    try {
      const userId = getUserId()
      if (likes.length > 0 && likes.find(like => like.user._id === userId)) return
      const resUser = await axios.get(`/api/profiles/${userId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      await axios.put(`/api/groups/${groupId}/messages/${messageId}/likes`, resUser.data, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      this.getData()
    } catch (err) {
      console.log(err.response)
    }
  }
  render() {
    const { group, member, admin, currentlyDisplayed, formData } = this.state
    if (!group) return null // not render until group is not null (null--render nothing, !null (second render) -render)
    return (
      <div className="GroupShow box">
        <div className="hero is-medium is-success">
          <div className="hero-body" style={{ backgroundImage: `url(${group.headerImage})` }}>
            <h1 className="title-logo">{group.name}</h1>
          </div>
        </div>
        <div className="box">
          <section className="group-show-buttons">
            <div className="buttons has-addons">
              <button
                className="button is-warning is-light group-show-button"
                name="information"
                onClick={this.handleViewChange}
              >
                Group Home
                </button>
              {member &&
                <button
                  className="button  is-primary is-light group-show-button"
                  name="chat"
                  onClick={this.handleViewChange}
                >
                  Group Chat
                  </button>
              }
              {member &&
                <Link to={`/groups/${group._id}/events`}>
                  <button
                    className="button is-success is-light  group-show-button"
                  >
                    <i className="fas fa-hiking"></i>
                      &nbsp; Create Your Event
                    </button>
                </Link>
              }
            </div>
            <div className="buttons has-addons">
              {member &&
                <button
                  className="button group-show-button is-info is-light"
                  onClick={this.triggerOutlook}
                >
                  <i className="fas fa-user-plus"></i>
                      &nbsp;Recommend to Friend
                    </button>
              }
              {admin &&
                <Link
                  to={`/groups/${group._id}/edit`}
                  className="button is-light group-show-button"
                >
                  Edit Group
                    </Link>
              }
              {(isAuthenticated() && !member) &&
                <button className="button group-show-button is-info" onClick={this.handleJoinGroup}>
                  <strong>Join Group</strong>
                </button>
              }
              {member &&
                <button
                  className="button is-light is-danger group-show-button"
                  onClick={this.handleUnsubscribe}
                >
                  Leave Group
            </button>
              }
            </div>
          </section>
          <GroupShowInformation
            group={group}
            members={group.members}
            photos={group.userAddedImages}
            events={group.events}
            member={member}
            currentlyDisplayed={currentlyDisplayed}
            handleViewChange={this.handleViewChange}
            sendEmail={this.sendEmail}
          />
          <GroupShowMembers
            currentlyDisplayed={currentlyDisplayed}
            group={group}
            sendEmail={this.sendEmail}
          />
          <GroupShowPictures
            currentlyDisplayed={currentlyDisplayed}
            images={group.userAddedImages}
            name={group.name}
            handleDeletePhoto={this.handleDeletePhoto}
            member={member}
            handleUploadPhoto={this.handleUploadPhoto}
          />
          <GroupShowEvents
            group={group}
            events={group.events}
            currentlyDisplayed={currentlyDisplayed}
            handleEventDelete={this.handleEventDelete}
            handleJoinEvent={this.handleJoinEvent}
            handleCancelEvent={this.handleCancelEvent}
            sendEmail={this.sendEmail}
          />
          <GroupShowChat
            group={group}
            messages={group.messages}
            text={formData.text}
            currentlyDisplayed={currentlyDisplayed}
            handleMessageChange={this.handleMessageChange}
            handleMessageSubmit={this.handleMessageSubmit}
            handleMessageDelete={this.handleMessageDelete}
            handleLikes={this.handleLikes}
          />
        </div>
      </div>
    )
  }
}
export default GroupShow