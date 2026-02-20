import axios from "axios";

const loginAutenticarAPI = axios.create({ baseURL: "http://localhost:4000" });

async function autenticaUser(email, senha) {
    try{
        const dadosParaAutentica = {
            email: email,
            senha: senha
        }
        const response = await loginAutenticarAPI.post("/conta/login", dadosParaAutentica);

        return response.data;
    } catch(erro) {
        return erro.response.data;
    }
}

export{
    autenticaUser
};
