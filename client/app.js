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

        //go thru array and make chirps for each with click events
        chirparray.forEach((chirp, index) => {
            let user = chirp.username;
            let chirpstring = chirp.chirp;
            let p = $(`<p><span class"chirpclick" id="clickablechirp${chirp.id}"><b>${user}</b>: ${chirpstring}</span> <button type="button" id="delbutton${chirp.id}" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button></p>`);
            $('#chirpcontainer').append(p);

            //Add Delete button
            $(`#delbutton${chirp.id}`).click(() => {
                $.ajax({
                    type: "DELETE",
                    url: (`api/chirps/${chirp.id}`)
                }).then(() => getChirps());
            })

            //click listener for chirp in timeline
            $(`#clickablechirp${chirp.id}`).click(() => {
                //create new modal
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
                
                //add modal to container
                $('#chirpcontainer').append(newmodal);

                //toggle modal to show
                $(`#chirpModal${chirp.id}`).modal('show');

                //logic for save changes button in modal
                $(`#changebutton${chirp.id}`).click(() => {
                    let newchirp = {
                        username: $(`#usernamemodal${chirp.id}`).val(),
                        chirp: $(`#chirpmodal${chirp.id}`).val()
                    };
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

//add new chirp from text fields
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
            //reload timeline when post is done with new chirp
            getChirps();
            //reset input fields after new chirp submittion
            $('#username').val("");
            $('#chirp').val("");
        });
})