import React from 'react'
import { getUserId } from '../../lib/auth'
import GroupImgNew from './GroupImgNew'

const GroupShowPictures = ({ images, name, handleDeletePhoto, currentlyDisplayed, member, handleUploadPhoto }) => {
  return(
      <div
        className="container"
        style={{ 
          minHeight: 500,
          display: `${currentlyDisplayed === 'pictures' ? 'block' : 'none' }`,
          marginTop: 20,
          marginLeft: "auto",
          marginRight: "auto"
        }}
        >
        <div className="columns is-multiline">
          {images.map( img => (
            <div className="column is-4" key={img._id}>
              <figure className="image">
                <img src={img.images} alt={name} style={{height: 250}}/>
              </figure>
          
              <p style={{ fontSize: 12 }}>
                Uploaded by: {img.user.username.replace(img.user.username[0], img.user.username[0].toUpperCase())}
              </p>
              {(img.user._id === getUserId() ) && 
                <button value={img._id} onClick={handleDeletePhoto}>
                  x
                </button>}
            </div>
          ))
          }
        </div>
        <hr />
        <p style={{ fontFamily: "Amatic SC, cursive", margin: 2, fontSize: 20}}>
          <i className="fas fa-image"></i>
          &nbsp;Upload photo
        </p>
        {member && 
          <GroupImgNew
            onChange={handleUploadPhoto}
            name="images"
          />
        }
      
      </div>
    
  )
}

export default GroupShowPictures 