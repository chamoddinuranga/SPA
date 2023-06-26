export class CustomerModel{
    constructor(id,name,address,salary) {
        /*undes cop eka danne variable private karanna*/
        this._id=id;
        this._name=name;
        this._address=address;
        this._salary=salary;
    }
    get id(){
        return this._id;
    }
    set id(value){
        this.id=value;
    }
    get name(){
        return this._name;
    }
    set name(value){
        this.name=value;
    }
    get address(){
        return this._address;
    }
    set address(value){
        this.address=value;
    }
    get salary(){
        return this._salary;
    }
    set salary(value){
        this.salary=value;
    }
}