import React from 'react';
import { createGlobalStyle, css } from 'styled-components';

const ThemeProvider = ({ STYLES, dimensions }) => {
  const { bgc, fc, fs } = STYLES;

  return (
    <GlobalStyles dimensions={dimensions} fs={fs} fc={fc} bgc={bgc} />
  )
}


const media = {
  mobile: '425px',
  tablet: '768px',
  laptop: '1024px',
  /* laptopL: '1440px',
  desktop: '2560px' */
}

const GlobalStyles = createGlobalStyle`
* {
  margin: 0px;
  padding: 0px;
  border-width: 0px;
  box-sizing: border-box;
}

html,
body {
  max-width: 100%;
  overflow-x: hidden;
  min-height: 100%;
  height: 100%;
  background-color: rgb(247, 193, 18);
  font-family: 'Open Sans', sans-serif;

}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  min-height: 100%;
  height: 100%;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

.magnifier-image {
    object-fit: cover;
  }

  html {
    --bgc-3: ${({ bgc }) => `rgb(${bgc['-3'].toString()})`};
    --bgc-2: ${({ bgc }) => `rgb(${bgc['-2'].toString()})`};
    --bgc-1: ${({ bgc }) => `rgb(${bgc['-1'].toString()})`};
    --bgc-0: ${({ bgc }) => `rgb(${bgc['0'].toString()})`};
    --bgc1: ${({ bgc }) => `rgb(${bgc['1'].toString()})`};
    --bgc2: ${({ bgc }) => `rgb(${bgc['2'].toString()})`};
    --bgc3: ${({ bgc }) => `rgb(${bgc['3'].toString()})`};

    --fc-2: ${({ fc }) => `rgb(${fc['-2'].toString()})`};
    --fc-1: ${({ fc }) => `rgb(${fc['-1'].toString()})`};
    --fc-0: ${({ fc }) => `rgb(${fc['0'].toString()})`};
    --fc1: ${({ fc }) => `rgb(${fc['1'].toString()})`};
    --fc2: ${({ fc }) => `rgb(${fc['2'].toString()})`};

    --fs-3: ${({ fs }) => `${fs['-3'].toString()}em`};
    --fs-2: ${({ fs }) => `${fs['-2'].toString()}em`};
    --fs-1: ${({ fs }) => `${fs['-1'].toString()}em`};
    --fs-0: ${({ fs }) => `${fs['0'].toString()}em`};
    --fs1: ${({ fs }) => `${fs['1'].toString()}em`};
    --fs2: ${({ fs }) => `${fs['2'].toString()}em`};
    --fs3: ${({ fs }) => `${fs['3'].toString()}em`};

    --accent-color: rgb(247, 193, 18);
    --main-bgc: var(--bgc3);
    --contain-bgc: var(--bgc1);
    --element-bgc: var(--bgc2);

    --body-fc: var(--fc-0);
    --header-fc: var(--fc-2);

    --body-fs: var(--fs-1);
    --header-fs: var(--fs1);

    --module-width: 95%;

    --product-flex: column;
    --product-carousel-width: 100%;
    --product-info-width: 100%;
    --main-Photo-width: 100%;
    --main-Photo-heigth: ${({ dimensions }) => css`${(dimensions.width).toString()}px`};
    --review-width: 66%;
    --product-description-margin-left: 22%;
    --logo-fs: 2em;
    --main-photo-modal-width: 90%;


    --header-cart-width: 75%;
    --header-logo-width: 25%;

    --searchBar-width: 80%;
    color: var(--body-fc);


    @media (min-width: ${media.tablet} ) {
      --body-fs: var(--fs-0);
      --header-fs: var(--fs2);
      --product-flex: row;
      --main-Photo-width: ${({ dimensions }) => css`${(dimensions.width * 0.65).toString()}px`};
      --main-Photo-heigth: ${({ dimensions }) => css`${(dimensions.width * 0.65).toString()}px`};
      --product-carousel-width: 65%;

      --product-info-width: 35%;

      --searchBar-width: 50%;
      --review-width: 100%;
      --header-cart-width: 50%;
      --header-logo-width: 50%;
      --product-description-margin-left: 0%;
      --logo-fs: 3em;
      --main-photo-modal-width: 75%;
    }

    @media (min-width: ${media.laptop} ) {
     --body-fs: var(--fs1);
     --header-fs: var(--fs3);
     --main-Photo-width: ${({ dimensions }) => css`${(dimensions.width * 0.65).toString()}px`};
      --main-Photo-heigth: ${({ dimensions }) => css`${(dimensions.width * 0.65).toString()}px`};
     --header-cart-width: 40%;
     --header-logo-width: 60%;
     --main-photo-modal-width: 60%;
    }
  }
`




var calcRange = (baseValues, change, steps) => {
  baseValues = Array.isArray(baseValues) ? baseValues : [baseValues]
  var rangeKey = 0 - steps;
  const newRange = {};
  while(steps >= rangeKey) {
    // eslint-disable-next-line no-loop-func
    const newValues = baseValues.map((value, ind) => {
      var newValue = value + (rangeKey * change[ind])
      newValue = newValue > 0 ? newValue : 0;
      newValue = newValue > 255 ? 255 : newValue
      return newValue
    })
    newRange[rangeKey.toString()] = newValues.length > 1 ? newValues : newValues[0]
    rangeKey++
  }

  return newRange
}

var createTheme = (baseValues) => {
  const theme = {}
  const { background, font } = baseValues
  const baseBGColors = background.color;
  const baseBGChange = background.change || [5, 5, 5];
  const steps = background.range || 2;
  theme.bgc = calcRange(baseBGColors, baseBGChange, steps)

  const { fontSize, fontColor } = font;

  const fontColors = fontColor.value;
  const fontCChange = fontColor.change || [5, 5, 5];
  const fontCRange = fontColor.range || 2;
  theme.fc = calcRange(fontColors, fontCChange, fontCRange)

  const fontSizeBase = fontSize.value;
  const fontSChange = fontSize.change || [0.3];
  const fontSRange = fontSize.range || 2;
  theme.fs = calcRange(fontSizeBase, fontSChange, fontSRange)
  return theme
}


var darkBase = {
  background: {
    color: [30,30,30],
    change: [-5, -5, -5],
    range: 3,
  },
  font: {
    fontSize: {
      value: 1.1,
      range: 3,
      change: [.1]
    },
    fontColor: {
      value: [240, 240, 240]
    }
  }
}


var ligthBase = {
  background: {
    color: [240,240,240],
    range: 3,
  },
  font: {
    fontSize: {
      value: 1,
      range: 3,
      change: [.1]
    },
    fontColor: {
      value: [25, 25, 25]
    }
  }
}

export const darkTheme = createTheme(darkBase)
export const lightTheme = createTheme(ligthBase)


export default ThemeProvider
