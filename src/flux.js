const getState = ({ getStore, getActions, setStore }) => {

  return {
    store: {
      /////URL para la conexion
      baseURLPost: "http://ec2-54-183-147-121.us-west-1.compute.amazonaws.com:8585",
      Token_de_acceso: '22636ca690d932cc523065f4b3dea68ed3184bdb', 
      baseURL: "http://ec2-54-183-147-121.us-west-1.compute.amazonaws.com:8383",
      url: "/v2/markets/1/collection/2/market_info.json",

      
   

   
    },

    actions: {
   

// Para agregar las variables 

      handlingInputs: e => {
        e.preventDefault();
        console.log(e.target.name);
        console.log(e.target.value);
        setStore({
          [e.target.name]: e.target.value
        });
      },

// Funcion para arreglar el producto de acuerdo al requerimiento. 

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



// Funcion para hacer el GET 

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
      
      
    }
  };
};

export default getState;
