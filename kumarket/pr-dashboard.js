function add_product() {
    window.location.href = 'postpage.html';
}

function edit_page() {
    window.location.href = "product-edit-page.html";
}

function delete_product() {
    var row3 = document.getElementById('row-3');
    console.log(row3);
    row3.innerHTML = "";
}