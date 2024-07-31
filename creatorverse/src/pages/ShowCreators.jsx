import React, { useEffect, useState } from 'react';
import CreatorCard from '../components/content-creator-card';
import supabase from '../client';

function ShowCreators() {
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        async function fetchCreators() {
            console.log("Fetching creators...");
            const { data, error } = await supabase
                .from('creators')
                .select('*');
            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setCreators(data);
                console.log("Creators fetched:", data);
            }
        }
        fetchCreators();
    }, []); // Dependency array is empty to trigger on component mount only

    return (
        <div>
            <h2>Content Creators</h2>
            <div className="cards-container">
                {creators.map(creator => (
                    <CreatorCard
                        key={creator.id}
                        id={creator.id}
                        name={creator.name}
                        url={creator.url}
                        description={creator.description}
                        imageURL={creator.imageURL}
                    />
                ))}
            </div>
        </div>
    );
}

export default ShowCreators;
