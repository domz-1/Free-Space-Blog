
import { LandingPage } from '../components/LandingPage';
import { PostsSection } from '../components/PostsSection';
    // Action creators


    export default function Home() {
    
    const userLoggedIn=  localStorage.getItem('userLoggedIn')
    const userData=  JSON.parse(localStorage.getItem('userData'))



    return (
        <>
        <LandingPage/>
        <PostsSection/>
        </>
    );
    }
        