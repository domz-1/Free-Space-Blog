import { useEffect, useState, useCallback } from "react";
import { getDocs } from "firebase/firestore"; 
import { PostCard } from "./PostCard";
import { postsRef } from "./../firestoreConfig"; 
import { Box, Button } from '@mui/material';

export const PostsSection = () => {
    const [posts, setPosts] = useState([]); 
    const [displayMode, setDisplayMode] = useState('all'); // 'all' or 'my'
    const [refreshCounter, setRefreshCounter] = useState(0);

    const fetchPosts = useCallback(async () => {
        try {
            const querySnapshot = await getDocs(postsRef);
            if (querySnapshot.empty) {
                setPosts([]);
            } else {
                setPosts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
        localStorage.removeItem('rerender'); 
    }, [refreshCounter, fetchPosts]);

    const handleRefresh = useCallback(() => {
        setRefreshCounter(prev => prev + 1);
    }, []);
    
    const userData =  JSON.parse(localStorage.getItem("userData"));
    const curretUserEmail =  userData.email
    
    const filteredPosts = displayMode === 'my'
    ? posts.filter(post => post.userEmail ===curretUserEmail)
    : posts;
    
    return (
        <div className="posts-section">
            <Box className='btns'>
                <Button 
                    onClick={() => setDisplayMode('my')}
                    variant={displayMode === 'my' ? 'contained' : 'outlined'}
                    color="warning"
                >
                    My Posts
                </Button>
                <Button 
                    onClick={() => setDisplayMode('all')}
                    variant={displayMode === 'all' ? 'contained' : 'outlined'}
                    color="warning"

                >
                    All Posts
                </Button>
            </Box>
            {filteredPosts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                filteredPosts.map((post) => (
                    <PostCard
                        key={post.id}
                        title={post.title}
                        body={post.body}
                        id={post.id}
                        userEmail={String(post.userEmail).split('@')[0]}
                        onDelete={handleRefresh}
                    />
                ))
            )}
        </div>
    );
};