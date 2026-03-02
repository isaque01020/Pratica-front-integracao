import "./style.css";
import { useState, useEffect } from "react";
import OlhoFechado from "./assets/OlhoFechado.png";
import OlhoAberto from "./assets/OlhoAberto.png";
import { cadastrarUser } from "../../services/cadastrar";
import { useNavigate } from "react-router-dom";

function Cadastrar() {
    const navigate = useNavigate();

    useEffect(() => {
        const auth = sessionStorage.getItem("auth");

        if (auth === "true") {
            navigate("/logado");
        }
    }, [navigate]);

    const [exibeSenha, setExibeSenha] = useState(true);
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [cpf, setCpf] = useState("");
    const [phoneInput, setPhoneInput] = useState("");

    function formataPhone(valor) {
        if(valor.length === 2) {
            let valorFormatado = "(" + valor;
            setPhoneInput(valorFormatado);
        }else if(valor.length === 4) {
            let valorFormatado =  phoneInput + ")" + valor.split('')[valor.length-1];
            setPhoneInput(valorFormatado);
        }else if(valor.length === 9) {
            let valorFormatado = valor + "-";
            setPhoneInput(valorFormatado);
        } else{
            setPhoneInput(valor);
        }
    }



    async function criaUser(e) {
        e.preventDefault();
        const resultado = await cadastrarUser(nome, email, senha, tel, cpf)

        if(resultado.cadastrado){
            navigate("/");
            alert(resultado.message);
            alert("Use sua senha e email para se logar.")
        } else{
            alert(resultado.message);
        }
    }

    
    return(
        <div className="ContainerCadastro">
            <h1 className="TituloPage">Cadastro</h1>

            <form className="FormsCadastro" onSubmit={criaUser}>
                <label className="TextoForms">Nome</label>
                <input 
                    className="FormsEntrada"
                    type="text" 
                    placeholder="Nome"
                    required="required" 
                    onChange={(e) => {setNome(e.target.value)}}
                />

                <label className="TextoForms">E-mail</label>
                <input 
                    className="FormsEntrada"
                    type="email" 
                    placeholder="example@e.com"
                    required="required"
                    onChange={(e) => {setEmail(e.target.value)}}
                />

                <label className="TextoForms">Senha</label>
                <div className="EntradaSenha">
                    <input 
                        className="FormsEntrada"
                        type={exibeSenha ? "password" : "text"}
                        placeholder="Senha"
                        required="required" 
                        id="Senha"
                        onChange={(e) => {setSenha(e.target.value)}}
                    />
                    <div className="OlhoBotao" onClick={() => setExibeSenha(!exibeSenha)}>
                        <img 
                            src={exibeSenha ? OlhoAberto : OlhoFechado} 
                            alt="Símbolo olho" 
                            className="OlhoImagem"/>
                    </div>
                </div>
                <ul className="SenhaReq">
                    <li>Minímo 8 caracteres</li>
                    <li>Um caractere especial</li>
                    <li>Um digíto númerico</li>
                    <li>Um caractere maiúsculo</li>
                </ul>

                <label className="TextoForms">Telefone</label>
                <input 
                    
                    className="FormsEntrada"
                    type="text" 
                    id="phone" 
                    name="phone" 
                    placeholder="(99)9999-9999" 
                    // pattern="(([0-9]{2}))([9]{1})?([0-9]{4})([0-9]{4})"
                    title="Número de telefone precisa ser no formato (99) 9999-9999" 
                    required="required" 
                    value={phoneInput}
                    onChange={(e) => {
                        formataPhone(e.target.value)
                        setTel(e.target.value)
                    }}
                />
                
                <label className="TextoForms">CPF</label>
                <input 
                    className="FormsEntrada"
                    type="string" 
                    placeholder="xxx.xxx.xxx-xx"
                    required="required"
                    onChange={(e) => {setCpf(e.target.value)}}
                />

                <button 
                    className="FormsEnviar"
                    type="submit">
                Enviar</button>
            </form>
        </div>
    )
}

export default Cadastrar;
