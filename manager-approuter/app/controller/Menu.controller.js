sap.ui.define(["./BaseController"],function(e){"use strict";return e.extend("manager.app.controller.Menu",{onInit:function(){},onNavGerenciar:function(){this.getRouter().navTo("Gerenciar")},onNavRelatorio:function(){this.getRouter().navTo("Relatorio")},onNavTeste:function(){this.getRouter().navTo("Teste")}})});