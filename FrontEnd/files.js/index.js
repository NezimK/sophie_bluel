async function getWorks() {
    const api= await fetch("http://localhost:5678/api/works");
    const response = await api.json()
    console.log(response);
}

getWorks();