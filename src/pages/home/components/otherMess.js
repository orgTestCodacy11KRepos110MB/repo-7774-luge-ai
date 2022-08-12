import React, { memo, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { ArrowRightOutlined } from '@ant-design/icons';
import { getRankList, getGameList } from '../../../base/request';
import { formatDate } from '../../../utils/index';
import game_01 from '../assets/game_01.png';
import game_02 from '../assets/game_02.png';
import game_03 from '../assets/game_03.png';

const TaskDesc = memo(props => {
    const { taskType } = props;
    const localTasks = JSON.parse(localStorage.getItem('TaskType'));
    const taskDetail = localTasks.find(item => item.taskId === taskType.current.taskId);
    return (
        <div className='platform'>
            <div className='platform-title'>
                <span>{taskDetail.name}<Link to={`/luge/task/taskDetail?taskId=${taskType.current.taskId}`}>详情<ArrowRightOutlined /></Link></span>
            </div>
            <div className='platform-detail'>
                {taskDetail.description}
            </div>
        </div>
    );
});

const GamesCard = memo(props => {
    let { taskType } = props;
    const [rankData, setRankData] = useState({ top: [] });
    const imgs = [
        game_01,
        game_02,
        game_03
    ];
    useMemo(async () => {
        const res = await getRankList({ taskId: taskType.current.taskId });
        if (res.data.list && res.data.list[0]) {
            setRankData(res.data.list[0]);
        }
    }, [taskType]);
    return (
        <div className='platform' style={{ height: '210px' }}>
            <div className='platform-title'>
                <span className='platform-title-top'><strong className='platform-title-name platform-title-name-other'>常规赛-排行榜</strong><Link
                    onClick={() => {
                        window._hmt.push(['_trackEvent', '首页-排行榜', `点击全部`]);
                    }}
                    to='/luge/ranking'
                    rel="noopener noreferrer"
                    target='_blank'>全部<ArrowRightOutlined /></Link>
                </span>
                <span className='game_desc'>{rankData.matchName}</span>
            </div>
            <ul className='games-list'>
                {
                    rankData.top && rankData.top.map(
                        (item, index) => (
                            <li key={index}>
                                <img src={imgs[index]} alt='' />
                                <div className='games_content'>
                                    <span className='ellipsis'>{item.teamName}</span>
                                    {/* <span className={
                                        item.status === '进行中' ?
                                        'status_going' : 'status_pedding'
                                    }>{item.status}</span> */}
                                </div>
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    );
});
const signsCls = { HOT: 'hot_cls', NEW: 'new_cls' };
const PlatformCard = memo(props => {
    let { announcements } = props;
    return (
        <div className='platform'>
            <div className='platform-title'>
                <span className='platform-title-top'><strong className='platform-title-name'>平台公告</strong>
                    <a
                        onClick={() => {
                            window._hmt.push(['_trackEvent', '首页-平台公告', `点击全部`]);
                        }}
                        href='https://aistudio.baidu.com/paddle/forum/topic/list?boardId=235'
                        rel="noopener noreferrer"
                        target='_blank'>全部<ArrowRightOutlined /></a></span>
            </div>
            <ul className='platform-lists'>
                {
                    announcements.map(item => (
                        <li key={item.desc}>
                            <a
                                onClick={() => {
                                    window._hmt.push(['_trackEvent', '首页-排行榜', `点击单条公告${item.desc}`]);
                                }}
                                href={item.url}
                                rel="noopener noreferrer"
                                target='_blank'
                                className={item.type === 'Hot' ? 'hot_cls' : ''}
                            >
                                <span className='icon'>{item.type}</span>
                                {item.desc}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
});

const GameMess = memo(() => {
    const [gameData, setGameData] = useState([]);
    useMemo(async () => {
        const res = await getGameList({});
        if (res.data) {
            setGameData(res.data.list);
        }
    }, []);
    return (
        <div className='platform'>
            <div className='platform-title'>
                <span className='platform-title-top'><strong className='platform-title-name platform-title-name-other'>比赛信息</strong>
                    <Link
                        onClick={() => {
                            window._hmt.push(['_trackEvent', '首页-比赛信息', `点击全部`]);
                        }}
                        to='/luge/game'
                        rel="noopener noreferrer"
                        target='_blank'>全部<ArrowRightOutlined /></Link></span>
                <span className='game_desc'>多种比赛，快来参与吧</span>
            </div>
            <ul className='games-list games_data_list'>
                {
                    gameData.map((item, index) => (
                        index < 3 &&
                        <li key={index}>
                            <a
                                onClick={() => {
                                    window._hmt.push(['_trackEvent', '首页-排行榜', `点击单条比赛${item.name}`]);
                                }}
                                href={item.url}
                                rel="noopener noreferrer"
                                target='_blank' className='game_li_link'>
                                <div className='game_img'>
                                    <img src={item.logo} alt='' />
                                </div>
                                <div className='games_content game_data_content'>
                                    <span className='data_ellipsis'>{item.name}</span>
                                    {
                                        new Date().getTime() < item.beginTime * 1000 &&
                                        <span className='status_icon status_pedding'>待开始：{formatDate(item.beginTime * 1000)}</span>
                                    }
                                    {
                                        (new Date().getTime() > item.beginTime * 1000 && new Date().getTime() < item.endTime * 1000) &&
                                        <span className='status_icon status_going'>进行中</span>
                                    }
                                    {
                                        new Date().getTime() > item.endTime * 1000 &&
                                        <span className='status_icon status_pedding'>已结束：{formatDate(item.beginTime * 1000)}</span>
                                    }
                                </div>
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
});

const HotMatch = memo((props) => {
    const { hotMatch } = props;
    return (
        <div className='platform'>
            <div className='platform-title'>
                <span className='platform-title-top'>
                    <strong className='platform-title-name'>热门比赛</strong>
                </span>
            </div>
            <div className='hot_match'>
                <a href={hotMatch.pageUrl} target="_blank">
                    <img src={hotMatch.imgUrl} alt="" />
                </a>
            </div>
        </div>
    )
});

const DataEnter = memo(({ hotMatch }) => {
    return (
        <div className='data_enter'>
            <Link to='/luge/join' onClick={() => {
                window._hmt.push(['_trackEvent', '首页-数据集征集', '数据集征集']);
            }}>
                <img src={hotMatch?.enterImgUrl} alt="" />
            </Link>
        </div>
    )
});

const OtherMess = props => {
    const { taskType } = props;
    const { announcements, gamesMessNormal, hotMatch } = useSelector(
        item => item.dataList,
        shallowEqual
    );
    return (
        <div className='othersMess_total'>
            <div className='othersMess' style={{ height: taskType.current.taskId ? '640px' : '830px' }}>
                {taskType.current.taskId && <TaskDesc taskType={taskType} key={Math.random()} />}
                {taskType.current.taskId &&
                    <GamesCard
                        gamesMessNormal={gamesMessNormal}
                        key={taskType.current.taskId}
                        taskType={taskType} />}
                {announcements && <PlatformCard announcements={announcements} />}
                {hotMatch && !taskType.current.taskId && <HotMatch hotMatch={hotMatch} />}
                {!taskType.current.taskId && <GameMess />}
            </div>
            <DataEnter hotMatch={hotMatch} />
        </div>
    );
};

export default memo(OtherMess);
