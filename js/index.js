const form = document.querySelector('#github-form')
form.addEventListener('submit', searchUsers)

const userContainer = document.querySelector('#github-container')
const userList = document.querySelector('#user-list')
const reposList = document.querySelector('#repos-list')

function searchUsers(e) {
    e.preventDefault();
    const searchValue = e.target.search.value
    fetch(`https://api.github.com/search/users?q=${searchValue}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(resp =>  resp.json())
    .then(users => users.items.forEach(obj => {
        //console.log(obj)
        const li = document.createElement('li')
        const p = document.createElement('p')
        p.innerText = `${obj.login}`
        const img = document.createElement('img')
        img.src = `${obj.avatar_url}`
        img.width = "50"
        img.height = "50"
        li.append(p, img)
        userList.append(li)
        //console.log(img)
        img.addEventListener('click', e => {
            //console.log(`https://api.github.com/users/${e.target.previousSibling.innerText}/repos`)
            fetch (`https://api.github.com/users/${e.target.previousSibling.innerText}/repos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
            
        )
        .then(resp => resp.json())
        .then(repo => repo.forEach(obj => {
            console.log(obj)
            const li = document.createElement('li')
            const p = document.createElement('p')
            const a = document.createElement('a')
            a.href = `${obj.url}`
            //a.href=`www.github.com/${obj.full_name}`
            a.innerText=`${obj.name}`
            p.append(a)
            li.append(p)
            reposList.append(li)


        }))


        })}))
    
}