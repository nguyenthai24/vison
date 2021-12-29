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


    $('#frmSelect').on('change', function(e) {
      const val = $('#frmSelect').val();
      $.ajax({
        url: '/admin/add-game',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({data: val})
      })
      .then(function(res) {

      })
    })
})