package com.ar.unq.chasqui.few.core.dto.apiary;

import java.io.Serializable;

/**
 * Sacado de
 * http://docs.chasqui.apiary.io/#reference/0/servicios-publicos/filtrado-de-productos-por-categoria
 */
public class FiltoProductoDto implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	private Integer pagina;

	private Integer cantItems;

	private String precio;

	private String idCategoria;

	private String idProductor;

	private String idMedalla;

	private String query;

	private String idVendedor;



	@Override
	public String toString() {
		return "FiltoProductoDto [pagina=" + pagina + ", cantItems=" + cantItems + ", precio=" + precio + ", idCategoria=" + idCategoria
		        + ", idProductor=" + idProductor + ", idMedalla=" + idMedalla + ", query=" + query + ", idVendedor=" + idVendedor + "]";
	}

	public Integer getPagina() {
		return pagina;
	}

	public void setPagina(Integer pagina) {
		this.pagina = pagina;
	}

	public Integer getCantItems() {
		return cantItems;
	}

	public void setCantItems(Integer cantItems) {
		this.cantItems = cantItems;
	}

	public String getPrecio() {
		return precio;
	}

	public void setPrecio(String precio) {
		this.precio = precio;
	}

	public String getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(String idCategoria) {
		this.idCategoria = idCategoria;
	}

	public String getIdProductor() {
		return idProductor;
	}

	public void setIdProductor(String idProductor) {
		this.idProductor = idProductor;
	}

	public String getIdMedalla() {
		return idMedalla;
	}

	public void setIdMedalla(String idMedalla) {
		this.idMedalla = idMedalla;
	}

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	public String getIdVendedor() {
		return idVendedor;
	}

	public void setIdVendedor(String idVendedor) {
		this.idVendedor = idVendedor;
	}

}
