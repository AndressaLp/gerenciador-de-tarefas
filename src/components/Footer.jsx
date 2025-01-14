function Footer(){
    return (
        <div>
            <footer className="bg-cyan-600 text-center text-cyan-50 text-sm lg:text-base py-1 mt-10">
                <p>&copy; Gerenciador de Tarefas - {new Date().getFullYear()}</p>
            </footer>
        </div>
    )
}

export default Footer;