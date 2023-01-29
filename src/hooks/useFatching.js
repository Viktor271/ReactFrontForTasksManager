import {useState} from "react";

export const useFatching = (callback) => {
    const [isLoading, setIsTasksLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetching = async ()=> {
        try{
            setIsTasksLoading(true)
            await callback()
        }catch (e){
            setError(e.message)
        }finally {
            setIsTasksLoading(false)
        }
    }
    return [fetching, isLoading, error];
}