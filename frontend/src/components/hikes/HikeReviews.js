import React from 'react'
import Moment from 'react-moment'
import 'moment-timezone'
import ReactStars from "react-rating-stars-component"

import { isOwner, getUserId, isAuthenticated } from '../../lib/auth'
import { getUser } from '../../lib/api'


class HikeReviews extends React.Component {
  state = {
    profileImage: '',
    rating: '',
    text: '',
    newDate: ''
  }

  async componentDidMount() {
    try {
      const userId = getUserId()
      const loggedIn = await isAuthenticated()
      if (!loggedIn) {
        this.setState({ profileImage: '' })
      } else {
        const res = await getUser(userId)
        this.setState({ profileImage: res.data.profileImage })
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleChange = event => {
    const text = event.target.value
    this.setState({ text })
  }
  
  handleRatingChange = rating => {
    this.setState({ rating })
  }

  handleSubmit = (event, rating, text) => {
    this.props.handleSubmitReview(event, rating, text)
    this.setState({ rating: this.props.reviewRating, text: this.props.reviewText })
  }

  render() {
    const { handleReviewDelete, reviews, errors } = this.props
    return (
      <>
        {isAuthenticated() &&
          <form onSubmit={(event) => { this.handleSubmit(event, this.state.rating, this.state.text) }}>
            <h1 className="hikr-title">Add a HIKR Review:</h1>
            <br />
            <article className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src={this.state.profileImage} alt="user profile pic" />
                </p>
              </figure>
              <div className="media-content">
                <div className="field">
                  <p className="control">
                    <textarea
                      className="textarea"
                      placeholder="Add a review..."
                      name="text"
                      onChange={this.handleChange}
                      value={this.state.text}
                    >
                    </textarea>
                  </p>
                  {errors && !errors.text && <small className="help is-danger">Review is required</small>}
                </div>
                {errors && !errors.rating && <small className="help is-danger">Rating is required</small>}

                <div className="level">
                  <div className="level-left">
                    <div className="control">
                      <label>Rating: </label>
                      <ReactStars
                        count={5}
                        size={20}
                        half={false}
                        name="rating"
                        value={parseInt(this.state.rating)}
                        // onChange={this.handleChange}
                        onChange={newRating => {
                          this.handleRatingChange(newRating)
                        }}
                        filledIcon={<i className="fas fa-mountain" />}
                        emptyIcon={<i className="fas fa-mountain" />}
                      />
                    </div>
                  </div>
                </div>
                <nav className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <button type="submit" className="button hike-show-button is-success">Submit Review!</button>
                    </div>
                  </div>
                </nav>
                <hr />
              </div>
            </article>
          </form>}
        <article className="media">
          <h1 className="hikr-title">HIKR Reviews:</h1>
        </article>
        {reviews.map(review => {
          return (
            <article key={review._id} className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src={review.user.profileImage} alt="profile pic" />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <div>
                    <strong>{review.user.fullName}</strong> <small><Moment fromNow >{review.createdAt}</Moment></small>
                    <ReactStars
                      count={5}
                      size={12}
                      half={false}
                      value={review.rating}
                      filledIcon={<i className="fas fa-mountain" />}
                      emptyIcon={<i className="fas fa-mountain" />}
                      edit={false}
                    />
                    <br />
                    {review.text}
                  </div>
                </div>
              </div>
              <div className="media-right">
                <form onSubmit={handleReviewDelete} id={review._id}>
                  {isOwner(review.user._id) && <button type="submit" className="delete"></button>}
                </form>
              </div>
            </article>
          )
        })}
      </>
    )
  }
}

export default HikeReviews