import data from "./initial_data";
import axios from "axios";

export const getFilms = async (text) => {
	return text ?
		axios.get(`https://www.omdbapi.com/?s=${text}&type=movie&r=json&apikey=fabd0e57`) :
		new Promise(resolve => resolve(data))
};
