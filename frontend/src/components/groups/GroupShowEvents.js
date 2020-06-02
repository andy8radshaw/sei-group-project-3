import React from 'react'
import { getUserId } from '../../lib/auth'
import { Link } from 'react-router-dom'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const GroupShowEvents = ({ events, group, currentlyDisplayed, handleEventDelete, handleJoinEvent, handleCancelEvent, sendEmail }) => {

  const userId = getUserId()

  const isInGroup = (participants) => {
    return participants.some(person => person.user._id === userId)
  }

  return (
    <div 
      className="Event container"    
        style={{ 

          display: `${currentlyDisplayed === 'events' ? 'block' : 'none' }`,
        }}
      >
      {events.map(item => {
        const numOfPs = item.participants.length
        const participantId = item.participants.find(par => par.user._id === userId)
        return(
          <div className="box" key={item._id}>
            {item.createdMember._id === getUserId() && 
              <div className="buttons is-right">
                <Link to={`/groups/${group._id}/events/${item._id}/edit`} className="button is-small">
                  Edit event
                </Link>
                <button className="button is-small" value={item._id} onClick={handleEventDelete}>
                  Delete
                </button>
              </div>
            }

            <h1 className="subtitle" style={{ fontSize: 30, fontFamily: "Amatic SC, cursive"}}><strong>{item.eventName}</strong></h1>
            <p style={{fontSize: 18}}>~&nbsp;{item.description}~</p>
            <br />

            <div className="columns">
              {item.hike &&
                <div className="column">
                  <p style={{ fontFamily: 'Amatic SC, cursive', fontSize: 20}}>
                    <i className="fas fa-mountain"></i>&nbsp;
                    Course:&nbsp;{item.hike.name}&nbsp;
                  </p>
                  {item.hike.images.length >= 1 && 
                    <figure className="image is-3by2">
                      <img src={item.hike.images[0]} alt="img" />
                    </figure>
                  }
                  <p style={{fontSize: 15, marginTop: 2}}>
                    &nbsp;&nbsp;&nbsp;
                    <i className="fas fa-hiking"></i>
                    &nbsp;{item.hike.difficulty}
                  </p>
                  <p style={{fontSize: 15}}>
                    &nbsp;&nbsp;&nbsp;
                    <i className="fas fa-globe"></i>
                    &nbsp;{item.hike.country}
                  </p>
                  <p className="HikeDescription" style={{ fontSize: 15, maxHeight: 300, overflow: "auto" }}>
                    &nbsp;&nbsp;&nbsp;
                    <i className="fas fa-info-circle"></i>
                    &nbsp;{item.hike.description}
                  </p>
  
                  <p>
                    <Link to={`/hikes/${item.hike._id}`} style={{ fontSize: 10, color: 'blue', fontFamily: "arial"}}>
                      &nbsp;&nbsp;&nbsp;<i className="fas fa-flag"></i>&nbsp;Check more info
                    </Link>
                  </p>
                </div>
              }

              <div className="column">
                <p style={{ fontSize: 20, fontFamily: "Amatic SC, cursive"}}>
                  <i className="fas fa-user"></i>&nbsp;
                  Event Host:&nbsp;
                  {item.createdMember.username.replace(item.createdMember.username[0], item.createdMember.username[0].toUpperCase())}
                </p>
                <div className="level-left" style={{ display: "flex"}}>
                  <Link 
                    to={`/profiles/${item.createdMember._id}`} 
                    className="level-item bio"
                    style={{ fontSize: 10, color: 'blue', fontFamily: "arial", marginRight: 10}}
                  >
                    See profile
                  </Link>
                  <a 
                    className="level-item" 
                    aria-label="2.reply"
                    onClick={() => sendEmail(item.createdMember.email)}
                    href="null"
                  >
                    <span className="icon is-small">
                      <i className="fas fa-reply" aria-hidden="true"></i>
                    </span>
                  </a>
                </div>

                <Link to={`/profiles/${item.createdMember._id}`}>
                  <figure className="image is-rounded is-64x64">
                    <img className="is-rounded" src={item.createdMember.profileImage} alt={item.createdMember.username} />
                  </figure>
                </Link>
                <br />
                {numOfPs > 1 ?
                  <p style={{fontSize: 15, marginBottom: 10}}>{`${numOfPs} members will participate`}</p> 
                  :
                  <p style={{fontSize: 15}}>Be the first participant!</p>
                }
                {numOfPs > 1 && 
                  <div className="columns" style={{ display: "flex" }}>
                    {item.participants.map(par => {
                      return (
                        <div className="column" key={par._id}>
                          <figure className="image">
                            <img 
                              className="is-rounded"
                              src={par.user.profileImage}
                              style={{ maxHeight: 64, maxWidth: 64, margin: 10}}
                              alt="event"
                            />
                          </figure>
                        </div>
                      )})
                    }
                  </div>
                }
                <br /><hr />
                <p style={{ fontSize: 20, fontFamily: "Amatic SC, cursive"}}>
                  <i className="far fa-calendar-alt"></i>&nbsp;
                  Schedule
                </p>
                <p>{`From ${item.startDate.slice(0, 10)} to ${item.endDate.slice(0, 10)}`}</p>
                <div style={{ margin: 20}}>
                  <Calendar
                    value={[new Date(item.startDate), new Date(item.endDate)]}
                    // showDoubleView={true}
                  />
                </div>
              </div>
            </div>
            <div className="buttons is-right">
              {!isInGroup(item.participants) &&
                <button 
                  className="button is-danger is-light"
                  value={item._id} 
                  onClick={handleJoinEvent}
                >
                  Join
                </button>
              }
              {isInGroup(item.participants) &&
                <button 
                  className="button is-small" 
                  onClick={() => handleCancelEvent(item._id, participantId._id)}
                  style={{ fontSize: 15}}
                >
                  Leave Event
                </button>
              }
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default GroupShowEvents