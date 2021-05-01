class Pole {
    constructor(typ, left, top, number) {
      this.typ = typ;
      this.left = left;
      this.top = top;
      this.number = number;
    }
  }
var tablicaPol = []
class Pola{

    //getter
    get pola(){
        return this.getPola();
    }
    //method
    getPola() {
        let mnoznik = 30;
        let id = 0;
        for(let y = 1; y <= 5; y++){
            id+=1
            let pole = new Pole('normal',50+y*mnoznik,200,id)
            tablicaPol.push(pole)

            let el = document.createElement('div')
            el.setAttribute('class','pole')
            el.setAttribute('id',id)
            el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
            document.getElementById('plansza').appendChild(el)
            // document.body.appendChild(el)
        }
        for(let y = 1; y < 5; y++){
            id+=1
            let pole = new Pole('normal',200,200-y*mnoznik,id)
            tablicaPol.push(pole)
        
            let el = document.createElement('div')
            el.setAttribute('class','pole')
            el.setAttribute('id',id)
            el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
            document.getElementById('plansza').appendChild(el)
            // document.body.appendChild(el)
        }
        for(let y = 1; y < 2; y++){
            id+=1
            let pole = new Pole('normal',200+y*mnoznik,80,id)
            tablicaPol.push(pole)
        
            let el = document.createElement('div')
            el.setAttribute('class','pole')
            el.setAttribute('id',id)
            el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
            document.getElementById('plansza').appendChild(el)
            // document.body.appendChild(el)
        }
        for(let y = 1; y <= 5; y++){
            id+=1
            let pole = new Pole('normal',260,50+y*mnoznik,id)
            tablicaPol.push(pole)
        
            let el = document.createElement('div')
            el.setAttribute('class','pole')
            el.setAttribute('id',id)
            el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
            document.getElementById('plansza').appendChild(el)
            // document.body.appendChild(el)
        }
        for(let y = 1; y < 5; y++){
            id+=1
            let pole = new Pole('normal',260+y*mnoznik,200,id)
            tablicaPol.push(pole)
        
            let el = document.createElement('div')
            el.setAttribute('class','pole')
            el.setAttribute('id',id)
            el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
            document.getElementById('plansza').appendChild(el)
            // document.body.appendChild(el)
        }
        for(let y = 1; y <= 2; y++){
            id+=1
            let pole = new Pole('normal',380,200+y*mnoznik,id)
            tablicaPol.push(pole)
        
            let el = document.createElement('div')
            el.setAttribute('class','pole')
            el.setAttribute('id',id)
            el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
            document.getElementById('plansza').appendChild(el)
            // document.body.appendChild(el)
        }
        for(let y = 1; y < 5; y++){
            id+=1
            let pole = new Pole('normal',380-y*mnoznik,260,id)
            tablicaPol.push(pole)
        
            let el = document.createElement('div')
            el.setAttribute('class','pole')
            el.setAttribute('id',id)
            el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
            document.getElementById('plansza').appendChild(el)
            // document.body.appendChild(el)
        }
        for(let y = 1; y < 5; y++){
            id+=1
            let pole = new Pole('normal',260,260+y*mnoznik,id)
            tablicaPol.push(pole)
        
            let el = document.createElement('div')
            el.setAttribute('class','pole')
            el.setAttribute('id',id)
            el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
            document.getElementById('plansza').appendChild(el)
            // document.body.appendChild(el)
        }
        for(let y = 1; y <= 2; y++){
            id+=1
            let pole = new Pole('normal',260-y*mnoznik,380,id)
            tablicaPol.push(pole)
        
            let el = document.createElement('div')
            el.setAttribute('class','pole')
            el.setAttribute('id',id)
            el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
            document.getElementById('plansza').appendChild(el)
            // document.body.appendChild(el)
        }
        for(let y = 1; y < 5; y++){
            id+=1
            let pole = new Pole('normal',200,380-y*mnoznik,id)
            tablicaPol.push(pole)
        
            let el = document.createElement('div')
            el.setAttribute('class','pole')
            el.setAttribute('id',id)
            el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
            document.getElementById('plansza').appendChild(el)
            // document.body.appendChild(el)
        }
        for(let y = 1; y < 5; y++){
            id+=1
            let pole = new Pole('normal',200-y*mnoznik,260,id)
            tablicaPol.push(pole)
        
            let el = document.createElement('div')
            el.setAttribute('class','pole')
            el.setAttribute('id',id)
            el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
            document.getElementById('plansza').appendChild(el)
            // document.body.appendChild(el)
        }
        id+=1
        let pole = new Pole('normal',80,230,id)
        tablicaPol.push(pole)
    
        let el = document.createElement('div')
        el.setAttribute('class','pole')
        el.setAttribute('id',id)
        el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
        document.getElementById('plansza').appendChild(el)
        // document.body.appendChild(el)
    // }

    for(let y = 1; y <= 2; y++){
        id = 'r'+y
        let pole = new Pole('red',50+y*mnoznik,80,id)
        tablicaPol.push(pole)
    
        let el = document.createElement('div')
        el.setAttribute('class','pole')
        el.setAttribute('id',id)
        el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
        document.getElementById('plansza').appendChild(el)
        // document.body.appendChild(el)
    }
    for(let y = 1; y <= 2; y++){
        id='r'+(2+y)
        let pole = new Pole('red',50+y*mnoznik,110,id)
        tablicaPol.push(pole)
    
        let el = document.createElement('div')
        el.setAttribute('class','pole')
        el.setAttribute('id',id)
        el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
        document.getElementById('plansza').appendChild(el)
        // document.body.appendChild(el)
    }

    for(let y = 1; y <= 2; y++){
        id='g'+y
        let pole = new Pole('green',320+y*mnoznik,80,id)
        tablicaPol.push(pole)
    
        let el = document.createElement('div')
        el.setAttribute('class','pole')
        el.setAttribute('id',id)
        el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
        document.getElementById('plansza').appendChild(el)
        // document.body.appendChild(el)
    }
    for(let y = 1; y <= 2; y++){
        id = 'g'+(2+y)
        let pole = new Pole('green',320+y*mnoznik,110)
        tablicaPol.push(pole)
    
        let el = document.createElement('div')
        el.setAttribute('class','pole')
        el.setAttribute('id',id)
        el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
        document.getElementById('plansza').appendChild(el)
        // document.body.appendChild(el)
    }

    for(let y = 1; y <= 2; y++){
        id = 'b'+y
        let pole = new Pole('blue',320+y*mnoznik,350,id)
        tablicaPol.push(pole)
    
        let el = document.createElement('div')
        el.setAttribute('class','pole')
        el.setAttribute('id',id)
        el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
        document.getElementById('plansza').appendChild(el)
        // document.body.appendChild(el)
    }
    for(let y = 1; y <= 2; y++){
        id = 'b'+(2+y)
        let pole = new Pole('blue',320+y*mnoznik,380,id)
        tablicaPol.push(pole)
    
        let el = document.createElement('div')
        el.setAttribute('class','pole')
        el.setAttribute('id',id)
        el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
        document.getElementById('plansza').appendChild(el)
        // document.body.appendChild(el)
    }

    for(let y = 1; y <= 2; y++){
        id = 'y'+y
        let pole = new Pole('yellow',50+y*mnoznik,350,id)
        tablicaPol.push(pole)
    
        let el = document.createElement('div')
        el.setAttribute('class','pole')
        el.setAttribute('id',id)
        el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
        document.getElementById('plansza').appendChild(el)
        // document.body.appendChild(el)
    }
    for(let y = 1; y <= 2; y++){
        id = 'y'+(2+y)
        let pole = new Pole('yellow',50+y*mnoznik,380,id)
        tablicaPol.push(pole)
    
        let el = document.createElement('div')
        el.setAttribute('class','pole')
        el.setAttribute('id',id)
        el.setAttribute('style','position:absolute;left:'+pole['left']+'px'+';top:'+pole['top']+'px')
        document.getElementById('plansza').appendChild(el)
        // document.body.appendChild(el)
    }
    
    console.log(tablicaPol)
}

}

 

export default Pola