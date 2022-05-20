const express = require('express');
const app = express();
let bodyParser = require('body-parser');
let fs = require('fs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const wallet_path = './public/wallets.json';

if (!fs.existsSync(wallet_path))fs.writeFileSync(wallet_path,JSON.stringify([]));

const wallets = JSON.parse(fs.readFileSync(wallet_path).toString())

function calculateBalance(coins) {
    let s = 0;
    for (let i=0; i<coins.length; i++) s+= (coins[i].amount * coins[i].rate);
    return s;
}

function date() {
    let dt = new Date();
    let DD = ("0" + dt.getDate()).slice(-2);
    let MM = ("0" + (dt.getMonth() + 1)).slice(-2);
    let YYYY = dt.getFullYear();
    let hh = ("0" + dt.getHours()).slice(-2);
    let mm = ("0" + dt.getMinutes()).slice(-2);
    return YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm;
}

app.get('/wallets', (req, res) => {
    const info = {
        size: wallets.length,
        wallets,
        code: 200,
        message: "All wallets received successfully!"
    };
    res.send(info);
});

app.post('/wallets', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) return res.status(400).send({error: true,message: 'Name is required and should be minimum 3 characters'});
    let wallet = wallets.find(c => c.name === req.body.name);
    if (wallet) return res.status(422).send({error: true,message: 'The wallet is exists'});
    wallet = {
        name: req.body.name,
        balance: calculateBalance([]),
        coins: [],
        last_updated: date()
    }
    wallets.push(wallet);
    save(wallets);
    const info = {
        ...wallet,
        code: 200,
        message: "wallet added successfully!"
    };
    res.send(info);
});

app.put('/wallets/:name', (req, res) => {
    const wallet = wallets.find(c => c.name === req.params.name);
    if (!wallet) return res.status(404).send({error: true,message: 'The wallet with the given name was not found'});
    if (!req.body.name || req.body.name.length < 3) return res.status(422).send({error: true,message: 'Name is required and should be minimum 3 characters'});
    wallet.name = req.body.name;
    wallet.last_updated = date();
    save(wallets);
    const info = {
        ...wallet,
        "code": 200,
        "message": "Wallet name changed successfully!"
    }
    res.send(info);
});

app.delete('/wallets/:name', (req, res) => {
    const wallet = wallets.find(c => c.name === req.params.name);
    if (!wallet) return res.status(404).send({error: true,message: 'The wallet with the given name was not found'});
    const index = wallets.indexOf(wallet);
    wallets.splice(index, 1);
    save(wallets);
    const info = {
        ...wallet,
        "code": 200,
        "message": "Wallet deleted (logged out) successfully!"
    };
    res.send(info);
});


app.get('/:name', (req, res) => {
    const wallet = wallets.find(c => c.name === req.params.name);
    if (!wallet) return res.status(404).send({error: true,message: 'The wallet with the given name was not found'});
    const info = {
        ...wallet,
        "code": 200,
        "message": "received successfully!"
    };
    res.send(info);
});

app.post('/:name/coins', (req, res) => {
    const wallet = wallets.find(c => c.name === req.params.name);
    if (!wallet) return res.status(404).send({error: true,message: 'Wallet not found'});
    if (!req.body.name) return res.status(422).send({error: true,message: 'Name is required and should be minimum 3 characters'});
    if (!req.body.symbol || req.body.symbol.length < 3) return res.status(422).send({error: true,message: 'Symbol is required'});
    if (!req.body.amount || isNaN(req.body.amount)) return res.status(422).send({error: true,message: 'Amount is required and should be number'});
    if (!req.body.rate || isNaN(req.body.rate)) return res.status(422).send({error: true,message: 'Rate is required and should be number'});
    const coin = {
        name: req.body.name,
        symbol: req.body.symbol,
        amount: Number(req.body.amount),
        rate: Number(req.body.rate),
    };
    wallet.coins.push(coin);
    wallet.balance = calculateBalance(wallet.coins);
    wallet.last_updated = date();
    save(wallets);
    const info = {
        ...coin,
        code: 200,
        message: "coin added successfully!"
    };
    res.send(info);
});

app.put('/:name/:symbol', (req, res) => {
    const wallet = wallets.find(c => c.name === req.params.name);
    const coin = wallet.coins.find(c => c.symbol === req.params.symbol);
    if (!coin) return res.status(404).send({error: true,message: 'The wallet with the given name was not found'});
    if (req.body.name)coin.name = req.body.name;
    if (req.body.symbol)coin.symbol = req.body.symbol;
    if (req.body.amount && !isNaN(req.body.amount))coin.amount = Number(req.body.amount);
    if (req.body.rate && !isNaN(req.body.rate))coin.rate = Number(req.body.rate);
    wallet.balance = calculateBalance(wallet.coins);
    wallet.last_updated = date();
    save(wallets);
    const info = {
        ...coin,
        "code": 200,
        "message": "Coin updated successfully"
    };
    res.send(info);
});

app.delete('/:name/:symbol', (req, res) => {
    const wallet = wallets.find(c => c.name === req.params.name);
    const coin = wallet.coins.find(c => c.symbol === req.params.symbol);
    if (!coin) return res.status(404).send({error: true,message: 'The wallet with the given name was not found'});
    const index = wallet.coins.indexOf(coin);
    wallet.coins.splice(index, 1);
    wallet.balance = calculateBalance(wallet.coins);
    wallet.last_updated = date();
    save(wallets);
    const info = {
        ...coin,
        "code": 200,
        "message": "Coin deleted successfully!"
    };
    res.send(info);
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

function save(data) {
    fs.writeFileSync(wallet_path,JSON.stringify(data));
}
