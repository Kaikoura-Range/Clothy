import { createGlobalStyle } from 'styled-components';

const ThemeProvider = ({ STYLES }) => {
  const { bgc, fc, fs } = STYLES;
  return (
    <GlobalStyles  fs={fs} fc={fc} bgc={bgc} />
  )
}


const media = {
  /* mobileS: '320px',
  mobileM: '375px', */
  mobile: '425px',
  tablet: '768px',
  laptop: '1024px',
  /* laptopL: '1440px',
  desktop: '2560px' */
}

const GlobalStyles = createGlobalStyle`
  html {
    --bgc-2: ${({ bgc }) => `rgb(${bgc['-2'].toString()})`};
    --bgc-1: ${({ bgc }) => `rgb(${bgc['-1'].toString()})`};
    --bgc-0: ${({ bgc }) => `rgb(${bgc['0'].toString()})`};
    --bgc1: ${({ bgc }) => `rgb(${bgc['1'].toString()})`};
    --bgc2: ${({ bgc }) => `rgb(${bgc['2'].toString()})`};

    --fc-2: ${({ fc }) => `rgb(${fc['-2'].toString()})`};
    --fc-1: ${({ fc }) => `rgb(${fc['-1'].toString()})`};
    --fc-0: ${({ fc }) => `rgb(${fc['0'].toString()})`};
    --fc1: ${({ fc }) => `rgb(${fc['1'].toString()})`};
    --fc2: ${({ fc }) => `rgb(${fc['2'].toString()})`};

    --fs-3: ${({ fs }) => `${fs['-3'].toString()}rem`};
    --fs-2: ${({ fs }) => `${fs['-2'].toString()}rem`};
    --fs-1: ${({ fs }) => `${fs['-1'].toString()}rem`};
    --fs-0: ${({ fs }) => `${fs['0'].toString()}rem`};
    --fs1: ${({ fs }) => `${fs['1'].toString()}rem`};
    --fs2: ${({ fs }) => `${fs['2'].toString()}rem`};
    --fs3: ${({ fs }) => `${fs['3'].toString()}rem`};


    @media (max-width: ${media.tablet} ) {
      --bgc2: ${`rgb(${[170, 30, 30].toString()})`};
      --bgc-2: ${`rgb(${[170, 30, 30].toString()})`};
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
    change: [-5, -5, -5]
  },
  font: {
    fontSize: {
      value: 1,
      range: 3,
      change: [.1]
    },
    fontColor: {
      value: [240, 240, 240]
    }
  }
}


// var darkBase = {
//   background: {
//     color: [247, 193, 18],
//     change: [-5, -5, -5]
//   },
//   font: {
//     fontSize: {
//       value: 1,
//       range: 3,
//       change: [.1]
//     },
//     fontColor: {
//       value: [240, 240, 240]
//     }
//   }
// }

var ligthBase = {
  background: {
    color: [230,230,230]
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





// export const lightTheme = {

//   background: {
//     bgColor: {
//       main: [250, 250, 250],
//       module:  [240, 240, 240],
//       container: [235, 235, 235],
//       element: [245, 245, 245]
//     }
//   },

//   font: {
//     fSize: {
//       body: .77,
//       containHeader: 1.7,
//       modHeader: 5,
//     },
//     fColor: {
//       body: [35, 35, 35],
//       header: [25, 25, 25]
//     }
//   }

// }



// export const darkTheme = {


//   background: {
//     bgColor: {
//       main: [30, 30, 30],
//       module:  [50, 50, 50],
//       container: [45, 45, 45],
//       element: [40, 40, 40]
//     }
//   },

//   font: {
//     fSize: {
//       body: .77,
//       containHeader: 1.7,
//       modHeader: 5,
//     },
//     fColor: {
//       body: [245, 245, 245],
//       header: [255, 255, 255]
//     }
//   }


// }


// export const lightTheme = {
//   main: {
//     background: {

//       color: [250, 250, 250]
//     },
//     font : {
//       color: [40, 40, 40],
//       size: 5,
//     }
//   },

//   module: {
//     background: {
//       color: [235, 235, 235]
//     }
//   },

//   container: {
//     background: {
//       color: [225, 225, 225]
//     },
//     font : {
//       color: [40, 40, 40],
//       size: 5,
//     }
//   }

// }


// export const darkTheme = {

//   main: {
//     background: {
//       color: [30, 30, 30]
//     }
//   },

//   module: {
//     background: {
//       color: [50, 50, 50]
//     }
//   },

//   container: {
//     background: {
//       color: [65, 65, 65]
//     },
//     font : {
//       color: [240, 240, 240],
//       size: 4,
//     }
//   }

// }



// const element = {
//   background: {
//     color: [240, 240, 240]
//   },
//   font : {
//     color: [40, 40, 40],
//     size: 5,
//   }
// }




// const mainLight = {
//   background: {
//     color: [240, 240, 240]
//   },
//   font : {
//     color: [40, 40, 40],
//     size: 5,
//   }
// }


// const containerLight = {
//   background: {
//     color: [225, 225, 225]
//   },
//   font : {
//     color: [40, 40, 40],
//     size: 5,
//   }
// }


// const createTheme = function() {
//   const themeElements = [...arguments]
//   return themeElements.reduce((memo, elementData) => {
//     const [elementKey, elementValues] = elementData;
//     memo[elementKey] = elementValues;
//     return memo
//   }, {})
// }