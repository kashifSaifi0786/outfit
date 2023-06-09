import styled from "styled-components";

export const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 2rem;
  @media (max-width: 420px) {
    grid-template-columns: minmax(15rem, 1fr);
  }
`;
