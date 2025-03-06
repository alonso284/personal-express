import Item from "../utils/items.model.js";

// REQUEST
export const getItems = async (req, res) => {
	const items = await Item.find();
	res.json(items);
}

export const getItem = async (req, res) => {
	const item = await Item.findById(req.params.id);
	res.json(item);
}

// CREATE
export const postItem = async (req, res) => {
	const item = new Item({
		name: req.body.name,
		price: req.body.price
	});
	await item.save();
	res.json(item);
}
