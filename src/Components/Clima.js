import {useState } from "react"
import styles from "./Clima.module.css"


const apiIMG = "37237634-8ef56bab8964d49417a14aa4b"
const apiKey = "ab7f9c6f60c52bac907a4cf684fe77cc"
//const apiBandeiraURL = "https://flagsapi.com//flat/64.png"

//const searchBtn = document.querySelector("#search")


   
    
 
    

    

function Clima(){
    const [isloading, setLoading] = useState()
    const [showResult, setShowResult] = useState(false);
    const [erroResult, seterroResult] = useState(false);
   function Buscar(e){ 
      e.preventDefault()
    const cityInput = document.querySelector('#city-input')
    const cityElement = document.querySelector('#city')
    const tempElement = document.querySelector("#temperature span")
    const condicionElement = document.querySelector("#condicion")
    const iconElement = document.querySelector("#imgcondicao")
    const bandeiraElement = document.querySelector("#bandeira")
    const umidadeElement = document.querySelector("#umidade span")
    const ventoElement = document.querySelector("#vento span")
    
    
//funções




    











const getData = async (city) =>{

   
    const apiURL= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br` 
    const res = await fetch(apiURL)
    const data = await res.json()


    //IMG de fundo com o api//
    if (data.cod === 200) {
        fetch(`https://pixabay.com/api/?key=${apiIMG}&q=${city}&per_page=10`)
          .then(response => response.json())
          .then(data => {
            if (data.hits.length > 0) {
              const imageUrl = data.hits[0].largeImageURL;
              document.body.style.backgroundImage = `url(${imageUrl})`;
              document.body.style.backgroundSize = 'cover';
              document.body.style.backgroundPosition = 'center';
            }
          })
          .catch(error => {
            console.error('Ocorreu um erro:', error);
          });
      }
      
  

    
   return(data)
  
}




    const mostrar = async (city) => {
        setLoading(true)
        setShowResult(false)
        const data = await getData(city)
        setLoading(false)
        setShowResult(true)
       
        if (data && data.cod === 200){
            //Nesse exemplo, verificamos se a resposta da API data existe e se o código .cod retornado é igual a 200 (código de sucesso da API do OpenWeatherMap).//
            seterroResult(false)
            setShowResult(true)
        cityElement.innerText = data.name;
        tempElement.innerText = parseInt(data.main.temp);
        condicionElement.innerText = data.weather[0].description;
        iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)

        bandeiraElement.setAttribute("src",`https://flagsapi.com/${data.sys.country}/flat/64.png`)

        umidadeElement.innerText = `${data.main.humidity}%`
        ventoElement.innerText = `${data.wind.speed} Km/h`


    }
    
            
           else{
           setShowResult(false)
           seterroResult(true)
        }
       
          
        
            
    }
    
        
    if (cityInput.value === ""){
        seterroResult(true)
        
}

    else if(cityInput.value.length > 1){
    mostrar(cityInput.value)
}

   
    
        cityInput.addEventListener("keyup", (e) =>{
                if(e.code === "Enter"){
                    const city = e.target.value
                    mostrar(city)
                }
        })
   
    
    

   }

   
    return(
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.containerinput}>
                    <input className={styles.inputtext} type="text" id="city-input" placeholder="Qual cidade?"></input>
                    <button onClick={Buscar} className={styles.search} id="search" >
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>

            </div>
            <div className={`${styles.loading} ${isloading ? "" : styles.hidden}`}>
           
    
       
        
            <div className={styles.bolinha1}></div>
        
        
  </div>
          
            
             <div className={`${styles.erro} ${erroResult ? "" : styles.errohidden}`}>
                <span id="erro">
                     Algo de errado não esta certo
                </span>
             </div>
                    
            <div id={styles.rees}  className={`${styles.res} ${showResult ? "" : styles.hidden}`}> 
                 {/* O "?" que aparece na expressão ${showResult ? "" : styles.hidden} é conhecido como operador condicional ternário ou operador ternário. Ele é usado para criar uma expressão condicional de forma mais concisa.

                    A estrutura geral do operador ternário é a seguinte:
                        condição ? valor_se_verdadeiro : valor_se_falso

                            A expressão é avaliada da seguinte forma:

                            Se a condição for verdadeira, o valor_se_verdadeiro é retornado.
                            Se a condição for falsa, o valor_se_falso é retornado.
                            No caso específico da expressão ${showResult ? "" : styles.hidden}:

                            A condição é showResult.
                            Se showResult for true, a expressão retorna "", que é uma string vazia.
                            Se showResult for false, a expressão retorna styles.hidden, que é a classe definida  no arquivo CSS. */}
        
       
                <h2>
                    
                    <i class= "fa-solid fa-location-dot"></i>
                    <span className={styles.cidade}id="city"></span>
                    <img src="" id="bandeira" alt="bandeira" className={styles.imgbandeira}></img>
                  
                </h2>
                <p className={styles.temperatura} id="temperature">
                    <span></span>&deg;C</p>
                    <div className={styles.description}>
                        <p id="condicion" className={styles.condicao}></p>
                        <img id="imgcondicao" alt="Condiçoes do tempo" className="imgcondicao"></img>

                    </div>
                    <div className={styles.detalhes}>
                        <p id="umidade" className={styles.umidade}>
                            <i class= "fa-solid fa-droplet"></i>
                            <span></span>
                        </p>
                        <p id="vento" className={styles.vento}>
                            <i class= "fa-solid fa-wind"></i>
                        <span></span>
                        </p>

                    </div>
               
            </div>
               
        </div>
        
    )
}
export default Clima