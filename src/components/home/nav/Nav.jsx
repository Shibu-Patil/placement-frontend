import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='flex w-full h-16 bg-yellow-300 shadow-[0px_0px_20px_2px_#111] sticky top-0 pr-6'>
      <div className='w-1/4 h-full'>
        <div className='w-[150px] h-full flex justify-center items-center mt-1'>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" className="size-full">

            <text x="220" y="220" fontFamily="Arial, Helvetica, sans-serif" fontSize="80" fontWeight="bold"
                  fill="none" stroke="black" strokeWidth="2" strokeDasharray="700" strokeDashoffset="700">
              SPIDERS
              <animate attributeName="stroke-dashoffset" from="700" to="0" dur="2s" fill="freeze" />
            </text>

            <text x="220" y="220" fontFamily="Arial, Helvetica, sans-serif" fontSize="80" fontWeight="bold"
                  fill="black" opacity="0">
              SPIDERS
              <animate attributeName="opacity" from="0" to="1" begin="2s" dur="1s" fill="freeze" />
            </text>

            <defs>
              <clipPath id="fillClip">
                <rect x="120" y="150" width="40" height="0">
                  <animate attributeName="height" from="0" to="180" begin="3.5s" dur="1s" fill="freeze" />
                </rect>
              </clipPath>
            </defs>

            <g transform="rotate(-40 120 150)">
              <circle cx="120" cy="150" r="80" stroke="#FF6A00" strokeWidth="20" fill="none"
                      strokeDasharray="502" strokeDashoffset="502">
                <animate attributeName="stroke-dashoffset" from="502" to="0" begin="0.5s" dur="2s" fill="freeze" />
              </circle>

              <polygon points="120,150 120,330 160,330" fill="none" stroke="black" strokeWidth="1"
                       strokeDasharray="648" strokeDashoffset="648">
                <animate attributeName="stroke-dashoffset" from="648" to="0" begin="2.5s" dur="1s" fill="freeze" />
              </polygon>

              <polygon points="120,150 120,330 160,330" fill="black" clipPath="url(#fillClip)" opacity="0.9" />
            </g>

          </svg>

        </div>
      </div>

      <div className='w-1/4'></div>

      <div className='w-2/4 h-full flex items-center justify-end font-semibold gap-12 text-nowrap'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/add-groomming">Add Grooming</NavLink>
        <NavLink to="/add-trainers">Add Trainers</NavLink>
        <NavLink to="/search-grooming">Search Grooming</NavLink>
      </div>
    </nav>
  )
}

export default Nav
