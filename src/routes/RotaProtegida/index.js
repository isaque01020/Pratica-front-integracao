import { Navigate } from "react-router-dom";

function RotaProtegida({children}) {
    const acesso = sessionStorage.getItem("auth");
    if(!acesso) {
        return <Navigate to="/"/>
    }

    return children;
}

export default RotaProtegida;
