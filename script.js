// validate form inputs before submiting data
function validateForm(){
    var hasil1 = document.getElementById("hasil 1").value;
    var hasil2 = document.getElementById("hasil 2").value;

    if(hasil1 == ""){
        alert("Hasil 1 is required");
        return false;
    }

    else if(hasil2 == ""){
        alert("Hasil 2 is required");
        return false;
    }

    return true;
}

// function to show data
function showData(){
    var resultList;
    if(localStorage.getItem("resultList") == null){
        resultList = [];
    }
    else{
        resultList = JSON.parse(localStorage.getItem("resultList"));
    }

    var html = "";
 
    resultList.forEach(function (element, index){
        html += "<tr>";
        html += "<td>" + element.hasil1 + "</td>";
        html += "<td>" + element.hasil2 + "</td>";
        html += 
            '<td><button onclick="deleteData('+index+')" class="btn btn-danger">Delete</button><button onclick="updateData(' +index +
            ')" class="btn btn-warning m-2">Edit</button></td>';
        html +="</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// loads All Data when document or page loaded
document.onload = showData();

// function to add data
function AddData(){
    // if form is validate
    if(validateForm() == true){
        var hasil1 = document.getElementById("hasil1").value;
        var hasil2 = document.getElementById("hasil2").value;
        
        var resultList;
        if(localStorage.getItem("resultList") == null){
            resultList = [];
        }else{
            resultList = JSON.parse(localStorage.getItem("resultList"));
        }

        resultList.push({
            hasil1 : hasil1,
            hasil2 : hasil2,
        });

        localStorage.setItem("resultList", JSON.stringify(resultList));
        showData();
        document.getElementById("hasil1").value = "";
        document.getElementById("hasil2").value = "";
    }
}   

// function to delete Data from loccal storage
function deleteData(index){
    var resultList;
    if (localStorage.getItem("resultList") == null) {
        resultList = [];    
    } else {
        resultList = JSON.parse(localStorage.getItem("resultList"));
    }

    resultList.splice(index, 1);
    localStorage.setItem("resultList", JSON.stringify(resultList));
    showData();
}

// function to update/edit data in local storage
function updateData(index){
    // submit button will hide and update button will show for updating of data in local storage
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var resultList;
    if (localStorage.getItem("resultList") == null) {
        resultList = [];    
    } else {
        resultList = JSON.parse(localStorage.getItem("resultList"));
    }

    document.getElementById("hasil1").value = resultList[index], hasil1;
    document.getElementById("hasil2").value = resultList[index], hasil2;

    document.querySelector("#Update").onclick = function(){
        if(validateForm() == true){
            resultList[index].hasil1 = document.getElementById("hasil1").value;
            resultList[index].hasil2 = document.getElementById("hasil2").value;
        
        localStorage.setItem("resultList", JSON.stringify(resultList));
        
        showData();

        document.getElementById("hasil1").value = "";
        document.getElementById("hasil2").value = "";
        
        // submit button will hide and update button will show for updating of data in local storage
        document.getElementById("Submit").style.display = "block";
        document.getElementById("Update").style.display = "none";

        }
    }
}