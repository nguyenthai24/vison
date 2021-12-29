$('#pagination').pagination({
    dataSource: function(done) {
        $.ajax({
            type: 'POST',
            url: '/dashboard',
            success: function(res) {
                let arr = [];
                for(let i = 0; i < res.totalPage; i++) {
                    arr.push(i);
                }
                done(arr)
            }
        })
    },
    pageSize: 2,
    afterPageOnClick : function(e, page) {
        loadPage(page);
    },
    afterPreviousOnClick : function(e) {
        previousPage();
    },
    afterNextOnClick : function(e) {
        nextPage();
    }
})

var pageCurrent = 1;

//PageOnClick
function loadPage(page) {
    pageCurrent = page;
    $.ajax({
        type: 'POST',
        url: '/dashboard?page=' + page,
        contentType: 'application/json',
        data: JSON.stringify({page: page})
    })
    .then(function(data) {
        if(data.status == true) {
            $('#table').html('');
            let table = `
                <thead>  
                    <tr>
                        <th>STT</th>
                        <th>Name Game<i class="fa fa-sort"></i></th>
                        <th>Img Small</th>
                        <th>Img Big <i class="fa fa-sort"></i></th>
                        <th>User<i class="fa fa-sort"></i></th>
                        <th>Content</th>
                        <th>Description <i class="fa fa-sort"></i></th>
                        <th>Actions</th>
                    </tr>      
                </thead>
                <tbody id= "tbody">
                </tbody>
            `
            $('#table').append(table);
            const game = data.game;
            let html = '';
            game.forEach(function(val, i) {
                html += "<tr>";
                html += `<td>${i+1}</td>`;
                html += `<td>${val.name}</td>`;
                if(val.imgSmall.length > 0) {
                    html += `<td><img class="a" src="${val.imgSmall}"></td>`;
                } else  {
                    html +=`<td></td>`;
                }
                if(val.imgBig.length > 0) {
                    html +=`<td><img class="a" src="${val.imgBig}"></td>`;
                } else  {
                    html += `<td></td>`;
                }
                if(typeof val.userId !== 'undefined' && val.userId.email) {
                    html += `<td>${val.userId.email}</td>`;
                } else {
                    html +=`<td></td>`;
                }
                html += `<td>${val.content} </td>`;
                html += `<td>${val.desc} </td>`;
                html += `<td> 
                    <a href="/admin/update-game/${val._id}" class="edit" title="Edit" data-toggle="tooltip">
                        <i class="fas fa-edit"></i>
                    </a>
                    <a href="" class="delete" title="Delete" data-toggle="tooltip">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                </td>`;
                html += "</tr>";
            });
            $('#tbody').append(html);
            
        }
    })
    .catch(function (error) {
        console.log(error.message)
    })
}

//

function previousPage() {
    pageCurrent--;
    $.ajax({
        type: 'POST',
        url: '/dashboard',
        contentType: 'application/json',
        data: JSON.stringify({page: pageCurrent})
    })
    .then(function(data) {
        if(data.status == true) {
            $('#table').html('');
            let table = `
                <thead>  
                    <tr>
                        <th>STT</th>
                        <th>Name Game<i class="fa fa-sort"></i></th>
                        <th>Img Small</th>
                        <th>Img Big <i class="fa fa-sort"></i></th>
                        <th>User<i class="fa fa-sort"></i></th>
                        <th>Content</th>
                        <th>Description <i class="fa fa-sort"></i></th>
                        <th>Actions</th>
                    </tr>      
                </thead>
                <tbody id= "tbody">
                </tbody>
            `
            $('#table').append(table);
            const game = data.game;
            let html = '';
            game.forEach(function(val, i) {
                html += "<tr>";
                html += `<td>${i+1}</td>`;
                html += `<td>${val.name}</td>`;
                if(val.imgSmall.length > 0) {
                    html += `<td><img class="a" src="${val.imgSmall}"></td>`;
                } else  {
                    html +=`<td></td>`;
                }
                if(val.imgBig.length > 0) {
                    html +=`<td><img class="a" src="${val.imgBig}"></td>`;
                } else  {
                    html += `<td></td>`;
                }
                if(typeof val.userId !== 'undefined' && val.userId.email) {
                    html += `<td>${val.userId.email}</td>`;
                } else {
                    html +=`<td></td>`;
                }
                html += `<td>${val.content} </td>`;
                html += `<td>${val.desc} </td>`;
                html += `<td> 
                    <a href="/admin/update-game/${val._id}" class="edit" title="Edit" data-toggle="tooltip">
                        <i class="fas fa-edit"></i>
                    </a>
                    <a href="" class="delete" title="Delete" data-toggle="tooltip">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                </td>`;
                html += "</tr>";
            });
            $('#tbody').append(html)
        }
    })
    .catch(function (error) {
        console.log(error.message)
    })
}

//

function nextPage() {
    pageCurrent++;
    $.ajax({
        type: 'POST',
        url: '/dashboard',
        contentType: 'application/json',
        data: JSON.stringify({page: pageCurrent})
    })
    .then(function(data) {
        if(data.status == true) {
            $('#table').html('');
            let table = `
                <thead>  
                    <tr>
                        <th>STT</th>
                        <th>Name Game<i class="fa fa-sort"></i></th>
                        <th>Img Small</th>
                        <th>Img Big <i class="fa fa-sort"></i></th>
                        <th>User<i class="fa fa-sort"></i></th>
                        <th>Content</th>
                        <th>Description <i class="fa fa-sort"></i></th>
                        <th>Actions</th>
                    </tr>      
                </thead>
                <tbody id= "tbody">
                </tbody>
            `
            $('#table').append(table);
            const game = data.game;
            let html = '';
            game.forEach(function(val, i) {
                html += "<tr>";
                html += `<td>${i+1}</td>`;
                html += `<td>${val.name}</td>`;
                if(val.imgSmall.length > 0) {
                    html += `<td><img class="a" src="${val.imgSmall}"></td>`;
                } else  {
                    html +=`<td></td>`;
                }
                if(val.imgBig.length > 0) {
                    html +=`<td><img class="a" src="${val.imgBig}"></td>`;
                } else  {
                    html += `<td></td>`;
                }
                if(typeof val.userId !== 'undefined' && val.userId.email) {
                    html += `<td>${val.userId.email}</td>`;
                } else {
                    html +=`<td></td>`;
                }
                html += `<td>${val.content} </td>`;
                html += `<td>${val.desc} </td>`;
                html += `<td> 
                    <a href="/admin/update-game/${val._id}" class="edit" title="Edit" data-toggle="tooltip">
                        <i class="fas fa-edit"></i>
                    </a>
                    <a href="" class="delete" title="Delete" data-toggle="tooltip">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                </td>`;
                html += "</tr>";
            });
            $('#tbody').append(html)
        }
    })
    .catch(function (error) {
        console.log(error.message)
    })
}