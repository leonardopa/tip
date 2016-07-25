package com.ar.unq.chasqui.few.core.dto.apiary;

import java.io.Serializable;

public class NuevoUsuarioDto implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	private String mail;

	private String token;

	public NuevoUsuarioDto() {
		// TODO Auto-generated constructor stub
	}

	public NuevoUsuarioDto(String mail, String token) {
		super();
		this.mail = mail;
		this.token = token;
	}

	@Override
	public String toString() {
		return "NuevoUsuarioDto [mail=" + mail + ", token=" + token + "]";
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
