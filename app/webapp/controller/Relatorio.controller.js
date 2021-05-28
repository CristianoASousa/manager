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
                // casos totais
                const activeCase = await this.handleRequestsTotals("activeCase");
                const gotCOVID = await this.handleRequestsTotals("gotCOVID");
                const inHomeOffice = await this.handleRequestsTotals("inHomeOffice");

                // totais por setor
                const projects = await this.handleRequestsSector("Projetos");
                const rh = await this.handleRequestsSector("Recursos Humanos");
                const financial = await this.handleRequestsSector("Financeiro");
                // total de funcionários na empresa
                const totalsEmp = await this.handleRequestsTotals("emp");

                // total por setor
                var totais = await this.getTotalsEmployees();

                Object.keys(totais).forEach(key => {
                    if (key == "Recursos Humanos") {
                        totais.RecursosHumanos = totais[key]
                        delete totais[key]
                    }
                });
                // porcentagem funcionários contaminados
                const perGotCovid = Math.round((gotCOVID / totalsEmp) * 100);
                // porcentagem funcionários com caso ativo
                const perActiveCase = Math.round((activeCase / totalsEmp) * 100);

                // em home office por setor
                const projetosInHomeOffice = await this.hadleInHomeOfficeBySector("Projetos");
                const financeiroInHomeOffice = await this.hadleInHomeOfficeBySector("Financeiro");
                const rhInHomeOffice = await this.hadleInHomeOfficeBySector("Recursos Humanos");
                const perInHomeOffice = Math.round((inHomeOffice / totalsEmp) * 100);
                // porcentagem por setor
                var perContProjetos = (projects / totais.Projetos) * 100;
                var perContRh = (rh / totais.RecursosHumanos) * 100;
                var perContFin = (financial / totais.Financeiro) * 100;

                const totals = {
                    perActiveCase,
                    perGotCovid,
                    perInHomeOffice,
                    projetosInHomeOffice,
                    financeiroInHomeOffice,
                    rhInHomeOffice,
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

            hadleInHomeOfficeBySector: async function (sSector) {
                try {
                    const data = await $.ajax({
                        "url": `/api/main/Employees?$expand=department&$filter=department/name eq '${sSector}' and inHomeOffice eq true`,
                        "method": "GET"
                    })
                    return data.value.length
                } catch (error) {
                    return 0
                }
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
            onNav: function (oEvent) {
                var that = this;
                var sId = oEvent.getSource().sId;

                switch (sId) {
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
