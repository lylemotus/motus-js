function post (body, endpoint) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(body));
}

function motusjs () {
    const userid = document.querySelector('meta[name="motustracker"]').content;

    if (userid) {
        console.log('MotusJS initialized')
    } else {
        console.log('MotusJS failed to run. Failed to find meta tag.')
    }

    document.querySelector('form.mt-clubos').addEventListener('submit', (e) => {
        const form = e.target
        const values = Object.values(form).reduce(
            (obj, field) => {
                obj[field.name] = field.value
                return obj
            }, {}
        )
    });
}

document.addEventListener("DOMContentLoaded", function (event) {
    motusjs()
});