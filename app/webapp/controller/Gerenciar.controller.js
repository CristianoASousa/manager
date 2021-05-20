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
                var that = this;
                await $.ajax({
                    "url": "/api/main/Employees?$expand=department",
                    "method": "GET",
                    success(data) {

                        var total = data.value.length
                        var listaFinal = data.value.reduce((lista, curr) => {
                            if (curr.department.name in lista) {
                                lista[curr.department.name]++;
                            }
                            else {
                                lista[curr.department.name] = 1;
                            }
                            return lista
                        }, {})

                        listaFinal.total = total
                        that.getOwnerComponent().setModel(new JSONModel(listaFinal), "Total")
                    },
                    error() {
                        console.log("erro")
                    }
                })
            },

            onChange: function (oEvent) {
                var that = this;
                var value = oEvent.getSource().mProperties.value;

                var rh = that.getView().getModel("Total").getProperty("/Recursos Humanos");
                var financial = that.getView().getModel("Total").getProperty("/Financeiro");
                var projects = that.getView().getModel("Total").getProperty("/Projetos");

                var rhPercent = Math.round(rh * (value / 100));
                var financialPercent = Math.round(financial * (value / 100));
                var projectsPercent = Math.round(projects * (value / 100));
                var totalPercent = rhPercent + financialPercent + projectsPercent;

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