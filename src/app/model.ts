export class Model{
    user;
    items;
    constructor(){  
        this.user = "Adam";
        this.items = [new TodoItems("Buy Flowers" , false,true),new TodoItems("Make Coffee" , true,true),new TodoItems("Get Shoes" , false,true),new TodoItems("Collect Tickets" , false,true),new TodoItems("Call Joe" , false,true)];
    }
}
export class TodoItems{ 
    description;
    action;
    isVisible;
    constructor(description: string , action: boolean,isVisible: boolean){
        this.description = description;
        this.action = action;
        this.isVisible = true;
    }
}