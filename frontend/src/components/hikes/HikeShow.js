import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"

import { getSingleHike, deleteHikeReview, addHikeToFavorites, reviewHike, deleteHike, addImageToHike, getUser, removeHikeRequest } from '../../lib/api'
import { isAuthenticated, getUserId, isOwner } from '../../lib/auth'

import HikeReviews from './HikeReviews'
import HikeImageModal from './HikeImageModal'
import ImageUpload from '../common/ImageUpload'
import HikeShowMap from './HikeShowMap'


class HikeShow extends React.Component {
  state = {
    hike: null,
    reviewData: {
      text: '',
      rating: ''
    },
    reviewText: '',
    reviewRating: '',
    errors: '',
    averageRating: '',
    imageModalActive: false,
    imageUploadActive: false,
    user: '',
    hikeIsFav: false
  }
  //! USER ABOVE IS ACTUALLY THE CURRENT USERS ARRAY OF FAVOURITE HIKES!

  async componentDidMount() {
    try {
      const hikeId = this.props.match.params.id
      const res = await getSingleHike(hikeId)
      const userId = await getUserId()
      const user = await getUser(userId)
      this.setState({ hike: res.data, user: user.data.favoritedHikes },
        () => {
          this.getAverageRating()
          this.checkHikeFavorite()
        })
    } catch (err) {
      console.log(err)
    }
  }

  handleDeleteHike = async () => {
    try {
      const hikeId = this.props.match.params.id
      await deleteHike(hikeId)
      this.props.history.push('/hikes')
    } catch (err) {
      console.log(err);
    }
  }

  checkHikeFavorite = () => {
    const hikeId = this.props.match.params.id
    let favArr = this.state.user
    favArr = favArr.flatMap(item => item.hike._id)
    const hikeIsFav = favArr.includes(hikeId)
    this.setState({ hikeIsFav })
  }

  handleAddToFavorites = async () => {
    try {
      const userId = getUserId()
      const hikeId = { hike: this.props.match.params.id }

      await addHikeToFavorites(userId, hikeId)
      const user = await getUser(userId)
      this.setState({ user: user.data.favoritedHikes, hikeIsFav: true })
    } catch (err) {
      console.log(err)
    }
  }

  handleRemoveFavorite = async () => {
    try {
      const hikeId = this.props.match.params.id
      const userId = getUserId()
      const linkName = 'favorites'
      let favArr = this.state.user
      favArr = favArr.map(item => (
        [item._id, item.hike._id]
      )
      )
      const favId = favArr.filter(arr => arr[1] === hikeId)
      const id = (favId.flatMap(item => item))
      
      await removeHikeRequest(userId, linkName, id[0])
      const user = await getUser(userId)
      this.setState({ user: user.data.favoritedHikes, hikeIsFav: false })
      
    } catch (err) {
      console.log(err)
    }
  }

  handleSubmitReview = async (event, rating, text) => {
    event.preventDefault()
    try {
      const hikeId = this.props.match.params.id
      await reviewHike(hikeId, { rating: rating, text: text })
      const res = await getSingleHike(hikeId)
      this.setState({ hike: res.data, errors: '', reviewText: '', reviewRating: '' },
        () => {
          this.getAverageRating()
        })
    } catch (err) {
      this.setState({ errors: JSON.parse(err.response.config.data) })
    }
  }


  handleReviewDelete = async event => {
    event.preventDefault()
    const hikeId = this.props.match.params.id
    const reviewId = event.target.id
    try {
      await deleteHikeReview(hikeId, reviewId)
      const res = await getSingleHike(hikeId)
      this.setState({ hike: res.data },
        () => {
          this.getAverageRating()
        })
    } catch (err) {
      console.log(err)
    }
  }

  getAverageRating = () => {
    const reviews = this.state.hike.reviews
    const ratings = reviews.map(review => {
      return review.rating
    })
    const averageRating = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(0)
    this.setState({ averageRating })
  }

  handleImageModal = () => {
    this.setState({ imageModalActive: !this.state.imageModalActive })
  }

  handleAddImage = async event => {
    const hikeId = this.props.match.params.id
    try {
      await addImageToHike(hikeId, { images: event.target.value })
      const res = await getSingleHike(hikeId)
      this.setState({ hike: res.data },
        () => {
          this.setState({ imageModalActive: false })
        })
    } catch (err) {
      console.log(err.response)
    }
  }

  handleImageUploadActive = () => {
    this.setState({ imageUploadActive: !this.state.imageUploadActive })
  }


  render() {
    if (!this.state.hike) return null
    const { hike, averageRating, imageModalActive } = this.state
    return (
      <div className="HikeShow box">
        <div className="hero is-medium is-success">
          <div className="hero-body" style={{ backgroundImage: `url(${hike.images[0]})` }}>
            <h1 className="title-logo">{hike.name}</h1>
          </div>
        </div>
        <div className="box">
          <section className="hike-info">
            <h1 className="hikr-title">About this Hike:</h1>
            <h1>{hike.description}</h1>
            <hr />
            <h1>Difficulty: {hike.difficulty.map(difficulty => {
              return `${difficulty}, `
            })}</h1>
            <h1>Seasons: {hike.seasons.map(season => {
              return `${season}, `
            })}
            </h1>
            <h1>Time the hike takes: {hike.timeToComplete}</h1>
            <h1>Distance: {hike.distance}</h1>
            
            <h1>Average Rating: 
              <ReactStars
                count={5}
                size={12}
                half={false}
                value={parseInt(averageRating)}
                filledIcon={<i className="fas fa-mountain" />}
                emptyIcon={<i className="fas fa-mountain" />}
                edit={false}
              />
            </h1>
            <hr />
          </section>

          <section className="hike-show-buttons">
            <div className="buttons has-addons">
              <button className="button hike-show-button is-warning is-light" onClick={this.handleImageModal}>Image Gallery</button>
              {isAuthenticated() && <button className="button hike-show-button is-primary is-light" onClick={this.handleImageUploadActive}>Add an image to the gallery</button>}

              {isAuthenticated() && !this.state.hikeIsFav &&
                <button
                  className="button hike-show-button is-success is-light"
                  onClick={this.handleAddToFavorites}
                >Add Hike to Favorites</button>}

              {isAuthenticated() && this.state.hikeIsFav &&
                <button
                  className="button hike-show-button is-danger is-light"
                  onClick={this.handleRemoveFavorite}
                >Remove from Favorites</button>}
            </div>

            <div className="buttons has-addons">
              {isOwner(hike.user._id) &&
                <Link
                  to={`/hikes/${hike._id}/update`}
                  className="button hike-show-button is-info is-light"
                >Update Hike</Link>}
              {isOwner(hike.user._id) &&
                <button
                  className="button hike-show-button is-danger is-light"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this Hike?')) {
                      this.handleDeleteHike()
                    }
                  }}>Delete Hike</button>}
            </div>
          </section>

          <section>
            <HikeImageModal
              handleImageModal={this.handleImageModal}
              isModalActive={imageModalActive}
              images={hike.images}
            />
            <section className={this.state.imageUploadActive ? "image-upload" : "image-upload is-hidden"} >
              <ImageUpload
                onChange={this.handleAddImage}
              />
            </section>
          </section>
          <hr />
          <div className="columns is-multiline">
            <div className="column is-half-desktop">
              <h1 className="hikr-title">Location: {hike.country}</h1>
              <br />
              <HikeShowMap
                hike={this.state.hike}
              />
            </div>
            <div className="column is-half-desktop">
              <section className="reviews">
                <HikeReviews
                  reviews={this.state.hike.reviews}
                  handleReviewDelete={this.handleReviewDelete}
                  handleSubmitReview={this.handleSubmitReview}
                  errors={this.state.errors}
                  reviewText={this.state.reviewText}
                  reviewRating={this.state.reviewRating}
                />
              </section>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default HikeShow


//* /api/profiles/userId/favorites
// * { hike: id}