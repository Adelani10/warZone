const hero = document.querySelector(".hero")
const monst = document.querySelector(".monst")

let monsterArray = ["orc", "goblin", "demon" ]
let isWaiting = false


function render(){
    hero.innerHTML = wizard.setCharacterHtml()
    monst.innerHTML = monster.setCharacterHtml()
}

document.querySelector(".attack-btn").addEventListener("click", attack)


const characterData = {
    hero: {
        name: "wizard",
        image: "/images/wizard.png",
        health: 90,
        diceCount: 3,
        currentDiceValues: []
    },

    orc: {
        name: "orc",
        image: "/images/orc.png",
        health: 75,
        diceCount: 1,
        currentDiceValues: []
    },

    goblin: {
        name: "goblin",
        image: "/images/goblin.png",
        health: 50,
        diceCount: 2,
        currentDiceValues: []
    },

    demon: {
        name: "demon",
        image: "/images/demon.png",
        health: 25,
        diceCount: 3,
        currentDiceValues: []
    },

}
function getPercentage(a, b) {
    return 100*a / b
}
function setDicePlaceholder (diceCount){
    return new Array (diceCount).fill(0).map(function (item){
        return `<div class="border border-whitesmoke bg-neutral-500 inline-block w-9 h-9 text-center bg-transparent"></div>`
    }).join('')
}

function setDiceRollValues(diceCount){
    return new Array (diceCount).fill(0).map(function(){
        return Math.floor(Math.random() * 6) + 1
    })
}

class Character {
    constructor (data) {
        Object.assign(this, data)
        this.diceHtml = setDicePlaceholder(this.diceCount)
        this.maxHealth = this.health
    }
    setHealthbar () {
        const percent = getPercentage(this.health, this.maxHealth)
        return `<div class="bg-black w-[90%] h-1 mb-2 outer mx-auto rounded-md">
                    <div class="bg-emerald-500 h-full ${percent < 30 ? "danger": "" } inner rounded-md" style= "width:${percent}% " >
                    </div>
                </div>`
    }

    setDiceHtml () {
        this.currentDiceValues = setDiceRollValues (this.diceCount)
        this.diceHtml = this.currentDiceValues.map(function(num){
            return `<div class="border border-whitesmoke  w-9 h-9 text-center bg-neutral-500 flex justify-center items-center font-bold text-2xl">
            ${num}
            </div>`
        }).join("")
    }

    takeDamage(attackScoreArray){
        const totalAttackValue = attackScoreArray.reduce(function(total, currValue){
             total+=currValue 
             return total
        })

        this.health -= totalAttackValue
        if (this.health <= 0) {
            this.dead = true
            this.health = 0
        }

    }

    setCharacterHtml() {
        const {name, image, health, diceCount, diceHtml} = this
        const healthBar = this.setHealthbar()
            return  `
                <h1 class="font-bold text-2xl md:text-4xl">
                    ${name}
                </h1>
                <img src=".${image}" class="md:h-1/2 w-1/2 md:w-2/3 mx-auto object-cover bg-sky-200 border-whitesmoke shadow-md shadow-black rounded-md" alt="">
                <h3 class="text-xl md:text-2xl">
                    health: ${health}
                </h3>
                ${healthBar}
                <div class="dice-cont space-x-2 mx-auto flex justify-center ">
                    ${diceHtml}
                </div>
            `
    }
}

const wizard = new Character (characterData.hero)
let monster = getNewMonster()

function endgame(){
    isWaiting = true
    const endMessage = wizard.health === 0 && monster.health === 0 ? "No Victors, All Creatures are Dead!" :
    wizard.health > 0 ? "The Wizard is Victorious!" : "The Monsters are victorious!"

    setTimeout(function(){
        document.body.innerHTML = `<div class="bg-whitesmoke h-screen flex justify-center items-center">
                                        <div class="font-bold tracking-widest flex flex-col justify-center items-center space-y-6">
                                            <h1 class="text-4xl md:text-5xl text-red-600">Game Over!</h1>
                                            <p class="tracking-wider text-xl text-slate-500">${endMessage}</p>
                                        </div>
                                    </div>`
    }, 2000)
}

function getNewMonster(){
    const a = characterData[monsterArray.shift()]
    return a ? new Character(a) : {}
}

function attack (){
    if (!isWaiting){
        wizard.setDiceHtml()
        monster.setDiceHtml()
        wizard.takeDamage(monster.currentDiceValues)
        monster.takeDamage(wizard.currentDiceValues)
        render()

        if(wizard.dead){
            endgame()
        }
        else if(monster.dead){
            isWaiting = true
            if(monsterArray.length > 0){
                setTimeout(function(){
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                }, 1500)
            }
            else{
                endgame()
            }
        }
    }        
}

render()
