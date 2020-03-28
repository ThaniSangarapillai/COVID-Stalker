import app from './App'

const s2 = require('@radarlabs/s2')
const port = 3000

app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    const cell1 = new s2.CellId(9926595695177891840n);
    console.log(cell1.token());
    return console.log(`server is listening on ${port}`);
});