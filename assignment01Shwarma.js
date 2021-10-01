const Order = require("./assignment01Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SELECTING:  Symbol("selecting"),   
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    SAUCE: Symbol("sauce"),
    SALAD:  Symbol("salad"),
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;   
        this.sSelecting = "";       
        this.sSize = "";
        this.sToppings = "";
        this.sSauce = "";
        this.sSalad = "";
        this.sItem = "";
        this.nPrice = 20;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){

            case OrderState.WELCOMING:
                this.stateCur = OrderState.SELECTING;
                aReturn.push("Welcome to Nipa's Shwarma.");
                aReturn.push("Which item would you like Pizza, Shwarma or Nachos ?");
                break;
            case OrderState.SELECTING:
                this.sItem = sInput;
                this.stateCur = OrderState.SIZE;
                aReturn.push("What size would you like?");               
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                aReturn.push("What toppings would you like?");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.SAUCE
                this.sToppings = sInput;
                aReturn.push("Which Sauce would you like 1.Mayo 2.Ranch 3.Sweet Onion ?");
                break;

                case OrderState.SAUCE: 
                    this.stateCur = OrderState.SALAD
                    if(this.sSauce = "Mayo"){
                        this.nPrice += 2;
                        this.sSauce = sInput;
                    }
                    if(this.sSauce = "Ranch"){
                        this.nPrice += 3;
                        this.sSauce = sInput;
                    }
                    if(this.sSauce == "Sweet Onion"){
                        this.nPrice += 4;
                        this.sSauce = sInput;
                    }
                    aReturn.push("Do you want salad with that?");                        
                    break;
               
                case OrderState.SALAD:                
                    this.isDone(true);
                    if(sInput.toLowerCase() != "no"){                       
                        this.sSalad = sInput;
                        this.nPrice += 10;                
                    }
                aReturn.push("Thank you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings} and ${this.sSauce} Sauce`);
                if(this.sSalad){
                    aReturn.push(`and Salad`);
                }
                aReturn.push(`Your Total Amount is $${this.nPrice}`);
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }   
}