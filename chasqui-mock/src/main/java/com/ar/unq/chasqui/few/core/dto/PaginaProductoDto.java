package com.ar.unq.chasqui.few.core.dto;

import java.io.Serializable;
import java.util.List;

public class PaginaProductoDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<ProductoDto> productos;
	private Integer paginaActual;
	private Integer paginasTotal;
	private Integer itemsTotal;

	public PaginaProductoDto(List<ProductoDto> productos, Integer paginaActual, Integer paginasTotal,
			Integer itemsTotal) {
		super();
		this.productos = productos;
		this.paginaActual = paginaActual;
		this.paginasTotal = paginasTotal;
		this.itemsTotal = itemsTotal;
	}

	public List<ProductoDto> getProductos() {
		return productos;
	}

	public void setProductos(List<ProductoDto> productos) {
		this.productos = productos;
	}

	public Integer getPaginaActual() {
		return paginaActual;
	}

	public void setPaginaActual(Integer paginaActual) {
		this.paginaActual = paginaActual;
	}

	public Integer getPaginasTotal() {
		return paginasTotal;
	}

	public void setPaginasTotal(Integer paginasTotal) {
		this.paginasTotal = paginasTotal;
	}

	public Integer getItemsTotal() {
		return itemsTotal;
	}

	public void setItemsTotal(Integer itemsTotal) {
		this.itemsTotal = itemsTotal;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
