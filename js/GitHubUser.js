export class GithubUser{
    static search(username){
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint) //retornando uma promessa
        .then(data => data.json()) //transformando em Json
        .then(({ login, name, public_repos, followers })  => ({
            login, //dados que vao seer mostrados
            name,
            public_repos,
            followers
        })) //desestruturei o then.
    }
}