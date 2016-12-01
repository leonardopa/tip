package com.ar.unq.chasqui.few.core.dto.apiary;


public class NotificacionesDto {

	private Integer id ;
	private String usuarioOrigen ;
	private String usuarioDestino ;
	private String mensaje ;
	private String estado ;

	public NotificacionesDto(Integer id, String usuarioOrigen, String usuarioDestino, String mensaje, String estado) {
		super();
		this.id = id;
		this.usuarioOrigen = usuarioOrigen;
		this.usuarioDestino = usuarioDestino;
		this.mensaje = mensaje;
		this.estado = estado;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsuarioOrigen() {
		return usuarioOrigen;
	}

	public void setUsuarioOrigen(String usuarioOrigen) {
		this.usuarioOrigen = usuarioOrigen;
	}

	public String getUsuarioDestino() {
		return usuarioDestino;
	}

	public void setUsuarioDestino(String usuarioDestino) {
		this.usuarioDestino = usuarioDestino;
	}

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}


}
