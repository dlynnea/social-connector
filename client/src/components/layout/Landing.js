import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <section className="landing">
            <div className="overlay">
                <div className="inside-landing">
                    <h1 className="xl">Social Connector</h1>
                    <p className="lead">Create a dev profile where you can share posts and get help from those you connect with.</p>
                    <div className="buttons">
                        <Link className="btn btn-primary" to='/register'>Sign Up</Link>
                        <Link className="btn btn-light" to='/login'>Login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing;
