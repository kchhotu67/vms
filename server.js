const express = require("express");
const fs = require("fs");
const { application } = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const routes = "./modules";
app.use(express.json({extended:false}));

fs.readdirSync(routes).forEach(file => {
	fs.readdirSync(`${routes}/${file}/routes`).forEach(routesfile=>{
		if(routesfile!=='undefined'&& routesfile.match(/routes.js/))
		require(`./modules/${file}/routes/${routesfile}`)(app);
		console.log(routesfile);
	});
});
app.use(express.json({extended:false}));
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
module.exports = app;
