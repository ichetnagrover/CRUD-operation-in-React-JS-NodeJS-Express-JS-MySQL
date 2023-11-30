import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./About.css";
import { toast } from "react-toastify";
import axios from "axios";


const About = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, [])

    const deleteContact =(id)=>{
        if(window.confirm("Are you share you want to delete")
        )
        {
            axios.delete(`http://localhost:5000/delete/${id}`);
            toast.success("Contact deleted");
            setTimeout(()=>loadData(),500);
        }
    };
    return (
        <div style={{ marginTop: "150px" }}>
        <Link to="/addContact">
        <button className='btn btn-contact'>Add Contact</button>
        </Link>
        
            <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign:"center"}}>No.</th>
                    <th style={{textAlign:"center"}}>Name</th>
                    <th style={{textAlign:"center"}}>Email</th>
                    <th style={{textAlign:"center"}}>Contact</th>
                    <th style={{textAlign:"center"}}>Action</th>
                </tr>
            </thead>
             <tbody>
                {data.map((item, index)=>{
                    return (
                        <tr key={item.id}>
                        <th scope="row">{index+1}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.contact}</td>
                        <td>
                            <Link to={`/update/${item.id}`}>
                                <button className='btn btn-edit'>Edit</button>
                            </Link>
                            <button className='btn btn-delete' 
                            onClick={()=>deleteContact(item.id)}>
                            Delete
                            </button>

                            <Link to={`/view/${item.id}`}>
                                <button className='btn btn-view'>View</button>
                            </Link>
                
                        </td>
                        </tr>
                    )
                })}
             </tbody>
            </table>

        </div>

    )
}

export default About;