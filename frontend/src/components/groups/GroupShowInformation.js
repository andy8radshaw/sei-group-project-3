import React from 'react'
import { Link } from 'react-router-dom'
const GroupShowInformation = ({ member, currentlyDisplayed, group, members, photos, events, handleViewChange, sendEmail }) => {
  return (
    <div className="GroupShow container">
      <div className="Information"
        style={{
          display: `${currentlyDisplayed === 'information' ? 'block' : 'none'}`
        }}
      >
        <section className="section">
          <div className="container">
            <h1 className="group-title">About this Group:</h1>
            <div className="content">{group.description}</div>
            <hr />
            <div className="columns is-full">
              <div className="column is-5">
                <p className="subtitle group-title">Chief Hikr:</p>
                <Link to={`/profiles/${group.createdMember._id}`} className="media">
                  <div className="media-left">
                    <figure className="image is-64x64">
                      <img src={group.createdMember.profileImage} className="is-rounded" alt={group.createdMember._id} />
                    </figure>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <div>
                        <p><strong>{group.createdMember.username}</strong></p>
                        <p>{group.createdMember.bio && group.createdMember.bio.length > 150 ? group.createdMember.bio.substr(0, 150) + '...' : group.createdMember.bio}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="column is-7">
                <p className="subtitle group-title">Members</p>
                <div className="columns is-multiline">
                  {members.map(member => (
                    <Link to={`/profiles/${member.user._id}`} key={member.user._id}>
                      <div className="column" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <figure className="image is-64x64" key={member.user._id}>
                          <img src={member.user.profileImage} className="is-rounded" alt="img" />
                        </figure>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="buttons is-right">
              <button
                className="button is-light"
                name="members"
                onClick={handleViewChange}
              >
                <i className="fas fa-users" aria-hidden="true"></i>
                &nbsp;&nbsp;More Members
              </button>
            </div>
            <br /><hr /><br />
            <p className="subtitle group-title">Our Photo Gallery</p>
            <div
              className="container"
              style={{ display: "flex", justifyContent: "flex-start", flexWrap: "wrap" }}>
              {/* <div className="columns"> */}
              {photos.length >= 1 ?
                photos.map(photo => (
                  <figure className="image" key={photo._id}>
                    <img
                      src={photo.images}
                      style={{ width: 150, height: 150, margin: 10, boxShadow: "3px 3px 3px #9E9E9E" }}
                      alt="img"
                    />
                  </figure>
                ))
                :
                <p style={{ fontSize: 15 }}>Coming soon...</p>
              }
              {/* </div> */}
            </div>
            <div className="buttons is-right">
              {member &&
                <button
                  className="button is-light"
                  name="pictures"
                  onClick={handleViewChange}
                >
                  <i className="fas fa-image" aria-hidden="true"></i>
                  &nbsp;&nbsp;More photos
                </button>
              }
            </div>
            <br /><hr /><br />
            <p className="subtitle group-title">Upcoming Events</p>
            <div className="columns is-multiline">
              {events.length >= 1 ?
                events.map(event => (
                  <div
                    className="column box"
                    style={{
                      maxWidth: 200,
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      margin: 10
                    }}
                    key={event._id}
                  >
                    <p><strong>{event.eventName}</strong></p>
                    <p style={{ fontSize: 20 }}><i className="fas fa-mountain"></i>&nbsp;{event.hike.name}</p>
                    <figure className="image is-128x128">
                      <img src={event.hike.images[0]} alt="img" />
                    </figure>
                    <p style={{ fontSize: 18 }}>On&nbsp;{event.startDate.slice(0, 10)}</p>
                  </div>
                ))
                :
                <p style={{ fontSize: 15 }}>&nbsp;&nbsp;&nbsp;&nbsp;Coming soon...</p>
              }
            </div>
            <div className="buttons is-right">
              {member &&
                <button
                  className="button is-light"
                  name="events"
                  onClick={handleViewChange}
                >
                  <i className="far fa-calendar-check" aria-hidden="true"></i>
                  &nbsp; See more events
                </button>
              }
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
export default GroupShowInformation 