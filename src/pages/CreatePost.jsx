    import { TextField, TextareaAutosize, Button } from "@mui/material";
    import { useState } from "react";
    import { postsRef } from "../firestoreConfig";
    import { addDoc, getDoc } from 'firebase/firestore';
    import { useNavigate } from "react-router-dom";

    export const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const user = JSON.parse(localStorage.getItem('userData'));
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const newPostRef = await addDoc(postsRef, {
                title: title,
                body: body,
                userId: user?.uid, 
                userEmail: user?.email
                });
                
                await getDoc(newPostRef);

        setTitle("");
        setBody("");
        navigate('/')
        } catch (error) {
        console.error("Error adding post: ", error);
        }
    };

    return (
        <>
        <form className="post-form" onSubmit={handleSubmit}>
            <h1>Create Post</h1>
            <TextField
            label="Title"
            name="title"
            type="text"
            variant="filled"
            value={title}  // Use value to control the form
            onChange={(e) => setTitle(e.target.value)}  
            className="title"// Use onChange instead of onBlur
            />
            <TextareaAutosize
            placeholder="Post Body"
            name="post-body"
            minRows={3}
            className="post-body"
            value={body}  // Control the textarea
            onChange={(e) => setBody(e.target.value)}
            />
            <Button
            variant="contained"
            className="btn-delete"
            type="submit"  // Set the type to "submit"
            >
            Submit
            </Button>
        </form>
        </>
    );
    };
