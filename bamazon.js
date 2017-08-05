var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "root",
  database: "bamazonDB"
});

//the 
connection.connect(function(err){ 
	
	orderProducts();
	readProducts();

}); 



function readProducts() {
  console.log("Next you can choose the quantity.");
  connection.query("SELECT item_id, product_name, price FROM products", function(err, response) {
    if (err) throw err;
    // Log results of all the products 
     for (var i = 0; i < res.length; i++) {
          console.log("ID: " + ressponse[i].item_id + " || Product: " + response[i].product_name + " || Price: " + ressponse[i].price);
        }
  	});
}

function orderProducts() { 
inquirer.prompt ([
	{
		type: "input",
		name: "itemID",
		message: "What is the ID of the item that you would like to purchase?"
	},
	{
		type: "input",
		name: "quantity",
		message: "How many units would you like to buy?"
	}
	]).then(function(response) {

		var realID = response.id; 
		var id = parseInt(realID) -1; 
		var amount = parseInt(response.quantity); 

		connection.query("SELECT * FROM products", function(err, result) {

			var cost = result[id].price;
			var inStock = result[id].stock_qty;
			var stockUpdate = inStock - amount;

			//check if item is in stock
			if(inStock === 0 && amount > inStock) {
				console.log("out of stock!")
				orderProducts();

			}

		    else if(amount > inStock) {
				console.log("insufficient quantity");
				orderProducts();
			} 
			else {
				//total
				var total = amount * cost

				//update the database
				connection.query("UPDATE products SET ? WHERE ?", [
					{
						stock_qty: stockUpdate
					}, {
						item_id: trueID
					}
				]);

				console.log("Your purchase total is:  $" + total);

				//end the connection.
				connection.end();
			}
		});

	});

}







//creates the products in the database 
function createProduct() { 
	var query = connection.query(
		'insert into products set ?',

	{
		product_name: 'Comforter', 
		department_name: 'home and kitchen', 
		price: 44.99, 
		stock_qty: 900 
	},
	function(err, res) { 
		console.log(res.affectedRows + ' product inserted'); 
	}
	)
};
