import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../client';

function EditCreator() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        async function fetchCreator() {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setName(data.name);
                setUrl(data.url);
                setDescription(data.description);
                setImageURL(data.imageURL);
            }
        }

        fetchCreator();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error } = await supabase
            .from('creators')
            .update({ name, url, description, imageURL })
            .eq('id', id);
        if (error) {
            console.error('Error updating creator:', error);
        } else {
            navigate('/show-creators');
        }
    };

    const handleDelete = async () => {
        const { error } = await supabase
            .from('creators')
            .delete()
            .eq('id', id);
        if (error) {
            console.error('Error deleting creator:', error);
        } else {
            navigate('/show-creators');
        }
    };

    return (
        <div>
            <h2>Edit Creator</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    URL:
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </label>
                <label>
                    Image URL (optional):
                    <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
                </label>
                <button type="submit" className="button">Update Creator</button>
            </form>
            <button onClick={handleDelete} className="button delete">Delete</button>
            <button onClick={() => navigate('/show-creators')} className="button secondary">Back</button>
        </div>
    );
}

export default EditCreator;
