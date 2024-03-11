import {Outlet} from 'react-router-dom'

function RootLayout() {
  return (
    <>
    <p>Hello</p>
    <Outlet/>
    </>
    
  )
}

export default RootLayout