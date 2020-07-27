$(function(){
	/* Fixed Header */
	function checkScrollPos(scrollPos, point){
		if(scrollPos > point){
			header.addClass("fixed");
		}
		else{
			header.removeClass("fixed");
		}
	}
	let header = $(".header");
	let headerH = $(".header").innerHeight()

	let scrollPos = $(this).scrollTop();
	checkScrollPos(scrollPos, headerH)

	$(window).on("scroll resize", function(){
		scrollPos = $(this).scrollTop();
		checkScrollPos(scrollPos, headerH)
	});



	/* Smooth scroll */
	$("[data-scroll]").on("click", function(event){
		event.preventDefault();

		let elementId = $(this).data('scroll');
		let elementOffSet = $(elementId).offset().top;

		$("html, body").animate({
			scrollTop:elementOffSet-10
		}, 600);
	});

	/*$(".smoothie__item").on("click", function(event){
		event.preventDefault();
		let data_id = $(this).data("id");
		console.log(data_id);
		$(".btn-buy").hide();
	});*/




	/***** Cart *****/

	/* Recovery session */
	function recovery_session(){
		var cart = JSON.parse(localStorage.getItem('cart'))
		if (cart === null){
			cart = {} /* id:{value, price, name}*/
		}
		return cart
	}
	/*for (var key of Object.keys(localStorage)){
		cart[key] = localStorage[key]
	}*/

	let cart = recovery_session()
	let html__basket_count = document.querySelector('.basket__count')
	let btns_buy = document.querySelectorAll('.btn-buy')

	/*Increase function */
	function cart_save(){
		var cart_json = JSON.stringify(cart)
		localStorage.setItem('cart', cart_json)		
	}

	function cart_add(id, price, name, value=1){
		if (cart.hasOwnProperty(id)){
			cart_increase(id) /*saving inside of function*/ 
			cart_render()
		}
		else{
			cart[id] = [value, price, name]
			cart_render()
			cart_save()
		}
		console.log(cart)
	}

	function cart_increase(id){
		cart[id][0] += 1
		cart_save()
	}

	function cart_render(){
		var cart_amount = 0
		for (var i in cart){
			cart_amount += Number(cart[i][0])
		}
		html__basket_count.innerText = cart_amount
	}
	
	function cart_render_again(){
		var basket_count = Number(html__basket_count.innerText)
		html__basket_count.innerText = basket_count++		
	}


	cart_render()

	for (let btn_buy of btns_buy){
		btn_buy.addEventListener('click', function(elem){
			elem.preventDefault()
			cart_add(btn_buy.dataset.id, btn_buy.dataset.price, btn_buy.dataset.name)
		})
	}





	/* Reduce function 
	function reduce_function(id){
		if (cart[id] <= 0){
			remove_function(id);
		}
		cart[id]--;
		render_cart_function();
	}

	/* Remove function 
	function remove_function(id){
		delete cart[id];
		render_cart_function();
	}

	/* Render_cart function
	function render_cart_function(){
		console.log(cart)
	}

	document.onclick = event => {
		if (event.target.classList.contains('increase')){
			increase_function(event.target.dataset.id);
		}
		if (event.target.classList.contains('reduce')){
			reduce_function(event.target.dataset.id);
		}
	};*/
})