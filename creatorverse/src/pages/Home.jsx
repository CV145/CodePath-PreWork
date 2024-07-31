import React from 'react';
import { Link } from 'react-router-dom';
import '@picocss/pico';

function Home() {
    return (
        <div className="container">
            <h2>Welcome to the Creatorverse</h2>
            <div className="grid">
                <button>
                    <Link to="/add-creator" className="button-link">Add New Content Creator</Link>
                </button>
                <button>
                    <Link to="/show-creators" className="button-link">View all Creators</Link>
                </button>
            </div>
        </div>
    );
}

export default Home;
