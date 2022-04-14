import React, {useState, useEffect, useRef, useContext} from "react";
import { StateContext } from './../../appState/index.js';
import Carousel from './ProductCarousel.js';
import { DispatchContext } from './../../appState/index.js';
import { FlexRow } from './../styles/Flex.styled.js'
import { StylesImages, StylesContainer } from './../styles/Styles.styled.js'
import StyledSizeQty from './../styles/SizeQty.styled.js'
import { ProductOverviewContainer, StyledOverviewContainer, StyledPrice, StyledCurrentStyle, StyledCategory, StyledReviews, ProductInfoContainer, StarsReviewContainer } from './../styles/Overview.styled.js'
import { StyledExpandedViewContainer, StyledExpandedViewModal, StyledDotImage } from './../styles/ExpandedCarouselView.styled.js';
import { SocialMediaShareContainer, SocialMediaShareButton } from './../styles/SocialMedia.styled.js';
import _ from 'underscore';
import Stars from './../styles/Star.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown, faAngleRight, faAngleLeft, faHeart, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faTwitter, faPinterest } from '@fortawesome/free-brands-svg-icons';
import Magnifier from 'react-magnifier';
import tracker from './../../components/Tracker.js';

function ProductInfo(props) {
  const [state] = useContext(StateContext);
  const [activeStyle, setActiveStyle] = useState({});
  const [skus, setSkus] = useState([]);
  const [availableQty, setAvailableQty] = useState(0);
  const [isAddCartValid, setIsAddCartValid] = useState(true);
  const [salePrice, setSalePrice] = useState(null);
  const selectedSize = useRef('default');
  const selectedQuantity = useRef(0);
  const [expandedViewImage, setExpandedViewImage] = useState(null);
  const [expandedViewIndex, setExpandedViewIndex] = useState(null);
  const [showExpandedView, setShowExpandedView] = useState(false);
  const [zoomView, setZoomView] = useState(false);
  const [, dispatch] = useContext(DispatchContext);
  const [notInOutfit, setNotInOutfit] = useState(true);

  const handleSizeDuplicates = (originalSkus) => {
    const sizeDuplicates = originalSkus.reduce((allSkus, currentSku) => {
      const size = currentSku.size;
      const quantity = currentSku.quantity;
      if (!allSkus[size]) {
        allSkus[size] = quantity;
      } else {
        allSkus[size] += quantity;
      }

      return allSkus;
    }, {});
    return sizeDuplicates;
  }

  // Triggered when the whole product changes
  useEffect(() => {
    if (props.styles) {
      setActiveStyle(props.styles.results[0]);
      setNotInOutfit(state.user.outfit.length ?  state.user.outfit.every(product => state.currentProduct !== product) : true);
      if (props.styles.results.length === 0) {
        setSkus(['OUT OF STOCK']);
      } else {
        const initialSkus = handleSizeDuplicates((Object.values(props.styles.results[0].skus)));
        setSkus(Object.entries(initialSkus));
        setExpandedViewIndex(0);
        setExpandedViewImage(props.styles.results[0].photos[0].url)
      }
    }
  }, [props.styles])

  // Triggered when the active style changes
  useEffect(() => {
    if (activeStyle && activeStyle.name) {

      const newSkus = handleSizeDuplicates((Object.values(activeStyle.skus)));
      setSkus(Object.entries(newSkus));

      setSalePrice( activeStyle.sale_price || null );
    }
  }, [activeStyle])

  useEffect(() => {
    if (activeStyle && activeStyle.photos) {
      setExpandedViewImage(activeStyle.photos[expandedViewIndex]['url']);
    }
  }, [expandedViewIndex, activeStyle])


  if (activeStyle && activeStyle.name) {
    const {name, category} = props.product;

    const socialMessage = `Just discovered this website and love their ${category}. Check this one out!`;
    const pageUrl = document.location.href;

    const handleSelectedStyle = (e, style, index) => {
      tracker(dispatch, 'Style', 'ProductDetails', activeStyle.style_id);
      setActiveStyle(style);
    }

    const allStyles = props.styles.results.map((style, i) =>
      <div key={style.style_id}>{ style.name === activeStyle.name ? <span><FontAwesomeIcon icon={faCheck} size='xs' /></span> : ''}<StylesImages src={style.photos[0].thumbnail_url} alt={style.name} active={style.name === activeStyle.name} onClick={(e) => handleSelectedStyle(e, style, i)}/></div>
    )

    const availableSizes = skus.map((sku, index) =>
      <option key={index} value={sku[0]}>{sku[0]}</option>
    )

    const onSizeChange = (e) => {
      const selectedSizeIndex = e.target.options.selectedIndex - 1;
      tracker(dispatch, 'Size', 'ProductDetails', activeStyle.style_id);

      if (selectedSizeIndex === -1) {
        setAvailableQty(0);
      } else if (skus[selectedSizeIndex][1] > 15) {
        setIsAddCartValid(true);
        setAvailableQty(15);
      } else {
        setIsAddCartValid(true);
        setAvailableQty(skus[selectedSizeIndex][1]);
      }
    }

    const availableQuantities = (_.range(1, availableQty + 1)).map((qty, index) =>
      <option key={index} value={qty}>{qty}</option>
    )

    const defaultQty = <option value="none">-</option>;

    const handleAddToCart = (e) => {
      tracker(dispatch, 'AddToCart', 'ProductDetails', activeStyle.style_id);
      if (selectedSize.current.value !== 'default') {
        dispatch({
          type: 'ADD_PRODUCT_TO_CART',
          payload: {
            style: activeStyle.name,
            size: selectedSize.current.value,
            quantity: selectedQuantity.current.value,
          }
        })
      } else {
        selectedSize.current.focus();
        setIsAddCartValid(false);
      }
    }

    const toggleExpandedView = (e, index) => {
      tracker(dispatch, 'ExpandedView', 'ProductDetails', activeStyle.style_id);
      setExpandedViewIndex(index);
      setShowExpandedView(!showExpandedView);
      if (!showExpandedView) {
        setZoomView(false);
      }
    }

    const handleArrowsClickExpandedView = (e, num) => {
      tracker(dispatch, 'ExpandedViewArrows', 'ProductDetails', activeStyle.style_id);
      const currentIndex = expandedViewIndex;
      const allPhotos = activeStyle.photos.length - 1;
      if (currentIndex + num < 0) {
        setExpandedViewIndex(allPhotos);
      } else if (currentIndex + num > allPhotos) {
        setExpandedViewIndex(0);
      } else {
        setExpandedViewIndex(prev => prev + num);
      }
    }

    const expandedViewDots = activeStyle.photos.map((dot, index) => <StyledDotImage activeDot={expandedViewIndex === index ? true : false } key={index}/>)

    const container = document.getElementById('container');

    const ratingAverage = () => {
      var total = 0, totalcount = 0;

      for(var i in props.rating) {
        total += Number(props.rating[i]*i);
        totalcount += Number(props.rating[i]);
      }

      return (Math.round(total / totalcount * 4) / 4).toFixed(1);
    }

    const handleSocialMediaClick = (e, url) => {
      tracker(dispatch, 'SocialMedia', 'ProductDetails', activeStyle.style_id);
      window.open(url, 'blank');
    }

    const scrollToReviews = (e) => {
      // window.scrollTo(0, document.body.clientHeight * 3);
      tracker(dispatch, 'ReadAllReviews', 'ProductDetails', activeStyle.style_id);
      const top = document.body.clientHeight * 10;
      window.scroll({top, left: 0, behavior: 'smooth'});
    }

    const addProductToOutfit = (e, outfit, productData) => {
      tracker(dispatch, 'AddToOutfit', 'ProductDetails', activeStyle.style_id);
      if (notInOutfit) {
        const newOutfit = [productData, ...outfit.map(product => product) ]
        dispatch({
          type: 'SET_OUTFIT',
          payload: newOutfit,
        })

      } else {
        const newOutfit = [...outfit.map(product => product)]
        const index = outfit.indexOf(productData);
        newOutfit.splice(index, 1)
        dispatch({
          type: 'SET_OUTFIT',
          payload: newOutfit
        })
      }
      setNotInOutfit(!notInOutfit);
    }

    return(<>
      {/**  Expanded View (Modal) */}
      {showExpandedView ?
      <StyledExpandedViewModal onClick={(e) => toggleExpandedView(e, expandedViewIndex)}>
        <StyledExpandedViewContainer onClick={(e) =>{ setZoomView(!zoomView); e.stopPropagation()}} bgImg={expandedViewImage} id="container">
          { !zoomView ? <>
            <button onClick={(e, num) => {handleArrowsClickExpandedView(e, -1); e.stopPropagation(); }}><FontAwesomeIcon icon={faAngleLeft} /></button>
            {expandedViewDots}
            <button onClick={(e, num) => {handleArrowsClickExpandedView(e, +1); e.stopPropagation(); }}><FontAwesomeIcon icon={faAngleRight} /></button> </> : <Magnifier src={expandedViewImage} width={container.offsetWidth} zoomFactor={2.5} style={{cursor: 'zoom-out'}}/> }
          </StyledExpandedViewContainer>
      </StyledExpandedViewModal> : '' }

      {/**  Carousel */}
      <ProductOverviewContainer minHeight={state.media.width * 0.5}  >
      <Carousel photos={activeStyle.photos} handleExpandedView={toggleExpandedView} expandedImage={expandedViewIndex} newProduct={props.styles}/>

      {/**  Right-side (main product info) */}
      <ProductInfoContainer>
        <StyledOverviewContainer>
          <StarsReviewContainer>
            <Stars theme={props.theme} ratingAvg={ratingAverage()} />
            <StyledReviews onClick={scrollToReviews}>Read all {props.reviews} reviews</StyledReviews>
          </StarsReviewContainer>
          <StyledCategory>{category}</StyledCategory>
          <h1>{name}</h1>
          <StyledPrice salePrice={ salePrice ? true : false }><span>${ salePrice ? salePrice  : activeStyle.original_price }</span><span>{ salePrice ? '$' + activeStyle.original_price  : '' }</span></StyledPrice>
          <StyledCurrentStyle><span>style</span> {activeStyle.name}</StyledCurrentStyle>
        </StyledOverviewContainer>
        <StylesContainer>
          {allStyles}
        </StylesContainer>
          <StyledSizeQty>
            <p>{isAddCartValid ? '' : 'Please select a size'}</p>
            <FlexRow>
              <select name="size" id="size" onChange={onSizeChange} ref={selectedSize} disabled={skus[0] === 'OUT OF STOCK' ? true : false}>
                <option key="default" value="default">{skus[0] === 'OUT OF STOCK' ? 'OUT OF STOCK' : 'SELECT SIZE'}</option>
                {availableSizes}
              </select>
              <select name="quantity" id="quantity" disabled={availableQty ? false : true} ref={selectedQuantity}>
                {selectedSize.current.value === 'default' ? defaultQty : availableQuantities}
              </select>
            </FlexRow>
            <button onClick={handleAddToCart} aria-label="add to cart"><FontAwesomeIcon icon={faCartArrowDown} size='xl' style={{'marginRight': '0.7em'}} />Add to cart</button>
            <button aria-label="add to outfit" onClick={(e, outfit, prod) => addProductToOutfit(e, state.user.outfit, state.currentProduct)}>{ notInOutfit ? <FontAwesomeIcon icon={farHeart} size='xl'/> : <FontAwesomeIcon icon={faHeart} size='xl'/>}</button>
          </StyledSizeQty>
          <SocialMediaShareContainer>
            <SocialMediaShareButton aria-label="facebook share" onClick={(e, url) => handleSocialMediaClick(e, `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`)}><FontAwesomeIcon icon={faFacebook} size='xl' /></SocialMediaShareButton>
            <SocialMediaShareButton aria-label="twitter share" onClick={(e, url) => handleSocialMediaClick(e, `https://twitter.com/intent/tweet?text=${pageUrl}.${socialMessage}`)}><FontAwesomeIcon icon={faTwitter} size='xl' /></SocialMediaShareButton>
            <SocialMediaShareButton aria-label="pinterest share"><FontAwesomeIcon icon={faPinterest} size='xl' onClick={(e, url) => handleSocialMediaClick(e, `https://pinterest.com/pin/create/bookmarklet/?media=${activeStyle.photos[expandedViewIndex]['thumbnail_url']}&url=${pageUrl}&description=${socialMessage}`)}/></SocialMediaShareButton>
          <p style={{fontSize: 'var(--fs-2)', display: 'block', paddingLeft: '5px'}}>Share on Social Media</p><br/>
          </SocialMediaShareContainer>

      </ProductInfoContainer>
    </ProductOverviewContainer></>)
  } else {
    return (<ProductOverviewContainer  minHeight={state.media.width * 0.65} >
      <Carousel/>
      <ProductInfoContainer/>
    </ProductOverviewContainer>)
  }
}

export default ProductInfo;