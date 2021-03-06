import React, { useState, useEffect, useContext  } from 'react';
import { StyledCarouselContainer, StyledCarouselPhotos, StyledArrowsContainer, StyledThumbnailContainer, StyledArrowButton, StyledExpandButton, ExpandButtonContainer, ThumbnailCarouselContainer, StyledCarouselBackground } from './../styles/Carousel.styled.js';
import { DispatchContext } from './../../appState/index.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faAngleRight, faAngleLeft, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import tracker from './../../components/Tracker.js';
import useDimensions from '../../components/useDimensions.js'


const largeScreenMult = 0.65;
const heightToWidthRatio = 0.65

function Carousel(props){
  const [activePhoto, setActivePhoto] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [displayedPhotos, setDisplayedPhotos] = useState([]);
  const [displayedPhotosIndexes, setDisplayedPhotosIndexes] = useState([0, 7]);
  const [, dispatch] = useContext(DispatchContext);
  const [animate, setAnimate] = useState(false);
  const { height, width } = useDimensions();
  const initWidth = width > 768 ? width * largeScreenMult : width;
  const [mainPhotoHeight, setMainPhotoHeight] = useState(initWidth * heightToWidthRatio)
  const [mainPhotoWidth, setMainPhotoWidth] = useState(initWidth)


  useEffect(() => {
    const newHeight = width * heightToWidthRatio
    if(width > 768) {
      setMainPhotoHeight(newHeight * largeScreenMult)
      setMainPhotoWidth(width * largeScreenMult)
    } else {
      setMainPhotoHeight(newHeight)
      setMainPhotoWidth(width)
    }
    }, [width])

  useEffect(() => {
    if (props.photos) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
      if (props.photos.length - 1 >= photoIndex) {
        setActivePhoto(props.photos[photoIndex]);
      } else {
        setActivePhoto(props.photos[0])
      }
      setDisplayedPhotos(props.photos.slice(0, 7));
      setDisplayedPhotosIndexes([0, 7])
    }
  }, [props.photos])

  useEffect(() => {
    if (props.photos) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
      setActivePhoto(props.photos[0]);
      setDisplayedPhotos(props.photos.slice(0, 7));
      setDisplayedPhotosIndexes([0, 7]);
      setPhotoIndex(0);
    }
  }, [props.newProduct])

  useEffect(() => {
    if (props.photos) {
      setPhotoIndex(props.expandedImage);
      setActivePhoto(props.photos[props.expandedImage]);

      indexesInRightRange(props.expandedImage);
    }
  }, [props.expandedImage])

  useEffect(() => {
    if (props.photos) {
      setDisplayedPhotos(props.photos.slice(displayedPhotosIndexes[0], displayedPhotosIndexes[1]));
    }
  }, [displayedPhotosIndexes]);

  const handleMainArrowClick = (e, index) => {
    tracker(dispatch, 'CarouselArrows', 'ProductDetails');
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 500);
    setPhotoIndex(index);
    setActivePhoto(props.photos[index]);

    indexesInRightRange(index);
  }

  const indexesInRightRange = (index) => {
    if (props.photos.length > 7) {
      if (index <= props.photos.length - 7) {
        setDisplayedPhotosIndexes([index, index + 7]);
      } else {
        setDisplayedPhotosIndexes([props.photos.length - 7, props.photos.length]);
      }
    }
  }

  const handlePhotoClick = (e, url) => {
    tracker(dispatch, 'ThumbnailPhoto', 'ProductDetails');
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 500);
    props.photos.forEach((photo, index) => {
      if (photo.thumbnail_url === url) {
        setActivePhoto(photo);
        setPhotoIndex(index);
        return;
      }
    })
  }

  const handleThumbnailArrowClick = (e, num) => {
    tracker(dispatch, 'ThumbnailArrows', 'ProductDetails');

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

    const allPhotos = displayedPhotos.map((photo, i) =>
      <StyledCarouselPhotos
        src={ photo.thumbnail_url } key={i}
        onClick={(e, url) => {handlePhotoClick(e, photo.thumbnail_url); e.stopPropagation()}}
        isActive={ activePhoto.thumbnail_url === photo.thumbnail_url ? true : false }/>);

    const smallWidth = 768
    return(
      <StyledCarouselBackground>

      <StyledCarouselContainer
        height={mainPhotoHeight}
        width={mainPhotoWidth}
        url={activePhoto.url}
        // url={width > smallWidth ? activePhoto.url : activePhoto.thumbnail_url}
        onClick={(e, index) => props.handleExpandedView(e, photoIndex)}
        animation={animate}>

        {/** Thumbnails buttons and images */}
        <ExpandButtonContainer>
          <StyledExpandButton
            onClick={(e, index) => props.handleExpandedView(e, photoIndex)}
            aria-label="expand main image">
            <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} /></StyledExpandButton>
        </ExpandButtonContainer>

        {/** Thumbnail carousel */}
        {width > smallWidth ?
          <ThumbnailCarouselContainer>
            <StyledArrowButton
              onClick={(e, num) => {handleThumbnailArrowClick(e, -1); e.stopPropagation()}}
              disabled={ displayedPhotos.length < 7 || displayedPhotosIndexes[0] === 0 ? true : false }
              aria-label="switch to top image"><FontAwesomeIcon icon={faAngleUp} /></StyledArrowButton>
            <StyledThumbnailContainer>
              {allPhotos}
            </StyledThumbnailContainer>
            <StyledArrowButton
              onClick={(e, num) => {handleThumbnailArrowClick(e, 1); e.stopPropagation()}}
              disabled={ displayedPhotos.length < 7 || displayedPhotosIndexes[0] === props.photos.length - 7 ? true : false }
              aria-label="switch to down image">
              <FontAwesomeIcon icon={faAngleDown} />
            </StyledArrowButton>
          </ThumbnailCarouselContainer>
          :
          null
        }


        {/** Main image */}
        <StyledArrowsContainer>
          <StyledArrowButton
            className="animate"
            onClick={(e, dir) => {handleMainArrowClick(e, (photoIndex - 1)); e.stopPropagation();}}
            disabled={ photoIndex === 0 ? true : false }
            aria-label="switch to left image">
            <FontAwesomeIcon icon={faAngleLeft} /></StyledArrowButton>
          <StyledArrowButton
            className="animate"
            onClick={(e, dir) => {handleMainArrowClick(e, (photoIndex + 1)); e.stopPropagation()}}
            disabled={ photoIndex === props.photos.length - 1 ? true : false }
            aria-label="switch to right image">
            <FontAwesomeIcon icon={faAngleRight} /></StyledArrowButton>
        </StyledArrowsContainer>

      </StyledCarouselContainer>
      </StyledCarouselBackground>
     )
  } else {

    return <StyledCarouselContainer width={mainPhotoWidth} height={mainPhotoHeight} />
  }

}

export default Carousel;