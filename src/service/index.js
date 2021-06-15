import data from "./initial_data";
import axios from "axios";

export const getFilms = async (text) => {
	return text ?
		await axios.get(`https://www.omdbapi.com/?s=${text}&type=movie&r=json&apikey=fabd0e57`) :
		await new Promise(resolve => resolve(data))
};
