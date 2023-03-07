$('#add').on('click',()=>{
    manage.addNew($('#title').val(), $('#text').val()).then(res=>console.log(res))
})