class Wygrana{
    constructor(kolor){
        this.kolor = kolor
    }

    //getter
    get wygrana(){
        return this.getWygrana()
    }

    //method
    getWygrana(){
        console.log(this.kolor + ' wygrał!!!')   
                const body = JSON.stringify({ color: this.kolor, board: sessionStorage['board'] }) // body czyli przesyłane na serwer dane
                
                const headers = { "Contet-Type": "application/json" } // nagłowek czyli typ danych
                
                fetch("/Wygrana", { method: "post", body, headers }) // fetch
                    .then(response => response.json())
                    .then(
                        data => {
                            // console.log(data)
                            document.getElementById(data).style.display = 'block'
                        })
    }
}
export default Wygrana