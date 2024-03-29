import React, { memo, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// const Home = lazy(() => import('@/pages/home'));
import Home from '../pages/home';
import DataDetail from '../pages/detail';
import Nav from '../components/Layout/nav';
import Footer from '../components/Layout/footer';
const Task = lazy(() => import('../pages/task'));
const Game = lazy(() => import('../pages/game'));
const About = lazy(() => import('../pages/about'));
const Ranking = lazy(() => import('../pages/ranking/index'));
const RankDetail = lazy(() => import('../pages/ranking/rankDetail'));
const TaskDetail = lazy(() => import('../pages/task/TaskDetail'));
const MatchIndex = lazy(() => import('../pages/match'));
const JoinIndex = lazy(() => import('../pages/join'));
const Selected = lazy(() => import('../pages/selected/selected'));

const App = () => {
    return (
        <>
            <Nav />
            <Suspense fallback={null}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/luge/task" exact component={Task} />
                    <Route path="/luge/game" exact component={Game} />
                    <Route path="/luge/about" exact component={About} />
                    <Route path="/luge/ranking" exact component={Ranking} />
                    <Route path="/luge/ranking/rankDetail" exact component={RankDetail} />
                    <Route path="/luge/dataDetail" exact component={DataDetail} />
                    <Route path="/luge/task/taskDetail" exact component={TaskDetail} />
                    <Route path="/luge/match" exact component={MatchIndex} />
                    <Route path="/luge/join" exact component={JoinIndex} />
                    <Route path="/luge/selected" exact component={Selected} />
                    <Redirect to="/" />
                </Switch>
            </Suspense>
            <Footer />
        </>
    );
};

export default memo(App);
