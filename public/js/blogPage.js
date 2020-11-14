
$(function () {

    let cats = $(".news__cat");
        for(let i = 0 ; i < cats.length; i++){
            const textContent = $(cats[i]).text()
            console.log(textContent)
            $(cats[i]).text(textContent.replace(/,/gi , ' / '))
            console.log( $(cats[i]).text())
        }

});