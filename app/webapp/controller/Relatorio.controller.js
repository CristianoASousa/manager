sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (BaseController, JSONModel) {
        "use strict";

        return BaseController.extend("manager.app.controller.Relatorio", {
            onInit: function () {
                this.getRouter().getRoute("Relatorio").attachPatternMatched(this.handleRouteMatched, this);
                this.handleRouteMatched()

            },

            handleRouteMatched: async function () {
                this.getView().setBusy(true);

                const activeCase = await this.handleRequestsTotals("activeCase");
                
                const gotCOVID = await this.handleRequestsTotals("gotCOVID");
               
                const inHomeOffice = await this.handleRequestsTotals("inHomeOffice");
                
                const projects = await this.handleRequestsSector("Projetos");
                const rh = await this.handleRequestsSector("Recursos Humanos");
                const financial = await this.handleRequestsSector("Financeiro");

                const totalsEmp = await this.handleRequestsTotals("emp");

                var totais = await this.getTotalsEmployees();
               
                Object.keys(totais).forEach(key => {
                    if(key == "Recursos Humanos"){
                        totais.RecursosHumanos = totais[key]
                        delete totais[key]
                    }
                });

                var perContProjetos = (projects / totais.Projetos) * 100;
                var perContRh = (rh / totais.RecursosHumanos) * 100;
                var perContFin = (financial / totais.Financeiro) * 100;
               
                const totals = {
                    projects,
                    rh,
                    financial,
                    activeCase,
                    gotCOVID,
                    inHomeOffice,
                    totalsEmp,
                    perContProjetos,
                    perContRh,
                    perContFin,
                    totais
                }

                this.getOwnerComponent().setModel(new JSONModel(totals), "Reports")
                
                this.getView().setBusy(false);
            },

            handleRequestsTotals: async function (parms) {
                if (parms == 'emp') {
                    try {
                        var data = await $.ajax({
                            "url": "/api/main/Employees/$count",
                            "method": "GET"
                        })

                        return data
                    } catch (error) {
                        return 0
                    }
                } else {
                    try {
                        var data = await $.ajax({
                            "url": `/api/main/Employees?$filter=${parms} eq true`,
                            "method": "GET"
                        })

                        return data.value.length
                    } catch (error) {
                        return 0
                    }
                }
            },

            handleRequestsSector: async function (sector) {
                
                try {
                    var data = await $.ajax({
                        "url": `/api/main/Employees?$expand=department&$filter=department/name eq '${sector}' and activeCase eq true`,
                        "method": "GET"
                    })

                    return data.value.length
                } catch (error) {
                    return 0
                }
                
            },
            onNav: function(oEvent) {
                var that = this;
                var sId = oEvent.getSource().sId;
                
                switch(sId){
                    case 'container-app---relatorio--totalsEmp':
                        that.getRouter().navTo("TotalFuncionarios");
                        break;
                    case 'container-app---relatorio--inHomeOffice':
                        that.getRouter().navTo("EmHomeOffice");
                        break;
                    case 'container-app---relatorio--gotCOVID':
                        that.getRouter().navTo("CasosPositivos");
                        break;
                    case 'container-app---relatorio--activeCase':
                        that.getRouter().navTo("CasosAtivos");
                        break;
                } 
            }
        });
    });
