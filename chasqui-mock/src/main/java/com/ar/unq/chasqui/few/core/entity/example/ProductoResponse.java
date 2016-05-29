package com.ar.unq.chasqui.few.core.entity.example;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductoResponse {

	private String serviceErrors = "";

	private ProductoReturnObject returnObject;

	public ProductoResponse(ProductoReturnObject returnObject) {
		super();
		this.returnObject = returnObject;
	}

	public ProductoReturnObject getReturnObject() {
		return returnObject;
	}

	public void setReturnObject(ProductoReturnObject returnObject) {
		this.returnObject = returnObject;
	}

	public String getServiceErrors() {
		return serviceErrors;
	}

	public void setServiceErrors(String serviceErrors) {
		this.serviceErrors = serviceErrors;
	}


}
