import styled from 'styled-components';

export const SocialMediaShareContainer = styled.div`
  margin-top: 10%;
  width: 340px;
  margin-left: 6em;
`

export const SocialMediaShareButton = styled.button`
  padding: 0.5em;
  color: var(--fc0);
  background-color: var(--bgc0);
  transition: color 0.4s ease-in-out;

  &:hover {
    cursor: pointer;
    color: var(--accent-color);
  }
`