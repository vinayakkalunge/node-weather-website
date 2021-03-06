const weatherForm = document.querySelector('form')      //document.querySelector({element name}) get the first html element that it founds
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')  //Note: for accessing html element: by id - use #{id value}, by class - use .{classname}
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
                                            //Note: Default behavior of form is to completely reload the page  
    event.preventDefault()                  //by setting this we've A   `Q1told browser that we're gonna handle everything, it doesn't need to do what it usually does.
    
    const location = search.value           //get value from the html element

    messageOne.textContent = 'Loading...'   //assigns value to html element
    messageTwo.textContent = ''

    const url = '/weather?address=' + location

    fetch(url).then((response) => {
        response.json().then( (data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forcast
            }  
        })
    })
})