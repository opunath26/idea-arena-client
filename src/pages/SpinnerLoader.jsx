import React from "react";
import styled from "styled-components";

const SpinnerLoader = () => {
  return (
    <StyledWrapper>
      <div className="loader-container">
        <div className="pl">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="pl__dot" />
          ))}
          <div className="pl__text">Loading…</div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* ===== PROJECT COLOR SYSTEM ===== */
  --bg: #f8fafc;
  --primary-color: #9333ea; /* Purple Theme Accent */
  --secondary-color: #3b82f6; /* Accent Blue */
  --text-color: #475569;

  min-height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .pl {
    box-shadow: 1.5em 0 1.5em rgba(147, 51, 234, 0.08) inset,
      -1.5em 0 1.5em rgba(255, 255, 255, 0.8) inset;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transform: rotateX(30deg) rotateZ(45deg);
    width: 13em;
    height: 13em;
    color: var(--text-color);
  }

  .pl,
  .pl__dot {
    border-radius: 50%;
  }

  .pl__dot {
    animation-name: shadowAnimation;
    box-shadow: 0.1em 0.1em 0 0.1em rgba(147, 51, 234, 0.2),
      0.2em 0 0.4em rgba(0, 0, 0, 0.15);
    top: calc(50% - 0.75em);
    left: calc(50% - 0.75em);
    width: 1.5em;
    height: 1.5em;
  }

  .pl__dot,
  .pl__dot:before,
  .pl__dot:after {
    animation-duration: 2s;
    animation-iteration-count: infinite;
    position: absolute;
  }

  .pl__dot:before,
  .pl__dot:after {
    content: "";
    display: block;
    left: 0;
    width: inherit;
  }

  .pl__dot:before {
    animation-name: pushInOutUpper;
    background-color: var(--bg);
    border-radius: inherit;
    box-shadow: 0.05em 0 0.1em rgba(255, 255, 255, 0.5) inset;
    height: inherit;
    z-index: 1;
  }

  .pl__dot:after {
    animation-name: pushInOutLower;
    background-color: var(--primary-color);
    border-radius: 0.75em;
    box-shadow: 0.1em 0.3em 0.2em rgba(255, 255, 255, 0.4) inset,
      0 -0.4em 0.2em rgba(126, 34, 206, 0.6) inset;
    bottom: 0;
    clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%);
    height: 3em;
    transform: rotate(-45deg);
    transform-origin: 50% 2.25em;
  }

  ${[...Array(12)]
    .map(
      (_, i) => `
    .pl__dot:nth-child(${i + 1}) {
      transform: rotate(${-30 * i}deg) translateX(4.5em) rotate(${30 * i}deg);
      z-index: ${i < 6 ? i + 1 : 12 - i};
    }
    .pl__dot:nth-child(${i + 1}),
    .pl__dot:nth-child(${i + 1}):before,
    .pl__dot:nth-child(${i + 1}):after {
      animation-delay: ${-i / 6}s;
    }
  `
    )
    .join("")}

  .pl__text {
    font-size: 0.8em;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--primary-color);
    transform: rotateZ(-45deg);
  }

  @keyframes shadowAnimation {
    from {
      box-shadow: 0.1em 0.1em 0 0.1em rgba(147, 51, 234, 0.2),
        0.3em 0 0.3em rgba(0, 0, 0, 0.1);
    }
    25% {
      box-shadow: 0.1em 0.1em 0 0.1em rgba(147, 51, 234, 0.3),
        0.6em 0 0.6em rgba(0, 0, 0, 0.2);
    }
    to {
      box-shadow: 0.1em 0.1em 0 0.1em rgba(147, 51, 234, 0.2),
        0.3em 0 0.3em rgba(0, 0, 0, 0.1);
    }
  }

  @keyframes pushInOutUpper {
    from {
      background-color: var(--bg);
      transform: translate(0, 0);
    }
    25% {
      background-color: var(--secondary-color);
      transform: translate(-71%, -71%);
    }
    to {
      background-color: var(--bg);
      transform: translate(0, 0);
    }
  }

  @keyframes pushInOutLower {
    from {
      background-color: var(--bg);
      clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%);
    }
    25% {
      background-color: var(--primary-color);
      clip-path: polygon(0 25%, 100% 25%, 100% 100%, 0 100%);
    }
    to {
      background-color: var(--bg);
      clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%);
    }
  }
`;

export default SpinnerLoader;