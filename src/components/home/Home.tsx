
const Home = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:3000/auth/google"
    }

    return (
        <div>
            
            <button onClick={handleLogin}>
                Login w google
            </button>


        </div>
    )
}

export default Home;