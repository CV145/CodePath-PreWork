import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../client';
import '../styles/ViewCreator.css';

function ViewCreator() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [creator, setCreator] = useState(null);

    useEffect(() => {
        async function fetchCreator() {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                console.error('Error fetching creator:', error);
            } else {
                setCreator(data);
            }
        }

        fetchCreator();
    }, [id]);

    if (!creator) {
        return <div>Loading...</div>;
    }

    return (
        <div className="view-creator">
            <div className="image-container">
                {creator.imageURL && <img src={creator.imageURL} alt={creator.name} />}
            </div>
            <div className="creator-details">
                <h2>{creator.name}</h2>
                <p>{creator.description}</p>
                {creator.url && (
                    <a href={creator.url} target="_blank" rel="noopener noreferrer" className="button">
                        View
                    </a>
                )}
                <button onClick={() => navigate('/show-creators')} className="button secondary">
                    Back
                </button>
            </div>
        </div>
    );
}

export default ViewCreator;
