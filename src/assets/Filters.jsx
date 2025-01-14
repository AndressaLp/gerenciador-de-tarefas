import Filtro from "../components/Filtro";

function Filters({ onFiltrar }){
    return(
        <div>
            <div className="flex flex-wrap gap-3 p-5 justify-center">
                <Filtro filtro="Todas" onFiltrar={onFiltrar}/>
                <Filtro filtro="Pendente" onFiltrar={onFiltrar}/>
                <Filtro filtro="Completa" onFiltrar={onFiltrar}/>
                <Filtro filtro="Vencida" onFiltrar={onFiltrar}/>
            </div>
        </div>
    )
}

export default Filters;