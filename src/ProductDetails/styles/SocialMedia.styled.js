import styled from 'styled-components';

export const SocialMediaShareContainer = styled.div`
  display: flex;
  margin-top: 3em;
  color: var(--fc0);
`

export const SocialMediaShareButton = styled.button`
  padding: 0.5em;
  background-color: var(--bgc0);
  transition: color 0.4s ease-in-out;

  &:hover {
    cursor: pointer;
    color: var(--accent-color);
  }
`