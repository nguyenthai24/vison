$(document).ready(function() {
    $('#imgSmall').on('change', function(e) {
        const output = document.getElementById('Small');
        output.src = URL.createObjectURL(e.target.files[0]);
        output.onload = function() {
          URL.revokeObjectURL(output.src);
          $('#Small').attr('class', 'imgSmall')
        }
    })

    $('#imgBig').on('change', function(e) {
      
        const output = document.getElementById('Big');
        output.src = URL.createObjectURL(e.target.files[0]);
        output.onload = function() {
          URL.revokeObjectURL(output.src);
            $('#Big').attr('class', 'imgBig')
        }
    })


    // $('#frmSelect').on('change', function(e) {
    //   const val = $('#frmSelect').val();

    //   $.ajax({
    //     url: '/admin/add-game/ajax',
    //     type: 'POST',
    //     contentType: 'application/json',
    //     data: JSON.stringify({data: val})
    //   })
    //   .then(function(res) {
          
    //   })
    // })
})

$(document).ready(function() {
  $('#checkRadio').on('click', function() {
    const result = $('#checkRadio').val();
    console.log(result)
    if(result.length > 0) {
      $('#showPosition').attr('style', 'display: block')
    }
  });
  $('#checkRadio1').on('click', function() {
    const result = $('#checkRadio').val();
    console.log(result)
    if(result.length > 0) {
      $('#showPosition').attr('style', 'display: none')
    }

  });

});

// $(document).ready(function() {
//   $('#btnListImg').on('click', function() {
//     $('#table').html('');
//     $('.clearfix').html('');
//     $('#pagination').html('');
//     let arr, arr1, arr2
//     data.forEach(element => {
//       console.log(element)
//     });

//     console.log(arr)
//     console.log(arr1)
//     console.log(arr2)
//     let html = `<div class="container">
//                   <div class="row">
//                       <div class="col-sm-8">
//                           <img src="" alt="">
//                       </div>
//                       <div class="col-sm 4">
//                           <img src="" alt="">
//                           <img src="" alt="">
//                       </div>
//                   </div>
//               </div>`

//   });
// });