import { Navigate } from "react-router-dom";

function RotaProtegida({children}) {
    const acesso = sessionStorage.getItem("auth");
    console.log(acesso)
    if(!acesso) {
        return <Navigate to="/"/>
    }

    return children;
}

export default RotaProtegida;
