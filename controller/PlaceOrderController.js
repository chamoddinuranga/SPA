import {PlaceOrderModel} from "../model/PlaceOrderModel.js";


/*let cus=new CustomerModel()._id;*/
var Order=new Array();
let cusData="CUSTOMER"
let itemData="ITEM";
let cartData="CARTDATA";
/*let Cus=CustomerModel.prototype;*/
/*cus=JSON.parse(localStorage.getItem(CustomerModel));*/
/*cus=JSON.parse()*/


function generateOrderID(){
        if (Order.length==0){
            $("#OrderId").val("0-0001");
        }else if (Order.length>0){
            var orderId=Order[Order.length-1]._getItemByOrder(orderId.split("-")[1]);
            var tempId=parseInt(orderId);
            tempId=tempId+1;
            if (tempId<=9){
                $("#OrderId").val("O-000" + tempId);

            }else if (tempId <= 99) {
                $("#OrderId").val("O-00" + tempId);
            } else if (tempId <= 999) {
                $("#OrderId").val("O-0" + tempId);
            } else if (tempId <= 9999) {
                $("#OrderId").val("O-" + tempId);
            }
        }
}
generateOrderID();
function addToCustomerCmb(){
    let cus=JSON.parse(localStorage.getItem(cusData));
    cus.map((result) => {
        let data=`<option value="${result._id}">${result._id}</option>`
        $('#select-Customer-Id').append(data);
        $('#Customer-Name').append(cus._name);
        console.log(cusData+"***");
        /*$('#Customer-Name').append(result._name);*/
      /*  if (result._id==){

        }*/

    })


}

addToCustomerCmb();

$("#select-Customer-Id").change(function () {
    var id = $("#select-Customer-Id").find('option:selected').text();

    let customers=JSON.parse(localStorage.getItem(cusData));
    customers.map((result) => {

        if (result._id === id) {
            console.log(result);
            $('#Customer-Name').val(result._name)

        }

    })
});

function addToItemCmb(){
    let item=JSON.parse(localStorage.getItem(itemData));
    item.map((result) => {
        let data=`<option value="${result._code}">${result._code}</option>`
        $('#select-item-code').append(data);

        /*$('#Customer-Name').append(result._name);*/

    })

}
addToItemCmb();

$("#select-item-code").change(function () {
    var code = $("#select-item-code").find('option:selected').text();

    let items=JSON.parse(localStorage.getItem(itemData));
    items.map((result) => {

        if (result._code === code) {
            console.log(result);
            $('#Item-Name-order').val(result._name)
            $('#Price-order').val(result._price)
            $('#Qty-order').val(result._qty)

        }

    })
});

/*function manageQty(itemCode,qty){
    let itemQty=itemCode.parse(localStorage.getItem(itemData));
    for (var i=0;i<itemQty.length;i++){
        if (itemQty._qty===itemCode){
            let temQty=parseInt(itemQty[i]._code);
            let qtyOnHand=temQty-qty;
            itemQty[i].set(qtyOnHand);
        }
    }
}
manageQty();*/
document.getElementById("btnAddToChart").addEventListener('click',function () {
    let pre_data=localStorage.getItem(cartData);
    console.log(cartData+"*********")
    let data_arr=[];
    if (pre_data){
        data_arr=JSON.parse(pre_data);
    }
    var id = $("#Item_code").find('option:selected').text();
    let placeOrderDetail=new PlaceOrderModel(
        $('#select-item-code').val(),
        $('#Item-Name-order').val(),
        $('#Price-order').val(),
        $('#Order-Qty').val(),
        0

    )

    if (placeOrderDetail.ItemCode&&placeOrderDetail.ItemName&&placeOrderDetail.Price&&placeOrderDetail.Qty) {
        let ddr = checkItemRecent(data_arr, placeOrderDetail.ItemCode);
        if (-1 !== ddr) {
            data_arr[ddr]._Qty = parseInt(data_arr[ddr]._Qty)+parseInt(placeOrderDetail._Qty);
            data_arr[ddr]._Total = parseFloat(data_arr[ddr]._Qty)*parseFloat(placeOrderDetail._Price);
        } else {
            placeOrderDetail.Total = placeOrderDetail.Price * placeOrderDetail.Qty
            data_arr.unshift(placeOrderDetail);

        }
    }

    localStorage.setItem(cartData,JSON.stringify(data_arr));


    /*let carts = JSON.parse(localStorage.getItem(cartData));
    let items = JSON.parse(localStorage.getItem("ITEM"));

    for (let i = 0; i < carts.length; i++) {
        for (let j = 0; j < items.length; j++) {
            if (items[j]._code === carts[i]._ItemCode) {
                items[j]._qty = parseFloat(items[j]._qty) - parseFloat(carts[i]._qty);
            }
        }
    }
    localStorage.setItem(items, JSON.stringify("ITEM"));*/

    loadCartData();


})
/*function purchaseOrder() {
    let carts = JSON.parse(localStorage.getItem(cartData));
    let items = JSON.parse(localStorage.getItem("ITEM"));
    for (let i = 0; i < carts.length; i++) {
        for (let j = 0; j < items.length; j++) {
            if (items[j]._code === carts[i]._ItemCode) {
                items[j]._qty = parseFloat(items[j]._qty) - parseFloat(carts[i]._qty);
            }
        }
    }
    localStorage.setItem(items, JSON.stringify("ITEM"));
}*/


function loadCartData() {
    let cart=JSON.parse(localStorage.getItem(cartData));
    $('#tOrderBody').empty();
    cart.map((object,index)=>{
        var data=`
           <tr>
                    <th scope="row">${object._ItemCode}</th>
                    <td>${object._ItemName}</td>
                    <td>${object._Price}</td>
                    <td>${object._Qty}</td>
                    <td>${object._Total}</td>

                </tr>
        `

        $('#tOrderBody').append(data);

    })

}
document.getElementById("btnPay").addEventListener('click',function () {
    let carts = JSON.parse(localStorage.getItem(cartData));
    let items = JSON.parse(localStorage.getItem(itemData));

    for (let i = 0; i < carts.length; i++) {
        for (let j = 0; j < items.length; j++) {
            if (items[j]._code === carts[i]._ItemCode) {

                items[j]._qty = parseFloat(items[j]._qty) - parseFloat(carts[i]._Qty);
                console.log(items[j]._qty+"******")
            }
        }
    }
    localStorage.setItem(itemData, JSON.stringify(items));
})

function checkItemRecent(arr,id){
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]._ItemCode+"zzzzz")
        if (arr[i]._ItemCode===id) {
            return i;
        }
    }
    return -1;
}
loadCartData();

// Find the item in itemTableData
/*var itemIndex = -1;

for (var i = 0; i < itemsArray.length; i++) {
    if (itemsArray[i].code === code) {
        itemIndex = i;
        break;
    }
}

if (itemIndex !== -1) {
    // Check if there is enough quantity available
    if (itemsArray[itemIndex].qtyOnHand >= qty) {
        // Reduce the quantity on hand
        itemsArray[itemIndex].qtyOnHand -= qty;
        // Update the itemTableData in localStorage
        updateItemTableData(itemsArray);

        tot = qty*price;

        // Add the item data to the orderTableData
        var order = {
            code: code,
            desc: desc,
            price: price,
            qty: qty,
            tot: tot
        };
        console.log('Ay ane oya cart ekata yannaththe');
        console.log(order);
        var existingItem = records.find((item) => item.code === code);
        if (existingItem) {
            // Update the quantity and total for existing item
            existingItem.qty += qty;
            existingItem.tot += qty * price;
            updateTotal(); // Update the table and total
        } else {
            // Add a new item to records
            tot = qty * price;
            var order = {
                code: code,
                desc: desc,
                price: price,
                qty: qty,
                tot: tot
            };
            records.push(order);
            localStorage.setItem('records', JSON.stringify(records));
            updateTotal(); // Update the table and total
        }*/


