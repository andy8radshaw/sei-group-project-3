import React from 'react'
import { Link } from 'react-router-dom'
import defaultImage from './defaultProfilePic.png'

const ProfilesList = (props) => {
  return (
    <div className="column is-full">
      <Link to={`/profiles/${props._id}`}>
        <div className="columns profile-list box">
          {props.profileImage && <img src={props.profileImage} alt="profileImage" className="column list-image" />}
          {!props.profileImage && <img src={defaultImage} alt="default" className="column is-one-quarter is-mobile list-image" />}
          <div className="column columns is-multiline">
            <div className="column is-full">
              <div>
                <p className="subtitle">{props.fullName}</p>
                @{props.username}
              </div>

              {!props.fullName && <div className="subtitle">@{props.username}</div>}
            </div>
            <div className="column is-full">{props.bio}</div>
            {props.completedHikes.length !== 0 &&
              <div className="column"> Hikes Completed ⛰: {props.completedHikes.length}</div>}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProfilesList