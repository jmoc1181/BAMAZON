var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(err){ 
	readProducts();
	orderProducts();

}); 



function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
     for (var i = 0; i < res.length; i++) {
          console.log("ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: " + res[i].price);
        }
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
