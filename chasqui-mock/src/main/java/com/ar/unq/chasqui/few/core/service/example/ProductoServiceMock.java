package com.ar.unq.chasqui.few.core.service.example;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Random;

import com.ar.unq.chasqui.few.core.dto.PaginaProductoDto;
import com.ar.unq.chasqui.few.core.dto.PedidoDto;
import com.ar.unq.chasqui.few.core.dto.ProductoDto;
import com.ar.unq.chasqui.few.core.dto.ProductoPedidoDto;
import com.ar.unq.chasqui.few.core.dto.TipoCompra;

public class ProductoServiceMock {


	public PaginaProductoDto findProductos(Integer pagina, Integer cantItems) {

		List<ProductoDto> productosPaginados = findProductos();

		Integer totalLista = productosPaginados.size();
		Integer inicio = (pagina-1)*cantItems;
		Integer fin = inicio + cantItems;
		fin = (fin>totalLista)?totalLista:fin;


		productosPaginados=productosPaginados.subList(inicio,fin);

		return  new PaginaProductoDto(productosPaginados, pagina,Math.round(totalLista/cantItems), totalLista);
	}

	public List<ProductoDto> findProductosDestacados() {
		return findProductos(1);
	}

	public List<ProductoDto> findProductos() {
		return findProductos(10);
	}

	private List<ProductoDto> findProductos(int x) {
		int cantVariantes = 3;
		int cantCategorias = 2;
		int cantProductos = x;

		int idCounter=0;

		List<ProductoDto> productosDto = new ArrayList<ProductoDto>();

		for (int i = 0; i < cantCategorias; i++) {
			for (int j = 0; j < cantProductos; j++) {
				for (int j2 = 0; j2 < cantVariantes; j2++) {
					productosDto.add(crearteProducto(idCounter++, i, j2));
				}
			}

		}

		return productosDto;
	}

	private ProductoDto crearteProducto(int idProducto, int idCategoria, int idVariante) {
		ProductoPedidoDto producto = new ProductoPedidoDto();
		producto.setDescripcionCateoria("descripcionCateoria"+idCategoria);
		producto.setDescripcionProducto("descripcionProducto"+idProducto);
		producto.setDescripcionVariente("descripcionVariente"+idVariante);
		producto.setIdCategoria(1);
		producto.setIdFabricante(1);
		producto.setIdProducto(idProducto);
		producto.setIdVariante(idVariante);
		producto.setNombreCategoria("nombreCategoria" + idCategoria);
		producto.setNombreFabricante("nombreFabricante");
		producto.setNombreProducto("nombreProducto" + idProducto);
		producto.setNombreVariente("nombreVariente" + idVariante);
		producto.setPrecioParteDecimal(createRandom(89)+10);
		producto.setPrecioParteEntera(createRandom(1000));

		return producto;
	}

	private ProductoPedidoDto crearteProductoPedido(int idProducto, int idCategoria, int idVariante,int cantidad) {
		ProductoPedidoDto producto = new ProductoPedidoDto();
		producto.setDescripcionCateoria("descripcionCateoria"+idCategoria);
		producto.setDescripcionProducto("descripcionProducto"+idProducto);
		producto.setDescripcionVariente("descripcionVariente"+idVariante);
		producto.setIdCategoria(1);
		producto.setIdFabricante(1);
		producto.setIdProducto(idProducto);
		producto.setIdVariante(idVariante);
		producto.setNombreCategoria("nombreCategoria" + idCategoria);
		producto.setNombreFabricante("nombreFabricante");
		producto.setNombreProducto("nombreProducto" + idProducto);
		producto.setNombreVariente("nombreVariente" + idVariante);
		producto.setPrecioParteDecimal(createRandom(89)+10);
		producto.setPrecioParteEntera(createRandom(1000));

		producto.setCantidad(cantidad);
		return producto;
	}

	public List<PedidoDto> findPedidos(Integer idUser) {
		SimpleDateFormat dateFormatter = new SimpleDateFormat("dd/MM/yyyy");

		List<PedidoDto> pedidos = new ArrayList<PedidoDto>();


			PedidoDto pedido = new PedidoDto();
			pedido.setTipo(TipoCompra.INDIVIDUAL);
			pedido.setNombre("Personal");
			pedido.setCreador("Tu eres creador");
			pedido.setFechaCreacion(dateFormatter.format(Calendar.getInstance().getTime()));
			pedido.setId(1);
			pedido.setMontoActual(100.d);
			pedido.setMontoMinimo(500.d);

			List<ProductoPedidoDto> productos=new ArrayList<>();
			for (int j = 0; j < 5; j++) {
				productos.add(crearteProductoPedido(1, 1, 1, createRandom(11)+1));

			}
			pedido.setProductos(productos);

			PedidoDto pedido2 = new PedidoDto();
			pedido2.setTipo(TipoCompra.COLLECTIVA);
			pedido2.setNombre("Grupo con mama");
			pedido2.setCreador("Mama");
			pedido2.setFechaCreacion(dateFormatter.format(Calendar.getInstance().getTime()));
			pedido2.setId(2);
			pedido2.setMontoActual(1.d);
			pedido2.setMontoMinimo(50.d);

			List<ProductoPedidoDto> productos2=new ArrayList<>();
			for (int j = 0; j < 2; j++) {
				productos2.add(crearteProductoPedido(1, 1, 1, createRandom(11)+1));

			}
			pedido2.setProductos(productos2);

			PedidoDto pedido3 = new PedidoDto();
			pedido3.setTipo(TipoCompra.COLLECTIVA);
			pedido3.setNombre("Grupo em Trajo");
			pedido3.setCreador("Bruce Dks");
			pedido3.setFechaCreacion(dateFormatter.format(Calendar.getInstance().getTime()));
			pedido3.setId(2);
			pedido3.setMontoActual(1.d);
			pedido3.setMontoMinimo(50.d);

			List<ProductoPedidoDto> productos3=new ArrayList<>();
			for (int j = 0; j < 5; j++) {
				productos3.add(crearteProductoPedido(1, 1, 1, createRandom(11)+1));

			}
			pedido3.setProductos(productos3);

			pedidos.add(pedido);
			pedidos.add(pedido2);
			pedidos.add(pedido3);


		return pedidos;
	}

	private int createRandom(int max) {
		return new Random().nextInt(max);
	}
	/*
	 * public List<Producto> findProductos() {
	 *
	 * List<Producto> productos = new ArrayList<Producto>();
	 *
	 * for (int i = 0; i < 15; i++) {
	 *
	 * Fabricante fabricante = new Fabricante("nombreFabricante");
	 *
	 * Producto producto = new Producto(); producto.setId(new Integer(i));
	 * producto.setNombre("nombre" + i); producto.setDescripcion("descripcion" +
	 * i); // producto.setCategoria(categoria);
	 * producto.setFabricante(fabricante);
	 *
	 *
	 * producto.setVariantes(findVariante(producto));
	 *
	 * productos.add(producto);
	 *
	 *
	 * }
	 *
	 * return productos; }
	 *
	 * private List<Variante> findVariante(Producto prod) { List<Variante>
	 * variantes= new ArrayList<Variante>();
	 *
	 * for (int i = 0; i < 15; i++) { Variante variante = new Variante();
	 * variante.setDescripcion("variante-descripcion para producto "
	 * +prod.getId()); variante.setId(i); variante.setPrecio(i * 1.25f );
	 * variante.setNombreFabricante(prod.getFabricante().getNombre());
	 * variantes.add(variante); }
	 *
	 *
	 * return variantes; }
	 */






}
