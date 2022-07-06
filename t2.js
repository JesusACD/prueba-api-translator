const translate = require('@iamtraction/google-translate');

translate('Hello', { from: 'en', to: 'es' })
	.then((res) => {
		console.log(res.text); // OUTPUT: You are amazing!
	})
	.catch((err) => {
		console.error(err);
	});
