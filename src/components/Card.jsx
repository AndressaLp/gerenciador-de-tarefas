function Card({ id, nome, descricao, status, data, onExcluir, onCompletar }){
    const hoje = new Date().toISOString().split("T")[0];
    const vencida = data < hoje && status !== "Completa";
    return (
        <div>
            <div className={`bg-gray-300 ${vencida ? "bg-red-200 && border-red-200" : ""} ${status === "Completa" ? "border-green-500" : "border-gray-300"} border-2 w-60 h-52 lg:h-60 gap-3 rounded-2xl p-4 flex flex-col shadow-md hover:shadow-black z-0 text-xs lg:text-sm`}>
                <h3 className="text-sm lg:text-base capitalize font-bold text-wrap text-center">{nome}</h3>
                <p className="text-center my-auto">{descricao}</p>
                <div className="flex flex-wrap justify-around mb-0 mt-auto">
                    <p>Vencimento:</p>
                    <p>{new Date(data).toLocaleDateString('pt-BR', {timeZone:'UTC'})}</p>
                </div>
                <div className="flex flex-wrap justify-around">
                    <button onClick={() => onExcluir(id)} className="text-red-500 text-sm lg:text-base font-semibold hover:text-red-700">Excluir</button>
                    <button onClick={() => onCompletar(id)} className={`text-sm lg:text-base font-semibold ${status === "Completa" ? "text-green-500 hover:text-green-700" : "text-blue-500 hover:text-blue-700"}`}>
                    {status === "Completa" ? "Desmarcar" : "Completar"}
                </button>
                </div>
            </div>
        </div>
    )
}

export default Card;