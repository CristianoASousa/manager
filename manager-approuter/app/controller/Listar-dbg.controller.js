sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController, JSONModel) {
		"use strict";

		return BaseController.extend("manager.app.controller.Listar", {

            onInit: function () {
                this.getRouter().getRoute("Listar").attachPatternMatched(this.handleRouteMatched, this);

            },

			handleRouteMatched: async function () {

                this.getView().setBusy(true);
                // pegar lista de funcionários do setor de projetos
                var topProjects = this.getOwnerComponent().getModel("Total").getProperty("/projectsPercent")
                var listProjets = await this.getListBySector("Projetos", topProjects)

                // pegar lista de funcionários do setor de recursos humanos
                var topRh = this.getOwnerComponent().getModel("Total").getProperty("/rhPercent")
                var listRh = await this.getListBySector("Recursos Humanos", topRh)

                // pegar lista de funcionários do setor financeiro
                var topFinancial = this.getOwnerComponent().getModel("Total").getProperty("/financialPercent")
                var listFinancial = await this.getListBySector("Financeiro", topFinancial)

                // gerando lista final
                var fullList = [...listProjets, ...listRh, ...listFinancial]

                this.getOwnerComponent().setModel(new JSONModel(fullList), "Employee")
                this.getView().setBusy(false);
            },

            // Buscando a lista dos funcionários por setor
            getListBySector: async function (sSector, sTop) {
                var data = await $.ajax({
                    "url": `/api/main/Employees?$top=${sTop}&$expand=department&$filter=department/name eq '${sSector}'&$orderby=score desc`,
                    "method": "GET"})
                if (data) {
                    return data.value
                }
                return null
            }
		});
	});
