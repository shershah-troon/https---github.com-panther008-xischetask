import './App.css';
import { Formik } from 'formik';
import taskService from './Services/task.service';
function App() {
  const [taskData,setTaskData]=useState();
  const DeleteTaskHandler=async(Id)=>{
    taskService.deleteTask(Id).then((resp)=>{
        console.log(resp);
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
    <div className="App">
     <Formik
       initialValues={{ title: '', taskDetails: '' }}
       validate={values => {
         const errors = {};
         if (!values.title) {
           errors.title = 'Required';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
       taskService.addTask(values).then((reslt)=>{
          if(reslt?.payload?.length > 0){ 
           setTaskData(reslt?.payload?.data); 
            }
       }).catch((error)=>{
        console.log(error)
       })
      
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
       }) => (
         <form onSubmit={handleSubmit}>
          <div>
          <label htmlFor='title'> Title</label>
           <input
             type="text"
             name="title"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.title}
           />
          <p>{errors.title && touched.title && errors.title}
          </p> 
          </div>
          <div>
           <label htmlFor='taskDetails'> Details</label>
           <input
             type="text"
             name="taskDetails"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.taskDetails}
           />
           </div>
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </form>
       )}
     </Formik>
     {taskData?.map((data,index)=>{
      const {title,taskDetails,Id}=data;
      return (
        <>
      <p>{title}</p>
      <p>{taskDetails}</p>
      <p><button type="button" onClick={()=>{DeleteTaskHandler(Id)}}> Delete</button></p>
        </>
      )
     })}
   </div>
  );
}

export default App;
