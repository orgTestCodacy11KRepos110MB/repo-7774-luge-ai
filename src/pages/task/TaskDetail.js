import React, { memo, useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import './index.less';
import CardList from '../../components/common/CardList';
import { actions } from '../../store/actions';
import { parseUrl } from '../../utils';

const TaskTitleArea = props => {
    const { params, taskTypes } = props;
    const taskTypesItem = taskTypes.find(
        item => +item.taskId === +params.taskId
    );
    return (
        <div className='task_title_top'>
            <strong className='task_detail_title'>{taskTypesItem && taskTypesItem.name}</strong>
            <span className='task_detail_desc'>
                {taskTypesItem && taskTypesItem.description}
            </span>
        </div>
    );
};

const PageFooter = props => {
    const { taskTypes, params } = props;
    const [prev, setPrev] = useState(-1);
    const [next, setNext] = useState(1);
    useMemo(() => {
        const dealPage = () => {
            const currentIndex = taskTypes.findIndex(
                item => item.taskId === params.taskId
            );
            setNext(currentIndex + 1);
            setPrev(currentIndex - 1);
        };
        dealPage();
    }, [params.taskId, taskTypes]);
    return (
        <div className='task_pages'>
            {taskTypes[prev] && (
                <Link
                    className='task_page_item task_left'
                    onClick={() => {
                        window._hmt.push(['_trackEvent', '任务详情', `上一个任务:${taskTypes[prev].name}`]);
                    }}
                    to={`/luge/task/taskDetail?taskId=${taskTypes[prev].taskId}`}
                >
                    <i></i>
                    {taskTypes[prev].name}
                </Link>
            )}
            {taskTypes[next] && (
                <Link
                    className='task_page_item icon_right'
                    onClick={() => {
                        window._hmt.push(['_trackEvent', '任务详情', `下一个任务:${taskTypes[next].name}`]);
                    }}
                    to={`/luge/task/taskDetail?taskId=${taskTypes[next].taskId}`}
                >
                    {taskTypes[next].name}
                    <i></i>
                </Link>
            )}
        </div>
    );
};
const TaskDetail = () => {
    const dispatch = useDispatch();
    const params = parseUrl(window.location.hash);
    useMemo(() => {
        dispatch(
            actions.getDataList({
                taskId: params.taskId
            })
        );
    }, [dispatch, params.taskId]);
    useEffect(() => {
        window._hmt.push(['_trackEvent', '千言', '任务-详情']);
        document.documentElement.scrollTop = 0;
    }, [params.taskId]);
    const cardsList = useSelector(
        item => item.dataList.cardsList,
        shallowEqual
    );
    const taskTypes = JSON.parse(localStorage.getItem('TaskType'));
    return (
        <>
            <div className='taskDetailCardContainer' key={window.location.hash}>
                <div className='task_detail_container'>
                    <TaskTitleArea {...{ params, taskTypes }} />
                    <CardList {...{ cardsList }} />
                    <PageFooter {...{ taskTypes, params }} />
                </div>
            </div>
        </>
    );
};

export default memo(TaskDetail);
