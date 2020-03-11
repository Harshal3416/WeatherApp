console.log("Javascript File loaded")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message1')
const msg2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value;
    console.log("listening", location)

    msg1.textContent  = 'Loading....'
    msg2.textContent = ''
    
    fetch(`/weather?address=${location}`)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log("error", data.error)
                    msg1.textContent = data.error
                }
                else {
                    console.log(data)
                    msg1.textContent = data.location
                    msg2.textContent = data.forecast
                }
            })
        })


})