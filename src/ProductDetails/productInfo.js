import React from "react";
import _ from "underscore";

function ProductInfo(props) {
  if (props.product && props.styles.length !== 0 ) {
    const {name, slogan, default_price, category} = props.product;

    const allStyles = props.styles.results.map(style =>
      <p key={style.style_id}>{style.name}</p>
    )

    let activeStyle;

    _.each(props.styles.results, style => {
      if (style['default?']) {
        activeStyle = style.name;
      }
    });

    return(<div>
      <p>{category}</p>
      <h1>{name} - {slogan}</h1>
      <p>${default_price}</p>
      <p>style > {activeStyle}</p>
      {allStyles}
    </div>)
  } else {
    return <p>loading</p>
  }
}

export default ProductInfo;