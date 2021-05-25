sap.ui.define([
    "./BaseController"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (BaseController) {
        "use strict";

        return BaseController.extend("manager.app.controller.Listagem", {
            onInit: function () {
                var emp = {
                    "name": "Cristiano",
                    "birthDate": "1994-01-01",
                    "email": "cristianossn7@gmail.com",
                    "groupRisk": false,
                    "livesRiskGroup": true,
                    "publicTransport": true,
                    "hourPublicTransport": true,
                    "environmentEquipment": true,
                    "inHomeOffice": null,
                    "vaccinated": false,
                    "score": 70,
                    "gotCOVID": false,
                    "activeCase": false,
                    "contaminationDate": "2020-02-06",
                    "department_ID": 1
                }

                
            }
        });
    });
