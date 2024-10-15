import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firestoreConfig';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

export const PostCard = ({ id, title, body, userEmail, onDelete }) => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    const handleDelete = async () => {
        try {
            const docRef = doc(db, "posts", id);
            await deleteDoc(docRef);
            console.log("Document successfully deleted!");
            onDelete(); // Call the callback to trigger re-render
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    const username = String(userData.email).split('@')[0]
    return (
        <Accordion className="post-card">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }} className="post-card-header">
                    <Typography variant="h2">{title}</Typography>
                    {/* Conditional rendering for delete button */}
                    {userEmail === username && (
                        <Box>
                            <button
                                className="btn-del"
                                onClick={handleDelete} // No need to pass id here
                            >
                                <DeleteIcon sx={{color:"#3B3030"}}/>
                            </button>
                            <Link
                                to={`/edit-post/${id}`} // Pass id as a query parameter
                                className="btn-edit"
                            >
                                <EditIcon sx={{color:"#3B3030"}}/>
                            </Link>
                        </Box>
                    )}
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Typography sx={{ fontWeight: 'bold', color: '#FFF0D1' }} className="post-card-user-email" variant="pre">
                    Posted by: @{userEmail}
                </Typography>
                <Typography variant="pre"
                    sx={{ fontWeight: 'bold', color: '#FFF0D1' ,width:"80%" , textWrap:"wrap"}}>
                    <pre style={{
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                        hyphens: 'auto',
                        overflowWrap: 'break-word',
                        lineHeight: '1.5',
                        padding: '10px',
                        borderRadius: '5px',
                        backgroundColor: '#F0F0F0',
                        color: '#3B3030',
                        marginTop: '10px',
                        marginBottom: '10px'
                    }}>
                    {body}
                    </pre>

                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};