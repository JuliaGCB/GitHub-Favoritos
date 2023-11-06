import { GithubUser } from "./GitHubUser.js";
// class que vai conter a logica dos dados
//como os dados serão estruturados
export class Favorites{
    constructor (root) {
        this.root = document.querySelector(root);
        this.load()

        GithubUser.search('maykbrito').then(user => console.log(user)) // retornando os dados da promessa
    }

    load(){ //vai ser carregado
        this.entries = JSON.parse( localStorage.getItem('@github-favorites:')) || [] //Json.parce() vai transformar no verdadeiro valor '[]' transforma em []
    }

    save(){
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    } //JSON.stringify() - transforma objetos em texto

    async add(username){ // vai buscar o username no github
        try{ 
        
        const userExists = this.entries.find(entry => entry.login === username)
        console.log(userExists)

        if(userExists){
            throw new Error ("Usuário já cadastrado")

        }  

        const user = await GithubUser.search(username) //await é agurando uma promessa || Aqui ele vai aguardar essa promessa na linha dele

        if(user.login === undefined){
            throw new Error('Usuário não encontrado!')
        }

        this.entries = [user, ...this.entries]
        this.update()
        this.save()

        }catch(error){
            alert(error.message)
        }
    }

    delete(user) { //vai filtrar o arry se não verdadeiro ele vai apagar
        const filteredEntries = this.entries
          .filter(entry => entry.login  !== user.login) //se o entry não for igual o user.login vai ser apagaro

        this.entries = filteredEntries
        this.update()
        this.save()
    }
}
//classe que vai criar a visualização e eventos do HTMl
export class FavoritesView extends Favorites{
    constructor(root) {
        super(root);

        this.tbody = this.root.querySelector(' table tbody');

        
        this.update()
        this.onadd()
    }
    
    onadd(){
        const addButton = this.root.querySelector('.search button');
        addButton.onclick = () => {
            const { value } = this.root.querySelector('.search input');

            this.add(value)
        }
    }
    update(){ //fazer aparecer o html
        this.removeAllTr()

        this.entries.forEach(user =>{ //para cada usuario
            const row  = this.createRow();


            row.querySelector('.user img').src = `https://github.com/${user.login}.png`;
            //vai mostrar a foto do usuario
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
             row.querySelector('.user a').href = `https://github.com/${user.login}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers

            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('Tem certeza que deseja deletar essa linha?')
                if(isOk){ //deletar a linha
                    this.delete(user)
                }
                  
            }
        
            this.tbody.append(row);
        })

    }

    createRow(){
        const tr = document.createElement ('tr') //criar o elemento
        
        tr.innerHTML = ` 
        <td class="user">
            <img src="https://github.com/JuliaGCB.png" alt="Imagem de JuliaGCB">
            <a href="https://github.com/JuliaGCB" target="_blank">
                <p>Julia Gabrielle</p>
                <span>JuliaGCB</span>
            </a>
        </td>
        <td class="repositories">
            76
        </td>
        <td class="followers">
            20
        </td>
        <td>
            <button class="remove">&times;</button>
        </td>
        ` // vai ser o conteudo que vai ser gerado e mostrado

        return tr
    }

    removeAllTr(){//Remover os TR
        this.tbody.querySelectorAll('tr').forEach((tr) =>{
            tr.remove();
        })
    }
}