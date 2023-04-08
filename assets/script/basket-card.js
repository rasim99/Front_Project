let btnAdd = document.querySelectorAll(".addcard");
let BasketCount = document.getElementById("countbasket");
btnAdd.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();
    //    console.log(btn.parentNode.parentNode.firstElementChild.nextElementSibling);
        let id = btn.parentNode.parentNode.getAttribute("data-id");
        if (localStorage.getItem("basket") == null) {
            localStorage.setItem("basket", JSON.stringify([]))
        }
        let basketArr = JSON.parse(localStorage.getItem("basket"));
        let existBasket = basketArr.find(f => f.id == id)

        if (existBasket == undefined) {
            basketArr.push({
                id: id,
                imgUrl: btn.parentNode.parentNode.firstElementChild.nextElementSibling.getAttribute("src"),
                name: btn.parentNode.firstElementChild.innerText,
                price: btn.previousElementSibling.lastElementChild.innerText,
                count: 1
            })
        }
        else {
            existBasket.count++;
        }

        localStorage.setItem("basket", JSON.stringify(basketArr));
        CaculateCount();

    })

})

function CaculateCount() {
    if (localStorage.getItem("basket") != null) {
        let arr = JSON.parse(localStorage.getItem("basket"));
        let sum = 0;
        arr.forEach((p) => {
            sum += p.count;
            BasketCount.innerHTML = sum
        })
    }
}

CaculateCount();