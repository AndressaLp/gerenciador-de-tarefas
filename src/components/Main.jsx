import { useState, useEffect } from "react";
import Card from "./Card";
import Modal from "./Modal";
import Filters from "../assets/Filters";

function Main({ busca }){
    const [modalVisivel, setModalVisivel] = useState(false);
    const [tipoModal, setTipoModal] = useState("");
    const [filtros, setFiltrosVisivel] = useState(false);
    const [tarefas, setTarefas] = useState([]);
    const [tarefaAtual, setTarefaAtual] = useState(null);
    const [filtroAtivo, setFiltroAtivo] = useState("Todas");

    useEffect(() => {
        const storedTasks = localStorage.getItem('tarefas');
    if (storedTasks) {
      setTarefas(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const removerTarefa = (id) => {
    setTarefas((tarefas) => tarefas.filter((t) => t.id !== id));
    fecharModal(); 
  };

  async function removerTudo() {
    setTarefas([]);
    fecharModal();
  }

    function aplicarFiltro(tarefa) {
        const hoje = new Date().toISOString().split("T")[0];
        if (filtroAtivo === "Todas") return true;
        if (filtroAtivo === "Completa") return tarefa.status === "Completa";
        if (filtroAtivo === "Pendente") return tarefa.data > hoje && tarefa.status !== "Completa";
        if (filtroAtivo === "Vencida") return tarefa.data < hoje && tarefa.status !== "Completa";
    }    

    function completarTarefa(id) {
        setTarefas((prevTarefas) =>
            prevTarefas.map((tarefa) =>
              tarefa.id === id
                ? { ...tarefa, status: tarefa.status === "Completa" ? "Pendente" : "Completa" }
                : tarefa
            )
          );
        };

    function abrirFiltros(){
        setFiltrosVisivel(!filtros);
    }

    function modalCriar(){
        setTipoModal("adicionar");
        setModalVisivel(true);
    }
    
    function modalDeletar(id){
        setTipoModal("deletar");
        setTarefaAtual(id);
        setModalVisivel(true);
    }

    function modalDeletarTudo(){
        setTipoModal("deletarTudo");
        setModalVisivel(true);
    }
    
    function fecharModal(){
        setModalVisivel(false);
        setTarefaAtual(null);
    }

    const tarefasFiltradas = tarefas.filter(aplicarFiltro).filter((tarefa) => tarefa.nome.toLowerCase().includes(busca.toLowerCase()) || tarefa.data.includes(busca));

    return (
        <div>
            <main className="flex flex-col px-3 min-h-screen">
                <div className="flex justify-between px-5 lg:px-10 pt-4 lg:pt-8">
                    <button className="hover:bg-gray-400 rounded-lg" onClick={abrirFiltros}>
                    <svg className="w-8 lg:w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0891b2" d="M10 18v-2h4v2zm-4-5v-2h12v2zM3 8V6h18v2z"/></svg>
                    </button>
                    <div className="flex gap-8">
                        <button onClick={modalCriar} className="rounded-xl bg-cyan-600 text-cyan-50 hover:bg-cyan-800 p-2 text-base lg:text-lg">Adicionar</button>
                        <button onClick={modalDeletarTudo} className="self-center rounded-xl text-red-500 hover:text-cyan-50 hover:bg-red-700 p-2 text-base lg:text-lg">Excluir Tudo</button>
                    </div>
                </div>
                {filtros && <Filters onFiltrar={setFiltroAtivo}/>}
                {tarefas.length === 0 ? (
                    <div className="flex flex-col items-center m-auto opacity-55">
                        <img className="w-40 sm:w-44 md:w-48 lg:w-52 xl:w-56" src="../../public/notes.png" alt="bloco de notas" />
                        <p className="text-xs sm:text-sm md:text-base text-wrap w-28 sm:w-32 md:w-36 text-center uppercase">nenhuma tarefa foi criada ainda</p>
                    </div>
                ) : (
                    tarefasFiltradas.length > 0 ? (
                        <div className="flex flex-wrap gap-5 mt-8 justify-center">
                    {tarefasFiltradas.map((tarefa) => (
                            <Card key={tarefa.id} id={tarefa.id} nome={tarefa.nome} descricao={tarefa.descricao} data={tarefa.data} status={tarefa.status} onExcluir={modalDeletar} onCompletar={completarTarefa}/>
                        ))}
                        </div>
                ) : (
                        <div className="flex flex-col items-center m-auto opacity-55">
                            <img className="w-40 sm:w-44 md:w-48 lg:w-52 xl:w-56" src="../../public/notes.png" alt="bloco de notas" />
                            <p className="text-xs sm:text-sm md:text-base text-wrap w-28 sm:w-32 md:w-36 text-center uppercase">{filtroAtivo === "Completa" ? "nenhuma tarefa completa ainda" : filtroAtivo === "Vencida" ? "não há tarefa vencida" : "não há tarefa pendente"}</p>
                        </div>
                    )
                )}
                {modalVisivel && <Modal tipo={tipoModal} onClose={fecharModal} tarefa={tarefaAtual} onConfirm={() => removerTarefa(tarefaAtual)} onDel={removerTudo} handleAddTask={(novaTarefa) => setTarefas((prev) => [...prev, novaTarefa])}/>}
                
            </main>
        </div>
    )
}

export default Main;