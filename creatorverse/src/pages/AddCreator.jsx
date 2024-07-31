import React, { useState } from 'react';
import supabase from '../client';
import { useParams, useNavigate } from 'react-router-dom';

function AddCreator() {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const navigate = useNavigate(); // Initialize the navigate hook

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
            .from('creators')
            .insert([{ name, url, description, imageURL }]);
        if (error) {
            console.error('Error adding creator:', error.message, error.details);
        } else {
            console.log('Creator added:', data);
            setName('');
            setUrl('');
            setDescription('');
            setImageURL('');
            navigate('/show-creators'); // Redirect to the ShowCreators page
            window.location.reload(); // Force page refresh
        }
    };

    return (
        <div>
            <h2>Add a New Content Creator</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>URL</label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Image URL (optional)</label>
                    <input
                        type="text"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                    />
                </div>
                <button type="submit">Add Creator</button>
            </form>
        </div>
    );
}

export default AddCreator;
