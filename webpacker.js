const pather = (path) => {
	path = path.split('/')
	path[0] = '__dirname'
	return `path.resolve(${path})`
}

const ruler = (rules) => {
	// rules: [
	// 	{ test: 'txt', use: 'raw-loader' },
	// 	{ test: /\.sass$/, loader: 'file-loader?name=../fonts/[name].[ext]' },
	// ]
	let final = []
	rules.forEach(rule => {
		let test = rule.test
		test = '/\\.' + 'alma'
		final.push({
			test,
			use: rule.use
		})
	})
	const string = '/\\.' + 'alma'
	return {string}
}

const webpacker = ({ entry, out }) => {
	const config = {
		entry: pather(entry),
		output: {
			filename: pather(out)
		}
	}
	const final = module.exports = config
	return final
}

console.log(webpacker(
	{
		entry: '/alma/index.js',
		out: '/bundle/buncle.js'
	}		
))

console.log(ruler([{test: 'txt', use: 'raw-loader'}]))


