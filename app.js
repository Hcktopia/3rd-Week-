$(document).ready(function () {
	// Global state for the order summary
	var orderSummary = {
		Kabob: 0,
		Manto: 0,
		Qabuli: 0,
		Bolani: 0,
		Bamya: 0,
		Karahi: 0,
	}

	// Function to update the order summary
	function updateOrderSummary() {
		var totalPrice = 0
		$('#order-list').empty()

		Object.keys(orderSummary).forEach(function (item) {
			if (orderSummary[item] > 0) {
				$('#order-list').append(
					'<li>' + item + ': ' + orderSummary[item] + '</li>'
				)
				totalPrice += orderSummary[item] * menu[item].price
			}
		})

		$('#total-price').text(
			'Total Price: $' + (Math.round(totalPrice * 100) / 100).toString()
		)
	}

	// Function to handle adding an item to the order
	function addItem(item) {
		if (menu[item].inStock > 0) {
			orderSummary[item]++
			menu[item].inStock--

			updateOrderSummary()
		} else {
			alert('Sorry, this item is out of stock.')
		}
	}

	// Code for initializing the menu items and their buttons
	var menu = {
		Kabob: {
			inStock: 6,
			price: 11.5,
			details: ['rice', 'salad', 'bread', 'yogurt'],
		},
		Manto: {
			inStock: 3,
			price: 7.25,
			details: [],
		},
		Qabuli: {
			inStock: 1,
			price: 16.8,
			details: ['salad', 'chilis', 'bread'],
		},
		Bolani: {
			inStock: 4,
			price: 4.5,
			details: ['chutney'],
		},
		Bamya: {
			inStock: 0,
			price: 12.0,
			details: ['chutney'],
		},
		Karahi: {
			inStock: 11,
			price: 15.5,
			details: ['rice', 'bread', 'yogurt'],
		},
	}

	// Dynamically create the food menu items
	Object.keys(menu).forEach(function (item) {
		var foodItem = $('<div>').addClass('food-item')
		var title = $('<h3>').text(item)
		var stock = $('<p>').text('In Stock: ' + menu[item].inStock)
		var price = $('<p>').text(
			'Price: $' + (Math.round(menu[item].price * 100) / 100).toString()
		)
		var details = $('<foods>').text(item)
		var addButton = $('<button>').text('Add')

		
		var removeButton = $('<button>').text('Remove')


		// Use a separate function to create a new scope for each iteration
		addButton.on('click', function () {
			addItem(item)
		})

		removeButton.on('click', function () {
			if (orderSummary[item]) {
				
			} else {
				alert('You have not added anything to your order.')
			}
		})

		foodItem.append(title, stock, price, addButton, removeButton)
		$('#food-menu').append(foodItem)
	})

	// Initial update of the order summary
	updateOrderSummary()
})
