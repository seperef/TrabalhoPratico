import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React ,{useEffect, useState} from "react";
import axios from 'axios';

export default function EditComponent(){

    const [dataFilme, setdataFilme] = useState("");
    const [campId, setcampId] = useState("");
    const [campDescricao, setcampDescricao] = useState("");
    const [campTitulo, setcampTitulo] = useState("");
    const [campFoto, setcampFoto] = useState("");
    const [stringGenero, setstringGenero] = useState("");
    const [selectGenero, setselectGenero] = useState("");    

    return (
        <div>
            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Id </label>
                <input type="number" className="form-control"
                placeholder="1..." 
                value={campId} onChange={value => setcampId(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputDescricao4">Descricao</label>
                <input type="text" className="form-control"
                placeholder="A filme é..." 
                value={campDescricao} onChange={value => setcampDescricao(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputTitulo4">Titulo</label>
                <input type="text" className="form-control"
                placeholder="Titulo..." 
                value={campTitulo} onChange={value => setcampTitulo(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputTitulo4">Foto (url)</label>
                <input type="text" className="form-control"
                placeholder="http://..." 
                value={campFoto} onChange={value => setcampFoto(value.target.value)}/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                <label htmlFor="inputState">Genero</label>
                <select id="inputState" className="form-control"
                onChange={value=> setselectGenero(value.target.value)}>
                    <option defaultValue>Choose...</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>
                </div>
            </div>
            <button type="submit" className="btn btn-primary"
            onClick={()=>SendSave()}>Save</button>
        </div>
    );
    function SendSave(){
        if (selectGenero===0) {
            alert("Choose Role!")
        }
        else if (campDescricao==="") {
            alert("Insert the Phone!")
        }
        else if (campTitulo==="") {
            alert("Insert Titulo!")
        }
        else if (campId==="") {
            alert("Insert id!")
        }
        else if (campFoto==="") {
            alert("Insert Foto!")
        }
        else {
            const baseUrl = "http://localhost:3000/film/create"
            const datapost = {
                id : campId,
                descricao : campDescricao,
                titulo : campTitulo,
                foto : campFoto,
                generoId : selectGenero
        }
        axios.post(baseUrl,datapost)
            .then(response=>{
            if (response.data.success===true) {
                alert(response.data.message)
            }
            else {
                alert(response.data.message)
            }
            })
            .catch(error=>{
                alert("Error 34 "+error)
            })
            }
        }
}