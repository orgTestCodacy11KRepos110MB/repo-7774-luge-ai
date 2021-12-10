import React, {useEffect} from 'react';
import './index.less';
import Nav from '../../components/Layout/nav';
import Footer from '../../components/Layout/footer';
import Banner from './components/banner';
import RankCard from './components/rankCard';

function Ranking() {
    useEffect(() => {
        window._hmt.push(['_trackEvent', '千言', '比赛排行']);
    }, []);
    return (
        <div className='taskCardContainer'>
            <Nav />
            <Banner />
            <RankCard />
            <Footer />
        </div>
    );
}

export default React.memo(Ranking);