import React from 'react'

const logout = (event) =>{
    event.preventDefault()
    localStorage.clear()
    window.location.replace("/login");
}


const Home = () => {
    return(
    <div>
    "Home"    
    <button onClick={logout}>Logout</button>
    </div>
    )

}

export default Home;
