import React, {useState, useEffect, useRef} from "react";
import Carousel from "./ProductCarousel.js";
// import _ from "underscore";

function ProductInfo(props) {
  const [activeStyle, setActiveStyle] = useState({});
  const [skus, setSkus] = useState([]);

  useEffect(() => {
    if (props.styles) {
      console.log('props', props.styles.results);
      setActiveStyle(props.styles.results[0]);
      setSkus(Object.entries(props.styles.results[0].skus));
    }
  }, [props.styles])

  if (activeStyle.name) {

    const {name, category} = props.product;

    const handleSelectedStyle = (e, style) => {
      setActiveStyle(style);
      setSkus(Object.entries(activeStyle.skus));
    }

    const allStyles = props.styles.results.map(style =>
      <img src={style.photos[0].thumbnail_url} alt={style.name} key={style.style_id} width="100px" height="100px" onClick={(e) => handleSelectedStyle(e, style)}/>
    )

    const availableSizes = skus.map(sku =>
      <option key={sku[0]} value={sku[1].size}>{sku[1].size}</option>
    )

    return(<div>
      <Carousel photos={activeStyle.photos}/>
      <p>{category}</p>
      <h1>{name}</h1>
      <p>${activeStyle.original_price}</p>
      <p>style > {activeStyle.name}</p>
      {allStyles}
      <br/>
      <label htmlFor="size">Select your size</label>
      <select name="size" id="size">
        {availableSizes}
      </select>
    </div>)
  } else {
    return <p>loading</p>
  }
}

export default ProductInfo;