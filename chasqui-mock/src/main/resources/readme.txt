Usar el formatter para GALA

Nombre de paquetes
	-base : net.epd.gala.front
	+capa : 
			- service (core) : lógica de negocio. Puede o no, llamar a otros servicios, inclusive via Web Service.			
			- api   :  expone servicios vía Web Service. Usaremos REST
			- proxy :  llamado a servicios externos (Api Playbots). Usaremos REST 
	

	

	
TODO:
	- los beans los injectaría por annotations
	- algún test unitario de ejemplo
	- hacer una divicion de application-context.xml para que no quede todo en el mismo archivo. Quiza por proxy y app
	- comentarios
	- log . Externalzización de configuracion.
