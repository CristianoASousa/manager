sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController, JSONModel, MessageBox, Filter, FilterOperator) {
		"use strict";

		return BaseController.extend("manager.app.controller.Listar", {

            onInit: function () {
                this.getRouter().getRoute("Listar").attachPatternMatched(this.handleRouteMatched, this);
                var oTable = this.byId("tableListar");
				var aSticky = ["ColumnHeaders","HeaderToolbar"];

                oTable.setSticky(aSticky);
            },
            onNavBack: function () {
                this.getRouter().navTo("Gerenciar")
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
                    "url": `/api/main/Employees?$top=${sTop}&$expand=department&$filter=department/name eq '${sSector}' and activeCase eq false&$orderby=score desc`,
                    "method": "GET"})
                if (data) {
                    return data.value
                }
                return null
            },

            // função para salvar a lista de funcionários em home office
            onConfirm: async function () {
                var that = this;
                var employees = this.getModel('Employee').getData();

                var data = JSON.stringify({employees})
                
                await $.ajax({
                    "url": "/api/main/generateHomeOfficeList",
                    "method": "POST",
                    "data": data,
                    contentType: 'application/json',
                    success() {
                        MessageBox.success("Operação realizada com sucesso", {
                            onClose: function(){
                                that.getRouter().navTo("Relatorio");
                            }
                        });  
                    },
                    error() {
                        MessageBox.error("Um erro ocorreu, tente novamente")
                    }
                })
            },

            onSearch: function(oEvent){
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var filter = new Filter("name", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }

                var oList = this.byId("tableListar");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters, "Application");
            }
		});
	});
