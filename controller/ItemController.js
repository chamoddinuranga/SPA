import {ItemModel} from "../model/itemModel.js";



const ItemData="ITEM";
let data_arr=[];
const itemCodeRegx=/^(I00)([0-9]){1,}$/;
const itemNameRegx=/^([A-Za-z]){3,}$/;
const itemPriceRegx=/^([0-9]){1,}$/;
const itemQtyRegx = /^\d+(,\d{3})*(\.\d{1,2})?$/;
/*Add the Regex*/
          /*code*/
$("#Item_code").keyup(function (){
    let inputCode=$('#Item_code').val();
    if (itemCodeRegx.test(inputCode)){
        $("#Item_code").css("border","2px solid green");
        $("#error_ItemCode").text("");
    }else {
        $("#Item_code").css("border","2px solid red");
        $("#error_ItemCode").text("Item Code is a required field.Ex-(I001)");
    }
});

       /*Name*/
$("#Item_Name").keyup(function (){
    let inputName=$('#Item_Name').val();
    if (itemNameRegx.test(inputName)){
        $("#Item_Name").css("border","2px solid green");
        $("#error_ItemName").text("");
    }else {
        $("#Item_Name").css("border","2px solid red");
        $("#error_ItemName").text("Item name is a required field.");
    }
});

     /*Price*/
$("#Item_Price").keyup(function (){
    let inputItemPrice=$('#Item_Price').val();
    if (itemPriceRegx.test(inputItemPrice)){
        $("#Item_Price").css("border","2px solid green");
        $("#error_ItemPrice").text("");
    }else {
        $("#Item_Price").css("border","2px solid red");
        $("#error_ItemPrice").text("Item Price is a required field.");
    }
});
       /*Qty*/
$("#Item_Qty").keyup(function (){
    let inputItemQty=$('#Item_Qty').val();
    if (itemQtyRegx.test(inputItemQty)){
        $("#Item_Qty").css("border","2px solid green");
        $("#error_ItemQty").text("");
    }else {
        $("#Item_Qty").css("border","2px solid red");
        $("#error_ItemQty").text("Item Qty is a required field.");
    }
});

/**/
document.getElementById("btn_Add_Item").addEventListener('click',function () {
    let pre_data = localStorage.getItem(ItemData);

    if(pre_data) {
        data_arr = JSON.parse(pre_data);
    }
    let Item = new ItemModel(
        $('#Item_code').val(),
        $('#Item_Name').val(),
        $('#Item_Price').val(),
        $('#Item_Qty').val());

    data_arr.unshift(Item);
    localStorage.setItem(ItemData, JSON.stringify(data_arr));
    LoadItemData();
    clearItemField();

})


function LoadItemData(){
    let pre_data=localStorage.getItem(ItemData);
    let itemDataArr=JSON.parse(pre_data);

    if (itemDataArr) {
        $('#item_table_body').empty();
        itemDataArr.map((result) => {
            console.log(result);
            var data = `
                <tr>
                    <th scope="row">${result._code}</th>
                    <td>${result._name}</td>
                    <td>${result._price}</td>
                    <td>${result._qty}</td>
        
                </tr>`
            $('#item_table_body').append(data);

        })
    }

}
LoadItemData();

/*Item Search*/
$("#item_table_body>tr").click(function (){
    let itemCode=$(this).children(":eq(0)").text();
    let itemName=$(this).children(":eq(1)").text();
    let itemPrice=$(this).children(":eq(2)").text();
    let itemQty=$(this).children(":eq(3)").text();

    console.log(itemCode,itemName,itemPrice,itemQty);

    $('#Item_code').val(itemCode);
    $('#Item_Name').val(itemName);
    $('#Item_Price').val(itemPrice);
    $('#Item_Qty').val(itemQty);
});

document.getElementById("btn_Serach_Item").addEventListener('click',function () {
    let ItemCode=$('#Item_code').val();
    let item=JSON.parse(localStorage.getItem(ItemData));
    let searchItem=searchItemMethod(item,ItemCode);
    if (searchItem!==null){
        $('#Item_Name').val(searchItem._name);
        $('#Item_Price').val(searchItem._price);
        $('#Item_Qty').val(searchItem._qty);
    }else {
        $('#Item_Name').val("");
        $('#Item_Price').val("");
        $('#Item_Qty').val("");
        alert("Item Not Fount")
    }
})
function searchItemMethod(arr,id){
    for (let arrElement of arr){
        if (arrElement._code===id){
            return arrElement;
        }
    }
    return null;
}

document.getElementById("Delete_Item").addEventListener('click',function () {
    alert(JSON.stringify("Are You Sure"));
    let itemD=JSON.parse(localStorage.getItem(ItemData));
    itemD.map((result,index)=>{
        if (result._code){
            itemD.splice(index,1);
        }
    });
    localStorage.setItem(ItemData,JSON.stringify(itemD));
    LoadItemData();
    clearItemField();
});
function IReId(arr,id){
    console.log(arr.length)
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]._code);
        if (arr[i]._code===id) {
            return i;
        }
    }
    return -1;

}
document.getElementById("Update_Item").addEventListener('click',function upC() {

    data_arr=JSON.parse(localStorage.getItem(ItemData));

    let item={
        _code:$('#Item_code').val(),
        _name:$('#Item_Name').val(),
        _qty:$('#Item_Qty').val(),
        _price:$('#Item_Price').val()
    }
    let index=IReId(data_arr,item._code);
    if (index!==-1){
        data_arr[index]._name=$('#Item_Name').val(),
            data_arr[index]._price=$('#Item_Price').val(),
            data_arr[index]._qty=$('#Item_Qty').val()

        data_arr.splice(index,1,item)

    }

    localStorage.setItem(ItemData,JSON.stringify(data_arr));
    LoadItemData();
    clearItemField();
});
function clearItemField() {
    $('#Item_code').focus();

    $('#Item_code').val("")
    $('#Item_Name').val("")
    $('#Item_Price').val("")
    $('#Item_Qty').val("")

    $('#Item_code').css("border","1px solid #ced4da");
    $('#Item_Name').css("border","1px solid #ced4da");
    $('#Item_Price').css("border","1px solid #ced4da");
    $('#Item_Qty').css("border","1px solid #ced4da");

}