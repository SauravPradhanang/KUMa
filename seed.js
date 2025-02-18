const mongoose = require("mongoose");
const {Product} = require('./models/product');
c
mongoose
  .connect("mongodb+srv://christmasbhandari:Gyarados99@goodygoody.56ot4.mongodb.net/eshop")
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.error("MongoDB connection error:", err));



  const sampleCategories = [
    
    {
      name: "Iphone 15",
      color: "White"
    },
    {
      name: "Asus TUF",
      color: "Grey"
    },
    {
        name: "Apple",
        color: "Starlight"
      },
      {
        name: "Vaseline",
        color: "Cream"
      },
      {
        name: "Ramen Korean",
        color: "Spicy"
      },

  ];
  
  module.exports = sampleCategories;
  

  const seedDatabase = async () => {
  
      await Category.deleteMany({});
      
  
  
  seedDatabase();


  form.addEventListener('submit', async (e)=>{
    
    e.preventDefault();

    const newPassword= form.new-password.value;
    const oldPassword= form.old-password.value;
    const username= form.username.value;
    //const id= product.getAttribute('id');



    const res= await fetch(`/users/edit-user`,{
        method: 'POST',
        body: JSON.stringify({ oldPassword, username, newPassword }),
        headers: {'Content-Type': 'application/json'}
    })
    
    if(!res.ok){
        passwordError.innerText = "Enter the correct old password to change it.";
        passwordError.style.color = "red";
    }
    else{
        passwordError.innerText = "Password changed successfully.";
        passwordError.style.color = "green";
    }

})
})



<script>
document.addEventListener("DOMContentLoaded", ()=>{

   
const form= document.querySelector('.form-grid');
const save= document.getElementById('save-button')
const passwordError= document.querySelector('.password-error');

save.addEventListener('click', async (e)=>{
e.preventDefault();

const newPassword= form.new-password.value;
const oldPassword= form.old-password.value;
const username= form.username.value;
//const id= product.getAttribute('id');



const res= await fetch(`/users/edit-user`,{
method: 'POST',
body: JSON.stringify({ oldPassword, username, newPassword }),
headers: {'Content-Type': 'application/json'}
})

if(!res.ok){
passwordError.innerText = "Enter the correct old password to change it.";
passwordError.style.color = "red";
}
else{
passwordError.innerText = "Password changed successfully.";
passwordError.style.color = "green";
}

})})

</script>


document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('save_button').addEventListener('click', async()=>{
          
      const form= document.querySelector('.form-grid');
      const passwordError= document.querySelector('.password-error');
  
      const newPassword= form.new-password.value || '';
      const oldPassword= form.old-password.value || '';
      const username= form.username.value;
      const email= form.email.value;
      //const id= product.getAttribute('id');
      
      const res= await fetch(`/users/edit-user`,{
          method: 'POST',
          body: JSON.stringify({ oldPassword, username, newPassword, email }),
          headers: {'Content-Type': 'application/json'}
      })
      
      if(!res.ok){
          passwordError.innerText = "Enter the correct old password to change it.";
          passwordError.style.color = "red";
      }
      else{
          passwordError.innerText = "Password changed successfully.";
          passwordError.style.color = "green";
      }
      
      
  })
         
  
     
})











async function save() {

       
                   
  const form= document.querySelector('.form-grid');
  const passwordError= document.querySelector('.password-error');

  const newPassword= form.new-password.value || '';
  const oldPassword= form.old-password.value || '';
  const username= form.username.value;
  const email= form.email.value;
  //const id= product.getAttribute('id');
  
  const res= await fetch(`/users/edit-user`,{
      method: 'POST',
      body: JSON.stringify({ oldPassword, username, newPassword, email }),
      headers: {'Content-Type': 'application/json'}
  })
  
  if(!res.ok){
      passwordError.innerText = "Enter the correct old password to change it.";
      passwordError.style.color = "red";
  }
  else{
      passwordError.innerText = "Password changed successfully.";
      passwordError.style.color = "green";
  }
  
  }

  https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos%2Ffootball-ground&psig=AOvVaw3riSktSF9sKqbyPjrg7Z1u&ust=1739985385619000&source=images&cd=vfe&opi=89978449&ved=0CBYQjRxqFwoTCNjA5e3czYsDFQAAAAAdAAAAABAE