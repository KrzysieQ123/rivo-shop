const navbarButtonElem = document.querySelector('.navbar-dropdown');
const navbarClose = document.querySelector('.navbar-close');

navbarButtonElem.addEventListener('click', (evt) => {
	const navbarWrapper = document.querySelector('.navbar-wrapper');
	evt.preventDefault();
	if(!navbarWrapper.classList.contains('active')) navbarWrapper.classList.add('active');
});

navbarClose.addEventListener('click', (evt) => {
	const navbarWrapper = document.querySelector('.navbar-wrapper');
	evt.preventDefault();
	if(navbarWrapper.classList.contains('active')) navbarWrapper.classList.remove('active');
});

class StoreAPI {
	constructor() {
		this.endpoint = "https://fakestoreapi.com/";
		this.lastId = 0;
		this.initListeners();
	}

	initListeners() {
		const seeAll = document.querySelector('#see-all');
		seeAll.addEventListener('click', (evt) => {
			evt.preventDefault();
			if(!this.data) return;
			this.renderProducts(this.data, 6);
			seeAll.remove();
		});
	}

	getProducts() {
		fetch(this.endpoint + `products`)
		.then(res => res.json()).then(data => {
			this.data = data;
			document.querySelector('.loading').classList.add('hidden');
			this.renderProducts(this.data);
		});
	}

	renderProducts(data, limit = 3) {
		const productsContainer = document.querySelector('.products');
		let countLimit = this.lastId+limit;
		for(let i = this.lastId; i < countLimit && i < data.length; i++) {
			if(data[i]) {
				productsContainer.innerHTML += `
				<div class="product-item">
					<div class="product-image">
						<img src="${data[i].image}" alt="${data[i].title}" />
					</div>
					<div class="product-content">
						<span class="product-name">${data[i].title}</span>
						<div class="product-info">
							<span>$${data[i].price}</span>
							<div class="divider"></div>
							<span>${data[i].rating.rate} <i class="fi fi-rr-star"></i></span>
						</div>
					</div>
				</div>`;
				this.lastId = data[i].id;
			}
		}
	}
}

const API = new StoreAPI();
API.getProducts();