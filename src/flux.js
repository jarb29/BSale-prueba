const getState = ({ getStore, getActions, setStore }) => {
  return {
    // base datos Angel
    store: {
      /////URL
      baseURLPost: "https://cors-anywhere.herokuapp.com/http://ec2-54-183-147-121.us-west-1.compute.amazonaws.com:8585",
      Token_de_acceso: '22636ca690d932cc523065f4b3dea68ed3184bdb', 
      baseURL: "https://cors-anywhere.herokuapp.com/http://ec2-54-183-147-121.us-west-1.compute.amazonaws.com:8383",
      url: "/v2/markets/1/collection/2/market_info.json",
      urlPost: "/v1/cart.json",


       // Carrito
       carrito: [],
       totalCarrito: [],
      
       // retorno productos comprados
       productosActualizados: [],

       // Variables del retorno del GET directo de la URL
       tiendaSeleccionada: [],
       tiendatotal: [],

       // Variables del retorno del POST directo de la URL
       productoAgregado:[],
       erro:[],
       
       // Variable de envio de compra
       cartDetails: [],
    
    },

    actions: {
      // autenticacion


// Funcion para agregar la entradas de variables
      handlingInputs: e => {
        e.preventDefault();
        console.log(e.target.name);
        console.log(e.target.value);
        setStore({
          [e.target.name]: e.target.value
        });
      },





// Funcion para hacer el GET
      store: (e, num) => {
        const store = getStore();
        if (num === undefined) { num = 2}
        const { baseURL } = store;
        let url = `/v2/markets/1/collection/${num}/market_info.json`
        getActions().tienda(baseURL, url );
        
      },
			tienda: async (baseURL, url) => {			
        const store = getStore();
        const { Token_de_acceso } = store;
				const resp = await fetch(baseURL + url, {  
          method: 'GET',
					headers: {
            'access_token': Token_de_acceso,
					},
        })
        const dato = await resp.json();
        console.log(dato, "lo que esta llegando")
				if (dato.msg) {
					setStore({
						error: dato
					})
				} else {
					setStore({
						tiendaSeleccionada: dato,
						tiendatotal: dato,
					});
				}
      },
      
// Logica para el carrito 
//funcion para garegar itenes al carrito desde la tienda
      
      addToCart: producto => {
        const store = getStore();
        console.log(producto, " lo que llega al carro")

				let { carrito } = store;
				let existe = false;
				let newtotalCarrito = 0;
				let newCarrito = carrito.map((item) => {
					if (JSON.stringify(item.producto) === JSON.stringify(producto)) {
						item.cantidad += 1;
						existe = true;
						return item;
					}
					return item;
				})
				if (!existe) {
					newCarrito.push({
						id: carrito.length + 1,
						producto: producto,
						cantidad: 1
					})
				}
				newCarrito.map(item => {
          console.log(item, "item en el carro ")
					return newtotalCarrito = newtotalCarrito + (item.cantidad * item.producto.variant.finalPrice);
				})
				setStore({
					carrito: newCarrito,
					totalCarrito: newtotalCarrito
				})
      },

// Funcion para agregar itenes desde el carrito

      addToCartI: producto => {
        const store = getStore();
        console.log(producto, "que esta pasando cuando sumo")

				let { carrito } = store;
				let existe = false;
				let newtotalCarrito = 0;

				let newCarrito = carrito.map((item) => {
          console.log(item.producto, "item en flux");
          console.log(producto.producto, "producto en flux")
					if (JSON.stringify(item.producto) === JSON.stringify(producto.producto)) {
						item.cantidad += 1;
						existe = true;
						return item;
					}
					return item;
				})
				if (!existe) {
					newCarrito.push({
						id: carrito.length + 1,
						producto: producto,
						cantidad: 1
					})
				}
				newCarrito.map(item => {
					return newtotalCarrito = newtotalCarrito + (item.cantidad * item.producto.variant.finalPrice);
				})
				setStore({
					carrito: newCarrito,
					totalCarrito: newtotalCarrito
				})
      },
      
// Funcion para Borrar itenes desde el carrito

      addToCartII: producto => {
        const store = getStore();

				let { carrito } = store;
        let existe = false;
				let newtotalCarrito = 0;
				let newCarrito = carrito.map((item) => {
					if (JSON.stringify(item.producto) === JSON.stringify(producto.producto)) {
						item.cantidad -= 1;
            existe = true;
						return item;
					}
					return item;
        })
        const isCero = (element) => element.cantidad === 0;
        let index = carrito.findIndex(isCero);

        
        if (index !==-1) {
          newCarrito.splice(index, 1)
        }
				newCarrito.map(item => {
					return newtotalCarrito = newtotalCarrito + (item.cantidad * item.producto.variant.finalPrice);
				})
				setStore({
					carrito: newCarrito,
					totalCarrito: newtotalCarrito
				})
      },
      
  // Compra de Productos y envia a la API
			productoComprado: (e) => {
        const store = getStore();
        const { cartDetails, baseURLPost, urlPost } = store;
				store.carrito.map(ItemCarrito => {
          return(
              cartDetails.push(
              {"quantity": ItemCarrito.cantidad, 
              "unitValue": ItemCarrito.producto.variant.finalPrice, 
             "idVarianteProducto":ItemCarrito.producto.variant.id})
          )
        });

        let data ={
          "cartDetails": cartDetails
        }

				getActions().productosComprados(baseURLPost, urlPost, data );
			},

			productosComprados: async (baseURLPost, urlPost, data) => {
        const store = getStore();
        const { Token_de_acceso } = store;
        const resp = await fetch(baseURLPost + urlPost, {
          method: 'POST',
          body: JSON.stringify(data),      
					headers: {
            'access_token': Token_de_acceso,
					}
        })
        const info = await resp.json();
        console.log(info, "retorno del producto")
        if (info) {
          setStore({
            error: null,
            productoAgregado: info,
            carrito: [],
            totalCarrito: [],
          })     
        }
      },
    }
  };
};

export default getState;
