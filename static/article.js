$('#link-tab-0da5').on('click', async ()=>{
   let arr= await manage.allSigners(0)
   arr.forEach(element => {
        $('#signers').append(`<tr style="height: 51px;">
        <td class="u-table-cell">${element}</td>
        <td class="u-table-cell">Description</td>
        <td class="u-table-cell">Подписал</td>
      </tr>`)
   });
})

$('#sign').on('click',()=>{
    manage.sign(0).then(res=>console.log(res))
})