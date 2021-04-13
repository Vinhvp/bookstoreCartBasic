let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Cha già cha nghèo',
        tag: 'rich-1',
        price: 7,
        inCart: 0
    },
    {
        name: 'Đừng bao giờ đi ăn một mình',
        tag: 'not-eat',
        price: 5,
        inCart: 0
    },
    {
        name: 'Đắc nhân tâm',
        tag: 'dnt-1',
        price: 9,
        inCart: 0
    },
    {
        name: 'Người tối giản',
        tag: 'nguoi-toi-gian',
        price: 5,
        inCart: 0
    },
]

for(let i=0; i< carts.length; i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
    
}
function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            };
        }
        cartItems[product.tag].inCart +=1; 
        
    }else{
        product.inCart = 1;
        cartItems = {
                [product.tag]: product
            };
       
    }
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem("totalCost");

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else{
        localStorage.setItem("totalCost",product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    
    let productContainer = document.querySelector(".products");
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
          
            productContainer.innerHTML += `
                <div class="product">
                    <i class="far fa-window-close"></i>  
                    <img src="./images/${item.tag}.jpg" alt="">
                    <span>${item.name}</span>
                </div>
                <div class="price">${item.price},00</div>
                <div class="quantity">
                    <i class="fas fa-minus-circle"></i>
                    <span>${item.inCart}</span>
                    <i class="fas fa-plus-circle"></i>
                </div>
                <div class="total">
                    <span>${item.inCart*item.price},00</span>
                </div>
            `;
        });
        productContainer.innerHTML +=`
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${localStorage.getItem("totalCost")},00
                </h4>
            </div>
        
        `;

    }
    
}
onLoadCartNumbers();
displayCart();