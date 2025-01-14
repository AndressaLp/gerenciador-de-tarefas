function Filtro({ filtro, onFiltrar }){
    return (
        <div>
            <button className="bg-gray-400 hover:bg-gray-500 rounded-2xl py-1 px-3 cursor-pointer text-base lg:text-lg" onClick={() => onFiltrar(filtro)}>{filtro}</button>
        </div>
    )
}

export default Filtro;