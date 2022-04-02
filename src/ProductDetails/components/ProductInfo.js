import React, {useState, useEffect} from "react";
import Carousel from "./ProductCarousel.js";
// import _ from "underscore";

function ProductInfo(props) {
  const [activeStyle, setActiveStyle] = useState({});

  useEffect(() => {

  }, [activeStyle])

  if (props.product && props.styles.length !== 0 ) {

    const {name, category} = props.product;
    const default_price = props.styles.results[0].original_price;
    const default_name = props.styles.results[0].name;
    const default_photos = props.styles.results[0].photos;

    const handleSelectedStyle = (e, style) => {
      setActiveStyle(style);
    }

    const allStyles = props.styles.results.map(style =>
      <img src={style.photos[0].thumbnail_url} alt={style.name} key={style.style_id} width="100px" height="100px" onClick={(e) => handleSelectedStyle(e, style)}/>
    )

    return(<div>
      <Carousel photos={activeStyle.photos || default_photos}/>
      <p>{category}</p>
      <h1>{name}</h1>
      <p>${activeStyle.original_price || default_price}</p>
      <p>style > {activeStyle.name || default_name}</p>
      {allStyles}
    </div>)
  } else {
    return <p>loading</p>
  }
}

export default ProductInfo;