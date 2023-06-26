 class OrderModel{

     constructor(id,date,placeOrderDetails,total) {
         this._id=id;
         this._name=name;
         this._placeOrderDetails=placeOrderDetails;
         this._total=total;
         this._date=date;
     }


     get id() {
         return this._id;
     }

     set id(value) {
         this._id = value;
     }

     get date() {
         return this._date;
     }

     set date(value) {
         this._date = value;
     }

     get placeOrderDetails() {
         return this._placeOrderDetails;
     }

     set placeOrderDetails(value) {
         this._placeOrderDetails = value;
     }

     get total() {
         return this._total;
     }

     set total(value) {
         this._total = value;
     }

     get name() {
         return this._name;
     }

     set name(value) {
         this._name = value;
     }

     /*
    constructor(orderID,orderDate,customerId,total){
        this._orderId=orderID;
        this._orderDate=orderDate;
        this._customerId=customerId;
        this._total=total;
        this._orderID = orderID;
    }


    get orderID() {
        return this._orderID;
    }

    set orderID(value) {
        this._orderID = value;
    }

    get orderDate() {
        return this._orderDate;
    }

    set orderDate(value) {
        this._orderDate = value;
    }

    get customerId() {
        return this._customerId;
    }

    set customerId(value) {
        this._customerId = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }*/
}