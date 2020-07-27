function fetchData(value) {
    let table = document.querySelector('.table');
    let home = document.querySelector('#home');
    home.disabled = true;
    let url,c;
    if (value === undefined) {
        url = 'backend/fetchData.php?fetch=1';
        c=1;
    } else {
        url = 'backend/fetchData.php?search='+value;
        c=0;
    }
    let spinner = document.querySelector('.spinner');
    table.innerHTML += `<tbody id="data"></tbody>`;
    let table_data = document.querySelector('#data');
    fetch(url).then(res => res.json())
    .then (data => {
        if (data.length) {
            data.forEach((item,index) => {
                table_data.innerHTML += `
                    <tr>
                      <td>${index+1}</td>
                      <td> <input type="text" id="name${+item['id']}" class="form-control"  value="${item['Name']}"></td>
                      <td> <input type="text" id="work_type${+item['id']}" class="form-control"  value="${item['Work_Type']}"></td>
                      <td> <input type="date"id="e_date${+item['id']}" class="form-control"  value="${item['End_Date']}"></td>
                      <td>Rs.<input type="number"id="pd${+item['id']}" class="form-control"  value="${item['Payment_dn']}"></td>
                      <td>Rs.<input type="number"id="pl${+item['id']}" class="form-control"  value="${item['Payment_lt']}"></td>
                      <td><button type="button" onclick="edit(${item['id']})" class="btn btn-info">Edit</button>&nbsp;&nbsp;<button type="button" onclick="del(${item['id']})" class="btn btn-info">Delete</button></td>
                    </tr>`;
            });
        } else {
            table.innerHTML += `<tbody id="no-record"><tr><td colspan='7' style='text-align:center;'>No records found</td><tr></tbody>`;
        }
    })
    .catch(error => {
        console.log(error);
        table.innerHTML += `<tbody id="no-record"><tr><td colspan='7' style='text-align:center;'>No records found</td><tr></tbody>`;
    })
}
function load_data() {
    let table = document.querySelector('.table');
    let search_bar = document.querySelector('.search-bar');
    let table_data = document.querySelector('#data');
    let add_form = document.querySelector('#add-form');
    table_data.remove();
    fetchData();
    table.style.display="block";
    search_bar.style.display = 'block';
    if (!(add_form === null)) {
        add_form.style.display = "none";
    }
}
function add_data() {
    let table = document.querySelector('.table');
    let search_bar = document.querySelector('.search-bar');
    let add_form = document.querySelector('#add-form');
    if (!(add_form === null)) {
        add_form.remove();
    }
    search_bar.style.display = 'none';
    table.style.display="none";  
    let container = document.querySelector('.container-fluid');
    container.innerHTML += `<form id='add-form'>
    <div class="form-group">
      <label for="exampleInputEmail1">Name</label>
      <input type="text" class="form-control" id="name" aria-describedby="emailHelp" required>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Work Type</label>
      <input type="text" class="form-control" id="work_type">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">End Date</label>
      <input type="date" class="form-control" id="e_date">
    </div>
    <div class="form-group">
    <label for="exampleInputPassword1">Payment Done</label>
    <input type="number" class="form-control" id="pd">
    </div>
    <div class="form-group">
    <label for="exampleInputPassword1">Payment Left</label>
    <input type="number" class="form-control" id="pl">
    </div>
    <button id="submit" class="btn btn-primary">Submit</button>
    </form>`; 
    let submit_btn = document.querySelector('#submit');
    let name = document.querySelector('#name');
    let work_type = document.querySelector('#work_type');
    let e_date = document.querySelector('#e_date');
    let pd = document.querySelector('#pd');
    let pl = document.querySelector('#pl');
    submit_btn.addEventListener('click',function (e){
        e.preventDefault();
        if (name.value.trim() !== '') {
            let url = 'backend/fetchData.php?add=1&name='+name.value.replace(' ','%20')+'&work_type='+work_type.value.replace(' ','%20')+'&e_date='+e_date.value+'&pd='+pd.value+'&pl='+pl.value;
            fetch(url).then(res => res.json())
            .then (data => {
                if (data == 1) {
                    alert ('Data inserted Succesfully');
                } else {
                    alert ('something went wrong!');
                }
                load_data();
            })
            
        }
    });
}
function del(id) {
    let url = 'backend/fetchData.php?delete='+id;
    fetch (url).then(res => {
        load_data();
    });
}
function edit(id) {
    let name = document.querySelector('#name'+id);
    let work_type = document.querySelector('#work_type'+id);
    let e_date = document.querySelector('#e_date'+id);
    let pd = document.querySelector('#pd'+id);
    let pl = document.querySelector('#pl'+id);
    let url = 'backend/fetchData.php?edit='+id+'&name='+name.value.replace(' ','%20')+'&work_type='+work_type.value.replace(' ','%20')+'&e_date='+e_date.value+'&pd='+pd.value+'&pl='+pl.value;
    fetch (url).then(res => {
        load_data();
    });
}
function search(value) {
    let table_data = document.querySelector('#data');
    let no_record = document.querySelector('#no-record');
    table_data.remove();
    if (no_record !== null) {
        no_record.remove();
    }
    fetchData(value);
}
