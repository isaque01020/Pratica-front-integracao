import axios from "axios";

const apiCadastrar = axios.create({baseURL: "http://localhost:4000"});

async function cadastrarUser(nome, email, senha, tel, cpf) {
    try{
        const userCriar = {
            nome: nome,
            email: email,
            senha: senha,
            telefone: tel,
            cpf: cpf
        }
        const response = await apiCadastrar.post("/conta/cadastrar", userCriar)

        return response.data;

    } catch(erro){
        return erro.response.data;
    }
}

export{
    cadastrarUser
};
