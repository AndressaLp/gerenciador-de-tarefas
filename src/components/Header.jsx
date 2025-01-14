import { useState } from "react";

function Header({ onBuscaChange }){
    const [inputBusca, setInputBusca] = useState("");
    const handleBuscaChange = (e) => {
        setInputBusca(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        onBuscaChange(inputBusca);
    };

    return (
        <div>
            <header className="flex flex-col sm:flex-row sm:justify-around justify-center items-center gap-5 bg-cyan-600 p-3">
                <h1 className="text-gray-50 text-2xl lg:text-3xl">Gerenciador de Tarefas</h1>
                <form className="flex gap-3" onSubmit={handleSearch}>
                    <input className="rounded-xl text-sm lg:text-base px-2 outline-none" type="search" name="search" id="search" placeholder="digite o nome ou data" value={inputBusca} onChange={handleBuscaChange}/>
                    <input className="bg-cyan-900 text-cyan-50 p-1 rounded-lg cursor-pointer uppercase text-sm lg:text-base hover:bg-cyan-700" type="submit" value="Buscar"/>
                </form>
            </header>
        </div>
    )
}

export default Header;