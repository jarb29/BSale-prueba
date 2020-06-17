const getState = ({ getStore, getActions, setStore }) => {
  return {
    // base datos Angel
    store: {
      /////URL
      //baseURL: "http://ec2-54-183-147-121.us-west-1.compute.amazonaws.com:8585",


      Token_de_acceso: '22636ca690d932cc523065f4b3dea68ed3184bdb', 
      baseURL: "http://ec2-54-183-147-121.us-west-1.compute.amazonaws.com:8383",
      url: "/v2/markets/1/collection/2/market_info.json",

      
      // claves de usuario
      nombre: "",
      apellido: "",
      email: "",
      telefono:"",
      clave: "",
      currentUser: null,
      isAuthenticated: false,
      error: null,  
       // Nombre Producto

       avatar: '',
       nombreProducto: '',
       precio: '',
       categoria: '',
       descripcion: '',
       // Productos para la tienda
       tiendaSeleccionada: [],
       tiendatotal: [],
       tiendaSalsa: [],
       tiendatotalsalsa: [],

       // Carrito
       carrito: [],
       totalCarrito: [],
       
       // Productos comprados
       ItemProductoCompradoId: [],
       CantidaProductoComprado: [],
       precioProductoSeleccionado: [],
       cantidadProductoSeleccionado: [],
       // retorno productos comprados
       productosActualizados: [],

       // datos del retorno para el admintrador
       factura: [],
       detalleFactura: [],
    },

    actions: {
      // autenticacion
      isAuthenticated: () => {
        if (sessionStorage.getItem("currentUser")) {
          // Restaura el contenido al campo de texto
          let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
          let isAuthenticated = sessionStorage.getItem("isAuthenticated");
          setStore({
            currentUser: currentUser,
            isAuthenticated: isAuthenticated
          });
        }
      },

// inputs
      handlingInputs: e => {
        e.preventDefault();
        console.log(e.target.name);
        console.log(e.target.value);
        setStore({
          [e.target.name]: e.target.value
        });
      },
// imagen
        handleChangeFile: e => {
          e.preventDefault();
          console.log(e, "foto")
          setStore({
            avatar: e.target.files[0]
          })
        },

// Registro usuario

      registroUsuario: (e, history) => {
        e.preventDefault();
        const store = getStore();

        let data = {
          nombre: store.nombre,
          email: store.email,
          clave: store.clave,
          apellido: store.apellido,
          telefono: store.telefono,
        };
        console.log(data, "datos en el flux");

        getActions().registroUsuarioEmpresa("/api/tienda/register", data, history);
      },

      registroUsuarioEmpresa: async (url, data, history) => {
        const store = getStore();
        const { baseURL } = store;
        const resp = await fetch(baseURL + url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const dato = await resp.json();
        console.log(dato, "del retorno del back");
        if (dato.msg) {
          setStore({
            error: dato
          });
        } else {
          setStore({
            currentUser: dato,
            isAuthenticated: true,
            error: null
          });
          sessionStorage.setItem("currentUser", JSON.stringify(dato));
          sessionStorage.setItem("isAuthenticated", true);
          history.push("/e-commerce");
        }
      },

// Login usuario
      logingUsuario: (e, history) => {
        //e.preventDefault();

        const store = getStore();
        let data = {
          email: store.email,
          clave: store.clave
        };

        getActions().loging("/api/tienda/loging", data, history);
      },

      loging: async (url, data, history) => {
        const store = getStore();
        const { baseURL } = store;
        const resp = await fetch(baseURL + url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const dato = await resp.json();
        console.log(dato, "retorno del loging");
        if (dato.msg) {
          setStore({
            error: dato
          });
        } else {
          setStore({
            currentUser: dato,
            isAuthenticated: true,
            error: null
          });
          sessionStorage.setItem("currentUser", JSON.stringify(dato));
          sessionStorage.setItem("isAuthenticated", true);
          history.push("/e-commerce");
        }
      },

      // Login out
      logout: (e, history) => {
        console.log(history, "historia al logout")
        sessionStorage.removeItem("currentUser");
        sessionStorage.removeItem("isAuthenticated");
        setStore({
          currentUser: null,
          isAuthenticated: false
        });
        history.push("/landing-page");
      },

      // Agregando Productos

      handleSubmitProducto: (e, history) => {
				e.preventDefault();
				const store = getStore();
				let formData = new FormData();
				formData.append("nombreProducto", store.nombreProducto);
				formData.append("descripcion", store.descripcion);
				formData.append("precio", store.precio);
				formData.append("categoria", store.categoria);
				if (store.avatar !== ' ') {
					formData.append("avatar", store.avatar)

				} else { setStore({ error: { "msg": "Por favor agregar foto" } }) };
				console.log(store.avatar);



				getActions().register('/api/admi/administrador', formData, history)
			},

			register: async (url, data, history) => {
				const store = getStore();
        const { baseURL } = store;
        console.log(data, "para ver")
				const resp = await fetch(baseURL + url, {
					method: 'POST',
					body: data
				})
				const info = await resp.json();
				console.log(info)

				if (info.msg) {
					setStore({
						error: null,
						productoAgregado: info.msg,
						isAuthenticated: true,
					})
          sessionStorage.getItem('isAuthenticated', true)
          
        }
        history.push("/administrador");
				console.log(store.productoAgregado)
      },



// Tienda salsas
      store: (e) => {
        const store = getStore();
        const { baseURL, url } = store;
        getActions().tienda(baseURL, url );
        console.log(baseURL + url, "para ver que queda")
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
				console.log(dato, "veamos que llega del examen")
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
      
      salsas: (e, id) => {

				getActions().tiendaSalsa(`/api/tienda/salsas`);
			},

			tiendaSalsa: async (url) => {

				const store = getStore();
				const { baseURL } = store;
				const resp = await fetch(baseURL + url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},

				})
				const dato = await resp.json();
				console.log(dato)
				if (dato.msg) {
					setStore({
						error: dato
					})
				} else {
					setStore({
						tiendaSalsa: dato,
						tiendatotalsalsa: dato,
					});
				}
      },

      // Logica para el carrito
      
      addToCart: producto => {
        const store = getStore();

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
					return newtotalCarrito = newtotalCarrito + (item.cantidad * item.producto.precio);
				})
				setStore({
					carrito: newCarrito,
					totalCarrito: newtotalCarrito
				})
      },
      // Agregando items desde el carrito

      addToCartI: producto => {
        const store = getStore();
        console.log(producto, "que esta pasando")

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
					return newtotalCarrito = newtotalCarrito + (item.cantidad * item.producto.precio);
				})
				setStore({
					carrito: newCarrito,
					totalCarrito: newtotalCarrito
				})
      },
      
      // Borrando itenes desde el carrito

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
					return newtotalCarrito = newtotalCarrito + (item.cantidad * item.producto.precio);
				})
				setStore({
					carrito: newCarrito,
					totalCarrito: newtotalCarrito
				})
      },
      
      // Compra de Productos


			productoComprado: (e, history) => {
        const store = getStore();
        console.log(store.carrito, "cuando se va a comprar")

				store.carrito.map(ItemCarrito => {
							store.ItemProductoCompradoId.push(ItemCarrito.producto.id);
							store.CantidaProductoComprado.push(ItemCarrito.cantidad);
              store.precioProductoSeleccionado.push(ItemCarrito.producto.precio);							
					return ' '
        });
      

				let data = {
          
          
					"usuario_id": store.currentUser.tienda.id,
					"ItemProductoCompradoId": store.ItemProductoCompradoId,
					"CantidaProductoComprado": store.CantidaProductoComprado,
					"precioProductoSeleccionado": store.precioProductoSeleccionado,
					"totalFactura":store.totalCarrito,
					"usuarioActual":store.currentUser,

				}
				console.log(data, "comprado")


				getActions().productosComprados(`/api/tienda/checkout/`, data, history);
			},

			productosComprados: async (url, data, history) => {
				const store = getStore();
				const { baseURL } = store;
				const resp = await fetch(baseURL + url, {
					method: 'PUT',
					body: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				const dato = await resp.json();
				console.log(dato, )
				if (dato.msg) {

          setStore({
            productosActualizados: dato,
            carrito:[],
            totalCarrito:[]
          });
          console.log(history, "historia")
          history.push("/landing-page");
			
				} else {
          setStore({
						error: dato
					})
      
				}
      },


// Login administrador
      logingAdministrador: (e, history) => {
        //e.preventDefault();

        const store = getStore();
        let data = {
          email: store.email,
          clave: store.clave
        };

        getActions().logingAdmi("/api/admini/loging", data, history);
      },

      logingAdmi: async (url, data, history) => {
        const store = getStore();
        const { baseURL } = store;
        const resp = await fetch(baseURL + url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const dato = await resp.json();
        console.log(dato, "retorno del loging");
        if (dato.msg) {
          setStore({
            error: dato
          });
        } else {
          setStore({
            currentUser: dato,
            isAuthenticated: true,
            error: null
          });
          sessionStorage.setItem("currentUser", JSON.stringify(dato));
          sessionStorage.setItem("isAuthenticated", true);
          history.push("/administrador");
        }
      },


      // Registro usuario

      registroAdministrador: (e, history) => {
        e.preventDefault();
        const store = getStore();

        let data = {
          nombre: store.nombre,
          email: store.email,
          clave: store.clave,
          apellido: store.apellido,
          telefono: store.telefono,
        };
        console.log(data, "datos en el flux");

        getActions().registroUsuarioAdminidtrador("/api/administrador/register", data, history);
      },

      registroUsuarioAdminidtrador: async (url, data, history) => {
        const store = getStore();
        const { baseURL } = store;
        const resp = await fetch(baseURL + url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const dato = await resp.json();
        console.log(dato, "del retorno del back");
        if (dato.msg) {
          setStore({
            error: dato
          });
        } else {
          setStore({
            currentUser: dato,
            isAuthenticated: true,
            error: null
          });
          sessionStorage.setItem("currentUser", JSON.stringify(dato));
          sessionStorage.setItem("isAuthenticated", true);
          history.push("/administrador");
        }
      },

      orders: (e, id) => {

				getActions().tiendaOrders(`/api/admi/orders`);
			},

			tiendaOrders: async (url) => {

				const store = getStore();
				const { baseURL } = store;
				const resp = await fetch(baseURL + url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},

				})
				const dato = await resp.json();
				console.log(dato, "lo que regresa del back")
				if (dato.msg) {
					setStore({
						error: dato
					})
				} else {
					setStore({
						factura: dato[0],
						detalleFactura: dato[1],
					});
				}
      },



      
    }
  };
};

export default getState;
