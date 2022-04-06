import React, { useState, useEffect } from 'react';
import { StyledCarouselContainer, StyledCarouselPhotos, StyledArrowsContainer,StyledThumbnailContainer, StyledArrowButton } from './../styles/Carousel.styled.js';
import { FlexColumn } from './../styles/Flex.styled.js';

function Carousel(props){
  const [activePhoto, setActivePhoto] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (props.photos) {
      setActivePhoto(props.photos[0]);
    }
  }, [props.photos])

  const handlePhotoClick = (e, index) => {
    if (index >= 0) {
      setPhotoIndex(index);
      setActivePhoto(props.photos[index]);
    }
  }

  if (props.photos && activePhoto) {
    const allPhotos = props.photos.map((photo, i) => <StyledCarouselPhotos src={ photo.thumbnail_url } key={i} onClick={(e) => handlePhotoClick(e, i)} isActive={ activePhoto.thumbnail_url === photo.thumbnail_url ? true : false }/>);

    return(<StyledCarouselContainer photo={activePhoto}>
      <StyledThumbnailContainer>
        {allPhotos}
      </StyledThumbnailContainer>
        <StyledArrowsContainer>
          <StyledArrowButton onClick={(e, dir) => handlePhotoClick(e, (photoIndex - 1))} disabled={ photoIndex === 0 ? true : false }>{'<'}</StyledArrowButton>
          <StyledArrowButton onClick={(e, dir) => handlePhotoClick(e, (photoIndex + 1))} disabled={ photoIndex === props.photos.length - 1 ? true : false }>{'>'}</StyledArrowButton>
        </StyledArrowsContainer>
      </StyledCarouselContainer>)

  } else {
    return <p>loading</p>
  }

}

export default Carousel;