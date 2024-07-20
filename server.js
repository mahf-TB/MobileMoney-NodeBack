const app = require('./src')
// const db = require('./src/models');


const PORT =process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});