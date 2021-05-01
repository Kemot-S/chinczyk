class ReadyOrNot{
    // constructor(body,headers){
    //     this.body = body;
    //     this.headers = headers;
    // }

    //getter
    get readyOrNot(){
        return this.getReadyOrNot();
    }
    //method
    getReadyOrNot() {
        if( document.getElementById('bt3').className == 'style1')
        document.getElementById('bt3').innerText = 'not ready';
        else{
            document.getElementById('bt3').innerText = 'ready';
        }
    }}


export default ReadyOrNot