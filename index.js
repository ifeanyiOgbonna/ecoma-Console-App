const rl = require("readline");

const r = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Welcome message
const welcome_message = "Welcome to my store, please enter the value inside the brackets [] to choose an action";
console.log(welcome_message);
console.log("")
// Message end

// Products
const products = [
  {
    name: "Bicycle",
    id: 1,
    description: "new fast racing bicycle",
    amount: 500,
    quantity: 20,
  },
  {
    name: "Hair Cream",
    id: 2,
    description: "Good Hair care cream",
    amount: 650,
    quantity: 10,
  },
  {
    name: "Television",
    id: 2,
    description: "Satisfying Television screen size",
    amount: 900,
    quantity: 10,
  },
  {
    name: "Laptop",
    id: 2,
    description: "Good looking Laptop",
    amount: 800,
    quantity: 10,
  },
  {
    name: "Electric Fan",
    id: 2,
    description: "Good styling Electric Fan",
    amount: 700,
    quantity: 10,
  },
  {
    name: "Electric Iron",
    id: 2,
    description: "Satisfying Electric Iron",
    amount: 630,
    quantity: 10,
  },
  {
    name: "furniture",
    id: 2,
    description: "styled furniture",
    amount: 700,
    quantity: 10,
  },
  {
    name: "Cloth",
    id: 2,
    description: "A Good Material cloth",
    amount: 70,
    quantity: 10,
  },
  {
    name: "Glasses",
    id: 2,
    description: "sparkling glasses",
    amount: 400,
    quantity: 10,
  },
  {
    name: "Refrigerator",
    id: 2,
    description: "new Refrigerator",
    amount: 700,
    quantity: 10,
  },
];
// Product end

// Customer cart
let cart = []


// user 
let user = null

// Display products to user
display_products()
// Display end

// Ask which product the user wants to buy
function display_product_answer(answer) {
  if (isNaN(answer)) {
    if(answer === "cart") {
        show_cart()
        return;
    } 
    console.log("Invalid Inputs")
    display_products()
   return;
  }
  const product = products[answer];
  if (!product) {
    console.log("No Product found based on your selection");
    ask_question(`Choose which product to buy: `, display_product_answer);
    ask_question(`where do you like to go next: `, check_out)
    return;
  }
  console.log("Name: " + product.name);
  console.log(`Price: N${product.amount}`);
  console.log(`Description: ${product.description}`);
  console.log(`Quantity: ${product.quantity}`);
  console.log(`[add]: Add to cart`);
  console.log(`[cart]: Show cart `);
  console.log(`[back]: Go back `);
  ask_question(`Choose which action to take next: `, function(answer) {
    what_to_do_next(answer, product)
  })
}


function what_to_do_next(answer, product){
    if(answer === "back") return display_products()
    if(answer === "add") return add_to_cart(product)
    if(answer === "cart") return show_cart(product)
    ask_question(`Choose which action to take next: `, function(answer) {
        what_to_do_next(answer, product)
      })
  }

// Write a function `add_to_cart` that receives product
function add_to_cart(p) {
    const product = cart.find(function(c) {
        return c.id === p.id
    })
    if(!product) {
        cart.push({...p, quantity: 1})
    } else {
        product.quantity = product.quantity + 1
        product.amount = product.amount + p.amount
    }
    console.log(p.name + " added to cart successfully");
    display_products()
}

// show_cart
function show_cart() {
    if(cart.length <= 0) console.log("Your cart is empty")
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        console.log(`Name: ${cart[i].name} - Quantity: ${cart[i].quantity} - Price: N${cart[i].amount}`);
        total = total + cart[i].amount;
    }

    // if there is an element inside the cart, print this
    if (cart.length >= 1){
       console.log("your total amount is N" + total);
        console.log("[check_out]: check out now");
    }
    
    console.log("[back]: Back to product list");
    ask_question(`where do you like to go next: `, check_out)
}

function check_out(answer) {
    if (answer === "back") return display_products()
    if (answer === "check_out") {
        if(!user){
            ask_question(`Please enter your name: `, buyers_name);
        } else {
            cart = []
            console.log("your order have been placed successfully and will be delivered to "+  user.address);
            // ask question to continue or terminate
    console.log("[yes]: continue shopping")
    console.log("[No]: Quit shopping")
    console.log("Do you want to continue")
    ask_question(`would you like to continue your shopping: `, (answer) => {
        if(answer === "yes") return display_products()
        process.exit(0)
    })
        }
        return 
    }
    console.log("Invalid input")
    show_cart()
}

function buyers_name(name) {
    if(!user) {
        user = {
            "name": name
        }
    }
    else {
        user.name = name
    }
    
    ask_question(`Please enter your shipping address: `,buyers_address);
}

function buyers_address(address) {
    user.address = address

    ask_question(`Please enter your phone number: `,buyer_phone);
}

function buyer_phone(number){
    user.phone = number
    cart = []
    console.log("your order have been placed successfully and will be delivered to "+  user.address);
    // ask question to continue or terminate
    console.log("[yes]: continue shopping")
    console.log("[No]: Quit shopping")
    console.log("Do you want to continue")
    ask_question(`would you like to continue your shopping: `, (answer) => {
        if(answer === "yes") return display_products()
        process.exit(0)
    })
    
}


function display_products() {
    for (let i = 0; i < products.length; i++) {
        console.log("["+i+"]: "+ products[i].name)
      }
      console.log("[cart]: Show cart");
      ask_question(`Choose which product to buy: `, display_product_answer);
}

function ask_question(question, cb) {
  r.question(question, (answer) => {
    cb(answer);
  });
}