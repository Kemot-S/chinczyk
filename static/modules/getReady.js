class Ready{
    // constructor(body,headers){
    //     this.body = body;
    //     this.headers = headers;
    // }

    //getter
    get ready(){
        return this.getReady();
    }
    //method
    getReady() {
            const body = JSON.stringify({ color: sessionStorage['color'], num: sessionStorage['num'], board: sessionStorage['board'] }) // body czyli przesyłane na serwer dane
        
            const headers = { "Contet-Type": "application/json" } // nagłowek czyli typ danych
            
            fetch("/getReady", { method: "post", body, headers }) // fetch
                .then(response => response.json())
                .then(
                    data => {
                            document.getElementById('bt3').className = 'style'+data
                    }
                )
    }}

export default Ready