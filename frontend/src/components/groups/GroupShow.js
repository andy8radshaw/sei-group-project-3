import React from 'react'
import Calendar from 'react-calendar'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isAuthenticated, getUserId, getToken } from '../../lib/auth'


class GroupShow extends React.Component {
  state = {
    group: '',
    display: {
      Information : true,
      Members: false,
      Pictures: false,
      Events: false,
      Chat: false
    },
    date: new Date()
  }

  // fetch
  async componentDidMount() {
    try {
      const groupId = this.props.match.params.id
      const res = await axios.get(`/api/groups/${groupId}`)
      this.setState({ group : res.data })
    } catch (err) {
      console.log(err)
    }
  }

  // join the group
  handleJoinGroup = async () => {
    try {
      const groupId = this.props.match.params.id
      const userId = getUserId()
      const user = await axios.get(`/api/profiles/${userId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      console.log(user)
      const group = await axios.post(`/api/groups/${groupId}/members`, userId, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      this.setState({ group })
      window.alert(`Welcome ${user.data.username.toUpperCase()}!`)

      this.isGroupMember()
      this.props.history.push(`/groups/${groupId}`)
    } catch (err) {
      console.log(err.response)
    }
  }
  // unsubs from group
  handleUnsubscribe = async () => {
    try {
      const groupId = this.props.match.params.id
      const group = await axios.get(`/api/groups/${groupId}`)
      const userId = getUserId()
      const memberId = this.state.group.members.find( member => member.user === userId)._id
      const conf = window.confirm('Are you sure you want to unsubscribe?')
      if (conf && memberId) group = await axios.delete(`/api/groups/${groupId}/members/${memberId}`,{
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      this.setState({ group })
      this.props.history.push('/groups')
    } catch (err) {
      console.log(err)
    }
  }

  // auth
  isGroupMember = async () => {
    const userId = getUserId()
    const groupId = this.props.match.params.id
    const group = await axios.get(`/api/groups/${groupId}`)
    let member
    if (group.members) member = group.members.some( member => member.user._id === userId ) ? true : false
    return member
  }
  isAdmin = async () => {
    const userId = getUserId()
    const groupId = this.props.match.params.id
    const group = await axios.get(`/api/groups/${groupId}`)
    let admin
    if (group.createdMember) admin = group.createdMember._id === userId ? true : false
    return admin
  }

  // control views
  handleViewChange = event => {
    event.preventDefault()
    const display = { ...this.state.display }
    display[ Object.keys(display)[Object.values(display).indexOf(true)] ] = false
    display[event.target.name] = true
    this.setState({ display })
  }

  //event - calendar
  controlCalendar = date => this.setState({ date })


  // send email
  triggerOutlook = () => {
    const body = escape(window.document.title + String.fromCharCode(13)+ window.location.href)     
    const subject = "Take a look at this group from Hikr.com!"
    window.location.href = "mailto:?body="+body+"&subject="+subject          
  }


  render() {
    console.log(this.state)
    console.log(this.props)
    console.log(isAuthenticated())
    console.log(this.isGroupMember())
    console.log(this.isAdmin())
    
    const group = this.state.group

    let members
    if (group.members) {
      members = group.members.map( member => (
        <article class="media" key={member._id}>
          <div class="media-left">
            <figure class="image is-64x64">
              <img src={member.profileImage} alt={member.username} />
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
              <strong>{member.username}</strong><small>{member.email}</small>
                <br />
                {member.bio}
              </p>
            </div>

            <nav class="level is-mobile">
            <div class="level-left">

              <a class="level-item" aria-label="1.profile">
                <span class="icon is-small">
                  <Link to={`/profiles/${member.user._id}`}><i class="fas fa-address-card"></i></Link>
                </span>
              </a>

              <a class="level-item" aria-label="2.reply">
                <span class="icon is-small">
                  <i class="fas fa-reply" aria-hidden="true"></i>
                </span>
              </a>

                <a class="level-item" aria-label="3.favHike">
                  <span class="icon is-small">
                  { member.favoriteHikes ? 
                    <Link to={`/hikes/${member.favoriteHikes[0]._id}`}><i class="fas fa-heart" aria-hidden="true"></i></Link>
                    : ''
                  }
                </span>
              </a>
            </div>
          </nav>

        </div>
      </article>
      ))
    }

    let pictures
    if (group.userAddedImages) {
      pictures = group.userAddedImages.map( img => (
        <div class="column" key={img._id}>
          <figure className="image is-square"><img src={img.images} alt={group.name} style={{height: 100, width: 200}}/></figure>
        </div>
      ))
    }

    let events
    if (group.events) {
      events = group.events.map( event => {
        const hikeName = () => event.hike ? event.hike.name : ''
        const hikePage = () => event.hike ? event.hike._id : ''
        const counter = () => event.participants ? event.participants.length : ''
        return (
          <section class="section box" key={event._id}>
            <div class="container">
              <h1 class="subtitle"><strong>{event.eventName}</strong></h1>
              
              <p>Course:&nbsp;{hikeName()} <Link to={`/hikes/${hikePage()}`}><i class="fas fa-flag"></i></Link></p>
              <p style={{fontSize: 12}}> ~&nbsp;{event.description} ~</p>
                <hr />
              <p>Host:&nbsp;{event.createdMember.username}</p>
              <Link to={`/profiles/${event.createdMember._id}`}><figure class="image is-rounded is-64x64"><img class="is-rounded" src={event.createdMember.profileImage} alt={event.createdMember.username} /></figure></Link>
                <br />
                { event.participants.length ? <p style={{fontSize: 15}}>{`${counter()} will participate`}</p> : <p style={{fontSize: 15}}>Be the first participant!</p>}

              <div class="buttons is-right">
                <Link to={`${group._id}/events/${event._id}`} {...event}><button class="button is-small">Edit event</button></Link>
                <button class="button is-danger is-small">Join the Event</button>
              </div>
          
            </div>
          </section>
        )
      })
    }

    let chat
    if (group.messages) {
      chat = group.messages.map( msg => (
        // <div class="columns box">
        //   <div class="column is-2"><figure><img src={msg.user.profileImage} alt={msg.user._id} class="is-rounded" /></figure></div>
        //   <div class="column is-10" key={msg._id}>{msg.text}</div>
        //   <p>Updated at {msg.updatedAt}</p>
        // </div>
        <>
        <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>Barbara Middleton</strong>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
              <br />
              <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
            </p>
          </div>
      
          <article class="media">
            <figure class="media-left">
              <p class="image is-48x48">
                <img src="https://bulma.io/images/placeholders/96x96.png" />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>Sean Brown</strong>
                  <br />
                  Donec sollicitudin urna eget eros malesuada sagittis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam blandit nisl a nulla sagittis, a lobortis leo feugiat.
                  <br />
                  <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
                </p>
              </div>
      
              <article class="media">
                Vivamus quis semper metus, non tincidunt dolor. Vivamus in mi eu lorem cursus ullamcorper sit amet nec massa.
              </article>
      
              <article class="media">
                Morbi vitae diam et purus tincidunt porttitor vel vitae augue. Praesent malesuada metus sed pharetra euismod. Cras tellus odio, tincidunt iaculis diam non, porta aliquet tortor.
              </article>
            </div>
          </article>
      
          <article class="media">
            <figure class="media-left">
              <p class="image is-48x48">
                <img src="https://bulma.io/images/placeholders/96x96.png" />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>Kayli Eunice </strong>
                  <br />
                  Sed convallis scelerisque mauris, non pulvinar nunc mattis vel. Maecenas varius felis sit amet magna vestibulum euismod malesuada cursus libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus lacinia non nisl id feugiat.
                  <br />
                  <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
                </p>
              </div>
            </div>
          </article>
        </div>
      </article>
      <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" />
          </p>
        </figure>
        <div class="media-content">
          <div class="field">
            <p class="control">
              <textarea class="textarea" placeholder="Add a comment..."></textarea>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button">Post comment</button>
            </p>
          </div>
        </div>
      </article>
        </>
      ))
    }


    return (
      <div class="GroupShow">
        <section class="hero">
          <div class="hero-body">
            <div class="container">
              <figure className="image">
                <img src={group.headerImage} alt={group.name} style={{
                  resizeMode: "cover",
                  height: 300
                }} />
              </figure>
            </div>
          </div>
        </section>

        <div class="container">
  
          <div class="columns">
            <div class="column">
              <div class="buttons is-left">
                <button class="button is-outlined" name="Information" onClick={this.handleViewChange}><i class="fas fa-info-circle" aria-hidden="true"></i>&nbsp;Information</button>
                <button class="button is-outlined" name="Members" onClick={this.handleViewChange}><i class="fas fa-users" aria-hidden="true"></i>&nbsp;Members</button>
                <button class="button is-outlined" name="Pictures" onClick={this.handleViewChange}><i class="fas fa-image" aria-hidden="true"></i>&nbsp;Pictures</button>
                {this.isGroupMember() && <button class="button is-outlined" name="Events" onClick={this.handleViewChange}><i class="far fa-calendar-check" aria-hidden="true"></i>&nbsp;Events</button> }
                {this.isGroupMember() && <button class="button is-outlined" name="Chat" onClick={this.handleViewChange}><i class="fas fa-comments"></i>&nbsp;Chat</button> }
              </div>
            </div>
            <div class="column">
              <div class="buttons is-right">
                { this.isGroupMember() && <a class="button is-danger" onClick={this.triggerOutlook}>Recommend to Your Friend</a>}
                { this.isAdmin() && <Link to={`/groups/${group._id}/edit`}><a class="button is-light">Edit</a></Link>}
                { !this.isGroupMember() && <a class="button is-danger" onClick={this.handleJoinGroup}><strong>Join the Group!</strong></a>}
              </div>
            </div>
          </div>

          <div class={`${this.state.display.Information ? "Information" : "is-hidden" }`} style={{minHeight: 500}}>
            <section class="section">
              <div class="container">
                <h1 class="title"><strong>Welcome to {group.name}! </strong></h1>
                <p class="subtitle">Description</p>
                <div class="content">{group.description}</div>
              </div>
            </section>
          </div>

          <div class={`${this.state.display.Members ? "Members" : "is-hidden" }`} style={{minHeight: 500}}>
            <section class="section" >
                <div class="container">
                  <h1 class="subtitle">Group Members</h1>
                  { members }
                </div>
            </section>
          </div>

          <div class={`${this.state.display.Pictures ? "Pictures" : "is-hidden" }`} style={{minHeight: 500}}>
            <section class="section">
              <div class="container">
                <h1 class="subtitle">Group Pictures</h1>
                { pictures }
              </div>
            </section>
          </div>
        
          <div class={`${this.state.display.Events ? "Events" : "is-hidden" }`} style={{minHeight: 500}}>
            <section class="section" >
              <div class="container">
                <h1 class="subtitle">Events</h1>
                <nav class="panel">
                  <p class="panel-heading">Calendar Search</p>
                  <div class="panel-block">
                    <p class="control columns is-fullwidth is-multiline" style={{minHeight: 150}}>
                      <div class="column">
                        <label class="column is-2">From</label>
                        <input class="input column is-5" type="date" placeholder="From" />
                      </div>
                      <div class="column">
                      <label class="column is-2">To</label>
                      <input class="input column is-5" type="date" placeholder="To" />
                      </div>
                    </p>
                  </div>
                  <Calendar
                      onChange={this.controlCalendar}
                      value={this.state.date} />
                  <div class="panel-block">
                    <button class="button is-link is-outlined is-fullwidth">Reset all filter</button>
                  </div>
                </nav>
                
                { events }
                
              </div>
            </section>
          </div>

          <div class={`${this.state.display.Chat ? "Chat" : "is-hidden" }`} style={{minHeight: 500}}>
            <section class="section" >
              <div class="container">
                <h1 class="subtitle">Chat Board</h1>
                { chat }
              </div>
            </section>
          </div>
    

          { this.isGroupMember && <div class="column is-full"><button class="button is-small is-right" onClick={this.handleUnsubscribe}>Unsubscribe</button></div>}
        </div>
      </div>
      )
  }
    
}


export default GroupShow