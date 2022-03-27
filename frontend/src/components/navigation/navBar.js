import React from "react";
import { A } from 'hookrouter';

export default function NavBar() {
    return (
        <div className="navigation-container">
            <div className="nav-link-wrapper">
                <div className="nav-link">
                    <A className="link" href="/">
                        Home
                    </A>
                </div>

                <div className="nav-link">
                    <A className="link" href="/signup">
                        Sign-Up
                    </A>
                </div>

                <div className="nav-link">
                    <A className="link" href="/snake">
                        Game
                    </A>
                </div>

                <div className="nav-link">
                    <A className="link" href="/login">
                        Login
                    </A>
                </div>
                
            </div>
        </div>
    )
}