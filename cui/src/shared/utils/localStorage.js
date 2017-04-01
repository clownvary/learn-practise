const	LOCALSTORAGENAME = 'localStorage';
let storage = getStorage();

function getStorage() {
	try {
		return LOCALSTORAGENAME in window && window[LOCALSTORAGENAME];
	} catch(err) { 
		return false;
	}
}

function serialize(value) {
	return JSON.stringify(value);
}

function deserialize(value) {
	if (typeof value != 'string') { 
		return undefined;
	}
	try {
		return JSON.parse(value);
	} catch(e) { 
		return value || undefined;
	}
}

function get(key, defaultVal) {
	let val = deserialize(storage.getItem(key));
	return val === undefined ? defaultVal : val;
}

function set(key, value) {
	if (value === undefined) { 
		return remove(key);
	}
	storage.setItem(key, serialize(value));
	return value;
}

function has(key) {
	return get(key) !== undefined;
}

function remove(key) {
	storage.removeItem(key);
}

function clear() {
	storage.clear();
}

function getAll() {
	let ret = {};

	for (let i=0; i<storage.length; i++) {
		let key = storage.key(i);
		ret[key] = get(key);
	}

	return ret;
}

function noop() {

}

export default (function() {
	if (!storage) {
		console.log('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.');
		return {
			set: noop,
			get: noop,
			has: noop,
			remove: noop,
			clear: noop,
			getAll: noop
		};
	}
	return {
		set,
		get,
		has,
		remove,
		clear,
		getAll
	}
})();