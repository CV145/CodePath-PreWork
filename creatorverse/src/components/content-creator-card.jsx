import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css';

function CreatorCard({ id, name, url, description, imageURL }) {
    return (
        <div className="card">
            <Link to={`/view-creator/${id}`} className="card-link">
                {imageURL && <img src={imageURL} alt={`${name}`} />}
                <div className="card-title">{name}</div>
                <div className="card-description">{description}</div>
            </Link>
            <div className="card-links">
                {url && (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="button">
                        Visit
                    </a>
                )}
                <Link to={`/edit-creator/${id}`} className="button secondary">
                    Edit
                </Link>
            </div>
        </div>
    );
}

export default CreatorCard;
