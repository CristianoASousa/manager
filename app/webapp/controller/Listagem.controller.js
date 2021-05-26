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
                
            },

            handleRouteMatched: async function(){
                var that = this; 
                var idBtn = this.getOwnerComponent().getModel("identif").getData().id;
                
                switch(idBtn){
                    case 'container-app---relatorio--totalsEmp':
                        var Employee = {
                            "name": "Iago Baldani",
                            "email": "iagobaldani@gmail.com",
                            "department": {
                                "name": "Projetos"
                            },
                            "score": 40,
                            "inHomeOffice": false
                        };
                        this.getView().setModel(new JSONModel(Employee), "Employees");
                        /* 
                            that.getView().setBusy(true);

                            await $.ajax({
                            "url":"/api/main/Employees?$expand=department",
                            "method":"GET",
                            success(data){
                                that.getView().setModel(new JSONModel(data), "Employees");
                                that.getView().setBusy(false);
                            },
                            error(){
                                MessageBox.error("Não foi possível gerar a lista. Tente novamente mais tarde.");
                            }
                        }); */
                        break;
                    case 'container-app---relatorio--inHomeOffice':
                        var Employee = {
                            "name": "Cristiano",
                            "email": "cristiano@gmail.com",
                            "department": {
                                "name": "Projetos"
                            },
                            "score": 60,
                            "inHomeOffice": true
                        };
                        this.getView().setModel(new JSONModel(Employee), "Employees");
                        break;
                    case 'container-app---relatorio--gotCOVID':
                        var Employee = {
                            "name": "Gustavo",
                            "email": "gustavo@gmail.com",
                            "department": {
                                "name": "Recursos Humanos"
                            },
                            "score": 20,
                            "inHomeOffice": false
                        };
                        this.getView().setModel(new JSONModel(Employee), "Employees");
                        break;
                    case 'container-app---relatorio--activeCase':
                        var Employee = {
                            "name": "Livian",
                            "email": "livian@gmail.com",
                            "department": {
                                "name": "Financeiro"
                            },
                            "score": 80,
                            "inHomeOffice": true
                        };
                        this.getView().setModel(new JSONModel(Employee), "Employees");
                        break;
                } 
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
