$(document).ready(() => {
    getChirps();
})

let getChirps = () => {
    $('#chirpcontainer').empty();
    $.get('http://localhost:3000/api/chirps/', (data) => {
        // let chirparray = Object.values(data);
        let chirparray = Object.keys(data).map(id => {
            return {
                id,
                username: data[id].username,
                chirp: data[id].chirp
            }
        });
        chirparray.pop();
        chirparray.forEach((chirp, index) => {
            console.log(chirp);
            let user = chirp.username;
            let chirpstring = chirp.chirp;

            let p = $(`<p><span class"chirpclick" id="clickablechirp${chirp.id}"><b>${user}</b>: ${chirpstring}</span> <button type="button" id="delbutton${chirp.id}" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button></p>`);
            $('#chirpcontainer').append(p);


            //Add Delete button
            $(`#delbutton${chirp.id}`).click(() => {
                console.log('in delbutton click');
                $.ajax({
                    type: "DELETE",
                    url: (`api/chirps/${chirp.id}`)
                }).then(() => getChirps());
            })

            $(`#clickablechirp${chirp.id}`).click(() => {
                let newmodal = (`<div class="modal fade" id="chirpModal${chirp.id}" tabindex="-1" role="dialog" aria-labelledby="chirpModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="chirpModalLabel">Change Chirp Tool</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    <input class="form-control mb-2" id="usernamemodal${chirp.id}" type="text" placeholder="New Username">
                    <input class="form-control mb-2" id="chirpmodal${chirp.id}" type="text" placeholder="New Chirp">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="changebutton${chirp.id}">Save changes</button>
                    </div>
                    </div>
                    </div>
                    </div>`);
                $('#chirpcontainer').append(newmodal);
                console.log('click tested');
                $(`#chirpModal${chirp.id}`).modal('show');
                $(`#changebutton${chirp.id}`).click(() => {
                    let newchirp = {
                        username: $(`#usernamemodal${chirp.id}`).val(),
                        chirp: $(`#chirpmodal${chirp.id}`).val()
                    };
                    console.log(newchirp);
                    $.ajax({
                        type: "PUT",
                        url: (`api/chirps/${chirp.id}`),
                        data: newchirp
                    })
                    $(`#chirpModal${chirp.id}`).modal('hide');
                    location.reload();
                })
            })
        })
    })
};

$('#addchirpbutton').click(() => {
    let user = $('#username').val();
    let chirp = $('#chirp').val();
    let newchirpobj = {
        username: user,
        chirp
    };
    let ojbtojson = JSON.stringify(newchirpobj);
    $.post('http://localhost:3000/api/chirps/', newchirpobj)
        .then(() => {
            getChirps();
            $('#username').val("");
            $('#chirp').val("");
        });
})