import { useState } from "react";

function Modal({ tipo, tarefaData, onClose, onConfirm, onDel, handleAddTask }){
    const [tarefa, setTarefa] = useState(tarefaData || {});

    const submit = (e) => {
        e.preventDefault();
        const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        if (tipo === "adicionar") {
            const novaTarefa = { ...tarefa, id: Date.now(), status: "Pendente" };
            tarefas.push(novaTarefa);
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
            handleAddTask(novaTarefa); // Atualiza o estado no componente pai
          }
          console.log(tarefas);
          onClose();
      };

    function handleChange(e){
        setTarefa({ ...tarefa, [e.target.name]: e.target.value });
    }   
    
    return (
        <div>
            <div className="fixed z-10 bg-gray-900/50  w-screen h-screen top-0 left-0 flex justify-center items-center">
                <div className="bg-gray-300 rounded-xl w-64 lg:w-72 h-auto p-3 flex flex-col">
                    <button onClick={onClose} className="hover:bg-gray-400 w-8 h-8 mr-0 ml-auto rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#0891b2" d="m12 12.708l-5.246 5.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354L11.292 12L6.046 6.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 11.292l5.246-5.246q.14-.14.345-.15q.203-.01.363.15t.16.354t-.16.354L12.708 12l5.246 5.246q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16z"/></svg></button>
                    {tipo === "adicionar" && (
                        <div id="novaTarefa">
                            <form  className="flex flex-col gap-1" onSubmit={submit}>
                                <label className="text-sm lg:text-base font-bold" htmlFor="nome">Nome da tarefa:</label>
                                <input onChange={handleChange} value={tarefa.nome} className="rounded-lg px-2 outline-none" type="text" name="nome" id="nome" minLength={5} maxLength={30} required/>
                                <label className="text-sm lg:text-base font-bold" htmlFor="descricao">Descrição:</label>
                                <textarea onChange={handleChange} value={tarefa.descricao} className="rounded-lg px-1 resize-none outline-none" name="descricao" id="descricao" rows={5} maxLength={100} minLength={15} required></textarea>
                                <label className="text-sm lg:text-base font-bold" htmlFor="data">Data final:</label>
                                <input onChange={handleChange} value={tarefa.data} max={"2026-12-31"} className="rounded-lg px-2 outline-none cursor-text" type="date" name="data" id="data" required/>
                                <input className="bg-cyan-600 hover:bg-cyan-700 text-cyan-50 rounded-lg px-2 py-1 mt-3" type="submit" value="Criar"/>
                            </form>
                        </div>
                    )}
                    {tipo === "deletar" && (
                        <div id="delTarefa">
                            <h2 className="text-center my-5 text-lg lg:text-xl font-bold">Tem certeza que deseja excluir esta tarefa?</h2>
                            <div className="flex justify-around">
                                <button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-cyan-50 rounded-lg px-2 py-1 mt-3 text-base lg:text-lg">Não</button>
                                <button onClick={onConfirm} className="bg-cyan-600 hover:bg-cyan-700 text-cyan-50 rounded-lg px-2 py-1 mt-3 text-base lg:text-lg">Sim</button>
                            </div>
                        </div>
                    )}
                    {tipo === "deletarTudo" && (
                        <div id="delTarefas">
                            <h2 className="text-center my-5 text-lg lg:text-xl font-bold">Tem certeza que deseja excluir todas as tarefas?</h2>
                            <div className="flex justify-around">
                                <button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-cyan-50 rounded-lg px-2 py-1 mt-3 text-base lg:text-lg">Não</button>
                                <button onClick={onDel} className="bg-cyan-600 hover:bg-cyan-700 text-cyan-50 rounded-lg px-2 py-1 mt-3 text-base lg:text-lg">Sim</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Modal;