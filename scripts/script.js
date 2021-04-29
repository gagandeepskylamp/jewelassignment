 import {showpanel} from "./script2.js";


const table_body = document.getElementById("tbody");
let form=document.forms["employee_form"];
const API="https://reqres.in/api/users";
let   jsondata={};

// get json from given api
let load_data= async (api,page_no)=>{

    let complete_api=api+'?page='+page_no;
    try{
       const response=await fetch(complete_api);
       return response.json();
   }
   
   catch(err){
       console.log(err);
   }
    
}

let setup=async (API,page_no)=>{
    await load_data(API,page_no).then(edata=>{
        jsondata=edata;
        
        
    });
    load_table();
    tablerow_to_form();
    

    
}




let load_table=()=>{
    let add_table_row=``;
    let employee_data=[];
    employee_data=jsondata.data;

    employee_data.forEach(element => {
        let name='';
        name=element.first_name+' '+element.last_name;
        add_table_row+=`<tr class="table_row" value=${element.id}><td><img src=${element.avatar} alt='avatar' class='avatar'><td>${element.email}</td><td>${name}</td></tr>`
    });
    table_body.innerHTML=add_table_row;
}



//recieve row data and attach it to form
let send_rowdata_toform=(value)=>{
  
    form["first_name"].setAttribute('value',value.first_name)
    form["last_name"].setAttribute('value',value.last_name);
    form["email"].setAttribute('value',value.email);
    let img=document.getElementById('upload_img');
    img.src=value.avatar;
}


//to disable all form elements
let disable_form=(_bool)=>{
    
    form["first_name"].readOnly=_bool;
    form["last_name"].readOnly=_bool;
    form["email"].readOnly=_bool;
    form["image"].disabled=_bool;
    form["submit_button"].disabled=_bool;
    form["reset_btn"].disabled=_bool;
    


}
//clear form
export function clear_form() {
    document.getElementById("employee_form").reset();
    let  null_attritube={
        first_name : '',
        last_name : '',
        email : '',
        avatar : '#',
        
    }
    send_rowdata_toform(null_attritube);
    }
// on add employee btn click, reset form 
let add_employee_btn=document.querySelector('.add_employee_btn');
add_employee_btn.addEventListener('click',()=>{
       disable_form(false);
       
      
       clear_form();
});





// set click attribute to each row , to send row data to form
let tablerow_to_form = ()=>{
    let table_row=document.querySelectorAll('.table_row');

    table_row.forEach(el=>{
       
        el.addEventListener('click',()=>{
           
            let row_id=getrowdata(el);
            
            showpanel('1');
            send_rowdata_toform(row_id);
            disable_form(true);

        })
    })


}
//get value in rable row 
let getrowdata=(el)=>{
    let value=el.getAttribute('value')
            let obj_id=(value%jsondata.per_page)-1;
             let row_id=jsondata.data[obj_id];
             return row_id;
}



//create page toggle
let pagenation=(no_pages)=>{
  
   
     let table_pages = document.createElement('div');
    table_pages.setAttribute('class','table_page');

    for(let i=0;i<no_pages;i++){
        let pg_no=(i+1).toString();

        let page_button=document.createElement("BUTTON");
        page_button.setAttribute("id","page_button");
        page_button.setAttribute('value',pg_no);
        page_button.innerHTML=pg_no;
        page_button.addEventListener('click',()=>{
            setup(API,page_button.getAttribute('value'))
        });
        table_pages.appendChild(page_button);
       
       
        
    }
    
    document.getElementsByClassName('tab_container')[0].appendChild(table_pages);
}


let first_setup=async(API)=>{
    await setup(API,'1');
    pagenation(jsondata.total_pages);

}




first_setup(API);

