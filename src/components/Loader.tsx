import styled from "@emotion/styled";

const StyledDiv = styled("div")`
  width: 150px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  position: relative;
  background-color: #638aff;

  &::before {
    content: "";
    width: 85%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(15 23 42 / var(--tw-bg-opacity));
  }

  &::after {
    content: "";
    position: absolute;
    width: 30%;
    height: 110%;
    left: 50%;
    top: -5%;
    transform: translate(-50%, 0%);
    background-color: rgb(15 23 42 / var(--tw-bg-opacity));
    transform-origin: center;
    animation: rotate 5s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: translate(-50%, 0%) rotate(0deg);
    }
    to {
      transform: translate(-50%, 0%) rotate(360deg);
    }
  }
`;

export default function Loader() {
  return (
    <>
      <div className="grid place-content-center">
        <StyledDiv></StyledDiv>
      </div>
    </>
  );
}
