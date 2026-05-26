const botonesCarrito = document.querySelectorAll(".btn-agregar-carrito");
const contadorCarrito = document.getElementById("contador-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

actualizarContador();

botonesCarrito.forEach((boton) => {
  boton.addEventListener("click", () => {
    const producto = {
      nombre: boton.dataset.nombre,
      precio: Number(boton.dataset.precio),
      cantidad: 1
    };

    const productoExistente = carrito.find(
      (item) => item.nombre === producto.nombre
    );

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContador();

    boton.innerHTML = `<i class="bi bi-check-circle"></i> Agregado`;
    boton.classList.add("agregado");

    setTimeout(() => {
      boton.innerHTML = `<i class="bi bi-cart-plus"></i> Agregar al carrito`;
      boton.classList.remove("agregado");
    }, 1500);
  });
});

function actualizarContador() {
  const totalProductos = carrito.reduce((total, producto) => {
    return total + producto.cantidad;
  }, 0);

  contadorCarrito.textContent = totalProductos;
}