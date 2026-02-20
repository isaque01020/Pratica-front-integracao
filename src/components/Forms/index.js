import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { autenticaUser } from "../../services/login"
import "./app.css";

function Forms() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    async function enviaFormulario(e) {
        e.preventDefault();
        const resultado = await autenticaUser(email, senha);
        console.log(resultado);

        if(resultado.auth) {
            sessionStorage.setItem("auth", "true");
            navigate("/logado");
        } else{
            alert(resultado.message);
        }

    }
    
    return(
        <div>
            <form className="Formulario" onSubmit={enviaFormulario}>
                <h2>Login</h2>
                <label className="TextoFormulario">E-mail</label>
                <input 
                    type="e-mail"
                    className="EntradaForms" 
                    placeholder="E-mail" 
                    onChange={(value) => {setEmail(value.target.value)}}
                />

                <label className="TextoFormulario">Senha</label>
                <input 
                    type="text" 
                    className="EntradaForms" 
                    placeholder="Senha"
                    onChange={(value => {setSenha(value.target.value)})}
                />
                
                <button className="BotaoForms">Enviar</button>
                <p>Não possui cadastro? <Link to="/cadastrar" >Cadastre-se aqui</Link></p>
            </form>
        </div>    
    )
}

export default Forms;
