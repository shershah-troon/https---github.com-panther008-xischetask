import axios from 'axios';
const url='http://localhost:8080/';
const addTask=(payloadData)=>{
  return axios.post(url,{payloadData}).then((response)=>{
        return response?.data;
    }).catch((error)=>{
        return error;
    })
}
const deleteTask=(taskId)=>{
    return axios.delete(url,{taskId}).then((resp)=>{
         return resp?.data;
    }).catch((error)=>{
        return error
    })
}
const taskService={
    addTask,
    deleteTask
}
export default taskService;