const request = require('request-promise-native'),
    googleFinance = require('google-finance');
const main = async function(){
	try{
	    googleFinance.historical({
	        symbol: 'NASDAQ:AAPL',
	        from: '2014-01-01',
	        to: '2014-12-31'
	    }, function(err, quotes){
	        console.log(quotes);
	    });
	}
    catch(err){
        console.error("Error:", err);
    }
};
main();
