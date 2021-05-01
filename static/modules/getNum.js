class Num{
    
    //getter
    get num(){
        return this.getNum();
    }
    //method
    getNum() {
            fetch("/getNum", { method: "post"}) // fetch
                .then(response => response.json())
                .then(
        // dane odpowiedzi z serwera
                    data => {
                            sessionStorage.setItem('color',data['color']),
                            sessionStorage.setItem('num',data['num']),
                            sessionStorage.setItem('board',data['board']),
                            sessionStorage.setItem('done',0)
                            document.getElementById('gracz').style.backgroundColor = data['color']
                    }
                )                
        }
}


export default Num
