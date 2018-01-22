'use strict';

import { Injectable } from '@angular/core';

interface Expense {
	Date: Date,
	Description: string,
	Hotel: number,
	Transport: number,
	Fuel: number,
	Meal: number,
	Misc: number,
	Total?: number
}

export interface Employee {
	Id: string;
	Name: string;
	Department: string;
	Position: string;
	SSN: string;
	Manager: string;
	Purpose: string;
	Attachment: boolean;
	Advance: number;
	Expenses: Expense[];
}

export interface Total {
	name: string;
	value: number;
}

// Common data service
@Injectable()
export class DataSvc {
	// data used to generate random items
	private _countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
	private _capitals = ['Washington', 'Berlin', 'London', 'Tokyo', 'Rome', 'Athens'];
	private _products = ['Widget', 'Gadget', 'Doohickey'];
	private _colors = ['Orange', 'White', 'Red', 'Green', 'Blue'];

	getData(count: number, unique = false) {
		var res = [],
			dt = new Date();

		// add count items
		for (var i = 0; i < count; i++) {

			// constants used to create data items
			var date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
				countryId = unique == true ? i : Math.floor(Math.random() * this._countries.length),
				productId = Math.floor(Math.random() * this._products.length),
				colorId = Math.floor(Math.random() * this._colors.length);

			// create the item
			var item = {
				id: i,
				start: date,
				end: date,
				country: this._countries[countryId],
				capital: this._capitals[countryId],
				product: this._products[productId],
				color: this._colors[colorId],
				amount: Math.random() * 10000 - 5000,
				amount2: Math.random() * 10000 - 5000,
				discount: Math.random() / 4,
				active: i % 4 == 0,
			};

			// add the item to the list
			res.push(item);
		}

		return res;
	}

	getEmployees(): Employee[] {
		return [
			{
				Id: 'E892659',
				Name: 'Robert King',
				Department: 'Sales',
				Position: 'Sales Representative',
				SSN: 'A37830',
				Manager: 'Andrew Fuller',
				Purpose: 'On business',
				Attachment: true,
				Advance: 1000,
				Expenses: this.getExpenses()
			},
			{
				Id: 'E3667093',
				Name: 'John Taylor',
				Department: 'Sales',
				Position: 'Sales Representative',
				SSN: 'A83745',
				Manager: 'Andrew Fuller',
				Purpose: 'On business',
				Attachment: false,
				Advance: 800,
				Expenses: this.getExpenses()
			},
			{
				Id: 'E294989',
				Name: 'Gregory Allen',
				Department: 'Sales',
				Position: 'Sales Representative',
				SSN: 'A23927',
				Manager: 'Andrew Fuller',
				Purpose: 'On business',
				Attachment: true,
				Advance: 1200,
				Expenses: this.getExpenses()
			}
		];
	}

	getExpenses(): Expense[] {
		// [5; 10]
		var count = 5 + Math.round(Math.random() * 5),
			res: Expense[] = [],
			msPerDay = 1000 * 24 * 60 * 60,
			curDate = Date.now() - 60 * msPerDay;

		for (var i = 0; i < count; i++) {
			res.push({
				Date: new Date(curDate),
				Description: 'Customer visit',
				Hotel: 30 + Math.random() * 200,
				Transport: 10 + Math.random() * 150,
				Fuel: Math.random() * 50,
				Meal: 30 + Math.random() * 170,
				Misc: Math.random() * 220
			});

			res[i].Total = res[i].Hotel + res[i].Transport + res[i].Fuel + res[i].Meal + res[i].Misc;

			curDate += msPerDay * Math.round(Math.random() * 4);
		}

		return res;
	}

	calculateTotals(items: Expense[]): Total[] {
		var hotel = 0,
			transport = 0,
			fuel = 0,
			meal = 0,
			misc = 0;

		for (var i = 0; i < items.length; i++) {
			var item = items[i];

			hotel += item.Hotel;
			transport += item.Transport;
			fuel += item.Fuel;
			meal += item.Meal;
			misc += item.Misc;
		}

		return [
			{ name: 'Hotel', value: hotel },
			{ name: 'Transport', value: transport },
			{ name: 'Meal', value: meal },
			{ name: 'Fuel', value: fuel },
			{ name: 'Misc', value: misc }
		];
	}
}