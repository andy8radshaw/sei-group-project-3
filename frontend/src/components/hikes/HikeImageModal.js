import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"

class HikeImageModal extends React.Component {


  render() {
    return (
      <div className={this.props.isModalActive ? "modal is-active" : "modal"}>
        <div className="modal-background"></div>
        <div className="modal-content ">
        
          <Carousel
            dynamicHeight={true}
            showThumbs={false}
            infiniteLoop={true}
          >
            {this.props.images.map(image => {
              return (
                <div key={image}>
                  <img className="hike-show-image"src={image} alt="hiking location" />
                </div>
              )
            })}
          </Carousel>

        </div>
        <button onClick={this.props.handleImageModal} className="modal-close is-large" aria-label="close"></button>
      </div >
    )
  }
}

export default HikeImageModal