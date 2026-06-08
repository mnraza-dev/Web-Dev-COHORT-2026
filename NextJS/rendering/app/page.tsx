import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <h1 style={{
        fontSize: 44
      }}>Home Page</h1>
      <br />
      <hr />
      <br />
     <div className='flex items-center justify-center gap-4'>

      <Link href="/about">Go to About</Link> <br />
      <Link href={
        {
          pathname: "/contact",
          query: {
            name: "test"
          }
        }
      }>Go to Contact</Link>
      </div>

     <div className='flex items-center justify-between gap-4'>
     <Image
        alt='image'
        width={500}
        height={500}
        src='/airplane.svg' />

      <Image
        width={400}
        height={200}
        src='https://chaicode.com/assets/white-3-CGLYt1t0.webp'
        alt='author' />

     </div>


    </div>
  )
}

export default HomePage