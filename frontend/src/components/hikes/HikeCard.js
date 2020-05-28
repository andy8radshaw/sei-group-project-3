import React from 'react'

import { Link } from 'react-router-dom'

const HikeCard = ({ name, description, difficulty, country, distance, timeToComplete, images, _id }) => {
  return (
    <Link to={`/hikes/${_id}`} className="column is-one-third-desktop is-half-tablet">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img className="index-image" src={images[0]} alt={name} />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4 hike-index-title">{name}, {country}</p>
              <p className="is-6">Distance: {distance}</p>
              <p>Difficulty: {difficulty.map(difficulty => {
              return `${difficulty}, `
            })}</p>
              <p className="is-6">Time it takes: {timeToComplete}</p>
            </div>
          </div>
          <div className="content">
            {description.length > 240 ? description.substr(0, 240) + '...' : description }
            <br />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HikeCard