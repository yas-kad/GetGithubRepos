

let getReposInput = document.querySelector(".get-repos");
let getBtn = document.getElementById("get-repos-btn");
let showData = document.querySelector(".show-data");

getBtn.onclick = function (){
    getRepos();
}

function getRepos() {
    console.log("hello from getRepos function");
    getDataFromAPI(getReposInput.value);
}



function getDataFromAPI(user) {
    if (user == "")
    {
        showData.innerHTML = `<span style="color: red;">write a github username</span>`;
    }
    else
    {
       // let api_url = `https://api.github.com/users/${user}/repos`;
        let data = fetch(`https://api.github.com/users/${user}/repos`);
        data
        .then(res => res.json())
            .then(dt => {
                if (dt.length == 0)
                {
                    showData.innerHTML = `<span style="color: red;">no repo or username incorrect!!</span>`;
                }
                else
                {
                    showData.innerHTML = '';
                    dt.forEach(repo => {
                        console.log(repo.name);
                        let repoDiv = document.createElement("div");
                        let repoUrl = document.createElement('a');
                        let repoName = document.createTextNode(repo.name);
                        repoUrl.appendChild(repoName);
                        repoUrl.href = `https://github.com/${user}/${repo.name}`;
                        repoDiv.appendChild(repoUrl);
                        showData.appendChild(repoDiv);
                    })
                }
        })
        .catch(e => {
            console.log(e);
            showData.innerHTML = `<span style="color: red;">no repo or username incorrect!!</span>`;
        });
    }
}
