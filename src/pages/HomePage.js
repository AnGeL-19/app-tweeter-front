import React, {useState,useEffect} from 'react'
import { HeaderTweeter } from '../components/header/HeaderTweeter';
import { CreatePost } from '../components/Post/CreatePost';
import { Trends } from '../components/home/Trends';
import { WhoToFollow } from '../components/home/WhoToFollow';
import { ShowPosts } from '../components/ShowPost/ShowPosts';
import { useSelector } from 'react-redux';
import { useFetch } from '../hooks/useFetch';
import { Layout } from '../components/layout/Layout';



export const HomePage = () => {
    
    const {token} = useSelector(state => state.auth);
    const {doFetch, data, loading, error } = useFetch(token)
    
    const [dataTweets, setDataTweets] = useState([])

    useEffect(()=>{

        doFetch('tweets/?limit=5&start=1&end=5',{},'GET',)

    },[])
    


    return (
        <Layout>
            {/* <HeaderTweeter /> */}
            <div className="home_container__main">

                {/* <main className="main__posts__aside"> */}

                    <div className="div__create_post_show">

                        <CreatePost />
                        
                        <ShowPosts tweets={data.data} loading={loading}/>

                    </div>

                    <div className="div__section__aside">

                        <Trends  />

                        <WhoToFollow />

                    </div>
                {/* </main> */}
          
            </div>
            
        </Layout>
    )
}
