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
                this.getRouter().getRoute("Listagem").attachPatternMatched(this.handleRouteMatched, this);
                
                var Employee = {
                    "name": "Iago Baldani",
                    "email": "iagobaldani@gmail.com",
                    "department": {
                        "name": "Projetos"
                    },
                    "score": 40,
                    "inHomeOffice": true
                };

                this.getView().setModel(new JSONModel(Employee), "Employees");

            },

            handleRouteMatched: async function(){
                var that = this; 
                
                /* this.getView().setBusy(true);

                 await $.ajax({
                    "url":"/api/main/Employees",
                    "method":"GET",
                    success(data){
                        that.getView().setModel(new JSONModel(data), "Employees");
                        that.getView().setBusy(false);
                    },
                    error(){
                        MessageBox.error("Não foi possível gerar a lista. Tente novamente mais tarde.");
                    }
                }); */
            },

            onSearch: function(oEvent){
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var filter = new Filter("email", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }

                var oList = this.byId("tableEmployees");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters, "Application");
            }


        });
    });
