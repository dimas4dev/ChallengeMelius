const urlPersonajes = "https://swapi.dev/api/people";
const urlGitHub = "https://api.github.com/users/";

async function fetchData() {
  const responsePersonajes = await window.fetch(urlPersonajes);
  const jsonPersonajes = await responsePersonajes.json();
  const arregloPersonajes = [...jsonPersonajes.results];
  const selectPersonaje = document.querySelector(".personajes");
  const contenedorPersonajes = document.querySelector(".resultadoPersonaje");

  arregloPersonajes.forEach((personaje) => {
    const optionDOM = document.createElement("option");
    optionDOM.setAttribute(`value`, `${personaje.name}`);
    optionDOM.setAttribute(`class`, `clasePersonaje`);
    optionDOM.textContent = personaje.name;
    selectPersonaje.append(optionDOM);
  });
  selectPersonaje.addEventListener("change", (event) => {
    if (event.target.value != "null") {
      arregloPersonajes.forEach((nombrePersonaje) => {
        contenedorPersonajes.classList.remove("novisible");
        if (nombrePersonaje.name == event.target.value) {
          const peso = document.getElementById("pesoPersonaje");
          const cabello = document.getElementById("hairColor");
          const piel = document.getElementById("hairSkin");
          const nacimiento = document.getElementById("birthDay");
          const genero = document.getElementById("Gender");
          const eyeColor = document.getElementById("eyeColor");
          const namePersonaje = document.getElementById("namePersonaje");

          peso.textContent = `${nombrePersonaje.mass} Kg`;
          cabello.textContent = `${nombrePersonaje.hair_color}`;
          piel.textContent = `${nombrePersonaje.skin_color}`;
          nacimiento.textContent = `${nombrePersonaje.birth_year}`;
          genero.textContent = `${nombrePersonaje.gender}`;
          eyeColor.textContent = `${nombrePersonaje.eye_color}`;
          namePersonaje.textContent = `${nombrePersonaje.name}`;
        }
      });
    } else {
      contenedorPersonajes.classList.add("novisible");
    }
  });
}

const submit = document.getElementById("buttonSubmit");

submit.addEventListener("click", traerInfoGit);

async function traerInfoGit() {
  const input = document.getElementById("inputUsuario").value;
  const pic = document.querySelector(".picPerfil");

  const imagenPerfil = await fetch(`${urlGitHub + input}`).then((response) =>
    response.json().then((imagen) => {
      const fotoPerfil = imagen.avatar_url;
      pic.classList.remove("novisible");
      if (imagen.message) {
        const NotFound = "./images/404NotFound.png";
        pic.setAttribute("src", `${NotFound}`);
      } else {
        pic.setAttribute("src", `${fotoPerfil}`);
      }
    })
  );

  const seccionRepositorios = document.querySelector(".listaRepos");

  while (seccionRepositorios.firstChild) {
    seccionRepositorios.removeChild(seccionRepositorios.firstChild);
  }
  const peticion = await fetch(`${urlGitHub + input}/repos`).then((response) =>
    response.json().then((repositorios) => {
      repositorios.forEach((nombreRepositorio) => {
        repoName = document.createElement("li");
        repoName.textContent = nombreRepositorio.name;
        seccionRepositorios.append(repoName);
      });
    })
  );
}

fetchData();
