// class que vai conter a logica dos dados
//como os dados serão estruturados
export class Favorites{
    constructor (root) {
        this.root = document.querySelector(root);
        this.load()
    }

    load(){ //vai ser carregado
        this.entries = [
            {
            login : 'JuliaGCB',
            name: " Julia Campos",
            public_repos: '76',
            followers: '20'
           },
           {
            login : 'diego3g',
            name: "  Diego Fernandez",
            public_repos: '76',
            followers: '20'
           }
        ]

    }

    delete(user) { //vai filtrar o arry se não for verdadeiro ele vai apagar
        const filteredEntries = this.entries
          .filter(entry => entry.login  !== user.login) //se o entry não for igual o user.login vai ser apagaro

        console.log(filteredEntries)
    }
}
//classe que vai criar a visualização e eventos do HTMl
export class FavoritesView extends Favorites{
    constructor(root) {
        super(root);

        this.tbody = this.root.querySelector(' table tbody');

        
        this.update()
    }

    update(){ //fazer aparecer o html
        this.removeAllTr()

        this.entries.forEach(user =>{ //para cada usuario
            const row  = this.createRow();


            row.querySelector('.user img').src = `https://github.com/${user.login}.png`;
            //vai mostrar a foto do usuario
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
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