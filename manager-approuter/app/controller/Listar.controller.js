sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel"],function(e,t){"use strict";return e.extend("manager.app.controller.Listar",{onInit:function(){this.getRouter().getRoute("Listar").attachPatternMatched(this.handleRouteMatched,this)},handleRouteMatched:async function(){this.getView().setBusy(true);var e=this.getOwnerComponent().getModel("Total").getProperty("/projectsPercent");var r=await this.getListBySector("Projetos",e);var a=this.getOwnerComponent().getModel("Total").getProperty("/rhPercent");var n=await this.getListBySector("Recursos Humanos",a);var o=this.getOwnerComponent().getModel("Total").getProperty("/financialPercent");var i=await this.getListBySector("Financeiro",o);var s=[...r,...n,...i];this.getOwnerComponent().setModel(new t(s),"Employee");this.getView().setBusy(false)},getListBySector:async function(e,t){var r=await $.ajax({url:`/api/main/Employees?$top=${t}&$expand=department&$filter=department/name eq '${e}'&$orderby=score desc`,method:"GET"});if(r){return r.value}return null}})});