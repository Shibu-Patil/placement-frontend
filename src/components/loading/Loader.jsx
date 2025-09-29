import React from 'react'

const Loader = () => {
  return (
    <svg
      width="500"
      height="500"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
  
        <mask id="fillUpMask">
          <rect
            x="0"
            y="500"
            width="500"
            height="500"
            fill="white"
          >
            <animate
              attributeName="y"
              from="500"
              to="0"
              dur="2s"
              fill="freeze"
            />
          </rect>
        </mask>
      </defs>

      <circle
        cx="250"
        cy="250"
        r="150"
        stroke="#ccc"
        strokeWidth="30"
        fill="none"
      />
      <polygon
        points="250,250 450,440 360,495"
        fill="#ccc"
      />

  
      <circle
        cx="250"
        cy="250"
        r="150"
        stroke="#FF6A00"
        strokeWidth="30"
        fill="none"
        mask="url(#fillUpMask)"
      />
      <polygon
        points="250,250 450,440 360,495"
        fill="#000"
        mask="url(#fillUpMask)"
      />
    </svg>
  )
}

export default Loader
