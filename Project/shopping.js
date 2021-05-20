var items = [
        ['Images/product1.jpg', 29.99, 'Red beanie'],
        ['Images/product1.jpg', 29.99, 'Green Beanie'],
        ['Images/product1.jpg', 29.99, 'Blue Beanie'],
        ['Images/product1.jpg', 24.99, 'Red Cap'],
        ['Images/product1.jpg', 24.99, 'Green Cap'],
        ['Images/product1.jpg', 24.99, 'Blue Cap']
    ];

    var cartItems = [];

    function run() {
        var main = document.getElementById('products');

        for (var i = 0; i < items.length; i++) {



            var ele = document.createElement('li');
            var pic = document.createElement('img');
            var price = document.createElement('h1');
            var desc = document.createElement('h2');
            var add = document.createElement('button');
            var typeBox = document.createElement('input');

            //push elements into html
            main.appendChild(ele);
            ele.appendChild(pic);
            ele.appendChild(price);
            ele.appendChild(desc);
            ele.appendChild(add);
            ele.appendChild(typeBox);

            //edit pushed elements info from array

            pic.src = items[i][0];
            price.innerHTML = '$' + items[i][1];
            desc.innerHTML = items[i][2];
            add.innerHTML = 'add';
            typeBox.type = 'number';

            typeBox.setAttribute("id", "input" + i);
            typeBox.value = 1;

            add.dataset.cartIndex = i;
            add.addEventListener('click', adding, false);
        }

        function adding(event) {
            const NUM = event.currentTarget.dataset.cartIndex;


            cartItems.push([items[NUM]]);
            cartItems[cartItems.length - 1][1] = Number(document.getElementById('input' + NUM).value);

            updateCart();
        }

    }
    var totalItems = 0;

    function updateCart() {
        var itemCounter = document.getElementById('itemCount');

        totalItems = 0;
        
         window.sessionStorage.setItem('cartItems' , JSON.stringify(cartItems));
        
        var data = sessionStorage.getItem('cartItems');
    data = JSON.parse(data);
    
    cartItems = data;
        
        
        for (var i = 0; i < cartItems.length; i++) {
            totalItems += cartItems[i][1];
        }
        
        
       
        
        
        itemCounter.innerHTML = totalItems;
    }

function loadCart() {
        var main = document.getElementById('cartProducts');

        
    var data = sessionStorage.getItem('cartItems');
    data = JSON.parse(data);
    
    cartItems = data;
    
    updateCart();
    
    
    for (var i = 0; i < cartItems.length; i++) {



            var ele = document.createElement('li');
            var pic = document.createElement('img');
            var price = document.createElement('h1');
            var desc = document.createElement('h2');
            var deleteItem = document.createElement('button');
            var amount = document.createElement('h2');
            var subtotal = document.createElement('h3');
            

            //push elements into html
            main.appendChild(ele);
            ele.appendChild(pic);
            ele.appendChild(price);
            ele.appendChild(desc);
            ele.appendChild(deleteItem);
            ele.appendChild(amount);
            ele.appendChild(subtotal);
            
            //edit pushed elements info from array

            pic.src = cartItems[i][0][0];
            price.innerHTML = '$' + cartItems[i][0][1];
            desc.innerHTML = cartItems[i][0][2];
            
            deleteItem.innerHTML = 'Delete';
            deleteItem.dataset.cartIndex = i;
            deleteItem.addEventListener('click', deleteMe, false);
            
             amount.innerHTML = cartItems[i][1];
             subtotal.innerHTML = '$' + cartItems[i][1] * cartItems[i][0][1];
        }
function deleteMe(){
    const NUM = event.currentTarget.dataset.cartIndex;
    
    delete cartItems[NUM];
    
    cartItems = cartItems.filter(item => item !== undefined);
    
    updateCart();
    loadCart();
    window.location.reload(true)
}


}