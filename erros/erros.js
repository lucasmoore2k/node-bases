
function fecthJson(url){
    //Tratar erros referentes a status
    return fetch(url).then((r1) => {
        if(r1.ok){
            return r1.json()
        }else{
            throw new Error(r1.statusText);
        }
    });
}

//Pegando erro em promises usando catch e finally
function sol3(){
    let produtos = fecthJson("http://localhost:3000/produtos");
    let categorias = fecthJson("http://localhost:3000/categorias");
    Promise.all([produtos,categorias])
    .then(([prods,cats])=> {
        let tables = renderTable(prods,cats);
        document.getElementById("app").innerHTML = tables
    }).catch(showError)
    .finally(()=>{
        console.log('carregou')
    })
}

//Pegando erros em async
async function sol4(){
    try {
        let produtos = fecthJson("http://localhost:3000/produtos");
        let categorias = fecthJson("http://localhost:3000/categorias");
        let [prods,cats] = await Promise.all([produtos,categorias])
        let tables = renderTable(prods,cats);
        document.getElementById("app").innerHTML = tables
    }catch(error){
        showError(error)
    }

}

sol3();
function renderTable(prods,cats){
    let rows = prods.map((prod)=>{
        let category = cats.find((cat)=> cat.id == prod.categoria_id);
        return `<tr><td>${prod.id}</td><td>${prod.nome}</td><td>${category.nome}</td></tr>`
    })
    return `<table>${rows.join("")}</table>`
}

function showError(error){
    document.getElementById("app").innerHTML = "Erro ao carregar dados";
    console.log(error)
}