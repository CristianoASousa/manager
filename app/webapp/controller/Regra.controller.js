sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
], function(Controller, JSONModel) {
	"use strict";
	return Controller.extend("sap.m.sample.ExpandableText.C", {

		onInit: function () {
			// create some dummy JSON data
			var oData = {
				regras: [
					{
						situacao: "Pertence ao grupo de risco da COVID-19",
						pontuacao: "100 Pontos",
						overflowMode: sap.m.ExpandableTextOverflowMode.InPlace
					},
					{
						situacao: "Idade entre 50 e 59 ",
						pontuacao: "50 pontos ",
						overflowMode: sap.m.ExpandableTextOverflowMode.Popover
					},
					{
						situacao: "Idade entre 40 e 49",
						pontuacao: "40 pontos",
						overflowMode: sap.m.ExpandableTextOverflowMode.InPlace
					},
					{
						situacao: "Idade entre 30 e 39",
						pontuacao: "30 pontos",
						overflowMode: sap.m.ExpandableTextOverflowMode.Popover
                    },
                    {
						situacao: "Idade entre 20 e 29",
						pontuacao: "20 pontos",
						overflowMode: sap.m.ExpandableTextOverflowMode.Popover
                    },
                    {
						situacao: "Idade entre 17 e 19",
						pontuacao: "10 pontos",
						overflowMode: sap.m.ExpandableTextOverflowMode.Popover
                    },
                    {
						situacao: "Reside com pessoa que pertence ao grupo de risco",
						pontuacao: "20 pontos",
						overflowMode: sap.m.ExpandableTextOverflowMode.Popover
                    },
                    {
						situacao: "Utiliza transporte coletivo",
						pontuacao: "10 pontos",
						overflowMode: sap.m.ExpandableTextOverflowMode.Popover
                    },
                    {
						situacao: "Passa mais de 1 hora no transporte coletivo",
						pontuacao: "10 pontos",
						overflowMode: sap.m.ExpandableTextOverflowMode.Popover
                    },
                    {
						situacao: "Possui ambiente e equipamentos adequados para executar suas funções em home office",
						pontuacao: "10 pontos",
						overflowMode: sap.m.ExpandableTextOverflowMode.Popover
					}
				]
			};

			// create a Model with this data
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
		}
	});
});