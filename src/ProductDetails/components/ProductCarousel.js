import React from 'react';

function Carousel(props){
  if (props.photos) {
    const allPhotos = props.photos.map((photo, i) => <img src={photo.thumbnail_url} alt="" key={i} width="100px"/>)

    return(<div>{allPhotos}</div>)
  } else {
    return <p>loading</p>
  }

}

export default Carousel;