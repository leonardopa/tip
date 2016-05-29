package com.ar.unq.chasqui.few.api.example;

import java.util.ArrayList;
import java.util.List;

import com.ar.unq.chasqui.few.core.dto.PaginaProductoDto;
import com.ar.unq.chasqui.few.core.dto.ProductoDto;
import com.ar.unq.chasqui.few.core.service.example.ProductoServiceMock;

public class Tmp {

	public static void main(String[] args) {
		List<ProductoDto> lista = new ArrayList<>();
		
		for (int i = 0; i < 100; i++) {
			lista.add(new ProductoDto());
		}

		System.out.println(lista.size());
		System.out.println(lista.subList(5, 10).size());
		
		
		ProductoServiceMock m = new ProductoServiceMock();
		PaginaProductoDto pag = m.findProductos(1, 10);
		
		System.out.println(pag.getProductos().size());
	}

}
