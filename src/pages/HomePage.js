import React, {useState,useEffect} from 'react'
import { HeaderTweeter } from '../components/header/HeaderTweeter';
import { CreatePost } from '../components/Post/CreatePost';
import { Trends } from '../components/home/Trends';
import { WhoToFollow } from '../components/home/WhoToFollow';
import { ShowPosts } from '../components/ShowPost/ShowPosts';
import { useSelector } from 'react-redux';
import { useFetch } from '../hooks/useFetch';



export const HomePage = () => {
    
    const {token} = useSelector(state => state.auth);
    const [ data, loading, error ] = useFetch('tweets/?limit=5&start=1&end=5',{},'GET',token)
    
    const [dataTweets, setDataTweets] = useState([])

    useEffect(()=>{
        setDataTweets(data.data )
        return() => setDataTweets([])
    },[data])
    
    return (
        <div>
            <HeaderTweeter />
            <div className="home_container__main">

                <main className="main__posts__aside">

                    <div className="div__create_post_show">

                        <CreatePost />
                        
                        <ShowPosts tweets={dataTweets} loading={loading}/>

                    </div>

                    <div className="div__section__aside">

                        <Trends  />

                        <WhoToFollow />

                    </div>
                </main>
          
            </div>
            
        </div>
    )
}
