
    var size = 120
    let content = document.getElementsByClassName('news__text_item');

    console.log()

    for (key in content) {
        if (content[key].innerHTML) {
            if (content[key].innerHTML.length > size) {
                content[key].innerHTML = content[key].innerHTML.slice(0, size) + ". . ."
            }
        } else {
            break;
        }
    }