import Ruch from './ruch.js'
import Wygrana from './wygrana.js'
class Pos{
    // constructor(body,headers){
    //     this.body = body;
    //     this.headers = headers;
    // }

    //getter
    get pos(){
        return this.getPos();
    }
    //method
    getPos() {
    
            const body = JSON.stringify({ color: sessionStorage['color'], num: sessionStorage['num'], board: sessionStorage['board'] }) // body czyli przesyłane na serwer dane
            
            const headers = { "Contet-Type": "application/json" } // nagłowek czyli typ danych
            
            fetch("/getPos", { method: "post", body, headers }) // fetch
                .then(response => response.json())
                .then(
                    data => {
                    let red = 0
                    let green = 0
                    let blue = 0
                    let yellow = 0 
                    for (let x = 1; x <= data[0]['players']; x++) {
                        for(let h=0;h<4;h++){
                            // console.log(data[0]['gracz'+x]['pos']+h)
                            if(x==1){
                                if(data[0]['gracz'+x]['pos'+h] == 'redbase'){
                                    red+=1
                                }
                            }
                            if(x==2){
                                if(data[0]['gracz'+x]['pos'+h] == 'greenbase'){
                                    green+=1
                                }
                            }
                            if(x==3){
                                if(data[0]['gracz'+x]['pos'+h] == 'bluebase'){
                                    blue+=1
                                }
                            }
                            if(x==4){
                                if(data[0]['gracz'+x]['pos'+h] == 'yellowbase'){
                                    yellow+=1
                                }
                            }
                        }
                        if(blue == 1){
                            document.getElementById('bluebase').style.backgroundColor = 'rgb(110, 214, 255)'
                        }
                        else if(blue == 2){
                            document.getElementById('bluebase').style.backgroundColor = 'rgb(0, 130, 252)'
                        }
                        else if(blue == 3){
                            document.getElementById('bluebase').style.backgroundColor = 'rgb(2, 40, 255)'
                        }
                        else if(blue == 4){
                            document.getElementById('redbase').style.backgroundColor = 'rgb(0, 3, 184)'
                            let bluewin = new Wygrana('blue')
                            bluewin.wygrana
                        }
                        if(red == 1){
                            document.getElementById('redbase').style.backgroundColor = 'rgb(231, 114, 114)'
                        }
                        else if(red == 2){
                            document.getElementById('redbase').style.backgroundColor = 'rgb(245, 68, 68)'
                        }
                        else if(red == 3){
                            document.getElementById('redbase').style.backgroundColor = 'rgb(240, 32, 32)'
                        }
                        else if(red == 4){
                            document.getElementById('redbase').style.backgroundColor = 'rgb(209, 3, 3)'
                            let redwin = new Wygrana('red')
                            redwin.wygrana
                        }
                        if(green == 1){
                            document.getElementById('greenbase').style.backgroundColor = 'rgb(141, 218, 122)'
                        }
                        else if(green == 2){
                            document.getElementById('greenbase').style.backgroundColor = 'rgb(94, 211, 64)'
                        }
                        else if(green == 3){
                            document.getElementById('greenbase').style.backgroundColor = 'rgb(45, 184, 10)'
                        }
                        else if(green == 4){
                            document.getElementById('greenbase').style.backgroundColor = 'rgb(38, 148, 11)'
                            let greenwin = new Wygrana('green')
                            greenwin.wygrana
                        }

                        if(yellow == 1){
                            document.getElementById('yellowbase').style.backgroundColor = 'rgb(255, 252, 95)'
                        }
                        else if(yellow == 2){
                            document.getElementById('yellowbase').style.backgroundColor = 'rgb(224, 207, 51)'
                        }
                        else if(yellow == 3){
                            document.getElementById('yellowbase').style.backgroundColor = 'rgb(255, 255, 0)'
                        }
                        else if(yellow == 4){
                            document.getElementById('yellowbase').style.backgroundColor = 'rgb(185, 185, 0)'
                            let yellowwin = new Wygrana('yellow')
                            yellowwin.wygrana
                        }
                    }
                        console.log(sessionStorage['color'],data[0]['active'])
                       
                        if(sessionStorage['color']==data[0]['active'] && sessionStorage['done']==0){
                            document.getElementById("bt4").onclick = function () {
                                // odczytanie pozycji wszystkich graczy
                            let newruch = new Ruch()
                                newruch.ruch
                                sessionStorage.setItem('done',1)
                                var old_element = document.getElementById('bt4');
                                var new_element = old_element.cloneNode(true);
                                old_element.parentNode.replaceChild(new_element, old_element);
                            }
                        }
                        else if(sessionStorage['color']!=data[0]['active']){
                            var old_element = document.getElementById('bt4');
                            var new_element = old_element.cloneNode(true);
                            old_element.parentNode.replaceChild(new_element, old_element);
                            sessionStorage.setItem('done',0)
                        }

                        document.getElementById('bt4').style.display = data[0]['playing'];
                        document.getElementById('gra').style.display = data[0]['playing'];
                        document.getElementById('board_number').innerText = 'Plansza: '+data[0]['plansza'];
                        // console.log(data[0]['gracz1']), // dane odpowiedzi z serwera
                        for (let x = 1; x <= data[0]['players']; x++) {
                            
                            document.getElementById(data[0]['gracz'+x]['color']).className = 'style' + data[0]['gracz'+x]['state']
                            document.getElementById(data[0]['gracz'+x]['color']).innerHTML = 'Gracz: '+ data[0]['gracz'+x]['color'] + '</br>'     
                                                                                + 'Pion1: ' + data[0]['gracz'+x]['pos1'] + '</br>'
                                                                                + 'Pion2: ' + data[0]['gracz'+x]['pos2'] + '</br>'
                                                                                + 'Pion3: ' + data[0]['gracz'+x]['pos3'] + '</br>'
                                                                                + 'Pion4: ' + data[0]['gracz'+x]['pos4'];
    
                            for(let y = 1; y<=4; y++){                                                        
                                let left = document.getElementById(data[0]['gracz'+x]['pos'+y]).style.left
                                let top = document.getElementById(data[0]['gracz'+x]['pos'+y]).style.top
    
                                document.getElementById(data[0]['gracz'+x]['color']+y).style.left = left;
                                document.getElementById(data[0]['gracz'+x]['color']+y).style.top = top;
                            }
                        }               
                    }
                )
    
        }

}

export default Pos