class Bazy{

    //getter
    get bazy(){
        return this.getBazy();
    }
    //method
    getBazy(){
        
        let el = document.createElement('div')
        el.setAttribute('class','baza')
        el.setAttribute('id','redbase')
        el.setAttribute('style','position:absolute;left:110px'+';top:230px')
        document.getElementById('plansza').appendChild(el)

        let el1 = document.createElement('div')
        el1.setAttribute('class','baza')
        el1.setAttribute('id','bluebase')
        el1.setAttribute('style','position:absolute;left:260px'+';top:230px')
        document.getElementById('plansza').appendChild(el1)

        let el2 = document.createElement('div')
        el2.setAttribute('class','baza')
        el2.setAttribute('id','greenbase')
        el2.setAttribute('style','position:absolute;left:230px'+';top:110px')
        document.getElementById('plansza').appendChild(el2)

        let el3 = document.createElement('div')
        el3.setAttribute('class','baza')
        el3.setAttribute('id','yellowbase')
        el3.setAttribute('style','position:absolute;left:230px'+';top:260px')
        document.getElementById('plansza').appendChild(el3)
    }
}
export default Bazy