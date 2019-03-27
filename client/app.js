$(document).ready(() => {
    getChirps();
})

let getChirps = () => {
    $('#chirpcontainer').empty();
    $.get('http://localhost:3000/api/chirps/', (data) => {
        // let chirparray = Object.values(data);
        console.log(data);
        let chirparray = Object.keys(data).map(id => {
            return {
                id,
                username: data[id].username,
                chirp: data[id].chirp
            }
        });
        console.log(chirparray);
        chirparray.pop();
        console.log(chirparray);
        chirparray.forEach((chirp, index) => {
            console.log(chirp);
            let user = chirp.username;
            let chirpstring = chirp.chirp;
            let p = $(`<p><b>${user}</b>: ${chirpstring} <button type="button" id="delbutton${chirp.id}" class="close" aria-label="Close">
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

        })
    })
};

$('button').click(() => {
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
    });
})