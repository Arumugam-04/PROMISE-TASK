function element(tag, classname, id, text) {
    let tags = document.createElement(tag);
    tags.classList = classname;
    tags.id = id;
    tags.innerHTML = text;
    return tags;
}
let container = element("div", "container", "", "");
const h1 = element("h1", "text-center", "tittle", "Countries Weather Details");
const row = element("div", "row", "", "");

const response = fetch("https://restcountries.com/v3.1/all");
response.then((data) => data.json()).then((result) => {
    for (let i = 0; i < result.length; i++) {
        const col = document.createElement("div")
        col.classList = "col-sm-6 col-md-4 col-lg-4 col-x1-4"
        col.innerHTML = `
        <div class="card h-100">
        <div class="card-header">
        <h5 class="card-tittle text-center">${result[i].name.common} </h5>
        </div>
        <div class ="card-body">
        <div class="card-text text-centre">region: ${result[i].region} </div>
        <div class="card-text text-centre">Capital: ${result[i].capital} </div>
        <div class="card-text text-centre">country code: ${result[i].cca3} </div>
        <button class="btn btn-primary">click for Weather </button>
        </div>
        </div>
        `
        row.append(col);
    }
    let buttons = document.querySelectorAll("button");
    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            let latlng = result[index].laslng;
            let lat = latlng[0];
            let lon = latlng[1];
            let weatherApi = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bc47567f1e44df16c87b34d909e1065b`);
            weatherApi
                .then((data1) => data1.json())
                .then((res) => {
                    alert(
                        `Weather of ${result[index].name.common} is ${math.floor(
                            res.main.temp
                        )}C`
                    );


                });


        });

    });

});
container.append(row);
document.body.append(h1, container);
