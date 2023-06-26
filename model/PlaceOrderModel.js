export class PlaceOrderModel{
    constructor(ItemCode,ItemName,Price,Qty,Total) {

        this._ItemCode = ItemCode;
        this._ItemName = ItemName;
        this._Price = Price;
        this._Qty = Qty;
        this._Total = Total;
    }

    get ItemCode() {
        return this._ItemCode;
    }

    set ItemCode(value) {
        this._ItemCode = value;
    }

    get ItemName() {
        return this._ItemName;
    }

    set ItemName(value) {
        this._ItemName = value;
    }

    get Price() {
        return this._Price;
    }

    set Price(value) {
        this._Price = value;
    }

    get Qty() {
        return this._Qty;
    }

    set Qty(value) {
        this._Qty = value;
    }

    get Total() {
        return this._Total;
    }

    set Total(value) {
        this._Total = value;
    }
}