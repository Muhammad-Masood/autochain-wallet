import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <>
        <header className="p-6">
          <div className="flex space-x-4 items-center">
            <Image src={"/logo.png"} width={36} height={56} alt="logo" />
            <p className="text-xl">Auto Chain</p>
          </div>
        </header>
    </>
  )
}

export default Header