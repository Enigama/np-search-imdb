import data from "./initial_data";

export const getData = () => {
	return new Promise(resolve => resolve(data))
};
