const express = require('express');
const translate = require('@iamtraction/google-translate');
const cors = require('cors');
const config = require('./config.json');

const app = express();
app.use(cors());

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
	res.jsonp('Connected to Google Translate API');
});

// translate('Hello', { from: 'en', to: 'es' })
// 	.then((res) => {
// 		console.log(res.text); // OUTPUT: You are amazing!
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 	});

app.get('/translate', (req, res) => {
	translate(req.query.tr, { to: config.LANG })
		.then((data) => {
			res.jsonp({
				lang: data.from.language.iso,
				text: data.text
			});
		})
		.catch((err) => {
			console.error(err);
			res.jsonp({
				success: false,
				error: err
			});
		});
});

const port = process.env.PORT || config.PORT || 5000;

app.listen(port, () =>
	console.log(`Server running on http://localhostt:${port}/`)
);
