import {clear_form} from "./script.js";

let tab_button = document.querySelectorAll('.tab_button');
let tab_panel=document.querySelectorAll('.tab_container');
let form=document.forms["employee_form"];

export function showpanel (panel_index){
    tab_panel.forEach(doc=>{
        doc.style.display="none";
    });
 
    tab_panel[panel_index].style.display="block";

}
tab_button.forEach(doc=>{
    doc.addEventListener('click',()=>{
        showpanel(doc.getAttribute('value'))});

});
showpanel("0");


window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            let img = document.getElementById('upload_img');
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }
  
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }
    });
  });



//log form on console
let log_form=()=>{
    console.log(form["first_name"].value+
    form["last_name"].value +"\n"+
    form["email"].value +"\n"
    )
   
}
 



let submit_form=document.getElementById("submit_button");
submit_form.addEventListener('click',()=>{
    log_form();
    
});

let reset_btn=document.getElementById("reset_btn")
reset_btn.addEventListener('click',()=>{
    clear_form();

})

