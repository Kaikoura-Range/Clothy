import React, { useState, useEffect } from 'react';
import { StyledCarouselContainer, StyledCarouselPhotos, StyledArrowsContainer,StyledThumbnailContainer, StyledArrowButton } from './../styles/Carousel.styled.js';
// import { FlexColumn } from './../styles/Flex.styled.js';

function Carousel(props){
  const [activePhoto, setActivePhoto] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [displayedPhotos, setDisplayedPhotos] = useState([]);
  const [displayedPhotosIndexes, setDisplayedPhotosIndexes] = useState([0, 7]);

  useEffect(() => {
    if (props.photos) {
      setActivePhoto(props.photos[0]);
      setDisplayedPhotos(props.photos.slice(0, 7));
      setDisplayedPhotosIndexes([0, 7])
    }
  }, [props.photos])

  const handlePhotoClick = (e, urlOrIndex) => {
      if (typeof urlOrIndex === 'string' ) {
        const url = urlOrIndex;
        findActivePhoto(url);
      } else {
        const index = urlOrIndex;
        setPhotoIndex(index);
        setActivePhoto(props.photos[index]);

        if (index <= props.photos.length - 7) {
          setDisplayedPhotos(props.photos.slice(index, index + 7));
          setDisplayedPhotosIndexes([index, index + 7]);
        } else {
          setDisplayedPhotos(props.photos.slice(props.photos.length - 7, props.photos.length));
          setDisplayedPhotosIndexes([props.photos.length - 7, props.photos.length]);
        }
      }

  }

  const findActivePhoto = (url) => {
    props.photos.forEach((photo, index) => {
      if (photo.thumbnail_url === url) {
        setActivePhoto(photo);
        setPhotoIndex(index);
        return;
      }
    })
  }

  const handleThumbnailArrowClick = (e, num) => {
    let newFirstIndex = displayedPhotosIndexes[0] + num;
    let newLastIndex = displayedPhotosIndexes[1] + num;
    let firstIndex = displayedPhotosIndexes[0];

    if (newFirstIndex >= 0 && newFirstIndex <= props.photos.length - 7) {
      firstIndex = newFirstIndex
    }

    let lastIndex = displayedPhotosIndexes[1];

    if (newLastIndex <= props.photos.length && newLastIndex >= 7) {
      lastIndex = newLastIndex;
    }

    setDisplayedPhotos(props.photos.slice(firstIndex, lastIndex));
    setDisplayedPhotosIndexes([firstIndex, lastIndex]);
  }

  if (props.photos && activePhoto) {
    const allPhotos = displayedPhotos.map((photo, i) => <StyledCarouselPhotos src={ photo.thumbnail_url } key={i} onClick={(e, url) => handlePhotoClick(e, photo.thumbnail_url)} isActive={ activePhoto.thumbnail_url === photo.thumbnail_url ? true : false }/>);

    return(<StyledCarouselContainer photo={activePhoto}>
      <StyledArrowButton onClick={(e, num) => handleThumbnailArrowClick(e, -1)} disabled={ displayedPhotos.length < 7 ? true : false }>Top</StyledArrowButton>
      <button>Expand</button>
      <StyledThumbnailContainer>
        {allPhotos}
      </StyledThumbnailContainer>
      <StyledArrowButton onClick={(e, num) => handleThumbnailArrowClick(e, 1)} disabled={ displayedPhotos.length < 7 ? true : false }>Bottom</StyledArrowButton>
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