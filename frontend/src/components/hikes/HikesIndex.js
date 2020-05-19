import React from 'react'

import { getAllHikes } from '../../lib/api'

import HikeListCard from './HikeListCard'
import HikeMap from './HikeMap'

class HikesIndex extends React.Component {
  state = {
    hikes: null,
    search: '',
    hideMap: true,
    hideGrid: true,
    hideList: false
  }

  async componentDidMount() {
    try {
      const res = await getAllHikes()
      const search = this.props.location.search.split('=')[1]
      console.log(search)
      
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
    if (event.target.name === 'showList') {
      this.setState({ hideList: false, hideGrid: true, hideMap: true })
    } else if (event.target.name === 'showGrid') {
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
        <div className="field box">
          <div className="control">
            <input
              className="input is-primary"
              name="search"
              type="text"
              placeholder="Search for a Hike, Country, Season or Difficulty..."
              onChange={this.handleChange}
              value={this.state.search}
            />
            <div className="view-change">

              <button
                className="button"
                name="showList"
                onClick={this.handleViewChange}
              >
                List
                </button>
              <button
                className="button"
                name="showGrid"
                onClick={this.handleViewChange}
              >
                Grid
              </button>
              <button
                className="button"
                name="showMap"
                onClick={this.handleViewChange}
              >
                Map
              </button>
            </div>
          </div>
        </div>
        <section className={`${this.state.hideList ? 'section Hike-list is-hidden' : 'section Hike-list'}`}>
          <div className="colmns is-multiline">
            {this.filteredHikes().map(hike => {
              return (
                <HikeListCard key={hike._id} {...hike} />
              )
            })}
          </div>
        </section>
        {/* <section className="section Hike-grid">
          <div className="container">
            {this.state.hikes.map(hike => {
              return (
                <HikeListCard key={hike._id} {...hike} />
              )
            })}
          </div>
        </section> */}
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