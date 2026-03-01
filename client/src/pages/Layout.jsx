import React from 'react'

const Dashboard = () =>{
    return (
        <div>
            <h1>Layout page</h1>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout