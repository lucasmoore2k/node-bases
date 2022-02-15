
function fecthJson(url){
    return fetch(url).then((r1) => {
        return r1.json();
    });
}

function sol3(){
    let produtos = fecthJson("http://localhost:3000/produtos");
    let categorias = fecthJson("http://localhost:3000/categorias");
    Promise.all([produtos,categorias]).then(([prods,cats])=> {
        let tables = renderTable(prods,cats);
        document.getElementById("app").innerHTML = tables
    })
}

sol3();
function renderTable(prods,cats){
    let rows = prods.map((prod)=>{
        let category = cats.find((cat)=> cat.id == prod.categoria_id);
        return `<tr><td>${prod.id}</td><td>${prod.nome}</td><td>${category.nome}</td></tr>`
    })
    return `<table>${rows.join("")}</table>`
}