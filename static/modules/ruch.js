class Ruch{
    // constructor(body,headers){
    //     this.body = body;
    //     this.headers = headers;
    // }

    //getter
    get ruch(){
        return this.getRuch();
    }
    //method
    getRuch() {
        const body = JSON.stringify({ color: sessionStorage['color'], num: sessionStorage['num'], board: sessionStorage['board'] }) // body czyli przesyłane na serwer dane
        
            const headers = { "Contet-Type": "application/json" } // nagłowek czyli typ danych
            
            fetch("/ruch", { method: "post", body, headers }) // fetch
                .then(response => response.json())
                .then(
                    data => {
                        var synth=window.speechSynthesis;
                        var voices=[];
                        
                        populateVoiceList();
                        if(speechSynthesis.onvoiceschanged !==undefined){
                            speechSynthesis.onvoiceschanged = populateVoiceList;
                        }
                        
                        function populateVoiceList(){
                            var voices=synth.getVoices();
                            // console.log(voices);
                        }
                        
                        function read(value = "Jazda jazda biała gwiazda"){
                            var u=new SpeechSynthesisUtterance();
                            u.text=value;
                            u.voice=voices[100];
                            u.pitch=1;
                            u.rate=1;
                            synth.speak(u);
                        }
                        // console.log(data[0]['gracz1']), // dane odpowiedzi z serwera
                        // ruch1(data)
                        // console.log(data);
                        this.ruch1(data);
                        document.getElementById('bt4').style.display = 'none'
                        if(data==1){
                            let el = document.createElement('div')
                            el.setAttribute('class','oczko')
                            el.setAttribute('style','position:absolute;left:calc(45%);top:calc(45%);')
                            document.getElementById('kostka').appendChild(el)
                            read('jeden')
                        }
                        else if(data==2){
                            for(let x=0;x<2;x++){
                                let el = document.createElement('div')
                                el.setAttribute('class','oczko')
                                el.setAttribute('style','position:absolute;left:calc('+(25+x*35)+'%);top:calc(45%);')
                                document.getElementById('kostka').appendChild(el)
                            }
                            read('dwa')
                        }
                        else if(data==3){
                            for(let x=0;x<3;x++){
                                let el = document.createElement('div')
                                el.setAttribute('class','oczko')
                                el.setAttribute('style','position:absolute;left:calc('+(15+x*30)+'%);top:calc('+(15+x*30)+'%);')
                                document.getElementById('kostka').appendChild(el)

                            }
                            read('trzy')
                        }
                        else if(data==4){
                            for(let x=0;x<4;x++){
                                let y = 0
                                let z = 0
                                let el = document.createElement('div')
                                el.setAttribute('class','oczko')
                                if(x%2==0){
                                    y = 40
                                }
                                if(x<2){
                                    z = 40
                                }
                                el.setAttribute('style','position:absolute;left:calc('+(25+y)+'%);top:calc('+(25+z)+'%);')
                                document.getElementById('kostka').appendChild(el)
                            }
                            read('cztery')
                        }
                        else if(data==5){

                            for(let x=0;x<5;x++){
                                let el = document.createElement('div')
                                el.setAttribute('class','oczko')
                                let y = 0
                                let z = 0
                                if(x%2==0){
                                    y = 60
                                }
                                if(x<2){
                                    z = 60
                                }
                                if(x==4){
                                    y=30
                                    z=30
                                }
                                el.setAttribute('style','position:absolute;left:calc('+(15+y)+'%);top:calc('+(15+z)+'%);')
                                document.getElementById('kostka').appendChild(el)
                            }
                            read('pięć')
                        }
                        else if(data==6){
                            for(let x=0;x<6;x++){
                                let el = document.createElement('div')
                                el.setAttribute('class','oczko')
                                let y = 0
                                let z = 0
                                if(x%2==0){
                                    y = 40
                                }
                                if(x<4){
                                    z = 40
                                }
                                if(x<2){
                                    z = 20
                                }

                                el.setAttribute('style','position:absolute;left:calc('+(25+y)+'%);top:calc('+(25+z)+'%);')
                                document.getElementById('kostka').appendChild(el)
                            }
                            read('sześć')
                        }
                        document.getElementById('kostka').style.display = 'block'
                    }
                )
            }
        
    //method
        ruch1(value=0){
            if(value>0){
                for(let x = 1; x<=4; x++){
                        document.getElementById(sessionStorage['color']+x).onclick = function(){
                            console.log(value);
                            fecz(x,value);
                            value = 0;
                            document.getElementById('kostka').style.display = 'none'

                        }
                    }
                    function removeAllChildNodes(parent) {
                        while (parent.firstChild) {
                            parent.removeChild(parent.firstChild);
                        }
                    }
                    removeAllChildNodes(document.getElementById('kostka'))
            }
            function fecz(pos,dice){
                const body = JSON.stringify({ color: sessionStorage['color'], num: sessionStorage['num'], board: sessionStorage['board'], pos: pos, dice: dice }) // body czyli przesyłane na serwer dane
            
                    const headers = { "Contet-Type": "application/json" } // nagłowek czyli typ danych
                    
                    fetch("/changePos", { method: "post", body, headers }) // fetch
                        .then(response => response.json())
                        .then(
                            data => {
                                // console.log(data[0]['gracz1']), // dane odpowiedzi z serwera
                                // ruch1(data)
                                console.log(data)
                            }
                        )
            }
        }
    }

export default Ruch
