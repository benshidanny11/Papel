document.getElementById("btnLogin").addEventListener("click",()=>{
    const userRole =document.getElementById("userRoles");

    if (userRole.value === 'Admin') {
      window.location.href = 'admin/dashboard.html';
    } else if (userRole.value === 'Client') {
      window.location.href = 'client/dashboard.html';
    } else if(userRole.value === 'Cashier'){
        window.location.href = 'cashier/dashboard.html';
      
    }else{
        document.getElementById("p-error").removeAttribute("hidden");
    }
});

  