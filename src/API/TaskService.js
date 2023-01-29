import axios from "axios";

export default class TaskService {
    static async getAll(){
        const response = await axios.get('https://vik-bb.ru/api/tasks')
        return response.data.data;
    }

    static async create(data){
        const response = await axios.post('https://vik-bb.ru/api/tasks', {
            title: data.title,
            status: data.status,
            body: data.body,
            date: data.date,
        })
        return response.data.data;
    }

    static async update(taskId, newBody, newStatus){
        const response = await axios.put('https://vik-bb.ru/api/tasks/'+taskId, {
            status: newStatus,
            body: newBody
        })
        return response.data.data;
    }

    static async delete(taskId){
        const response = await axios.delete('https://vik-bb.ru/api/tasks/'+taskId)
        return response.data.data;
    }
}