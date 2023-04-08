let table = document.querySelector(".table");
// let totalP = document.getElementById("p");
let totalPricees1 = document.querySelector(".caculatePriceTotal1");
let totalPricees2 = document.querySelector(".caculatePriceTotal2");


let totalPriceDiv = document.querySelector(".total-price");
let basketCount = document.getElementById("countbasket");
let basketFooter = document.querySelector(".basket-footer");
let emptybasket = document.querySelector(".empty-basket")
let allItems = document.querySelector(".all-table-items");
let cardTotals = document.querySelector(".card-totals");
if (localStorage.getItem("basket") != null) {
    let basketArr = JSON.parse(localStorage.getItem("basket"))
    basketArr.forEach(product => {
        basketFooter.classList.remove("d-none")
        table.classList.remove("d-none");
        allItems.classList.remove("d-none")
        cardTotals.classList.remove("d-none")
        emptybasket.classList.add("d-none")

        let tr = `
        <tr>
        <td data-id=${product.id}> 
           <img src="${product.imgUrl}" alt="" width="140px" height="100px">
        </td>
        <td> ${product.name} </td>
         <td> ${product.price.slice(0, product.price.length - 1)}   </td>
       
           <td>
               <i class="fa-solid fa-minus"></i>
               </td>
                 <td>  ${product.count} </td>
               <td> <i class="fa-solid fa-plus"></i> <td>
            
                 <td> 
                    <span class="removeX">X</span>
                   </td>
        </tr>

        `
        table.lastElementChild.innerHTML += tr;

    });
    TotalPrice(basketArr)
    Plus(basketArr)
    Minus(basketArr)
    RemoveAll()
}


function TotalPrice(basketArr) {
    let sum = basketArr.reduce((prev, next) => {
        return prev + next.price.slice(1) * next.count;
    }, 0)
    totalPricees1.innerText = "$" + sum
    totalPricees2.innerText = "$" + sum

}


function RemoveAll() {
    let removeAllBtn = document.querySelector(".removeAllBtn");
    removeAllBtn.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("basket")
        allItems.classList.add("d-none")
        cardTotals.classList.add("d-none")
        table.classList.add("d-none");
        emptybasket.classList.remove("d-none")
    })
}
RemoveAll()


let removeIcon = document.querySelectorAll(".removeX")
removeIcon.forEach(r => {
    r.addEventListener("click", function () {
        let data = JSON.parse(localStorage.getItem("basket"));
        let id = r.parentNode.parentNode.firstElementChild.getAttribute("data-id");
        let existData = data.find(f => f.id == id);
        let dataIndex = data.indexOf(existData);
        data.splice(dataIndex, 1);
        localStorage.setItem("basket", JSON.stringify(data))
        if (data < 1) {
            localStorage.removeItem("basket")
            table.remove();
            totalPriceDiv.remove();
            emptybasket.classList.remove("d-none");
            allItems.classList.add("d-none")
            cardTotals.classList.add("d-none")
            basketCount.innerText = "0"
        }
        this.parentNode.parentNode.remove();
        TotalPrice(data);
        CaculateCount();
    })
})


function CaculateCount() {
    if (localStorage.getItem("basket") != null) {
        let arr = JSON.parse(localStorage.getItem("basket"));
        basketCount.innerText = arr.length
    }
}

CaculateCount();


function Plus(basketArr) {
    let items = JSON.parse(localStorage.getItem("basket"));
    let plusItem = document.querySelectorAll(".fa-plus")
    plusItem.forEach(plus => {
        plus.addEventListener("click", function () {

            let id = this.parentNode.parentNode.firstElementChild.getAttribute("data-id");
            let existitem = items.find(i => i.id == id);

            let itemCount = existitem.count
            itemCount++
            existitem.count = itemCount

            plus.parentNode.previousElementSibling.innerText = existitem.count
            TotalPrice(items)

        })
    })
}


function Minus(basketArr) {
    let items = JSON.parse(localStorage.getItem("basket"));
    let MinusItem = document.querySelectorAll(".fa-minus")
    MinusItem.forEach(minus => {
        minus.addEventListener("click", function () {

            let id = this.parentNode.parentNode.firstElementChild.getAttribute("data-id");
            console.log(id);
            let existitem = items.find(i => i.id == id);

            let itemCount = existitem.count
            if (itemCount > 0) {

                itemCount--
                existitem.count = itemCount

                minus.parentNode.nextElementSibling.innerText = existitem.count

            }
            else {
                alert("Basket Is Empty")
            }

            TotalPrice(items)

        })


    })
}