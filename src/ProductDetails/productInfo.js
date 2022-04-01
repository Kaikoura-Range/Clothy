import React, {useState, useEffect, useLayoutEffect} from "react";
import _ from "underscore";

function ProductInfo(props) {
  const [activeStyle, setActiveStyle] = useState({});

  useEffect(() => {

  }, [activeStyle])

  if (props.product && props.styles.length !== 0 ) {

    const handleSelectedStyle = (e, style) => {
      setActiveStyle(style);
    }

    const {name, default_price, category} = props.product;

    const allStyles = props.styles.results.map(style =>
      <img src={style.photos[0].thumbnail_url} alt={style.name} key={style.style_id} width="100px" height="100px" onClick={(e) => handleSelectedStyle(e, style)}></img>
    )

    return(<div>
      <p>{category}</p>
      <h1>{name}</h1>
      <p>${default_price}</p>
      <p>style > {activeStyle.name || props.styles.results[0].name}</p>
      {allStyles}
    </div>)
  } else {
    return <p>loading</p>
  }
}

export default ProductInfo;