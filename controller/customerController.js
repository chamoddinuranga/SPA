import {CustomerModel} from "../model/customerModel.js";
/*import {CuModel} from "../model/CuModel";*/


const cusData="CUSTOMER";
var data_arr=new Array();
const cusIdRegx=/^(C00)([0-9]){1,}$/;
const cusNameRegx=/^([A-Za-z]){3,}$/;
const cusAddressRegx=/^([A-Za-z0-9,.]){3,}$/;
const cusSalaryRegx = /^\d+(,\d{3})*(\.\d{1,2})?$/;

/*Add the Regex*/
    /*Id*/
$("#customer_id").keyup(function (){
    let inputId=$('#customer_id').val();
    if (cusIdRegx.test(inputId)){
        $("#customer_id").css("border","2px solid green");
        $("#error_id").text("");
    }else {
        $("#customer_id").css("border","2px solid red");
        $("#error_id").text("Customer id is a required field.Ex-(C001)");
    }
});

           /*Name*/
$("#customer_name").keyup(function (){
    let inputName=$('#customer_name').val();
    if (cusNameRegx.test(inputName)){
        $("#customer_name").css("border","2px solid green");
        $("#nameE").text("");
    }else {
        $("#customer_name").css("border","2px solid red");
        $("#nameE").text("Customer name is a required field.");
    }
});

           /*Address*/
$("#customer_address").keyup(function (){
    let inputAddress=$('#customer_address').val();
    if (cusAddressRegx.test(inputAddress)){
        $("#customer_address").css("border","2px solid green");
        $("#addressE").text("");
    }else {
        $("#customer_address").css("border","2px solid red");
        $("#addressE").text("Customer address is a required field.");
    }
});
          /*salary*/
$("#customer_salary").keyup(function (){
    let inputSalary=$('#customer_salary').val();
    if (cusSalaryRegx.test(inputSalary)){
        $("#customer_salary").css("border","2px solid green");
        $("#salaryE").text("");
    }else {
        $("#customer_salary").css("border","2px solid red");
        $("#salaryE").text("Customer salary is a required field.");
    }
});

/**/
document.getElementById("btnAddCustomer").addEventListener('click',function () {
    let pre_data = localStorage.getItem(cusData);

    if(pre_data) {
        data_arr = JSON.parse(pre_data);
    }
    let customer = new CustomerModel(
        $('#customer_id').val(),
        $('#customer_name').val(),
        $('#customer_address').val(),
        $('#customer_salary').val());
    data_arr.unshift(customer);
    localStorage.setItem(cusData, JSON.stringify(data_arr));
    loadCustomerData();
    clearCustomerField();

})


function loadCustomerData(){
    let pre_data=localStorage.getItem(cusData);
    let customerDataArr=JSON.parse(pre_data);

    if (customerDataArr) {
        $('#customerTableBody').empty();
        customerDataArr.map((result) => {
            console.log(result);
            var data = `
                <tr>
                    <th scope="row">${result._id}</th>
                    <td>${result._name}</td>
                    <td>${result._address}</td>
                    <td>${result._salary}</td>

                </tr>`
            $('#customerTableBody').append(data);
        })
    }
}

loadCustomerData();
/*Search Customer*/
$("#customerTableBody>tr").click(function (){
    let cusId=$(this).children(":eq(0)").text();
    let cusName=$(this).children(":eq(1)").text();
    let cusAddress=$(this).children(":eq(2)").text();
    let cusSalary=$(this).children(":eq(3)").text();

    console.log(cusId,cusName,cusAddress,cusSalary);

    $('#customer_id').val(cusId);
    $('#customer_name').val(cusName);
    $('#customer_address').val(cusAddress);
    $('#customer_salary').val(cusSalary);
});
$("#customerTableBody>tr").dblclick(function (){
    $(this).remove();
    localStorage.getItem(cusData);

});

document.getElementById("btnSearchCustomer").addEventListener('click',function () {
    let cusId=$('#customer_id').val();
    let cus=JSON.parse(localStorage.getItem(cusData));
    let searchCus=searchCustomer(cus,cusId);
    if (searchCus!==null){
        $('#customer_name').val(searchCus._name);
        $('#customer_address').val(searchCus._address);
        $('#customer_salary').val(searchCus._salary);
    }else {
        $('#customer_name').val("");
        $('#customer_address').val("");
        $('#customer_salary').val("");
        alert("Customer Not Fount")
    }
})
function searchCustomer(arr,id){
    for (let arrElement of arr){
        if (arrElement._id===id){
            return arrElement;
        }
    }
    return null;
}

document.getElementById("btnDeleteCustomer").addEventListener('click',function () {
    alert(JSON.stringify("Are You Sure"));
    let customerD=JSON.parse(localStorage.getItem(cusData));
    customerD.map((result,index)=>{
        if (result._id){
            customerD.splice(index,1);
        }
    });
    localStorage.setItem(cusData,JSON.stringify(customerD));
    loadCustomerData();
    clearCustomerField();
});
function CReId(arr,id){
    console.log(arr.length)
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]._id);
        if (arr[i]._id===id) {
            return i;
        }
    }
    return -1;

}
document.getElementById("btnUpdateCustomer").addEventListener('click',function upC() {

    data_arr=JSON.parse(localStorage.getItem(cusData));
    let customer={
    _id:$('#customer_id').val(),
    _name:$('#customer_name').val(),
    _address:$('#customer_address').val(),
    _salary:$('#customer_salary').val()
}
    console.log(customer._id);
    let index=CReId(data_arr,customer._id);
    console.log(index);
    if (index!==-1){
        data_arr[index]._name=$('#customer_name').val(),
        data_arr[index]._address=$('#customer_address').val(),
        data_arr[index]._salary=$('#customer_salary').val()
        data_arr.splice(index,1,customer)
    }
    localStorage.setItem(cusData,JSON.stringify(data_arr));
    loadCustomerData();
    clearCustomerField();
});

function clearCustomerField() {
    $('#customer_id').focus();

    $('#customer_id').val("")
    $('#customer_name').val("")
    $('#customer_address').val("")
    $('#customer_salary').val("")

    $('#customer_id').css("border","1px solid #ced4da");
    $('#customer_name').css("border","1px solid #ced4da");
    $('#customer_address').css("border","1px solid #ced4da");
    $('#customer_salary').css("border","1px solid #ced4da");

}
