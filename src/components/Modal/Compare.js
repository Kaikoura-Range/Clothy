import { useContext } from 'react';
import { StateContext, DispatchContext } from '../../appState/index';
import styled, { css } from 'styled-components';



const CompareModal = ({ newProduct }) => {
  const [state] = useContext(StateContext)
  const [, dispatch] = useContext(DispatchContext)

  const currentProduct = { ...state.details.product, ...state.details.styles };
  const renderData = getRenderedValues(currentProduct, newProduct)
  const names = [currentProduct.name, 'vs', newProduct.name]
  const columns = ['flex-start', 'center', 'flex-end']
  console.log(currentProduct)

  return (
    <CompareContainer>
      {columns.map((position, ind) => (
      <CompareColumn key={position}  position={position} >
        <CompareColumnName> {names[ind]} </CompareColumnName>
        {renderData.map((data, jInd) => <CompareBody key={jInd} > {data[ind] ? data[ind] : '-' } </CompareBody>)}
      </CompareColumn>
      ))}
    </CompareContainer>
  )
};

const findMatchingFeatures = (productA, productB) => {
  return  productA.features.map(( aVals ) => {
    const { feature, value } = aVals;
    const matchingFeatures = productB.features.filter((bVals) =>  bVals.feature === feature)
    return matchingFeatures.length ? [ value, feature,  matchingFeatures[0].value] : [ value, feature, null]
  })
}

const getFeatures = (productA, productB) => {
  const matchB = findMatchingFeatures(productA, productB)
  const matchA = findMatchingFeatures(productB, productA)
  return matchA.reduce((memo, Afeatures) => {
    const found = memo.some(Bfeatures => Bfeatures[1] === Afeatures[1])
    !found &&  memo.push(Afeatures.reverse())
    return memo
  }, matchB)

}

const getRenderedValues = (productA, productB) => {
  const categoryData = [productA.category, 'category',  productB.category]
  const priceData = [ '$' + productA.default_price, 'price', '$' + productB.default_price]
  const styleData = [productA.results.length, 'style options',  productB.results.length]
  const featureData = getFeatures(productA, productB)
  return [ categoryData, priceData, styleData, ...featureData]
}


const CompareContainer = styled.div`
  gap: 1em;
  padding: 2em;
  display: flex;
  border-radius: 3px;
  align-items: center;
  justify-content: space-between;
  background-Color:  var(--contain-bgc);
`


const CompareColumn = styled.div`
  gap: 0.75em;
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ position }) => css`${position}`};
`

const CompareColumnName = styled.h2`
  padding-bottom: 0.6em;
  color: var(--header-fc);
`

const CompareBody = styled.p`
  color: var(--body-fc);
  font-size: var(--body-fs);
`

export default CompareModal




