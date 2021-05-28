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

        return BaseController.extend("manager.app.controller.Listagem", {
            onInit: function () {
                this.getRouter().getRoute("TotalFuncionarios").attachPatternMatched(this.handleRouteMatchedTotalFun, this);
                this.getRouter().getRoute("EmHomeOffice").attachPatternMatched(this.handleRouteMatchedFuncHomeOffice, this);
                this.getRouter().getRoute("CasosPositivos").attachPatternMatched(this.handleRouteMatchedCasosPos, this);
                this.getRouter().getRoute("CasosAtivos").attachPatternMatched(this.handleRouteMatchedCasosAtivos, this);

                var oTable = this.byId("tableEmployees");
                var aSticky = ["ColumnHeaders", "HeaderToolbar"];

                oTable.setSticky(aSticky);
            },

            handleRouteMatchedFuncHomeOffice: async function () {
                this.getView().setBusy(true);
                const employees = await this.handleReq("inHomeOffice");
                if (employees.length > 0) {
                    this.getView().setModel(new JSONModel(employees), "Employees")
                }
                this.getView().setBusy(false);
            },

            handleRouteMatchedTotalFun: async function () {
                var that = this
                this.getView().setBusy(true);
                await $.ajax({
                    "url": "/api/main/Employees",
                    "method": "GET",
                    success(data) {
                        that.getView().setModel(new JSONModel(data.value), "Employees")
                    },
                    error() {
                        MessageBox.error("Não foi possível buscar os dados")
                    }
                })
                this.getView().setBusy(false);
            },

            handleRouteMatchedCasosPos: async function () {
                this.getView().setBusy(true);
                const employees = await this.handleReq("gotCOVID");
                if (employees.length > 0) {
                    this.getView().setModel(new JSONModel(employees), "Employees")
                }
                this.getView().setBusy(false);
            },

            handleRouteMatchedCasosAtivos: async function () {
                this.getView().setBusy(true);
                const employees = await this.handleReq("activeCase");
                if (employees.length > 0) {
                    this.getView().setModel(new JSONModel(employees), "Employees")
                }
                this.getView().setBusy(false);
            },

            handleReq: async function (sParms) {
                try {
                    const data = await $.ajax({
                        "url": `/api/main/Employees?$expand=department&$filter=${sParms} eq true`,
                        "method": "GET"
                    })
                    return data.value
                } catch (error) {
                    return []
                }
            },
            onNavBack: function () {
                this.getRouter().navTo("Relatorio");
            },
            onSearch: function (oEvent) {
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var filter = new Filter("name", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }

                var oList = this.byId("tableEmployees");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters, "Application");
            }


        });
    });
