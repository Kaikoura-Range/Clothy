import styled from 'styled-components';
import React from  'react';

        case quart:
          stars.push(0.25);
          break;
        case half:
          stars.push(0.5);
          break;

        case three:
          stars.push(0.75);
          break;
        case full:
          stars.push(1.0);
          break;

        default:
          stars.push(0);
          break;
      }
    } else {
      stars.push(0);
    }
    rating = rating - 1;
  }
  return (
    <div>
      {stars.map((item, i) => {
        return (
          <SingleStarContainer key={i}>
            <SingleStarFill style={{ width: `${parseInt(item * 31)}px` }}>
              <SingleStarOutline
                id={i}
                src='https://raw.githubusercontent.com/psfonseka/five-stars/master/dist/star.png'
                alt='stars alt'
                onClick={() => {}}></SingleStarOutline>
            </SingleStarFill>
          </SingleStarContainer>
        );
      })}
    </div>
  );
}

const SingleStarOutline = styled.img`
  height: 36px;
  width: 31px;
`;
const SingleStarFill = styled.div`
  position: relative;
  display: inline-block;
  height: 36px;
  background-color: rgb(247, 193, 18);
`;
const SingleStarContainer = styled.div`
  height: 36px;
  width: 31px;
  display: inline-block;
`;
