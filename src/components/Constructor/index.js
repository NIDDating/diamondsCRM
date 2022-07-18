import React from "react";
import {connect} from "react-redux";
import styles from "./styles.module.scss";

const girlBase = {
	hair: [
		[
			[
				require("../../assets/constructor/европеоид/2волосы01_01.svg"),
				require("../../assets/constructor/европеоид/2волосы01_02.svg"),
				require("../../assets/constructor/европеоид/2волосы01_03.svg"),
				require("../../assets/constructor/европеоид/2волосы01_04.svg")
			], [
			require("../../assets/constructor/европеоид/2волосы02_01.svg"),
			require("../../assets/constructor/европеоид/2волосы02_02.svg"),
			require("../../assets/constructor/европеоид/2волосы02_03.svg"),
			require("../../assets/constructor/европеоид/2волосы02_04.svg")
		], [
			require("../../assets/constructor/европеоид/2волосы03_01.svg"),
			require("../../assets/constructor/европеоид/2волосы03_02.svg"),
			require("../../assets/constructor/европеоид/2волосы03_03.svg"),
			require("../../assets/constructor/европеоид/2волосы03_04.svg")

		]
		], [
			[
				require("../../assets/constructor/европеоид/волосы01_01.svg"),
				require("../../assets/constructor/европеоид/волосы01_02.svg"),
				require("../../assets/constructor/европеоид/волосы01_03.svg"),
				require("../../assets/constructor/европеоид/волосы01_04.svg")
			], [
				require("../../assets/constructor/европеоид/волосы02_01.svg"),
				require("../../assets/constructor/европеоид/волосы02_02.svg"),
				require("../../assets/constructor/европеоид/волосы02_03.svg"),
				require("../../assets/constructor/европеоид/волосы02_04.svg")
			], [
				require("../../assets/constructor/европеоид/волосы03_01.svg"),
				require("../../assets/constructor/европеоид/волосы03_02.svg"),
				require("../../assets/constructor/европеоид/волосы03_03.svg"),
				require("../../assets/constructor/европеоид/волосы03_04.svg")
			]
		],
	],
	hair2: [
		[
			[
				require("../../assets/constructor/афро/2волосы01_01.svg"),
				require("../../assets/constructor/афро/2волосы01_02.svg"),
				require("../../assets/constructor/афро/2волосы01_03.svg"),
				require("../../assets/constructor/афро/2волосы01_04.svg")
			], [
			require("../../assets/constructor/афро/2волосы02_01.svg"),
			require("../../assets/constructor/афро/2волосы02_02.svg"),
			require("../../assets/constructor/афро/2волосы02_03.svg"),
			require("../../assets/constructor/афро/2волосы02_04.svg")
		], [
			require("../../assets/constructor/афро/2волосы03_01.svg"),
			require("../../assets/constructor/афро/2волосы03_02.svg"),
			require("../../assets/constructor/афро/2волосы03_03.svg"),
			require("../../assets/constructor/афро/2волосы03_04.svg")
		]
		], [
			[
				require("../../assets/constructor/афро/волосы01_01.svg"),
				require("../../assets/constructor/афро/волосы01_02.svg"),
				require("../../assets/constructor/афро/волосы01_03.svg"),
				require("../../assets/constructor/афро/волосы01_04.svg")
			], [
				require("../../assets/constructor/афро/волосы02_01.svg"),
				require("../../assets/constructor/афро/волосы02_02.svg"),
				require("../../assets/constructor/афро/волосы02_03.svg"),
				require("../../assets/constructor/афро/волосы02_04.svg")
			], [
				require("../../assets/constructor/афро/волосы03_01.svg"),
				require("../../assets/constructor/афро/волосы03_02.svg"),
				require("../../assets/constructor/афро/волосы03_03.svg"),
				require("../../assets/constructor/афро/волосы03_04.svg")
			]
		],
	],
	chest: [
		[
			require("../../assets/constructor/европеоид/тело01_01.svg"),
			require("../../assets/constructor/европеоид/тело01_02.svg")
		], [
			require("../../assets/constructor/европеоид/тело02_01.svg"),
			require("../../assets/constructor/европеоид/тело02_02.svg")
		], [
			require("../../assets/constructor/европеоид/тело03_01.svg"),
			require("../../assets/constructor/европеоид/тело03_02.svg")
		], [
			require("../../assets/constructor/европеоид/тело04_01.svg"),
			require("../../assets/constructor/европеоид/тело04_02.svg")
		]
	],
	booty: [
		[
			require("../../assets/constructor/европеоид/тело01_03.svg"),
			require("../../assets/constructor/европеоид/тело01_04.svg")
		], [
			require("../../assets/constructor/европеоид/тело02_03.svg"),
			require("../../assets/constructor/европеоид/тело02_04.svg")
		], [
			require("../../assets/constructor/европеоид/тело03_03.svg"),
			require("../../assets/constructor/европеоид/тело03_04.svg")
		],
	]
}
const girlEtn = [
	{
		// ЕВРО
		hair: "hair",
		base: [
			require("../../assets/constructor/европеоид/01.svg"),
			require("../../assets/constructor/европеоид/02.svg"),
			require("../../assets/constructor/европеоид/03.svg"),
			require("../../assets/constructor/европеоид/04.svg")

		],
		eyes: [
			[
				require("../../assets/constructor/европеоид/глаза01_01.svg"),
				require("../../assets/constructor/европеоид/глаза01_02.svg"),
				require("../../assets/constructor/европеоид/глаза01_03.svg")
			], [
				require("../../assets/constructor/европеоид/глаза02_01.svg"),
				require("../../assets/constructor/европеоид/глаза02_02.svg"),
				require("../../assets/constructor/европеоид/глаза02_03.svg")
			], [
				require("../../assets/constructor/европеоид/глаза03_01.svg"),
				require("../../assets/constructor/европеоид/глаза03_02.svg"),
				require("../../assets/constructor/европеоид/глаза03_03.svg")
			]
		],
	},
	{
		// АЗИАТ
		hair: "hair",
		base: [
			require("../../assets/constructor/азиат/01.svg"),
			require("../../assets/constructor/азиат/02.svg"),
			require("../../assets/constructor/азиат/03.svg"),
			require("../../assets/constructor/азиат/04.svg")
		],
		eyes: [
			[
				require("../../assets/constructor/азиат/глаза01_01.svg"),
				require("../../assets/constructor/азиат/глаза01_02.svg"),
				require("../../assets/constructor/азиат/глаза01_03.svg")
			], [
				require("../../assets/constructor/азиат/глаза02_01.svg"),
				require("../../assets/constructor/азиат/глаза02_02.svg"),
				require("../../assets/constructor/азиат/глаза02_03.svg")
			], [
				require("../../assets/constructor/азиат/глаза03_01.svg"),
				require("../../assets/constructor/азиат/глаза03_02.svg"),
				require("../../assets/constructor/азиат/глаза03_03.svg")
			]
		]
	},
	{
		// АФРО
		hair: "hair2",
		base: [
			require("../../assets/constructor/афро/01.svg"),
			require("../../assets/constructor/афро/02.svg"),
			require("../../assets/constructor/афро/03.svg"),
			require("../../assets/constructor/афро/04.svg")
		],
		eyes: [
			[
				require("../../assets/constructor/афро/глаза01_01.svg"),
				require("../../assets/constructor/афро/глаза01_02.svg"),
				require("../../assets/constructor/афро/глаза01_03.svg")
			], [
				require("../../assets/constructor/афро/глаза02_01.svg"),
				require("../../assets/constructor/афро/глаза02_02.svg"),
				require("../../assets/constructor/афро/глаза02_03.svg")
			], [
				require("../../assets/constructor/афро/глаза03_01.svg"),
				require("../../assets/constructor/афро/глаза03_02.svg"),
				require("../../assets/constructor/афро/глаза03_03.svg")
			]
		]
	},
	{
		// ЛАТИНОС
		hair: "hair",
		base: [
			require("../../assets/constructor/латинос/01.svg"),
			require("../../assets/constructor/латинос/02.svg"),
			require("../../assets/constructor/латинос/03.svg"),
			require("../../assets/constructor/латинос/04.svg")

		],
		eyes: [
			[
				require("../../assets/constructor/латинос/глаза01_01.svg"),
				require("../../assets/constructor/латинос/глаза01_02.svg"),
				require("../../assets/constructor/латинос/глаза01_03.svg")
			], [
				require("../../assets/constructor/латинос/глаза02_01.svg"),
				require("../../assets/constructor/латинос/глаза02_02.svg"),
				require("../../assets/constructor/латинос/глаза02_03.svg")
			], [
				require("../../assets/constructor/латинос/глаза03_01.svg"),
				require("../../assets/constructor/латинос/глаза03_02.svg"),
				require("../../assets/constructor/латинос/глаза03_03.svg")
			]
		]
	},
	{
		// ИНДИЯ
		hair: "hair",
		base: [
			require("../../assets/constructor/индия/01.svg"),
			require("../../assets/constructor/индия/02.svg"),
			require("../../assets/constructor/индия/03.svg"),
			require("../../assets/constructor/индия/04.svg")
		],
		eyes: [
			[
				require("../../assets/constructor/индия/глаза01_01.svg"),
				require("../../assets/constructor/индия/глаза01_02.svg"),
				require("../../assets/constructor/индия/глаза01_03.svg")
			], [
				require("../../assets/constructor/индия/глаза02_01.svg"),
				require("../../assets/constructor/индия/глаза02_02.svg"),
				require("../../assets/constructor/индия/глаза02_03.svg")
			], [
				require("../../assets/constructor/индия/глаза03_01.svg"),
				require("../../assets/constructor/индия/глаза03_02.svg"),
				require("../../assets/constructor/индия/глаза03_03.svg")
			]
		]
	},
	{
		// ВОСТОК
		hair: "hair",
		base: [
			require("../../assets/constructor/восток/01.svg"),
			require("../../assets/constructor/восток/02.svg"),
			require("../../assets/constructor/восток/03.svg"),
			require("../../assets/constructor/восток/04.svg")

		],
		eyes: [
			[
				require("../../assets/constructor/восток/глаза01_01.svg"),
				require("../../assets/constructor/восток/глаза01_02.svg"),
				require("../../assets/constructor/восток/глаза01_03.svg")
			], [
				require("../../assets/constructor/восток/глаза02_01.svg"),
				require("../../assets/constructor/восток/глаза02_02.svg"),
				require("../../assets/constructor/восток/глаза02_03.svg")
			], [
				require("../../assets/constructor/восток/глаза03_01.svg"),
				require("../../assets/constructor/восток/глаза03_02.svg"),
				require("../../assets/constructor/восток/глаза03_03.svg")
			]
		]
	},
	{
		// МЕТИС
		hair: "hair",
		base: [
			require("../../assets/constructor/метис/01.svg"),
			require("../../assets/constructor/метис/02.svg"),
			require("../../assets/constructor/метис/03.svg"),
			require("../../assets/constructor/метис/04.svg")

		],
		eyes: [
			[
				require("../../assets/constructor/метис/глаза01_01.svg"),
				require("../../assets/constructor/метис/глаза01_02.svg"),
				require("../../assets/constructor/метис/глаза01_03.svg")
			], [
				require("../../assets/constructor/метис/глаза02_01.svg"),
				require("../../assets/constructor/метис/глаза02_02.svg"),
				require("../../assets/constructor/метис/глаза02_03.svg")
			], [
				require("../../assets/constructor/метис/глаза03_01.svg"),
				require("../../assets/constructor/метис/глаза03_02.svg"),
				require("../../assets/constructor/метис/глаза03_03.svg")
			]
		]
	},
	{
		// ИНДЕЯ
		hair: "hair",
		base: [
			require("../../assets/constructor/индея/01.svg"),
			require("../../assets/constructor/индея/02.svg"),
			require("../../assets/constructor/индея/03.svg"),
			require("../../assets/constructor/индея/04.svg")

		],
		eyes: [
			[
				require("../../assets/constructor/индея/глаза01_01.svg"),
				require("../../assets/constructor/индея/глаза01_02.svg"),
				require("../../assets/constructor/индея/глаза01_03.svg")
			], [
				require("../../assets/constructor/индея/глаза02_01.svg"),
				require("../../assets/constructor/индея/глаза02_02.svg"),
				require("../../assets/constructor/индея/глаза02_03.svg")
			], [
				require("../../assets/constructor/индея/глаза03_01.svg"),
				require("../../assets/constructor/индея/глаза03_02.svg"),
				require("../../assets/constructor/индея/глаза03_03.svg")
			]
		]
	},
	{
		// АВСТРАЛИЯ
		hair: "hair2",
		base: [
			require("../../assets/constructor/австралия/01.svg"),
			require("../../assets/constructor/австралия/02.svg"),
			require("../../assets/constructor/австралия/03.svg"),
			require("../../assets/constructor/австралия/04.svg")

		],
		eyes: [
			[
				require("../../assets/constructor/австралия/глаза01_01.svg"),
				require("../../assets/constructor/австралия/глаза01_02.svg"),
				require("../../assets/constructor/австралия/глаза01_03.svg")
			], [
				require("../../assets/constructor/австралия/глаза02_01.svg"),
				require("../../assets/constructor/австралия/глаза02_02.svg"),
				require("../../assets/constructor/австралия/глаза02_03.svg")
			], [
				require("../../assets/constructor/австралия/глаза03_01.svg"),
				require("../../assets/constructor/австралия/глаза03_02.svg"),
				require("../../assets/constructor/австралия/глаза03_03.svg")
			]
		]
	},
];

const boyBase = {
	hair:[
		require("../../assets/constructor/м_европеоид/волосы01.svg"),
		require("../../assets/constructor/м_европеоид/волосы02.svg"),
		require("../../assets/constructor/м_европеоид/волосы03.svg"),
		require("../../assets/constructor/м_европеоид/волосы04.svg")
	],
	hair2:[
		require("../../assets/constructor/м_африка/2волосы01.svg"),
		require("../../assets/constructor/м_африка/2волосы02.svg"),
		require("../../assets/constructor/м_африка/2волосы03.svg"),
		require("../../assets/constructor/м_африка/2волосы04.svg")
	],
	hair3:[
		require("../../assets/constructor/м_восток/фолосы01.svg"),
		require("../../assets/constructor/м_восток/фолосы02.svg"),
		require("../../assets/constructor/м_восток/фолосы03.svg"),
		require("../../assets/constructor/м_восток/фолосы04.svg")
	]
}
const boyEtn = [
	{
		// ЕВРО
		hair: "hair",
		base: [
			require("../../assets/constructor/м_европеоид/01.svg"),
			require("../../assets/constructor/м_европеоид/02.svg"),
			require("../../assets/constructor/м_европеоид/03.svg")
		],
		eyes: [
			require("../../assets/constructor/м_европеоид/глаза01.svg"),
			require("../../assets/constructor/м_европеоид/глаза02.svg"),
			require("../../assets/constructor/м_европеоид/глаза03.svg")
		]
	},
	{
		// АЗИА
		hair: "hair",
		base: [
			require("../../assets/constructor/м_азиат/01.svg"),
			require("../../assets/constructor/м_азиат/02.svg"),
			require("../../assets/constructor/м_азиат/03.svg")
		],
		eyes: [
			require("../../assets/constructor/м_азиат/глаза01.svg"),
			require("../../assets/constructor/м_азиат/глаза03-1.svg"),
			require("../../assets/constructor/м_азиат/глаза03.svg")
		]
	},
	{
		// Африка
		hair: "hair2",
		base: [
			require("../../assets/constructor/м_африка/01.svg"),
			require("../../assets/constructor/м_африка/02.svg"),
			require("../../assets/constructor/м_африка/03.svg")
		],
		eyes: [
			require("../../assets/constructor/м_африка/глаза01.svg"),
			require("../../assets/constructor/м_африка/глаза02.svg"),
			require("../../assets/constructor/м_африка/глаза03.svg")
		]
	},
	{
		// Латинос
		hair: "hair",
		base: [
			require("../../assets/constructor/м_латинос/01.svg"),
			require("../../assets/constructor/м_латинос/02.svg"),
			require("../../assets/constructor/м_латинос/03.svg")
		],
		eyes: [
			require("../../assets/constructor/м_латинос/глаза01.svg"),
			require("../../assets/constructor/м_латинос/глаза02.svg"),
			require("../../assets/constructor/м_латинос/глаза03.svg")
		]
	},
	{
		// Индус
		hair: "hair3",
		base: [
			require("../../assets/constructor/м_индус/01.svg"),
			require("../../assets/constructor/м_индус/02.svg"),
			require("../../assets/constructor/м_индус/03.svg")
		],
		eyes: [
			require("../../assets/constructor/м_индус/глаза01.svg"),
			require("../../assets/constructor/м_индус/глаза02.svg"),
			require("../../assets/constructor/м_индус/глаза03.svg")
		]
	},
	{
		// восток
		hair: "hair3",
		base: [
			require("../../assets/constructor/м_восток/01.svg"),
			require("../../assets/constructor/м_восток/02.svg"),
			require("../../assets/constructor/м_восток/03.svg")
		],
		eyes: [
			require("../../assets/constructor/м_восток/глаза01.svg"),
			require("../../assets/constructor/м_восток/глаза02.svg"),
			require("../../assets/constructor/м_восток/глаза03.svg")
		]
	},
	{
		// Метис
		hair: "hair2",
		base: [
			require("../../assets/constructor/м_метис/01.svg"),
			require("../../assets/constructor/м_метис/02.svg"),
			require("../../assets/constructor/м_метис/03.svg")
		],
		eyes: [
			require("../../assets/constructor/м_метис/глаза01.svg"),
			require("../../assets/constructor/м_метис/глаза02.svg"),
			require("../../assets/constructor/м_метис/глаза03.svg")
		]
	},
	{
		// Индеец
		hair: "hair",
		base: [
			require("../../assets/constructor/м_индеец/01.svg"),
			require("../../assets/constructor/м_индеец/02.svg"),
			require("../../assets/constructor/м_индеец/03.svg")
		],
		eyes: [
			require("../../assets/constructor/м_индеец/глаза01.svg"),
			require("../../assets/constructor/м_индеец/глаза02.svg"),
			require("../../assets/constructor/м_индеец/глаза03.svg")
		]
	},
	{
		// АВСТРАЛИЯ
		hair: "hair2",
		base: [
			require("../../assets/constructor/м_австралия/01.svg"),
			require("../../assets/constructor/м_австралия/02.svg"),
			require("../../assets/constructor/м_австралия/03.svg")
		],
		eyes: [
			require("../../assets/constructor/м_австралия/глаза01.svg"),
			require("../../assets/constructor/м_австралия/глаза02.svg"),
			require("../../assets/constructor/м_австралия/глаза03.svg")
		]
	},
];

function App({gender, chest, etn, body, booty, hair, eyes, hairColor}) {
	function filterValue(variable) {
		return variable === null || variable === 1000 ? 0 : variable;
	}
	function filterValue2(variable) {
		return variable === null ? 0 : variable;
	}
	function filterEtn(etn) {
		let etnId = filterValue(etn);

		return etnId === 9 ? 0 : etnId;
	}

	let etnId = filterEtn(etn ? etn : null);
	let baseId = filterValue(body ? body : null);
	let baseId2 = baseId === 3 ? 0 : baseId;
	let genderId = filterValue(gender ? gender : null);
	let hairId = filterValue(hair ? hair : null);
	let hairColorId = filterValue(hairColor ? hairColor : null);
	let bootyId = filterValue2(booty ? booty : null);
	let chestId = filterValue2(chest ? chest : null);
	let eyesId = filterValue2(eyes ? eyes : null);

	function renderGirlsChest() {
		return chestId === 1000 || chestId === 0 ? null : (
			<img
				src={girlBase.chest[baseId][chestId - 1].default}
				alt="chest"
				className={styles.chest}
			/>
		)
	}
	function renderGirlsBooty() {
		return bootyId === 1000 || bootyId === 0 ? null : (
			<img
				src={girlBase.booty[baseId2][bootyId - 1].default}
				alt="booty"
				className={styles.booty}
			/>
		)
	}
	function renderGirlsHair() {
		return (
			<img
				src={girlBase[girlEtn[etnId].hair][hairId][baseId2][hairColorId].default}
				alt="hair"
				className={styles.hair}
			/>
		);
	}
	function renderGirlsEyes() {
		return eyesId === 1000 || eyesId === 0 ? null : (
			<img
				src={girlEtn[etnId].eyes[baseId2][eyesId - 1].default}
				alt="eyes"
				className={styles.eyes}
			/>
		);
	}
	function renderGirlsBase() {
		return (
			<img
				src={girlEtn[etnId].base[baseId].default}
				alt="base"
				className={styles.base}
			/>
		);
	}

	function renderBoysHair() {
		return (
			<img
				src={boyBase[boyEtn[etnId].hair][hairColorId].default}
				alt="hair"
				className={styles.hair}
			/>
		);
	}
	function renderBoysEyes() {
		return eyesId === 1000 || eyesId === 0 ? null : (
			<img
				src={boyEtn[etnId].eyes[eyesId - 1].default}
				alt="eyes"
				className={styles.eyes}
			/>
		)
	}
	function renderBoysBase() {
		return (
			<img
				src={boyEtn[etnId].base[baseId].default}
				alt="base"
				className={styles.base}
			/>
		);
	}

	function renderBoy() {
		return (
			<div>
				{renderBoysHair()}
				{renderBoysEyes()}
				{renderBoysBase()}
			</div>
		);
	}
	function renderGirl() {
		return (
			<div>
				{renderGirlsChest()}
				{renderGirlsBooty()}
				{renderGirlsHair()}
				{renderGirlsEyes()}
				{renderGirlsBase()}
			</div>
		);
	}

	function renderSwitch() {
		return genderId === 0
			? renderGirl()
			: renderBoy();
	}

	return (
		<div className={styles.constructor}>
			{renderSwitch()}
		</div>
	);
}

export default connect()(App);