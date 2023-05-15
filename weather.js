
class Weather {
    constructor({ max_temp, min_temp, valid_date, temp, weather: { description } }) {
        this.maxTemp = max_temp;
        this.minTemp = min_temp;
        this.date = valid_date;
        this.temp = temp;
        this.description = description
        this.img = this.setImg(description)
    }
    setImg(description) {
        switch (description) {
            case 'Few clouds':
                return 'https://media.istockphoto.com/id/1310822348/photo/deep-blue-sky-with-few-clouds.jpg?s=612x612&w=0&k=20&c=UxiIRlMol18myfu4oahDbOtTobwk-9j7djLGOkK6XTk=';
            case 'Broken clouds':
                return 'https://c8.alamy.com/comp/2DFJ9X4/white-broken-clouds-with-blue-sky-2DFJ9X4.jpg'
            case 'Clear Sky':
                return 'https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?cs=srgb&dl=pexels-francesco-ungaro-281260.jpg&fm=jpg'
            case 'Scattered clouds':
                return 'https://images.squarespace-cdn.com/content/v1/5d4c63022fdc0f0001a31f58/1565863502860-U636YZGVWKQJ47331LG6/cloud+dark+blue.jpg?format=2500w'
            default:
                return 'https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4='
        }
    }
}

let key = 'fdb9bf69ca944e7f8ce02b045f171a45'
const showPosition = async (position) => {
    let weathers = JSON.parse(localStorage.getItem('weathers'))
    let row = document.getElementById('row')
    if (!weathers) {
        console.log('fetched');
        let result = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${key}`)
        let { data } = await result.json()
        weathers = data
        localStorage.setItem('weathers', JSON.stringify(weathers))
    }
    let e = document.getElementById('loading-placeholder')
    e.classList.add('hide')
    weathers?.map(w => {
        const element = new Weather(w)
        let col = document.createElement('div')
        col.className = 'col-4'
        row.appendChild(col)
        let card = document.createElement('div')
        card.className = 'card'
        col.append(card)
        const cardBody = document.createElement('div')
        cardBody.className = 'card-body'
        card.append(cardBody)
        const img = document.createElement('img')
        img.src = element.img
        img.className = 'card-img-top'
        cardBody.append(img)
        const h5 = document.createElement('h5')
        h5.innerHTML = `Temp: ${Math.ceil(element.temp)}`
        h5.className = 'card-title'
        cardBody.append(h5)
        const h6 = document.createElement('h6')
        h6.className = 'card-subtitle mb-2 text-muted'
        h6.innerHTML = `Date: ${element.date}`
        cardBody.append(h6)
        let p = document.createElement('p')
        p.className = 'card-text'
        p.innerText = `min temp: ${Math.floor(element.minTemp)} - max temp: ${Math.ceil(element.maxTemp)}`
        cardBody.append(p)
        let pDescription = document.createElement('p')
        pDescription.className = 'card-text'
        pDescription.innerText = element.description
        cardBody.append(pDescription)
    })

}
navigator.geolocation?.getCurrentPosition(showPosition);