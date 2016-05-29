package com.ar.unq.chasqui.few.core.dto;

import java.io.Serializable;


public class ProductoPedidoDto extends ProductoDto implements Serializable {


	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	private Integer cantidad;

	public Integer getCantidad() {
		return cantidad;
	}

	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}

}
