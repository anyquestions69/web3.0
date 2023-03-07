$('#reg').on('click',()=>{
    manage.addUser($('#name').val(), $('#rang').val()).then(res=>console.log(res))
})