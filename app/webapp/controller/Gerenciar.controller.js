sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (BaseController, JSONModel) {
        "use strict";

        return BaseController.extend("manager.app.controller.Gerenciar", {

            onInit: function () {
                this.getRouter().getRoute("Gerenciar").attachPatternMatched(this.handleRouteMatched, this);

            },

            handleRouteMatched: async function () {
                const listaFinal = await this.getTotalsEmployees();
                this.getOwnerComponent().setModel(new JSONModel(listaFinal), "Total")
            },

            onChange: function (oEvent) {
                
                var that = this;
                var value = oEvent.getSource().mProperties.value;

                var rh = that.getView().getModel("Total").getProperty("/Recursos Humanos");
                var financial = that.getView().getModel("Total").getProperty("/Financeiro");
                var projects = that.getView().getModel("Total").getProperty("/Projetos");
                var total = that.getView().getModel("Total").getProperty("/total");

                var rhPercent = Math.round(rh * (value / 100));
                var financialPercent = Math.round(financial * (value / 100));
                var projectsPercent = Math.round(projects * (value / 100));
                var totalPercent = rhPercent + financialPercent + projectsPercent;

                var totalPresential = total - totalPercent;
                var projectsPresential = projects - projectsPercent;
                var financialPresential = financial - financialPercent;
                var rhPresential = rh - rhPercent;

                that.getView().getModel("Total").setProperty("/financialPresential", financialPresential)
                that.getView().getModel("Total").setProperty("/projectsPresential", projectsPresential)
                that.getView().getModel("Total").setProperty("/rhPresential", rhPresential)
                that.getView().getModel("Total").setProperty("/totalPresential", totalPresential)
                that.getView().getModel("Total").setProperty("/totalPercent", totalPercent)
                that.getView().getModel("Total").setProperty("/rhPercent", rhPercent)
                that.getView().getModel("Total").setProperty("/projectsPercent", projectsPercent)
                that.getView().getModel("Total").setProperty("/financialPercent", financialPercent)
                
            },

            onNavListar: function(){
                this.getRouter().navTo("Listar");
            }
        });
    });