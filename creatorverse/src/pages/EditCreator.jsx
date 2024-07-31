import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../client';

function EditCreator() {
    const { id } = useParams(); // Get the id from the URL params
    const navigate = useNavigate(); // Initialize the navigate hook
    const [creator, setCreator] = useState(null);
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        async function fetchCreator() {
            const parsedId = parseInt(id, 10); // Parse the id as an integer
            console.log(`Fetching creator with id: ${id} (parsed: ${parsedId})`);
            if (isNaN(parsedId)) {
                console.error('Invalid ID:', id);
                return;
            }
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', parsedId)
                .single();
            if (error) {
                console.error('Error fetching data:', error);
            } else {
                console.log('Fetched creator data:', data);
                setCreator(data);
                setName(data.name);
                setUrl(data.url);
                setDescription(data.description);
                setImageURL(data.imageURL);
            }
        }
        fetchCreator();
    }, [id]);

    async function handleSubmit(event) {
        event.preventDefault();
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            console.error('Invalid ID:', id);
            return;
        }
        const { data, error } = await supabase
            .from('creators')
            .update({ name, url, description, imageURL })
            .eq('id', parsedId);
        if (error) {
            console.error('Error updating data:', error);
        } else {
            console.log('Creator updated:', data);
            navigate('/show-creators'); // Redirect to the ShowCreators page
            window.location.reload(); // Force page refresh
        }
    }

    if (!creator) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                URL:
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </label>
            <label>
                Description:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                Image URL:
                <input
                    type="text"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                />
            </label>
            <button type="submit">Update Creator</button>
            <button onClick={() => navigate('/show-creators')} className="button secondary">Back</button>
        </form>
    );
}

export default EditCreator;
