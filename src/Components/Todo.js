import React, {useState} from 'react';
import './Todo.css';

const initialValue = {
    items: '',
}


const Todo = () => {
    const [todo, setTodo] = useState(initialValue)
    const [tableData, setTableData] = useState([])
    const [toggleSubmit,setToggleSubmit]=useState(false)
    const [editIndex,setEditIndex]=useState()
    const changeHandle = (e) => {
        const {name, value} = e.target;
        setTodo({...todo, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTableData([...tableData, {...todo}]);
        setTodo({
            items: "",
        })
    }

    const deleteTableRows=(index)=>{
        tableData.splice(index,1)
        setTableData([...tableData])
    }

    const EditTableRows=(index)=>{
        setTodo(tableData[index])
         setToggleSubmit(true);
         setEditIndex(index);
    }
    const handlUpdate=()=>{
        setToggleSubmit(false);
        tableData.splice(editIndex,1,todo);
        setTableData([...tableData])
        setTodo(initialValue);
    }

    return (
        <div>
            <h1 className="todo_heading">TodoList</h1>
            <div className="container">
                <form className="NewTodoForm">
                    <input placeholder="New Todo" type="text" value={todo.items} name="items" onChange={changeHandle}/>
                    { !toggleSubmit?<button type="button" onClick={handleSubmit}>Add Todo</button>:<button type="button" onClick={handlUpdate}>Save</button>}
                </form>

                <table className="table">
                    <thead style={{color:"deeppink"}}>
                    <tr>
                        <th>Sr.No</th>
                        <th>Items</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableData.map((data,index) => {
                        return (
                            <tr>
                                <td>{index}</td>
                                <td>{data.items}</td>
                                <td><button className="btn btn-primary mx-2" onClick={()=>EditTableRows(index)}>Edit</button>
                                    <button className="btn btn-danger" onClick={()=>deleteTableRows(index)}>Delete</button></td>
                            </tr>
                        )})
                    }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Todo;