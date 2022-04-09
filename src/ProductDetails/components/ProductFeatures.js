import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

function ProductFeatures(props) {
  if (props.product) {
    if (props.product.features) {
      const features = props.product.features.map((feature, index) => <p key={index}><FontAwesomeIcon icon={faCircleCheck} /> {feature.feature }:
        {feature.value.toLowerCase()}</p>
      )

      return(<div>
        <aside>
          {features}
        </aside>
      </div>)
    }

  } else {
    return <p>loading</p>
  }
}

export default ProductFeatures;