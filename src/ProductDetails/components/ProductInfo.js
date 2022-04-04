import React, {useState, useEffect, useRef} from "react";
import Carousel from "./ProductCarousel.js";
// import _ from "underscore";

function ProductInfo(props) {
  const [activeStyle, setActiveStyle] = useState({});
  const [skus, setSkus] = useState([]);

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
      const initialSkus = handleSizeDuplicates((Object.values(props.styles.results[0].skus)));
      setSkus(Object.entries(initialSkus));
    }
  }, [props.styles])

  // Triggered when the active style changes
  useEffect(() => {
    if (activeStyle.name) {
      const newSkus = handleSizeDuplicates((Object.values(activeStyle.skus)));
      setSkus(Object.entries(newSkus));
    }
  }, [activeStyle])


  if (activeStyle.name) {
    const {name, category} = props.product;

    const handleSelectedStyle = (e, style) => {
      setActiveStyle(style);
    }

    const allStyles = props.styles.results.map(style =>
      <img src={style.photos[0].thumbnail_url} alt={style.name} key={style.style_id} width="100px" height="100px" onClick={(e) => handleSelectedStyle(e, style)}/>
    )

    const availableSizes = skus.map((sku, index) =>
      <option key={index} value={sku[0]}>{sku[0]}</option>
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