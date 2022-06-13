import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import React ,{useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const baseUrl = "http://localhost:3000";

export default function EditComponent(){

    const [dataFilme, setdataFilme] = useState("");
    const [campId, setcampId] = useState("");
    const [campDescricao, setcampDescricao] = useState("");
    const [campTitulo, setcampTitulo] = useState("");
    const [campFoto, setcampFoto] = useState("");
    const [stringGenero, setstringGenero] = useState("");
    const [selectGenero, setselectGenero] = useState("");

    const {filmId} = useParams();

    useEffect(() => {
        const url = baseUrl+"/film/get/" + filmId;
        axios.get(url)
            .then(res=>{
                if (res.data.success) {
                    const data = res.data.data[0];
                    setdataFilme(data);
                    setcampId(data.id);
                    setcampDescricao(data.descricao);
                    setcampTitulo(data.titulo);
                    setcampFoto(data.foto);
                    setstringGenero(data.genero.descricao);
                    setselectGenero(data.generoId);
                    console.log(JSON.stringify(data.genero.descricao))
                    }
                else {
                    alert("Error web service")
                }
            })
            .catch(error=>{
                alert("Error server: "+error)
            })
        }, []);
        function sendUpdate(){
            // url de backend
            const url = baseUrl+"/film/update/"+filmId
            const datapost = {
                id : campId,
                descricao : campDescricao,
                titulo : campTitulo,
                foto : campFoto,
                genero : selectGenero
            }
            axios.post(url,datapost)
            .then(response=>{
                if (response.data.success===true) {
                    alert(response.data.message)
                }
                else {
                    alert("Error")
                }
                }).catch(error=>{
                    alert("Error 34 "+error)
                })
            }

    return (
        <div>
            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Id </label>
                <input type="number" className="form-control"
                placeholder="1..." 
                value={campId} onChange={(value)=>
                setcampId(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputDescricao4">Descricao</label>
                <input type="text" className="form-control"
                placeholder="A filme é..." 
                value={campDescricao} onChange={(value)=>
                setcampDescricao(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputTitulo4">Titulo</label>
                <input type="text" className="form-control"
                placeholder="Titulo..." 
                value={campTitulo} onChange={(value)=>
                setcampTitulo(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputTitulo4">Foto (url)</label>
                <input type="text" className="form-control"
                placeholder="http://..." 
                value={campFoto} onChange={(value)=>
                setcampFoto(value.target.value)}/>
                </div>
            </div> 
            <div className="form-row">
                <div className="form-group col-md-6">
                <label htmlFor="inputState">Genero</label>
                <select id="inputState" className="form-control"
                onChange={(value)=> setstringGenero(value.target.value)}>
                <option value={selectGenero}>{stringGenero}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3
                </option>
                </select>
                </div>
            </div>
            <button type="submit" className="btn btnprimary" onClick={()=>sendUpdate()}>Update</button>
        </div>
    );
    
}
