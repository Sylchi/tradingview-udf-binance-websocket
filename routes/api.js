const express = require('express')
const router = express.Router()
const {check} = require('express-validator')

/**
 * @api {get} / show Welcome message
 * @apiVersion 1.0.0
 * @apiGroup Api
 */
router.all('/', (req, res, next) => {
    res.set('Content-Type', 'text/plain').send('Welcome to the Binance UDF Adapter for TradingView. See ./README.md for more details.')
})

/**
 * @api {get} /history get history chart of the symbol
 * @apiVersion 1.0.0
 * @apiGroup Api
 * @apiParam {String} symbol
 * @apiParam {String} resolution
 */
router.get('/history', [
    check('symbol').exists().withMessage('symbol is required'),
    check('resolution').exists().withMessage('resolution is required'),
], (req, res, next) => {

    return res.udf.history(
        req.query.symbol,
        req.query.resolution,
        req.query.countback
    ).then((result) => {
        res.send(result)
    }).catch(function (err) {
        next(err)
    })
})


/**
 * @api {get} /config get data feed configuration
 * @apiVersion 1.0.0
 * @apiGroup Api
 */
router.get('/config', async (req, res, next) => {
    console.log("getting config")
    const config = await res.udf.config();
    return res.json(config);
})


/**
 * @api {get} /time get udf server time
 * @apiVersion 1.0.0
 * @apiGroup Api
 */
router.get('/time', (req, res, next) => {
    return res.udf.config().then((result) => {
        res.send(result)
    }).catch(function (err) {
        next(err)
    })
})


/**
 * @api {get} /symbol_info get all symbols info
 * @apiVersion 1.0.0
 * @apiGroup Api
 */
router.get('/symbol_info', (req, res, next) => {
    return res.udf.symbolInfo().then((result) => {
        res.send(result)
    }).catch(function (err) {
        next(err)
    })
})


/**
 * @api {get} /symbols resolve name or getting info
 * @apiVersion 1.0.0
 * @apiGroup Api
 * @apiParam {String} symbol
 */
router.get('/symbols',[
    check('symbol').exists().withMessage('symbol is required'),
], (req, res, next) => {
    return res.udf.symbol(req.query.symbol).then((result) => {
        res.send(result)
    }).catch(function (err) {
        next(err)
    })
})


/**
 * @api {get} /search get history chart of the symbol
 * @apiVersion 1.0.0
 * @apiGroup Api
 * @apiParam {String} query
 * @apiParam {String} type
 * @apiParam {String} exchange
 * @apiParam {number} limit
 */
router.get('/search', [
    check('query').exists().withMessage('query is required'),
    check('limit').exists().withMessage('limit is required'),
], (req, res, next) => {

    return res.udf.search(
        req.query.query,
        req.query.type ? req.query.type : null,
        req.query.exchange ? req.query.exchange : null,
        req.query.limit
    ).then((result) => {
        res.send(result)
    }).catch(function (err) {
        next(err)
    })
})

module.exports = router

