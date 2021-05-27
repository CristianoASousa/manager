sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("manager.app.controller.BaseController", {

            getRouter: function () {
                return this.getOwnerComponent().getRouter();
            },

            getModel: function (sName) {
                return this.getView().getModel(sName);
            },

            setModel: function (oModel, sName) {
                return this.getView().setModel(oModel, sName);
            },

            getTotalsEmployees: async function () {
                const data = await $.ajax({
                    "url": "/api/main/Employees?$expand=department",
                    "method": "GET"
                })
                
                const total = data.value.length

                const listaFinal = data.value.reduce((lista, curr) => {
                    if (curr.department != null) {
                        if (curr.department.name in lista) {
                            lista[curr.department.name]++;
                        }
                        else {
                            lista[curr.department.name] = 1;
                        }
                        return lista
                    }
                    return lista
                }, {})
                
                listaFinal.total = total
                return listaFinal
            },
        });
    });
