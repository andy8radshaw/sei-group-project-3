import React from 'react'

import { getAllHikes } from '../../lib/api'

import HikeListCard from './HikeListCard'
import HikeCard from './HikeCard'
import HikeMap from './HikeMap'

class HikesIndex extends React.Component {
  state = {
    hikes: null,
    search: '',
    hideMap: true,
    hideGrid: false,
    hideList: true
  }

  async componentDidMount() {
    try {
      const res = await getAllHikes()
      const search = this.props.location.search.split('=')[1]
      this.setState({ hikes: res.data, search })
    } catch (err) {
      console.log(err)
    }
  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  filteredHikes = () => {
    const { hikes, search } = this.state
    const regexp = new RegExp(search, 'i')
    return hikes.filter(hike => {
      return regexp.test(hike.name) || regexp.test(hike.country) || regexp.test(hike.difficulty) || regexp.test(hike.seasons)
    })
  }

  handleViewChange = event => {
    event.preventDefault()
    if (event.currentTarget.name === 'showList') {
      this.setState({ hideList: false, hideGrid: true, hideMap: true })
    } else if (event.currentTarget.name === 'showGrid') {
      this.setState({ hideList: true, hideGrid: false, hideMap: true })
    } else {
      this.setState({ hideList: true, hideGrid: true, hideMap: false })
    }
  }

  render() {
    if (!this.state.hikes) return null

    return (
      <div className="HikesIndex">
        <div className="hero is-medium">
          <div className="hero-body ">
            <h1 className="title-logo has-text-centered">HIKR</h1>
          </div>
        </div>
        <div className="field box index-search">
          <div className="control index-search-bar">
            <input
              className="input is-primary is-rounded"
              name="search"
              type="text"
              placeholder="Search for hike, place, season or difficulty..."
              onChange={this.handleChange}
              // value={this.state.search}
            />
          </div>

          <div className="view-change buttons field has-addons">
            <p className="control">
              <button
                className="button"
                name="showGrid"
                onClick={this.handleViewChange}>
                <span className="icon is-small">
                  <i
                    className="fas fa-th"
                  ></i>
                </span>
              </button>
            </p>
            <p className="control list-view-button">
              <button
                className="button"
                name="showList"
                onClick={this.handleViewChange}>
                <span className="icon is-small">
                  <i
                    className="fas fa-list"
                  ></i>
                </span>
              </button>
            </p>
            <p className="control">
              <button
                className="button"
                name="showMap"
                onClick={this.handleViewChange}>
                <span className="icon is-small">
                  <i
                    className="fas fa-map-pin"
                  ></i>
                </span>
              </button>
            </p>
          </div>

        </div>
        <section className={`${this.state.hideList ? 'section Hike-list is-hidden' : 'section Hike-list'}`}>
          <div className="colmns is-multiline">
            {this.filteredHikes().map(hike => {
              return (
                <HikeListCard key={`List${hike._id}`} {...hike} />
              )
            })}
          </div>
        </section>
        <section className={`${this.state.hideGrid ? 'section Hike-grid is-hidden' : 'section Hike-grid'}`}>
          <div className="container">
            <div className="columns is-multiline">
              {this.filteredHikes().map(hike => {
                return (
                  <HikeCard key={`Grid${hike._id}`} {...hike} />
                )
              })}
            </div>
          </div>
        </section>
        <section className={`${this.state.hideMap ? 'section Hike-map is-hidden' : 'Hike-map'}`}>
          <HikeMap
            hikes={this.filteredHikes()}
          />
        </section>
      </div>
    )
  }
}

export default HikesIndex