import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import {Link} from "react-router-dom";

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default function ListComponent(){
    
    const [dataFilme, setdataFilme] = useState([]);

    useEffect(() =>{
        loadFilme();
    },[]);

    function loadFilme(){
        const url = "http://localhost:3000/film/list";
        axios.get(url)
            .then(res => {
                if(res.data.success){
                    const data = res.data.data;
                    setdataFilme(data);
                }else{
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }

    function OnDelete(id){
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                SendDelete(id)
            } else if (result.dismiss ===
                Swal.DismissReason.cancel) {
                    Swal.fire(
                        'Cancelled',
                        'Your imaginary file is safe :)',
                        'error'
                        )
                }
            })
    }
    
    function SendDelete(filmId)
    {
    // url do backend
    const baseUrl = "http://localhost:3000/film/delete"
    // network
    axios.post(baseUrl,{
        id: filmId
    })
        .then(response =>{
            if (response.data.success) {
                Swal.fire(
                'Deleted!',
                'Your film has been deleted.',
                'success'
                )
                loadFilme()
            }
        })
        .catch ( error => {
            alert("Error 325 ")
        })
    }

    return (
    
        <table class="table table-hover table-striped">
            <thead class="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Descricao</th>
                <th scope="col">Titulo</th>
                <th scope="col">Foto</th>
                <th scope="col">Genero</th>
                <th colspan="2">Action</th>
                </tr>
            </thead>
            <tbody>
                <LoadFillData/>
            </tbody>
        </table>
    );


function LoadFillData(){
    return dataFilme.map((data, index)=>{
        return(
        <tr key={index}>
            <th>{data.id}</th>
            <td>{data.descricao}</td>
            <td>{data.titulo}</td>
            <td><img src={data.foto} alt=""></img></td>
            <td>{data.genero.descricao}</td>
            <td>
            <Link className="btn btn-outline-info "
            to={"/edit/"+ data.id} >Edit</Link>
            </td>
            <td>
            <button className="btn btn-outline-danger" onClick={()=>OnDelete(data.id)}>
            Delete </button>
            </td>
        </tr>
        )
        });
    }
         
}

