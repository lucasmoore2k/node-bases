
function fecthJson(url){
    return fetch(url).then((r1) => {
        return r1.json();
    });
}

async function sol3(){
    let produtos = await fecthJson("http://localhost:3000/produtos");
    let categorias = await fecthJson("http://localhost:3000/categorias");
    console.log(produtos)
    let tables = renderTable(produtos,categorias);
    document.getElementById("app").innerHTML = tables
}

async function sol4(){
    let produtos = fecthJson("http://localhost:3000/produtos");
    let categorias = fecthJson("http://localhost:3000/categorias");
    let [prods,cats] = await Promise.all([produtos,categorias])
    let tables = renderTable(prods,cats);
    document.getElementById("app").innerHTML = tables
}

sol4();
function renderTable(prods,cats){
    let rows = prods.map((prod)=>{
        let category = cats.find((cat)=> cat.id == prod.categoria_id);
        return `<tr><td>${prod.id}</td><td>${prod.nome}</td><td>${category.nome}</td></tr>`
    })
    return `<table>${rows.join("")}</table>`
}

async function teste(){
    return 'teste'
}

//Async sempre chama uma promise