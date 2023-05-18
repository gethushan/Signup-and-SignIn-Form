import React from 'react'

const logout = (event) =>{
    event.preventDefault()
    localStorage.clear()
    window.location.replace("/login");
}


const Home = () => {
    return(
    <div>
        <div className='main'>
            <div className='glass'>
                <div className='title'>
                    Home
                </div>
                
                    <div className='forum1'>
                        <a href='https://gethushan.github.io/MyPortfolio/' target='_value'>My Portfolio</a>
                        <button onClick={logout}>Logout</button>
                    </div>
                
            </div>
        </div>
    
    </div>
    )

}

export default Home;
