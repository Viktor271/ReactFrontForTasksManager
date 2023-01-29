import {useMemo} from "react";

export const useSortedTasks = (tasks, sort) => {
    const sortedTasks = useMemo(()=> {
        if (sort) {
            if(sort !== 'date'){
                return [...tasks].sort((a, b) => a[sort].localeCompare(b[sort]))
            }else{
                return [...tasks].sort((a, b) => new Date(a[sort]) - new Date(b[sort]))
            }
        } else {
            return tasks;
        }
    }, [sort, tasks])

    return sortedTasks;
}

export const useTasks = (tasks, sort, filter) => {
    const sortedTasks = useSortedTasks(tasks, sort);
    const filteredSortTasks = useMemo(()=> {
        let filteredTasks = sortedTasks;
        if (filter.date) { console.log(filter.date)
            filteredTasks = filteredTasks.filter((task) => task.date <= filter.date);
        }
        if (filter.status) {
            filteredTasks = filteredTasks.filter((task) => task.status === filter.status);
        }
        return filteredTasks;
    }, [sortedTasks, filter.date, filter.status])
    return filteredSortTasks;
}