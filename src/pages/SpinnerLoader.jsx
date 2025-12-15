import React from "react";
import styled from "styled-components";

const SpinnerLoader = () => {
  return (
    <StyledWrapper>
      <div className="pl">
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__text">Loading…</div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* ===== COLORS ===== */
  --bg: #1e1e2f;
  --primary1: #4f46e5;
  --primary2: #22d3ee;
  --fg-t: rgba(255, 255, 255, 0.75);

  /* ===== CENTER SCREEN ===== */
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0f172a;

  .pl {
    box-shadow: 2em 0 2em rgba(0, 0, 0, 0.2) inset,
      -2em 0 2em rgba(255, 255, 255, 0.1) inset;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transform: rotateX(30deg) rotateZ(45deg);
    width: 14em;
    height: 14em;
    color: white;
  }

  .pl,
  .pl__dot {
    border-radius: 50%;
  }

  .pl__dot {
    animation-name: shadow724;
    box-shadow: 0.1em 0.1em 0 0.1em black,
      0.3em 0 0.3em rgba(0, 0, 0, 0.5);
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
    animation-name: pushInOut1724;
    background-color: var(--bg);
    border-radius: inherit;
    box-shadow: 0.05em 0 0.1em rgba(255, 255, 255, 0.2) inset;
    height: inherit;
    z-index: 1;
  }

  .pl__dot:after {
    animation-name: pushInOut2724;
    background-color: var(--primary1);
    border-radius: 0.75em;
    box-shadow: 0.1em 0.3em 0.2em rgba(255, 255, 255, 0.4) inset,
      0 -0.4em 0.2em #2e3138 inset,
      0 -1em 0.25em rgba(0, 0, 0, 0.3) inset;
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
      transform: rotate(${-30 * i}deg) translateX(5em) rotate(${30 * i}deg);
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
    font-size: 0.75em;
    max-width: 5rem;
    position: relative;
    text-shadow: 0 0 0.1em var(--fg-t);
    transform: rotateZ(-45deg);
  }

  @keyframes shadow724 {
    from {
      box-shadow: 0.1em 0.1em 0 0.1em black,
        0.3em 0 0.3em rgba(0, 0, 0, 0.3);
    }
    25% {
      box-shadow: 0.1em 0.1em 0 0.1em black,
        0.8em 0 0.8em rgba(0, 0, 0, 0.5);
    }
    to {
      box-shadow: 0.1em 0.1em 0 0.1em black,
        0.3em 0 0.3em rgba(0, 0, 0, 0.3);
    }
  }

  @keyframes pushInOut1724 {
    from {
      background-color: var(--bg);
      transform: translate(0, 0);
    }
    25% {
      background-color: var(--primary2);
      transform: translate(-71%, -71%);
    }
    to {
      background-color: var(--bg);
      transform: translate(0, 0);
    }
  }

  @keyframes pushInOut2724 {
    from {
      background-color: var(--bg);
      clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%);
    }
    25% {
      background-color: var(--primary1);
      clip-path: polygon(0 25%, 100% 25%, 100% 100%, 0 100%);
    }
    to {
      background-color: var(--bg);
      clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%);
    }
  }
`;

export default SpinnerLoader;
