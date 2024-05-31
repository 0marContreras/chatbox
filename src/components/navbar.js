import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='bg-gradient-to-t from-purple-600 to-blue-500 h-24'>
      <div>
        <a>
          <img src="/Logo.jfif" className='pt-4 pl-4 pb-4 rounded-full' alt="Logo" style={{ height: '70px', marginRight: '50px' }} />
          <h1 className=''>ChatBot</h1>
        </a>
      </div>
    </nav>
  )
}

export default Navbar
