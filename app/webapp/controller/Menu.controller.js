sap.ui.define([
	"./BaseController"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController) {
		"use strict";

		return BaseController.extend("manager.app.controller.Menu", {
			onInit: function () {

            },
            onNavGerenciar: function(){
               this.getRouter().navTo("Gerenciar");
            },
             onNavRelatorio: function(){
                this.getRouter().navTo("Relatorio");
            },
            onNavListar: function(){
                this.getRouter().navTo("Listar");
            },
             onNavListagem: function(){
                this.getRouter().navTo("Listar");
            }
            
	});
});