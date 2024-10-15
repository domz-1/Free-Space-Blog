    import React, { useEffect, useState } from "react";
    import { TextField, TextareaAutosize, Button, CircularProgress } from "@mui/material";
    import { postsRef } from "../firestoreConfig";
    import { updateDoc, doc, getDoc } from 'firebase/firestore';
    import { useNavigate, useParams } from "react-router-dom";

    export const EditPage = () => {
        const [title, setTitle] = useState("");
        const [body, setBody] = useState("");
        const [loading, setLoading] = useState(true);
        const navigate = useNavigate();
        const { id } = useParams();

        useEffect(() => {
            const fetchPost = async () => {
                try {
                const docRef = doc(postsRef, id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const postData = docSnap.data();
                    setTitle(postData.title);
                    setBody(postData.body);
                } else {
                    console.log("No such document!");
                    navigate('/');
                }
                } catch (error) {
                console.error('Error fetching post:', error);
                } finally {
                setLoading(false);
                }
            };
            

            fetchPost();
        }, [id, navigate]);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
            const docRef = doc(postsRef, id);
            await updateDoc(docRef, { title, body });
            navigate('/');
            } catch (error) {
            console.error("Error updating post: ", error);
            } finally {
            setLoading(false);
            }
        };

        if (loading) {
            return <CircularProgress />;
        }

        return (
            <form className="post-form" onSubmit={handleSubmit}>
                <h1>Edit Post</h1>
                <TextField
                    label="Title"
                    name="title"
                    type="text"
                    variant="filled"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="title"
                    fullWidth
                    margin="normal"
                />
                <TextareaAutosize
                    placeholder="Post Body"
                    name="post-body"
                    minRows={3}
                    className="post-body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    style={{ width: '100%', marginBottom: '1rem' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Post'}
                </Button>
            </form>
        );
    };
