// Sección catálogo
// import { useState } from 'react'
import {useState, useEffect, useContext} from 'react';
import Producto from './Producto';
// import { CarritoContext } from '../Layout';
import { useCarrito } from '../hooks/useCarrito';


// sfc
const Catalogo = () => {

    const { carrito, setCarrito, agregarCarrito, eliminarDelCarrito } = useCarrito(); 


    const [productos, setProductos] = useState([]);

    const [nuevoProducto, setNuevoProducto] = useState({
        name:"",
        description:"",
        servicesList: {}
    });


    // const [filtro, setFiltro] = useState("");

    const [errores, setErrores] = useState("");
    // const [info, setInfo] = useState({
    //     count: 0,
    //     next: null,
    //     prev: null,
    //     pages: 0
    // });
        
    const getProductos = async () => {
        try {
            const respuesta= await fetch('/backend/API/v1/productos.JSON');
            const objeto = await respuesta.json();
            setProductos(objeto.results);
        }
        catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    useEffect(() => {
        
        getProductos();
        
    }, []);


    const estaEnCarrito = (producto) => {
        return carrito.some(item => item.name === producto.name);
    };

    

    const handleChange = (e) => {
        let {name, value} = e.target;


        if(e.target.type == "checkbox"){
            value = e.target.checked;
            console.log("Checkbox value es:", value);
        }

        // setFormData({ ...formData, [name]:value });
        setFormData( prevData => ({ ...prevData, [name]: value}));

        // Limpiar error cuando el usuario empieza a escribir/seleccionar
        setErrores( prevErrores => ({ ...prevErrores, [name]: ""}))

    }
    
    return ( 
            <>
            <h2>Estoy en el Catálogo</h2>
            <ul className='GridProductos'>

                    {productos.map((producto) => (
                    <li key={producto.name} >
                        <div className={`ProductContainer`}>
                        <p>{producto.name}</p>
                        <p>{producto.description}</p>
                        {/* <p>Servicios:</p> */}
                        
                        <ul>
                            {producto.servicesList.map((service, index) => (
                                <li key={index}>
                                    {service}
                                </li>
                            ))}
                        </ul>

                            {/* botón del carrito */}
                            <button onClick={() => {
                                if (estaEnCarrito(producto)) {
                                    eliminarDelCarrito(producto);
                                } else {
                                    agregarCarrito(producto);
                                }
                            }}>
                                {estaEnCarrito(producto) ? "Eliminar del Carrito" : "Añadir al Carrito"}
                            </button>
                            
                    {/* <p>{producto.type}</p> */}
                    {/* <p>{producto.price}</p> */}

                    </div>
                    </li>
                    ))}
                
            </ul>
            </>
    
    );
}
 
export default Catalogo;