import React from 'react'
import { Link } from 'react-router-dom'

const GroupCard = ({ group, members } ) => {

  return (
    <Link to={`/groups/${group._id}`} className="box">
      <div className="column is-full">

        <div className="columns">
          <img src={group.headerImage} alt={`pic ${group.name}`} className="column group-header-image" />
          <div className="column columns is-multiline">
            <div className="column is-full columns is-multiline">
              <h1 className="subtitle column is-full group-title">{group.name}</h1>
              { members.length > 1 &&
                <p className="column is-full"><i className="fas fa-users"></i>
                &nbsp;{members.length} hikrs</p> 
              }
              <div>
                <figure className="column">
                  <img src={group.createdMember.profileImage} alt={group.createdMember.username} className="group-list-image" />
                  <div>
                    <p><strong>Group Chief</strong>: @{group.createdMember.username} </p>
                    <p className="group-profile-link"><Link to={`/profiles/${group.createdMember._id}`}>See profile</Link></p>
                  </div>

                </figure>
              </div>
              <p className="column is-full">{group.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default GroupCard